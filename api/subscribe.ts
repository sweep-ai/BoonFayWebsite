import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Brevo Create contact (official API):
 * https://developers.brevo.com/reference/create-contact
 * https://developers.brevo.com/docs/synchronise-contact-lists
 *
 * Examples in the docs use FNAME / LNAME; default attributes also include FIRSTNAME / LASTNAME.
 * We try those first, then fall back to email + listIds only so signup still works if attributes mismatch.
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
  const goal = typeof body.goal === 'string' ? body.goal : '';
  const q1 = typeof body.q1 === 'string' ? body.q1 : '';
  const q2 = typeof body.q2 === 'string' ? body.q2 : '';
  const q3 = typeof body.q3 === 'string' ? body.q3 : '';

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set in Vercel environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const listIds = parseListIds();
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0] ?? name;
  const last = parts.length > 1 ? parts.slice(1).join(' ') : '';

  const useQuizAttrs = process.env.BREVO_SEND_QUIZ_ATTRIBUTES === 'true';

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
  ];

  if (useQuizAttrs) {
    attempts.push({
      ...base,
      attributes: {
        FNAME: first,
        ...(last ? { LNAME: last } : {}),
        GOAL: goal,
        QUIZ_Q1: q1,
        QUIZ_Q2: q2,
        QUIZ_Q3: q3,
      },
    });
  }

  // No attributes — valid per docs ("Basic email contact" with email only); still adds to listIds
  attempts.push({ ...base });

  try {
    let lastError: { status: number; body: BrevoErr } = { status: 0, body: {} };

    for (let i = 0; i < attempts.length; i++) {
      const result = await brevoCreateContact(apiKey, attempts[i]);

      if (result.ok) {
        console.info('Brevo contact created (strategy', i + 1, '/', attempts.length, ')');
        return res.status(200).json({ success: true });
      }

      lastError = { status: result.status, body: result.body };
      console.error('Brevo attempt', i + 1, '/', attempts.length, ':', result.status, result.body);

      if (result.status === 401 || result.status === 403) {
        console.error(
          'Brevo auth: disable IP allowlist under Security → Authorized IPs, or verify api-key. See https://developers.brevo.com/docs/getting-started'
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
