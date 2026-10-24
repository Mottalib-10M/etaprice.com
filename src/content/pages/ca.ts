import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/guide-types';
import { F } from '../facts';

const cond = (h: Helpers) => h.M.AUTH.ca.conditional.map((c) => h.land(c)).join(', ');

export default definePage({
  id: 'ca',
  group: 'ca',
  order: 1,
  tool: { kind: 'checker', dests: ['CA'] },
  mini: { kind: 'applyby', dest: 'CA' },
  related: ['ca-cost', 'ca-pr', 'esta', 'uk-apply'],
  sources: ['caEta', 'irpr', 'ecb'],
  en: {
    slug: 'canada-eta',
    nav: 'Canada eTA',
    card: 'Who needs the Canadian eTA, the countries eligible under conditions, US citizens and the only official site.',
    title: 'Canada eTA 2026: who needs it, the conditions, how to apply',
    description: 'The Canada eTA in 2026: which passports need it to fly in, countries eligible only under conditions, US citizens and green card holders, the official form.',
    h1: 'Canada eTA: who needs it and how to apply on the official site',
    intro: 'Enter your passport: the checker applies the Canadian regulations and tells you whether you need an eTA, an eTA under conditions or a visa.',
    resume: (h) => {
      const f = F(h);
      return `The Canadian electronic travel authorization (eTA) is required from citizens of visa-exempt countries who fly to or through a Canadian airport, under section 7.01 of the Immigration and Refugee Protection Regulations. It covers ${f.caCount} nationalities, including the United Kingdom, Ireland, France, Germany, the Netherlands, Australia and Japan. It is not needed by land or sea: a European driving in from the United States needs only a passport. US citizens need neither an eTA nor a visa, and US lawful permanent residents have been exempt since ${h.date(h.P.caFacts.usPrExemptSince)}. Citizens of ${f.caCondCount} other countries, such as Brazil, Mexico, Morocco, Thailand and the Philippines, can use an eTA by air only if they held a Canadian visa in the last ten years or hold a valid US non-immigrant visa; otherwise they need a visitor visa. The eTA costs ${f.ca}, is applied for only on canada.ca, and is usually approved within minutes. It lasts up to ${f.caYears} years or until the passport expires.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Do I need an eTA to drive into Canada from the United States?', a: 'No. The eTA is only required for travel to or through Canada by air. A visa-exempt traveller arriving by car, bus, train or boat, for example from Seattle to Vancouver or across Niagara, shows a valid passport at the border. If you fly home from a Canadian airport afterwards, an eTA is not needed for leaving either.' },
        { q: 'Can I change planes in Toronto without an eTA?', a: 'No. Canada requires an eTA from visa-exempt travellers who transit through a Canadian airport, even if they never leave the international area. The official page says so in its first line: the eTA is for travel to, or transit through, Canada. If your flight connects in Toronto, Montreal or Vancouver, apply for an eTA as for a visit.' },
        { q: 'Which countries can use the eTA only under conditions?', a: `${cond(h)}. Their citizens qualify for an eTA by air only if they held a Canadian visitor visa in the last ten years or hold a valid US non-immigrant visa on the day they apply. Otherwise they apply for a visitor visa at ${f.caVisa}, which takes longer and requires biometrics.` },
        { q: 'Does a dual Canadian citizen need an eTA?', a: 'No, and they cannot get one. Canadian citizens, including dual citizens, must travel to Canada with a valid Canadian passport, or in limited cases with a special authorization. The official site says so explicitly: a dual citizen who tries to board with the foreign passport and no Canadian passport may be refused boarding.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['GB', 'IE', 'FR', 'DE', 'NL', 'BE', 'CH', 'IT', 'ES', 'AU', 'NZ', 'JP'].filter((c) => A.ca.etaNationals.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Who needs an eTA</h2>
<p>Section 7.01 of the ${h.src('irpr', 'Canadian regulations')} lists the countries whose citizens are exempt from a visa but need an eTA to come by air. Among the ${f.caCount} of them: ${sample}. The checker reads that list, current to ${h.date(A.ca.currentTo)} on the Justice Laws website.</p>
<h2>Countries eligible under conditions</h2>
<p>For ${f.caCondCount} countries, the regulations allow an eTA by air only if the traveller held a Canadian visitor visa at any time in the ten years before applying, or holds a valid US non-immigrant visa on the day of the application. Indonesia and Malaysia were added on ${h.date(h.P.caFacts.idMyConditionalSince)}. Everyone else from these countries needs a visitor visa at ${f.caVisa}.</p>
<h2>Who does not need an eTA</h2>
<p>US citizens; US lawful permanent residents with their green card (see the ${h.a('ca-pr', 'green card page')}); Canadian citizens and permanent residents; travellers who already hold a valid Canadian visa; and anyone arriving by land or sea.</p>
<h2>How to apply</h2>
<p>The only official form is on ${h.src('caEta', 'canada.ca')}. You need a valid passport, an email address and a payment card for the ${f.ca}, which is not refundable. The form is in English and French; canada.ca offers explanations of each field in other languages, German and Dutch included. It cannot be saved, so have your passport and travel details ready.</p>
<h2>When to apply</h2>
<p>Most applications are approved by email within minutes. Some need several days, and the government then sends an email within ${h.P.caFacts.docsWithinHours} hours asking for documents. Enter your flight date below for the last comfortable day to apply.</p>
<!--mini-->
<h2>After approval</h2>
<p>The eTA is linked to the passport used: the airline scans it at check-in, and nothing needs printing. Check that the passport number in the approval email matches exactly; if not, apply again. The eTA lasts up to ${f.caYears} years or until the passport expires, and does not guarantee entry: a border services officer decides on arrival. The ${h.a('ca-cost', 'cost page')} gives the total for a family.</p>`;
    },
  },
  fr: {
    slug: 'ave-canada',
    nav: 'AVE Canada',
    card: 'Qui a besoin de l’AVE canadienne, les pays admis sous conditions, les Américains et la seule adresse officielle.',
    title: 'AVE Canada 2026 : qui en a besoin, conditions et demande',
    description: 'L’AVE pour le Canada en 2026 : quels passeports en ont besoin en avion, les pays admis sous conditions, les Américains et la seule demande officielle.',
    h1: 'AVE Canada : qui en a besoin et comment la demander sur le site officiel',
    intro: 'Indiquez votre passeport : le vérificateur applique le règlement canadien et dit s’il vous faut une AVE, une AVE sous conditions ou un visa.',
    resume: (h) => {
      const f = F(h);
      return `L’autorisation de voyage électronique (AVE), appelée eTA en anglais, est exigée des citoyens des pays dispensés de visa qui arrivent au Canada ou y transitent par avion, en vertu de l’article 7.01 du Règlement sur l’immigration et la protection des réfugiés. Elle concerne ${f.caCount} nationalités, dont la France, la Belgique, la Suisse, le Royaume-Uni et tous les pays de l’Union européenne. Elle n’est pas exigée par la route ou par la mer : un Français qui entre au Canada en voiture depuis les États-Unis montre seulement son passeport. Les citoyens américains n’ont besoin ni d’AVE ni de visa, et les résidents permanents des États-Unis en sont dispensés depuis le ${h.date(h.P.caFacts.usPrExemptSince)}. Les citoyens de ${f.caCondCount} autres pays, dont le Maroc, le Brésil, le Mexique et les Philippines, n’ont droit à l’AVE par avion que s’ils ont eu un visa canadien dans les dix dernières années ou détiennent un visa américain de non-immigrant valide ; sinon, il leur faut un visa. L’AVE coûte ${f.ca}, se demande uniquement sur canada.ca, est le plus souvent accordée en quelques minutes et vaut jusqu’à ${f.caYears} ans.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Faut-il une AVE pour entrer au Canada en voiture depuis les États-Unis ?', a: 'Non. L’AVE n’est exigée que pour arriver au Canada ou y transiter par avion. Un voyageur dispensé de visa qui arrive en voiture, en autocar, en train ou en bateau, par exemple de Boston vers Montréal ou aux chutes du Niagara, présente un passeport valide à la frontière. Repartir ensuite en avion depuis un aéroport canadien ne demande pas non plus d’AVE.' },
        { q: 'Une correspondance à Montréal ou Toronto demande-t-elle une AVE ?', a: 'Oui. Le Canada exige l’AVE des voyageurs dispensés de visa qui transitent par un aéroport canadien, même sans quitter la zone internationale. La page officielle le dit dès sa première ligne : l’AVE sert à se rendre au Canada ou à y transiter. Si votre vol fait escale à Montréal, Toronto ou Vancouver, demandez l’AVE comme pour un séjour.' },
        { q: 'Quels pays n’ont droit à l’AVE que sous conditions ?', a: `${cond(h)}. Leurs citoyens n’y ont droit, par avion, que s’ils ont détenu un visa de résident temporaire canadien dans les dix ans précédant la demande ou détiennent, le jour de la demande, un visa américain de non-immigrant valide. Sinon, il faut un visa de visiteur à ${f.caVisa}, plus long à obtenir et avec biométrie.` },
        { q: 'Un Franco-Canadien a-t-il besoin d’une AVE ?', a: 'Non, et il ne peut pas en obtenir. Les citoyens canadiens, binationaux compris, doivent entrer au Canada avec un passeport canadien valide, ou dans quelques cas avec une autorisation spéciale. Le site officiel le dit clairement : un binational qui se présente à l’embarquement avec son seul passeport français peut se voir refuser l’accès à bord.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['FR', 'BE', 'CH', 'LU', 'MC', 'GB', 'IE', 'DE', 'IT', 'ES', 'PT', 'NL'].filter((c) => A.ca.etaNationals.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Qui a besoin de l’AVE</h2>
<p>L’article 7.01 du ${h.src('irpr', 'règlement canadien')} énumère les pays dont les citoyens sont dispensés de visa mais doivent avoir une AVE pour arriver par avion. Parmi les ${f.caCount} : ${sample}. Le vérificateur lit cette liste, à jour au ${h.date(A.ca.currentTo)} sur le site Lois et règlements.</p>
<h2>Les pays admis sous conditions</h2>
<p>Pour ${f.caCondCount} pays, le règlement n’ouvre l’AVE par avion que si le voyageur a détenu un visa de visiteur canadien à un moment quelconque des dix années précédant la demande, ou détient un visa américain de non-immigrant valide le jour de la demande. L’Indonésie et la Malaisie ont été ajoutées le ${h.date(h.P.caFacts.idMyConditionalSince)}. Les autres ressortissants de ces pays doivent demander un visa de visiteur à ${f.caVisa}.</p>
<h2>Qui n’en a pas besoin</h2>
<p>Les citoyens américains ; les résidents permanents des États-Unis munis de leur carte verte ; les citoyens et résidents permanents canadiens ; les voyageurs qui ont déjà un visa canadien valide ; et toute personne qui arrive par la route ou par la mer.</p>
<h2>Comment faire la demande</h2>
<p>Le seul formulaire officiel est sur ${h.src('caEta', 'canada.ca')}, en français ou en anglais. Il faut un passeport valide, une adresse électronique et une carte de paiement pour les ${f.ca}, non remboursables. Le formulaire ne peut pas être enregistré en cours de route : préparez votre passeport et les détails du voyage avant de commencer.</p>
<h2>Quand faire la demande</h2>
<p>La plupart des demandes sont approuvées par courriel en quelques minutes. Certaines prennent plusieurs jours, et l’administration envoie alors sous ${h.P.caFacts.docsWithinHours} heures un courriel qui demande des documents. Saisissez la date du vol ci-dessous pour connaître le dernier jour confortable.</p>
<!--mini-->
<h2>Après l’approbation</h2>
<p>L’AVE est liée au passeport utilisé : la compagnie le scanne à l’enregistrement, rien à imprimer. Vérifiez que le numéro de passeport du courriel d’approbation est exactement le bon ; sinon, refaites la demande. L’AVE vaut jusqu’à ${f.caYears} ans ou jusqu’à l’expiration du passeport et ne garantit pas l’entrée : un agent des services frontaliers décide à l’arrivée. Le total pour la famille est sur la page ${h.a('ca-cost', 'prix de l’AVE')}.</p>`;
    },
  },
  de: {
    slug: 'eta-kanada',
    nav: 'eTA Kanada',
    card: 'Wer die kanadische eTA braucht, Länder mit Bedingungen, US-Bürger und die einzige amtliche Seite.',
    title: 'eTA Kanada 2026: wer sie braucht, Bedingungen und Antrag',
    description: 'Die eTA für Kanada 2026: welche Pässe sie für den Flug brauchen, Staaten mit Bedingungen, US-Bürger und Green Card, der einzige amtliche Antrag auf canada.ca.',
    h1: 'eTA Kanada: wer sie braucht und wie Sie sie amtlich beantragen',
    intro: 'Geben Sie Ihren Pass ein: der Check wendet die kanadische Verordnung an und sagt, ob Sie eine eTA, eine eTA unter Bedingungen oder ein Visum brauchen.',
    resume: (h) => {
      const f = F(h);
      return `Die kanadische elektronische Reisegenehmigung (eTA) brauchen Bürger visumfreier Staaten, die per Flugzeug nach Kanada reisen oder über einen kanadischen Flughafen umsteigen, nach Artikel 7.01 der kanadischen Einwanderungsverordnung. Sie gilt für ${f.caCount} Staatsangehörigkeiten, darunter Deutschland, Österreich, die Schweiz und alle EU-Staaten. Auf dem Land- oder Seeweg ist sie nicht nötig: wer mit dem Mietwagen aus den USA einreist, zeigt nur den Reisepass. US-Bürger brauchen weder eTA noch Visum, und Inhaber einer US-Green-Card sind seit dem ${h.date(h.P.caFacts.usPrExemptSince)} befreit. Bürger von ${f.caCondCount} weiteren Staaten, etwa Brasilien, Mexiko, Thailand oder die Philippinen, erhalten die eTA für den Flug nur, wenn sie in den letzten zehn Jahren ein kanadisches Visum hatten oder ein gültiges US-Visum besitzen; sonst brauchen sie ein Visum. Die eTA kostet ${f.ca}, rund ${f.caEur.replace('≈ ', '')}, wird nur auf canada.ca beantragt, meist innerhalb von Minuten genehmigt und gilt bis zu ${f.caYears} Jahre oder bis zum Ablauf des Passes.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Brauche ich die eTA, wenn ich mit dem Auto aus den USA nach Kanada fahre?', a: 'Nein. Die eTA ist nur für Reisen nach Kanada oder durch Kanada per Flugzeug vorgeschrieben. Wer als visumfreier Reisender mit Auto, Bus, Zug oder Schiff ankommt, etwa von Seattle nach Vancouver oder an den Niagarafällen, zeigt an der Grenze einen gültigen Reisepass. Auch für den Rückflug ab einem kanadischen Flughafen ist dann keine eTA nötig.' },
        { q: 'Brauche ich die eTA auch zum Umsteigen in Toronto?', a: 'Ja. Kanada verlangt die eTA auch von visumfreien Reisenden, die über einen kanadischen Flughafen umsteigen, selbst wenn sie den internationalen Bereich nicht verlassen. Die amtliche Seite sagt es gleich im ersten Satz: die eTA gilt für die Reise nach Kanada und den Transit durch Kanada. Wer über Toronto, Montreal oder Vancouver fliegt, beantragt die eTA wie für einen Besuch.' },
        { q: 'Für welche Staaten gilt die eTA nur unter Bedingungen?', a: `${cond(h)}. Deren Bürger erhalten die eTA für den Flug nur, wenn sie in den zehn Jahren vor dem Antrag ein kanadisches Besuchervisum hatten oder am Tag des Antrags ein gültiges US-Nichteinwanderungsvisum besitzen. Sonst brauchen sie ein Besuchervisum für ${f.caVisa}, das länger dauert und biometrische Daten verlangt.` },
        { q: 'Gibt es das eTA-Formular auf Deutsch?', a: 'Das Formular selbst gibt es nur auf Englisch und Französisch. Die Regierung Kanadas bietet aber Erklärungen zu jedem Feld in weiteren Sprachen an, darunter Deutsch. Halten Sie Pass und Reisedaten bereit, denn das Formular lässt sich nicht zwischenspeichern. Für die Gebühr von ' + f.ca + ' akzeptiert die Seite gängige Kredit- und Debitkarten.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['DE', 'AT', 'CH', 'LI', 'LU', 'NL', 'BE', 'FR', 'IT', 'GB', 'IE', 'PL'].filter((c) => A.ca.etaNationals.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Wer eine eTA braucht</h2>
<p>Artikel 7.01 der ${h.src('irpr', 'kanadischen Verordnung')} nennt die Staaten, deren Bürger kein Visum, aber für die Anreise per Flugzeug eine eTA brauchen. Unter den ${f.caCount}: ${sample}. Der Check liest diese Liste, Stand ${h.date(A.ca.currentTo)} auf der Seite Justice Laws.</p>
<h2>Staaten mit Bedingungen</h2>
<p>Für ${f.caCondCount} Staaten erlaubt die Verordnung die eTA für den Flug nur, wenn der Reisende in den zehn Jahren vor dem Antrag irgendwann ein kanadisches Besuchervisum hatte oder am Tag des Antrags ein gültiges US-Nichteinwanderungsvisum besitzt. Indonesien und Malaysia kamen am ${h.date(h.P.caFacts.idMyConditionalSince)} hinzu. Alle anderen aus diesen Staaten beantragen ein Besuchervisum für ${f.caVisa}.</p>
<h2>Wer keine eTA braucht</h2>
<p>US-Bürger; Inhaber einer US-Green-Card mit ihrer Karte; kanadische Staatsbürger und Daueraufenthaltsberechtigte; wer schon ein gültiges kanadisches Visum hat; und alle, die über Land oder See einreisen.</p>
<h2>So beantragen Sie die eTA</h2>
<p>Das einzige amtliche Formular steht auf ${h.src('caEta', 'canada.ca')}. Nötig sind ein gültiger Reisepass, eine E-Mail-Adresse und eine Karte für die ${f.ca}, die nicht erstattet werden. Wer einen Pass mit dem Vermerk eines anderen Staates hat, nimmt den Pass, mit dem er fliegt: die eTA wird an genau diese Passnummer gebunden.</p>
<h2>Wann beantragen</h2>
<p>Die meisten Anträge werden per E-Mail innerhalb von Minuten genehmigt. Manche brauchen mehrere Tage; dann kommt innerhalb von ${h.P.caFacts.docsWithinHours} Stunden eine E-Mail mit der Bitte um Unterlagen. Geben Sie unten das Flugdatum ein, um den letzten bequemen Antragstag zu sehen.</p>
<!--mini-->
<h2>Nach der Genehmigung</h2>
<p>Die eTA hängt an dem Pass, mit dem Sie beantragt haben: die Fluggesellschaft scannt ihn beim Check-in, ausdrucken müssen Sie nichts. Prüfen Sie, ob die Passnummer in der Bestätigungs-E-Mail genau stimmt; sonst beantragen Sie neu. Die eTA gilt bis zu ${f.caYears} Jahre oder bis zum Ablauf des Passes und garantiert keine Einreise: ein Grenzbeamter entscheidet bei der Ankunft. Die Seite ${h.a('ca-cost', 'eTA Kanada Kosten')} rechnet den Betrag für die Familie.</p>`;
    },
  },
  nl: {
    slug: 'eta-canada',
    nav: 'eTA Canada',
    card: 'Wie de Canadese eTA nodig heeft, landen met voorwaarden, Amerikanen en de enige officiële site.',
    title: 'eTA Canada 2026: wie hem nodig heeft, voorwaarden, aanvraag',
    description: 'De eTA voor Canada in 2026: welke paspoorten hem nodig hebben voor de vlucht, landen met voorwaarden, Amerikanen, green card en de officiële aanvraag.',
    h1: 'eTA Canada: wie hem nodig heeft en hoe u hem officieel aanvraagt',
    intro: 'Vul uw paspoort in: de check past de Canadese verordening toe en zegt of u een eTA, een eTA onder voorwaarden of een visum nodig hebt.',
    resume: (h) => {
      const f = F(h);
      return `De Canadese elektronische reisvergunning (eTA) is verplicht voor burgers van visumvrije landen die per vliegtuig naar Canada reizen of via een Canadese luchthaven overstappen, volgens artikel 7.01 van de Canadese immigratieverordening. Hij geldt voor ${f.caCount} nationaliteiten, waaronder Nederland, België en alle andere EU-landen. Over land of zee is hij niet nodig: wie met een huurauto vanuit de Verenigde Staten Canada binnenrijdt, toont alleen het paspoort. Amerikanen hebben geen eTA en geen visum nodig, en houders van een Amerikaanse green card zijn sinds ${h.date(h.P.caFacts.usPrExemptSince)} vrijgesteld. Burgers van ${f.caCondCount} andere landen, zoals Brazilië, Mexico, Marokko of de Filipijnen, krijgen de eTA voor de vlucht alleen als ze de laatste tien jaar een Canadees visum hadden of een geldig Amerikaans visum hebben; anders hebben ze een visum nodig. De eTA kost ${f.ca}, ongeveer ${f.caEur.replace('≈ ', '')}, wordt alleen op canada.ca aangevraagd, meestal binnen enkele minuten goedgekeurd en is tot ${f.caYears} jaar geldig of tot het paspoort verloopt.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Heb ik een eTA nodig als ik met de auto vanuit de VS naar Canada rijd?', a: 'Nee. De eTA is alleen verplicht voor reizen naar of via Canada per vliegtuig. Wie als visumvrije reiziger met auto, bus, trein of boot aankomt, bijvoorbeeld van Seattle naar Vancouver of bij de Niagarawatervallen, toont aan de grens een geldig paspoort. Ook voor de terugvlucht vanaf een Canadese luchthaven is dan geen eTA nodig.' },
        { q: 'Moet ik voor een overstap in Toronto een eTA hebben?', a: 'Ja. Canada vraagt de eTA ook van visumvrije reizigers die via een Canadese luchthaven overstappen, zelfs als ze de internationale zone niet verlaten. De officiële pagina zegt het in de eerste zin: de eTA geldt voor reizen naar Canada en voor transit door Canada. Wie via Toronto, Montreal of Vancouver vliegt, vraagt de eTA aan zoals voor een bezoek.' },
        { q: 'Voor welke landen geldt de eTA alleen onder voorwaarden?', a: `${cond(h)}. Hun burgers krijgen de eTA voor de vlucht alleen als ze in de tien jaar vóór de aanvraag een Canadees bezoekersvisum hadden of op de dag van de aanvraag een geldig Amerikaans niet-immigrantenvisum hebben. Anders hebben ze een bezoekersvisum van ${f.caVisa} nodig, dat langer duurt en biometrie vraagt.` },
        { q: 'Bestaat het eTA-formulier in het Nederlands?', a: `Het formulier zelf bestaat alleen in het Engels en het Frans. De Canadese overheid biedt wel uitleg bij elk veld in andere talen, waaronder het Nederlands. Houd paspoort en reisgegevens bij de hand, want het formulier kan niet tussentijds worden opgeslagen. Voor het tarief van ${f.ca} aanvaardt de site de gangbare creditcards en debitcards.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['NL', 'BE', 'LU', 'DE', 'FR', 'GB', 'IE', 'DK', 'SE', 'NO', 'IT', 'ES'].filter((c) => A.ca.etaNationals.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Wie een eTA nodig heeft</h2>
<p>Artikel 7.01 van de ${h.src('irpr', 'Canadese verordening')} noemt de landen waarvan de burgers geen visum, maar voor aankomst per vliegtuig wel een eTA nodig hebben. Onder de ${f.caCount}: ${sample}. De check leest die lijst, bijgewerkt tot ${h.date(A.ca.currentTo)} op de site Justice Laws.</p>
<h2>Landen met voorwaarden</h2>
<p>Voor ${f.caCondCount} landen staat de verordening de eTA voor de vlucht alleen toe als de reiziger in de tien jaar vóór de aanvraag ooit een Canadees bezoekersvisum had, of op de dag van de aanvraag een geldig Amerikaans niet-immigrantenvisum heeft. Indonesië en Maleisië kwamen erbij op ${h.date(h.P.caFacts.idMyConditionalSince)}. Alle anderen uit die landen vragen een bezoekersvisum van ${f.caVisa} aan.</p>
<h2>Wie geen eTA nodig heeft</h2>
<p>Amerikaanse staatsburgers; houders van een Amerikaanse green card met hun kaart; Canadese staatsburgers en permanente inwoners; wie al een geldig Canadees visum heeft; en iedereen die over land of zee aankomt.</p>
<h2>Zo vraagt u de eTA aan</h2>
<p>Het enige officiële formulier staat op ${h.src('caEta', 'canada.ca')}. U hebt een geldig paspoort nodig, een e-mailadres en een kaart voor de ${f.ca}, die niet worden terugbetaald. Met twee nationaliteiten gebruikt u het paspoort waarmee u vliegt: de eTA wordt aan precies dat paspoortnummer gekoppeld.</p>
<h2>Wanneer aanvragen</h2>
<p>De meeste aanvragen worden binnen enkele minuten per e-mail goedgekeurd. Sommige duren enkele dagen; dan komt binnen ${h.P.caFacts.docsWithinHours} uur een e-mail met een verzoek om documenten. Vul hieronder de vluchtdatum in om de laatste rustige dag voor de aanvraag te zien.</p>
<!--mini-->
<h2>Na de goedkeuring</h2>
<p>De eTA hangt aan het paspoort waarmee u aanvroeg: de luchtvaartmaatschappij scant het bij het inchecken, afdrukken hoeft niet. Controleer of het paspoortnummer in de bevestigingsmail precies klopt; anders vraagt u opnieuw aan. De eTA geldt tot ${f.caYears} jaar of tot het paspoort verloopt en garandeert geen toegang: een grensambtenaar beslist bij aankomst. De pagina ${h.a('ca-cost', 'eTA Canada kosten')} rekent het bedrag voor het gezin.</p>`;
    },
  },
});
