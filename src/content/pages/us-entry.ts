import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/guide-types';
import { F } from '../facts';

const EU = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];
const REGIONS: Record<string, string[]> = {
  eu: EU, europe: ['AD', 'CH', 'GB', 'IS', 'LI', 'MC', 'NO', 'SM'], asia: ['BN', 'IL', 'JP', 'KR', 'QA', 'SG', 'TW'], other: ['AU', 'NZ', 'CL'],
};
const outsideEu = (h: Helpers) => EU.filter((c) => !h.M.AUTH.us.vwp.includes(c)).map((c) => h.land(c)).join(', ');
const regionRows = (h: Helpers, labels: Record<string, string>) => Object.entries(REGIONS).map(([k, list]) => {
  const inn = list.filter((c) => h.M.AUTH.us.vwp.includes(c));
  return [labels[k], String(inn.length), inn.map((c) => h.land(c)).join(', ')];
});

export default definePage({
  id: 'us-entry',
  group: 'us',
  order: 6,
  tool: { kind: 'checker', dests: ['US'] },
  mini: { kind: 'applyby', dest: 'US' },
  related: ['esta', 'esta-validity', 'esta-apply', 'ca'],
  sources: ['dhsVwp', 'dhsVwpReq', 'ecfr2175', 'usc1187', 'cbpEsta'],
  en: {
    slug: 'us-visa-waiver-program',
    nav: 'Visa Waiver Program',
    card: 'The 42 countries, the 90-day limit, the e-passport rule and what happens at the US border.',
    title: 'Visa Waiver Program 2026: the 42 countries, the 90-day rule',
    description: 'The US Visa Waiver Program in 2026: the 42 member countries, the EU states left out, the 90-day limit, the e-passport rule and ESTA by air, sea or land.',
    h1: 'US Visa Waiver Program: who can visit without a visa, and on what terms',
    intro: 'Enter your passport: the checker tells you whether you can travel under the Visa Waiver Program with an ESTA or need a visa.',
    resume: (h) => {
      const f = F(h);
      return `The Visa Waiver Program lets citizens of ${f.vwpCount} countries visit the United States for tourism or business for up to ${f.usStay} days without a visa, on two conditions: an approved ESTA, obtained online before boarding a plane or ship or before reaching a land border, and an e-passport with an electronic chip, required for every traveller since ${h.date(h.P.usVwpFacts.ePassportSince)}. The list, kept by the Department of Homeland Security, covers most of Europe, plus Australia, New Zealand, Japan, South Korea, Singapore, Taiwan, Israel, Qatar, Brunei and Chile; within the European Union, ${outsideEu(h)} are not members. The ${f.us} ESTA fee is per person, children included. A stay under the program cannot be extended or changed into another status inside the country, and the ${f.usStay} days are not reset by a side trip to Canada, Mexico or the Caribbean. People who have been in Iraq, Syria or a designated country since ${f.usIneligible} are excluded by law and need a visa. The CBP officer at the border decides on admission.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Which EU countries are not in the Visa Waiver Program?', a: `${outsideEu(h)}. Their citizens apply for a B-1 or B-2 visa at a US embassy or consulate rather than an ESTA. Romania was briefly designated but DHS rescinded that designation on ${h.date(h.P.usVwpFacts.romaniaRemoved)}. The list can change: the checker reads the DHS list on the date shown on this page.` },
        { q: 'Can I study or work in the US under the Visa Waiver Program?', a: `No. The program covers tourism, visits to family and friends, business meetings, conferences and short recreational courses that do not lead to a degree. Paid work, study for credit and stays beyond ${f.usStay} days require a visa. Business visitors may negotiate contracts or attend meetings but not do productive work for a US employer.` },
        { q: 'Do I need a return ticket to enter under the Visa Waiver Program?', a: 'Yes. Travellers arriving by air or sea under the program are expected to hold a return or onward ticket to a destination outside the United States and its neighbouring countries, unless they live in Canada, Mexico or a nearby island. Airlines may refuse boarding without one, and the CBP officer can ask to see it.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = regionRows(h, { eu: 'European Union', europe: 'Rest of Europe', asia: 'Asia and Middle East', other: 'Oceania and Americas' });
      return `<h2>The member countries</h2>
<p>The ${h.src('dhsVwp', 'DHS list')} counts ${f.vwpCount} countries. The checker uses that list, read on ${f.dataDay}.</p>
${h.table(['Region', 'Members', 'Countries'], rows, 'Visa Waiver Program countries by region', ['l', 'r', 'l'])}
<h2>The e-passport rule</h2>
<p>Since ${h.date(h.P.usVwpFacts.ePassportSince)}, the ${h.src('dhsVwpReq', 'DHS passport requirements')} demand an e-passport, with the chip symbol on the cover, from every Visa Waiver traveller. A temporary or emergency passport without a chip does not qualify, even from a member country.</p>
<h2>ESTA by air, sea or land</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5')} requires an approved ESTA before boarding a carrier to the United States by air or sea, and before applying for admission at a land border. There is no airside transit in US airports: a connection means entering the country, so an ESTA is needed even for a stopover.</p>
<h2>When to apply</h2>
<p>CBP publishes no processing time and recommends applying as soon as you start preparing the trip. Enter your departure date below: for the United States the calculator shows that advice rather than a date.</p>
<!--mini-->
<h2>At the border</h2>
<p>The ESTA is a permission to travel, not a right of entry. The CBP officer checks the passport, takes fingerprints and a photo, asks about the purpose and length of the visit and records the admission electronically. Admission under the program is for up to ${f.usStay} days and cannot be extended. Overstaying ends your right to use the program again.</p>
<h2>Who is excluded</h2>
<p>Federal law at ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')} bars anyone who has been in Iraq, Syria or a state designated as a sponsor of terrorism since ${f.usIneligible}, with narrow exceptions, as well as people who previously broke the terms of a Visa Waiver admission. They apply for a visa. The ${h.a('esta', 'ESTA page')} gives the fee and the official address.</p>`;
    },
  },
  de: {
    slug: 'einreise-usa',
    nav: 'Einreise USA',
    card: 'Reisepass, ESTA, 90 Tage, Rückflug und Grenzkontrolle: was für die Einreise in die USA gilt.',
    title: 'Einreise USA 2026: ESTA, E-Pass, 90 Tage und Grenzkontrolle',
    description: 'Einreise in die USA 2026: wer mit ESTA ohne Visum reist, E-Pass mit Chip, 90 Tage pro Aufenthalt, Rückflugticket, Umstieg und die Grenzkontrolle der CBP.',
    h1: 'Einreise USA: was Deutsche, Österreicher und Schweizer brauchen',
    intro: 'Geben Sie Ihren Pass ein: der Check zeigt, ob Sie mit ESTA im Visa Waiver Program reisen können oder ein Visum brauchen.',
    resume: (h) => {
      const f = F(h);
      return `Für die Einreise in die USA als Tourist oder Geschäftsreisender brauchen Deutsche, Österreicher und Schweizer kein Visum, aber zwei Dinge: einen elektronischen Reisepass mit Chip, vorgeschrieben seit dem ${h.date(h.P.usVwpFacts.ePassportSince)}, und eine genehmigte ESTA für ${f.us} pro Person, beantragt auf esta.cbp.dhs.gov, bevor Sie in Flugzeug oder Schiff steigen oder an einer Landgrenze ankommen. Das gilt im Visa Waiver Program für Aufenthalte bis ${f.usStay} Tage, die sich weder verlängern noch in einen anderen Aufenthaltstitel umwandeln lassen. Ein Abstecher nach Kanada, Mexiko oder in die Karibik setzt die ${f.usStay} Tage nicht zurück. Erwartet wird außerdem ein Rück- oder Weiterflugticket. Der Personalausweis reicht nicht, und auch für einen Umstieg in den USA ist die ESTA nötig, weil es an US-Flughäfen keinen Transitbereich ohne Einreise gibt. Wer seit dem ${f.usIneligible} im Irak, in Syrien oder einem gelisteten Staat war, ist gesetzlich ausgeschlossen und braucht ein Visum. Über die Einreise entscheidet am Ende der CBP-Beamte am Flughafen.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Welche EU-Staaten gehören nicht zum Visa Waiver Program?', a: `${outsideEu(h)}. Ihre Bürger beantragen statt einer ESTA ein B-1- oder B-2-Visum bei einer US-Vertretung. Rumänien war kurz aufgenommen, das Heimatschutzministerium hat die Aufnahme am ${h.date(h.P.usVwpFacts.romaniaRemoved)} aber zurückgenommen. Die Liste kann sich ändern; der Check liest die Liste des Ministeriums zum angegebenen Datum.` },
        { q: 'Darf ich mit ESTA in den USA arbeiten oder ein Praktikum machen?', a: `Nein. Das Programm gilt für Urlaub, Besuche bei Familie und Freunden, Geschäftstermine, Konferenzen und kurze Freizeitkurse ohne Abschluss. Bezahlte Arbeit, ein Praktikum, ein Studium mit Leistungspunkten und Aufenthalte über ${f.usStay} Tage verlangen ein Visum. Geschäftsreisende dürfen verhandeln und Termine wahrnehmen, aber nicht für einen US-Arbeitgeber arbeiten.` },
        { q: 'Brauche ich für die Einreise mit ESTA ein Rückflugticket?', a: 'Ja. Wer im Visa Waiver Program per Flugzeug oder Schiff einreist, soll ein Rück- oder Weiterreiseticket zu einem Ziel außerhalb der USA und ihrer Nachbarländer haben, außer er wohnt in Kanada, Mexiko oder auf einer nahen Insel. Fluggesellschaften können ohne Ticket die Beförderung verweigern, und der CBP-Beamte kann es sehen wollen.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = regionRows(h, { eu: 'Europäische Union', europe: 'Übriges Europa', asia: 'Asien und Naher Osten', other: 'Ozeanien und Amerika' });
      return `<h2>Die Teilnehmerstaaten</h2>
<p>Die ${h.src('dhsVwp', 'Liste des US-Heimatschutzministeriums')} umfasst ${f.vwpCount} Staaten. Der Check verwendet diese Liste, gelesen am ${f.dataDay}.</p>
${h.table(['Region', 'Staaten', 'Länder'], rows, 'Staaten des Visa Waiver Program nach Region', ['l', 'r', 'l'])}
<h2>Der elektronische Reisepass</h2>
<p>Seit dem ${h.date(h.P.usVwpFacts.ePassportSince)} verlangen die ${h.src('dhsVwpReq', 'Passanforderungen des DHS')} von jedem Reisenden im Visa Waiver Program einen E-Pass mit dem Chip-Symbol auf dem Umschlag. Der vorläufige Reisepass ohne Chip genügt nicht, auch nicht aus einem Teilnehmerstaat. Für Kinder gilt dasselbe: jedes Kind braucht einen eigenen Reisepass mit Chip und eine eigene ESTA.</p>
<h2>ESTA für Flugzeug, Schiff und Landgrenze</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5')} verlangt eine genehmigte ESTA vor dem Einsteigen in Flugzeug oder Schiff in die USA und vor der Einreise an einer Landgrenze, etwa mit dem Mietwagen aus Kanada. Einen Transit ohne Einreise gibt es an US-Flughäfen nicht: wer nach Mexiko oder in die Karibik umsteigt, braucht die ESTA trotzdem.</p>
<h2>Wann beantragen</h2>
<p>Die CBP nennt keine Bearbeitungszeit und empfiehlt, den Antrag zu stellen, sobald Sie die Reise vorbereiten. Geben Sie unten Ihr Abreisedatum ein: für die USA zeigt der Rechner diesen Hinweis statt eines Datums.</p>
<!--mini-->
<h2>An der Grenzkontrolle</h2>
<p>Die ESTA erlaubt die Reise, sie ist kein Einreiserecht. Der CBP-Beamte prüft den Pass, nimmt Fingerabdrücke und ein Foto, fragt nach Zweck und Dauer des Besuchs und erfasst die Einreise elektronisch. Die Zulassung gilt höchstens ${f.usStay} Tage und lässt sich nicht verlängern. Wer überzieht, verliert das Recht, das Programm erneut zu nutzen.</p>
<h2>Wer ausgeschlossen ist</h2>
<p>Das Bundesgesetz ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')} schließt aus, wer seit dem ${f.usIneligible} im Irak, in Syrien oder in einem als Terrorunterstützer eingestuften Staat war, mit engen Ausnahmen, ebenso wer früher gegen die Bedingungen einer Einreise im Programm verstoßen hat. Diese Reisenden beantragen ein Visum. Die Seite ${h.a('esta', 'ESTA USA')} nennt die Gebühr und die amtliche Adresse.</p>`;
    },
  },
});
