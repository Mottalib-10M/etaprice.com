import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/guide-types';
import { F } from '../facts';

const rows = (h: Helpers) => { const f = F(h); return [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(f.A.ca.fee, n).m, f.times(f.A.ca.fee, n).e]); };

export default definePage({
  id: 'ca-cost',
  group: 'ca',
  order: 2,
  tool: { kind: 'cost', dest: 'CA' },
  mini: { kind: 'overcharge', dest: 'CA' },
  related: ['ca', 'ca-pr', 'esta-cost', 'uk-cost'],
  sources: ['irpr', 'caEta', 'ecb'],
  en: {
    slug: 'canada-eta-cost',
    nav: 'Canada eTA cost',
    card: 'CAN$7 per person for up to five years, in euros, for the whole family, and what a copycat site adds.',
    title: 'Canada eTA cost 2026: CAN$7 per person for up to five years',
    description: 'The Canada eTA costs CAN$7 per traveller under the Canadian regulations, children included, for up to five years. Total for your family in dollars and euros.',
    h1: 'Canada eTA cost: the official fee for every traveller',
    intro: 'Choose your passport and the number of travellers: the calculator multiplies the official fee and converts it into euros at the ECB rate.',
    resume: (h) => {
      const f = F(h);
      return `The Canadian eTA costs ${f.ca} per person, the fee set by section 294.1 of the Immigration and Refugee Protection Regulations, about ${f.caEur.replace('≈ ', '')} at the ECB rate of ${f.fxDate}. It is by far the cheapest of the travel authorisations on this site, and the one that lasts longest: up to ${f.caYears} years, or until the passport expires if that comes first, for any number of trips by air. There is no child rate and no family rate: each traveller, babies included, needs an eTA linked to their own passport and pays the same ${f.ca}, so a family of four pays ${f.times(f.A.ca.fee, 4).m}. The fee is paid by card on canada.ca at the end of the form and is not refunded, even if the eTA is refused or not used. A traveller who does not qualify for an eTA applies for a visitor visa, whose processing fee is ${f.caVisa} and which also requires biometrics. Any price above ${f.ca} per person for an eTA includes a third party’s service charge.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Why is the Canada eTA so much cheaper than the UK ETA or the ESTA?', a: `Because each country sets its own fee by law. Canada’s ${f.ca} has stayed the same since the eTA was introduced, while the UK fee rose to ${f.uk} and the US fee to ${f.us}. The Canadian eTA also lasts longer, up to ${f.caYears} years, so over five years it costs a fraction of the others.` },
        { q: 'Is the Canada eTA fee refundable if I cancel my trip?', a: `No. The ${f.ca} is non-refundable once the application is submitted, whether the eTA is approved, refused or never used. An approved eTA stays valid for up to ${f.caYears} years, though, so a cancelled trip does not waste it: you can use it for a later visit with the same passport.` },
        { q: 'A website charged me much more than CAN$7. Was it a scam?', a: `Not necessarily a scam, but not the government either. Some private sites submit the eTA form for you and add their own fee. Canada asks travellers to apply only through its official website. Check that an eTA linked to your passport exists using the official status check, and contact your card issuer about the extra charge.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>The eTA fee by group size</h2>
<p>The fee is the same for every traveller. This table multiplies ${f.ca} and converts the total at the ECB reference rate of ${f.fxDate}.</p>
${h.table(['Travellers', 'Official fee', 'In euros'], rows(h), `Fee under section 294.1 of the Canadian regulations, read on ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>What you pay for</h2>
<p>One application per person and, if approved, an authorisation linked to the passport, valid for up to ${f.caYears} years or until the passport expires. It covers any number of flights to Canada and transits through Canadian airports. It does not cover work or study permits, which have their own fees, and it does not guarantee entry.</p>
<h2>Over five years, the cheapest authorisation</h2>
<p>Because the eTA lasts up to ${f.caYears} years, a frequent visitor pays ${f.ca} once where the same five years would mean three UK ETAs at ${f.uk} each and three ESTAs at ${f.us} each. The comparison only holds if the passport stays valid: a new passport means a new eTA.</p>
<h2>When a site asks for more</h2>
<p>The official form lives on ${h.src('caEta', 'canada.ca')}. Other websites fill in the same form and charge a service fee on top of the ${f.ca}; the decision still comes from Immigration, Refugees and Citizenship Canada and is not faster. If you have a price in front of you, enter it below to see how much is not the government fee.</p>
<!--mini-->
<h2>If you need a visa instead</h2>
<p>Citizens of visa-required countries, and of countries eligible only under conditions who do not meet them, apply for a visitor visa: the processing fee is ${f.caVisa}, plus a separate biometrics fee, and the delay is counted in weeks. The ${h.a('ca', 'Canada eTA page')} explains who falls into which group, and the ${h.a('ca-pr', 'green card page')} covers US permanent residents.</p>`;
    },
  },
  fr: {
    slug: 'prix-ave-canada',
    nav: 'Prix de l’AVE',
    card: '7 $ CA par personne pour cinq ans au plus, en euros, pour toute la famille, et ce qu’ajoute un site copie.',
    title: 'Prix AVE Canada 2026 : 7 $ CA par personne, valable 5 ans',
    description: 'L’AVE pour le Canada coûte 7 $ CA par voyageur selon le règlement canadien, enfants compris, pour cinq ans au plus. Total de la famille en dollars et en euros.',
    h1: 'Prix de l’AVE canadienne : le tarif officiel pour chaque voyageur',
    intro: 'Choisissez votre passeport et le nombre de voyageurs : le calculateur multiplie le prix officiel et le convertit en euros au taux BCE.',
    resume: (h) => {
      const f = F(h);
      return `L’AVE canadienne coûte ${f.ca} par personne, le montant fixé par l’article 294.1 du Règlement sur l’immigration et la protection des réfugiés, soit environ ${f.caEur.replace('≈ ', '')} au taux BCE du ${f.fxDate}. C’est de loin la moins chère des autorisations de voyage présentées ici, et celle qui dure le plus longtemps : jusqu’à ${f.caYears} ans, ou jusqu’à l’expiration du passeport si elle arrive avant, pour autant de voyages en avion que vous voulez. Il n’existe ni tarif enfant ni tarif famille : chaque voyageur, bébé compris, a besoin d’une AVE liée à son propre passeport et paie ${f.ca}, si bien qu’une famille de quatre paie ${f.times(f.A.ca.fee, 4).m}. Le paiement se fait par carte sur canada.ca à la fin du formulaire et n’est jamais remboursé, même si l’AVE est refusée ou inutilisée. Un voyageur qui n’a pas droit à l’AVE demande un visa de visiteur, dont les frais de traitement sont de ${f.caVisa}, avec en plus la biométrie. Tout prix supérieur à ${f.ca} par personne comprend des frais de service d’un intermédiaire.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Pourquoi l’AVE coûte-t-elle tellement moins cher que l’ETA britannique ?', a: `Parce que chaque pays fixe ses propres frais par la loi. Les ${f.ca} canadiens n’ont pas bougé depuis la création de l’AVE, alors que l’ETA britannique est passée à ${f.uk} et l’ESTA à ${f.us}. L’AVE dure aussi plus longtemps, jusqu’à ${f.caYears} ans : sur cinq ans, elle coûte une petite fraction des autres.` },
        { q: 'L’AVE est-elle remboursée si j’annule mon voyage ?', a: `Non. Les ${f.ca} ne sont pas remboursables une fois la demande envoyée, que l’AVE soit approuvée, refusée ou jamais utilisée. Une AVE approuvée reste toutefois valable jusqu’à ${f.caYears} ans : un voyage annulé ne la gaspille pas, elle servira pour une visite ultérieure avec le même passeport.` },
        { q: 'Un site m’a fait payer bien plus de 7 $ CA : est-ce une arnaque ?', a: `Pas forcément, mais ce n’est pas l’administration. Certains sites privés remplissent le formulaire à votre place et ajoutent leurs frais. Le Canada demande de passer uniquement par son site officiel. Vérifiez avec l’outil officiel de suivi qu’une AVE est bien liée à votre passeport, et contactez votre banque au sujet du supplément.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Le prix de l’AVE selon la taille du groupe</h2>
<p>Le prix est le même pour chaque voyageur. Ce tableau multiplie ${f.ca} et convertit le total au taux de référence BCE du ${f.fxDate}.</p>
${h.table(['Voyageurs', 'Prix officiel', 'En euros'], rows(h), `Frais prévus à l’article 294.1 du règlement canadien, lus le ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Ce que vous payez</h2>
<p>Une demande par personne et, si elle est approuvée, une autorisation liée au passeport, valable jusqu’à ${f.caYears} ans ou jusqu’à l’expiration du passeport. Elle couvre autant de vols vers le Canada et de transits par un aéroport canadien que vous voulez. Elle ne remplace ni un permis de travail ni un permis d’études, qui ont leurs propres frais, et ne garantit pas l’entrée.</p>
<h2>Sur cinq ans, l’autorisation la moins chère</h2>
<p>Comme l’AVE vaut jusqu’à ${f.caYears} ans, un voyageur régulier paie ${f.ca} une fois là où les mêmes cinq ans demanderaient trois ETA britanniques à ${f.uk} et trois ESTA à ${f.us}. La comparaison suppose un passeport toujours valable : un nouveau passeport impose une nouvelle AVE.</p>
<h2>Quand un site demande davantage</h2>
<p>Le formulaire officiel est sur ${h.src('caEta', 'canada.ca')}. D’autres sites remplissent le même formulaire et ajoutent des frais de service aux ${f.ca} ; la décision vient toujours d’Immigration, Réfugiés et Citoyenneté Canada et n’est pas plus rapide. Si un prix vous a été annoncé, saisissez-le ci-dessous pour voir la part qui ne revient pas à l’État.</p>
<!--mini-->
<h2>S’il vous faut un visa</h2>
<p>Les citoyens des pays soumis au visa, et ceux des pays admis sous conditions qui ne les remplissent pas, demandent un visa de visiteur : les frais de traitement sont de ${f.caVisa}, plus des frais de biométrie à part, et le délai se compte en semaines. La page ${h.a('ca', 'AVE Canada')} explique qui relève de quel cas.</p>`;
    },
  },
  de: {
    slug: 'eta-kanada-kosten',
    nav: 'eTA-Kosten',
    card: '7 kanadische Dollar pro Person für bis zu fünf Jahre, in Euro, für die ganze Familie.',
    title: 'eTA Kanada Kosten 2026: 7 CAD pro Person, bis zu 5 Jahre',
    description: 'Die eTA für Kanada kostet laut kanadischer Verordnung 7 CAD pro Person, auch für Kinder, und gilt bis zu fünf Jahre. Ihre Familie in Dollar und in Euro.',
    h1: 'eTA Kanada Kosten: die amtliche Gebühr für jeden Reisenden',
    intro: 'Wählen Sie Ihren Pass und die Zahl der Reisenden: der Rechner multipliziert die amtliche Gebühr und rechnet sie zum EZB-Kurs in Euro um.',
    resume: (h) => {
      const f = F(h);
      return `Die kanadische eTA kostet ${f.ca} pro Person, so legt es Artikel 294.1 der kanadischen Einwanderungsverordnung fest, rund ${f.caEur.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}. Sie ist mit Abstand die günstigste der hier vorgestellten Reisegenehmigungen und die, die am längsten gilt: bis zu ${f.caYears} Jahre oder bis zum Ablauf des Passes, für beliebig viele Flugreisen. Einen Kinder- oder Familientarif gibt es nicht: jeder Reisende, auch ein Baby, braucht eine eTA zum eigenen Pass und zahlt ${f.ca}, eine vierköpfige Familie also ${f.times(f.A.ca.fee, 4).m}. Bezahlt wird mit Karte auf canada.ca am Ende des Formulars, erstattet wird nichts, auch nicht bei Ablehnung oder wenn die Reise ausfällt. Wer keine eTA bekommen kann, beantragt ein Besuchervisum mit einer Bearbeitungsgebühr von ${f.caVisa} und zusätzlich biometrischen Daten. Jeder Preis über ${f.ca} pro Person für eine eTA enthält die Servicegebühr eines Vermittlers.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Warum ist die eTA so viel billiger als ESTA und britische ETA?', a: `Weil jedes Land seine Gebühr selbst gesetzlich festlegt. Die kanadischen ${f.ca} sind seit der Einführung der eTA gleich geblieben, während die britische ETA auf ${f.uk} und die ESTA auf ${f.us} gestiegen sind. Die eTA gilt zudem bis zu ${f.caYears} Jahre und kostet über fünf Jahre gerechnet nur einen Bruchteil der anderen.` },
        { q: 'Bekomme ich die eTA-Gebühr zurück, wenn die Reise ausfällt?', a: `Nein. Die ${f.ca} werden nach dem Absenden des Antrags nicht erstattet, ob die eTA genehmigt, abgelehnt oder nie genutzt wird. Eine genehmigte eTA bleibt aber bis zu ${f.caYears} Jahre gültig: eine abgesagte Reise macht sie nicht wertlos, Sie nutzen sie mit demselben Pass für einen späteren Besuch.` },
        { q: 'Eine Seite hat mir viel mehr als 7 CAD berechnet. War das Betrug?', a: 'Nicht unbedingt Betrug, aber nicht die Regierung. Manche private Seiten reichen das eTA-Formular für Sie ein und schlagen eine eigene Gebühr auf. Kanada bittet Reisende, nur über die amtliche Seite zu beantragen. Prüfen Sie mit der amtlichen Statusabfrage, ob eine eTA zu Ihrem Pass existiert, und wenden Sie sich wegen des Aufschlags an Ihre Kartenbank.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Die eTA-Gebühr nach Gruppengröße</h2>
<p>Die Gebühr ist für jeden Reisenden gleich. Die Tabelle multipliziert ${f.ca} und rechnet zum EZB-Referenzkurs vom ${f.fxDate} um.</p>
${h.table(['Reisende', 'Amtliche Gebühr', 'In Euro'], rows(h), `Gebühr nach Artikel 294.1 der kanadischen Verordnung, gelesen am ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Wofür Sie zahlen</h2>
<p>Ein Antrag pro Person und, wenn genehmigt, eine Genehmigung zum Pass, gültig bis zu ${f.caYears} Jahre oder bis zum Ablauf des Passes. Sie gilt für beliebig viele Flüge nach Kanada und Umstiege an kanadischen Flughäfen. Sie ersetzt keine Arbeits- oder Studienerlaubnis, die eigene Gebühren haben, und garantiert keine Einreise.</p>
<h2>Über fünf Jahre die günstigste Genehmigung</h2>
<p>Weil die eTA bis zu ${f.caYears} Jahre gilt, zahlt ein Vielreisender einmal ${f.ca}, wo dieselben fünf Jahre drei britische ETAs zu je ${f.uk} und drei ESTAs zu je ${f.us} bedeuten würden. Der Vergleich setzt voraus, dass der Pass gültig bleibt: ein neuer Pass heißt eine neue eTA.</p>
<h2>Wenn eine Seite mehr verlangt</h2>
<p>Das amtliche Formular steht auf ${h.src('caEta', 'canada.ca')}. Andere Seiten füllen dasselbe Formular aus und schlagen eine Servicegebühr auf die ${f.ca}; die Entscheidung trifft trotzdem die kanadische Einwanderungsbehörde, und sie kommt nicht schneller. Liegt Ihnen ein Preis vor, geben Sie ihn unten ein, um zu sehen, welcher Teil nicht an den Staat geht.</p>
<!--mini-->
<h2>Wenn Sie ein Visum brauchen</h2>
<p>Bürger visumpflichtiger Staaten und Bürger der Staaten mit Bedingungen, die diese nicht erfüllen, beantragen ein Besuchervisum: die Bearbeitungsgebühr beträgt ${f.caVisa}, dazu kommt eine eigene Gebühr für die Biometrie, und die Bearbeitung dauert Wochen. Die Seite ${h.a('ca', 'eTA Kanada')} erklärt, wer zu welcher Gruppe gehört.</p>`;
    },
  },
  nl: {
    slug: 'eta-canada-kosten',
    nav: 'eTA-kosten',
    card: '7 Canadese dollar per persoon voor maximaal vijf jaar, in euro, voor het hele gezin.',
    title: 'eTA Canada kosten 2026: 7 CAD per persoon, tot 5 jaar geldig',
    description: 'De eTA voor Canada kost volgens de Canadese verordening 7 CAD per reiziger, ook voor kinderen, en geldt tot vijf jaar. Totaal voor het gezin in dollar en euro.',
    h1: 'eTA Canada kosten: het officiële tarief voor elke reiziger',
    intro: 'Kies uw paspoort en het aantal reizigers: de rekenhulp vermenigvuldigt het officiële tarief en rekent het om in euro tegen de ECB-koers.',
    resume: (h) => {
      const f = F(h);
      return `De Canadese eTA kost ${f.ca} per persoon, zoals artikel 294.1 van de Canadese immigratieverordening bepaalt, ongeveer ${f.caEur.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}. Het is veruit de goedkoopste van de reisvergunningen op deze site, en de vergunning die het langst geldt: tot ${f.caYears} jaar of tot het paspoort verloopt, voor zoveel vliegreizen als u wilt. Een kinder- of gezinstarief bestaat niet: elke reiziger, ook een baby, heeft een eTA bij zijn eigen paspoort nodig en betaalt ${f.ca}, een gezin van vier dus ${f.times(f.A.ca.fee, 4).m}. U betaalt met een kaart op canada.ca aan het eind van het formulier, en er wordt niets terugbetaald, ook niet bij weigering of als de reis niet doorgaat. Wie geen eTA kan krijgen, vraagt een bezoekersvisum aan met behandelkosten van ${f.caVisa} en daarnaast biometrie. Elke prijs boven ${f.ca} per persoon voor een eTA bevat servicekosten van een tussenpersoon.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Waarom is de eTA zoveel goedkoper dan de ESTA en de Britse ETA?', a: `Omdat elk land zijn tarief zelf bij wet vastlegt. De Canadese ${f.ca} is sinds de invoering van de eTA gelijk gebleven, terwijl de Britse ETA naar ${f.uk} en de ESTA naar ${f.us} ging. De eTA geldt bovendien tot ${f.caYears} jaar en kost over vijf jaar gerekend maar een fractie van de andere.` },
        { q: 'Krijg ik het eTA-tarief terug als mijn reis niet doorgaat?', a: `Nee. De ${f.ca} wordt na het indienen niet terugbetaald, of de eTA nu wordt goedgekeurd, geweigerd of nooit gebruikt. Een goedgekeurde eTA blijft wel tot ${f.caYears} jaar geldig: een geannuleerde reis maakt hem niet waardeloos, u gebruikt hem met hetzelfde paspoort voor een later bezoek.` },
        { q: 'Een site rekende me veel meer dan 7 CAD. Was dat oplichting?', a: 'Niet per se oplichting, maar niet de overheid. Sommige private sites dienen het eTA-formulier voor u in en tellen er hun eigen kosten bij op. Canada vraagt reizigers alleen via de officiële site aan te vragen. Controleer met de officiële statuscheck of er een eTA bij uw paspoort hoort, en neem voor de toeslag contact op met uw bank.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Het eTA-tarief per grootte van het gezelschap</h2>
<p>Het tarief is voor elke reiziger gelijk. De tabel vermenigvuldigt ${f.ca} en rekent om tegen de ECB-referentiekoers van ${f.fxDate}.</p>
${h.table(['Reizigers', 'Officieel tarief', 'In euro'], rows(h), `Tarief volgens artikel 294.1 van de Canadese verordening, gelezen op ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Waarvoor u betaalt</h2>
<p>Eén aanvraag per persoon en, bij goedkeuring, een vergunning bij het paspoort, geldig tot ${f.caYears} jaar of tot het paspoort verloopt. Hij geldt voor zoveel vluchten naar Canada en overstappen op Canadese luchthavens als u wilt. Hij vervangt geen werk- of studievergunning, die hun eigen tarieven hebben, en garandeert geen toegang.</p>
<h2>Over vijf jaar de goedkoopste vergunning</h2>
<p>Omdat de eTA tot ${f.caYears} jaar geldt, betaalt een vaste reiziger één keer ${f.ca}, waar dezelfde vijf jaar drie Britse ETA’s van ${f.uk} en drie ESTA’s van ${f.us} zouden vragen. De vergelijking gaat uit van een paspoort dat geldig blijft: een nieuw paspoort betekent een nieuwe eTA.</p>
<h2>Als een site meer vraagt</h2>
<p>Het officiële formulier staat op ${h.src('caEta', 'canada.ca')}. Andere sites vullen hetzelfde formulier in en tellen servicekosten op bij de ${f.ca}; de beslissing neemt nog steeds de Canadese immigratiedienst, en die komt niet sneller. Hebt u een prijs voor u, vul die hieronder in om te zien welk deel niet naar de overheid gaat.</p>
<!--mini-->
<h2>Als u een visum nodig hebt</h2>
<p>Burgers van visumplichtige landen, en burgers van de landen met voorwaarden die daar niet aan voldoen, vragen een bezoekersvisum aan: de behandelkosten zijn ${f.caVisa}, plus een apart tarief voor biometrie, en de behandeling duurt weken. De pagina ${h.a('ca', 'eTA Canada')} legt uit wie bij welke groep hoort.</p>`;
    },
  },
});
