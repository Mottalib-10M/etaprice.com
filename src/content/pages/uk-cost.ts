import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'uk-cost',
  group: 'uk',
  order: 1,
  tool: { kind: 'cost', dest: 'GB' },
  mini: { kind: 'overcharge', dest: 'GB' },
  related: ['uk-apply', 'uk-who', 'uk-time', 'esta-cost'],
  sources: ['govukEta', 'govukFees', 'govukEtaApply', 'ecb'],
  en: {
    slug: 'uk-eta-cost',
    nav: 'UK ETA cost',
    card: 'The official £20 fee, for one person or the whole family, in pounds and euros.',
    title: 'UK ETA cost 2026: £20 per person, children included',
    description: 'The UK ETA costs £20 per traveller since 8 April 2026, babies included. Work out the total for your family in pounds and euros, and spot any site markup.',
    h1: 'UK ETA cost: the official fee for your whole group',
    intro: 'Choose your passport and the number of travellers: the calculator multiplies the official fee and converts it into euros at the ECB rate.',
    resume: (h) => {
      const f = F(h);
      return `A UK Electronic Travel Authorisation costs ${f.uk} per person, the fee set by the Home Office fee table from ${f.ukSince}, when it rose from ${f.ukOld}. There is no reduced rate: a baby, a child and an adult each need their own ETA and each pays the same ${f.uk}, so a family of four pays ${f.times(f.A.uk.fee, 4).m}, about ${f.times(f.A.uk.fee, 4).e.replace('≈ ', '')} at the ECB rate of ${f.fxDate}. The fee is the same on GOV.UK and in the official UK ETA app, it is not refunded once you have applied, and paying more elsewhere does not buy a faster decision. One ETA covers any number of visits of up to six months for two years, or until the passport expires if that comes first. Travellers who need a visa instead pay ${f.ukVisa} for a six-month visitor visa and cannot use the ETA. The calculator above gives the total for your group and checks that your passport is on the ETA list.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Why did the UK ETA price change in 2026?', a: `The Home Office raised the fee from ${f.ukOld} to ${f.uk} in the fee table that took effect on ${f.ukSince}, as part of a wider revision of immigration fees. An ETA bought before that date at ${f.ukOld} stays valid for its full two years; you only pay the new price when you apply again, for example with a new passport.` },
        { q: 'Is the UK ETA fee refunded if my application is refused?', a: `No. GOV.UK states that the ${f.uk} is not refunded, whatever the outcome. If the application is rejected, or if you need to change a detail, you apply again and pay again. GOV.UK adds that people with a criminal record or a previous refusal of entry may prefer a Standard Visitor visa, at ${f.ukVisa}. Filling in the form carefully yourself on the official service is the best way to avoid paying twice.` },
        { q: 'Do children pay a lower UK ETA fee?', a: `No. Every traveller needs their own ETA, including babies and children, and each one costs ${f.uk}. A parent or guardian can apply for them: in the UK ETA app for someone who is with you, or online for someone who is not. The calculator above counts every person in the group at the same fee.` },
        { q: 'Does it cost more to apply on the website than in the app?', a: `No. The fee is ${f.uk} on GOV.UK and ${f.uk} in the official UK ETA app, published by the Home Office for iPhone and Android. The app is usually quicker because it reads the passport chip and takes the photo itself, but it costs the same. Only unofficial websites charge more, for the same form.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.uk.fee, n).m, f.times(A.uk.fee, n).e]);
      return `<h2>How much a UK ETA costs, by group size</h2>
<p>The fee is per person and the same for every age. This table multiplies the official ${f.uk} and converts the total at the ECB reference rate of ${f.fxDate}; the amount your card is charged in euros depends on your bank’s own rate on the day.</p>
${h.table(['Travellers', 'Official fee', 'In euros'], rows, `UK ETA fee from ${f.ukSince}, read on ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>What the ${f.uk} includes</h2>
<p>One application, one decision and, if it is granted, an ETA linked electronically to your passport. You do not print anything: the airline checks it when you board and the Border Force officer sees it on arrival. The ETA lets you visit as many times as you like for two years, each stay up to six months, for tourism, family visits, business meetings or short study. It also covers a transit in which you pass through UK border control. It does not cover work, and it does not guarantee entry: the officer still decides at the border.</p>
<h2>What it does not cost</h2>
<p>There is no fee to check your ETA status, no fee for a second trip, no supplement for a fast decision and no charge for applying on behalf of your children. GOV.UK says plainly that you cannot get a faster decision by applying through another website or app. Most decisions arrive within a day; the ${h.a('uk-time', 'processing time page')} explains the three working days you should plan for.</p>
<h2>When a site asks for more than ${f.uk}</h2>
<p>Search results for the ETA include websites that are not run by the government. They take your passport details, submit the same form and charge a service fee on top of the ${f.uk}. GOV.UK warns that other websites may charge more and advises avoiding websites that imitate government services. If you have already been quoted a price, enter it below to see how much of it is not the Home Office fee.</p>
<!--mini-->
<p>If you paid an unofficial site and have not yet received an ETA reference by email, check its status in the UK ETA app or contact your card issuer about the service charge. The only official places to apply are ${h.src('govukEtaApply', 'gov.uk/eta/apply')} and the UK ETA app.</p>
<h2>A new passport means a new fee</h2>
<p>The ETA is tied to the passport you used. If you renew or replace that passport, the old ETA does not move across, even with months left on it: you apply again and pay ${f.uk} again. If you travel on two nationalities, use the same passport to apply and to travel. British and Irish citizens, including dual citizens, do not need an ETA at all.</p>
<h2>Who pays a visa instead</h2>
<p>The ETA is only for nationalities on the ETA list, about ${f.ukEtaCount} of them, including the United States, Canada, Australia and every EU country. Nationals of ${f.ukVisaCount} other countries need a visitor visa at ${f.ukVisa} and cannot buy an ETA. The calculator tells you which applies to your passport; the ${h.a('uk-who', 'page on who needs an ETA')} covers transit and residents of Ireland.</p>`;
    },
  },
  fr: {
    slug: 'prix-eta-royaume-uni',
    nav: 'Prix de l’ETA',
    card: 'Le prix officiel de 20 £, pour une personne ou toute la famille, en livres et en euros.',
    title: 'Prix ETA Royaume-Uni 2026 : 20 £ par voyageur, enfant inclus',
    description: 'L’ETA pour le Royaume-Uni coûte 20 £ par voyageur depuis le 8 avril 2026, bébés compris. Calculez le total de votre famille en livres et en euros, sans surcoût.',
    h1: 'Prix de l’ETA britannique : le tarif officiel pour tout le groupe',
    intro: 'Choisissez votre passeport et le nombre de voyageurs : le calculateur multiplie le prix officiel et le convertit en euros au taux BCE.',
    resume: (h) => {
      const f = F(h);
      return `L’autorisation de voyage électronique britannique (ETA) coûte ${f.uk} par personne, le montant fixé par le barème du Home Office entré en vigueur le ${f.ukSince}, quand il est passé de ${f.ukOld} à ${f.uk}. Il n’existe aucun tarif réduit : un bébé, un enfant et un adulte ont chacun besoin de leur propre ETA et paient chacun ${f.uk}, si bien qu’une famille de quatre paie ${f.times(f.A.uk.fee, 4).m}, environ ${f.times(f.A.uk.fee, 4).e.replace('≈ ', '')} au taux BCE du ${f.fxDate}. Le prix est le même sur GOV.UK et dans l’application officielle UK ETA, il n’est jamais remboursé une fois la demande faite, et payer davantage ailleurs n’accélère pas la décision. Une ETA couvre autant de séjours de six mois au plus que vous voulez pendant deux ans, ou jusqu’à l’expiration du passeport si elle arrive avant. Les voyageurs soumis au visa paient ${f.ukVisa} pour un visa visiteur de six mois et ne peuvent pas utiliser l’ETA. Le calculateur ci-dessus donne le total pour votre groupe et vérifie que votre passeport figure bien sur la liste.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Pourquoi le prix de l’ETA britannique a-t-il augmenté en 2026 ?', a: `Le Home Office a porté le montant de ${f.ukOld} à ${f.uk} dans le barème entré en vigueur le ${f.ukSince}, lors d’une révision plus large des frais d’immigration. Une ETA achetée avant cette date à ${f.ukOld} reste valable pendant ses deux ans ; vous ne payez le nouveau prix qu’en refaisant une demande, par exemple avec un nouveau passeport.` },
        { q: 'L’ETA est-elle remboursée si la demande est refusée ?', a: `Non. GOV.UK précise que les ${f.uk} ne sont pas remboursées, quelle que soit l’issue. Si la demande est rejetée, ou s’il faut corriger un détail, on refait une demande et on repaie. GOV.UK ajoute qu’une personne ayant un casier judiciaire ou déjà refoulée à l’entrée peut préférer le visa visiteur standard, à ${f.ukVisa}. Remplir soi-même le formulaire avec soin sur le service officiel évite de payer deux fois.` },
        { q: 'Les enfants paient-ils moins cher l’ETA britannique ?', a: `Non. Chaque voyageur a besoin de sa propre ETA, bébés et enfants compris, et chacune coûte ${f.uk}. Un parent ou un tuteur peut faire la demande pour eux : dans l’application UK ETA pour une personne présente à côté de vous, en ligne pour une personne absente. Le calculateur ci-dessus compte chaque membre du groupe au même prix.` },
        { q: 'La demande coûte-t-elle plus cher sur le site que dans l’application ?', a: `Non. Le prix est de ${f.uk} sur GOV.UK et de ${f.uk} dans l’application officielle UK ETA, publiée par le Home Office pour iPhone et Android. L’application est souvent plus rapide, car elle lit la puce du passeport et prend la photo elle-même, mais elle coûte la même chose. Seuls les sites non officiels facturent davantage, pour le même formulaire.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.uk.fee, n).m, f.times(A.uk.fee, n).e]);
      return `<h2>Combien coûte l’ETA selon la taille du groupe</h2>
<p>Le prix est par personne et identique à tout âge. Ce tableau multiplie les ${f.uk} officielles et convertit le total au taux de référence BCE du ${f.fxDate} ; le montant débité en euros dépend du taux de votre banque le jour du paiement.</p>
${h.table(['Voyageurs', 'Prix officiel', 'En euros'], rows, `Prix de l’ETA britannique depuis le ${f.ukSince}, lu le ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Ce que comprennent les ${f.uk}</h2>
<p>Une demande, une décision et, si elle est accordée, une ETA reliée électroniquement à votre passeport. Rien à imprimer : la compagnie aérienne la vérifie à l’embarquement et l’agent de la Border Force la voit à l’arrivée. L’ETA permet autant de séjours que vous voulez pendant deux ans, chacun de six mois au plus, pour du tourisme, une visite familiale, un rendez-vous d’affaires ou une courte formation. Elle couvre aussi un transit avec passage du contrôle frontalier britannique. Elle ne permet pas de travailler et ne garantit pas l’entrée : l’agent décide toujours à la frontière.</p>
<h2>Ce qui ne coûte rien</h2>
<p>Aucun frais pour vérifier le statut de son ETA, pour un second voyage ou pour une demande faite au nom de ses enfants, et aucun supplément pour une décision rapide. GOV.UK le dit clairement : passer par un autre site ou une autre application ne donne pas de décision plus rapide. La plupart des réponses arrivent en un jour ; la ${h.a('uk-time', 'page sur le délai')} explique les trois jours ouvrés à prévoir.</p>
<h2>Quand un site demande plus de ${f.uk}</h2>
<p>Les résultats de recherche sur l’ETA comprennent des sites qui ne sont pas gérés par l’administration britannique. Ils prennent vos données de passeport, déposent le même formulaire et ajoutent des frais de service aux ${f.uk}. GOV.UK prévient que d’autres sites peuvent facturer davantage et conseille d’éviter ceux qui imitent les services publics. Si l’on vous a déjà annoncé un prix, saisissez-le ci-dessous pour voir la part qui ne revient pas au Home Office.</p>
<!--mini-->
<p>Si vous avez payé un site non officiel sans recevoir de numéro d’ETA par courriel, vérifiez le statut dans l’application UK ETA ou contactez votre banque au sujet des frais de service. Les seules adresses officielles sont ${h.src('govukEtaApply', 'gov.uk/eta/apply')} et l’application UK ETA.</p>
<h2>Nouveau passeport, nouveau paiement</h2>
<p>L’ETA est liée au passeport utilisé pour la demande. Si vous renouvelez ou remplacez ce passeport, l’ancienne ETA ne suit pas, même s’il lui reste des mois : il faut refaire la demande et repayer ${f.uk}. Si vous avez deux nationalités, utilisez le même passeport pour la demande et pour le voyage. Les citoyens britanniques et irlandais, binationaux compris, n’ont besoin d’aucune ETA.</p>
<h2>Qui paie un visa à la place</h2>
<p>L’ETA ne concerne que les nationalités de la liste, environ ${f.ukEtaCount}, dont la France, la Belgique, la Suisse, le Canada et tous les pays de l’UE. Les ressortissants de ${f.ukVisaCount} autres pays ont besoin d’un visa visiteur à ${f.ukVisa} et ne peuvent pas acheter d’ETA. Le calculateur indique le cas de votre passeport ; la page ${h.a('uk-who', 'voyage à Londres')} traite du transit et des résidents d’Irlande.</p>`;
    },
  },
  de: {
    slug: 'eta-england-kosten',
    nav: 'ETA-Kosten',
    card: 'Die amtliche Gebühr von 20 £, für eine Person oder die ganze Familie, in Pfund und Euro.',
    title: 'ETA England Kosten 2026: 20 £ pro Person, auch für Kinder',
    description: 'Die ETA für England kostet seit dem 8. April 2026 20 £ pro Person, auch für Babys. Rechnen Sie den Betrag für Ihre Familie in Pfund und Euro, ohne Aufschlag.',
    h1: 'ETA England Kosten: die amtliche Gebühr für Ihre Reisegruppe',
    intro: 'Wählen Sie Ihren Pass und die Zahl der Reisenden: der Rechner multipliziert die amtliche Gebühr und rechnet sie zum EZB-Kurs in Euro um.',
    resume: (h) => {
      const f = F(h);
      return `Die britische elektronische Einreisegenehmigung (ETA) kostet ${f.uk} pro Person; so steht es in der Gebührentabelle des Home Office, die seit dem ${f.ukSince} gilt und die Gebühr von ${f.ukOld} auf ${f.uk} angehoben hat. Einen ermäßigten Tarif gibt es nicht: Baby, Kind und Erwachsener brauchen jeweils eine eigene ETA und zahlen jeweils ${f.uk}, eine vierköpfige Familie also ${f.times(f.A.uk.fee, 4).m}, rund ${f.times(f.A.uk.fee, 4).e.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}. Der Preis ist auf GOV.UK und in der amtlichen App UK ETA derselbe, er wird nach dem Antrag nie erstattet, und wer anderswo mehr zahlt, bekommt keine schnellere Entscheidung. Eine ETA gilt zwei Jahre für beliebig viele Aufenthalte von bis zu sechs Monaten, oder bis der Pass abläuft, falls das früher ist. Wer ein Visum braucht, zahlt ${f.ukVisa} für ein Besuchervisum über sechs Monate und kann keine ETA nutzen. Der Rechner oben nennt den Betrag für Ihre Gruppe und prüft, ob Ihr Pass auf der ETA-Liste steht.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Warum ist die ETA für England 2026 teurer geworden?', a: `Das Home Office hat die Gebühr in der Gebührentabelle, die am ${f.ukSince} in Kraft trat, von ${f.ukOld} auf ${f.uk} erhöht, im Rahmen einer breiteren Anpassung der Einwanderungsgebühren. Eine vor diesem Datum für ${f.ukOld} gekaufte ETA bleibt ihre vollen zwei Jahre gültig; den neuen Preis zahlen Sie erst beim nächsten Antrag, etwa mit einem neuen Reisepass.` },
        { q: 'Bekomme ich die ETA-Gebühr zurück, wenn der Antrag abgelehnt wird?', a: `Nein. GOV.UK schreibt, dass die ${f.uk} in keinem Fall erstattet werden. Wird der Antrag abgelehnt oder muss eine Angabe geändert werden, stellen Sie einen neuen Antrag und zahlen erneut. GOV.UK ergänzt, dass Personen mit Vorstrafen oder einer früheren Einreiseverweigerung besser das Standard-Besuchervisum für ${f.ukVisa} beantragen. Wer das Formular selbst und sorgfältig auf dem amtlichen Dienst ausfüllt, zahlt nicht doppelt.` },
        { q: 'Zahlen Kinder für die britische ETA weniger?', a: `Nein. Jeder Reisende braucht eine eigene ETA, auch Babys und Kinder, und jede kostet ${f.uk}. Eltern oder Erziehungsberechtigte können sie beantragen: in der App UK ETA für jemanden, der neben Ihnen ist, online für jemanden, der nicht dabei ist. Der Rechner oben zählt jedes Mitglied der Gruppe zur selben Gebühr.` },
        { q: 'Ist der Antrag auf der Website teurer als in der App?', a: `Nein. Die Gebühr beträgt ${f.uk} auf GOV.UK und ${f.uk} in der amtlichen App UK ETA, die das Home Office für iPhone und Android herausgibt. Die App ist oft schneller, weil sie den Chip im Pass liest und das Foto selbst aufnimmt, kostet aber dasselbe. Nur inoffizielle Seiten verlangen mehr, für dasselbe Formular.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.uk.fee, n).m, f.times(A.uk.fee, n).e]);
      return `<h2>Was die ETA je nach Gruppengröße kostet</h2>
<p>Die Gebühr gilt pro Person und ist für jedes Alter gleich. Die Tabelle multipliziert die amtlichen ${f.uk} und rechnet zum EZB-Referenzkurs vom ${f.fxDate} um; welcher Eurobetrag abgebucht wird, hängt vom Kurs Ihrer Bank am Zahltag ab.</p>
${h.table(['Reisende', 'Amtliche Gebühr', 'In Euro'], rows, `ETA-Gebühr seit ${f.ukSince}, gelesen am ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Was in den ${f.uk} enthalten ist</h2>
<p>Ein Antrag, eine Entscheidung und, wenn sie positiv ist, eine ETA, die elektronisch mit Ihrem Pass verknüpft ist. Ausdrucken müssen Sie nichts: die Fluggesellschaft prüft sie beim Einsteigen, die Border Force sieht sie bei der Ankunft. Mit der ETA reisen Sie zwei Jahre lang so oft Sie wollen ein, jeweils bis zu sechs Monate, als Tourist, für Familienbesuche, Geschäftstermine oder einen kurzen Kurs. Sie gilt auch für einen Transit, bei dem Sie durch die britische Grenzkontrolle gehen. Arbeiten dürfen Sie damit nicht, und die Einreise ist nicht garantiert: der Grenzbeamte entscheidet.</p>
<h2>Was nichts kostet</h2>
<p>Keine Gebühr für die Statusabfrage, keine für eine zweite Reise, kein Zuschlag für eine schnelle Entscheidung, nichts für Anträge im Namen Ihrer Kinder. GOV.UK sagt klar, dass ein Antrag über eine andere Website oder App keine schnellere Entscheidung bringt. Die meisten Entscheidungen kommen innerhalb eines Tages; planen Sie trotzdem bis zu drei Werktage ein.</p>
<h2>Wenn eine Seite mehr als ${f.uk} verlangt</h2>
<p>In den Suchergebnissen zur ETA tauchen Seiten auf, die nicht von der britischen Regierung betrieben werden. Sie nehmen Ihre Passdaten, reichen dasselbe Formular ein und schlagen eine Servicegebühr auf die ${f.uk} auf. GOV.UK warnt, dass andere Seiten mehr verlangen können, und rät, Seiten zu meiden, die Regierungsdienste nachahmen. Wurde Ihnen schon ein Preis genannt, geben Sie ihn unten ein: Sie sehen, welcher Teil nicht an das Home Office geht.</p>
<!--mini-->
<p>Haben Sie bei einer inoffiziellen Seite bezahlt und noch keine ETA-Nummer per E-Mail erhalten, prüfen Sie den Status in der App UK ETA oder wenden Sie sich wegen der Servicegebühr an Ihre Kartenbank. Die einzigen amtlichen Adressen sind ${h.src('govukEtaApply', 'gov.uk/eta/apply')} und die App UK ETA.</p>
<h2>Neuer Pass, neue Gebühr</h2>
<p>Die ETA hängt an dem Pass, mit dem Sie sie beantragt haben. Wird er erneuert oder ersetzt, geht die alte ETA nicht mit, auch wenn sie noch Monate gültig wäre: Sie stellen einen neuen Antrag und zahlen erneut ${f.uk}. Wer zwei Staatsangehörigkeiten hat, beantragt und reist mit demselben Pass. Britische und irische Staatsangehörige, auch mit doppelter Staatsbürgerschaft, brauchen keine ETA.</p>
<h2>Wer stattdessen ein Visum zahlt</h2>
<p>Die ETA gibt es nur für die Staaten auf der ETA-Liste, rund ${f.ukEtaCount}, darunter Deutschland, Österreich, die Schweiz und alle EU-Staaten. Angehörige von ${f.ukVisaCount} anderen Staaten brauchen ein Besuchervisum für ${f.ukVisa} und können keine ETA kaufen. Der Rechner zeigt, was für Ihren Pass gilt; die Seite ${h.a('uk-who', 'Einreise England')} erklärt Transit und Wohnsitz in Irland.</p>`;
    },
  },
  nl: {
    slug: 'eta-engeland-kosten',
    nav: 'ETA-kosten',
    card: 'Het officiële tarief van 20 £, voor één persoon of het hele gezin, in ponden en euro.',
    title: 'ETA Engeland kosten 2026: 20 £ per persoon, ook voor kind',
    description: 'De ETA voor Engeland kost sinds 8 april 2026 20 £ per reiziger, ook voor baby’s. Reken het totaal voor uw gezin uit in ponden en euro, zonder toeslag.',
    h1: 'ETA Engeland kosten: het officiële tarief voor uw hele gezelschap',
    intro: 'Kies uw paspoort en het aantal reizigers: de rekenhulp vermenigvuldigt het officiële tarief en rekent het om in euro tegen de ECB-koers.',
    resume: (h) => {
      const f = F(h);
      return `De Britse elektronische reisvergunning (ETA) kost ${f.uk} per persoon; dat staat in de tarieventabel van het Home Office die sinds ${f.ukSince} geldt en het tarief van ${f.ukOld} naar ${f.uk} bracht. Een verlaagd tarief bestaat niet: een baby, een kind en een volwassene hebben elk een eigen ETA nodig en betalen elk ${f.uk}, zodat een gezin van vier ${f.times(f.A.uk.fee, 4).m} betaalt, ongeveer ${f.times(f.A.uk.fee, 4).e.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}. De prijs is gelijk op GOV.UK en in de officiële app UK ETA, wordt na de aanvraag nooit terugbetaald, en wie elders meer betaalt, krijgt geen snellere beslissing. Eén ETA geldt twee jaar voor zoveel verblijven van hoogstens zes maanden als u wilt, of tot het paspoort verloopt als dat eerder is. Wie een visum nodig heeft, betaalt ${f.ukVisa} voor een bezoekersvisum van zes maanden en kan geen ETA gebruiken. De rekenhulp hierboven geeft het totaal voor uw gezelschap en controleert of uw paspoort op de ETA-lijst staat.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Waarom is de ETA voor Engeland in 2026 duurder geworden?', a: `Het Home Office verhoogde het tarief van ${f.ukOld} naar ${f.uk} in de tarieventabel die op ${f.ukSince} in werking trad, bij een bredere herziening van de immigratietarieven. Een ETA die vóór die datum voor ${f.ukOld} is gekocht, blijft zijn volle twee jaar geldig; de nieuwe prijs betaalt u pas bij een nieuwe aanvraag, bijvoorbeeld met een nieuw paspoort.` },
        { q: 'Krijg ik het ETA-tarief terug als de aanvraag wordt geweigerd?', a: `Nee. GOV.UK vermeldt dat de ${f.uk} in geen geval wordt terugbetaald. Wordt de aanvraag afgewezen of moet een gegeven veranderen, dan vraagt u opnieuw aan en betaalt u opnieuw. GOV.UK voegt eraan toe dat wie een strafblad heeft of eerder de toegang werd geweigerd, beter het standaard bezoekersvisum van ${f.ukVisa} aanvraagt. Wie het formulier zelf en zorgvuldig invult op de officiële dienst, betaalt niet twee keer.` },
        { q: 'Betalen kinderen minder voor de Britse ETA?', a: `Nee. Elke reiziger heeft een eigen ETA nodig, ook baby’s en kinderen, en elke ETA kost ${f.uk}. Een ouder of voogd kan voor hen aanvragen: in de app UK ETA voor iemand die naast u staat, online voor iemand die er niet bij is. De rekenhulp hierboven telt iedereen in het gezelschap tegen hetzelfde tarief.` },
        { q: 'Is aanvragen op de website duurder dan in de app?', a: `Nee. Het tarief is ${f.uk} op GOV.UK en ${f.uk} in de officiële app UK ETA, die het Home Office voor iPhone en Android uitgeeft. De app is vaak sneller, omdat hij de chip in het paspoort leest en zelf de foto maakt, maar kost hetzelfde. Alleen onofficiële sites vragen meer, voor hetzelfde formulier.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.uk.fee, n).m, f.times(A.uk.fee, n).e]);
      return `<h2>Wat de ETA kost per grootte van het gezelschap</h2>
<p>Het tarief geldt per persoon en is voor elke leeftijd gelijk. De tabel vermenigvuldigt de officiële ${f.uk} en rekent om tegen de ECB-referentiekoers van ${f.fxDate}; welk eurobedrag wordt afgeschreven, hangt af van de koers van uw bank op de betaaldag.</p>
${h.table(['Reizigers', 'Officieel tarief', 'In euro'], rows, `ETA-tarief sinds ${f.ukSince}, gelezen op ${f.dataDay}`, ['l', 'r', 'r'])}
<h2>Wat de ${f.uk} omvat</h2>
<p>Eén aanvraag, één beslissing en, als die positief is, een ETA die elektronisch aan uw paspoort gekoppeld is. Afdrukken hoeft niet: de luchtvaartmaatschappij controleert hem bij het instappen en de Border Force ziet hem bij aankomst. Met de ETA reist u twee jaar lang zo vaak u wilt in, telkens hoogstens zes maanden, als toerist, voor familiebezoek, een zakelijke afspraak of een korte cursus. Hij geldt ook voor een transit waarbij u door de Britse grenscontrole gaat. Werken mag er niet mee, en toegang is niet gegarandeerd: de grensambtenaar beslist.</p>
<h2>Wat niets kost</h2>
<p>Geen kosten voor de statuscontrole, geen voor een tweede reis, geen toeslag voor een snelle beslissing, niets voor een aanvraag namens uw kinderen. GOV.UK zegt duidelijk dat een aanvraag via een andere website of app geen snellere beslissing oplevert. De meeste beslissingen komen binnen een dag; reken toch op maximaal drie werkdagen.</p>
<h2>Als een site meer dan ${f.uk} vraagt</h2>
<p>In de zoekresultaten over de ETA staan sites die niet door de Britse overheid worden beheerd. Ze nemen uw paspoortgegevens, dienen hetzelfde formulier in en tellen servicekosten op bij de ${f.uk}. GOV.UK waarschuwt dat andere sites meer kunnen vragen en raadt aan sites te mijden die overheidsdiensten nabootsen. Is u al een prijs genoemd, vul die hieronder in: u ziet welk deel niet naar het Home Office gaat.</p>
<!--mini-->
<p>Hebt u bij een onofficiële site betaald en nog geen ETA-nummer per e-mail ontvangen, controleer dan de status in de app UK ETA of neem voor de servicekosten contact op met uw bank. De enige officiële adressen zijn ${h.src('govukEtaApply', 'gov.uk/eta/apply')} en de app UK ETA.</p>
<h2>Nieuw paspoort, nieuw tarief</h2>
<p>De ETA hangt aan het paspoort waarmee u hem aanvroeg. Wordt dat paspoort vernieuwd of vervangen, dan gaat de oude ETA niet mee, ook al was hij nog maanden geldig: u vraagt opnieuw aan en betaalt opnieuw ${f.uk}. Wie twee nationaliteiten heeft, vraagt aan en reist met hetzelfde paspoort. Britse en Ierse staatsburgers, ook met een dubbele nationaliteit, hebben geen ETA nodig.</p>
<h2>Wie in plaats daarvan een visum betaalt</h2>
<p>De ETA bestaat alleen voor de landen op de ETA-lijst, ongeveer ${f.ukEtaCount}, waaronder Nederland, België en alle EU-landen. Onderdanen van ${f.ukVisaCount} andere landen hebben een bezoekersvisum van ${f.ukVisa} nodig en kunnen geen ETA kopen. De rekenhulp toont wat voor uw paspoort geldt; de pagina ${h.a('uk-apply', 'ETA Engeland aanvragen')} legt de aanvraag stap voor stap uit.</p>`;
    },
  },
});
