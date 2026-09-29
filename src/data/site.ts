// Company facts used across the site and in structured data.
export const site = {
  url: 'https://www.alhanatrading.com.sa',
  name: { en: 'Al-Hana Taiwan Machinery Est.', ar: 'مؤسسة الهنا تايوان للمكائن' },
  // Parent trading company (from the company profile).
  trading: { en: 'Al-Hana Trading Co.', ar: 'شركة ركن الهنا للتجارة' },
  yearsInBusiness: '15+',
  phone: '+966 11 270 65 64',
  phoneHref: 'tel:+966112706564',
  email: 'sales@alhanatrading.com.sa',
  // TODO: company WhatsApp number in international format without "+" (e.g. 9665XXXXXXXX).
  // The floating WhatsApp button is hidden until this is set.
  whatsapp: '',
  // TODO: showroom address; shown on the site and in LocalBusiness structured data once set.
  address: {
    street: '',
    city: 'Riyadh',
    country: 'SA',
  },
  social: [] as string[],
};

export type Lang = 'en' | 'ar';
export type Localized<T = string> = Record<Lang, T>;
