#!/usr/bin/env node
// Relit les sources officielles des cinq autorisations de voyage et régénère data/authorisations.json et data/fx.json.
// Usage : node scripts/update-data.mjs [--dry]   (Node ≥ 20, aucune dépendance)
//
// Sources (toutes officielles, licence citée dans data/sources.json) :
//   UK  : API de contenu GOV.UK (OGL v3) : /eta, Appendix ETA National List, Appendix Visitor: Visa national list,
//         tableau des frais du Home Office (fichier .ods joint à « UK visa fees »)
//   CA  : Règlement sur l'immigration et la protection des réfugiés DORS/2002-227, Justice Laws (Décret sur la
//         reproduction de la législation fédérale TR/97-5) : art. 7.01, 12.05, 190, 294.1, 296, annexe 1.1
//   US  : DHS « Visa Waiver Program » (œuvre fédérale, domaine public) + Federal Register API (dernier avis
//         « Certain DHS Immigration-Related Fees Required by HR-1 ») + eCFR 8 CFR 217.5
//   AU  : Home Affairs, pages ETA (601) et eVisitor (651) (CC BY 3.0 AU)
//   NZ  : Immigration New Zealand (CC BY 3.0 NZ) : tableau des frais (PDF) et liste des pays dispensés de visa.
//         Le site bloque les robots (Incapsula) : on tente l'accès direct, puis la dernière capture Wayback de la
//         même page officielle ; la source réellement lue est écrite dans le JSON.
//   FX  : taux de référence quotidiens de la BCE (réutilisation libre avec mention de la source)
//
// Règle : si une valeur attendue n'est pas retrouvée, le script S'ARRÊTE (code 1) sans écrire : on ne publie pas un
// chiffre deviné. Les listes de pays sont converties en codes ISO 3166-1 alpha-2 par la table NOMS ci-dessous ; un nom
// inconnu arrête aussi le script (à ajouter à la main après lecture).

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const today = new Date().toISOString().slice(0, 10);
const problems = [];

async function get(url, { binary = false, tries = 3 } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en', 'Accept-Encoding': 'gzip, deflate, br' }, signal: AbortSignal.timeout(60000) });
      if (r.status === 429) { await new Promise((ok) => setTimeout(ok, 20000)); throw new Error('HTTP 429'); }
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return binary ? Buffer.from(await r.arrayBuffer()) : await r.text();
    } catch (e) { last = e; }
  }
  throw new Error(`${url} : ${last?.message}`);
}

