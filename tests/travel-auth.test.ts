import { describe, it, expect } from 'vitest';
import data from '../data/authorisations.json';
import fxData from '../data/fx.json';
import { requirement, tripCost, toEur, overcharge, validityFor, applyBy, estaFeeOn, ukEtaWaveFor, type AuthData, type FxData } from '../src/lib/engine/travel-auth';

const d = data as unknown as AuthData;
const fx = fxData as unknown as FxData;
const o = { travelDate: '2026-12-01' };

// Valeurs lues le 2026-10-24 sur les sources officielles (data/sources.json). Si update-data.mjs change un montant,
// ces tests échouent exprès : on relit la source, puis on met le test à jour avec la date.
describe('montants officiels', () => {
  it('UK : 20 £ depuis le 8 avril 2026 (16 £ avant), visa visiteur 6 mois 135 £', () => {
    expect(d.uk.fee).toMatchObject({ amount: 20, currency: 'GBP', since: '2026-04-08' });
    expect(d.uk.previousFee.amount).toBe(16);
    expect(d.uk.visitVisa6m.amount).toBe(135);
  });
  it('Canada : 7 CAD (art. 294.1 RIPR), visa 100 CAD (art. 296), 5 ans (art. 12.05)', () => {
    expect(d.ca.fee.amount).toBe(7); expect(d.ca.visitorVisa.amount).toBe(100); expect(d.ca.validityYears).toBe(5);
  });
  it('ESTA : 40,62 $ à partir du 16/10/2026, 40,27 $ avant, 10,62 $ si refus', () => {
    expect(d.us.fee.amount).toBe(40.62); expect(d.us.feeSince).toBe('2026-10-16'); expect(d.us.previousFee.amount).toBe(40.27); expect(d.us.feeIfDenied.amount).toBe(10.62);
    expect(estaFeeOn(d, '2026-10-15').amount).toBe(40.27);
    expect(estaFeeOn(d, '2026-10-16').amount).toBe(40.62);
  });
  it('Australie : ETA 20 AUD par l’app, eVisitor gratuit ; NZ : 17/23 NZD + IVL 100 NZD', () => {
    expect(d.au.eta.fee.amount).toBe(20); expect(d.au.evisitor.fee.amount).toBe(0);
    expect(d.nz.nzeta.app.amount).toBe(17); expect(d.nz.nzeta.web.amount).toBe(23); expect(d.nz.ivl.amount).toBe(100);
  });
  it('listes : tailles plausibles', () => {
    expect(d.us.vwp.length).toBe(42);
    expect(d.nz.waiver.length).toBe(60);
    expect(d.ca.conditional.length).toBe(17);
    expect(d.uk.etaNationals.flatMap((w) => w.countries).length).toBeGreaterThan(80);
  });
});

describe('qui a besoin de quoi', () => {
  it('Français vers le Royaume-Uni : ETA 20 £, Irlandais et Britanniques dispensés', () => {
    const r = requirement(d, 'FR', 'GB', o);
    expect(r.kind).toBe('eta'); expect(r.perPerson).toEqual({ amount: 20, currency: 'GBP' }); expect(r.validityMonths).toBe(24);
    expect(requirement(d, 'IE', 'GB', o).kind).toBe('none');
    expect(requirement(d, 'GB', 'GB', o).kind).toBe('none');
  });
  it('vagues UK : Européens à partir du 2 avril 2025, Qatar dès le 15 novembre 2023', () => {
    expect(ukEtaWaveFor(d, 'DE')).toBe('2025-04-02');
    expect(ukEtaWaveFor(d, 'QA')).toBe('2023-11-15');
    expect(requirement(d, 'DE', 'GB', { travelDate: '2025-03-01' }).kind).toBe('none');
  });
  it('Indien vers le Royaume-Uni : visa, pas d’ETA', () => {
    const r = requirement(d, 'IN', 'GB', o);
    expect(r.kind).toBe('visa'); expect(r.parts[0].money.amount).toBe(135);
  });
  it('Canada : Américains et résidents permanents US dispensés, eTA par avion seulement', () => {
    expect(requirement(d, 'US', 'CA', o).kind).toBe('none');
    expect(requirement(d, 'IN', 'CA', { ...o, usPermanentResident: true }).kind).toBe('none');
    expect(requirement(d, 'DE', 'CA', o).kind).toBe('eta');
    expect(requirement(d, 'DE', 'CA', { ...o, byAir: false }).kind).toBe('none');
  });
  it('Canada, pays sous conditions (Mexique) : eTA si visa récent ou visa US, sinon visa 100 CAD', () => {
    expect(requirement(d, 'MX', 'CA', { ...o, meetsCanadaConditions: true }).kind).toBe('eta-conditional');
    const v = requirement(d, 'MX', 'CA', o);
    expect(v.kind).toBe('visa'); expect(v.parts[0].money.amount).toBe(100);
  });
  it('Australie : Allemand → eVisitor gratuit avec l’ETA à 20 AUD en variante ; Américain → ETA 20 AUD', () => {
    const de = requirement(d, 'DE', 'AU', o);
    expect(de.kind).toBe('evisitor'); expect(de.perPerson?.amount).toBe(0); expect(de.alternative?.perPerson.amount).toBe(20);
    const pl = requirement(d, 'PL', 'AU', o); // eVisitor seulement
    expect(pl.kind).toBe('evisitor'); expect(pl.alternative).toBeUndefined();
    const us = requirement(d, 'US', 'AU', o);
    expect(us.kind).toBe('eta'); expect(us.perPerson?.amount).toBe(20);
  });
  it('Nouvelle-Zélande : NZeTA + IVL = 117 NZD par l’app, 123 par le site ; Australiens dispensés', () => {
    expect(requirement(d, 'FR', 'NZ', o).perPerson).toEqual({ amount: 117, currency: 'NZD' });
    expect(requirement(d, 'FR', 'NZ', { ...o, nzApp: false }).perPerson).toEqual({ amount: 123, currency: 'NZD' });
    expect(requirement(d, 'AU', 'NZ', o).kind).toBe('none');
    expect(requirement(d, 'GB', 'NZ', o).notes).toContain('stay-6-months');
  });
  it('États-Unis : ESTA pour un Néerlandais, rien pour un Canadien, à vérifier pour un pays hors VWP', () => {
    expect(requirement(d, 'NL', 'US', o).scheme).toBe('ESTA');
    expect(requirement(d, 'CA', 'US', o).kind).toBe('none');
    expect(requirement(d, 'BG', 'US', o).kind).toBe('check');
  });
});

