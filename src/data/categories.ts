import type { Localized } from './site';

export interface Category {
  slug: string;
  color: string;
  image: string;
  name: Localized;
  desc: Localized;
  seoTitle: Localized;
}

export const categories: Category[] = [
  {
    slug: 'film-blowing',
    color: '#2f7d3b',
    image: 'st.jpg',
    name: { en: 'Film Blowing', ar: 'نفخ الأفلام' },
    desc: {
      en: 'Mini, general and high-speed lines, including two-head machines for twin rolls.',
      ar: 'مكائن صغيرة وعامة وعالية السرعة، منها مكائن برأسين لإنتاج رولين معاً.',
    },
    seoTitle: { en: 'Blown Film Extrusion Machines', ar: 'مكائن نفخ الأفلام البلاستيكية' },
  },
  {
    slug: 'bag-making',
    color: '#1f7d71',
    image: 'sm.jpg',
    name: { en: 'Cutting', ar: 'القص' },
    desc: {
      en: 'T-shirt, bottom-seal, laundry, loop-handle, draw-tape and bags on roll.',
      ar: 'أكياس الفانيلة واللحام السفلي والغسيل والمقابض والرباط والأكياس على رول.',
    },
    seoTitle: { en: 'Plastic Bag Cutting & Sealing Machines', ar: 'مكائن قص ولحام الأكياس البلاستيكية' },
  },
  {
    slug: 'flexo-printing',
    color: '#b3292a',
    image: 'anbn.jpg',
    name: { en: 'Printing', ar: 'الطباعة' },
    desc: {
      en: 'Stack and central-impression presses from 1 to 8 colours.',
      ar: 'مكائن طباعة متراصة وبالطبع المركزي من لون واحد حتى 8 ألوان.',
    },
    seoTitle: { en: 'Flexographic Printing Machines', ar: 'مكائن الطباعة الفلكسو' },
  },
  {
    slug: 'recycling',
    color: '#b4560f',
    image: 'wp.jpg',
    name: { en: 'Recycling', ar: 'إعادة التدوير' },
    desc: {
      en: 'One- and two-stage pelletizing lines with side-screw feeders.',
      ar: 'خطوط تحبيب بمرحلة ومرحلتين مع مغذيات لولبية جانبية.',
    },
    seoTitle: { en: 'Plastic Recycling & Pelletizing Machines', ar: 'مكائن إعادة تدوير وتحبيب البلاستيك' },
  },
  {
    slug: 'injection-molding',
    color: '#1f7d71',
    image: 'injection.jpg',
    name: { en: 'Injection', ar: 'الحقن' },
    desc: {
      en: 'Double-cylinder injection unit and toggle clamping from 900 kN.',
      ar: 'وحدة حقن بأسطوانتين وقفل بنظام الذراع من 900 كيلو نيوتن.',
    },
    seoTitle: { en: 'Plastic Injection Molding Machines', ar: 'مكائن حقن البلاستيك' },
  },
  {
    slug: 'air-compressors',
    color: '#1d5d9b',
    image: 'compressor.jpg',
    name: { en: 'Air Compressors', ar: 'ضواغط الهواء' },
    desc: {
      en: 'Rotary screw compressors with German air end, 5–15 barg.',
      ar: 'ضواغط لولبية دوارة بوحدة ضغط ألمانية، 5–15 بار.',
    },
    seoTitle: { en: 'Rotary Screw Air Compressors', ar: 'ضواغط الهواء اللولبية' },
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)!;
