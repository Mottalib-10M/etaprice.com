// Moteur des autorisations de voyage (UK ETA, eTA Canada, ETA / eVisitor Australie, NZeTA, ESTA).
// TypeScript pur, sans dépendance ni accès réseau : toutes les valeurs viennent de data/authorisations.json et
// data/fx.json, régénérés par scripts/update-data.mjs à partir des sources officielles (voir data/sources.json).
// Le moteur ne décide jamais à la place de l'administration : il dit ce que prévoient les textes lus, et renvoie
// « check » (à vérifier sur le site officiel) dès qu'un cas sort des listes publiées.

export type Dest = 'GB' | 'CA' | 'AU' | 'NZ' | 'US';
export type Currency = 'GBP' | 'CAD' | 'AUD' | 'NZD' | 'USD' | 'EUR';
export interface Money { amount: number; currency: Currency }

export type Kind =
  | 'none'            // aucune autorisation (citoyen, dispense)
  | 'eta'             // autorisation électronique (ETA, eTA, NZeTA, ESTA)
  | 'eta-conditional' // eTA Canada seulement sous conditions (art. 7.01 RIPR), sinon visa
  | 'evisitor'        // eVisitor gratuit (Australie) ; l'ETA payante par l'app reste possible pour certains
  | 'visa'            // visa visiteur à demander
  | 'check';          // hors des listes lues : vérifier sur le site officiel

export interface AuthData {
  generated: string;
  uk: { fee: Money & { since: string }; previousFee: Money; visitVisa6m: Money; etaNationals: { from: string; countries: string[] }[]; visaNationals: string[] };
  ca: { fee: Money; visitorVisa: Money; validityYears: number; etaNationals: string[]; conditional: string[]; currentTo: string };
  us: { fee: Money; feeIfDenied: Money; feeSince: string; previousFee: Money; vwp: string[]; notice?: { title: string; date: string; url: string; number: string } };
  au: { eta: { fee: Money; nationals: string[] }; evisitor: { fee: Money; nationals: string[] } };
  nz: { waiver: string[]; readOn: string; nzeta: { app: Money; web: Money }; ivl: Money; validityYears: number; stayMonths: number; ukStayMonths: number };
}
export interface FxData { base: 'EUR'; date: string; rates: Record<Exclude<Currency, 'EUR'>, number> }

export interface Options {
  /** Date d'arrivée prévue (AAAA-MM-JJ). Sert aux vagues de l'ETA britannique et au prix ESTA en vigueur. */
  travelDate: string;
  /** Canada : arrivée par avion (l'eTA ne vaut que pour l'avion, art. 7.01 et 7.1 RIPR). */
  byAir?: boolean;
  /** Résident permanent des États-Unis (carte verte) : dispensé d'eTA pour le Canada (art. 190(1)(c)). */
  usPermanentResident?: boolean;
  /** Canada, pays de l'art. 7.01 : visa canadien dans les 10 dernières années ou visa américain non-immigrant valide. */
  meetsCanadaConditions?: boolean;
  /** Nouvelle-Zélande : demande par l'application (moins chère) plutôt que par le site. */
  nzApp?: boolean;
  /** Jour où la demande est payée (AAAA-MM-JJ) ; par défaut, la date des données. Sert au prix ESTA en vigueur. */
  applicationDate?: string;
}

export interface Requirement {
  dest: Dest;
  kind: Kind;
  scheme: 'UK ETA' | 'eTA' | 'ETA (subclass 601)' | 'eVisitor (subclass 651)' | 'NZeTA' | 'ESTA' | null;
  /** Prix officiel par personne, tout compris (NZ : NZeTA + IVL). null = visa ou cas non chiffré. */
  perPerson: Money | null;
  /** Détail du prix par personne, dans l'ordre d'affichage. */
  parts: { label: 'fee' | 'ivl' | 'visa'; money: Money }[];
  /** Validité en mois à partir de la délivrance (plafonnée par la fin du passeport). */
  validityMonths: number | null;
  /** Délai à prévoir avant le départ, en jours (texte officiel lu ; 0 = décision le plus souvent immédiate). */
  leadDays: number | null;
  /** Autre voie possible (Australie : l'ETA payante par l'app pour un passeport aussi éligible à l'eVisitor). */
  alternative?: { scheme: 'ETA (subclass 601)'; perPerson: Money };
  notes: string[];
}

const has = (list: readonly string[], c: string) => list.includes(c);

export function ukEtaWaveFor(d: AuthData, nat: string): string | null {
  for (const w of d.uk.etaNationals) if (has(w.countries, nat)) return w.from;
  return null;
}

/** Prix ESTA en vigueur à une date : le montant de l'avis HR-1 ne s'applique qu'à partir de sa date d'effet. */
export function estaFeeOn(d: AuthData, date: string): Money {
  return date >= d.us.feeSince ? d.us.fee : d.us.previousFee;
}

