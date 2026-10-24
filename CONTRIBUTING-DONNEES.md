# Données d'ETA Price (eta-travel-authorization)

Aucun montant n'est écrit à la main dans une page : tout vient de `data/authorisations.json`, `data/fx.json`
et `src/data/params-2026.json`, lus par le moteur `src/lib/engine/travel-auth.ts` et par `src/content/facts.ts`.

## Fichiers

- `data/authorisations.json` : tarifs, listes de nationalités, validités des cinq autorisations (UK, CA, US, AU, NZ).
  Régénéré par `scripts/update-data.mjs`.
- `data/fx.json` : taux de référence BCE du jour (GBP, CAD, USD, AUD, NZD). Même script.
- `data/sources.json` : URL, date de lecture et licence de chaque source.
- `src/data/params-2026.json` : faits relus à la main (ETIAS, détail du tarif ESTA, dates canadiennes,
  durées de séjour, faits NZ et AU), chacun avec sa source (`_source` ou clé `sources`).

## Sources et licences

| Pays | Source | Licence |
|---|---|---|
| UK | GOV.UK (API de contenu), Appendix ETA National List, tableau des frais du Home Office | OGL v3 |
| CA | DORS/2002-227 (Justice Laws) ; canada.ca (lien seulement) | Décret sur la reproduction de la législation fédérale ; canada.ca non commercial |
| US | DHS Visa Waiver Program, Federal Register (avis 2026-20185), eCFR 8 CFR 217.5 | domaine public |
| AU | Department of Home Affairs, ETA 601 et eVisitor 651 | CC BY 3.0 AU |
| NZ | Immigration New Zealand, frais et liste des pays dispensés | CC BY 3.0 NZ |
| UE | Règlement (UE) 2018/1240, annonce de la Commission du 17/07/2025 | réutilisation Commission |
| FX | BCE, taux de référence | réutilisation libre avec mention |

## Mise à jour

```
node scripts/update-data.mjs          # relit tout et écrit les deux JSON
node scripts/update-data.mjs --dry    # relit sans écrire
```

Si une valeur attendue n'est pas retrouvée, le script s'arrête (code 1) sans rien écrire : on ne publie pas un
chiffre deviné. Un nom de pays inconnu l'arrête aussi (table `NOMS`, à compléter après lecture).

Cadence : `.github/workflows/update-data.yml`, `30 16 * * 1-5` (chaque jour ouvré après les taux BCE), puis
`npx vitest run` et commit si les données ont changé. Le flux ne tourne qu'une fois le dépôt créé.

Les faits de `params-2026.json` se relisent à la main : à chaque avis du Federal Register sur l'ESTA, à chaque
« Statement of changes » britannique, et dès que la Commission fixe la date de mise en service d'ETIAS
(`etias.operational`, `etias.startDate`). Après une modification : `npx vitest run`, puis `npm run check`.
