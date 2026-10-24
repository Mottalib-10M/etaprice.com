import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

const history = (h: Parameters<typeof F>[0]) => {
  const f = F(h);
  return [
    [h.T({ en: 'before', fr: 'avant le', de: 'vor dem', nl: 'vóór' }) + ' ' + f.usHr1Since, f.usBefore],
    [f.usFy26Since, f.usOld],
    [f.usSince, f.us],
  ];
};

export default definePage({
  id: 'esta-cost',
  group: 'us',
  order: 2,
  tool: { kind: 'cost', dest: 'US' },
  mini: { kind: 'denied' },
  related: ['esta', 'esta-apply', 'esta-status', 'uk-cost'],
  sources: ['frNotice', 'estaApply', 'ecfr2175', 'ecb'],
  en: {
    slug: 'esta-cost',
    nav: 'ESTA cost',
    card: 'The official ESTA fee since 16 October 2026, what it is made of, and the total for your family.',
    title: 'ESTA cost 2026: $40.62 per person, what the fee is made of',
    description: 'The ESTA costs $40.62 per traveller since 16 October 2026, babies included, and $10.62 if refused. Your family total in dollars and euros, with its history.',
    h1: 'ESTA cost: the official fee for every traveller in your group',
    intro: 'Choose your passport and the number of travellers: the calculator multiplies the official ESTA fee and converts it into euros at the ECB rate.',
    resume: (h) => {
      const f = F(h);
      return `An approved ESTA costs ${f.us} per person since ${f.usSince}, the amount set by the Department of Homeland Security in the Federal Register notice of ${f.usNoticeDate} for fiscal year 2027. It is the sum of three parts fixed by federal law: ${f.usPromo} for travel promotion, ${f.usDenied} to cover the cost of running the system, and ${f.usHr1} added by the 2025 budget act known as HR-1. If CBP refuses the application, only the ${f.usDenied} system fee is charged. There is no child rate, so a family of four pays ${f.times(f.A.us.fee, 4).m}, about ${f.times(f.A.us.fee, 4).e.replace('≈ ', '')} at the ECB rate of ${f.fxDate}. The previous fee was ${f.usOld}, and before the HR-1 fees started on ${f.usHr1Since} the ESTA cost ${f.usBefore}. An ESTA bought at an older price stays valid for its two years. The only official place to pay is esta.cbp.dhs.gov; any higher amount includes a third-party service charge.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: `Why does the ESTA now cost almost twice the old ${f.usBefore}?`, a: `The 2025 budget act, HR-1, added a fee of ${f.usHr1} per authorisation and raised the system cost fee, which is now adjusted for inflation every fiscal year. Together with the ${f.usPromo} travel promotion fee, that produced ${f.usOld} for fiscal year 2026 and ${f.us} from ${f.usSince}.` },
        { q: 'I paid my ESTA before 16 October 2026. Do I owe the difference?', a: 'No. The fee is charged once, when you apply, at the rate in force on that day. An approved ESTA keeps its full two years of validity whatever happens to the price afterwards. You only pay the new amount if you need a new ESTA, for example with a new passport or after a change of name.' },
        { q: 'Will the ESTA fee change again?', a: 'Very likely. HR-1 requires DHS to adjust the system cost part for inflation every fiscal year, and each adjustment is published in the Federal Register before it takes effect. We update this page and the calculator on the day a new notice appears, and show the date of the fee in force.' },
        { q: 'Is the ESTA fee charged in dollars to a European card?', a: `Yes. CBP charges ${f.us}, and your card converts it at the network rate on the day of payment. Some banks add a foreign currency fee of one to two percent. The euro figure on this page uses the ECB reference rate of ${f.fxDate} and is an indication, not the exact amount on your statement.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.us.fee, n).m, f.times(A.us.fee, n).e]);
      return `<h2>The ESTA fee by group size</h2>
<p>Each traveller pays the same fee, from newborns to grandparents. This table multiplies ${f.us} and converts it at the ECB reference rate of ${f.fxDate}.</p>
${h.table(['Travellers', 'Official fee', 'In euros'], rows, `ESTA fee from ${f.usSince}, read on ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>What the fee is made of</h2>
<p>The ${h.src('frNotice', 'Federal Register notice')} explains the arithmetic: ${f.usPromo} under 8 U.S.C. 1187(h)(3)(B)(i)(I), which funds the promotion of travel to the United States; ${f.usDenied} under (i)(II), which recovers the cost of the system and is charged on every application, approved or not; and ${f.usHr1} under (i)(III), added by HR-1. Only the middle part follows inflation.</p>
<h2>How the price has moved</h2>
${h.table(['From', 'Fee per approved ESTA'], history(h), 'Sources: 8 CFR 217.5(h) for the old fee, Federal Register notices for the HR-1 fees', ['l', 'r'])}
<p>The regulation at ${h.src('ecfr2175', '8 CFR 217.5')} still prints the old ${f.usBefore}, because the fees now come directly from the statute as amended by HR-1. The amount charged on the official site is the one in the latest notice.</p>
<h2>What a refusal costs</h2>
<p>A refused application is not free: ${f.usDenied} is kept to cover the system. If several members of a family applied and one was refused, enter the numbers below to see what was paid in all.</p>
<!--mini-->
<p>After a refusal, applying again through the ESTA usually leads to the same answer unless your circumstances have changed; the route is a visa application at a US embassy or consulate, with its own fee.</p>
<h2>When the price looks higher</h2>
<p>A price above ${f.us} per person on any website means a private intermediary is adding its own charge to the same CBP form. It does not speed up the decision. Apply on ${h.src('estaApply', 'esta.cbp.dhs.gov')} and keep the CBP receipt; the ${h.a('esta', 'ESTA page')} explains how to recognise the official site.</p>`;
    },
  },
  de: {
    slug: 'esta-kosten',
    nav: 'ESTA-Kosten',
    card: 'Die amtliche ESTA-Gebühr seit dem 16. Oktober 2026, woraus sie besteht und der Betrag für Ihre Familie.',
    title: 'ESTA Kosten 2026: 40,62 $ pro Person, auch für Kinder',
    description: 'Die ESTA kostet seit dem 16. Oktober 2026 40,62 $ pro Person, auch für Babys, bei Ablehnung 10,62 $. Ihre Familie in Dollar und Euro, mit Preisverlauf.',
    h1: 'ESTA Kosten: die amtliche Gebühr für jeden in Ihrer Reisegruppe',
    intro: 'Wählen Sie Ihren Pass und die Zahl der Reisenden: der Rechner multipliziert die amtliche ESTA-Gebühr und rechnet sie zum EZB-Kurs in Euro um.',
    resume: (h) => {
      const f = F(h);
      return `Eine genehmigte ESTA kostet seit dem ${f.usSince} ${f.us} pro Person, rund ${f.usEur.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}. So steht es in der Bekanntmachung des US-Heimatschutzministeriums im Federal Register vom ${f.usNoticeDate} für das Haushaltsjahr 2027. Der Betrag setzt sich aus drei gesetzlich festgelegten Teilen zusammen: ${f.usPromo} Tourismusabgabe, ${f.usDenied} für den Betrieb des Systems und ${f.usHr1}, die das Haushaltsgesetz HR-1 von 2025 hinzugefügt hat. Lehnt die CBP den Antrag ab, werden nur die ${f.usDenied} berechnet. Einen Kindertarif gibt es nicht: eine vierköpfige Familie zahlt ${f.times(f.A.us.fee, 4).m}, rund ${f.times(f.A.us.fee, 4).e.replace('≈ ', '')}. Vorher kostete die ESTA ${f.usOld}, und bevor die HR-1-Gebühren am ${f.usHr1Since} begannen, ${f.usBefore}. Eine zum alten Preis gekaufte ESTA bleibt ihre zwei Jahre gültig. Bezahlt wird nur auf esta.cbp.dhs.gov; jeder höhere Betrag enthält die Servicegebühr eines Vermittlers.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Warum ist die ESTA fast doppelt so teuer wie früher?', a: `Das Haushaltsgesetz HR-1 von 2025 hat eine Gebühr von ${f.usHr1} pro Genehmigung eingeführt und den Betriebsanteil erhöht, der seitdem jedes Haushaltsjahr an die Inflation angepasst wird. Zusammen mit der Tourismusabgabe von ${f.usPromo} ergab das ${f.usOld} für 2026 und ${f.us} ab dem ${f.usSince}.` },
        { q: 'Muss ich nachzahlen, wenn ich die ESTA vor dem 16. Oktober bezahlt habe?', a: 'Nein. Die Gebühr wird einmal beim Antrag fällig, zum Satz, der an diesem Tag gilt. Eine genehmigte ESTA behält ihre zwei Jahre Gültigkeit, egal wie sich der Preis danach entwickelt. Den neuen Betrag zahlen Sie erst, wenn Sie eine neue ESTA brauchen, etwa mit einem neuen Pass oder nach einer Namensänderung.' },
        { q: 'Wird die ESTA-Gebühr wieder steigen?', a: 'Sehr wahrscheinlich. HR-1 verpflichtet das Ministerium, den Betriebsanteil jedes Haushaltsjahr an die Inflation anzupassen, und jede Anpassung erscheint vorher im Federal Register. Wir aktualisieren diese Seite und den Rechner noch am Tag der neuen Bekanntmachung und nennen das Datum der geltenden Gebühr.' },
        { q: 'Wird die ESTA-Gebühr in Dollar von meiner Karte abgebucht?', a: `Ja. Die CBP verlangt ${f.us}, Ihre Karte rechnet am Zahltag zum Kurs des Kartennetzes um. Manche Banken berechnen ein Auslandseinsatzentgelt von ein bis zwei Prozent. Der Eurobetrag auf dieser Seite beruht auf dem EZB-Referenzkurs vom ${f.fxDate} und ist ein Richtwert, nicht der genaue Betrag auf Ihrer Abrechnung.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.us.fee, n).m, f.times(A.us.fee, n).e]);
      return `<h2>Die ESTA-Gebühr nach Gruppengröße</h2>
<p>Jeder Reisende zahlt dieselbe Gebühr, vom Neugeborenen bis zu den Großeltern. Die Tabelle multipliziert ${f.us} und rechnet zum EZB-Referenzkurs vom ${f.fxDate} um.</p>
${h.table(['Reisende', 'Amtliche Gebühr', 'In Euro'], rows, `ESTA-Gebühr seit ${f.usSince}, gelesen am ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Woraus die Gebühr besteht</h2>
<p>Die ${h.src('frNotice', 'Bekanntmachung im Federal Register')} rechnet vor: ${f.usPromo} nach 8 U.S.C. 1187(h)(3)(B)(i)(I) für die Tourismuswerbung der USA; ${f.usDenied} nach (i)(II) für die Kosten des Systems, fällig bei jedem Antrag, ob genehmigt oder nicht; und ${f.usHr1} nach (i)(III), eingeführt durch HR-1. Nur der mittlere Teil folgt der Inflation.</p>
<h2>Wie sich der Preis entwickelt hat</h2>
${h.table(['Ab', 'Gebühr pro genehmigter ESTA'], history(h), 'Quellen: 8 CFR 217.5(h) für die alte Gebühr, Federal Register für die HR-1-Gebühren', ['l', 'r'])}
<p>Die Verordnung ${h.src('ecfr2175', '8 CFR 217.5')} nennt noch die alten ${f.usBefore}, weil die Gebühren inzwischen direkt aus dem durch HR-1 geänderten Gesetz folgen. Auf der amtlichen Seite wird der Betrag der jüngsten Bekanntmachung berechnet.</p>
<h2>Was eine Ablehnung kostet</h2>
<p>Ein abgelehnter Antrag ist nicht kostenlos: ${f.usDenied} werden für den Systembetrieb einbehalten. Haben mehrere Familienmitglieder beantragt und wurde einer abgelehnt, geben Sie die Zahlen unten ein, um die Gesamtsumme zu sehen.</p>
<!--mini-->
<p>Nach einer Ablehnung führt ein neuer ESTA-Antrag meist zum selben Ergebnis, solange sich an Ihrer Lage nichts geändert hat; der Weg ist dann ein Visumantrag bei der US-Botschaft in Berlin oder einem Konsulat, mit eigener Gebühr.</p>
<h2>Wenn der Preis höher aussieht</h2>
<p>Ein Preis über ${f.us} pro Person auf irgendeiner Seite heißt: ein privater Vermittler schlägt seine eigene Gebühr auf dasselbe CBP-Formular. Schneller wird die Entscheidung dadurch nicht. Beantragen Sie auf ${h.src('estaApply', 'esta.cbp.dhs.gov')} und heben Sie die Quittung der CBP auf; die Seite ${h.a('esta', 'ESTA USA')} zeigt, woran Sie die amtliche Seite erkennen.</p>`;
    },
  },
  nl: {
    slug: 'esta-kosten',
    nav: 'ESTA-kosten',
    card: 'Het officiële ESTA-tarief sinds 16 oktober 2026, waaruit het bestaat en het totaal voor uw gezin.',
    title: 'ESTA kosten 2026: 40,62 $ per persoon, ook voor kinderen',
    description: 'De ESTA kost sinds 16 oktober 2026 40,62 $ per persoon, ook voor baby’s, en 10,62 $ bij weigering. Totaal voor uw gezin in dollar en euro, met verloop.',
    h1: 'ESTA kosten: het officiële tarief voor iedereen in uw reisgezelschap',
    intro: 'Kies uw paspoort en het aantal reizigers: de rekenhulp vermenigvuldigt het officiële ESTA-tarief en rekent het om in euro tegen de ECB-koers.',
    resume: (h) => {
      const f = F(h);
      return `Een goedgekeurde ESTA kost sinds ${f.usSince} ${f.us} per persoon, ongeveer ${f.usEur.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}. Dat staat in de bekendmaking van het Amerikaanse ministerie van Binnenlandse Veiligheid in het Federal Register van ${f.usNoticeDate} voor begrotingsjaar 2027. Het bedrag bestaat uit drie wettelijk vastgelegde delen: ${f.usPromo} toerismeheffing, ${f.usDenied} voor de kosten van het systeem en ${f.usHr1} die de begrotingswet HR-1 van 2025 toevoegde. Weigert CBP de aanvraag, dan wordt alleen de ${f.usDenied} gerekend. Een kindertarief bestaat niet: een gezin van vier betaalt ${f.times(f.A.us.fee, 4).m}, ongeveer ${f.times(f.A.us.fee, 4).e.replace('≈ ', '')}. Daarvoor kostte de ESTA ${f.usOld}, en vóór de HR-1-heffingen op ${f.usHr1Since} ingingen ${f.usBefore}. Een ESTA die tegen de oude prijs is gekocht, blijft zijn twee jaar geldig. Betalen doet u alleen op esta.cbp.dhs.gov; elk hoger bedrag bevat servicekosten van een tussenpersoon.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Waarom is de ESTA bijna twee keer zo duur als vroeger?', a: `De begrotingswet HR-1 van 2025 voerde een heffing van ${f.usHr1} per vergunning in en verhoogde het deel voor de systeemkosten, dat sindsdien elk begrotingsjaar aan de inflatie wordt aangepast. Samen met de toerismeheffing van ${f.usPromo} gaf dat ${f.usOld} voor 2026 en ${f.us} vanaf ${f.usSince}.` },
        { q: 'Moet ik bijbetalen als ik mijn ESTA vóór 16 oktober betaalde?', a: 'Nee. Het tarief wordt één keer betaald bij de aanvraag, tegen het bedrag dat die dag geldt. Een goedgekeurde ESTA houdt zijn volle twee jaar geldigheid, hoe de prijs zich daarna ook ontwikkelt. Het nieuwe bedrag betaalt u pas als u een nieuwe ESTA nodig hebt, bijvoorbeeld met een nieuw paspoort of na een naamswijziging.' },
        { q: 'Gaat het ESTA-tarief nog verder omhoog?', a: 'Waarschijnlijk wel. HR-1 verplicht het ministerie het deel voor de systeemkosten elk begrotingsjaar aan de inflatie aan te passen, en elke aanpassing verschijnt vooraf in het Federal Register. Wij werken deze pagina en de rekenhulp bij op de dag van de nieuwe bekendmaking en vermelden de datum van het geldende tarief.' },
        { q: 'Wordt het ESTA-tarief in dollar van mijn kaart afgeschreven?', a: `Ja. CBP rekent ${f.us}, uw kaart rekent op de betaaldag om tegen de koers van het kaartnetwerk. Sommige banken rekenen daarbovenop een toeslag van een tot twee procent voor betalingen in vreemde valuta. Het eurobedrag op deze pagina gebruikt de ECB-referentiekoers van ${f.fxDate} en is een indicatie, niet het exacte bedrag op uw afschrift.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.us.fee, n).m, f.times(A.us.fee, n).e]);
      return `<h2>Het ESTA-tarief per grootte van het gezelschap</h2>
<p>Elke reiziger betaalt hetzelfde, van pasgeborene tot grootouder. De tabel vermenigvuldigt ${f.us} en rekent om tegen de ECB-referentiekoers van ${f.fxDate}.</p>
${h.table(['Reizigers', 'Officieel tarief', 'In euro'], rows, `ESTA-tarief sinds ${f.usSince}, gelezen op ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Waaruit het tarief bestaat</h2>
<p>De ${h.src('frNotice', 'bekendmaking in het Federal Register')} rekent het voor: ${f.usPromo} volgens 8 U.S.C. 1187(h)(3)(B)(i)(I) voor de toerismepromotie van de Verenigde Staten; ${f.usDenied} volgens (i)(II) voor de kosten van het systeem, verschuldigd bij elke aanvraag, goedgekeurd of niet; en ${f.usHr1} volgens (i)(III), ingevoerd door HR-1. Alleen het middelste deel volgt de inflatie.</p>
<h2>Hoe de prijs veranderde</h2>
${h.table(['Vanaf', 'Tarief per goedgekeurde ESTA'], history(h), 'Bronnen: 8 CFR 217.5(h) voor het oude tarief, Federal Register voor de HR-1-heffingen', ['l', 'r'])}
<p>De verordening ${h.src('ecfr2175', '8 CFR 217.5')} vermeldt nog de oude ${f.usBefore}, omdat de tarieven nu rechtstreeks uit de door HR-1 gewijzigde wet volgen. Op de officiële site wordt het bedrag van de laatste bekendmaking gerekend.</p>
<h2>Wat een weigering kost</h2>
<p>Een geweigerde aanvraag is niet gratis: ${f.usDenied} wordt ingehouden voor het systeem. Hebben meerdere gezinsleden aangevraagd en is er één geweigerd, vul de aantallen hieronder in om het totaal te zien.</p>
<!--mini-->
<p>Na een weigering leidt een nieuwe ESTA-aanvraag meestal tot hetzelfde antwoord zolang uw situatie niet veranderd is; de weg is dan een visumaanvraag bij de Amerikaanse ambassade of een consulaat, met een eigen tarief.</p>
<h2>Als de prijs hoger lijkt</h2>
<p>Een prijs boven ${f.us} per persoon op welke site ook betekent dat een private tussenpersoon zijn eigen kosten optelt bij hetzelfde CBP-formulier. Sneller wordt de beslissing daar niet van. Vraag aan op ${h.src('estaApply', 'esta.cbp.dhs.gov')} en bewaar het CBP-betaalbewijs; de pagina ${h.a('esta', 'ESTA USA')} laat zien hoe u de officiële site herkent.</p>`;
    },
  },
});
