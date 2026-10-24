/**
 * Une page = UN fichier dans `src/content/pages/` (CONTRIBUTING-PAGES.md). Elle porte ses langues (anglais toujours ;
 * français, allemand, néerlandais là où ces lecteurs cherchent), son texte, sa FAQ, ses sources, ses deux
 * simulateurs et ses liens ; le cœur (routes, menus, pied de page, sitemap, hreflang, schémas) la lit seul.
 */
import type { SourceKey, Params, Lang } from './engine/params';
import type { Dest } from './engine/travel-auth';
export type { Lang, Dest };
export type Group = 'uk' | 'us' | 'ca' | 'anz' | 'eu';
/** Simulateurs (components/outils/Tools.tsx). */
export type ToolKind = 'checker' | 'cost' | 'overcharge' | 'validity' | 'applyby' | 'denied' | 'etias';
export interface ToolSpec { kind: ToolKind; dest?: Dest; dests?: Dest[]; nat?: string }
export interface FAQ { q: string; a: string }

/** Outils d'écriture du texte : liens, nombres et montants au format de la langue, moteur. */
export interface Helpers {
  lang: Lang;
  /** Texte dans la langue de la page. */
  T: <A>(x: { en: A; fr: A; de: A; nl: A }) => A;
  /** Lien interne vers une page (id) ; absente dans cette langue : la version anglaise. */
  a: (id: string, text: string) => string;
  eur: (n: number, decimals?: number) => string;
  /** Montant dans sa devise (« 20 £ », « 7 CAD »). */
  money: (m: { amount: number; currency: string }) => string;
  /** Montant converti en euros au taux BCE du jour des données (« ≈ 23,89 € »). */
  inEur: (m: { amount: number; currency: string }) => string;
  num: (n: number, decimals?: number) => string;
  date: (iso: string) => string;
  /** Nom d'un pays (code ISO) dans la langue de la page. */
  land: (code: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  src: (key: SourceKey, text?: string) => string;
  P: Params;
  M: typeof import('./engine/index');
  /** Jour du build. */
  today: string;
}

export interface PageText {
  slug: string;
  nav: string;
  card: string;
  /** 50 à 60 caractères, terme-clé en tête (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string;
  intro: string;
  /** Bloc citable : UN paragraphe d'au moins 120 mots (RECETTE §21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** Corps HTML. Le marqueur <!--mini--> place le second simulateur ; sans marqueur, il va à la fin. */
  body: (h: Helpers) => string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  tool: ToolSpec;
  mini: ToolSpec;
  related: string[];
  sources: SourceKey[];
  en: PageText;
  fr?: PageText;
  de?: PageText;
  nl?: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
