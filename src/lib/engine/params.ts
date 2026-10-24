/** Paramètres lus une fois : sources et faits relus à la main (params-2026.json), montants et listes officielles
 *  (data/authorisations.json, régénéré par scripts/update-data.mjs), taux BCE (data/fx.json). */
import raw from '../../data/params-2026.json';
import auth from '../../../data/authorisations.json';
import fx from '../../../data/fx.json';
import type { AuthData, FxData } from './travel-auth';
export const P = raw;
export type Params = typeof raw;
export type SourceKey = keyof typeof raw.sources;
export type Lang = 'en' | 'fr' | 'de' | 'nl';
export const AUTH = auth as unknown as AuthData;
export const FX = fx as unknown as FxData;
export const sourceUrl = (key: SourceKey, lang?: Lang): string => {
  const s = raw.sources[key] as { url: string; urlFr?: string };
  return lang === 'fr' && s.urlFr ? s.urlFr : s.url;
};
/** Date de lecture des barèmes (jour où update-data.mjs ou la relecture manuelle les a lus). */
export const DATA_DAY = (auth as { generated: string }).generated;
