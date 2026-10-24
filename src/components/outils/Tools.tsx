/**
 * Les simulateurs du site, tous sur le même moteur (lib/engine/travel-auth.ts) :
 *   Checker     nationalité + destinations + voyageurs → autorisation, prix officiel, total en euros, lien officiel
 *   Cost        une destination : prix pour un groupe ou une famille, canal (NZ), historique du prix
 *   Overcharge  prix proposé par un site contre prix officiel : écart et multiple
 *   Validity    date de délivrance + fin du passeport + arrivée → l'autorisation couvre-t-elle le voyage ?
 *   ApplyBy     date de départ → date limite conseillée pour demander
 *   Denied      ESTA : ce que coûte un refus
 *   Etias       ETIAS : frais pour un groupe selon l'âge (quand le système sera ouvert)
 * Premier rendu = valeurs du jour du build (refDay), identiques au serveur et au navigateur (RECETTE §17.5).
 * Les noms de pays arrivent en props, calculés au build.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { requirement, tripCost, toEur, overcharge, validityFor, applyBy, estaFeeOn, type Dest, type Money, type Requirement } from '../../lib/engine/travel-auth';
import { AUTH, FX, P } from '../../lib/engine/params';
import { formatMoney, formatNumber, formatCurrency, displayDate } from '../../lib/format';
import { LANG_TAGS } from '../../data/site-config';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, Row2, T, type L } from '../calc/kit';

type Opt = { value: string; label: string };
const eur = (x: number, l: L) => formatMoney(x, 2, l);
const cur = (m: Money, l: L) => formatCurrency(m.amount, m.currency, l);
const datum = (iso: string, l: L) => displayDate(iso, LANG_TAGS[l]);
const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const addYears = (iso: string, n: number) => `${Number(iso.slice(0, 4)) + n}${iso.slice(4)}`;
const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);

export const DESTS: Dest[] = ['GB', 'US', 'CA', 'AU', 'NZ'];
export const DEST_NAME: Record<Dest, Record<L, string>> = {
  GB: { en: 'United Kingdom', fr: 'Royaume-Uni', de: 'Großbritannien', nl: 'Verenigd Koninkrijk' },
  US: { en: 'United States', fr: 'États-Unis', de: 'USA', nl: 'Verenigde Staten' },
  CA: { en: 'Canada', fr: 'Canada', de: 'Kanada', nl: 'Canada' },
  AU: { en: 'Australia', fr: 'Australie', de: 'Australien', nl: 'Australië' },
  NZ: { en: 'New Zealand', fr: 'Nouvelle-Zélande', de: 'Neuseeland', nl: 'Nieuw-Zeeland' },
};
const SCHEME_NAME: Record<string, Record<L, string>> = {
  'UK ETA': { en: 'UK ETA', fr: 'ETA britannique', de: 'ETA für Großbritannien', nl: 'Britse ETA' },
  eTA: { en: 'Canadian eTA', fr: 'AVE canadienne (eTA)', de: 'kanadische eTA', nl: 'Canadese eTA' },
  ESTA: { en: 'ESTA', fr: 'ESTA', de: 'ESTA', nl: 'ESTA' },
  'ETA (subclass 601)': { en: 'Australian ETA (subclass 601)', fr: 'ETA australienne (601)', de: 'australische ETA (601)', nl: 'Australische ETA (601)' },
  'eVisitor (subclass 651)': { en: 'eVisitor (subclass 651)', fr: 'eVisitor (651)', de: 'eVisitor (651)', nl: 'eVisitor (651)' },
  NZeTA: { en: 'NZeTA', fr: 'NZeTA', de: 'NZeTA', nl: 'NZeTA' },
};
/** Seule adresse où demander, par destination (et par voie pour l'Australie). */
const APPLY: Record<Dest, { url: string; urlFr?: string; host: string }> = {
  GB: { url: P.sources.govukEtaApply.url, host: 'gov.uk/eta' },
  US: { url: P.sources.estaApply.url, host: 'esta.cbp.dhs.gov' },
  CA: { url: P.sources.caEta.url, urlFr: P.sources.caEta.urlFr, host: 'canada.ca' },
  AU: { url: P.sources.auEta.url, host: 'immi.homeaffairs.gov.au' },
  NZ: { url: P.sources.nzNzeta.url, host: 'immigration.govt.nz' },
};
const VALIDITY_MONTHS: Record<Dest, number> = { GB: 24, US: 24, CA: AUTH.ca.validityYears * 12, AU: 12, NZ: AUTH.nz.validityYears * 12 };

