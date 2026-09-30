import type { ImageMetadata } from 'astro';
import partnersData from '../data/partners.json';
import testimonialsData from '../data/testimonials.json';
import countriesData from '../data/countries.json';
import galleryData from '../data/gallery.json';
import type { Lang } from '../i18n/utils';

export interface Partner {
  name: string;
  type: 'supplier' | 'customer';
  /** File name inside src/assets/partners/ */
  logo: string;
  url?: string;
  since?: string | number;
  /** Must be true — set only once the partner has given written permission. */
  approved: boolean;
}

export interface Testimonial {
  name: string;
  role?: string;
  company: string;
  quote_en: string;
  quote_fr: string;
  /** File name inside src/assets/testimonials/ */
  logo?: string;
}

export interface Country {
  iso: string;
  name_en: string;
  name_fr: string;
  status: 'base' | 'active' | 'potential';
  potential_en: string;
  potential_fr: string;
}

export interface GalleryItem {
  /** File name inside src/assets/gallery/ */
  image: string;
  caption_en: string;
  caption_fr: string;
  /** ISO date, e.g. 2026-05-14 */
  date: string;
  location?: string;
}

export const partners = (partnersData as Partner[]).filter((p) => p.approved === true);
export const suppliers = partners.filter((p) => p.type === 'supplier');
export const customers = partners.filter((p) => p.type === 'customer');
export const testimonials = testimonialsData as Testimonial[];
export const countries = countriesData as Country[];
export const gallery = [...(galleryData as GalleryItem[])].sort((a, b) => b.date.localeCompare(a.date));

/** Sections and pages driven by data hide themselves when these are false. */
export const has = {
  partners: partners.length > 0,
  testimonials: testimonials.length > 0,
  gallery: gallery.length > 0,
};

const images = {
  partners: import.meta.glob<{ default: ImageMetadata }>('../assets/partners/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true }),
  testimonials: import.meta.glob<{ default: ImageMetadata }>('../assets/testimonials/*.{png,jpg,jpeg,webp,avif,svg}', { eager: true }),
  gallery: import.meta.glob<{ default: ImageMetadata }>('../assets/gallery/*.{png,jpg,jpeg,webp,avif}', { eager: true }),
};

/** Resolve a file name from a data file to an optimisable image. Fails the build if missing. */
export function getImage(folder: keyof typeof images, file: string): ImageMetadata {
  const mod = images[folder][`../assets/${folder}/${file}`];
  if (!mod) throw new Error(`Image not found: src/assets/${folder}/${file} (referenced in src/data/${folder}.json)`);
  return mod.default;
}

export const localized = <T extends Record<string, unknown>>(item: T, field: string, lang: Lang): string =>
  String(item[`${field}_${lang}`] ?? '');