export function requirement(d: AuthData, nat: string, dest: Dest, o: Options): Requirement {
  const base: Omit<Requirement, 'kind'> = { dest, scheme: null, perPerson: null, parts: [], validityMonths: null, leadDays: null, notes: [] };
  const r = (x: Partial<Requirement> & { kind: Kind }): Requirement => ({ ...base, ...x, notes: [...(x.notes ?? [])] });
  nat = nat.toUpperCase();

  switch (dest) {
    case 'GB': {
      if (nat === 'GB' || nat === 'IE') return r({ kind: 'none', notes: ['british-irish'] });
      const from = ukEtaWaveFor(d, nat);
      if (from && o.travelDate >= from) {
        const fee: Money = { amount: d.uk.fee.amount, currency: d.uk.fee.currency }; // le prix est celui du jour de la demande ; la demande se fait avant le voyage
        return r({ kind: 'eta', scheme: 'UK ETA', perPerson: fee, parts: [{ label: 'fee', money: fee }], validityMonths: 24, leadDays: 5, notes: ['per-person-incl-children', 'no-refund', 'airside-transit-exempt'] });
      }
      if (from) return r({ kind: 'none', notes: [`eta-from-${from}`] });
      if (has(d.uk.visaNationals, nat)) return r({ kind: 'visa', parts: [{ label: 'visa', money: d.uk.visitVisa6m }], notes: ['uk-visit-visa-6m'] });
      return r({ kind: 'check' });
    }
    case 'CA': {
      if (nat === 'CA') return r({ kind: 'none', notes: ['citizen'] });
      if (nat === 'US') return r({ kind: 'none', notes: ['us-citizen-exempt'] });
      if (o.usPermanentResident) return r({ kind: 'none', notes: ['us-pr-exempt'] });
      const byAir = o.byAir !== false;
      const eta: Partial<Requirement> = { scheme: 'eTA', perPerson: d.ca.fee, parts: [{ label: 'fee', money: d.ca.fee }], validityMonths: d.ca.validityYears * 12, leadDays: 3 };
      if (has(d.ca.etaNationals, nat)) return byAir ? r({ kind: 'eta', ...eta, notes: ['air-only'] }) : r({ kind: 'none', notes: ['land-sea-no-eta'] });
      if (has(d.ca.conditional, nat)) {
        if (byAir && o.meetsCanadaConditions) return r({ kind: 'eta-conditional', ...eta, notes: ['conditions-7-01'] });
        return r({ kind: 'visa', parts: [{ label: 'visa', money: d.ca.visitorVisa }], notes: [byAir ? 'conditions-not-met' : 'conditional-land-sea-visa', 'other-fees-may-apply'] });
      }
      return r({ kind: 'visa', parts: [{ label: 'visa', money: d.ca.visitorVisa }], notes: ['other-fees-may-apply'] });
    }
    case 'AU': {
      if (nat === 'AU') return r({ kind: 'none', notes: ['citizen'] });
      const ev = has(d.au.evisitor.nationals, nat), eta = has(d.au.eta.nationals, nat);
      if (ev) return r({ kind: 'evisitor', scheme: 'eVisitor (subclass 651)', perPerson: d.au.evisitor.fee, parts: [{ label: 'fee', money: d.au.evisitor.fee }], validityMonths: 12, leadDays: null, alternative: eta ? { scheme: 'ETA (subclass 601)', perPerson: d.au.eta.fee } : undefined, notes: ['evisitor-free', 'stay-3-months'] });
      if (eta) return r({ kind: 'eta', scheme: 'ETA (subclass 601)', perPerson: d.au.eta.fee, parts: [{ label: 'fee', money: d.au.eta.fee }], validityMonths: 12, leadDays: null, notes: ['app-only', 'each-family-member', 'stay-3-months'] });
      return r({ kind: 'check' });
    }
    case 'NZ': {
      if (nat === 'NZ') return r({ kind: 'none', notes: ['citizen'] });
      if (nat === 'AU') return r({ kind: 'none', notes: ['australian-exempt'] });
      if (!has(d.nz.waiver, nat)) return r({ kind: 'check' });
      const fee = o.nzApp === false ? d.nz.nzeta.web : d.nz.nzeta.app;
      const total: Money = { amount: fee.amount + d.nz.ivl.amount, currency: 'NZD' };
      return r({ kind: 'eta', scheme: 'NZeTA', perPerson: total, parts: [{ label: 'fee', money: fee }, { label: 'ivl', money: d.nz.ivl }], validityMonths: d.nz.validityYears * 12, leadDays: 3, notes: [nat === 'GB' ? 'stay-6-months' : 'stay-3-months', 'visit-only-ivl'] });
    }
    case 'US': {
      if (nat === 'US') return r({ kind: 'none', notes: ['citizen'] });
      if (nat === 'CA') return r({ kind: 'none', notes: ['canadian-visa-exempt'] });
      if (has(d.us.vwp, nat)) {
        const fee = estaFeeOn(d, o.applicationDate ?? d.generated); // le prix est celui du jour où la demande est payée
        return r({ kind: 'eta', scheme: 'ESTA', perPerson: fee, parts: [{ label: 'fee', money: fee }], validityMonths: 24, leadDays: null, notes: ['stay-90-days', 'denied-fee', 'apply-early'] });
      }
      return r({ kind: 'check' });
    }
  }
}

