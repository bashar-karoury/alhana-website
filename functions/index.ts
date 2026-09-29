/// <reference types="@cloudflare/workers-types" />
// GET / — send visitors to /en/ or /ar/ based on the browser language (Arabic by default).
export const onRequestGet: PagesFunction = async ({ request }) => {
  const accept = request.headers.get('accept-language') ?? '';
  const first = accept.split(',')[0]?.trim().toLowerCase() ?? '';
  const lang = first.startsWith('en') ? 'en' : 'ar';
  return new Response(null, {
    status: 302,
    headers: { Location: `/${lang}/`, Vary: 'Accept-Language', 'Cache-Control': 'private, max-age=0' },
  });
};
