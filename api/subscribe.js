const ALLOWED_ORIGINS = ['https://shelby-ai.com', 'https://www.shelby-ai.com'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || '';
  const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID || '';

  const { email, utm_source, utm_medium, referring_site } = req.body || {};

  if (!email || typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    return res.status(500).json({ error: 'Service temporarily unavailable', missing: { key: !BEEHIIV_API_KEY, pub: !PUBLICATION_ID } });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Subscription failed', status: response.status, details: data });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