const decodeEsc = (t) => t.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\[nt]/g, ' ').replace(/\\"/g, '"');
const ent = (t) => t.replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const strip = (t) => ent(t.replace(/<[^<>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
function need(v, what) { if (v === undefined || v === null || (Array.isArray(v) && !v.length) || Number.isNaN(v)) { problems.push(what); } return v; }

// ---------- Noms officiels → ISO 3166-1 alpha-2 ----------
const NOMS = {
  'Afghanistan':'AF','Albania':'AL','Algeria':'DZ','Andorra':'AD','Angola':'AO','Antigua and Barbuda':'AG','Argentina':'AR','Armenia':'AM','Australia':'AU','Austria':'AT','Azerbaijan':'AZ','Bahamas':'BS','The Bahamas':'BS','Bahrain':'BH','Bangladesh':'BD','Barbados':'BB','Belarus':'BY','Belgium':'BE','Belize':'BZ','Benin':'BJ','Bhutan':'BT','Bolivia':'BO','Bosnia Herzegovina':'BA','Botswana':'BW','Brazil':'BR','Brunei':'BN','Brunei Darussalam':'BN','Bulgaria':'BG','Burkina Faso':'BF','Burundi':'BI','Cambodia':'KH','Cameroon':'CM','Canada':'CA','Cape Verde':'CV','Central African Republic':'CF','Chad':'TD','Chile':'CL',"People’s Republic of China":'CN','China':'CN','Colombia':'CO','Comoros':'KM','Congo':'CG','Costa Rica':'CR',"Côte d’Ivoire":'CI','Croatia':'HR','Cuba':'CU','Cyprus':'CY','Czechia':'CZ','Czech Republic':'CZ','Democratic Republic of the Congo':'CD','Denmark':'DK','Djibouti':'DJ','Dominica':'DM','Dominican Republic':'DO','Ecuador':'EC','Egypt':'EG','El Salvador':'SV','Equatorial Guinea':'GQ','Eritrea':'ER','Estonia':'EE','Eswatini':'SZ','Ethiopia':'ET','Fiji':'FJ','Finland':'FI','France':'FR','Gabon':'GA','Gambia':'GM','Georgia':'GE','Germany':'DE','Federal Republic of Germany':'DE','Ghana':'GH','Greece':'GR','Grenada':'GD','Guatemala':'GT','Guinea':'GN','Guinea Bissau':'GW','Guyana':'GY','Haiti':'HT','Honduras':'HN','Hong Kong Special Administrative Region':'HK','Hong Kong (SAR of China)':'HK','Hungary':'HU','Iceland':'IS','India':'IN','Indonesia':'ID','Iran':'IR','Iraq':'IQ','Ireland':'IE','Israel':'IL','Italy':'IT','Jamaica':'JM','Japan':'JP','Jordan':'JO','Kazakhstan':'KZ','Kenya':'KE','Kiribati':'KI','Korea (North)':'KP','South Korea':'KR','Republic of Korea':'KR','Korea, Republic of':'KR','Korea, South':'KR','Kosovo':'XK','Kuwait':'KW','Kyrgyzstan':'KG','Laos':'LA','Latvia':'LV','Lebanon':'LB','Lesotho':'LS','Liberia':'LR','Libya':'LY','Liechtenstein':'LI','Lithuania':'LT','Luxembourg':'LU','Macao Special Administrative Region':'MO','Madagascar':'MG','Malawi':'MW','Malaysia':'MY','Maldives':'MV','Mali':'ML','Malta':'MT','Marshall Islands':'MH','Mauritania':'MR','Mauritius':'MU','Mexico':'MX','Federated States of Micronesia':'FM','Moldova':'MD','Monaco':'MC','Mongolia':'MN','Montenegro':'ME','Morocco':'MA','Mozambique':'MZ','Myanmar':'MM','Namibia':'NA','Nauru':'NR','Nepal':'NP','Netherlands':'NL','The Netherlands':'NL','New Zealand':'NZ','Nicaragua':'NI','Niger':'NE','Nigeria':'NG','North Macedonia':'MK','Norway':'NO','Oman':'OM','Pakistan':'PK','Palau':'PW','Palestine':'PS','Panama':'PA','Papua New Guinea':'PG','Paraguay':'PY','Peru':'PE','Philippines':'PH','Poland':'PL','Portugal':'PT','Qatar':'QA','Romania':'RO','Russia':'RU','Rwanda':'RW','Samoa':'WS','San Marino':'SM','Republic of San Marino':'SM','São Tomé and Principe':'ST','Saudi Arabia':'SA','Senegal':'SN','Serbia':'RS','Seychelles':'SC','Sierra Leone':'SL','Singapore':'SG','Slovakia':'SK','Slovak Republic':'SK','Slovenia':'SI','Solomon Islands':'SB','Somalia':'SO','South Africa':'ZA','South Sudan':'SS','Spain':'ES','Sri Lanka':'LK','St Kitts and Nevis':'KN','St. Kitts and Nevis':'KN','St Lucia':'LC','St. Lucia':'LC','St Vincent and the Grenadines':'VC','St. Vincent and the Grenadines':'VC','Sudan':'SD','Suriname':'SR','Sweden':'SE','Switzerland':'CH','Syria':'SY','Taiwan':'TW','Tajikistan':'TJ','Tanzania':'TZ','Thailand':'TH','Timor-Leste':'TL','Togo':'TG','Tonga':'TO','Trinidad and Tobago':'TT','Tunisia':'TN','Turkey':'TR','Turkmenistan':'TM','Tuvalu':'TV','Uganda':'UG','Ukraine':'UA','United Arab Emirates':'AE','United Kingdom':'GB','United States':'US','United States of America':'US','Uruguay':'UY','Uzbekistan':'UZ','Vanuatu':'VU','Vatican City':'VA','Venezuela':'VE','Vietnam':'VN','Yemen':'YE','Zambia':'ZM','Zimbabwe':'ZW',
};
function iso(raw, where) {
  if (/^Korea \(North\)/.test(raw)) return 'KP';
  let n = raw.replace(/\(.*?\)/g, '').replace(/[*†‡§]/g, '').replace(/\s*[—–-]\s*(British.*|passport.*)$/i, '').replace(/\s+/g, ' ').trim();
  if (/^United Kingdom/i.test(n)) n = 'United Kingdom';
  if (/^Vatican City/i.test(n)) n = 'Vatican City';
  if (/^Taiwan/i.test(n)) n = 'Taiwan';
  if (/^Hong Kong/i.test(n)) n = 'Hong Kong Special Administrative Region';
  if (/^Macau|^Macao/i.test(n)) n = 'Macao Special Administrative Region';
  const c = NOMS[n];
  if (!c) problems.push(`${where} : nom de pays inconnu « ${raw} » (ajouter à NOMS après lecture)`);
  return c;
}
const isoList = (names, where) => [...new Set(names.map((n) => iso(n, where)).filter(Boolean))].sort();

// ---------- Lecteur .ods minimal (zip + content.xml) ----------
function unzipEntry(buf, name) {
  let eocd = buf.length - 22; while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  const n = buf.readUInt16LE(eocd + 10); let p = buf.readUInt32LE(eocd + 16);
  for (let i = 0; i < n; i++) {
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), fl = buf.readUInt16LE(p + 28), xl = buf.readUInt16LE(p + 30), cl = buf.readUInt16LE(p + 32), off = buf.readUInt32LE(p + 42);
    const fname = buf.toString('utf8', p + 46, p + 46 + fl);
    if (fname === name) {
      const lfl = buf.readUInt16LE(off + 26), lxl = buf.readUInt16LE(off + 28); const data = buf.subarray(off + 30 + lfl + lxl, off + 30 + lfl + lxl + csize);
      return (method === 8 ? zlib.inflateRawSync(data) : data).toString('utf8');
    }
    p += 46 + fl + xl + cl;
  }
  throw new Error(`${name} absent du fichier`);
}
function odsRows(buf) {
  const xml = unzipEntry(buf, 'content.xml');
  return [...xml.matchAll(/<table:table-row[^>]*>([\s\S]*?)<\/table:table-row>/g)].map((m) =>
    [...m[1].matchAll(/<table:table-cell([^>]*?)(?:\/>|>([\s\S]*?)<\/table:table-cell>)/g)].map((c) => strip((c[2] || '').replace(/<\/text:p>/g, ' '))).filter(Boolean));
}

// ---------- Royaume-Uni ----------
async function uk() {
  const api = (s) => get(`https://www.gov.uk/api/content/${s}`).then(JSON.parse);
  const eta = await api('eta');
  const parts = Object.fromEntries(eta.details.parts.map((p) => [p.slug, strip(p.body)]));
  const fee = +need(parts.overview.match(/An ETA costs £(\d+(?:\.\d+)?)/)?.[1], 'UK : montant de l’ETA sur gov.uk/eta');
  const lasts = need(parts.apply.match(/An ETA lasts for ([^.]+)\./)?.[1], 'UK : durée de validité');
  const decision = need(parts.apply.match(/(You’ll usually get a decision[^.]+\.)/)?.[1], 'UK : délai de décision');

  const nl = await api('guidance/immigration-rules/immigration-rules-appendix-eta-national-list');
  // Chaque <li> ou <br> sépare un nom ; « (x) for travel to the UK on or after <date>: » ouvre une vague.
  const items = nl.details.body.replace(/<\/?(li|br)[^>]*>/g, '|').split('|').map(strip).filter(Boolean);
  const waves = []; let cur = null;
  for (const it of items) {
    const w = it.match(/\(([a-z])\) (?:for travel|travelling) to the UK on or after (\d{1,2} \w+ \d{4}):?\s*(.*)$/);
    if (w) { cur = { from: new Date(`${w[2]} UTC`).toISOString().slice(0, 10), names: [] }; waves.push(cur); if (w[3]) cur.names.push(w[3]); continue; }
    if (/^ETANL|^\*Those who hold|Appendix|^Nationalities/.test(it)) continue;
    if (cur && it.length < 60) cur.names.push(it);
  }
  for (const w of waves) w.countries = isoList(w.names, 'UK ETA list'), delete w.names;
  need(waves.length >= 4 ? waves : undefined, 'UK : vagues de l’Appendix ETA National List');

  const vn = await api('guidance/immigration-rules/immigration-rules-appendix-visitor-visa-national-list');
  const vb = vn.details.body; const a = vb.indexOf('(a) Nationals or citizens of the following countries'); const b = vb.indexOf('stateless', a);
  const vnames = need(a > 0 && b > a ? vb.slice(a, b) : undefined, 'UK : liste des visa nationals')
    .replace(/<\/?(li|br)[^>]*>/g, '|').split('|').map(strip).filter((x) => x && x.length < 60 && !/^\(b\)/.test(x)).map((x) => x.replace(/\(formerly [^)]*\)/g, '').trim());
  const visaNationals = isoList(vnames, 'UK visa national list');

  const pub = await api('government/publications/visa-regulations-revised-table');
  const odsAtts = pub.details.attachments.filter((a) => /\.ods$/i.test(a.url)); // du plus récent au plus ancien
  const money = (s) => +String(s).replace(/[£,]/g, '');
  const readTable = async (a) => { const rows = odsRows(await get(a.url, { binary: true })); return { a, eta: rows.find((r) => /^electronic travel authorisation/i.test(r[0])), visit: rows.find((r) => /^Visit visa – short up to 6 months/i.test(r[0])) }; };
  const latest = await readTable(need(odsAtts[0], 'UK : tableau des frais .ods'));
  const tableFee = money(need(latest.eta?.[2], 'UK : ligne ETA du tableau des frais')); // colonnes : frais actuel, nouveau frais, écart, %
  if (tableFee !== fee) problems.push(`UK : gov.uk/eta dit £${fee}, le tableau des frais dit £${tableFee}`);
  // Date et montant de la dernière hausse : premier tableau (en remontant) où « actuel » ≠ « nouveau » sur la ligne ETA
  let change = null;
  for (const a of odsAtts.slice(0, 6)) { const t = a === odsAtts[0] ? latest : await readTable(a); if (t.eta && money(t.eta[1]) !== money(t.eta[2])) { change = { since: new Date(`${a.title.match(/(\d{1,2} \w+ \d{4})/)[1]} UTC`).toISOString().slice(0, 10), previous: money(t.eta[1]), table: a.url }; break; } }
  need(change, 'UK : date de la dernière hausse de l’ETA');
  return {
    fee: { amount: fee, currency: 'GBP', since: change.since }, previousFee: { amount: change.previous, currency: 'GBP', changeTable: change.table }, feeTable: { title: latest.a.title, url: latest.a.url },
    visitVisa6m: { amount: money(need(latest.visit?.[2], 'UK : visa visiteur 6 mois')), currency: 'GBP' },
    validity: lasts, decision, etaNationals: waves, visaNationals,
    pageUpdated: eta.updated_at?.slice(0, 10), listUpdated: nl.public_updated_at?.slice(0, 10),
  };
}
// ---------- Canada (DORS/2002-227) ----------
async function ca() {
  const html = await get('https://laws-lois.justice.gc.ca/eng/regulations/SOR-2002-227/FullText.html');
  const t = strip(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ''));
  const currentTo = need(html.match(/current to (\d{4}-\d{2}-\d{2})/i)?.[1], 'CA : date de consolidation');
  const fee = +need(t.match(/294\.1 \(1\) A fee of \$(\d+) is payable for processing an application for an electronic travel authorization/)?.[1], 'CA : art. 294.1');
  const visa = +need(t.match(/296 \(1\) A fee of \$(\d+) is payable for processing an application for a temporary resident visa/)?.[1], 'CA : art. 296');
  const years = need(t.match(/12\.05 \(1\) An electronic travel authorization is valid for a period of (\w+) years/)?.[1], 'CA : art. 12.05');
  const si = html.lastIndexOf('(Subsection 12.05(1.1) and paragraph 190(1)(a))');
  const sched = need(si > 0 ? [...html.slice(si, html.indexOf('</ul>', si)).matchAll(/listItemText0">([^<]+)</g)].map((m) => ent(m[1]).trim()) : undefined, 'CA : annexe 1.1');
  const schedule = isoList(sched, 'CA annexe 1.1');
  const ci = html.indexOf('Despite subsection 7(1), a foreign national who is a citizen of a country listed in the table');
  const cond = need(ci > 0 ? [...html.slice(ci, html.indexOf('</table>', ci)).matchAll(/<td[^>]*>([^<]+)<\/td>/g)].map((m) => ent(m[1]).trim()) : undefined, 'CA : art. 7.01');
  const conditional = isoList(cond, 'CA art. 7.01');
  const condRule = need(t.match(/\(a\) (have held a temporary resident visa at any time during the 10-year period[^;]+); or \(b\) (hold a valid United States nonimmigrant visa[^.]+)\./), 'CA : conditions 7.01(2)');
  // Art. 190(1)(b) et (2) : citoyens britanniques, passeports israéliens nationaux, RAS de Hong Kong, BN(O), Taïwan (n° d'identité), Saint-Siège, Roumanie (passeport à puce, 190(2.1))
  const byDocument = ['GB', 'IL', 'HK', 'TW', 'VA', 'RO'];
  return { fee: { amount: fee, currency: 'CAD' }, visitorVisa: { amount: visa, currency: 'CAD' }, validityYears: { five: 5 }[years] ?? need(undefined, 'CA : durée'), exempt: ['US'], usLawfulPermanentResidentsExempt: true, etaNationals: [...new Set([...schedule, ...byDocument])].sort(), conditional, conditionalRule: [condRule[1], condRule[2]], currentTo };
}

// ---------- États-Unis ----------
async function us() {
  const html = await get('https://www.dhs.gov/visa-waiver-program');
  const table = html.split(/Former Program Countries/i)[0];
  const names = [...table.matchAll(/<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => strip(m[1])).filter((n) => n && n !== 'Country');
  const vwp = isoList(names, 'US VWP');
  need(vwp.length >= 40 ? vwp : undefined, 'US : liste VWP (au moins 40 pays attendus)');
  const q = 'https://www.federalregister.gov/api/v1/documents.json?per_page=5&order=newest&conditions%5Bterm%5D=%22Electronic+System+for+Travel+Authorization%22+fee+HR-1&fields%5B%5D=title&fields%5B%5D=publication_date&fields%5B%5D=html_url&fields%5B%5D=raw_text_url&fields%5B%5D=document_number';
  const docs = JSON.parse(await get(q)).results.filter((d) => /Immigration-Related Fees Required by HR-1/i.test(d.title));
  const doc = need(docs[0], 'US : avis Federal Register des frais HR-1');
  const raw = (await get(doc.raw_text_url)).replace(/\s+/g, ' ');
  const m = raw.match(/ESTA fee will be \$(\d+\.\d\d) \(\$17 \+ \$(\d+\.\d\d) \+ \$13\) per travel authorization/);
  const denied = raw.match(/In the event the ESTA application is denied, the FY \d{4} fee is \$(\d+\.\d\d)/);
  const start = raw.match(/I-94, ESTA, and EVUS fees described in this notice on (\w+ \d{1,2}, \d{4})/);
  const prev = raw.match(/The FY \d{4} ESTA authorization fee of \$(\d+\.\d\d)/);
  return {
    fee: { amount: +need(m?.[1], 'US : montant ESTA'), currency: 'USD' }, feeIfDenied: { amount: +need(denied?.[1], 'US : ESTA refusée'), currency: 'USD' },
    feeSince: new Date(`${need(start?.[1], 'US : date d’effet')} UTC`).toISOString().slice(0, 10), previousFee: { amount: +need(prev?.[1], 'US : montant précédent'), currency: 'USD' },
    notice: { title: doc.title, date: doc.publication_date, url: doc.html_url, number: doc.document_number },
    validity: '2 years from issuance, or until the passport expires if sooner (8 CFR 217.5(d))', vwp,
  };
}

// ---------- Australie ----------
async function au() {
  const page = async (slug) => decodeEsc(ent(await get(`https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/${slug}`)));
  const listAfter = (h, re, where) => { const i = h.search(re); if (i < 0) return need(undefined, where); const ul = h.slice(i).match(/<ul[^>]*>([\s\S]*?)<\/ul>/)[1]; return [...ul.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => strip(x[1])).filter(Boolean); };
  const eta = await page('electronic-travel-authority-601');
  const fee = +need(eta.match(/service charge of AUD ?(\d+) to use the Australian ETA app/)?.[1], 'AU : frais de l’app ETA');
  const etaList = isoList(listAfter(eta, /You must hold a valid passport from one of these countries or jurisdictions to be eligible for an ETA/, 'AU : liste ETA'), 'AU ETA');
  const ev = await page('evisitor-651');
  need(/There is no charge to make an eVisitor visa application|no charge/i.test(eta + ev) ? true : undefined, 'AU : gratuité eVisitor');
  const evList = isoList(listAfter(ev, /You must be a citizen of and hold a valid passport from one of these countries to be eligible for the eVisitor/, 'AU : liste eVisitor'), 'AU eVisitor');
  const upd = (h) => strip(h.slice(h.indexOf('Last updated'), h.indexOf('Last updated') + 400)).match(/Last updated: (\d{1,2})\/(\d{1,2})\/(\d{4})/)?.slice(1).reverse().map((x) => x.padStart(2, '0')).join('-');
  return { eta: { fee: { amount: fee, currency: 'AUD' }, nationals: etaList, pageUpdated: upd(eta) }, evisitor: { fee: { amount: 0, currency: 'AUD' }, nationals: evList, pageUpdated: upd(ev) }, validity: '12 months or until the passport expires; stays of up to 3 months per entry' };
}

// ---------- Nouvelle-Zélande ----------
async function nz() {
  const pdfUrl = 'https://www.immigration.govt.nz/assets/inz/documents/media/immigration-fee-and-levy-table-rates-from-1-october-2024.pdf';
  const official = 'https://www.immigration.govt.nz/visit/what-you-need-to-visit-new-zealand/visa-waiver-countries-and-territories/';
  let html, readFrom = official;
  try { html = await get(official); if (!/List of visa waiver countries/.test(html)) throw new Error('page de contrôle anti-robot'); }
  catch {
    const r = await fetch(`https://web.archive.org/web/2id_/${official}`, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(90000) });
    if (!r.ok) {
      // Liste reprise du dernier passage réussi, avec sa date de lecture d'origine : jamais une liste devinée.
      const old = fs.existsSync(path.join(ROOT, 'data/authorisations.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'data/authorisations.json'), 'utf8')).nz : null;
      if (old?.waiver?.length) { old.readOn ??= old.readFrom?.match(/web\/(\d{4})(\d{2})(\d{2})/)?.slice(1).join('-'); console.warn(`NZ : page et capture inaccessibles (HTTP ${r.status}) : liste du ${old.readOn} conservée`); return { waiver: old.waiver, readFrom: old.readFrom, readOn: old.readOn, ukStayMonths: 6, stayMonths: 3, australiansExempt: true }; }
      return need(undefined, `NZ : page officielle inaccessible et capture Wayback en erreur (HTTP ${r.status})`);
    }
    const w = { url: r.url }; html = await r.text();
    readFrom = w.url;
  }
  const ul = need(html.split(/List of visa waiver countries and territories/)[1]?.match(/<ul[^>]*>([\s\S]*?)<\/ul>/)?.[1], 'NZ : liste des pays dispensés');
  const waiver = isoList([...ul.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => strip(x[1])), 'NZ visa waiver');
  // Le PDF n'est pas décompressé ici (pas de dépendance) : les montants restent ceux lus le 2026-10-24 dans
  // « INZ 11277 10/24 » (17 NZD par l'app, 23 NZD par le site, IVL 100 NZD). Le script vérifie seulement que le PDF
  // est toujours publié à la même adresse ; s'il disparaît, on le signale.
  try { await get(pdfUrl, { binary: true }); } catch { problems.push('NZ : tableau des frais introuvable, revérifier les montants à la main'); }
  const readOn = readFrom.match(/web\/(\d{4})(\d{2})(\d{2})/)?.slice(1).join('-') ?? today;
  return { waiver, readFrom, readOn, ukStayMonths: 6, stayMonths: 3, australiansExempt: true };
}

// ---------- Taux BCE ----------
async function fx() {
  const x = await get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
  const date = need(x.match(/time=['"](\d{4}-\d{2}-\d{2})/)?.[1], 'BCE : date');
  const rates = Object.fromEntries([...x.matchAll(/currency=['"](\w{3})['"] rate=['"]([\d.]+)/g)].filter((m) => ['USD', 'GBP', 'CAD', 'AUD', 'NZD'].includes(m[1])).map((m) => [m[1], +m[2]]));
  need(Object.keys(rates).length === 5 ? rates : undefined, 'BCE : 5 devises');
  return { base: 'EUR', date, rates, source: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' };
}

const LABELS = ['uk','ca','us','au','nz','fx'];
const [UK, CA, US, AU, NZ, FX] = await Promise.all([uk(), ca(), us(), au(), nz(), fx()].map((p, i) => p.catch((e) => { problems.push(`${LABELS[i]} : ${e.message}`); return null; })));
if (problems.length) { console.error('ARRÊT, rien n’est écrit :\n- ' + problems.join('\n- ')); process.exit(1); }

const prevFile = path.join(ROOT, 'data/authorisations.json');
const prev = fs.existsSync(prevFile) ? JSON.parse(fs.readFileSync(prevFile, 'utf8')) : null;
const out = { generated: today, uk: UK, ca: CA, us: US, au: AU, nz: { ...NZ, nzeta: { app: { amount: 17, currency: 'NZD' }, web: { amount: 23, currency: 'NZD' }, readOn: '2026-10-24', readHow: 'PDF officiel lu à la main le 2026-10-24 ; le script vérifie seulement qu’il est toujours publié', source: 'INZ 11277 10/24, Table of changes to fee and levy rates (from 1 October 2024)' }, ivl: { amount: 100, currency: 'NZD', since: '2024-10-01' }, validityYears: 2 } };
const changed = prev && JSON.stringify({ ...prev, generated: 0 }) !== JSON.stringify({ ...out, generated: 0 });
if (DRY) { console.log(JSON.stringify(out, null, 2)); console.log(JSON.stringify(FX)); process.exit(0); }
fs.writeFileSync(prevFile, JSON.stringify(out, null, 2) + '\n');
fs.writeFileSync(path.join(ROOT, 'data/fx.json'), JSON.stringify(FX, null, 2) + '\n');
console.log(`OK ${today} — UK £${UK.fee.amount}, CA $${CA.fee.amount} CAD, US $${US.fee.amount}, AU $${AU.eta.fee.amount} AUD, NZ 17/23 NZD + IVL 100 ; BCE ${FX.date}${changed ? ' ; DONNÉES MODIFIÉES depuis le dernier passage' : ''}`);
