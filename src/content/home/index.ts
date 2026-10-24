/** Accueils (pages piliers) : texte des quatre langues. Rendu : components/HomePage.astro. Aucun montant en dur. */
import type { PageText, Lang, ToolSpec } from '../../lib/guide-types';
import { en } from './en';
import { fr } from './fr';
import { de } from './de';
import { nl } from './nl';
export type Home = Omit<PageText, 'slug' | 'card' | 'nav'> & { tool: ToolSpec; mini: ToolSpec };
export const HOME: Record<Lang, Home> = { en, fr, de, nl };