describe('coût d’un voyage et écart avec un prix proposé', () => {
  it('famille allemande de 4 vers UK + Canada : 4 × 20 £ + 4 × 7 CAD, converti au taux BCE', () => {
    const t = tripCost(d, fx, 'DE', ['GB', 'CA'], 4, o);
    expect(t.items[0].total).toEqual({ amount: 80, currency: 'GBP' });
    expect(t.items[1].total).toEqual({ amount: 28, currency: 'CAD' });
    expect(t.totalEur).toBeCloseTo(toEur({ amount: 80, currency: 'GBP' }, fx) + toEur({ amount: 28, currency: 'CAD' }, fx), 2);
    expect(t.unpriced).toEqual([]);
  });
  it('le visa n’entre pas dans le total et est signalé', () => {
    const t = tripCost(d, fx, 'IN', ['GB'], 1, o);
    expect(t.totalEur).toBe(0); expect(t.unpriced).toEqual(['GB']);
  });
  it('bornes du nombre de voyageurs', () => {
    expect(() => tripCost(d, fx, 'FR', ['GB'], 0, o)).toThrow(RangeError);
    expect(() => tripCost(d, fx, 'FR', ['GB'], 21, o)).toThrow(RangeError);
  });
  it('conversion : 7 CAD au taux du 2026-10-23 (1,5665) = 4,47 €', () => {
    expect(toEur({ amount: 7, currency: 'CAD' }, { base: 'EUR', date: '2026-10-23', rates: { USD: 1.1193, GBP: 0.83728, AUD: 1.5939, CAD: 1.5665, NZD: 1.9682 } })).toBe(4.47);
  });
  it('écart : 89 € proposés pour une eTA à 4,47 € = 84,53 € de plus, 19,9 fois le prix', () => {
    expect(overcharge(4.47, 89)).toEqual({ officialEur: 4.47, quotedEur: 89, extraEur: 84.53, ratio: 19.9 });
    expect(() => overcharge(4.47, -1)).toThrow(RangeError);
  });
});

describe('validité et date limite', () => {
  it('ETA UK délivrée le 10/05/2025, passeport jusqu’en 2030 : valable jusqu’au 09/05/2027', () => {
    expect(validityFor(24, '2025-05-10', '2030-01-01', '2027-05-09')).toEqual({ validUntil: '2027-05-09', coversTrip: true, limitedByPassport: false });
    expect(validityFor(24, '2025-05-10', '2030-01-01', '2027-05-10').coversTrip).toBe(false);
  });
  it('le passeport qui expire plus tôt raccourcit l’autorisation', () => {
    expect(validityFor(60, '2026-01-15', '2027-03-31', '2027-04-02')).toEqual({ validUntil: '2027-03-31', coversTrip: false, limitedByPassport: true });
  });
  it('fin de mois : délivrée le 31/01, 12 mois → jusqu’au 30/01 de l’année suivante', () => {
    expect(validityFor(12, '2026-01-31', '2035-01-01', '2027-01-30').validUntil).toBe('2027-01-30');
  });
  it('dates invalides refusées', () => {
    expect(() => validityFor(24, '2026-13-01', '2030-01-01', '2026-12-01')).toThrow(RangeError);
  });
  it('date limite conseillée', () => {
    expect(applyBy('2026-12-20', 'GB')).toBe('2026-12-15');
    expect(applyBy('2026-12-20', 'NZ')).toBe('2026-12-17');
    expect(applyBy('2026-12-20', 'US')).toBeNull();
  });
});
