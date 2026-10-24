import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'nz',
  group: 'anz',
  order: 3,
  tool: { kind: 'checker', dests: ['NZ'] },
  mini: { kind: 'applyby', dest: 'NZ' },
  related: ['nz-cost', 'au', 'uk-time', 'ca'],
  sources: ['nzNzeta', 'nzFees', 'nzWaiver', 'ecb'],
  en: {
    slug: 'nzeta',
    nav: 'NZeTA',
    card: 'Who needs the NZeTA, the app and web prices, the visitor levy and the 72 hours to allow.',
    title: 'NZeTA 2026: who needs it, app or web price, and the IVL levy',
    description: 'The New Zealand NZeTA: which passports need it, NZD 17 in the app or 23 online, plus the NZD 100 visitor levy, valid two years. Allow 72 hours before you fly.',
    h1: 'NZeTA: who needs it, what it costs and when to apply',
    intro: 'Enter your passport and choose app or website: the checker reads the visa waiver list and adds the NZeTA and the visitor levy.',
    resume: (h) => {
      const f = F(h);
      return `The New Zealand Electronic Travel Authority (NZeTA) is required from citizens of the ${f.nzCount} visa waiver countries and territories, including the United States, Canada, the United Kingdom, the whole EU and Japan, before they travel to New Zealand. Australian citizens are exempt. The NZeTA costs ${f.nzAppFee} when requested in the official NZeTA app and ${f.nzWebFee} on the Immigration New Zealand website, and most visitors pay at the same time the International Visitor Conservation and Tourism Levy (IVL) of ${f.ivl}, in force since ${h.date(f.A.nz.ivl.since)}. The total per person is therefore ${f.nzApp} in the app, about ${f.nzAppEur.replace('≈ ', '')} at the ECB rate of ${f.fxDate}, or ${f.nzWeb} online. The NZeTA is valid for ${f.nzYears} years for any number of visits; a visit lasts up to ${f.A.nz.stayMonths} months, or ${f.A.nz.ukStayMonths} months for British citizens. Immigration New Zealand asks travellers to allow ${h.P.nzFacts.allowHours} hours for processing, and the app can handle up to ${h.P.nzFacts.appGroupMax} people at once.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Why is the NZeTA cheaper in the app than on the website?', a: `Immigration New Zealand sets two prices: ${f.nzAppFee} for a request made in the NZeTA app and ${f.nzWebFee} on its website, plus the same levy of ${f.ivl} in both cases. The app reads the passport and takes the photo itself, which costs the agency less to process. For a family of four, the app saves ${h.money({ amount: (f.A.nz.nzeta.web.amount - f.A.nz.nzeta.app.amount) * 4, currency: 'NZD' })}.` },
        { q: 'What is the IVL and does everyone pay it?', a: `The International Visitor Conservation and Tourism Levy is a charge of ${f.ivl} per eligible person, collected with the NZeTA since its rise on ${h.date(f.A.nz.ivl.since)}. The money funds conservation and tourism infrastructure. Most holiday and business visitors pay it; Immigration New Zealand lists the exemptions on its site, and the checker adds it unless your passport is exempt.` },
        { q: 'Do I need an NZeTA if I fly through Auckland to another country?', a: 'Transit passengers from visa waiver countries also need an NZeTA, but they do not pay the levy if they stay in transit. Check the transit rules on the Immigration New Zealand site for your passport, because some nationalities need a transit visa instead. The NZeTA itself costs the same as for a visit.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = [1, 2, 4].map((n) => [String(n), h.money({ amount: (f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' }), h.money({ amount: (f.A.nz.nzeta.web.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' })]);
      return `<h2>Who needs an NZeTA</h2>
<p>The ${h.src('nzWaiver', 'visa waiver list')} of Immigration New Zealand counts ${f.nzCount} countries and territories whose citizens can visit without a visa but need an NZeTA. Australian citizens need neither. Everyone else needs a visitor visa. The checker reads the list as published on ${h.date(f.A.nz.readOn)}.</p>
<h2>What it costs</h2>
<p>The ${h.src('nzFees', 'fee and levy table')} sets the NZeTA at ${f.nzAppFee} in the app and ${f.nzWebFee} online, and the levy at ${f.ivl}. For a group:</p>
${h.table(['Travellers', 'App + levy', 'Website + levy'], rows, 'NZeTA and IVL per person, Immigration New Zealand', ['l', 'r', 'r'])}
<h2>When to apply</h2>
<p>The ${h.src('nzNzeta', 'NZeTA page')} asks travellers to allow ${h.P.nzFacts.allowHours} hours for processing. Airlines and cruise lines check the NZeTA before departure, so apply at least three days before you leave. Enter your departure date below for the last comfortable day.</p>
<!--mini-->
<h2>Validity and stays</h2>
<p>An NZeTA is valid for ${f.nzYears} years for any number of visits, each up to ${f.A.nz.stayMonths} months, or ${f.A.nz.ukStayMonths} months for British citizens. It is linked to the passport used, so a new passport means a new request and a new payment. The levy, paid with the NZeTA, covers the same period.</p>
<h2>Where to apply</h2>
<p>Only in the official NZeTA app or on immigration.govt.nz. Other sites charge more for the same request. The ${h.a('nz-cost', 'NZeTA cost page')} works out the total for your group, and the ${h.a('au', 'Australia page')} covers the Australian leg.</p>`;
    },
  },
  fr: {
    slug: 'nzeta-nouvelle-zelande',
    nav: 'NZeTA',
    card: 'Qui a besoin de la NZeTA, le prix par application ou en ligne, la taxe touristique et les 72 heures à prévoir.',
    title: 'NZeTA Nouvelle-Zélande 2026 : qui en a besoin, prix et taxe',
    description: 'La NZeTA pour la Nouvelle-Zélande : quels passeports en ont besoin, 17 NZD par l’application ou 23 en ligne, plus 100 NZD de taxe touristique, valable deux ans.',
    h1: 'NZeTA : qui en a besoin, combien elle coûte, quand la demander',
    intro: 'Indiquez votre passeport et choisissez l’application ou le site : le vérificateur lit la liste néo-zélandaise et ajoute la NZeTA et la taxe touristique.',
    resume: (h) => {
      const f = F(h);
      return `L’autorisation de voyage électronique néo-zélandaise (NZeTA) est exigée des citoyens des ${f.nzCount} pays et territoires dispensés de visa, dont la France, la Belgique, la Suisse, le Canada et tous les pays de l’Union européenne, avant tout voyage en Nouvelle-Zélande. Les citoyens australiens en sont dispensés. La NZeTA coûte ${f.nzAppFee} demandée dans l’application officielle NZeTA et ${f.nzWebFee} sur le site d’Immigration New Zealand, et la plupart des visiteurs paient en même temps la taxe de conservation et de tourisme pour les visiteurs internationaux (IVL) de ${f.ivl}, en vigueur depuis le ${h.date(f.A.nz.ivl.since)}. Le total par personne est donc de ${f.nzApp} par l’application, environ ${f.nzAppEur.replace('≈ ', '')} au taux BCE du ${f.fxDate}, ou ${f.nzWeb} en ligne. La NZeTA vaut ${f.nzYears} ans pour autant de séjours que voulu, chacun de ${f.A.nz.stayMonths} mois au plus. Immigration New Zealand demande de prévoir ${h.P.nzFacts.allowHours} heures de traitement, et l’application accepte jusqu’à ${h.P.nzFacts.appGroupMax} personnes à la fois.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Pourquoi la NZeTA est-elle moins chère par l’application ?', a: `Immigration New Zealand fixe deux prix : ${f.nzAppFee} pour une demande dans l’application NZeTA et ${f.nzWebFee} sur son site, plus la même taxe de ${f.ivl} dans les deux cas. L’application lit le passeport et prend la photo elle-même, ce qui coûte moins cher à traiter. Pour une famille de quatre, l’application fait économiser ${h.money({ amount: (f.A.nz.nzeta.web.amount - f.A.nz.nzeta.app.amount) * 4, currency: 'NZD' })}.` },
        { q: 'Qu’est-ce que la taxe IVL et tout le monde la paie-t-il ?', a: `L’International Visitor Conservation and Tourism Levy est une taxe de ${f.ivl} par personne concernée, perçue avec la NZeTA depuis sa hausse du ${h.date(f.A.nz.ivl.since)}. Elle finance la protection de la nature et les équipements touristiques. La plupart des touristes et voyageurs d’affaires la paient ; Immigration New Zealand publie les exemptions, et le vérificateur l’ajoute sauf passeport exempté.` },
        { q: 'Faut-il une NZeTA pour un voyage de noces en Nouvelle-Zélande depuis Paris ?', a: `Oui, une par personne, avec la taxe : ${f.times({ amount: f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount, currency: 'NZD' }, 2).m} pour le couple par l’application. La compagnie la vérifie avant l’embarquement, souvent dès l’escale en Asie ou en Australie. Faites la demande au moins trois jours avant le départ, et vérifiez qu’aucune étape australienne n’exige en plus un eVisitor.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = [1, 2, 4].map((n) => [String(n), h.money({ amount: (f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' }), h.money({ amount: (f.A.nz.nzeta.web.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' })]);
      return `<h2>Qui a besoin de la NZeTA</h2>
<p>La ${h.src('nzWaiver', 'liste des pays dispensés de visa')} d’Immigration New Zealand compte ${f.nzCount} pays et territoires dont les citoyens peuvent venir sans visa mais avec une NZeTA. Les citoyens australiens n’ont besoin ni de l’une ni de l’autre. Les autres doivent demander un visa de visiteur. Le vérificateur lit la liste telle que publiée le ${h.date(f.A.nz.readOn)}.</p>
<h2>Combien elle coûte</h2>
<p>Le ${h.src('nzFees', 'barème des frais et de la taxe')} fixe la NZeTA à ${f.nzAppFee} par l’application et ${f.nzWebFee} en ligne, et la taxe à ${f.ivl}. Pour un groupe :</p>
${h.table(['Voyageurs', 'Application + taxe', 'Site + taxe'], rows, 'NZeTA et IVL par personne, Immigration New Zealand', ['l', 'r', 'r'])}
<h2>Quand faire la demande</h2>
<p>La ${h.src('nzNzeta', 'page NZeTA')} demande de prévoir ${h.P.nzFacts.allowHours} heures de traitement. Les compagnies aériennes et de croisière vérifient la NZeTA avant le départ : faites la demande au moins trois jours avant. Saisissez la date de départ ci-dessous pour le dernier jour confortable.</p>
<!--mini-->
<h2>Validité et séjours</h2>
<p>Une NZeTA vaut ${f.nzYears} ans pour autant de séjours que voulu, chacun de ${f.A.nz.stayMonths} mois au plus. Elle est liée au passeport utilisé : un nouveau passeport impose une nouvelle demande et un nouveau paiement. La taxe, payée avec la NZeTA, couvre la même période.</p>
<h2>Où faire la demande</h2>
<p>Uniquement dans l’application officielle NZeTA ou sur immigration.govt.nz. D’autres sites facturent davantage pour la même demande. Pour l’étape australienne, voir la page ${h.a('au', 'ETA Australie')}.</p>`;
    },
  },
  de: {
    slug: 'nzeta-neuseeland',
    nav: 'NZeTA Neuseeland',
    card: 'Wer die NZeTA braucht, App- und Webpreis, die Touristenabgabe und die 72 Stunden Vorlauf.',
    title: 'NZeTA Neuseeland 2026: wer sie braucht, Preis und Abgabe',
    description: 'Die NZeTA für Neuseeland: welche Pässe sie brauchen, 17 NZD in der App oder 23 online, plus 100 NZD Abgabe, zwei Jahre gültig. 72 Stunden Vorlauf planen.',
    h1: 'NZeTA Neuseeland: wer sie braucht, was sie kostet, wann beantragen',
    intro: 'Geben Sie Ihren Pass ein und wählen Sie App oder Website: der Check liest die neuseeländische Liste und addiert NZeTA und Touristenabgabe.',
    resume: (h) => {
      const f = F(h);
      return `Die neuseeländische elektronische Reisegenehmigung (NZeTA) brauchen Bürger der ${f.nzCount} visumfreien Staaten und Gebiete, darunter Deutschland, Österreich, die Schweiz, die ganze EU, die USA und Kanada, vor jeder Reise nach Neuseeland. Australische Staatsbürger sind befreit. Die NZeTA kostet ${f.nzAppFee} in der amtlichen NZeTA-App und ${f.nzWebFee} auf der Seite von Immigration New Zealand, und die meisten Besucher zahlen gleichzeitig die Naturschutz- und Tourismusabgabe für internationale Besucher (IVL) von ${f.ivl}, gültig seit dem ${h.date(f.A.nz.ivl.since)}. Pro Person sind das also ${f.nzApp} in der App, rund ${f.nzAppEur.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}, oder ${f.nzWeb} online. Die NZeTA gilt ${f.nzYears} Jahre für beliebig viele Besuche, jeder bis zu ${f.A.nz.stayMonths} Monate. Immigration New Zealand bittet, ${h.P.nzFacts.allowHours} Stunden Bearbeitungszeit einzuplanen, und die App nimmt bis zu ${h.P.nzFacts.appGroupMax} Personen auf einmal an. Für ein Working-Holiday-Jahr reicht die NZeTA nicht, dafür gibt es ein eigenes Visum.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Warum ist die NZeTA in der App billiger als auf der Website?', a: `Immigration New Zealand legt zwei Preise fest: ${f.nzAppFee} für einen Antrag in der NZeTA-App und ${f.nzWebFee} auf der Website, dazu in beiden Fällen dieselbe Abgabe von ${f.ivl}. Die App liest den Pass und macht das Foto selbst, was die Bearbeitung günstiger macht. Für eine vierköpfige Familie spart die App ${h.money({ amount: (f.A.nz.nzeta.web.amount - f.A.nz.nzeta.app.amount) * 4, currency: 'NZD' })}.` },
        { q: 'Was ist die IVL, und zahlt sie jeder?', a: `Die International Visitor Conservation and Tourism Levy ist eine Abgabe von ${f.ivl} pro betroffener Person, die seit ihrer Erhöhung am ${h.date(f.A.nz.ivl.since)} mit der NZeTA erhoben wird. Sie finanziert Naturschutz und touristische Infrastruktur. Die meisten Urlauber und Geschäftsreisenden zahlen sie; Immigration New Zealand veröffentlicht die Ausnahmen, und der Check rechnet sie ein, wenn Ihr Pass nicht befreit ist.` },
        { q: 'Brauche ich eine NZeTA für eine Rundreise nach dem Abitur?', a: `Für einen Urlaub bis ${f.A.nz.stayMonths} Monate ja, mit Abgabe ${f.nzApp} in der App. Wer dort arbeiten möchte, etwa bei Work and Travel, braucht stattdessen ein Working-Holiday-Visum mit eigenen Bedingungen und Gebühren, das vor der Abreise beantragt wird. Die NZeTA erlaubt keine Arbeit, auch keine bezahlte Saisonarbeit auf Farmen oder in Hostels.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = [1, 2, 4].map((n) => [String(n), h.money({ amount: (f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' }), h.money({ amount: (f.A.nz.nzeta.web.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' })]);
      return `<h2>Wer eine NZeTA braucht</h2>
<p>Die ${h.src('nzWaiver', 'Liste der visumfreien Staaten')} von Immigration New Zealand umfasst ${f.nzCount} Staaten und Gebiete, deren Bürger ohne Visum, aber mit NZeTA einreisen. Australische Staatsbürger brauchen beides nicht. Alle anderen beantragen ein Besuchervisum. Der Check liest die Liste mit Stand vom ${h.date(f.A.nz.readOn)}.</p>
<h2>Was sie kostet</h2>
<p>Die ${h.src('nzFees', 'Gebühren- und Abgabentabelle')} setzt die NZeTA auf ${f.nzAppFee} in der App und ${f.nzWebFee} online fest, die Abgabe auf ${f.ivl}. Für eine Gruppe:</p>
${h.table(['Reisende', 'App + Abgabe', 'Website + Abgabe'], rows, 'NZeTA und IVL pro Person, Immigration New Zealand', ['l', 'r', 'r'])}
<h2>Wann beantragen</h2>
<p>Die ${h.src('nzNzeta', 'NZeTA-Seite')} bittet, ${h.P.nzFacts.allowHours} Stunden für die Bearbeitung einzuplanen. Fluggesellschaften und Kreuzfahrtreedereien prüfen die NZeTA vor der Abreise: beantragen Sie mindestens drei Tage vorher. Geben Sie unten das Abreisedatum ein, um den letzten bequemen Tag zu sehen.</p>
<!--mini-->
<h2>Gültigkeit und Aufenthalt</h2>
<p>Eine NZeTA gilt ${f.nzYears} Jahre für beliebig viele Besuche, jeder bis zu ${f.A.nz.stayMonths} Monate. Sie ist an den Pass gebunden: ein neuer Pass bedeutet einen neuen Antrag und eine neue Zahlung. Die Abgabe, mit der NZeTA bezahlt, gilt für denselben Zeitraum.</p>
<h2>Wo beantragen</h2>
<p>Nur in der amtlichen NZeTA-App oder auf immigration.govt.nz. Andere Seiten verlangen für denselben Antrag mehr und leiten ihn nur weiter, ohne ihn schneller zu machen. Für den Abschnitt in Australien siehe die Seite ${h.a('au', 'ETA Australien')}.</p>`;
    },
  },
  nl: {
    slug: 'nzeta-nieuw-zeeland',
    nav: 'NZeTA Nieuw-Zeeland',
    card: 'Wie de NZeTA nodig heeft, de prijs via app of website, de toeristenheffing en de 72 uur vooraf.',
    title: 'NZeTA Nieuw-Zeeland 2026: wie hem nodig heeft, prijs, IVL',
    description: 'De NZeTA voor Nieuw-Zeeland: welke paspoorten hem nodig hebben, 17 NZD in de app of 23 online, plus 100 NZD heffing, twee jaar geldig. Reken op 72 uur.',
    h1: 'NZeTA Nieuw-Zeeland: wie hem nodig heeft, wat hij kost, wanneer aanvragen',
    intro: 'Vul uw paspoort in en kies app of website: de check leest de Nieuw-Zeelandse lijst en telt NZeTA en toeristenheffing op.',
    resume: (h) => {
      const f = F(h);
      return `De Nieuw-Zeelandse elektronische reisvergunning (NZeTA) is verplicht voor burgers van de ${f.nzCount} visumvrije landen en gebieden, waaronder Nederland, België, de hele EU, de Verenigde Staten en Canada, vóór elke reis naar Nieuw-Zeeland. Australische staatsburgers zijn vrijgesteld. De NZeTA kost ${f.nzAppFee} in de officiële NZeTA-app en ${f.nzWebFee} op de site van Immigration New Zealand, en de meeste bezoekers betalen tegelijk de heffing voor natuurbehoud en toerisme voor internationale bezoekers (IVL) van ${f.ivl}, die sinds ${h.date(f.A.nz.ivl.since)} geldt. Per persoon is dat dus ${f.nzApp} in de app, ongeveer ${f.nzAppEur.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}, of ${f.nzWeb} online. De NZeTA geldt ${f.nzYears} jaar voor zoveel bezoeken als u wilt, elk van hoogstens ${f.A.nz.stayMonths} maanden. Immigration New Zealand vraagt reizigers op ${h.P.nzFacts.allowHours} uur behandeltijd te rekenen, en de app neemt tot ${h.P.nzFacts.appGroupMax} personen tegelijk aan. Voor een working holiday is een apart visum nodig.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Waarom is de NZeTA in de app goedkoper dan op de website?', a: `Immigration New Zealand hanteert twee prijzen: ${f.nzAppFee} voor een aanvraag in de NZeTA-app en ${f.nzWebFee} op de website, plus in beide gevallen dezelfde heffing van ${f.ivl}. De app leest het paspoort en maakt zelf de foto, wat de behandeling goedkoper maakt. Voor een gezin van vier bespaart de app ${h.money({ amount: (f.A.nz.nzeta.web.amount - f.A.nz.nzeta.app.amount) * 4, currency: 'NZD' })}.` },
        { q: 'Wat is de IVL, en betaalt iedereen die?', a: `De International Visitor Conservation and Tourism Levy is een heffing van ${f.ivl} per betrokken persoon, die sinds de verhoging op ${h.date(f.A.nz.ivl.since)} met de NZeTA wordt geïnd. Ze financiert natuurbehoud en toeristische voorzieningen. De meeste vakantiegangers en zakenreizigers betalen haar; Immigration New Zealand publiceert de uitzonderingen, en de check telt haar mee tenzij uw paspoort vrijgesteld is.` },
        { q: 'Heb ik een NZeTA nodig voor een reis via Australië naar Nieuw-Zeeland?', a: 'Ja, voor Nieuw-Zeeland zelf, en voor de Australische etappe daarnaast een eVisitor of ETA. Het zijn twee aparte vergunningen van twee landen, elk met eigen tarief en eigen aanvraag. Met een Nederlands paspoort is de eVisitor gratis; de NZeTA met heffing kost per persoon het bedrag hierboven.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const rows = [1, 2, 4].map((n) => [String(n), h.money({ amount: (f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' }), h.money({ amount: (f.A.nz.nzeta.web.amount + f.A.nz.ivl.amount) * n, currency: 'NZD' })]);
      return `<h2>Wie een NZeTA nodig heeft</h2>
<p>De ${h.src('nzWaiver', 'lijst van visumvrije landen')} van Immigration New Zealand telt ${f.nzCount} landen en gebieden waarvan de burgers zonder visum maar met een NZeTA binnenkomen. Australische staatsburgers hebben geen van beide nodig. Alle anderen vragen een bezoekersvisum aan. De check leest de lijst zoals gepubliceerd op ${h.date(f.A.nz.readOn)}.</p>
<h2>Wat hij kost</h2>
<p>De ${h.src('nzFees', 'tarieven- en heffingentabel')} legt de NZeTA vast op ${f.nzAppFee} in de app en ${f.nzWebFee} online, en de heffing op ${f.ivl}. Voor een gezelschap:</p>
${h.table(['Reizigers', 'App + heffing', 'Website + heffing'], rows, 'NZeTA en IVL per persoon, Immigration New Zealand', ['l', 'r', 'r'])}
<h2>Wanneer aanvragen</h2>
<p>De ${h.src('nzNzeta', 'NZeTA-pagina')} vraagt op ${h.P.nzFacts.allowHours} uur behandeltijd te rekenen. Luchtvaartmaatschappijen en cruisemaatschappijen controleren de NZeTA vóór vertrek: vraag minstens drie dagen vooraf aan. Vul hieronder de vertrekdatum in voor de laatste rustige dag.</p>
<!--mini-->
<h2>Geldigheid en verblijf</h2>
<p>Een NZeTA geldt ${f.nzYears} jaar voor zoveel bezoeken als u wilt, elk van hoogstens ${f.A.nz.stayMonths} maanden. Hij is gekoppeld aan het paspoort: een nieuw paspoort betekent een nieuwe aanvraag en een nieuwe betaling. De heffing, betaald met de NZeTA, geldt voor dezelfde periode.</p>
<h2>Waar aanvragen</h2>
<p>Alleen in de officiële NZeTA-app of op immigration.govt.nz. Andere sites vragen meer voor dezelfde aanvraag en sturen hem alleen door, zonder dat het sneller gaat. Voor de Australische etappe zie de pagina ${h.a('au', 'ETA Australië')}.</p>`;
    },
  },
});
