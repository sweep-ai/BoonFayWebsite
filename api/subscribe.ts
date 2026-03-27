import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Brevo: Create a contact
 * https://developers.brevo.com/reference/create-contact
 *
 * - POST https://api.brevo.com/v3/contacts
 * - Header: api-key (see https://developers.brevo.com/docs/authentication-schemes)
 * - Success: 201 Created (or 204 in some update cases)
 * - listIds: IDs from Brevo → Contacts → Lists (must exist on your account)
 * - attributes: only use names that exist in your Brevo account (Contacts → Settings → Contact attributes).
 *   Custom attributes like GOAL / QUIZ_Q1 must be created in Brevo first or the API returns 400.
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

  // Standard attribute FIRSTNAME always exists. Optional LASTNAME if user typed "First Last".
  const parts = name.split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? name;
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : undefined;

  const attributes: Record<string, string> = {
    FIRSTNAME: firstName,
  };
  if (lastName) {
    attributes.LASTNAME = lastName;
  }

  // Only send quiz fields if you created matching TEXT attributes in Brevo (exact names, UPPERCASE).
  const useQuizAttrs = process.env.BREVO_SEND_QUIZ_ATTRIBUTES === 'true';
  if (useQuizAttrs) {
    attributes.GOAL = goal;
    attributes.QUIZ_Q1 = q1;
    attributes.QUIZ_Q2 = q2;
    attributes.QUIZ_Q3 = q3;
  }

  const brevoPayload = {
    email,
    listIds,
    attributes,
    updateEnabled: true,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(brevoPayload),
    });

    const rawText = await response.text();
    let errorData: { message?: string; code?: string } = {};
    try {
      errorData = rawText ? (JSON.parse(rawText) as typeof errorData) : {};
    } catch {
      errorData = { message: rawText?.slice(0, 200) };
    }

    if (!response.ok) {
      console.error('Brevo API error:', response.status, errorData);

      if (response.status === 401 || response.status === 403) {
        console.error(
          'Brevo auth failed. In Brevo: Security → Authorized IPs — disable IP restriction for API (Vercel IPs are not fixed). Confirm API key has Contacts permissions.'
        );
        return res.status(502).json({
          error: 'We could not complete your signup. Please try again in a moment.',
          code: 'BREVO_UNAUTHORIZED',
        });
      }

      // 400 often means unknown attribute name or invalid list id — surface hint for debugging
      return res.status(502).json({
        error: 'Failed to add contact',
        code: 'BREVO_REJECTED',
        details: errorData,
      });
    }

    // 201 Created is the usual success for new contacts per Brevo docs
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Brevo request failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
