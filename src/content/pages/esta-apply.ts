import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'esta-apply',
  group: 'us',
  order: 3,
  tool: { kind: 'checker', dests: ['US'] },
  mini: { kind: 'applyby', dest: 'US' },
  related: ['esta', 'esta-cost', 'esta-status', 'uk-apply'],
  sources: ['estaApply', 'cbpEsta', 'dhsVwpReq', 'ecfr2175'],
  en: {
    slug: 'esta-application',
    nav: 'ESTA application',
    card: 'What you need, the steps on the CBP site, group applications and when to apply.',
    title: 'ESTA application: the official steps on esta.cbp.dhs.gov',
    description: 'How to apply for an ESTA on the official CBP site: e-passport, email, payment card, eligibility questions, group applications and why to apply before booking.',
    h1: 'ESTA application: how to apply on the official CBP site',
    intro: 'Check first that your passport is in the Visa Waiver Program, then follow the steps on esta.cbp.dhs.gov only.',
    resume: (h) => {
      const f = F(h);
      return `An ESTA application is made online on esta.cbp.dhs.gov, the site of US Customs and Border Protection, and takes one form per traveller. You need an e-passport from one of the ${f.vwpCount} Visa Waiver Program countries, with the chip symbol on its cover, an email address, and a card to pay ${f.us}. The form is in English, though the site offers translated instructions; it asks for your passport details, contact information, employment, and a series of yes-or-no eligibility questions on health, criminal history, previous refusals and travel to certain countries. CBP recommends applying as soon as you begin preparing your trip, and before buying tickets, because an approved ESTA is required before you board a plane or ship to the United States. Federal rules require a new application if you get a new passport, change your name, gender or citizenship, or if an answer to an eligibility question changes. A family can apply together through a group application, each person still paying the full fee.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'How do I know if my passport is an e-passport?', a: 'Look at the cover: an e-passport carries the international chip symbol, a small rectangle with a circle in the middle. DHS requires an e-passport for every Visa Waiver Program traveller. Most European passports issued in the last fifteen years have one, but temporary and emergency passports often do not, and their holders need a visa instead.' },
        { q: 'Can I fill in an ESTA for my whole family at once?', a: `Yes. The official site offers a group application, in which one person enters the details of every traveller and pays for all of them in one go. Each person still has an individual application, an individual decision and the full fee of ${f.us}, including babies. Write down each application number so you can check them later.` },
        { q: 'What happens if I answer yes to an ESTA eligibility question?', a: 'The application is not automatically refused, but a yes answer to questions about serious illness, arrests, previous visa refusals or travel to designated countries often leads CBP to deny the ESTA. In that case you apply for a visa at a US embassy or consulate. Never answer no to make the form go through: a false answer can bar you from future travel.' },
        { q: 'Do I need a US address to apply for an ESTA?', a: 'You are asked where you will stay, but you can apply before booking a hotel, which is what CBP recommends. If your plans are not fixed yet, give the information you have. What matters is that the passport details and eligibility answers are correct, because those are what CBP checks against its databases.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Before you start</h2>
<p>Make sure every traveller has an e-passport valid for the trip; the ${h.src('dhsVwpReq', 'DHS passport requirements')} explain the chip rule. Check that nobody in the group has been to Iraq, Syria or a designated state sponsor of terrorism since ${f.usIneligible}, which excludes them from the ESTA by law. Have a payment card ready and an email address you read.</p>
<h2>Step 1: open the official site</h2>
<p>Type ${h.src('estaApply', 'esta.cbp.dhs.gov')} yourself rather than following an advertisement. The address ends in .dhs.gov. Choose an individual application, or a group application if you are applying for several people.</p>
<h2>Step 2: passport and personal details</h2>
<p>Enter the details exactly as they appear on the passport, including the issuing country and the expiry date. A typing error in the passport number makes the ESTA useless at check-in, and the only fix is a new application at the full fee.</p>
<h2>Step 3: the eligibility questions</h2>
<p>The yes-or-no questions cover health, arrests and convictions, drugs, terrorism, fraud, previous visa refusals or overstays, and travel to certain countries. Answer them truthfully for each person in the group. A yes does not always mean a refusal, but it often does.</p>
<h2>Step 4: pay and keep the number</h2>
<p>Pay ${f.us} per application. You receive an application number: write it down, because you need it, with the passport number and date of birth, to check the status later on the same site.</p>
<h2>When to apply</h2>
<p>${h.src('cbpEsta', 'CBP')} says applications may be submitted at any time before travel and recommends applying as soon as you begin preparing your plans, or before buying tickets. It publishes no processing time, so the calculator below gives no date for the United States, only that advice; compare it with the dates it gives for the UK or Canada.</p>
<!--mini-->
<p>Once approved, the ESTA lasts two years or until the passport expires. Under ${h.src('ecfr2175', '8 CFR 217.5(e)')}, a new passport, a new name, a change of gender or citizenship, or a change in the facts behind a yes-or-no answer requires a new application. The ${h.a('esta-status', 'status page')} explains how to check your application, and the ${h.a('esta-cost', 'cost page')} the total for a group.</p>`;
    },
  },
  de: {
    slug: 'esta-beantragen',
    nav: 'ESTA beantragen',
    card: 'Was Sie brauchen, die Schritte auf der CBP-Seite, Gruppenanträge und wann Sie anfangen sollten.',
    title: 'ESTA beantragen: die amtlichen Schritte auf esta.cbp.dhs.gov',
    description: 'So beantragen Sie die ESTA auf der amtlichen Seite der CBP: E-Pass, E-Mail, Karte, die Fragen zur Berechtigung, Familienantrag und warum vor der Buchung.',
    h1: 'ESTA beantragen: der Antrag auf der amtlichen Seite der CBP',
    intro: 'Prüfen Sie zuerst, ob Ihr Pass zum Visa Waiver Program gehört, und folgen Sie dann den Schritten nur auf esta.cbp.dhs.gov.',
    resume: (h) => {
      const f = F(h);
      return `Die ESTA beantragen Sie online auf esta.cbp.dhs.gov, der Seite der US-Grenzschutzbehörde CBP, mit einem Formular pro Reisendem. Nötig sind ein elektronischer Reisepass eines der ${f.vwpCount} Staaten des Visa Waiver Program mit dem Chip-Symbol auf dem Umschlag, eine E-Mail-Adresse und eine Karte, um ${f.us} zu bezahlen. Die Seite bietet eine deutsche Anleitung, die Angaben selbst machen Sie aber in lateinischen Buchstaben und auf Englisch: Passdaten, Kontakt, Arbeitgeber und eine Reihe von Ja-Nein-Fragen zu Gesundheit, Vorstrafen, früheren Ablehnungen und Reisen in bestimmte Länder. Die CBP empfiehlt, den Antrag zu stellen, sobald Sie die Reise planen, und vor dem Kauf der Flugtickets, denn ohne genehmigte ESTA dürfen Sie nicht in Flugzeug oder Schiff steigen. Ein neuer Antrag ist nach US-Bundesrecht nötig bei neuem Pass, neuem Namen, geändertem Geschlecht oder geänderter Staatsangehörigkeit und wenn sich eine Antwort auf die Ja-Nein-Fragen ändert. Familien beantragen gemeinsam als Gruppe, jeder zahlt die volle Gebühr.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Woran erkenne ich, ob mein Pass ein E-Pass ist?', a: 'Am Umschlag: ein E-Pass trägt das internationale Chip-Symbol, ein kleines Rechteck mit einem Kreis in der Mitte. Das DHS verlangt einen E-Pass von jedem Reisenden im Visa Waiver Program. Alle aktuellen deutschen Reisepässe haben einen Chip, der vorläufige Reisepass und der frühere Kinderreisepass nicht; mit ihnen ist ein Visum nötig.' },
        { q: 'Kann ich die ESTA für die ganze Familie in einem Rutsch beantragen?', a: `Ja. Die amtliche Seite bietet einen Gruppenantrag: eine Person gibt die Daten aller Reisenden ein und bezahlt für alle zusammen. Jeder hat trotzdem einen eigenen Antrag, eine eigene Entscheidung und zahlt die volle Gebühr von ${f.us}, auch ein Baby. Notieren Sie jede Antragsnummer, um den Status später abzufragen.` },
        { q: 'Was passiert, wenn ich eine Berechtigungsfrage mit Ja beantworte?', a: 'Der Antrag wird nicht automatisch abgelehnt, aber ein Ja bei schweren Krankheiten, Festnahmen, früheren Visumablehnungen oder Reisen in gelistete Staaten führt oft zur Ablehnung der ESTA. Dann beantragen Sie ein Visum bei der US-Botschaft oder einem Konsulat. Antworten Sie nie falsch mit Nein: eine falsche Angabe kann künftige Reisen ausschließen.' },
        { q: 'Brauche ich für die ESTA schon ein Hotel in den USA?', a: 'Gefragt wird nach der Adresse während des Aufenthalts, Sie können aber vor der Hotelbuchung beantragen, wie es die CBP empfiehlt. Stehen die Pläne noch nicht fest, geben Sie an, was Sie wissen. Entscheidend sind richtige Passdaten und wahrheitsgemäße Antworten auf die Berechtigungsfragen, denn diese gleicht die CBP mit ihren Datenbanken ab.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Vor dem Antrag</h2>
<p>Jeder Reisende braucht einen E-Pass, der für die Reise gültig ist; die ${h.src('dhsVwpReq', 'Passanforderungen des DHS')} erklären die Chip-Regel. Prüfen Sie, dass niemand in der Gruppe seit dem ${f.usIneligible} im Irak, in Syrien oder in einem als Terrorunterstützer eingestuften Staat war, denn das schließt die ESTA gesetzlich aus. Halten Sie eine Kreditkarte oder Debitkarte und eine E-Mail-Adresse bereit, die Sie lesen.</p>
<h2>Schritt 1: die amtliche Seite öffnen</h2>
<p>Tippen Sie ${h.src('estaApply', 'esta.cbp.dhs.gov')} selbst ein, statt einer Anzeige zu folgen. Die Adresse endet auf .dhs.gov. Wählen Sie einen Einzelantrag oder, für mehrere Personen, einen Gruppenantrag.</p>
<h2>Schritt 2: Pass und persönliche Daten</h2>
<p>Übernehmen Sie die Angaben genau so, wie sie im Pass stehen, mit ausstellendem Staat und Ablaufdatum. Umlaute schreiben Sie so wie in der maschinenlesbaren Zeile des Passes, also zum Beispiel MUELLER für Müller. Ein Tippfehler in der Passnummer macht die ESTA beim Check-in wertlos, und die einzige Lösung ist ein neuer Antrag zur vollen Gebühr.</p>
<h2>Schritt 3: die Berechtigungsfragen</h2>
<p>Die Ja-Nein-Fragen betreffen Gesundheit, Festnahmen und Verurteilungen, Drogen, Terrorismus, Betrug, frühere Visumablehnungen oder Überziehungen und Reisen in bestimmte Staaten. Beantworten Sie sie für jede Person wahrheitsgemäß. Ein Ja bedeutet nicht immer eine Ablehnung, aber oft.</p>
<h2>Schritt 4: bezahlen und die Nummer notieren</h2>
<p>Zahlen Sie ${f.us} pro Antrag. Sie erhalten eine Antragsnummer: notieren Sie sie, denn mit ihr, der Passnummer und dem Geburtsdatum fragen Sie später den Status auf derselben Seite ab.</p>
<h2>Wann Sie beantragen sollten</h2>
<p>Laut ${h.src('cbpEsta', 'CBP')} kann der Antrag jederzeit vor der Reise gestellt werden; empfohlen wird, ihn zu stellen, sobald Sie die Reise vorbereiten, oder vor dem Kauf der Tickets. Eine Bearbeitungszeit nennt die CBP nicht, deshalb zeigt der Rechner unten für die USA kein Datum, sondern diesen Hinweis; für Großbritannien oder Kanada nennt er ein Datum.</p>
<!--mini-->
<p>Genehmigt gilt die ESTA zwei Jahre oder bis zum Ablauf des Passes. Nach ${h.src('ecfr2175', '8 CFR 217.5(e)')} brauchen Sie einen neuen Antrag bei neuem Pass, neuem Namen, geändertem Geschlecht oder geänderter Staatsangehörigkeit und wenn sich die Tatsachen hinter einer Ja-Nein-Antwort ändern. Die Seite ${h.a('esta-status', 'ESTA-Status prüfen')} erklärt die Abfrage, die Seite ${h.a('esta-cost', 'ESTA-Kosten')} den Betrag für die Gruppe.</p>`;
    },
  },
  nl: {
    slug: 'esta-aanvragen',
    nav: 'ESTA aanvragen',
    card: 'Wat u nodig hebt, de stappen op de CBP-site, groepsaanvragen en wanneer u begint.',
    title: 'ESTA aanvragen: de officiële stappen op esta.cbp.dhs.gov',
    description: 'Zo vraagt u een ESTA aan op de officiële site van CBP: e-paspoort, e-mail, betaalkaart, de vragen over toelaatbaarheid, gezinsaanvraag, waarom vóór het boeken.',
    h1: 'ESTA aanvragen: de aanvraag op de officiële site van CBP',
    intro: 'Controleer eerst of uw paspoort bij het Visa Waiver Program hoort, en volg dan de stappen alleen op esta.cbp.dhs.gov.',
    resume: (h) => {
      const f = F(h);
      return `Een ESTA vraagt u online aan op esta.cbp.dhs.gov, de site van de Amerikaanse grensbewaking CBP, met één formulier per reiziger. U hebt een elektronisch paspoort nodig van een van de ${f.vwpCount} landen van het Visa Waiver Program, met het chipsymbool op de omslag, een e-mailadres en een kaart om ${f.us} te betalen. De site biedt een Nederlandse toelichting, maar de gegevens zelf vult u in het Engels in: paspoortgegevens, contact, werkgever en een reeks ja-neevragen over gezondheid, strafblad, eerdere weigeringen en reizen naar bepaalde landen. CBP raadt aan de aanvraag te doen zodra u de reis voorbereidt, en vóór u tickets koopt, want zonder goedgekeurde ESTA mag u niet aan boord van een vliegtuig of schip naar de Verenigde Staten. Een nieuwe aanvraag is volgens de federale regels nodig bij een nieuw paspoort, een nieuwe naam, een ander geslacht of een andere nationaliteit, en als een antwoord op de ja-neevragen verandert. Een gezin vraagt samen aan als groep, iedereen betaalt het volle tarief.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Hoe weet ik of mijn paspoort een e-paspoort is?', a: 'Kijk naar de omslag: een e-paspoort draagt het internationale chipsymbool, een rechthoekje met een cirkel in het midden. Het Amerikaanse ministerie van Binnenlandse Veiligheid eist een e-paspoort van elke reiziger in het Visa Waiver Program. Alle gewone Nederlandse en Belgische paspoorten van de laatste jaren hebben er een, een nooddocument meestal niet.' },
        { q: 'Kan ik de ESTA voor het hele gezin in één keer invullen?', a: `Ja. De officiële site biedt een groepsaanvraag: één persoon vult de gegevens van alle reizigers in en betaalt voor iedereen samen. Elke persoon heeft toch een eigen aanvraag, een eigen beslissing en betaalt het volle tarief van ${f.us}, ook een baby. Noteer elk aanvraagnummer om de status later te kunnen controleren.` },
        { q: 'Wat gebeurt er als ik een toelaatbaarheidsvraag met ja beantwoord?', a: 'De aanvraag wordt niet automatisch geweigerd, maar een ja bij ernstige ziekte, arrestaties, eerdere visumweigeringen of reizen naar aangewezen landen leidt vaak tot een geweigerde ESTA. Dan vraagt u een visum aan bij de Amerikaanse ambassade of een consulaat. Antwoord nooit onterecht nee: een onjuist antwoord kan toekomstige reizen uitsluiten.' },
        { q: 'Moet ik voor de ESTA al een hotel in Amerika hebben?', a: 'Er wordt gevraagd waar u verblijft, maar u kunt aanvragen vóór u een hotel boekt, zoals CBP aanraadt. Liggen uw plannen nog niet vast, geef dan wat u weet. Waar het om gaat zijn juiste paspoortgegevens en eerlijke antwoorden op de toelaatbaarheidsvragen, want die vergelijkt CBP met zijn databanken.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Vóór de aanvraag</h2>
<p>Elke reiziger heeft een e-paspoort nodig dat geldig is voor de reis; de ${h.src('dhsVwpReq', 'paspoorteisen van het DHS')} leggen de chipregel uit. Controleer dat niemand in het gezelschap sinds ${f.usIneligible} in Irak, Syrië of een als terreursponsor aangewezen land is geweest, want dat sluit de ESTA wettelijk uit. Houd een creditcard of debitcard klaar en een e-mailadres dat u leest.</p>
<h2>Stap 1: de officiële site openen</h2>
<p>Typ ${h.src('estaApply', 'esta.cbp.dhs.gov')} zelf in, in plaats van een advertentie te volgen. Het adres eindigt op .dhs.gov. Kies een individuele aanvraag of, voor meerdere personen, een groepsaanvraag.</p>
<h2>Stap 2: paspoort en persoonsgegevens</h2>
<p>Neem de gegevens precies over zoals ze in het paspoort staan, met het land van afgifte en de vervaldatum. Voor een naam met tussenvoegsel, zoals van der Berg, volgt u de schrijfwijze van de machineleesbare regel onderaan de paspoortpagina. Een tikfout in het paspoortnummer maakt de ESTA bij het inchecken waardeloos, en de enige oplossing is een nieuwe aanvraag tegen het volle tarief.</p>
<h2>Stap 3: de toelaatbaarheidsvragen</h2>
<p>De ja-neevragen gaan over gezondheid, arrestaties en veroordelingen, drugs, terrorisme, fraude, eerdere visumweigeringen of te lange verblijven en reizen naar bepaalde landen. Beantwoord ze voor iedereen naar waarheid. Een ja betekent niet altijd een weigering, maar vaak wel.</p>
<h2>Stap 4: betalen en het nummer bewaren</h2>
<p>Betaal ${f.us} per aanvraag. U krijgt een aanvraagnummer: schrijf het op, want daarmee, met het paspoortnummer en de geboortedatum, controleert u later de status op dezelfde site.</p>
<h2>Wanneer aanvragen</h2>
<p>Volgens ${h.src('cbpEsta', 'CBP')} kan de aanvraag op elk moment vóór de reis; aanbevolen wordt aan te vragen zodra u de reis voorbereidt, of vóór u tickets koopt. Een behandeltijd noemt CBP niet, daarom geeft de rekenhulp hieronder voor de Verenigde Staten geen datum, alleen dat advies; voor het Verenigd Koninkrijk of Canada geeft hij wel een datum.</p>
<!--mini-->
<p>Eenmaal goedgekeurd geldt de ESTA twee jaar of tot het paspoort verloopt. Volgens ${h.src('ecfr2175', '8 CFR 217.5(e)')} is een nieuwe aanvraag nodig bij een nieuw paspoort, een nieuwe naam, een ander geslacht of een andere nationaliteit, en als de feiten achter een ja-neeantwoord veranderen. De pagina ${h.a('esta-cost', 'ESTA-kosten')} geeft het totaal voor het gezelschap.</p>`;
    },
  },
});