const NOTE: Record<string, Record<L, string>> = {
  'british-irish': { en: 'British and Irish citizens need no ETA.', fr: 'Les citoyens britanniques et irlandais n’ont pas besoin d’ETA.', de: 'Britische und irische Staatsangehörige brauchen keine ETA.', nl: 'Britse en Ierse burgers hebben geen ETA nodig.' },
  'per-person-incl-children': { en: 'One ETA per person, babies and children included.', fr: 'Une ETA par personne, bébés et enfants compris.', de: 'Eine ETA pro Person, auch für Babys und Kinder.', nl: 'Eén ETA per persoon, ook voor baby’s en kinderen.' },
  'no-refund': { en: 'No refund once you have applied.', fr: 'Aucun remboursement une fois la demande faite.', de: 'Keine Erstattung nach dem Antrag.', nl: 'Geen terugbetaling na de aanvraag.' },
  'airside-transit-exempt': { en: 'Not needed for an airside transit without passing border control.', fr: 'Inutile pour un transit sans passer le contrôle aux frontières (côté piste).', de: 'Nicht nötig beim Umstieg ohne Grenzkontrolle (airside).', nl: 'Niet nodig bij een transfer zonder grenscontrole (airside).' },
  'uk-visit-visa-6m': { en: 'Visa nationals apply for a Standard Visitor visa (6 months) instead.', fr: 'Les nationalités soumises au visa demandent un visa visiteur (6 mois).', de: 'Visumpflichtige beantragen ein Standard-Besuchervisum (6 Monate).', nl: 'Visumplichtigen vragen een Standard Visitor visum (6 maanden) aan.' },
  citizen: { en: 'Citizens enter with their own passport.', fr: 'Les citoyens entrent avec leur passeport.', de: 'Staatsangehörige reisen mit ihrem Pass ein.', nl: 'Burgers reizen in met hun paspoort.' },
  'us-citizen-exempt': { en: 'US citizens need no eTA.', fr: 'Les citoyens américains n’ont pas besoin d’AVE.', de: 'US-Bürger brauchen keine eTA.', nl: 'Amerikaanse burgers hebben geen eTA nodig.' },
  'us-pr-exempt': { en: 'US lawful permanent residents (green card) need no eTA.', fr: 'Les résidents permanents des États-Unis (carte verte) sont dispensés d’AVE.', de: 'Inhaber einer Green Card brauchen keine eTA.', nl: 'Houders van een green card hebben geen eTA nodig.' },
  'air-only': { en: 'Needed to fly to or through Canada; not by car, train, bus or boat.', fr: 'Exigée pour arriver en avion ou y transiter ; pas par la route, le train ou la mer.', de: 'Nur für Flugreisen nach oder über Kanada; nicht per Auto, Bahn, Bus oder Schiff.', nl: 'Alleen nodig om naar of via Canada te vliegen; niet met auto, trein, bus of boot.' },
  'land-sea-no-eta': { en: 'Arriving by land or sea: no eTA, only your passport.', fr: 'Arrivée par la route ou la mer : pas d’AVE, le passeport suffit.', de: 'Einreise über Land oder See: keine eTA, nur der Pass.', nl: 'Over land of zee: geen eTA, alleen uw paspoort.' },
  'conditions-7-01': { en: 'eTA only because you held a Canadian visa in the last 10 years or hold a valid US non-immigrant visa.', fr: 'AVE seulement parce que vous avez eu un visa canadien ces 10 dernières années ou avez un visa américain non-immigrant valide.', de: 'eTA nur, weil Sie in den letzten 10 Jahren ein kanadisches Visum hatten oder ein gültiges US-Visum (nicht für Einwanderer) besitzen.', nl: 'eTA alleen omdat u de laatste 10 jaar een Canadees visum had of een geldig Amerikaans niet-immigrantenvisum hebt.' },
  'conditions-not-met': { en: 'Without a Canadian visa in the last 10 years or a valid US visa, a visitor visa is required.', fr: 'Sans visa canadien ces 10 dernières années ni visa américain valide, un visa visiteur est exigé.', de: 'Ohne kanadisches Visum in den letzten 10 Jahren oder gültiges US-Visum ist ein Besuchervisum nötig.', nl: 'Zonder Canadees visum in de laatste 10 jaar of geldig Amerikaans visum is een bezoekersvisum nodig.' },
  'conditional-land-sea-visa': { en: 'By land or sea this nationality needs a visitor visa.', fr: 'Par la route ou la mer, cette nationalité a besoin d’un visa visiteur.', de: 'Über Land oder See braucht diese Staatsangehörigkeit ein Besuchervisum.', nl: 'Over land of zee heeft deze nationaliteit een bezoekersvisum nodig.' },
  'other-fees-may-apply': { en: 'Biometrics may cost extra: check canada.ca.', fr: 'La biométrie peut coûter en plus : voir canada.ca.', de: 'Biometrie kann extra kosten: siehe canada.ca.', nl: 'Biometrie kan extra kosten: zie canada.ca.' },
  'evisitor-free': { en: 'The eVisitor is free; the ETA app is an optional paid route for some passports.', fr: 'L’eVisitor est gratuit ; l’ETA payante par l’application reste possible pour certains passeports.', de: 'Der eVisitor ist kostenlos; die kostenpflichtige ETA per App ist für manche Pässe eine Alternative.', nl: 'De eVisitor is gratis; de betaalde ETA via de app is voor sommige paspoorten een alternatief.' },
  'stay-3-months': { en: 'Up to 3 months per visit.', fr: 'Jusqu’à 3 mois par séjour.', de: 'Bis zu 3 Monate je Aufenthalt.', nl: 'Tot 3 maanden per verblijf.' },
  'stay-6-months': { en: 'British passport holders: up to 6 months.', fr: 'Passeport britannique : jusqu’à 6 mois.', de: 'Britischer Pass: bis zu 6 Monate.', nl: 'Brits paspoort: tot 6 maanden.' },
  'app-only': { en: 'Apply only through the Australian ETA app.', fr: 'Demande uniquement dans l’application Australian ETA.', de: 'Antrag nur über die App Australian ETA.', nl: 'Aanvraag alleen via de app Australian ETA.' },
  'each-family-member': { en: 'Each family member needs a separate application.', fr: 'Chaque membre de la famille fait sa propre demande.', de: 'Jedes Familienmitglied braucht einen eigenen Antrag.', nl: 'Elk gezinslid doet een eigen aanvraag.' },
  'australian-exempt': { en: 'Australian citizens need no NZeTA.', fr: 'Les citoyens australiens n’ont pas besoin de NZeTA.', de: 'Australische Staatsangehörige brauchen keine NZeTA.', nl: 'Australische burgers hebben geen NZeTA nodig.' },
  'visit-only-ivl': { en: 'The price includes the NZD 100 tourist levy (IVL).', fr: 'Le prix inclut la taxe touristique IVL de 100 NZD.', de: 'Der Preis enthält die Touristenabgabe IVL von 100 NZD.', nl: 'De prijs bevat de toeristenheffing IVL van 100 NZD.' },
  'stay-90-days': { en: 'Up to 90 days, tourism or business.', fr: 'Jusqu’à 90 jours, tourisme ou affaires.', de: 'Bis zu 90 Tage, Urlaub oder Geschäftsreise.', nl: 'Tot 90 dagen, toerisme of zaken.' },
  'denied-fee': { en: 'If refused, part of the fee is kept.', fr: 'En cas de refus, une partie des frais est conservée.', de: 'Bei Ablehnung wird ein Teil der Gebühr einbehalten.', nl: 'Bij weigering wordt een deel van het tarief ingehouden.' },
  'apply-early': { en: 'Apply as soon as you start planning.', fr: 'Demandez dès le début des préparatifs.', de: 'Beantragen Sie sie, sobald Sie planen.', nl: 'Vraag aan zodra u begint te plannen.' },
  'canadian-visa-exempt': { en: 'Canadian citizens need no ESTA.', fr: 'Les citoyens canadiens n’ont pas besoin d’ESTA.', de: 'Kanadische Staatsangehörige brauchen keine ESTA.', nl: 'Canadese burgers hebben geen ESTA nodig.' },
};
const noteText = (n: string, l: L) => {
  if (n.startsWith('eta-from-')) return T(l, { en: `ETA required for travel from ${datum(n.slice(9), l)}.`, fr: `ETA exigée pour un voyage à partir du ${datum(n.slice(9), l)}.`, de: `ETA Pflicht für Reisen ab dem ${datum(n.slice(9), l)}.`, nl: `ETA verplicht voor reizen vanaf ${datum(n.slice(9), l)}.` });
  return NOTE[n]?.[l] ?? '';
};

