/** Noms des pays dans la langue de la page (Intl, calculés au build et passés aux simulateurs en props :
 *  le serveur et le navigateur affichent donc exactement le même texte, RECETTE §17.5). */
import { AUTH } from './engine/params';
import type { Lang } from './engine/params';
const TAG: Record<Lang, string> = { en: 'en', fr: 'fr', de: 'de', nl: 'nl' };
const cache = new Map<string, Intl.DisplayNames>();
export function land(code: string, lang: Lang): string {
  const k = TAG[lang];
  if (!cache.has(k)) cache.set(k, new Intl.DisplayNames([k], { type: 'region' }));
  if (code === 'XK') return { en: 'Kosovo', fr: 'Kosovo', de: 'Kosovo', nl: 'Kosovo' }[lang];
  return cache.get(k)!.of(code) ?? code;
}
/** Toutes les nationalités présentes dans au moins une liste officielle lue, plus les cinq pays de destination. */
export function nationalityCodes(): string[] {
  const s = new Set<string>(['GB', 'US', 'CA', 'AU', 'NZ', 'IE']);
  for (const w of AUTH.uk.etaNationals) w.countries.forEach((c) => s.add(c));
  AUTH.uk.visaNationals.forEach((c) => s.add(c));
  [...AUTH.ca.etaNationals, ...AUTH.ca.conditional, ...AUTH.us.vwp, ...AUTH.au.eta.nationals, ...AUTH.au.evisitor.nationals, ...AUTH.nz.waiver].forEach((c) => s.add(c));
  return [...s];
}
export function nationalityOptions(lang: Lang): Array<{ value: string; label: string }> {
  const coll = new Intl.Collator(TAG[lang]);
  return nationalityCodes().map((c) => ({ value: c, label: land(c, lang) })).sort((a, b) => coll.compare(a.label, b.label));
}
