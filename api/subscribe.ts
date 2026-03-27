import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = getJsonBody(req);
  const email = typeof body.email === 'string' ? body.email : '';
  const name = typeof body.name === 'string' ? body.name : '';
  const goal = typeof body.goal === 'string' ? body.goal : '';
  const q1 = typeof body.q1 === 'string' ? body.q1 : '';
  const q2 = typeof body.q2 === 'string' ? body.q2 : '';
  const q3 = typeof body.q3 === 'string' ? body.q3 : '';

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [7],
        attributes: {
          FIRSTNAME: name,
          GOAL: goal ?? '',
          QUIZ_Q1: q1 ?? '',
          QUIZ_Q2: q2 ?? '',
          QUIZ_Q3: q3 ?? '',
        },
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Brevo API error:', response.status, errorData);
      return res.status(response.status).json({ error: 'Failed to add contact', details: errorData });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Brevo request failed:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