function statusLine(q: Requirement, l: L): string {
  if (q.kind === 'none') return T(l, { en: 'No authorisation needed', fr: 'Aucune autorisation', de: 'Keine Genehmigung nötig', nl: 'Geen vergunning nodig' });
  if (q.kind === 'visa') return T(l, { en: 'Visa required (not an ETA)', fr: 'Visa exigé (pas d’ETA)', de: 'Visum nötig (keine ETA)', nl: 'Visum nodig (geen ETA)' });
  if (q.kind === 'check') return T(l, { en: 'Not in the lists we read: check the official site', fr: 'Hors des listes lues : vérifiez sur le site officiel', de: 'Nicht in den gelesenen Listen: amtliche Seite prüfen', nl: 'Niet in de gelezen lijsten: controleer de officiële site' });
  return SCHEME_NAME[q.scheme ?? '']?.[l] ?? String(q.scheme);
}

function DateField({ id, label, value, onChange, help }: { id: string; label: string; value: string; onChange: (v: string) => void; help?: string }) {
  return (
    <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
      <input id={id} type="date" value={value} onChange={(e) => { if (isIso(e.target.value)) onChange(e.target.value); }}
        className="h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
      {help && <p className="mt-1 text-xs text-navy-500">{help}</p>}
    </div>
  );
}

function ApplyLink({ dest, l, alt }: { dest: Dest; l: L; alt?: 'evisitor' }) {
  const a = APPLY[dest];
  const url = alt === 'evisitor' ? P.sources.auEvisitor.url : l === 'fr' && a.urlFr ? a.urlFr : a.url;
  return (
    <p className="mt-1 text-sm text-navy-800">
      {T(l, { en: 'Apply only at', fr: 'Demande uniquement sur', de: 'Antrag nur bei', nl: 'Aanvragen alleen op' })}{' '}
      <a href={url} target="_blank" rel="nofollow noopener noreferrer" className="font-medium text-accent-700 underline">{a.host}</a>
    </p>
  );
}

const yesNo = (l: L) => [{ value: 'oui', label: T(l, { en: 'Yes', fr: 'Oui', de: 'Ja', nl: 'Ja' }) }, { value: 'non', label: T(l, { en: 'No', fr: 'Non', de: 'Nein', nl: 'Nee' }) }];
const fxNote = (l: L) => T(l, {
  en: `Euro amounts: our conversion at the ECB reference rate of ${datum(FX.date, l)}; you pay in the official currency.`,
  fr: `Montants en euros : notre conversion au taux de référence BCE du ${datum(FX.date, l)} ; vous payez dans la devise officielle.`,
  de: `Euro-Beträge: unsere Umrechnung zum EZB-Referenzkurs vom ${datum(FX.date, l)}; bezahlt wird in der amtlichen Währung.`,
  nl: `Bedragen in euro: onze omrekening tegen de ECB-referentiekoers van ${datum(FX.date, l)}; u betaalt in de officiële munt.`,
});

