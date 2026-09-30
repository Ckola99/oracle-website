import { has } from './content';
import { routes, type Lang } from '../i18n/utils';

/** getStaticPaths entries for pages that only exist when their data file has entries. */
export function conditionalPages(lang: Lang) {
  return (['gallery', 'testimonials'] as const)
    .filter((view) => has[view])
    .map((view) => ({ params: { slug: routes[view][lang] }, props: { view } }));
}
