import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Brevo: POST /v3/contacts — always assign to list ID 7.
 * https://developers.brevo.com/reference/create-contact
 */

const BREVO_LIST_ID = 7;

function getJsonBody(req: VercelRequest): Record<string, unknown> {
  const raw = req.body;
  if (raw && typeof raw === 'object' && !Buffer.isBuffer(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return {};
}

/** First word = first name, rest = last name. */
function splitName(full: string): { first: string; last: string | undefined } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: '', last: undefined };
  if (parts.length === 1) return { first: parts[0], last: undefined };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

type BrevoErr = { message?: string; code?: string };

async function brevoCreateContact(
  apiKey: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; body: BrevoErr }> {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  let body: BrevoErr = {};
  try {
    body = rawText ? (JSON.parse(rawText) as BrevoErr) : {};
  } catch {
    body = { message: rawText?.slice(0, 300) };
  }

  return { ok: response.ok, status: response.status, body };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = getJsonBody(req);
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { first, last } = splitName(name);

  const base = {
    email,
    listIds: [BREVO_LIST_ID],
    updateEnabled: true,
  };

  // Minimal first: guarantees contact is added to list 7 if API key + list are valid.
  const attempts: Record<string, unknown>[] = [
    { ...base },
    {
      ...base,
      attributes: {
        FNAME: first,
        ...(last ? { LNAME: last } : {}),
      },
    },
    {
      ...base,
      attributes: {
        FIRSTNAME: first,
        ...(last ? { LASTNAME: last } : {}),
      },
    },
  ];

  try {
    let lastError: { status: number; body: BrevoErr } = { status: 0, body: {} };

    for (let i = 0; i < attempts.length; i++) {
      const result = await brevoCreateContact(apiKey, attempts[i]);

      if (result.ok) {
        console.info('Brevo OK (attempt', i + 1, '/', attempts.length, ')');
        return res.status(200).json({ success: true });
      }

      lastError = { status: result.status, body: result.body };
      console.error('Brevo attempt', i + 1, ':', result.status, result.body);

      if (result.status === 401 || result.status === 403) {
        return res.status(502).json({
          error: 'We could not complete your signup. Please try again in a moment.',
          code: 'BREVO_UNAUTHORIZED',
          details: result.body,
        });
      }

      if (result.status !== 400 && result.status !== 404) {
        break;
      }
    }

    return res.status(502).json({
      error: 'Failed to add contact',
      code: 'BREVO_REJECTED',
      details: lastError.body,
      brevoStatus: lastError.status,
    });
  } catch (err) {
    console.error('Brevo request failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
