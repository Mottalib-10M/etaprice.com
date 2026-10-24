import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
export const LOCALES = ['en', 'fr', 'de', 'nl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, en: string, fr: string, de: string, nl: string, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${en}/`, fr: `/fr/${fr}/`, de: `/de/${de}/`, nl: `/nl/${nl}/` }, ...(noindex ? { noindex } : {}) });
/** Pages du cœur. Les pages de contenu viennent de `src/content/pages/` (lib/guides.ts) : une page existe en anglais
 *  toujours, et en français, allemand ou néerlandais là où ces lecteurs cherchent (relevé Keyword Planner du 2026-10-24). */
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/', fr: '/fr/', de: '/de/', nl: '/nl/' } },
  R('method', 'method', 'methode', 'methodik', 'methode'),
  R('about', 'about', 'a-propos', 'ueber-uns', 'over-ons'),
  R('widget', 'widget', 'widget', 'widget', 'widget', true),
  R('contact', 'contact', 'contact', 'kontakt', 'contact', true),
  R('editorial', 'editorial-policy', 'politique-editoriale', 'redaktionelle-grundsaetze', 'redactiestatuut', true),
  R('privacy', 'privacy', 'confidentialite', 'datenschutz', 'privacy', true),
  R('terms', 'legal-notice', 'mentions-legales', 'impressum', 'colofon', true),
  R('cookies', 'cookies', 'cookies', 'cookies', 'cookies', true),
];
export const ROUTES: RouteDef<Locale>[] = [
  CORE[0],
  ...PAGES.map((p) => ({ id: p.id, paths: Object.fromEntries(LOCALES.filter((l) => p[l]).map((l) => [l, `/${l}/${p[l]!.slug}/`])) as Partial<Record<Locale, string>> })),
  ...CORE.slice(1),
];
const core = makeRouter(LOCALES, ROUTES);
export const { NOINDEX_PATHS, altPaths, hasRoute } = core;
/** Chemin d'une page dans une langue ; sans traduction, la version anglaise. */
export function route(id: string, lang: Locale): string {
  const r = ROUTES.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown route id: ${id}`);
  const p = r.paths[lang] ?? r.paths.en;
  if (!p) throw new Error(`Route ${id} sans chemin`);
  return p;
}