/* ------------------------------------------------------------------ S1 : vérificateur complet */
interface CheckerProps { lang: L; refDay: string; id: string; nats: Opt[]; nat: string; dests: Dest[]; methodHref?: string }
export function Checker({ lang: l, refDay, id, nats, nat: nat0, dests: dests0, methodHref }: CheckerProps) {
  const [nat, setNat] = useState(nat0);
  const [dests, setDests] = useState<Dest[]>(dests0);
  const [n, setN] = useState(1);
  const [arrival, setArrival] = useState(addDays(refDay, 30));
  const [air, setAir] = useState('oui');
  const [pr, setPr] = useState('non');
  const [cond, setCond] = useState('non');
  const [nzApp, setNzApp] = useState('app');
  const toggle = (d: Dest) => setDests((x) => (x.includes(d) ? (x.length > 1 ? x.filter((y) => y !== d) : x) : DESTS.filter((y) => y === d || x.includes(y))));
  const travellers = Math.max(1, Math.min(20, Math.round(n || 1)));
  const opts = { travelDate: arrival, byAir: air === 'oui', usPermanentResident: pr === 'oui', meetsCanadaConditions: cond === 'oui', nzApp: nzApp === 'app', applicationDate: refDay };
  const r = useMemo(() => tripCost(AUTH, FX, nat, dests, travellers, opts), [nat, dests, travellers, arrival, air, pr, cond, nzApp, refDay]);
  const hasCa = dests.includes('CA');
  const caConditional = hasCa && AUTH.ca.conditional.includes(nat);
  const form = (
    <>
      <fieldset>
        <legend className="mb-1 block text-sm font-medium text-navy-700">{T(l, { en: 'Where are you going?', fr: 'Où allez-vous ?', de: 'Wohin reisen Sie?', nl: 'Waar gaat u heen?' })}</legend>
        <div className="flex flex-wrap gap-2">
          {DESTS.map((d) => {
            const on = dests.includes(d);
            return (
              <label key={d} className={`relative inline-flex h-12 cursor-pointer select-none items-center rounded-lg border px-4 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-accent-500 focus-within:ring-offset-1 ${on ? 'border-accent-600 bg-accent-600 text-white' : 'border-navy-300 bg-white text-navy-700 hover:bg-navy-50'}`}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(d)} />{DEST_NAME[d][l]}
              </label>
            );
          })}
        </div>
      </fieldset>
      <Row2>
        <SelectField id={`${id}-nat`} label={T(l, { en: 'Passport (nationality)', fr: 'Passeport (nationalité)', de: 'Reisepass (Staatsangehörigkeit)', nl: 'Paspoort (nationaliteit)' })} value={nat} onChange={setNat} options={nats} />
        <NumberField id={`${id}-n`} label={T(l, { en: 'Travellers, children included', fr: 'Voyageurs, enfants compris', de: 'Reisende, Kinder mitgezählt', nl: 'Reizigers, kinderen inbegrepen' })} value={n} onChange={setN} min={1} max={20} />
        <DateField id={`${id}-date`} label={T(l, { en: 'Arrival date', fr: 'Date d’arrivée', de: 'Ankunftsdatum', nl: 'Aankomstdatum' })} value={arrival} onChange={setArrival} />
        {dests.includes('NZ')
          ? <Toggle id={`${id}-nz`} label={T(l, { en: 'NZeTA requested by', fr: 'NZeTA demandée par', de: 'NZeTA beantragt per', nl: 'NZeTA aangevraagd via' })} value={nzApp} onChange={setNzApp} options={[{ value: 'app', label: 'App' }, { value: 'web', label: 'Web' }]} />
          : hasCa ? <Toggle id={`${id}-air`} label={T(l, { en: 'Flying to Canada?', fr: 'Arrivée au Canada en avion ?', de: 'Flug nach Kanada?', nl: 'Vliegt u naar Canada?' })} value={air} onChange={setAir} options={yesNo(l)} /> : null}
      </Row2>
      {hasCa && (
        <Row2>
          {dests.includes('NZ') && <Toggle id={`${id}-air2`} label={T(l, { en: 'Flying to Canada?', fr: 'Arrivée au Canada en avion ?', de: 'Flug nach Kanada?', nl: 'Vliegt u naar Canada?' })} value={air} onChange={setAir} options={yesNo(l)} />}
          {nat !== 'US' && nat !== 'CA' && <Toggle id={`${id}-pr`} label={T(l, { en: 'US green card?', fr: 'Carte verte américaine ?', de: 'US-Green-Card?', nl: 'Amerikaanse green card?' })} value={pr} onChange={setPr} options={yesNo(l)} />}
          {caConditional && <Toggle id={`${id}-cond`} label={T(l, { en: 'Canadian visa (10 years) or US visa?', fr: 'Visa canadien (10 ans) ou visa US ?', de: 'Kanada-Visum (10 J.) oder US-Visum?', nl: 'Canadees visum (10 jr) of VS-visum?' })} value={cond} onChange={setCond} options={yesNo(l)} />}
        </Row2>
      )}
    </>
  );
  const priced = r.items.filter((i) => i.totalEur != null && (i.perPerson?.amount ?? 0) > 0);
  const result = (
    <>
      <Head label={T(l, { en: `Official total, ${travellers} traveller${travellers > 1 ? 's' : ''}`, fr: `Total officiel, ${travellers} voyageur${travellers > 1 ? 's' : ''}`, de: `Amtlicher Gesamtpreis, ${travellers} ${travellers > 1 ? 'Reisende' : 'Person'}`, nl: `Officieel totaal, ${travellers} ${travellers > 1 ? 'reizigers' : 'reiziger'}` })}
        value={eur(r.totalEur, l)} sub={priced.length ? priced.map((i) => cur(i.total!, l)).join(' + ') : T(l, { en: 'Nothing to pay for these destinations', fr: 'Rien à payer pour ces destinations', de: 'Für diese Ziele nichts zu zahlen', nl: 'Niets te betalen voor deze bestemmingen' })} />
      <ul className="mt-4 space-y-3 text-sm">
        {r.items.map((i) => {
          const by = i.kind === 'eta' || i.kind === 'eta-conditional' ? applyBy(arrival, i.dest) : null;
          return (
            <li key={i.dest} className="border-t border-accent-200 pt-3">
              <p className="flex justify-between gap-3 font-semibold text-navy-900"><span>{DEST_NAME[i.dest][l]}</span><span className="tabular-nums">{i.total ? cur(i.total, l) : i.kind === 'visa' && i.parts[0] ? `${T(l, { en: 'visa', fr: 'visa', de: 'Visum', nl: 'visum' })} ${cur(i.parts[0].money, l)}` : '–'}</span></p>
              <p className="text-navy-800">{statusLine(i, l)}{i.perPerson && travellers > 1 && i.perPerson.amount > 0 ? ` · ${cur(i.perPerson, l)} × ${travellers}` : ''}{i.totalEur ? ` · ${eur(i.totalEur, l)}` : ''}</p>
              {i.validityMonths && <p className="text-navy-700">{T(l, { en: `Valid ${i.validityMonths / 12 >= 1 ? `${i.validityMonths / 12} year${i.validityMonths > 12 ? 's' : ''}` : ''} or until the passport expires`, fr: `Valable ${i.validityMonths / 12} an${i.validityMonths > 12 ? 's' : ''} ou jusqu’à la fin du passeport`, de: `Gültig ${i.validityMonths / 12} Jahr${i.validityMonths > 12 ? 'e' : ''} oder bis zum Ablauf des Passes`, nl: `Geldig ${i.validityMonths / 12} jaar of tot het paspoort verloopt` })}</p>}
              {by && <p className="text-navy-700">{T(l, { en: 'Apply by', fr: 'À demander avant le', de: 'Beantragen bis', nl: 'Aanvragen vóór' })} {datum(by, l)}</p>}
              {i.notes.slice(0, 2).map((x) => noteText(x, l)).filter(Boolean).map((t) => <p key={t} className="text-navy-700">{t}</p>)}
              {(i.kind === 'eta' || i.kind === 'eta-conditional' || i.kind === 'evisitor' || i.kind === 'check') && <ApplyLink dest={i.dest} l={l} alt={i.kind === 'evisitor' ? 'evisitor' : undefined} />}
            </li>
          );
        })}
      </ul>
      <Note>{fxNote(l)}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell form={form} result={result} id={id} />;
}

