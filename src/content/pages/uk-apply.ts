import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'uk-apply',
  group: 'uk',
  order: 2,
  tool: { kind: 'checker', dests: ['GB'] },
  mini: { kind: 'applyby', dest: 'GB' },
  related: ['uk-cost', 'uk-time', 'uk-who', 'esta-apply'],
  sources: ['govukEtaApply', 'govukEta', 'govukEtaList', 'govukEuVisit'],
  en: {
    slug: 'uk-eta-application',
    nav: 'Apply for a UK ETA',
    card: 'What you need, app or website, applying for your family, and what happens after you pay.',
    title: 'UK ETA application: what you need and the official steps',
    description: 'How to apply for a UK ETA on GOV.UK or in the official app: passport, email, photo, payment, applying for children, the 16-digit reference and when to apply.',
    h1: 'UK ETA application: the official steps, from passport scan to email',
    intro: 'Check first that your passport needs an ETA rather than a visa, then follow the steps below on the official service only.',
    resume: (h) => {
      const f = F(h);
      return `To apply for a UK ETA you need three things: the passport you will travel with, an email address and a way to pay the ${f.uk} fee (credit or debit card, Apple Pay or Google Pay). You apply either in the official UK ETA app, which scans the passport and your face with the phone camera, or online on GOV.UK, where you upload a photo of the passport and a photo of the face that follows the digital photo rules. Each traveller, babies included, needs their own application; in the app you can apply for someone who is with you, online for someone who is not. After payment you usually get a decision by email within a day, sometimes up to three working days, with a 16-digit ETA reference. You must not travel before that email arrives. The ETA is then linked to your passport, so you only show the passport at the airport, and it lasts two years or until the passport expires.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Should I use the UK ETA app or the GOV.UK website?', a: 'Both lead to the same decision at the same price. The app is usually quicker because it reads the chip in your passport and takes the photo of your face itself. Use the website if your phone cannot run the app, or if you are applying for someone who is not with you, since the app only handles people who can be scanned on the spot.' },
        { q: 'What photo does the ETA application need?', a: 'A photo of the face of the person applying, plus a photo of the passport page when you apply online. GOV.UK asks that the face photo follow its rules for digital photos: plain background, no hat or sunglasses, neutral expression, nobody else in the picture. A photo that does not meet the rules can delay the application or get it rejected, which means paying again.' },
        { q: 'I made a mistake in my ETA form. What now?', a: `GOV.UK says that if you need to change details in your application, you must apply again. That means a new form and a new ${f.uk} fee, because no refund is given after you apply. Check the passport number, the spelling of your name and your email address before you pay: the reference arrives at that address.` },
        { q: 'How do I prove I have an ETA at the airport?', a: 'You do not need to print or show anything except your passport. The ETA is linked electronically to the passport number you applied with, and the airline and Border Force check it from there. Keep the email with your 16-digit reference anyway, and use the official online check if you want to confirm that your ETA exists and when it expires.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Before you start: ETA or visa?</h2>
<p>The ETA is only for nationalities on the Home Office list. Your passport decides, not where you live: a US citizen living in Berlin applies for an ETA, while a resident of Germany with a passport from a visa country needs a visitor visa at ${f.ukVisa}. Use the checker above, or the ${h.src('govukEtaList', 'Appendix ETA National List')} itself. British and Irish citizens, and people who already have permission to live, work or study in the UK, do not apply.</p>
<h2>Step 1: get the passport and an email ready</h2>
<p>Use the passport you will travel with. If you have two nationalities, pick one passport and travel on it, because the ETA follows the passport number. Give an email address you can read before departure: the decision and the reference number are sent there and nowhere else.</p>
<h2>Step 2: choose the app or the website</h2>
<p>In the UK ETA app, published by the Home Office on the App Store and Google Play, you scan the passport and then your face with the phone camera. On the ${h.src('govukEtaApply', 'GOV.UK form')}, you upload a photo of the passport and a photo of the face. Either way the fee is ${f.uk} and the decision is the same.</p>
<h2>Step 3: answer the questions</h2>
<p>The form asks for contact details, your job, and questions about criminal convictions and previous immigration problems. Answer them truthfully. GOV.UK points out that someone with a criminal record or a previous refusal of entry may prefer to apply for a Standard Visitor visa instead.</p>
<h2>Step 4: pay and wait for the email</h2>
<p>Payment is by credit or debit card, Apple Pay or Google Pay. The fee is not refunded once you have applied. Most decisions arrive within a day, but GOV.UK allows up to three working days, so do not leave it to the evening before a Monday flight. Enter your departure date below to see the last comfortable day to apply.</p>
<!--mini-->
<p>If nothing has arrived after three working days, check your spam folder before contacting UK Visas and Immigration through its webchat; the phone line does not handle ETA questions. When you apply for several people, their decisions can arrive at different times.</p>
<h2>Applying for your family or a group</h2>
<p>One application per person, children and babies included, ${f.uk} each. On the app you can apply for someone standing next to you, because their passport and face are scanned on the spot. For a relative who is elsewhere, use the website with a photo of their passport and of their face. Agencies and schools organising a trip follow the same rule: each traveller needs an ETA linked to their own passport.</p>
<h2>After the decision</h2>
<p>The email gives a 16-digit ETA reference. Nothing else is needed: you show only your passport when you board and at the border. The ETA lasts two years or until the passport expires, whichever comes first, for any number of visits of up to six months. It also covers Jersey, Guernsey and the Isle of Man. A new passport means a new application. The ${h.a('uk-cost', 'cost page')} works out the total for a group, and the ${h.a('uk-time', 'processing time page')} explains the wait.</p>`;
    },
  },
  fr: {
    slug: 'eta-angleterre',
    nav: 'ETA Angleterre',
    card: 'Les documents, l’application ou le site, la demande pour la famille, et ce qui se passe après.',
    title: 'ETA Angleterre : comment faire la demande officielle en 2026',
    description: 'Demander l’ETA pour l’Angleterre sur GOV.UK ou dans l’application officielle : passeport, courriel, photo, paiement, enfants, numéro à 16 chiffres, délai.',
    h1: 'ETA pour l’Angleterre : la demande officielle, étape par étape',
    intro: 'Vérifiez d’abord que votre passeport relève de l’ETA et non du visa, puis suivez les étapes ci-dessous, sur le service officiel uniquement.',
    resume: (h) => {
      const f = F(h);
      return `Pour aller en Angleterre, en Écosse, au pays de Galles ou en Irlande du Nord, un Français, un Belge ou un Suisse a besoin depuis le ${f.ukWaveEU} d’une autorisation de voyage électronique (ETA), à demander avant le départ. Il faut trois choses : le passeport avec lequel vous voyagerez, une adresse électronique et un moyen de payer les ${f.uk} (carte bancaire, Apple Pay ou Google Pay). La demande se fait soit dans l’application officielle UK ETA, qui lit le passeport et photographie le visage, soit en ligne sur GOV.UK avec une photo du passeport et une photo du visage. Chaque voyageur, bébé compris, a sa propre demande. La décision arrive en général par courriel en un jour, parfois en trois jours ouvrés, avec un numéro d’ETA à 16 chiffres, et il ne faut pas partir avant. L’ETA est alors reliée au passeport : à l’aéroport, au port ou à la gare de l’Eurostar, vous ne montrez que lui. Elle vaut deux ans, ou jusqu’à la fin du passeport.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Faut-il une ETA pour prendre l’Eurostar ou le ferry vers l’Angleterre ?', a: `Oui. L’ETA ne dépend pas du moyen de transport : avion, Eurostar, ferry ou voiture par le tunnel, tout voyageur français qui entre au Royaume-Uni en a besoin depuis le ${f.ukWaveEU}. Le contrôle britannique a lieu avant l’embarquement, à Paris-Nord, à Calais ou à Coquelles, et le transporteur vérifie l’ETA comme une compagnie aérienne.` },
        { q: 'La carte d’identité suffit-elle pour l’ETA britannique ?', a: 'Non. L’ETA se demande avec un passeport et reste liée au numéro de ce passeport. La carte nationale d’identité n’est plus acceptée pour entrer au Royaume-Uni, sauf pour les titulaires d’un statut du EU Settlement Scheme, les travailleurs frontaliers et quelques autres cas que GOV.UK énumère. Prévoyez donc un passeport en cours de validité pour chaque membre de la famille, enfants compris.' },
        { q: 'Que faire si je me suis trompé dans le formulaire ETA ?', a: `GOV.UK indique qu’il faut refaire une demande pour modifier une information. Cela signifie un nouveau formulaire et de nouveau ${f.uk}, car rien n’est remboursé une fois la demande déposée. Relisez le numéro de passeport, l’orthographe du nom et l’adresse électronique avant de payer : le numéro d’ETA est envoyé à cette adresse.` },
        { q: 'Un voyage scolaire en Angleterre demande-t-il une ETA par élève ?', a: 'En principe oui, chaque élève a besoin de sa propre autorisation. GOV.UK prévoit cependant une exception : les enfants qui voyagent avec le formulaire d’information des voyages scolaires France–Royaume-Uni n’ont pas besoin d’ETA. Renseignez-vous auprès de l’établissement qui organise le séjour pour savoir quel document il utilise.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Avant de commencer : ETA ou visa ?</h2>
<p>L’ETA ne concerne que les nationalités de la liste du Home Office, dont tous les pays de l’Union européenne, la Suisse et le Canada. C’est le passeport qui compte, pas le pays où vous vivez : un Français installé à Dakar demande une ETA, un résident français titulaire d’un passeport d’un pays soumis au visa doit demander un visa visiteur à ${f.ukVisa}. Le vérificateur ci-dessus applique la ${h.src('govukEtaList', 'liste officielle')}. Les citoyens britanniques et irlandais, et les personnes qui ont déjà un titre pour vivre, travailler ou étudier au Royaume-Uni (statut de résident permanent ou provisoire compris), n’en ont pas besoin.</p>
<h2>Étape 1 : préparer le passeport et l’adresse électronique</h2>
<p>Utilisez le passeport avec lequel vous voyagerez. Si vous avez deux nationalités, choisissez-en un et voyagez avec lui : l’ETA suit le numéro du passeport. Donnez une adresse que vous lirez avant le départ, car la décision et le numéro y sont envoyés.</p>
<h2>Étape 2 : l’application ou le site</h2>
<p>Dans l’application UK ETA, publiée par le Home Office sur l’App Store et Google Play, vous scannez le passeport puis votre visage avec l’appareil photo du téléphone. Sur le ${h.src('govukEtaApply', 'formulaire GOV.UK')}, en anglais, vous déposez une photo du passeport et une photo du visage. Le prix est de ${f.uk} dans les deux cas.</p>
<h2>Étape 3 : répondre aux questions</h2>
<p>Le formulaire demande vos coordonnées, votre profession, et pose des questions sur les condamnations pénales et d’éventuels problèmes d’immigration passés. Répondez avec exactitude. GOV.UK précise qu’une personne ayant un casier judiciaire ou déjà refoulée peut préférer demander un visa visiteur standard.</p>
<h2>Étape 4 : payer et attendre le courriel</h2>
<p>Le paiement se fait par carte bancaire, Apple Pay ou Google Pay et n’est pas remboursable. La plupart des réponses arrivent en un jour, mais GOV.UK prévoit jusqu’à trois jours ouvrés : ne faites pas la demande la veille d’un départ le lundi. Saisissez votre date de départ ci-dessous pour connaître le dernier jour confortable.</p>
<!--mini-->
<p>Sans réponse après trois jours ouvrés, regardez dans les courriels indésirables avant de contacter UK Visas and Immigration par sa messagerie en ligne ; le téléphone ne traite pas les questions sur l’ETA. Pour plusieurs personnes, les décisions peuvent arriver à des moments différents.</p>
<h2>Pour la famille ou un groupe</h2>
<p>Une demande par personne, enfants et bébés compris, ${f.uk} chacune. Dans l’application, vous pouvez faire la demande d’une personne présente à côté de vous ; pour un proche absent, passez par le site avec une photo de son passeport et de son visage. Le total pour la famille, en livres et en euros, est sur la page ${h.a('uk-cost', 'prix de l’ETA')}.</p>
<h2>Après la décision</h2>
<p>Le courriel donne un numéro d’ETA à 16 chiffres. Rien d’autre à présenter que le passeport, à l’embarquement comme à la frontière. L’ETA vaut deux ans ou jusqu’à la fin du passeport, pour autant de séjours de six mois au plus que vous voulez, y compris à Jersey, Guernesey et sur l’île de Man. Un nouveau passeport impose une nouvelle demande.</p>`;
    },
  },
  de: {
    slug: 'eta-grossbritannien',
    nav: 'ETA Großbritannien',
    card: 'Was Sie brauchen, App oder Website, Antrag für die Familie und was nach der Zahlung passiert.',
    title: 'ETA Großbritannien beantragen: Schritte und Unterlagen 2026',
    description: 'So beantragen Sie die ETA für Großbritannien auf GOV.UK oder in der amtlichen App: Pass, E-Mail, Foto, Zahlung, Kinder, die 16-stellige Nummer und Frist.',
    h1: 'ETA Großbritannien: der amtliche Antrag Schritt für Schritt',
    intro: 'Prüfen Sie zuerst, ob Ihr Pass eine ETA statt eines Visums braucht, und folgen Sie dann den Schritten unten, nur auf dem amtlichen Dienst.',
    resume: (h) => {
      const f = F(h);
      return `Deutsche, Österreicher und Schweizer brauchen seit dem ${f.ukWaveEU} für jede Reise nach England, Schottland, Wales oder Nordirland eine elektronische Einreisegenehmigung (ETA), die vor der Abreise beantragt wird. Dafür sind drei Dinge nötig: der Reisepass, mit dem Sie reisen, eine E-Mail-Adresse und ein Zahlungsmittel für die ${f.uk} (Kredit- oder Debitkarte, Apple Pay oder Google Pay). Beantragt wird entweder in der amtlichen App UK ETA, die den Pass und Ihr Gesicht mit der Handykamera erfasst, oder online auf GOV.UK mit einem Foto des Passes und einem Gesichtsfoto. Jeder Reisende, auch ein Baby, braucht einen eigenen Antrag. Die Entscheidung kommt meist innerhalb eines Tages per E-Mail, manchmal erst nach drei Werktagen, mit einer 16-stelligen ETA-Nummer; vorher dürfen Sie nicht reisen. Danach ist die ETA mit dem Pass verknüpft: am Flughafen zeigen Sie nur ihn vor. Sie gilt zwei Jahre oder bis zum Ablauf des Passes. Der Personalausweis reicht für die Einreise nicht.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Kann ich die ETA mit dem Personalausweis beantragen?', a: 'Nein. Die ETA wird mit einem Reisepass beantragt und an dessen Nummer gebunden. Großbritannien akzeptiert den Personalausweis für die Einreise nicht mehr, außer bei Status aus dem EU Settlement Scheme, für Grenzgänger und einige weitere Fälle, die GOV.UK aufzählt. Jedes Familienmitglied, auch ein Kind, braucht also einen gültigen Reisepass und eine eigene ETA.' },
        { q: 'Gilt die ETA auch für die Fähre und den Eurotunnel?', a: `Ja. Die ETA hängt nicht vom Verkehrsmittel ab: wer mit dem Auto über Calais, mit der Fähre aus Rotterdam oder Hoek van Holland oder mit dem Zug durch den Tunnel einreist, braucht sie genauso wie im Flugzeug. Die Reederei oder Bahn prüft sie vor dem Einsteigen, für jede Person ${f.uk}.` },
        { q: 'Was mache ich bei einem Tippfehler im ETA-Antrag?', a: `GOV.UK schreibt, dass Sie für eine Änderung einen neuen Antrag stellen müssen. Das heißt ein neues Formular und erneut ${f.uk}, denn nach dem Antrag wird nichts erstattet. Prüfen Sie Passnummer, Schreibweise des Namens und E-Mail-Adresse vor dem Bezahlen: an diese Adresse geht die ETA-Nummer.` },
        { q: 'Welche Fragen stellt das ETA-Formular?', a: 'Neben Passdaten und Kontaktangaben fragt das Formular nach Ihrem Beruf, nach Vorstrafen und nach früheren Problemen mit der Einwanderung, etwa einer Einreiseverweigerung. Antworten Sie vollständig und wahrheitsgemäß. Wer vorbestraft ist oder schon einmal abgewiesen wurde, kann laut GOV.UK besser gleich ein Standard-Besuchervisum beantragen.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Vorab: ETA oder Visum?</h2>
<p>Die ETA gibt es nur für Staaten auf der Liste des Home Office, darunter alle EU-Staaten, die Schweiz, die USA und Kanada. Maßgeblich ist der Pass, nicht der Wohnort: wer in München lebt und einen Pass eines visumpflichtigen Staates hat, braucht ein Besuchervisum für ${f.ukVisa}. Der Check oben wendet die ${h.src('govukEtaList', 'amtliche Liste')} an. Britische und irische Staatsangehörige und wer schon eine Aufenthaltserlaubnis für das Vereinigte Königreich hat (auch Settled oder Pre-settled Status), brauchen keine.</p>
<h2>Schritt 1: Pass und E-Mail bereitlegen</h2>
<p>Nehmen Sie den Pass, mit dem Sie reisen. Mit zwei Staatsangehörigkeiten wählen Sie einen Pass und reisen mit genau diesem, denn die ETA folgt der Passnummer. Geben Sie eine Adresse an, die Sie vor der Abreise lesen: Entscheidung und Nummer kommen nur dorthin.</p>
<h2>Schritt 2: App oder Website</h2>
<p>In der App UK ETA, die das Home Office im App Store und bei Google Play anbietet, scannen Sie den Pass und danach Ihr Gesicht. Im ${h.src('govukEtaApply', 'GOV.UK-Formular')} (englisch) laden Sie ein Foto des Passes und ein Gesichtsfoto hoch. Die Gebühr ist in beiden Fällen ${f.uk}.</p>
<h2>Schritt 3: die Fragen beantworten</h2>
<p>Gefragt werden Kontaktdaten, Beruf, Vorstrafen und frühere Probleme mit der Einwanderung. Antworten Sie genau; eine falsche Angabe kann später zur Einreiseverweigerung führen.</p>
<h2>Schritt 4: bezahlen und auf die E-Mail warten</h2>
<p>Bezahlt wird mit Kredit- oder Debitkarte, Apple Pay oder Google Pay; erstattet wird nichts. Die meisten Entscheidungen kommen innerhalb eines Tages, GOV.UK rechnet aber mit bis zu drei Werktagen: stellen Sie den Antrag also nicht am Freitagabend vor einem Flug am Montag. Geben Sie unten Ihr Abreisedatum ein, um den letzten bequemen Antragstag zu sehen.</p>
<!--mini-->
<p>Kommt nach drei Werktagen nichts, sehen Sie im Spam-Ordner nach, bevor Sie UK Visas and Immigration über den Webchat kontaktieren; telefonisch gibt es keine Auskunft zur ETA. Bei mehreren Personen können die Entscheidungen zu verschiedenen Zeiten eintreffen.</p>
<h2>Für Familie und Gruppen</h2>
<p>Ein Antrag pro Person, auch für Kinder und Babys, je ${f.uk}. In der App beantragen Sie für jemanden, der neben Ihnen steht; für Angehörige, die nicht dabei sind, nutzen Sie die Website mit einem Foto ihres Passes und ihres Gesichts. Den Betrag für die ganze Familie in Pfund und Euro zeigt die Seite ${h.a('uk-cost', 'ETA England Kosten')}.</p>
<h2>Nach der Entscheidung</h2>
<p>Die E-Mail enthält eine 16-stellige ETA-Nummer. Mehr brauchen Sie nicht: beim Einsteigen und an der Grenze zeigen Sie nur den Pass. Die ETA gilt zwei Jahre oder bis zum Ablauf des Passes, für beliebig viele Aufenthalte von bis zu sechs Monaten, auch auf Jersey, Guernsey und der Isle of Man. Ein neuer Pass bedeutet einen neuen Antrag.</p>`;
    },
  },
  nl: {
    slug: 'eta-engeland',
    nav: 'ETA Engeland',
    card: 'Wat u nodig hebt, app of website, aanvragen voor het gezin en wat er na de betaling gebeurt.',
    title: 'ETA Engeland aanvragen: de officiële stappen in 2026',
    description: 'Zo vraagt u de ETA voor Engeland aan op GOV.UK of in de officiële app: paspoort, e-mail, foto, betaling, kinderen, het nummer van 16 cijfers en de termijn.',
    h1: 'ETA Engeland: de officiële aanvraag stap voor stap',
    intro: 'Controleer eerst of uw paspoort een ETA nodig heeft in plaats van een visum, en volg dan de stappen hieronder, alleen op de officiële dienst.',
    resume: (h) => {
      const f = F(h);
      return `Nederlanders en Belgen hebben sinds ${f.ukWaveEU} voor elke reis naar Engeland, Schotland, Wales of Noord-Ierland een elektronische reisvergunning (ETA) nodig, aan te vragen vóór vertrek. Daarvoor zijn drie dingen nodig: het paspoort waarmee u reist, een e-mailadres en een betaalmiddel voor de ${f.uk} (creditcard, debitcard, Apple Pay of Google Pay). U vraagt aan in de officiële app UK ETA, die het paspoort en uw gezicht met de camera van de telefoon vastlegt, of online op GOV.UK met een foto van het paspoort en een foto van uw gezicht. Elke reiziger, ook een baby, heeft een eigen aanvraag. De beslissing komt meestal binnen een dag per e-mail, soms pas na drie werkdagen, met een ETA-nummer van 16 cijfers; vóór die e-mail mag u niet reizen. Daarna is de ETA aan het paspoort gekoppeld: op de luchthaven of de veerboot toont u alleen dat. Hij geldt twee jaar of tot het paspoort verloopt. De identiteitskaart volstaat niet voor de reis.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Kan ik de ETA aanvragen met mijn identiteitskaart?', a: 'Nee. De ETA wordt aangevraagd met een paspoort en blijft aan het nummer van dat paspoort gekoppeld. Het Verenigd Koninkrijk aanvaardt de identiteitskaart niet meer om binnen te komen, behalve voor wie status heeft onder het EU Settlement Scheme, grensarbeiders en enkele andere gevallen die GOV.UK opsomt. Elk gezinslid, ook een kind, heeft dus een geldig paspoort en een eigen ETA nodig.' },
        { q: 'Heb ik een ETA nodig voor de boot van Hoek van Holland naar Harwich?', a: `Ja. De ETA hangt niet af van het vervoermiddel: met de veerboot vanuit Hoek van Holland, Rotterdam of IJmuiden, met de auto via Calais of met de trein door de tunnel hebt u hem net zo goed nodig als in het vliegtuig. De rederij controleert hem vóór het inschepen, ${f.uk} per persoon.` },
        { q: 'Ik heb een fout gemaakt in het ETA-formulier. Wat nu?', a: `Volgens GOV.UK moet u opnieuw aanvragen om een gegeven te wijzigen. Dat betekent een nieuw formulier en opnieuw ${f.uk}, want na de aanvraag wordt niets terugbetaald. Controleer paspoortnummer, spelling van uw naam en e-mailadres vóór u betaalt: het ETA-nummer gaat naar dat adres.` },
        { q: 'Welke vragen stelt het ETA-formulier?', a: 'Naast paspoort- en contactgegevens vraagt het formulier naar uw beroep, naar strafrechtelijke veroordelingen en naar eerdere problemen met immigratie, zoals een geweigerde toegang. Antwoord naar waarheid. Wie een strafblad heeft of al eens is teruggestuurd, vraagt volgens GOV.UK beter meteen een standaard bezoekersvisum aan.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Vooraf: ETA of visum?</h2>
<p>De ETA bestaat alleen voor de landen op de lijst van het Home Office, waaronder alle EU-landen, Zwitserland, de Verenigde Staten en Canada. Het paspoort beslist, niet de woonplaats: wie in Utrecht woont met een paspoort van een visumplichtig land, heeft een bezoekersvisum van ${f.ukVisa} nodig. De check hierboven past de ${h.src('govukEtaList', 'officiële lijst')} toe. Britse en Ierse staatsburgers en wie al een verblijfsvergunning voor het Verenigd Koninkrijk heeft (ook settled of pre-settled status), hebben er geen nodig.</p>
<h2>Stap 1: paspoort en e-mail klaarleggen</h2>
<p>Gebruik het paspoort waarmee u reist. Met twee nationaliteiten kiest u één paspoort en reist u daarmee, want de ETA volgt het paspoortnummer. Geef een adres op dat u vóór vertrek leest: de beslissing en het nummer komen alleen daar.</p>
<h2>Stap 2: app of website</h2>
<p>In de app UK ETA, die het Home Office in de App Store en Google Play aanbiedt, scant u het paspoort en daarna uw gezicht. Op het ${h.src('govukEtaApply', 'GOV.UK-formulier')} (Engels) uploadt u een foto van het paspoort en een foto van uw gezicht. Het tarief is in beide gevallen ${f.uk}.</p>
<h2>Stap 3: de vragen beantwoorden</h2>
<p>Gevraagd worden contactgegevens, beroep, veroordelingen en eerdere problemen met immigratie. Antwoord nauwkeurig; een onjuist antwoord kan later tot weigering aan de grens leiden.</p>
<h2>Stap 4: betalen en op de e-mail wachten</h2>
<p>Betalen gaat met creditcard, debitcard, Apple Pay of Google Pay; er wordt niets terugbetaald. De meeste beslissingen komen binnen een dag, maar GOV.UK rekent op maximaal drie werkdagen: vraag dus niet op vrijdagavond aan voor een vlucht op maandag. Vul hieronder uw vertrekdatum in om de laatste rustige dag voor de aanvraag te zien.</p>
<!--mini-->
<p>Komt er na drie werkdagen niets, kijk dan in de map met ongewenste e-mail voordat u UK Visas and Immigration via de webchat benadert; telefonisch worden geen vragen over de ETA behandeld. Bij meerdere personen kunnen de beslissingen op verschillende momenten binnenkomen.</p>
<h2>Voor het gezin of een groep</h2>
<p>Eén aanvraag per persoon, ook voor kinderen en baby’s, ${f.uk} per aanvraag. In de app vraagt u aan voor iemand die naast u staat; voor familie die er niet bij is, gebruikt u de website met een foto van hun paspoort en hun gezicht. Het totaal voor het gezin in ponden en euro staat op de pagina ${h.a('uk-cost', 'ETA Engeland kosten')}.</p>
<h2>Na de beslissing</h2>
<p>De e-mail bevat een ETA-nummer van 16 cijfers. Meer is niet nodig: bij het instappen en aan de grens toont u alleen het paspoort. De ETA geldt twee jaar of tot het paspoort verloopt, voor zoveel verblijven van hoogstens zes maanden als u wilt, ook op Jersey, Guernsey en het eiland Man. Een nieuw paspoort betekent een nieuwe aanvraag.</p>`;
    },
  },
});
