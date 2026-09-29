/// <reference types="@cloudflare/workers-types" />
// POST /api/inquiry — quotation and parts/maintenance forms.
// Validates, checks Cloudflare Turnstile (when configured), emails the company via Resend,
// then redirects the visitor to /<lang>/thank-you/ (or back with ?error=1).

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET?: string;
  MAIL_TO?: string; // default sales@alhanatrading.com.sa
  MAIL_FROM?: string; // e.g. "Al-Hana Website <website@alhanatrading.com.sa>" (domain verified in Resend)
}

const FIELDS: [string, string][] = [
  ['form', 'Form'],
  ['interest', 'Request / interest'],
  ['model', 'Machine model'],
  ['name', 'Name'],
  ['company', 'Company'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['message', 'Message'],
  ['page', 'Sent from page'],
  ['lang', 'Language'],
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const clip = (v: FormDataEntryValue | null, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const lang = clip(form.get('lang')) === 'en' ? 'en' : 'ar';
  const origin = new URL(request.url).origin;
  const back = (ok: boolean) => {
    const referer = request.headers.get('referer');
    const fail = new URL(referer && referer.startsWith(origin) ? referer : `${origin}/${lang}/contact/`);
    fail.searchParams.set('error', '1');
    return Response.redirect(ok ? `${origin}/${lang}/thank-you/` : fail.href, 303);
  };

  // Honeypot: pretend success for bots.
  if (clip(form.get('website'))) return back(true);

  const data = Object.fromEntries(FIELDS.map(([k]) => [k, clip(form.get(k))]));
  if (!data.name || !data.phone || !data.message) return back(false);
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) data.email = '';

  if (env.TURNSTILE_SECRET) {
    const body = new FormData();
    body.append('secret', env.TURNSTILE_SECRET);
    body.append('response', clip(form.get('cf-turnstile-response')));
    body.append('remoteip', request.headers.get('CF-Connecting-IP') ?? '');
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const outcome = (await res.json()) as { success: boolean };
    if (!outcome.success) return back(false);
  }

  if (!env.RESEND_API_KEY || !env.MAIL_FROM) {
    console.error('inquiry: RESEND_API_KEY / MAIL_FROM not configured');
    return back(false);
  }

  const rows = FIELDS.filter(([k]) => data[k])
    .map(([k, label]) => `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${label}</th><td style="padding:6px 0;white-space:pre-wrap">${esc(data[k])}</td></tr>`)
    .join('');
  const subject = `Website ${data.form === 'service' ? 'parts/maintenance inquiry' : 'quotation request'} — ${data.name}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [env.MAIL_TO || 'sales@alhanatrading.com.sa'],
      reply_to: data.email || undefined,
      subject,
      html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      text: FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`).join('\n'),
    }),
  });
  if (!res.ok) {
    console.error('inquiry: resend failed', res.status, await res.text());
    return back(false);
  }
  return back(true);
};
