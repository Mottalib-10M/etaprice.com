import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'etias',
  group: 'eu',
  order: 1,
  tool: { kind: 'etias' },
  mini: { kind: 'cost', dest: 'GB' },
  related: ['uk-cost', 'esta', 'ca', 'uk-who'],
  sources: ['etiasFee', 'etiasReg', 'etiasSite', 'govukEta'],
  en: {
    slug: 'etias',
    nav: 'ETIAS',
    card: 'The European travel authorisation: €20, free under 18 and over 70, and not yet in operation.',
    title: 'ETIAS 2026: the €20 EU travel authorisation, not yet live',
    description: 'ETIAS, the EU travel authorisation for visa-free visitors: €20, free under 18 and over 70, valid three years. Not live yet: no start date published so far.',
    h1: 'ETIAS: the European travel authorisation, and why you cannot buy it yet',
    intro: 'Enter your group: the calculator gives the ETIAS fee once it opens. Until a start date is published, no one can sell you an ETIAS.',
    resume: (h) => {
      const f = F(h);
      return `ETIAS, the European Travel Information and Authorisation System, is the European Union’s version of the ESTA and the UK ETA: an online authorisation that visa-exempt visitors, such as Americans, Britons, Canadians and Australians, will need before travelling to the countries of the Schengen area and Cyprus. It was created by Regulation (EU) 2018/1240. The European Commission announced on 17 July 2025 that the fee will be ${f.etias}, with no fee for applicants under ${f.etiasUnder} or over ${f.etiasOver}, and the regulation sets the validity at ${f.etiasYears} years or until the passport expires. ETIAS is not yet in operation: on ${f.etiasRead}, no start date had been published, so there is nothing to apply for today and any site that takes payment for an ETIAS is not selling a real authorisation. Citizens of the EU, the European Economic Area and Switzerland will never need one, nor will foreign residents holding a residence permit from a member state. The calculator above shows what a group will pay once it opens.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'When does ETIAS start?', a: `No start date had been published on ${f.etiasRead}. In its July 2025 announcement of the ${f.etias} fee, the Commission referred to the last quarter of 2026, but a date only becomes binding once the Commission formally fixes it. Until then you cannot apply. This page will show the date as soon as it is published in the Official Journal or on the official EU travel site.` },
        { q: 'Do British travellers need ETIAS for France or Spain?', a: `Not yet. When ETIAS opens, British citizens visiting the Schengen area or Cyprus without a visa will need it, at ${f.etias} each between ${f.etiasUnder} and ${f.etiasOver} and free otherwise. Until then a valid passport is enough for a short stay, within the limit of 90 days in any 180-day period that already applies to British visitors.` },
        { q: 'Someone offered me an ETIAS application today. Is it real?', a: 'No. Since the system is not in operation, no authority can issue an ETIAS, and a site that collects passport details and payment for one is at best taking a deposit for a future service. When ETIAS opens, the only places to apply will be the official EU website and its app, both run by the European Union.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>What ETIAS will be</h2>
<p>${h.src('etiasReg', 'Regulation (EU) 2018/1240')} creates a pre-travel check for nationals of countries whose citizens do not need a Schengen visa. The traveller fills in an online form with passport details and answers on security, health and previous refusals, pays the fee and receives an authorisation linked to the passport. It will be checked by airlines, ferry and coach operators before boarding, and at the border.</p>
<h2>What it will cost</h2>
<p>The ${h.src('etiasFee', 'Commission’s announcement of 17 July 2025')} sets the fee at ${f.etias}. Applicants under ${f.etiasUnder} and over ${f.etiasOver} pay nothing, but still need an authorisation. A couple of American retirees over ${f.etiasOver} will pay nothing; a family of four with two children under ${f.etiasUnder} will pay ${h.eur(h.P.etias.fee.amount * 2, 0)}.</p>
<h2>Validity</h2>
<p>An ETIAS will be valid for ${f.etiasYears} years or until the passport expires, whichever is sooner, for any number of short stays within the usual limit of 90 days in any 180-day period. As with the UK ETA and the ESTA, a new passport will mean a new application.</p>
<h2>Compared with the UK ETA</h2>
<p>Europeans meet the mirror image of ETIAS when they cross the Channel: the UK ETA, which costs ${f.uk} per person and is already compulsory. Enter your group below to compare.</p>
<!--mini-->
<h2>Who will not need it</h2>
<p>Citizens of the EU, Iceland, Liechtenstein, Norway and Switzerland, foreign nationals holding a residence permit or long-stay visa from a member state, and travellers who need a Schengen visa (they apply for the visa instead). The ${h.src('etiasSite', 'official EU travel site')} will be the only place to apply once the system opens.</p>`;
    },
  },
  de: {
    slug: 'etias',
    nav: 'ETIAS',
    card: 'Die europäische Reisegenehmigung: 20 €, frei unter 18 und über 70, noch nicht in Betrieb.',
    title: 'ETIAS 2026: EU-Reisegenehmigung für 20 €, noch nicht aktiv',
    description: 'ETIAS, die EU-Reisegenehmigung für visumfreie Besucher: 20 €, frei unter 18 und über 70, drei Jahre gültig. Noch nicht in Betrieb, kein Starttermin bekannt.',
    h1: 'ETIAS: die europäische Reisegenehmigung und warum es sie noch nicht gibt',
    intro: 'Geben Sie Ihre Gruppe ein: der Rechner zeigt die ETIAS-Gebühr ab dem Start. Solange kein Starttermin feststeht, kann Ihnen niemand ein ETIAS verkaufen.',
    resume: (h) => {
      const f = F(h);
      return `ETIAS, das Europäische Reiseinformations- und -genehmigungssystem, ist das europäische Gegenstück zur ESTA und zur britischen ETA: eine Online-Genehmigung, die visumfreie Besucher aus Staaten wie den USA, Großbritannien, Kanada oder Australien vor Reisen in den Schengen-Raum und nach Zypern brauchen werden. Grundlage ist die Verordnung (EU) 2018/1240. Deutsche, Österreicher und alle anderen EU-Bürger sowie Schweizer brauchen nie ein ETIAS, ebenso wenig Ausländer mit Aufenthaltstitel eines Mitgliedstaats. Die Europäische Kommission hat am 17. Juli 2025 eine Gebühr von ${f.etias} angekündigt, frei für Antragsteller unter ${f.etiasUnder} und über ${f.etiasOver} Jahren; die Verordnung legt die Gültigkeit auf ${f.etiasYears} Jahre oder bis zum Ablauf des Passes fest. ETIAS ist noch nicht in Betrieb: am ${f.etiasRead} war kein Starttermin veröffentlicht. Heute kann also niemand ein ETIAS beantragen, und eine Seite, die dafür Geld nimmt, verkauft keine echte Genehmigung. Wer amerikanische oder britische Gäste erwartet, kann mit dem Rechner oben ausrechnen, was diese ab dem Start zahlen.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Brauche ich als Deutscher ein ETIAS für den Urlaub in Italien?', a: 'Nein. ETIAS gilt nur für Staatsangehörige von Ländern außerhalb der EU, deren Bürger ohne Visum in den Schengen-Raum reisen dürfen. Deutsche reisen innerhalb der EU weiter mit Personalausweis oder Reisepass. Wer allerdings in die USA, nach Großbritannien oder nach Kanada fliegt, braucht dort die jeweilige Genehmigung: ESTA, ETA oder eTA.' },
        { q: 'Ab wann gilt ETIAS?', a: `Am ${f.etiasRead} war kein Starttermin veröffentlicht. Die Kommission sprach bei der Ankündigung der Gebühr von ${f.etias} im Juli 2025 vom letzten Quartal 2026, verbindlich wird ein Datum aber erst, wenn die Kommission es förmlich festlegt. Bis dahin kann niemand einen Antrag stellen. Diese Seite nennt das Datum, sobald es veröffentlicht ist.` },
        { q: 'Mein amerikanischer Besuch fragt, ob er ETIAS braucht. Was sage ich?', a: `Heute noch nicht. Ab dem Start braucht jeder US-Bürger, der ohne Visum nach Deutschland oder in ein anderes Schengen-Land reist, ein ETIAS, ${f.etias} für Antragsteller zwischen ${f.etiasUnder} und ${f.etiasOver} Jahren, sonst gebührenfrei. Beantragt wird dann nur auf der amtlichen EU-Seite oder in der App der EU, nicht über Vermittler.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Was ETIAS sein wird</h2>
<p>Die ${h.src('etiasReg', 'Verordnung (EU) 2018/1240')} schafft eine Vorabprüfung für Staatsangehörige von Ländern, deren Bürger kein Schengen-Visum brauchen. Der Reisende füllt online ein Formular mit Passdaten und Fragen zu Sicherheit, Gesundheit und früheren Ablehnungen aus, zahlt die Gebühr und erhält eine Genehmigung, die an den Pass gebunden ist. Fluggesellschaften, Fähr- und Busunternehmen prüfen sie vor dem Einsteigen, die Grenzpolizei bei der Einreise.</p>
<h2>Was es kosten wird</h2>
<p>Die ${h.src('etiasFee', 'Ankündigung der Kommission vom 17. Juli 2025')} nennt ${f.etias}. Wer jünger als ${f.etiasUnder} oder älter als ${f.etiasOver} ist, zahlt nichts, braucht aber trotzdem eine Genehmigung. Ein amerikanisches Rentnerpaar über ${f.etiasOver} zahlt also nichts, eine vierköpfige Familie mit zwei Kindern unter ${f.etiasUnder} zahlt ${h.eur(h.P.etias.fee.amount * 2, 0)}.</p>
<h2>Gültigkeit</h2>
<p>Ein ETIAS wird ${f.etiasYears} Jahre gelten oder bis zum Ablauf des Passes, je nachdem, was früher eintritt, für beliebig viele Kurzaufenthalte im Rahmen der üblichen 90 Tage innerhalb von 180 Tagen. Wie bei der britischen ETA und der ESTA bedeutet ein neuer Pass einen neuen Antrag.</p>
<h2>Das Gegenstück: die britische ETA</h2>
<p>Deutsche erleben ETIAS spiegelbildlich, wenn sie nach Großbritannien reisen: dort ist die ETA für ${f.uk} pro Person schon Pflicht. Geben Sie unten Ihre Gruppe ein, um zu vergleichen.</p>
<!--mini-->
<h2>Wer kein ETIAS brauchen wird</h2>
<p>Bürger der EU, Islands, Liechtensteins, Norwegens und der Schweiz, Ausländer mit Aufenthaltstitel oder Visum für einen längeren Aufenthalt in einem Mitgliedstaat und Reisende, die ein Schengen-Visum brauchen (sie beantragen stattdessen das Visum). Die ${h.src('etiasSite', 'amtliche EU-Reiseseite')} wird nach dem Start der einzige Ort für den Antrag sein.</p>`;
    },
  },
  nl: {
    slug: 'etias',
    nav: 'ETIAS',
    card: 'De Europese reisvergunning: 20 €, gratis onder 18 en boven 70, nog niet in werking.',
    title: 'ETIAS 2026: Europese reisvergunning, 20 €, nog niet actief',
    description: 'ETIAS, de Europese reisvergunning voor visumvrije bezoekers: 20 €, gratis onder 18 en boven 70, drie jaar geldig. Nog niet in werking, geen startdatum.',
    h1: 'ETIAS: de Europese reisvergunning, en waarom u hem nog niet kunt kopen',
    intro: 'Vul uw gezelschap in: de rekenhulp geeft het ETIAS-tarief na de start. Zolang er geen startdatum is, kan niemand u een ETIAS verkopen.',
    resume: (h) => {
      const f = F(h);
      return `ETIAS, het Europees reisinformatie- en -autorisatiesysteem, is de Europese tegenhanger van de ESTA en de Britse ETA: een online vergunning die visumvrije bezoekers uit landen als de Verenigde Staten, het Verenigd Koninkrijk, Canada of Australië nodig zullen hebben voor reizen naar het Schengengebied en Cyprus. De basis is Verordening (EU) 2018/1240. Nederlanders, Belgen en alle andere EU-burgers en Zwitsers hebben nooit een ETIAS nodig, net zo min als buitenlanders met een verblijfsvergunning van een lidstaat. De Europese Commissie kondigde op 17 juli 2025 een tarief van ${f.etias} aan, gratis voor aanvragers jonger dan ${f.etiasUnder} of ouder dan ${f.etiasOver}; de verordening legt de geldigheid vast op ${f.etiasYears} jaar of tot het paspoort verloopt. ETIAS is nog niet in werking: op ${f.etiasRead} was geen startdatum gepubliceerd. Vandaag kan dus niemand een ETIAS aanvragen, en een site die er geld voor vraagt, verkoopt geen echte vergunning. Wie Amerikaanse of Britse gasten verwacht, rekent met de rekenhulp hierboven uit wat zij na de start betalen.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Heb ik als Nederlander een ETIAS nodig voor Frankrijk of Spanje?', a: 'Nee. ETIAS geldt alleen voor onderdanen van landen buiten de EU waarvan de burgers zonder visum naar het Schengengebied mogen. Nederlanders reizen binnen de EU gewoon met identiteitskaart of paspoort. Wie naar de Verenigde Staten, het Verenigd Koninkrijk of Canada vliegt, heeft daar wel de eigen vergunning nodig: ESTA, ETA of eTA.' },
        { q: 'Vanaf wanneer geldt ETIAS?', a: `Op ${f.etiasRead} was geen startdatum gepubliceerd. De Commissie sprak bij de aankondiging van het tarief van ${f.etias} in juli 2025 over het laatste kwartaal van 2026, maar een datum is pas bindend als de Commissie hem formeel vastlegt. Tot dan kan niemand een aanvraag indienen. Deze pagina vermeldt de datum zodra hij gepubliceerd is.` },
        { q: 'Mijn Amerikaanse familie vraagt of ze een ETIAS nodig heeft. Wat zeg ik?', a: `Vandaag nog niet. Na de start heeft elke Amerikaan die zonder visum naar Nederland of een ander Schengenland reist een ETIAS nodig, ${f.etias} voor aanvragers tussen ${f.etiasUnder} en ${f.etiasOver} jaar, anders gratis. Aanvragen kan dan alleen op de officiële EU-site of in de app van de EU, niet via tussenpersonen.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Wat ETIAS wordt</h2>
<p>${h.src('etiasReg', 'Verordening (EU) 2018/1240')} voert een controle vooraf in voor onderdanen van landen waarvan de burgers geen Schengenvisum nodig hebben. De reiziger vult online een formulier in met paspoortgegevens en vragen over veiligheid, gezondheid en eerdere weigeringen, betaalt het tarief en krijgt een vergunning die aan het paspoort gekoppeld is. Luchtvaartmaatschappijen, rederijen en busmaatschappijen controleren hem vóór het instappen, de grenspolitie bij aankomst.</p>
<h2>Wat het gaat kosten</h2>
<p>De ${h.src('etiasFee', 'aankondiging van de Commissie van 17 juli 2025')} noemt ${f.etias}. Wie jonger is dan ${f.etiasUnder} of ouder dan ${f.etiasOver}, betaalt niets, maar heeft wel een vergunning nodig. Een Amerikaans gepensioneerd stel boven de ${f.etiasOver} betaalt dus niets, een gezin van vier met twee kinderen onder de ${f.etiasUnder} betaalt ${h.eur(h.P.etias.fee.amount * 2, 0)}.</p>
<h2>Geldigheid</h2>
<p>Een ETIAS zal ${f.etiasYears} jaar geldig zijn of tot het paspoort verloopt, wat het eerst komt, voor zoveel korte verblijven als u wilt binnen de gebruikelijke 90 dagen per 180 dagen. Net als bij de Britse ETA en de ESTA betekent een nieuw paspoort een nieuwe aanvraag.</p>
<h2>De tegenhanger: de Britse ETA</h2>
<p>Nederlanders kennen ETIAS in spiegelbeeld wanneer ze naar Engeland reizen: daar is de ETA van ${f.uk} per persoon al verplicht. Vul hieronder uw gezelschap in om te vergelijken.</p>
<!--mini-->
<h2>Wie geen ETIAS nodig heeft</h2>
<p>Burgers van de EU, IJsland, Liechtenstein, Noorwegen en Zwitserland, buitenlanders met een verblijfsvergunning of visum voor lang verblijf van een lidstaat, en reizigers die een Schengenvisum nodig hebben (zij vragen het visum aan). De ${h.src('etiasSite', 'officiële EU-reissite')} wordt na de start de enige plek om aan te vragen.</p>`;
    },
  },
});