/* ------------------------------------------------------------------ S2 : prix pour un groupe, une destination */
interface CostProps { lang: L; refDay: string; id: string; nats: Opt[]; nat: string; dest: Dest; methodHref?: string; secondary?: boolean }
export function Cost({ lang: l, refDay, id, nats, nat: nat0, dest, methodHref, secondary }: CostProps) {
  const [nat, setNat] = useState(nat0);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(2);
  const [nzApp, setNzApp] = useState('app');
  const people = Math.max(1, Math.min(20, Math.round((adults || 0) + (kids || 0)) || 1));
  const q = requirement(AUTH, nat, dest, { travelDate: addDays(refDay, 30), nzApp: nzApp === 'app', applicationDate: refDay });
  const per = q.perPerson;
  const total = per ? { amount: Math.round(per.amount * people * 100) / 100, currency: per.currency } : null;
  const history: Partial<Record<Dest, ReactNode>> = {
    GB: T(l, { en: `${cur(AUTH.uk.previousFee, l)} until ${datum(addDays(AUTH.uk.fee.since, -1), l)}, ${cur(AUTH.uk.fee, l)} since ${datum(AUTH.uk.fee.since, l)}.`, fr: `${cur(AUTH.uk.previousFee, l)} jusqu’au ${datum(addDays(AUTH.uk.fee.since, -1), l)}, ${cur(AUTH.uk.fee, l)} depuis le ${datum(AUTH.uk.fee.since, l)}.`, de: `${cur(AUTH.uk.previousFee, l)} bis zum ${datum(addDays(AUTH.uk.fee.since, -1), l)}, seit dem ${datum(AUTH.uk.fee.since, l)} ${cur(AUTH.uk.fee, l)}.`, nl: `${cur(AUTH.uk.previousFee, l)} tot ${datum(addDays(AUTH.uk.fee.since, -1), l)}, sinds ${datum(AUTH.uk.fee.since, l)} ${cur(AUTH.uk.fee, l)}.` }),
    US: T(l, { en: `${cur(AUTH.us.previousFee, l)} until ${datum(addDays(AUTH.us.feeSince, -1), l)}, ${cur(AUTH.us.fee, l)} since ${datum(AUTH.us.feeSince, l)}.`, fr: `${cur(AUTH.us.previousFee, l)} jusqu’au ${datum(addDays(AUTH.us.feeSince, -1), l)}, ${cur(AUTH.us.fee, l)} depuis le ${datum(AUTH.us.feeSince, l)}.`, de: `${cur(AUTH.us.previousFee, l)} bis zum ${datum(addDays(AUTH.us.feeSince, -1), l)}, seit dem ${datum(AUTH.us.feeSince, l)} ${cur(AUTH.us.fee, l)}.`, nl: `${cur(AUTH.us.previousFee, l)} tot ${datum(addDays(AUTH.us.feeSince, -1), l)}, sinds ${datum(AUTH.us.feeSince, l)} ${cur(AUTH.us.fee, l)}.` }),
  };
  const form = (
    <Row2>
      <SelectField id={`${id}-nat`} label={T(l, { en: 'Passport', fr: 'Passeport', de: 'Reisepass', nl: 'Paspoort' })} value={nat} onChange={setNat} options={nats} />
      {dest === 'NZ' ? <Toggle id={`${id}-nz`} label={T(l, { en: 'Requested by', fr: 'Demande par', de: 'Antrag per', nl: 'Aanvraag via' })} value={nzApp} onChange={setNzApp} options={[{ value: 'app', label: 'App' }, { value: 'web', label: 'Web' }]} /> : <span aria-hidden="true" />}
      <NumberField id={`${id}-a`} label={T(l, { en: 'Adults', fr: 'Adultes', de: 'Erwachsene', nl: 'Volwassenen' })} value={adults} onChange={setAdults} max={20} />
      <NumberField id={`${id}-k`} label={T(l, { en: 'Children and babies', fr: 'Enfants et bébés', de: 'Kinder und Babys', nl: 'Kinderen en baby’s' })} value={kids} onChange={setKids} max={20} />
    </Row2>
  );
  const result = (
    <>
      <Head label={T(l, { en: `${DEST_NAME[dest][l]}, ${people} people`, fr: `${DEST_NAME[dest][l]}, ${people} personne${people > 1 ? 's' : ''}`, de: `${DEST_NAME[dest][l]}, ${people} ${people > 1 ? 'Personen' : 'Person'}`, nl: `${DEST_NAME[dest][l]}, ${people} ${people > 1 ? 'personen' : 'persoon'}` })}
        value={total ? cur(total, l) : '–'} sub={total ? `≈ ${eur(toEur(total, FX), l)} · ${statusLine(q, l)}` : statusLine(q, l)} />
      {per && <Rows rows={[
        ...q.parts.map((p) => [p.label === 'ivl' ? T(l, { en: 'Tourist levy (IVL), per person', fr: 'Taxe touristique IVL, par personne', de: 'Touristenabgabe IVL, je Person', nl: 'Toeristenheffing IVL, per persoon' }) : T(l, { en: 'Official fee, per person', fr: 'Frais officiels, par personne', de: 'Amtliche Gebühr, je Person', nl: 'Officieel tarief, per persoon' }), cur(p.money, l)] as [string, string]),
        [T(l, { en: 'People (children pay the same)', fr: 'Personnes (même prix pour un enfant)', de: 'Personen (Kinder zahlen gleich viel)', nl: 'Personen (kinderen betalen hetzelfde)' }), String(people)],
        [T(l, { en: 'Total', fr: 'Total', de: 'Summe', nl: 'Totaal' }), total ? cur(total, l) : '–', true],
      ]} />}
      {q.alternative && <Note>{T(l, { en: `Optional paid route: ${SCHEME_NAME[q.alternative.scheme][l]} at ${cur(q.alternative.perPerson, l)} each.`, fr: `Voie payante facultative : ${SCHEME_NAME[q.alternative.scheme][l]} à ${cur(q.alternative.perPerson, l)} par personne.`, de: `Optionale kostenpflichtige Alternative: ${SCHEME_NAME[q.alternative.scheme][l]} zu ${cur(q.alternative.perPerson, l)} je Person.`, nl: `Optioneel betaald alternatief: ${SCHEME_NAME[q.alternative.scheme][l]} à ${cur(q.alternative.perPerson, l)} per persoon.` })}</Note>}
      {dest === 'NZ' && per && <Note>{T(l, { en: `Using the app instead of the website saves ${cur({ amount: (AUTH.nz.nzeta.web.amount - AUTH.nz.nzeta.app.amount) * people, currency: 'NZD' }, l)}.`, fr: `L’application plutôt que le site fait économiser ${cur({ amount: (AUTH.nz.nzeta.web.amount - AUTH.nz.nzeta.app.amount) * people, currency: 'NZD' }, l)}.`, de: `Per App statt Website sparen Sie ${cur({ amount: (AUTH.nz.nzeta.web.amount - AUTH.nz.nzeta.app.amount) * people, currency: 'NZD' }, l)}.`, nl: `Via de app in plaats van de website bespaart u ${cur({ amount: (AUTH.nz.nzeta.web.amount - AUTH.nz.nzeta.app.amount) * people, currency: 'NZD' }, l)}.` })}</Note>}
      {history[dest] && <Note>{T(l, { en: 'Price history: ', fr: 'Évolution du prix : ', de: 'Preisentwicklung: ', nl: 'Prijsverloop: ' })}{history[dest]}</Note>}
      {(q.kind === 'eta' || q.kind === 'evisitor') && <ApplyLink dest={dest} l={l} alt={q.kind === 'evisitor' ? 'evisitor' : undefined} />}
      {!secondary && <MethodLink href={methodHref} lang={l} />}
    </>
  );
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? T(l, { en: 'Price for your group', fr: 'Prix pour votre groupe', de: 'Preis für Ihre Gruppe', nl: 'Prijs voor uw groep' }) : undefined} />;
}

