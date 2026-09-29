import type { Localized } from './site';
import data from './machines.json';

export interface Machine {
  code: string;
  slug: string;
  category: string;
  image: string;
  /** Machine name — kept in English on both language versions. */
  name: string;
  short: Localized;
  headline: Localized;
  models: Localized;
  features: Localized<string[]>;
  specs: { label: Localized; value: Localized }[];
}

export const machines = data as Machine[];

export const machinesIn = (category: string) => machines.filter((m) => m.category === category);
export const getMachine = (slug: string) => machines.find((m) => m.slug === slug)!;
