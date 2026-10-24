import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'uk-who',
  group: 'uk',
  order: 3,
  tool: { kind: 'checker', dests: ['GB'] },
  mini: { kind: 'validity', dest: 'GB' },
  related: ['uk-apply', 'uk-cost', 'uk-us', 'ca'],
  sources: ['govukEta', 'govukEtaList', 'govukVisaList', 'govukEuVisit'],
  en: {
    slug: 'do-i-need-an-eta-for-the-uk',
    nav: 'Who needs a UK ETA',
    card: 'Nationality lists, transit, residents of Ireland, dual citizens and the trips an ETA does not cover.',
    title: 'UK ETA requirement: who needs one, who is exempt in 2026',
    description: 'Do you need a UK ETA? Nationality lists, landside and airside transit, residents of Ireland, British and Irish dual citizens, and what an ETA does not allow.',
    h1: 'Do I need an ETA for the UK? The rules for your passport',
    intro: 'Enter your passport: the checker reads the Home Office lists. The sections below cover the cases a list cannot settle on its own.',
    resume: (h) => {
      const f = F(h);
      return `You need a UK ETA if your passport is on the Home Office ETA list, about ${f.ukEtaCount} nationalities including the United States, Canada, Australia, Japan and every EU country, and you are visiting the UK, Jersey, Guernsey or the Isle of Man for up to six months without a visa or other permission. You do not need one if you are a British or Irish citizen, including a dual citizen, if you already hold a UK visa or permission to live, work or study in the UK (settled or pre-settled status included), if you change planes airside without passing UK border control, or if you live in Ireland and travel from Ireland or the Crown Dependencies. Nationals of the ${f.ukVisaCount} countries on the visa list cannot use an ETA at all and apply for a visitor visa at ${f.ukVisa}. Age makes no difference: a baby on the ETA list needs its own ETA. The checker above applies these lists to your passport.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Do I need an ETA to change planes at Heathrow?', a: 'Only if you pass through UK border control. If you stay airside and connect to another international flight, you do not need an ETA. If you collect your bags, change airports or leave the terminal, you are landside and need one. GOV.UK advises checking with your airline if you are not sure how your connection works.' },
        { q: 'I live in Dublin with a US passport. Do I need a UK ETA?', a: 'Not if you travel to the UK from Ireland, Guernsey, Jersey or the Isle of Man. GOV.UK exempts residents of Ireland whose nationality would normally need an ETA, on that route only. From 16 years of age you must carry an original Irish document proving residence, such as an Irish Residence Permit, an Irish driving licence or a medical card.' },
        { q: 'Can a dual British citizen apply for an ETA on the other passport?', a: 'No. GOV.UK says dual citizens with British or Irish nationality cannot get an ETA. They prove their right to enter with a valid British or Irish passport, or with another passport carrying a certificate of entitlement to the right of abode. Someone born in the UK or to a British parent may be British without knowing it.' },
        { q: 'What can I not do in the UK with an ETA?', a: `An ETA is for visits: tourism, family, business meetings, short study, a permitted paid engagement. You cannot work for a UK company, claim benefits, live in the UK through repeated visits, or marry or give notice of marriage, which needs a Marriage Visitor visa. Any stay longer than ${h.P.ukStayMonths} months needs a visa too.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = A.uk.etaNationals.map((w) => [h.date(w.from), String(w.countries.length), w.countries.slice(0, 5).map((c) => h.land(c)).join(', ') + (w.countries.length > 5 ? ', …' : '')]);
      return `<h2>Your passport decides</h2>
<p>The Home Office publishes two lists. Nationalities on the ETA list visit without a visa but need an ETA. Nationalities on the visa list need a visitor visa. Everything else follows from the passport you travel on, not from where you live or where your flight leaves. The ETA list grew in waves:</p>
${h.table(['ETA required from', 'Nationalities', 'Examples'], rows, `Appendix ETA National List, read on ${f.dataDay}`, ['l', 'r', 'l'])}
<h2>Who does not need an ETA</h2>
<p>GOV.UK lists the exemptions: British and Irish citizens; anyone with a UK visa or with permission to live, work or study in the UK, including settled and pre-settled status and the right of abode; people with similar permission in Jersey, Guernsey or the Isle of Man; travellers with a British overseas territories citizen or British National (Overseas) passport; residents of Ireland arriving from the Common Travel Area; children on the France–UK school trip travel information form; and people waiting for a decision under the EU Settlement Scheme. If you fit one of these, do not pay for an ETA.</p>
<h2>Transit: landside or airside</h2>
<p>The rule is about border control, not about the airport. Connecting airside at Heathrow or Manchester, without collecting bags, needs no ETA. Passing through border control to reach another terminal, another airport or a hotel makes you landside: you need an ETA. Ask the airline how your ticket is routed if you are unsure.</p>
<h2>How long it lasts once granted</h2>
<p>An ETA lasts two years or until the passport expires, whichever comes first. If you already have one, enter its issue date, your passport expiry and your next arrival below to see whether it still covers the trip.</p>
<!--mini-->
<h2>When a visa is the better route</h2>
<p>An ETA does not guarantee entry. GOV.UK suggests that someone with a criminal record or a previous refusal of entry may prefer a Standard Visitor visa, at ${f.ukVisa}, which is assessed before travel. A visa is also needed for stays over six months, for work beyond the permitted activities, and for a wedding in the UK. Travellers going to the United States, Canada or Australia afterwards need separate authorisations; the ${h.a('esta', 'ESTA page')} and the ${h.a('ca', 'Canada eTA page')} explain them.</p>`;
    },
  },
  fr: {
    slug: 'eta-londres',
    nav: 'ETA pour Londres',
    card: 'Eurostar, transit, résidents en Irlande, binationaux : qui a besoin de l’ETA pour Londres.',
    title: 'ETA Londres : qui en a besoin, transit, Eurostar, exemptions',
    description: 'Faut-il une ETA pour un week-end à Londres ? Liste des nationalités, Eurostar, ferry, transit à Heathrow, résidents en Irlande, binationaux, voyages scolaires.',
    h1: 'ETA pour Londres : qui en a besoin et dans quels cas s’en passer',
    intro: 'Indiquez votre passeport : le vérificateur lit les listes du Home Office. Les sections ci-dessous traitent des cas qu’une liste ne tranche pas seule.',
    resume: (h) => {
      const f = F(h);
      return `Un week-end à Londres demande, pour un voyageur français, belge, suisse ou canadien, une ETA à ${f.uk} par personne, à obtenir avant de monter dans l’Eurostar, le ferry ou l’avion. La règle vaut pour environ ${f.ukEtaCount} nationalités, toute l’Union européenne comprise, et pour tout séjour de six mois au plus au Royaume-Uni, à Jersey, à Guernesey ou sur l’île de Man. N’en ont pas besoin les citoyens britanniques et irlandais, binationaux compris, les titulaires d’un visa ou d’un titre de séjour britannique (statut de résident permanent ou provisoire inclus), les voyageurs en correspondance côté piste qui ne passent pas le contrôle frontalier, les résidents d’Irlande venant d’Irlande ou des îles Anglo-Normandes, et les élèves inscrits sur le formulaire des voyages scolaires France–Royaume-Uni. Les ressortissants des ${f.ukVisaCount} pays soumis au visa ne peuvent pas utiliser l’ETA et demandent un visa visiteur à ${f.ukVisa}. L’âge ne change rien : un bébé a sa propre ETA.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Faut-il une ETA pour une correspondance à Heathrow ?', a: 'Seulement si vous passez le contrôle frontalier britannique. En correspondance côté piste, sans récupérer vos bagages, aucune ETA n’est nécessaire. Si vous changez de terminal en sortant, d’aéroport ou si vous dormez à l’hôtel, vous passez côté ville et il vous en faut une. GOV.UK conseille de vérifier auprès de la compagnie.' },
        { q: 'Je vis en Irlande avec un passeport français : ai-je besoin d’une ETA pour Belfast ?', a: 'Non, si vous entrez au Royaume-Uni depuis l’Irlande, Guernesey, Jersey ou l’île de Man. GOV.UK dispense les résidents d’Irlande dont la nationalité exige normalement une ETA, sur ce trajet seulement. À partir de 16 ans, il faut avoir sur soi un document irlandais original prouvant la résidence, par exemple un permis de conduire irlandais ou une carte médicale.' },
        { q: 'Un Franco-Britannique peut-il demander l’ETA avec son passeport français ?', a: 'Non. GOV.UK indique qu’un binational britannique ou irlandais ne peut pas obtenir d’ETA. Il prouve son droit d’entrée avec un passeport britannique ou irlandais valide, ou avec un autre passeport portant un certificat de droit de séjour permanent. Une personne née au Royaume-Uni ou d’un parent britannique peut être britannique sans le savoir.' },
        { q: 'Peut-on se marier à Londres avec une ETA ?', a: `Non. L’ETA couvre le tourisme, les visites familiales, les rendez-vous d’affaires et les courtes formations. Un mariage, un partenariat civil ou même le dépôt d’un avis de mariage exigent un visa de visiteur pour mariage. L’ETA ne permet pas non plus de travailler pour une entreprise britannique ni de séjourner plus de ${h.P.ukStayMonths} mois d’affilée.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>C’est le passeport qui décide</h2>
<p>Le Home Office publie deux listes : les nationalités qui voyagent sans visa mais avec une ETA, et celles qui ont besoin d’un visa visiteur. Tout le reste découle du passeport utilisé, pas du lieu de résidence ni de la gare de départ. Les Européens sont entrés dans le dispositif le ${f.ukWaveEU}, après les Américains, Canadiens et Australiens le ${f.ukWaveUS}.</p>
<h2>Eurostar, ferry, voiture : la même règle</h2>
<p>Le contrôle britannique a lieu avant le départ, à Paris-Nord, Lille, Bruxelles-Midi, Calais ou Coquelles. Le transporteur vérifie que chaque voyageur a une ETA reliée à son passeport, comme une compagnie aérienne. Pour un aller-retour en Eurostar le samedi, faites la demande en début de semaine : GOV.UK prévoit jusqu’à trois jours ouvrés.</p>
<h2>Qui n’en a pas besoin</h2>
<p>GOV.UK énumère les dispenses : citoyens britanniques et irlandais ; titulaires d’un visa britannique ou d’un titre pour vivre, travailler ou étudier au Royaume-Uni, statut de résident permanent ou provisoire compris ; titulaires d’un titre équivalent à Jersey, Guernesey ou sur l’île de Man ; passeports de citoyen des territoires britanniques d’outre-mer ou British National (Overseas) ; résidents d’Irlande arrivant de la zone de voyage commune ; enfants inscrits sur le formulaire des voyages scolaires France–Royaume-Uni ; personnes en attente d’une décision du EU Settlement Scheme.</p>
<h2>Votre ETA couvre-t-elle encore le voyage ?</h2>
<p>Une ETA vaut deux ans ou jusqu’à l’expiration du passeport. Si vous en avez déjà une, indiquez sa date de délivrance, la fin de votre passeport et la date du prochain voyage pour savoir si elle suffit.</p>
<!--mini-->
<h2>Quand un visa vaut mieux</h2>
<p>L’ETA ne garantit pas l’entrée. GOV.UK suggère à une personne ayant un casier judiciaire ou déjà refoulée de demander plutôt un visa visiteur standard, à ${f.ukVisa}, examiné avant le départ. Un visa est aussi nécessaire au-delà de six mois, pour travailler et pour se marier. Pour la suite d’un voyage outre-Atlantique, voir l’${h.a('ca', 'AVE canadienne')}. Le total pour la famille est sur la page ${h.a('uk-cost', 'prix de l’ETA')}.</p>`;
    },
  },
  de: {
    slug: 'einreise-england',
    nav: 'Einreise England',
    card: 'Pass, ETA, Transit, Wohnsitz in Irland, doppelte Staatsbürgerschaft: was für die Einreise gilt.',
    title: 'Einreise England 2026: ETA, Reisepass, Transit und Ausnahmen',
    description: 'Einreise nach England 2026: wer eine ETA braucht, warum der Personalausweis nicht reicht, Transit in Heathrow, Wohnsitz in Irland, Doppelpass und Visum.',
    h1: 'Einreise England: was Ihr Pass braucht und wann keine ETA nötig ist',
    intro: 'Geben Sie Ihren Pass ein: der Check liest die Listen des Home Office. Die Abschnitte unten behandeln die Fälle, die eine Liste allein nicht klärt.',
    resume: (h) => {
      const f = F(h);
      return `Für die Einreise nach England, Schottland, Wales oder Nordirland brauchen Deutsche, Österreicher und Schweizer seit dem ${f.ukWaveEU} zwei Dinge: einen gültigen Reisepass und eine elektronische Einreisegenehmigung (ETA) für ${f.uk} pro Person, die mit diesem Pass verknüpft ist. Der Personalausweis reicht nicht mehr, außer bei Status aus dem EU Settlement Scheme und wenigen anderen Fällen. Die ETA gilt für rund ${f.ukEtaCount} Staatsangehörigkeiten, darunter alle EU-Staaten, und für Aufenthalte bis zu sechs Monaten, auch auf Jersey, Guernsey und der Isle of Man. Keine ETA brauchen britische und irische Staatsangehörige, auch mit doppelter Staatsbürgerschaft, Inhaber eines britischen Visums oder Aufenthaltsrechts, Umsteiger, die die Grenzkontrolle nicht passieren, und Einwohner Irlands, die aus Irland einreisen. Angehörige der ${f.ukVisaCount} visumpflichtigen Staaten können keine ETA nutzen und beantragen ein Besuchervisum für ${f.ukVisa}. Das Alter spielt keine Rolle: auch ein Baby braucht Pass und ETA.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Brauche ich für das Umsteigen in London eine ETA?', a: 'Nur wenn Sie durch die britische Grenzkontrolle gehen. Wer im Transitbereich bleibt und zu einem anderen internationalen Flug wechselt, braucht keine ETA. Wer sein Gepäck holt, den Flughafen wechselt oder im Hotel übernachtet, reist ein und braucht eine. GOV.UK rät, im Zweifel bei der Fluggesellschaft nachzufragen.' },
        { q: 'Ich wohne in Irland. Brauche ich für Nordirland eine ETA?', a: 'Nein, wenn Sie aus Irland, Guernsey, Jersey oder der Isle of Man einreisen. GOV.UK befreit Einwohner Irlands, deren Staatsangehörigkeit sonst eine ETA bräuchte, auf diesem Weg. Ab 16 Jahren müssen Sie ein irisches Originaldokument als Wohnsitznachweis dabeihaben, zum Beispiel einen irischen Führerschein oder eine Irish Residence Permit.' },
        { q: 'Kann ein Deutsch-Brite die ETA mit dem deutschen Pass beantragen?', a: 'Nein. Laut GOV.UK können Doppelstaater mit britischer oder irischer Staatsangehörigkeit keine ETA erhalten. Sie weisen ihr Einreiserecht mit einem gültigen britischen oder irischen Pass nach, oder mit einem anderen Pass und einem Certificate of Entitlement zum Right of Abode. Wer in Großbritannien oder von einem britischen Elternteil geboren wurde, kann Brite sein, ohne es zu wissen.' },
        { q: 'Darf ich mit der ETA in England arbeiten oder heiraten?', a: `Nein. Die ETA gilt für Urlaub, Familienbesuche, Geschäftstermine und kurze Kurse. Arbeit für ein britisches Unternehmen, Sozialleistungen und Aufenthalte über ${h.P.ukStayMonths} Monate sind ausgeschlossen. Für eine Hochzeit, eine eingetragene Partnerschaft oder schon für die Anmeldung der Eheschließung braucht es ein Marriage Visitor Visa.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Reisepass statt Personalausweis</h2>
<p>Seit dem Brexit gelten für Deutsche dieselben Grenzregeln wie für andere Nicht-Briten. ${h.src('govukEuVisit', 'GOV.UK')} nennt nur wenige Fälle, in denen der Personalausweis noch reicht: Status aus dem EU Settlement Scheme, eine entsprechende Familienerlaubnis, eine Grenzgängererlaubnis oder S2-Behandlung. Alle anderen reisen mit Reisepass, und die ETA wird an genau diesen Pass gebunden. Ein Kinderreisepass genügt, solange er gültig ist.</p>
<h2>ETA oder Visum: der Pass entscheidet</h2>
<p>Das Home Office führt zwei Listen: Staaten, deren Bürger ohne Visum, aber mit ETA reisen, und Staaten, deren Bürger ein Besuchervisum brauchen. Maßgeblich ist der Pass, nicht der Wohnort und nicht der Abflughafen. Die Europäer sind seit dem ${f.ukWaveEU} dabei, die USA, Kanada und Australien seit dem ${f.ukWaveUS}.</p>
<h2>Wer keine ETA braucht</h2>
<p>GOV.UK zählt auf: britische und irische Staatsangehörige; Inhaber eines britischen Visums oder einer Erlaubnis zum Wohnen, Arbeiten oder Studieren, auch mit Settled oder Pre-settled Status; Inhaber einer solchen Erlaubnis für Jersey, Guernsey oder die Isle of Man; Reisende mit Pass eines britischen Überseegebiets oder British National (Overseas); Einwohner Irlands, die aus dem gemeinsamen Reisegebiet kommen; Personen, über deren Antrag im EU Settlement Scheme noch nicht entschieden ist.</p>
<h2>Gilt Ihre ETA noch?</h2>
<p>Eine ETA gilt zwei Jahre oder bis zum Ablauf des Passes. Haben Sie schon eine, geben Sie Ausstellungsdatum, Ablauf des Passes und die nächste Ankunft ein: der Rechner zeigt, ob sie die Reise abdeckt.</p>
<!--mini-->
<h2>Wann ein Visum besser ist</h2>
<p>Die ETA garantiert keine Einreise. GOV.UK empfiehlt Personen mit Vorstrafen oder einer früheren Einreiseverweigerung eher ein Standard-Besuchervisum für ${f.ukVisa}, das vor der Reise geprüft wird. Ein Visum braucht auch, wer länger als sechs Monate bleibt, arbeitet oder in Großbritannien heiratet. Den Antrag Schritt für Schritt erklärt die Seite ${h.a('uk-apply', 'ETA Großbritannien')}, die Kosten für die Familie die Seite ${h.a('uk-cost', 'ETA England Kosten')}.</p>`;
    },
  },
});