/** Conversion vers l'euro au taux de référence BCE (montant étranger / taux). Arrondi au centime. */
export function toEur(m: Money, fx: FxData): number {
  if (m.currency === 'EUR') return m.amount;
  const rate = fx.rates[m.currency];
  if (!rate) throw new Error(`Taux BCE absent pour ${m.currency}`);
  return Math.round((m.amount / rate) * 100) / 100;
}

export interface TripResult {
  items: (Requirement & { travellers: number; total: Money | null; totalEur: number | null })[];
  totalEur: number;
  /** Destinations dont le coût n'est pas chiffré (visa, cas à vérifier) : le total ne les inclut pas. */
  unpriced: Dest[];
}

/** Coût d'un voyage (une ou plusieurs destinations) pour un groupe : chaque personne, enfant compris, paie la sienne. */
export function tripCost(d: AuthData, fx: FxData, nat: string, dests: Dest[], travellers: number, o: Options): TripResult {
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 20) throw new RangeError('travellers : entier de 1 à 20');
  const items = [...new Set(dests)].map((dest) => {
    const q = requirement(d, nat, dest, o);
    const total = q.perPerson ? { amount: Math.round(q.perPerson.amount * travellers * 100) / 100, currency: q.perPerson.currency } : null;
    return { ...q, travellers, total, totalEur: total ? toEur(total, fx) : null };
  });
  return {
    items,
    totalEur: Math.round(items.reduce((s, i) => s + (i.totalEur ?? 0), 0) * 100) / 100,
    unpriced: items.filter((i) => i.kind === 'visa' || i.kind === 'check').map((i) => i.dest),
  };
}

export interface Overcharge { officialEur: number; quotedEur: number; extraEur: number; ratio: number | null }

/** Écart entre un prix proposé (saisi par l'utilisateur, en euros) et le prix officiel converti. */
export function overcharge(officialEur: number, quotedEur: number): Overcharge {
  if (!(quotedEur >= 0) || quotedEur > 100000) throw new RangeError('quotedEur : 0 à 100 000');
  const extra = Math.round((quotedEur - officialEur) * 100) / 100;
  return { officialEur, quotedEur, extraEur: extra, ratio: officialEur > 0 ? Math.round((quotedEur / officialEur) * 10) / 10 : null };
}

const addMonths = (iso: string, m: number) => { const [y, mo, da] = iso.split('-').map(Number); const t = new Date(Date.UTC(y, mo - 1 + m, da)); if (t.getUTCDate() !== da) t.setUTCDate(0); return t.toISOString().slice(0, 10); };
const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

export interface Validity { validUntil: string; coversTrip: boolean; limitedByPassport: boolean }

/** « Mon autorisation est-elle encore valable pour ce voyage ? » : fin = délivrance + durée, ou fin du passeport si plus tôt.
 *  La règle vérifiée est l'entrée : l'autorisation doit être valable le jour de l'arrivée. */
export function validityFor(validityMonths: number, issued: string, passportExpiry: string, arrival: string): Validity {
  if (!(validityMonths > 0)) throw new RangeError('validityMonths');
  const ok = (x: string) => /^\d{4}-\d{2}-\d{2}$/.test(x) && !Number.isNaN(Date.parse(x));
  if (![issued, passportExpiry, arrival].every(ok) || passportExpiry < issued) throw new RangeError('dates');
  // Le dernier jour de validité est la veille de l'anniversaire (2 ans à partir du 10/05/2025 → jusqu'au 09/05/2027 inclus).
  const byTerm = addDays(addMonths(issued, validityMonths), -1);
  const validUntil = passportExpiry < byTerm ? passportExpiry : byTerm;
  return { validUntil, coversTrip: arrival >= issued && arrival <= validUntil, limitedByPassport: passportExpiry < byTerm };
}

/** Date limite conseillée pour demander : départ − délai officiel, en jours calendaires.
 *  UK : « jusqu'à 3 jours ouvrés » (gov.uk) → 5 jours calendaires pour couvrir un week-end ; CA : courriel sous 72 h si
 *  des documents sont demandés (canada.ca) ; NZ : « allow 72 hours » (INZ). US et AU : aucun délai chiffré publié
 *  (CBP : « dès que vous préparez le voyage » ; Home Affairs : réponse le plus souvent immédiate) → null. */
export function applyBy(departure: string, dest: Dest): string | null {
  const lead: Record<Dest, number | null> = { GB: 5, CA: 3, NZ: 3, US: null, AU: null };
  const l = lead[dest];
  return l == null ? null : addDays(departure, -l);
}
