export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || '';
  const PUBLICATION_ID = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID || '';

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, utm_source, utm_medium, referring_site } = body;

  if (!email || typeof email !== 'string') {
    return Response.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!BEEHIIV_API_KEY || !PUBLICATION_ID) {
    return Response.json({ error: 'Newsletter not configured' }, { status: 500 });
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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return Response.json({ error: 'Subscription failed', details: data }, { status: response.status });
    }

    return Response.json({ success: true, data }, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: 'Internal server error', message }, { status: 500 });
  }
}
