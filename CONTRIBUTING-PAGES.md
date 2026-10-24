# Pages d'ETA Price

Une page = un fichier `src/content/pages/<id>.ts` (`definePage`). Les accueils sont dans `src/content/home/<langue>.ts`.

- Langues : en (par défaut), fr, de, nl. Une langue absente d'une page renvoie vers la version anglaise
  (`h.a(id)`), et le hreflang ne liste que les versions qui existent.
- Chaque bloc de langue : `slug`, `nav`, `card`, `title` (50 à 60 caractères, terme clé d'abord),
  `description` (150 à 160), `h1`, `intro`, `resume` (un seul paragraphe d'au moins 120 mots, sans `<p>`),
  `faqs` (3 à 5, réponses de 42 à 88 mots, questions uniques sur tout le site ; 6 à 8 sur les accueils),
  `body` (avec le marqueur `<!--mini-->` où s'insère le mini-simulateur).
- Au moins 560 mots par page, 2 050 par accueil. Aucun montant en dur : `F(h)` (`src/content/facts.ts`),
  `h.money`, `h.inEur`, `h.P`.
- `tool` et `mini` choisissent le simulateur (`checker`, `cost`, `overcharge`, `validity`, `applyby`, `denied`, `etias`).
- Sources citées par `h.src(clé, texte)`, clés de `src/data/params-2026.json` → `sources`.

Vérifier une page : `npx vitest run tests/contenu.test.ts -t "<id>"`. Avant tout commit : `npm run check` à 0.

Le site dit ce que fait l'outil, sans nommer ni décrire de concurrent ; il ne dépose aucune demande, ne prend
aucun paiement et renvoie au seul site officiel. Auteur : Radif Partners.
