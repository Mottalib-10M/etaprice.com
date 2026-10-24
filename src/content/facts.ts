/** Faits chiffrés communs aux pages, tirés du moteur et des données officielles (jamais écrits en dur).
 *  Chaque valeur est une chaîne déjà formatée dans la langue de la page. */
import type { Helpers } from '../lib/guide-types';
export function F(h: Helpers) {
  const A = h.M.AUTH, FXd = h.M.FX;
  const m = h.money, e = h.inEur;
  const nzApp = { amount: A.nz.nzeta.app.amount + A.nz.ivl.amount, currency: 'NZD' };
  const nzWeb = { amount: A.nz.nzeta.web.amount + A.nz.ivl.amount, currency: 'NZD' };
  const ukWaveEU = A.uk.etaNationals.find((w) => w.countries.includes('DE'))!.from;
  const ukWaveUS = A.uk.etaNationals.find((w) => w.countries.includes('US'))!.from;
  const ukEtaCount = A.uk.etaNationals.reduce((s, w) => s + w.countries.length, 0);
  return {
    A, fxDate: h.date(FXd.date), dataDay: h.date(A.generated),
    uk: m(A.uk.fee), ukEur: e(A.uk.fee), ukOld: m(A.uk.previousFee), ukSince: h.date(A.uk.fee.since), ukVisa: m(A.uk.visitVisa6m), ukVisaEur: e(A.uk.visitVisa6m),
    ukWaveEU: h.date(ukWaveEU), ukWaveUS: h.date(ukWaveUS), ukEtaCount, ukVisaCount: A.uk.visaNationals.length,
    ca: m(A.ca.fee), caEur: e(A.ca.fee), caVisa: m(A.ca.visitorVisa), caYears: A.ca.validityYears, caCount: A.ca.etaNationals.length, caCondCount: A.ca.conditional.length,
    us: m(A.us.fee), usEur: e(A.us.fee), usOld: m(A.us.previousFee), usSince: h.date(A.us.feeSince), usDenied: m(A.us.feeIfDenied), usDeniedEur: e(A.us.feeIfDenied), vwpCount: A.us.vwp.length,
    usNoticeDate: h.date(A.us.notice?.date ?? '2026-10-01'),
    usPromo: m({ amount: h.P.esta.travelPromotion, currency: 'USD' }), usHr1: m({ amount: h.P.esta.hr1Fee, currency: 'USD' }), usBefore: m({ amount: h.P.esta.before2025, currency: 'USD' }),
    usHr1Since: h.date(h.P.esta.hr1Since), usFy26Since: h.date(h.P.esta.fy2026Since), usStay: h.P.usVwpStay, usIneligible: h.date(h.P.usIneligibleSince),
    au: m(A.au.eta.fee), auEur: e(A.au.eta.fee), auEtaCount: A.au.eta.nationals.length, evCount: A.au.evisitor.nationals.length,
    nzAppFee: m(A.nz.nzeta.app), nzWebFee: m(A.nz.nzeta.web), ivl: m(A.nz.ivl), ivlEur: e(A.nz.ivl), nzApp: m(nzApp), nzAppEur: e(nzApp), nzWeb: m(nzWeb), nzWebEur: e(nzWeb), nzCount: A.nz.waiver.length, nzYears: A.nz.validityYears,
    etias: h.eur(h.P.etias.fee.amount, 0), etiasUnder: h.P.etias.feeExemptUnder, etiasOver: h.P.etias.feeExemptOver, etiasYears: h.P.etias.validityYears, etiasRead: h.date(h.P.etias.statusReadOn),
    /** Montant × n dans sa devise, puis en euros. */
    times: (money: { amount: number; currency: string }, n: number) => { const t = { amount: Math.round(money.amount * n * 100) / 100, currency: money.currency }; return { m: m(t), e: e(t) }; },
  };
}
