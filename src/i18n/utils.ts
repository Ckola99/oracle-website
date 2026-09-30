import fr from './fr.json';
import en from './en.json';

export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const dictionaries: Record<Lang, unknown> = { fr, en };

/** Look up a dotted key, e.g. t('fr', 'home.heroTitle'). Falls back to French, then to the key itself. */
export function t<T = string>(lang: Lang, key: string, vars?: Record<string, string | number>): T {
  const find = (dict: unknown) =>
    key.split('.').reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], dict);
  let value = find(dictionaries[lang]) ?? find(dictionaries[defaultLang]) ?? key;
  if (typeof value === 'string' && vars) {
    value = value.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
  }
  return value as T;
}

/** Page keys and their localised slugs. */
export const routes = {
  home: { fr: '', en: '' },
  about: { fr: 'a-propos', en: 'about' },
  services: { fr: 'services', en: 'services' },
  partners: { fr: 'partenaires', en: 'partners' },
  where: { fr: 'ou-nous-operons', en: 'where-we-operate' },
  gallery: { fr: 'galerie', en: 'gallery' },
  testimonials: { fr: 'temoignages', en: 'testimonials' },
  contact: { fr: 'contact', en: 'contact' },
  thanks: { fr: 'merci', en: 'thank-you' },
} as const;
export type RouteKey = keyof typeof routes;

/** Absolute path for a page in a language, e.g. path('en', 'about') → '/en/about/'. */
export function path(lang: Lang, page: RouteKey): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const slug = routes[page][lang];
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');

export const htmlLang: Record<Lang, string> = { fr: 'fr', en: 'en' };
export const ogLocale: Record<Lang, string> = { fr: 'fr_FR', en: 'en_GB' };
