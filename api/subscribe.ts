import type { VercelRequest, VercelResponse } from '@vercel/node';

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || '';
const PUBLICATION_ID = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, utm_source, utm_medium, referring_site } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    return res.status(500).json({ error: 'Newsletter not configured' });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          send_welcome_email: true,
          utm_source: utm_source || 'website',
          utm_medium: utm_medium || 'organic',
          referring_site: referring_site || 'https://shelby-ai.com',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: 'Subscription failed', details: errorData });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
