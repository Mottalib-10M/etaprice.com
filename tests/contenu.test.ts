/**
 * Garde-fou du contenu (CONTRIBUTING-PAGES.md), sans build : titres et descriptions (RECETTE §11), bloc citable
 * (§21), FAQ (§7), nombre de mots, chiffres jamais « NaN », questions jamais répétées sur le site.
 */
import { describe, it, expect } from 'vitest';
import { PAGES } from '../src/lib/guides';
import { HOME } from '../src/content/home';
import { helpers } from '../src/lib/helpers';
import type { Lang, PageText } from '../src/lib/guide-types';

const LANGS: Lang[] = ['en', 'fr', 'de', 'nl'];
const txt = (html: string) => html.replace(/<\/?(a|strong|em|b|i|span|code)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s: string) => txt(s).split(' ').filter((w) => /[\p{L}\d]/u.test(w)).length;
const questions = new Map<string, string>();
const titres = new Map<string, string>();

function verifie(name: string, lang: Lang, x: Omit<PageText, 'slug' | 'nav' | 'card'>, home = false) {
  const h = helpers(lang);
  it(`${name} [${lang}] titre 50–60, description 150–160`, () => {
    expect(x.title.length, x.title).toBeGreaterThanOrEqual(50);
    expect(x.title.length, x.title).toBeLessThanOrEqual(60);
    expect(x.description.length, x.description).toBeGreaterThanOrEqual(150);
    expect(x.description.length, x.description).toBeLessThanOrEqual(160);
    expect(titres.get(x.title) ?? `${name}/${lang}`, `titre en double : ${x.title}`).toBe(`${name}/${lang}`);
    titres.set(x.title, `${name}/${lang}`);
  });
  const resume = x.resume(h), faqs = x.faqs(h), body = x.body(h);
  it(`${name} [${lang}] bloc citable ≥ 120 mots, un seul paragraphe`, () => {
    expect(words(resume), resume.slice(0, 60)).toBeGreaterThanOrEqual(120);
    expect(resume).not.toMatch(/\n|<p|<br/);
  });
  it(`${name} [${lang}] FAQ ${home ? '6–8' : '3–5'}, réponses de 40 à 90 mots, questions uniques`, () => {
    expect(faqs.length).toBeGreaterThanOrEqual(home ? 6 : 3);
    expect(faqs.length).toBeLessThanOrEqual(home ? 8 : 5);
    for (const f of faqs) {
      const n = words(f.a);
      expect(n, `${f.q} (${n} mots)`).toBeGreaterThanOrEqual(42);
      expect(n, `${f.q} (${n} mots)`).toBeLessThanOrEqual(88);
      const k = f.q.toLowerCase().replace(/[^\p{L}\d]/gu, '');
      expect(questions.get(k) ?? `${name}/${lang}`, `question en double : ${f.q}`).toBe(`${name}/${lang}`);
      questions.set(k, `${name}/${lang}`);
    }
  });
  it(`${name} [${lang}] ≥ ${home ? 2050 : 560} mots`, () => {
    const n = words(resume) + words(body) + faqs.reduce((s, f) => s + words(f.q) + words(f.a), 0);
    expect(n).toBeGreaterThanOrEqual(home ? 2050 : 560);
  });
  it(`${name} [${lang}] aucun chiffre cassé, aucun tiret cadratin`, () => {
    const all = [x.title, x.description, x.h1, x.intro, resume, body, ...faqs.flatMap((f) => [f.q, f.a])].map(txt).join(' ');
    expect(all).not.toMatch(/NaN|undefined|\[object|Infinity/);
    expect(all).not.toMatch(/[—]/);
  });
}

describe('accueils', () => { for (const l of LANGS) verifie('home', l, HOME[l], true); });
describe('pages', () => {
  for (const p of PAGES) for (const l of LANGS) { const x = p[l]; if (x) verifie(p.id, l, x); }
  it('chaque page liée existe', () => {
    const ids = new Set([...PAGES.map((p) => p.id), 'home', 'method', 'about']);
    for (const p of PAGES) for (const r of p.related) expect(ids.has(r), `${p.id} → ${r}`).toBe(true);
  });
  it('adresses uniques par langue', () => {
    for (const l of LANGS) { const s = PAGES.flatMap((p) => (p[l] ? [p[l]!.slug] : [])); expect(new Set(s).size).toBe(s.length); }
  });
  it('100 pages HTML au plus (contenu + 4 accueils + 8 pages de service × 4 + 4 widgets intégrables)', () => {
    const n = PAGES.reduce((s, p) => s + LANGS.filter((l) => p[l]).length, 0);
    expect(n + 4 + 32 + 4).toBeLessThanOrEqual(100);
  });
});
