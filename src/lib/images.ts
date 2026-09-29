import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,png}', { eager: true });

/** Look up an optimisable image by its file name in src/assets/img. */
export const img = (name: string): ImageMetadata => {
  const hit = files[`../assets/img/${name}`];
  if (!hit) throw new Error(`Missing image: ${name}`);
  return hit.default;
};
