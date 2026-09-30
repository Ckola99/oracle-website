import { has } from './content';
import type { RouteKey } from '../i18n/utils';

/** Main navigation. Data-driven pages only appear once they have content. */
export const navItems: RouteKey[] = [
  'about',
  'services',
  'partners',
  'where',
  ...(has.gallery ? (['gallery'] as const) : []),
  ...(has.testimonials ? (['testimonials'] as const) : []),
];