/* ------------------------------------------------------------------ S3 : prix proposé contre prix officiel */
/** Prix officiel minimal par personne : ETA de l'app pour l'Australie, app NZeTA + IVL pour la Nouvelle-Zélande. */
export function officialPerPerson(dest: Dest, refDay: string): Money {
  switch (dest) {
    case 'GB': return { amount: AUTH.uk.fee.amount, currency: 'GBP' };
    case 'CA': return AUTH.ca.fee;
    case 'US': return estaFeeOn(AUTH, refDay);
    case 'AU': return AUTH.au.eta.fee;
    case 'NZ': return { amount: AUTH.nz.nzeta.app.amount + AUTH.nz.ivl.amount, currency: 'NZD' };
  }
}
interface DestToolProps { lang: L; refDay: string; id: string; dest: Dest; secondary?: boolean; methodHref?: string }
export function Overcharge({ lang: l, refDay, id, dest: d0, secondary = true, methodHref }: DestToolProps) {
  const [dest, setDest] = useState<string>(d0);
  const [people, setPeople] = useState(1);
  const [quoted, setQuoted] = useState(79);
  const off = officialPerPerson(dest as Dest, refDay);
  const n = Math.max(1, Math.min(20, Math.round(people || 1)));
  const offEur = toEur({ amount: off.amount * n, currency: off.currency }, FX);
  const o = overcharge(offEur, Math.max(0, quoted || 0) * n);
  const form = (
    <Row2>
      <SelectField id={`${id}-dest`} label={T(l, { en: 'Authorisation', fr: 'Autorisation', de: 'Genehmigung', nl: 'Vergunning' })} value={dest} onChange={setDest} options={DESTS.map((x) => ({ value: x, label: DEST_NAME[x][l] }))} />
      <NumberField id={`${id}-n`} label={T(l, { en: 'Travellers', fr: 'Voyageurs', de: 'Reisende', nl: 'Reizigers' })} value={people} onChange={setPeople} min={1} max={20} />
      <NumberField id={`${id}-q`} label={T(l, { en: 'Price a site asks, per person', fr: 'Prix demandé par un site, par personne', de: 'Verlangter Preis je Person', nl: 'Gevraagde prijs per persoon' })} value={quoted} onChange={setQuoted} unit="€" max={2000} decimals={2} />
    </Row2>
  );
  const result = (
    <>
      <Head label={T(l, { en: 'You would pay on top of the official fee', fr: 'Vous paieriez en plus du prix officiel', de: 'Aufschlag auf die amtliche Gebühr', nl: 'Bovenop het officiële tarief betaalt u' })} value={eur(Math.max(0, o.extraEur), l)}
        sub={o.ratio && o.ratio > 1 ? T(l, { en: `${formatNumber(o.ratio, 1, l)} times the official price`, fr: `${formatNumber(o.ratio, 1, l)} fois le prix officiel`, de: `${formatNumber(o.ratio, 1, l)}-mal der amtliche Preis`, nl: `${formatNumber(o.ratio, 1, l)} keer de officiële prijs` }) : T(l, { en: 'No mark-up', fr: 'Pas de surcoût', de: 'Kein Aufschlag', nl: 'Geen toeslag' })} />
      <Rows rows={[
        [T(l, { en: 'Official, per person', fr: 'Officiel, par personne', de: 'Amtlich, je Person', nl: 'Officieel, per persoon' }), `${cur(off, l)} ≈ ${eur(toEur(off, FX), l)}`],
        [T(l, { en: 'Official, whole group', fr: 'Officiel, tout le groupe', de: 'Amtlich, ganze Gruppe', nl: 'Officieel, hele groep' }), eur(offEur, l)],
        [T(l, { en: 'Price asked, whole group', fr: 'Prix demandé, tout le groupe', de: 'Verlangt, ganze Gruppe', nl: 'Gevraagd, hele groep' }), eur(o.quotedEur, l), true],
      ]} />
      <ApplyLink dest={dest as Dest} l={l} />
      {!secondary && <MethodLink href={methodHref} lang={l} />}
    </>
  );
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? T(l, { en: 'Check a price you were quoted', fr: 'Vérifier un prix qu’on vous propose', de: 'Angebotenen Preis prüfen', nl: 'Een aangeboden prijs controleren' }) : undefined} />;
}

/* ------------------------------------------------------------------ S4 : validité pour un voyage */
export function Validity({ lang: l, refDay, id, dest: d0, secondary = true }: DestToolProps) {
  const [dest, setDest] = useState<string>(d0);
  const [issued, setIssued] = useState(addYears(refDay, -1));
  const [passport, setPassport] = useState(addYears(refDay, 4));
  const [arrival, setArrival] = useState(addDays(refDay, 60));
  const months = VALIDITY_MONTHS[dest as Dest];
  const ok = issued <= passport;
  const v = ok ? validityFor(months, issued, passport, arrival) : null;
  const form = (
    <Row2>
      <SelectField id={`${id}-dest`} label={T(l, { en: 'Authorisation', fr: 'Autorisation', de: 'Genehmigung', nl: 'Vergunning' })} value={dest} onChange={setDest} options={DESTS.map((x) => ({ value: x, label: DEST_NAME[x][l] }))} />
      <DateField id={`${id}-i`} label={T(l, { en: 'Granted on', fr: 'Accordée le', de: 'Erteilt am', nl: 'Verleend op' })} value={issued} onChange={setIssued} />
      <DateField id={`${id}-p`} label={T(l, { en: 'Passport expires on', fr: 'Fin du passeport', de: 'Pass gültig bis', nl: 'Paspoort geldig tot' })} value={passport} onChange={setPassport} />
      <DateField id={`${id}-a`} label={T(l, { en: 'Arrival on', fr: 'Arrivée le', de: 'Ankunft am', nl: 'Aankomst op' })} value={arrival} onChange={setArrival} />
    </Row2>
  );
  const result = v ? (
    <>
      <Head label={T(l, { en: 'Valid until', fr: 'Valable jusqu’au', de: 'Gültig bis', nl: 'Geldig tot' })} value={datum(v.validUntil, l)}
        sub={v.coversTrip ? T(l, { en: 'Covers your arrival date', fr: 'Couvre votre date d’arrivée', de: 'Deckt Ihr Ankunftsdatum ab', nl: 'Dekt uw aankomstdatum' }) : T(l, { en: 'Does NOT cover your arrival: apply again', fr: 'Ne couvre PAS votre arrivée : refaites une demande', de: 'Deckt Ihre Ankunft NICHT ab: neu beantragen', nl: 'Dekt uw aankomst NIET: opnieuw aanvragen' })} />
      <Rows rows={[
        [T(l, { en: 'Term of the authorisation', fr: 'Durée de l’autorisation', de: 'Laufzeit der Genehmigung', nl: 'Looptijd van de vergunning' }), T(l, { en: `${months / 12} year${months > 12 ? 's' : ''}`, fr: `${months / 12} an${months > 12 ? 's' : ''}`, de: `${months / 12} Jahr${months > 12 ? 'e' : ''}`, nl: `${months / 12} jaar` })],
        [T(l, { en: 'Limited by the passport', fr: 'Limitée par le passeport', de: 'Durch den Pass begrenzt', nl: 'Beperkt door het paspoort' }), v.limitedByPassport ? T(l, { en: 'yes', fr: 'oui', de: 'ja', nl: 'ja' }) : T(l, { en: 'no', fr: 'non', de: 'nein', nl: 'nee' })],
      ]} />
      <Note>{T(l, { en: 'A new passport cancels the link: the authorisation is tied to the passport you applied with.', fr: 'Un nouveau passeport rompt le lien : l’autorisation est liée au passeport utilisé pour la demande.', de: 'Ein neuer Pass beendet die Verknüpfung: Die Genehmigung hängt an dem Pass, mit dem Sie beantragt haben.', nl: 'Een nieuw paspoort verbreekt de koppeling: de vergunning hangt aan het paspoort waarmee u aanvroeg.' })}</Note>
    </>
  ) : <Note>{T(l, { en: 'The passport end date must come after the grant date.', fr: 'La fin du passeport doit suivre la date d’octroi.', de: 'Das Passende muss nach dem Erteilungsdatum liegen.', nl: 'De einddatum van het paspoort moet na de verleningsdatum liggen.' })}</Note>;
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? T(l, { en: 'Is my authorisation still valid?', fr: 'Mon autorisation est-elle encore valable ?', de: 'Ist meine Genehmigung noch gültig?', nl: 'Is mijn vergunning nog geldig?' }) : undefined} />;
}

