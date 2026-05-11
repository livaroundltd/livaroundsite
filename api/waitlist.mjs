import { Resend } from 'resend';

const NOTIFY_TO = 'mohit@livaround.com';
const FROM = process.env.RESEND_FROM || 'LivAround Waitlist <onboarding@resend.dev>';
const ALLOWED_SOURCES = new Set(['finance', 'access', 'owners', 'hosts']);
const SOURCE_LABELS = {
  hosts: 'Host signup',
  owners: 'Owner signup',
  finance: 'Finance waitlist',
  access: 'Access waitlist',
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 200) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('waitlist: RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot — silently accept and drop bot submissions.
  if (clean(body.company)) {
    return res.status(200).json({ ok: true });
  }

  const email = clean(body.email, 254).toLowerCase();
  const market = clean(body.market, 50);
  const properties = clean(body.properties, 10);
  const sourceRaw = clean(body.source, 20).toLowerCase();
  const source = ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : 'finance';

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const submittedAt = new Date().toISOString();
  const userAgent = clean(req.headers['user-agent'], 300);
  const forwardedFor = clean(req.headers['x-forwarded-for'], 100);
  const ip = forwardedFor.split(',')[0].trim();

  const rows = [
    ['Source', source],
    ['Email', email],
    ['Market', market || '—'],
    ['Properties', properties || '—'],
    ['Submitted', submittedAt],
    ['IP', ip || '—'],
    ['User agent', userAgent || '—'],
  ];

  const label = SOURCE_LABELS[source] || `${source} waitlist`;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#111;max-width:560px;">
      <h2 style="margin:0 0 16px;font-size:18px;">${escapeHtml(label)} — ${escapeHtml(email)}</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;">${escapeHtml(k)}</td>
            <td style="padding:6px 0;"><strong>${escapeHtml(v)}</strong></td>
          </tr>
        `).join('')}
      </table>
      <p style="margin-top:20px;font-size:12px;color:#888;">Reply to this email to reach the signer-up directly.</p>
    </div>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `${label} · ${email}`,
      html,
      text,
    });
    if (error) {
      console.error('waitlist: resend error', error);
      return res.status(502).json({
        error: 'Failed to send notification',
        details: error.message || error.name || 'Unknown Resend error',
      });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('waitlist: unexpected error', err);
    return res.status(500).json({
      error: 'Failed to send notification',
      details: err && err.message ? err.message : 'Unknown error',
    });
  }
}
