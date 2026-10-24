import { route, ROUTES, type Locale } from './routes';
import { PAGES, pageById, GROUPS } from '../lib/guides';
import type { Group } from '../lib/guide-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<Locale, Record<string, string>> = {
  en: { home: 'Travel authorisation checker', method: 'Method and sources', about: 'About', widget: 'Embed the checker', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' },
  fr: { home: 'Vérificateur d’autorisation de voyage', method: 'Méthode et sources', about: 'À propos', widget: 'Intégrer le vérificateur', contact: 'Contact', editorial: 'Politique éditoriale', privacy: 'Confidentialité', terms: 'Mentions légales', cookies: 'Cookies' },
  de: { home: 'Einreise-Check', method: 'Methodik und Quellen', about: 'Über uns', widget: 'Einreise-Check einbinden', contact: 'Kontakt', editorial: 'Redaktionelle Grundsätze', privacy: 'Datenschutz', terms: 'Impressum', cookies: 'Cookies' },
  nl: { home: 'Reisvergunning-check', method: 'Methode en bronnen', about: 'Over ons', widget: 'Check insluiten', contact: 'Contact', editorial: 'Redactiestatuut', privacy: 'Privacy', terms: 'Colofon', cookies: 'Cookies' },
};
const GROUP_LABEL: Record<Locale, Record<Group, string>> = {
  en: { uk: 'United Kingdom', us: 'United States', ca: 'Canada', anz: 'Australia and NZ', eu: 'Europe' },
  fr: { uk: 'Royaume-Uni', us: 'États-Unis', ca: 'Canada', anz: 'Australie et NZ', eu: 'Europe' },
  de: { uk: 'Großbritannien', us: 'USA', ca: 'Kanada', anz: 'Australien und NZ', eu: 'Europa' },
  nl: { uk: 'Verenigd Koninkrijk', us: 'Verenigde Staten', ca: 'Canada', anz: 'Australië en NZ', eu: 'Europa' },
};
const SITE: Record<Locale, string> = { en: 'Site', fr: 'Le site', de: 'Die Seite', nl: 'De site' };
export const label = (id: string, lang: Locale) => CORE[lang][id] ?? pageById(id)?.[lang]?.nav ?? pageById(id)?.en.nav ?? id;
const has = (id: string, lang: Locale) => !!ROUTES.find((r) => r.id === id)?.paths[lang];
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id, lang) });
const inGroup = (g: Group, lang: Locale) => PAGES.filter((p) => p.group === g && p[lang]).sort((a, b) => a.order - b.order).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: GROUP_LABEL[lang][g], links: inGroup(g, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [...navCategories(lang), { label: SITE[lang], links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].filter((i) => has(i, lang)).map((i) => link(i, lang)) }];
export const popularLinks = (_lang: Locale): NavLink[] => [];