/* ------------------------------------------------------------------ S5 : date limite pour demander */
const LEAD_TEXT: Record<Dest, Record<L, string>> = {
  GB: { en: 'GOV.UK: usually within a day, up to 3 working days.', fr: 'GOV.UK : en général sous un jour, jusqu’à 3 jours ouvrés.', de: 'GOV.UK: meist innerhalb eines Tages, bis zu 3 Werktage.', nl: 'GOV.UK: meestal binnen een dag, tot 3 werkdagen.' },
  CA: { en: 'Canada: most approved within minutes; if documents are asked for, an email within 72 hours.', fr: 'Canada : la plupart en quelques minutes ; si des documents sont demandés, un courriel sous 72 heures.', de: 'Kanada: meist in Minuten; werden Unterlagen verlangt, eine E-Mail binnen 72 Stunden.', nl: 'Canada: meestal binnen minuten; worden documenten gevraagd, dan een e-mail binnen 72 uur.' },
  NZ: { en: 'Immigration New Zealand: allow 72 hours.', fr: 'Immigration New Zealand : prévoir 72 heures.', de: 'Immigration New Zealand: 72 Stunden einplanen.', nl: 'Immigration New Zealand: reken op 72 uur.' },
  US: { en: 'CBP gives no fixed delay: apply as soon as you plan the trip, before buying tickets.', fr: 'Le CBP ne fixe aucun délai : demandez dès que vous préparez le voyage, avant d’acheter les billets.', de: 'Die CBP nennt keine feste Frist: beantragen, sobald Sie planen, vor dem Ticketkauf.', nl: 'CBP noemt geen vaste termijn: vraag aan zodra u plant, vóór u tickets koopt.' },
  AU: { en: 'Home Affairs gives no fixed delay: apply as soon as you plan the trip.', fr: 'Home Affairs ne fixe aucun délai : demandez dès que vous préparez le voyage.', de: 'Home Affairs nennt keine feste Frist: beantragen, sobald Sie planen.', nl: 'Home Affairs noemt geen vaste termijn: vraag aan zodra u plant.' },
};
export function ApplyBy({ lang: l, refDay, id, dest: d0, secondary = true }: DestToolProps) {
  const [dest, setDest] = useState<string>(d0);
  const [dep, setDep] = useState(addDays(refDay, 21));
  const [today, setToday] = useState(refDay);
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  const by = applyBy(dep, dest as Dest);
  const left = by ? daysBetween(today, by) : daysBetween(today, dep);
  const form = (
    <Row2>
      <SelectField id={`${id}-dest`} label={T(l, { en: 'Destination', fr: 'Destination', de: 'Reiseziel', nl: 'Bestemming' })} value={dest} onChange={setDest} options={DESTS.map((x) => ({ value: x, label: DEST_NAME[x][l] }))} />
      <DateField id={`${id}-dep`} label={T(l, { en: 'Departure date', fr: 'Date de départ', de: 'Abreisedatum', nl: 'Vertrekdatum' })} value={dep} onChange={setDep} />
    </Row2>
  );
  const result = (
    <>
      <Head label={T(l, { en: 'Apply at the latest on', fr: 'Demandez au plus tard le', de: 'Spätestens beantragen am', nl: 'Uiterlijk aanvragen op' })} value={datum(by ?? today, l)}
        sub={by ? (left >= 0 ? T(l, { en: `${left} day${left === 1 ? '' : 's'} left`, fr: `Il reste ${left} jour${left > 1 ? 's' : ''}`, de: `Noch ${left} Tag${left === 1 ? '' : 'e'}`, nl: `Nog ${left} dag${left === 1 ? '' : 'en'}` }) : T(l, { en: 'Late: apply today and keep proof of the decision', fr: 'En retard : demandez aujourd’hui', de: 'Knapp: heute noch beantragen', nl: 'Laat: vraag vandaag nog aan' })) : T(l, { en: 'No official deadline: today is best', fr: 'Pas de délai officiel : aujourd’hui, c’est le mieux', de: 'Keine amtliche Frist: am besten heute', nl: 'Geen officiële termijn: vandaag is het best' })} />
      <Note>{LEAD_TEXT[dest as Dest][l]}</Note>
      <Note>{T(l, { en: 'Our margin: calendar days covering the longest official delay, weekends included.', fr: 'Notre marge : des jours calendaires qui couvrent le délai officiel le plus long, week-end compris.', de: 'Unsere Reserve: Kalendertage, die die längste amtliche Frist samt Wochenende abdecken.', nl: 'Onze marge: kalenderdagen die de langste officiële termijn dekken, weekend inbegrepen.' })}</Note>
      <ApplyLink dest={dest as Dest} l={l} />
    </>
  );
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? T(l, { en: 'When should I apply?', fr: 'Quand faire la demande ?', de: 'Wann beantragen?', nl: 'Wanneer aanvragen?' }) : undefined} />;
}

