import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Brevo: create contact with email, list, and name only (FNAME/LNAME per docs).
 * https://developers.brevo.com/reference/create-contact
 */

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

function parseListIds(): number[] {
  const raw = process.env.BREVO_LIST_ID ?? '7';
  const ids = raw
    .split(/[,\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
  return ids.length > 0 ? ids : [7];
}

/** Split full name: first token = first name, remainder = last name (if any). */
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
    console.error('BREVO_API_KEY is not set in Vercel environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const listIds = parseListIds();
  const { first, last } = splitName(name);

  const base = {
    email,
    listIds,
    updateEnabled: true,
  };

  const attempts: Record<string, unknown>[] = [
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
    { ...base },
  ];

  try {
    let lastError: { status: number; body: BrevoErr } = { status: 0, body: {} };

    for (let i = 0; i < attempts.length; i++) {
      const result = await brevoCreateContact(apiKey, attempts[i]);

      if (result.ok) {
        console.info('Brevo contact OK (attempt', i + 1, '/', attempts.length, ')');
        return res.status(200).json({ success: true });
      }

      lastError = { status: result.status, body: result.body };
      console.error('Brevo attempt', i + 1, '/', attempts.length, ':', result.status, result.body);

      if (result.status === 401 || result.status === 403) {
        console.error(
          'Brevo auth: Security → Authorized IPs, or verify api-key. https://developers.brevo.com/docs/getting-started'
        );
        return res.status(502).json({
          error: 'We could not complete your signup. Please try again in a moment.',
          code: 'BREVO_UNAUTHORIZED',
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
