// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.alhanatrading.com.sa',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ar', locales: { ar: 'ar-SA', en: 'en' } },
      filter: (page) => !page.includes('/thank-you/') && page !== 'https://www.alhanatrading.com.sa/',
    }),
  ],
  // cast: @tailwindcss/vite is typed against a newer Vite than the one bundled with Astro 5
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
