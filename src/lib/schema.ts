// schema.org JSON-LD builders.
import type { Lang } from '../data/site';
import { site } from '../data/site';
import type { Machine } from '../data/machines';
import type { Category } from '../data/categories';

const orgId = `${site.url}/#organization`;

export const organization = (logoUrl: string) => {
  const address = site.address.street
    ? {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressCountry: site.address.country,
      }
    : { '@type': 'PostalAddress', addressLocality: site.address.city, addressCountry: site.address.country };
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': orgId,
    name: site.name.en,
    alternateName: site.name.ar,
    url: site.url,
    logo: logoUrl,
    image: logoUrl,
    telephone: site.phone,
    email: site.email,
    address,
    areaServed: 'SA',
    description: 'Supplier of plastic machinery, spare parts, installation and maintenance in Saudi Arabia with more than 20 years of Taiwanese expertise.',
    parentOrganization: { '@type': 'Organization', name: site.trading.en, alternateName: site.trading.ar },
    knowsAbout: ['Plastic machinery', 'Blown film extrusion', 'Flexographic printing', 'Bag cutting and sealing machines', 'Plastic recycling', 'Injection molding'],
    ...(site.social.length ? { sameAs: site.social } : {}),
  };
};

export const product = (m: Machine, lang: Lang, category: Category, pageUrl: string, imageUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${m.code} — ${m.name}`,
  sku: m.code,
  url: pageUrl,
  image: imageUrl,
  description: `${m.short[lang]}. ${m.features[lang].join('. ')}.`,
  category: category.name[lang],
  brand: { '@type': 'Brand', name: site.name.en },
  manufacturer: { '@id': orgId },
  additionalProperty: m.specs.map((s) => ({
    '@type': 'PropertyValue',
    name: s.label[lang],
    value: s.value[lang],
  })),
});

export const breadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});