/* ------------------------------------------------------------------ S8 : ESTA refusée */
export function Denied({ lang: l, refDay, id, secondary = true }: { lang: L; refDay: string; id: string; secondary?: boolean }) {
  const [n, setN] = useState(3);
  const [refused, setRefused] = useState(1);
  const fee = estaFeeOn(AUTH, refDay);
  const total = Math.max(1, Math.min(20, Math.round(n || 1)));
  const den = Math.max(0, Math.min(total, Math.round(refused || 0)));
  const paid = { amount: Math.round(((total - den) * fee.amount + den * AUTH.us.feeIfDenied.amount) * 100) / 100, currency: 'USD' as const };
  const form = (
    <Row2>
      <NumberField id={`${id}-n`} label={T(l, { en: 'Applications', fr: 'Demandes', de: 'Anträge', nl: 'Aanvragen' })} value={n} onChange={setN} min={1} max={20} />
      <NumberField id={`${id}-r`} label={T(l, { en: 'Of which refused', fr: 'Dont refusées', de: 'Davon abgelehnt', nl: 'Waarvan geweigerd' })} value={refused} onChange={setRefused} max={20} />
    </Row2>
  );
  const result = (
    <>
      <Head label={T(l, { en: 'Paid to CBP in all', fr: 'Payé au CBP au total', de: 'Insgesamt an die CBP gezahlt', nl: 'In totaal aan CBP betaald' })} value={cur(paid, l)} sub={`≈ ${eur(toEur(paid, FX), l)}`} />
      <Rows rows={[
        [T(l, { en: 'Approved', fr: 'Acceptées', de: 'Genehmigt', nl: 'Goedgekeurd' }), `${total - den} × ${cur(fee, l)}`],
        [T(l, { en: 'Refused', fr: 'Refusées', de: 'Abgelehnt', nl: 'Geweigerd' }), `${den} × ${cur(AUTH.us.feeIfDenied, l)}`],
      ]} />
      <Note>{T(l, { en: 'After a refusal the route is a visa application at a US embassy or consulate; that fee is not shown here.', fr: 'Après un refus, il faut demander un visa à une ambassade ou un consulat américain ; ce montant n’est pas affiché ici.', de: 'Nach einer Ablehnung führt der Weg über ein Visum bei einer US-Botschaft oder einem Konsulat; diese Gebühr steht hier nicht.', nl: 'Na een weigering is de weg een visumaanvraag bij een Amerikaanse ambassade of consulaat; dat tarief staat hier niet.' })}</Note>
    </>
  );
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? T(l, { en: 'What a refusal costs', fr: 'Ce que coûte un refus', de: 'Was eine Ablehnung kostet', nl: 'Wat een weigering kost' }) : undefined} />;
}

/* ------------------------------------------------------------------ ETIAS : frais selon l'âge */
export function Etias({ lang: l, id, secondary = false, methodHref }: { lang: L; refDay: string; id: string; secondary?: boolean; methodHref?: string }) {
  const E = P.etias;
  const [eu, setEu] = useState('non');
  const [adults, setAdults] = useState(2);
  const [young, setYoung] = useState(1);
  const [old, setOld] = useState(0);
  const a = Math.max(0, Math.round(adults || 0)), y = Math.max(0, Math.round(young || 0)), o = Math.max(0, Math.round(old || 0));
  const due = eu === 'oui' ? 0 : a * E.fee.amount;
  const form = (
    <>
      <Row2>
        <Toggle id={`${id}-eu`} label={T(l, { en: 'EU, EEA or Swiss citizen?', fr: 'Citoyen UE, EEE ou suisse ?', de: 'EU-, EWR- oder Schweizer Bürger?', nl: 'Burger van EU, EER of Zwitserland?' })} value={eu} onChange={setEu} options={yesNo(l)} />
        <NumberField id={`${id}-a`} label={T(l, { en: `Aged ${E.feeExemptUnder} to ${E.feeExemptOver}`, fr: `De ${E.feeExemptUnder} à ${E.feeExemptOver} ans`, de: `${E.feeExemptUnder} bis ${E.feeExemptOver} Jahre`, nl: `${E.feeExemptUnder} tot ${E.feeExemptOver} jaar` })} value={adults} onChange={setAdults} max={20} />
        <NumberField id={`${id}-y`} label={T(l, { en: `Under ${E.feeExemptUnder}`, fr: `Moins de ${E.feeExemptUnder} ans`, de: `Unter ${E.feeExemptUnder}`, nl: `Jonger dan ${E.feeExemptUnder}` })} value={young} onChange={setYoung} max={20} />
        <NumberField id={`${id}-o`} label={T(l, { en: `Over ${E.feeExemptOver}`, fr: `Plus de ${E.feeExemptOver} ans`, de: `Über ${E.feeExemptOver}`, nl: `Ouder dan ${E.feeExemptOver}` })} value={old} onChange={setOld} max={20} />
      </Row2>
    </>
  );
  const result = (
    <>
      <Head label={T(l, { en: 'ETIAS fee for the group, once it opens', fr: 'Frais ETIAS du groupe, à l’ouverture', de: 'ETIAS-Gebühr der Gruppe, ab Start', nl: 'ETIAS-tarief van de groep, na de start' })} value={eur(due, l)}
        sub={eu === 'oui' ? T(l, { en: 'EU, EEA and Swiss citizens need no ETIAS', fr: 'Les citoyens UE, EEE et suisses n’en ont pas besoin', de: 'EU-, EWR- und Schweizer Bürger brauchen kein ETIAS', nl: 'Burgers van EU, EER en Zwitserland hebben geen ETIAS nodig' }) : T(l, { en: `${a + y + o} applications, ${y + o} free`, fr: `${a + y + o} demandes, dont ${y + o} gratuites`, de: `${a + y + o} Anträge, davon ${y + o} gebührenfrei`, nl: `${a + y + o} aanvragen, waarvan ${y + o} gratis` })} />
      <Note>{T(l, { en: `Not yet in operation: no start date had been published on ${datum(E.statusReadOn, l)}. Nobody can sell you an ETIAS today.`, fr: `Pas encore en service : aucune date de lancement publiée au ${datum(E.statusReadOn, l)}. Personne ne peut vous vendre d’ETIAS aujourd’hui.`, de: `Noch nicht in Betrieb: Am ${datum(E.statusReadOn, l)} war kein Starttermin veröffentlicht. Niemand kann Ihnen heute ein ETIAS verkaufen.`, nl: `Nog niet in werking: op ${datum(E.statusReadOn, l)} was geen startdatum gepubliceerd. Niemand kan u vandaag een ETIAS verkopen.` })}</Note>
      {!secondary && <MethodLink href={methodHref} lang={l} />}
    </>
  );
  return <Shell form={form} result={result} id={id} secondary={secondary} title={secondary ? 'ETIAS' : undefined} />;
}
