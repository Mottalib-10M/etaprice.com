import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/guide-types';
import { F } from '../facts';

const evOnly = (h: Helpers) => h.M.AUTH.au.evisitor.nationals.filter((c) => !h.M.AUTH.au.eta.nationals.includes(c)).map((c) => h.land(c)).join(', ');
const etaOnly = (h: Helpers) => h.M.AUTH.au.eta.nationals.filter((c) => !h.M.AUTH.au.evisitor.nationals.includes(c)).map((c) => h.land(c)).join(', ');

export default definePage({
  id: 'au',
  group: 'anz',
  order: 1,
  tool: { kind: 'checker', dests: ['AU'] },
  mini: { kind: 'cost', dest: 'AU' },
  related: ['au-cost', 'nz', 'esta', 'uk-cost'],
  sources: ['auEta', 'auEvisitor', 'ecb'],
  en: {
    slug: 'australia-eta',
    nav: 'Australia ETA',
    card: 'ETA through the official app or a free eVisitor: which one your passport allows, and what each costs.',
    title: 'Australia ETA 2026: the AUD 20 app or the free eVisitor',
    description: 'Australia ETA or eVisitor: which passports use which, the AUD 20 charge of the official app, the free eVisitor for Europeans, and up to 3 months per entry.',
    h1: 'Australia ETA and eVisitor: which one you need and what it costs',
    intro: 'Enter your passport: the checker reads the Home Affairs lists and tells you whether you can use the ETA, the free eVisitor, or both.',
    resume: (h) => {
      const f = F(h);
      return `Australia offers two electronic visitor visas to travellers who do not need a full visa. The Electronic Travel Authority (subclass 601) is applied for only through the official Australian ETA app, published by the Department of Home Affairs, and the only charge is a service charge of ${f.au}; it is open to ${f.auEtaCount} nationalities including the United States, Canada, Japan, Singapore, the United Kingdom and most of Western Europe. The eVisitor (subclass 651) is free and open to ${f.evCount} European nationalities, the whole European Union included. Both are valid for ${h.P.auFacts.validityMonths} months, or until the passport expires if sooner, and allow stays of up to ${h.P.auFacts.stayMonths} months after each entry for tourism or business visits. Each family member, children included, needs a separate application. A French, German or Dutch traveller can therefore choose: the eVisitor costs nothing, while the ETA in the app costs ${f.au}. Americans and Canadians have only the ETA. Any site that charges more than these amounts is not the Australian government.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Should a European choose the eVisitor or the ETA for Australia?', a: `The eVisitor, in most cases: Home Affairs charges nothing for it, while the ETA through the app costs ${f.au} per person. Both give ${h.P.auFacts.validityMonths} months of validity and stays of up to ${h.P.auFacts.stayMonths} months per entry. The app can be quicker to use because it reads the passport chip, but for a family the free route saves the full charge for every member.` },
        { q: 'Can I apply for the Australian ETA on a website?', a: 'No. Home Affairs only accepts ETA applications through the Australian ETA app on a smartphone. A website that offers to file an ETA is a private intermediary. Travel agents and airlines can sometimes help, but the official charge remains the one in the app. The eVisitor, by contrast, is applied for online on the Home Affairs website.' },
        { q: 'Which European passports cannot use the Australian ETA?', a: `Some EU passports are only on the eVisitor list: ${evOnly(h)}. Their holders apply for the free eVisitor and cannot use the paid ETA app. Since the eVisitor costs nothing, they lose nothing. The checker above shows which option applies to each passport.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Two schemes, two lists</h2>
<p>The ${h.src('auEta', 'ETA page of Home Affairs')} lists ${f.auEtaCount} passports eligible for the ETA; the ${h.src('auEvisitor', 'eVisitor page')} lists ${f.evCount} European passports eligible for the eVisitor. Many European passports appear on both. Some appear on one only: ETA only, ${etaOnly(h)}; eVisitor only, ${evOnly(h)}.</p>
${h.table(['', 'ETA (subclass 601)', 'eVisitor (subclass 651)'], [['How to apply', 'Australian ETA app only', 'Online, Home Affairs'], ['Charge', f.au + ' service charge', 'Free'], ['Validity', `${h.P.auFacts.validityMonths} months or passport`, `${h.P.auFacts.validityMonths} months from grant`], ['Stay per entry', `Up to ${h.P.auFacts.stayMonths} months`, `Up to ${h.P.auFacts.stayMonths} months`]], `Home Affairs pages read on ${f.dataDay}`, ['l', 'l', 'l'])}
<h2>Applying through the app</h2>
<p>The Australian ETA app scans the passport chip and takes a photo of your face. Each family member needs a separate application. The ${f.au} is a service charge; Home Affairs states that there is no other charge for an ETA. Look for the app published by the Department of Home Affairs in the official app stores, and ignore other apps or sites using the word ETA.</p>
<h2>What a family pays</h2>
<p>For an American family, every member pays the ${f.au} of the app. For a European family eligible for the eVisitor, the total can be nil. Enter your group below to see the total in Australian dollars and euros.</p>
<!--mini-->
<h2>What the visa allows</h2>
<p>Both the ETA and the eVisitor cover tourism, visits to family and friends and business visitor activities such as meetings and conferences, with stays of up to ${h.P.auFacts.stayMonths} months after each entry, as often as you like during the ${h.P.auFacts.validityMonths} months. They do not allow work. A new passport means a new application. The ${h.a('au-cost', 'cost page')} compares the totals, and the ${h.a('nz', 'NZeTA page')} covers the trip on to New Zealand.</p>`;
    },
  },
  fr: {
    slug: 'eta-australie',
    nav: 'ETA Australie',
    card: 'ETA par l’application officielle ou eVisitor gratuit : ce que votre passeport permet et ce que chacun coûte.',
    title: 'ETA Australie 2026 : appli à 20 AUD ou eVisitor gratuit',
    description: 'ETA ou eVisitor pour l’Australie : quels passeports utilisent quoi, les 20 AUD de l’application officielle, l’eVisitor gratuit et 3 mois au plus par séjour.',
    h1: 'ETA et eVisitor pour l’Australie : lequel demander et combien il coûte',
    intro: 'Indiquez votre passeport : le vérificateur lit les listes du ministère australien et dit si vous pouvez utiliser l’ETA, l’eVisitor gratuit, ou les deux.',
    resume: (h) => {
      const f = F(h);
      return `L’Australie propose deux visas électroniques aux voyageurs qui n’ont pas besoin d’un visa classique. L’Electronic Travel Authority (sous-classe 601) se demande uniquement dans l’application officielle Australian ETA, publiée par le Department of Home Affairs, et coûte seulement des frais de service de ${f.au} ; elle est ouverte à ${f.auEtaCount} nationalités, dont la France, la Belgique, la Suisse, le Canada et les États-Unis. L’eVisitor (sous-classe 651) est gratuit et ouvert à ${f.evCount} nationalités européennes, toute l’Union européenne comprise. Les deux valent ${h.P.auFacts.validityMonths} mois, ou jusqu’à l’expiration du passeport, et permettent des séjours de ${h.P.auFacts.stayMonths} mois au plus après chaque entrée, pour du tourisme ou des rendez-vous d’affaires. Chaque membre de la famille, enfants compris, fait sa propre demande. Un voyageur français a donc le choix : l’eVisitor ne coûte rien, l’ETA dans l’application coûte ${f.au}, environ ${f.auEur.replace('≈ ', '')}. Un Canadien n’a que l’ETA. Tout site qui facture davantage n’est pas l’administration australienne.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Un Français doit-il choisir l’eVisitor ou l’ETA pour l’Australie ?', a: `L’eVisitor, le plus souvent : le ministère australien ne le facture pas, alors que l’ETA par l’application coûte ${f.au} par personne. Les deux donnent ${h.P.auFacts.validityMonths} mois de validité et des séjours de ${h.P.auFacts.stayMonths} mois au plus par entrée. L’application peut être plus rapide, car elle lit la puce du passeport, mais pour une famille la voie gratuite économise les frais de chaque membre.` },
        { q: 'Peut-on demander l’ETA australienne sur un site internet ?', a: 'Non. Le ministère australien n’accepte les demandes d’ETA que par l’application Australian ETA sur smartphone. Un site qui propose de déposer une ETA est un intermédiaire privé. Une agence de voyages ou une compagnie peut parfois aider, mais le prix officiel reste celui de l’application. L’eVisitor, lui, se demande en ligne sur le site du ministère.' },
        { q: 'Quels passeports européens n’ont pas accès à l’ETA australienne ?', a: `Certains passeports de l’Union ne figurent que sur la liste eVisitor : ${evOnly(h)}. Leurs titulaires demandent l’eVisitor gratuit et ne peuvent pas utiliser l’application payante. Comme l’eVisitor ne coûte rien, ils n’y perdent rien. Le vérificateur ci-dessus indique l’option ouverte à chaque passeport.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Deux dispositifs, deux listes</h2>
<p>La ${h.src('auEta', 'page ETA du ministère australien')} recense ${f.auEtaCount} passeports admis à l’ETA ; la ${h.src('auEvisitor', 'page eVisitor')} recense ${f.evCount} passeports européens admis à l’eVisitor. Beaucoup de passeports européens figurent sur les deux. Certains sur une seule : ETA seulement, ${etaOnly(h)} ; eVisitor seulement, ${evOnly(h)}.</p>
${h.table(['', 'ETA (sous-classe 601)', 'eVisitor (sous-classe 651)'], [['Demande', 'Application Australian ETA uniquement', 'En ligne, Home Affairs'], ['Prix', f.au + ' de frais de service', 'Gratuit'], ['Validité', `${h.P.auFacts.validityMonths} mois ou passeport`, `${h.P.auFacts.validityMonths} mois après délivrance`], ['Séjour par entrée', `${h.P.auFacts.stayMonths} mois au plus`, `${h.P.auFacts.stayMonths} mois au plus`]], `Pages du ministère lues le ${f.dataDay}`, ['l', 'l', 'l'])}
<h2>La demande par l’application</h2>
<p>L’application Australian ETA lit la puce du passeport et photographie le visage. Chaque membre de la famille fait une demande séparée. Les ${f.au} sont des frais de service ; le ministère précise qu’aucun autre montant n’est dû pour une ETA. Cherchez l’application publiée par le Department of Home Affairs dans les magasins officiels, et ignorez les autres applications ou sites qui utilisent le mot ETA.</p>
<h2>Ce que paie une famille</h2>
<p>Pour une famille canadienne, chaque membre paie les ${f.au} de l’application. Pour une famille française admise à l’eVisitor, le total peut être nul. Indiquez votre groupe ci-dessous pour voir le total en dollars australiens et en euros.</p>
<!--mini-->
<h2>Ce que le visa permet</h2>
<p>L’ETA et l’eVisitor couvrent le tourisme, les visites familiales et les activités de visiteur d’affaires comme les réunions et les conférences, avec des séjours de ${h.P.auFacts.stayMonths} mois au plus après chaque entrée, aussi souvent que voulu pendant ${h.P.auFacts.validityMonths} mois. Ils ne permettent pas de travailler. Un nouveau passeport impose une nouvelle demande. Pour la suite du voyage, voir la page ${h.a('nz', 'NZeTA')}.</p>`;
    },
  },
  de: {
    slug: 'eta-australien',
    nav: 'ETA Australien',
    card: 'ETA über die amtliche App oder kostenloser eVisitor: was Ihr Pass erlaubt und was beides kostet.',
    title: 'ETA Australien 2026: App für 20 AUD oder eVisitor gratis',
    description: 'ETA oder eVisitor für Australien: welche Pässe was nutzen, die 20 AUD der amtlichen App, der kostenlose eVisitor für Europäer, je 3 Monate pro Einreise.',
    h1: 'ETA und eVisitor für Australien: was Sie brauchen und was es kostet',
    intro: 'Geben Sie Ihren Pass ein: der Check liest die Listen des australischen Innenministeriums und zeigt, ob Sie ETA, eVisitor oder beides nutzen können.',
    resume: (h) => {
      const f = F(h);
      return `Australien bietet Reisenden ohne Visumpflicht zwei elektronische Besuchervisa. Die Electronic Travel Authority (Subclass 601) wird ausschließlich in der amtlichen App Australian ETA des Department of Home Affairs beantragt und kostet nur eine Servicegebühr von ${f.au}; sie steht ${f.auEtaCount} Staatsangehörigkeiten offen, darunter Deutschland, Österreich, die Schweiz, die USA und Kanada. Der eVisitor (Subclass 651) ist kostenlos und steht ${f.evCount} europäischen Staatsangehörigkeiten offen, die ganze EU eingeschlossen. Beide gelten ${h.P.auFacts.validityMonths} Monate oder bis zum Ablauf des Passes und erlauben Aufenthalte von bis zu ${h.P.auFacts.stayMonths} Monaten pro Einreise, als Tourist oder für Geschäftstermine. Jedes Familienmitglied, auch ein Kind, stellt einen eigenen Antrag. Deutsche haben also die Wahl: der eVisitor kostet nichts, die ETA in der App ${f.au}, rund ${f.auEur.replace('≈ ', '')}. Wer mit Working-Holiday-Visum arbeiten will, braucht ein anderes Visum. Jede Seite, die mehr verlangt, ist nicht die australische Regierung.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Sollte ich als Deutscher den eVisitor oder die ETA wählen?', a: `Meist den eVisitor: das australische Innenministerium verlangt dafür nichts, während die ETA über die App ${f.au} pro Person kostet. Beide gelten ${h.P.auFacts.validityMonths} Monate und erlauben Aufenthalte bis ${h.P.auFacts.stayMonths} Monate pro Einreise. Die App kann schneller sein, weil sie den Chip im Pass liest, doch für eine Familie spart der kostenlose Weg die Gebühr für jedes Mitglied.` },
        { q: 'Kann ich die australische ETA auf einer Website beantragen?', a: 'Nein. Das Innenministerium nimmt ETA-Anträge nur über die App Australian ETA auf dem Smartphone an. Eine Website, die anbietet, eine ETA einzureichen, ist ein privater Vermittler. Reisebüros oder Fluggesellschaften können manchmal helfen, doch die amtliche Gebühr bleibt die in der App. Den eVisitor beantragen Sie dagegen online auf der Seite des Ministeriums.' },
        { q: 'Welche europäischen Pässe können die australische ETA nicht nutzen?', a: `Einige EU-Pässe stehen nur auf der eVisitor-Liste: ${evOnly(h)}. Ihre Inhaber beantragen den kostenlosen eVisitor und können die kostenpflichtige App nicht nutzen. Da der eVisitor nichts kostet, verlieren sie nichts. Der Check oben zeigt für jeden Pass, welche Möglichkeit offensteht.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Zwei Verfahren, zwei Listen</h2>
<p>Die ${h.src('auEta', 'ETA-Seite des Innenministeriums')} nennt ${f.auEtaCount} Pässe, die für die ETA zugelassen sind; die ${h.src('auEvisitor', 'eVisitor-Seite')} nennt ${f.evCount} europäische Pässe für den eVisitor. Viele europäische Pässe stehen auf beiden Listen. Einige nur auf einer: nur ETA, ${etaOnly(h)}; nur eVisitor, ${evOnly(h)}.</p>
${h.table(['', 'ETA (Subclass 601)', 'eVisitor (Subclass 651)'], [['Antrag', 'Nur App Australian ETA', 'Online, Home Affairs'], ['Kosten', f.au + ' Servicegebühr', 'Kostenlos'], ['Gültigkeit', `${h.P.auFacts.validityMonths} Monate oder Pass`, `${h.P.auFacts.validityMonths} Monate ab Erteilung`], ['Aufenthalt pro Einreise', `Bis ${h.P.auFacts.stayMonths} Monate`, `Bis ${h.P.auFacts.stayMonths} Monate`]], `Seiten des Ministeriums, gelesen am ${f.dataDay}`, ['l', 'l', 'l'])}
<h2>Der Antrag über die App</h2>
<p>Die App Australian ETA liest den Chip im Pass und nimmt ein Foto Ihres Gesichts auf. Jedes Familienmitglied stellt einen eigenen Antrag. Die ${f.au} sind eine Servicegebühr; das Ministerium schreibt, dass für die ETA sonst nichts zu zahlen ist. Suchen Sie in den offiziellen App-Stores die App des Department of Home Affairs und meiden Sie andere Apps oder Seiten mit dem Wort ETA.</p>
<h2>Was eine Familie zahlt</h2>
<p>Für eine amerikanische Familie zahlt jedes Mitglied die ${f.au} der App. Für eine deutsche Familie, die den eVisitor nutzt, kann die Summe null sein. Geben Sie unten Ihre Gruppe ein, um den Betrag in australischen Dollar und Euro zu sehen.</p>
<!--mini-->
<h2>Was das Visum erlaubt</h2>
<p>ETA und eVisitor gelten für Urlaub, Besuche bei Familie und Freunden und geschäftliche Besuche wie Besprechungen und Konferenzen, mit Aufenthalten bis ${h.P.auFacts.stayMonths} Monate pro Einreise, so oft Sie wollen innerhalb der ${h.P.auFacts.validityMonths} Monate. Arbeiten dürfen Sie damit nicht. Ein neuer Pass bedeutet einen neuen Antrag. Für die Weiterreise siehe die Seite ${h.a('nz', 'NZeTA Neuseeland')}.</p>`;
    },
  },
  nl: {
    slug: 'eta-australie',
    nav: 'ETA Australië',
    card: 'ETA via de officiële app of een gratis eVisitor: wat uw paspoort toelaat en wat elk kost.',
    title: 'ETA Australië 2026: app voor 20 AUD of gratis eVisitor',
    description: 'ETA of eVisitor voor Australië: welke paspoorten wat gebruiken, de 20 AUD van de officiële app, de gratis eVisitor voor Europeanen, 3 maanden per bezoek.',
    h1: 'ETA en eVisitor voor Australië: wat u nodig hebt en wat het kost',
    intro: 'Vul uw paspoort in: de check leest de lijsten van het Australische ministerie en zegt of u de ETA, de gratis eVisitor of beide kunt gebruiken.',
    resume: (h) => {
      const f = F(h);
      return `Australië biedt reizigers zonder visumplicht twee elektronische bezoekersvisa. De Electronic Travel Authority (subclass 601) vraagt u alleen aan in de officiële app Australian ETA van het Department of Home Affairs, en kost alleen servicekosten van ${f.au}; hij staat open voor ${f.auEtaCount} nationaliteiten, waaronder Nederland, België, de Verenigde Staten en Canada. De eVisitor (subclass 651) is gratis en staat open voor ${f.evCount} Europese nationaliteiten, de hele Europese Unie inbegrepen. Beide gelden ${h.P.auFacts.validityMonths} maanden of tot het paspoort verloopt, en staan verblijven toe van hoogstens ${h.P.auFacts.stayMonths} maanden per binnenkomst, als toerist of voor zakelijke afspraken. Elk gezinslid, ook een kind, dient een eigen aanvraag in. Nederlanders en Belgen hebben dus de keus: de eVisitor kost niets, de ETA in de app ${f.au}, ongeveer ${f.auEur.replace('≈ ', '')}. Wie wil werken, heeft een ander visum nodig, zoals het working holiday visum. Elke site die meer vraagt, is niet de Australische overheid.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Kiest een Nederlander beter de eVisitor of de ETA voor Australië?', a: `Meestal de eVisitor: het Australische ministerie rekent er niets voor, terwijl de ETA via de app ${f.au} per persoon kost. Beide gelden ${h.P.auFacts.validityMonths} maanden en staan verblijven van hoogstens ${h.P.auFacts.stayMonths} maanden per binnenkomst toe. De app kan sneller zijn, omdat hij de chip in het paspoort leest, maar voor een gezin bespaart de gratis weg de kosten voor elk lid.` },
        { q: 'Kan ik de Australische ETA op een website aanvragen?', a: 'Nee. Het ministerie aanvaardt ETA-aanvragen alleen via de app Australian ETA op een smartphone. Een website die aanbiedt een ETA in te dienen, is een private tussenpersoon. Een reisbureau of luchtvaartmaatschappij kan soms helpen, maar het officiële tarief blijft dat van de app. De eVisitor vraagt u daarentegen online aan op de site van het ministerie.' },
        { q: 'Welke Europese paspoorten kunnen de Australische ETA niet gebruiken?', a: `Sommige EU-paspoorten staan alleen op de eVisitor-lijst: ${evOnly(h)}. De houders vragen de gratis eVisitor aan en kunnen de betaalde app niet gebruiken. Omdat de eVisitor niets kost, verliezen ze niets. De check hierboven toont voor elk paspoort welke mogelijkheid openstaat.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Twee regelingen, twee lijsten</h2>
<p>De ${h.src('auEta', 'ETA-pagina van het ministerie')} noemt ${f.auEtaCount} paspoorten die voor de ETA in aanmerking komen; de ${h.src('auEvisitor', 'eVisitor-pagina')} noemt ${f.evCount} Europese paspoorten voor de eVisitor. Veel Europese paspoorten staan op beide. Sommige op één: alleen ETA, ${etaOnly(h)}; alleen eVisitor, ${evOnly(h)}.</p>
${h.table(['', 'ETA (subclass 601)', 'eVisitor (subclass 651)'], [['Aanvraag', 'Alleen app Australian ETA', 'Online, Home Affairs'], ['Kosten', f.au + ' servicekosten', 'Gratis'], ['Geldigheid', `${h.P.auFacts.validityMonths} maanden of paspoort`, `${h.P.auFacts.validityMonths} maanden na afgifte`], ['Verblijf per binnenkomst', `Tot ${h.P.auFacts.stayMonths} maanden`, `Tot ${h.P.auFacts.stayMonths} maanden`]], `Pagina’s van het ministerie, gelezen op ${f.dataDay}`, ['l', 'l', 'l'])}
<h2>De aanvraag via de app</h2>
<p>De app Australian ETA leest de chip in het paspoort en maakt een foto van uw gezicht. Elk gezinslid dient een aparte aanvraag in. De ${f.au} zijn servicekosten; het ministerie schrijft dat er voor een ETA verder niets te betalen valt. Zoek in de officiële appwinkels de app van het Department of Home Affairs en negeer andere apps of sites met het woord ETA.</p>
<h2>Wat een gezin betaalt</h2>
<p>Voor een Amerikaans gezin betaalt elk lid de ${f.au} van de app. Voor een Nederlands gezin dat de eVisitor gebruikt, kan het totaal nul zijn. Vul hieronder uw gezelschap in om het totaal in Australische dollar en euro te zien.</p>
<!--mini-->
<h2>Wat het visum toestaat</h2>
<p>ETA en eVisitor gelden voor vakantie, bezoek aan familie en vrienden en zakelijke bezoeken zoals vergaderingen en congressen, met verblijven van hoogstens ${h.P.auFacts.stayMonths} maanden per binnenkomst, zo vaak u wilt binnen de ${h.P.auFacts.validityMonths} maanden. Werken mag er niet mee. Een nieuw paspoort betekent een nieuwe aanvraag. Voor de verdere reis zie de pagina ${h.a('nz', 'NZeTA Nieuw-Zeeland')}.</p>`;
    },
  },
});
