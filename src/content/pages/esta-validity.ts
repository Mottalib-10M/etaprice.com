import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'esta-validity',
  group: 'us',
  order: 4,
  tool: { kind: 'validity', dest: 'US' },
  mini: { kind: 'cost', dest: 'US' },
  related: ['esta', 'esta-apply', 'esta-status', 'us-entry'],
  sources: ['ecfr2175', 'estaApply', 'dhsVwp', 'frNotice'],
  en: {
    slug: 'esta-validity',
    nav: 'ESTA validity',
    card: 'Two years or until the passport expires: check whether your ESTA still covers your next trip.',
    title: 'ESTA validity: two years or until your passport expires',
    description: 'How long an ESTA lasts: two years from approval or until the passport expires. Check your own dates, the 90-day rule per visit, and when a new ESTA is required.',
    h1: 'ESTA validity: does your ESTA still cover the next trip?',
    intro: 'Enter the date your ESTA was approved, your passport expiry and your arrival date: the calculator applies the rule in 8 CFR 217.5.',
    resume: (h) => {
      const f = F(h);
      return `Under 8 CFR 217.5(d), an ESTA is valid for two years from the date it is issued, unless the passport expires sooner, in which case the ESTA ends on the passport’s expiry date. During that time you can travel to the United States as often as you like, but each visit under the Visa Waiver Program is limited to ${f.usStay} days, and the ESTA must be valid on the day you arrive, not for the whole stay. The rule in section 217.5(e) lists five events that cancel the old authorisation and require a new application at the current fee of ${f.us}: a new passport, a change of name, a change of gender, a change of citizenship, or a change in the facts behind an answer to one of the yes-or-no eligibility questions. Renewing a passport early, after a loss or because it is full therefore means paying again, even if the old ESTA had months left. The calculator above applies these dates to your own case.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'My ESTA expires during my stay in the United States. Is that a problem?', a: `No, as long as it is valid on the day you enter. The ESTA authorises you to travel and to apply for admission; the length of your stay is then set by the CBP officer, up to ${f.usStay} days under the Visa Waiver Program. You do not need to renew the ESTA in the middle of a trip, only before the next arrival.` },
        { q: 'Can I renew my ESTA before it expires?', a: `There is no renewal as such: you file a new application, which replaces the old one, and pay ${f.us} again. You can do this at any time, for example a few weeks before a trip that falls after the expiry date. The new authorisation runs for two years from its own approval date.` },
        { q: 'Do 90 days on an ESTA reset when I leave the United States?', a: `Each admission under the Visa Waiver Program is for up to ${f.usStay} days, but a short trip to Canada, Mexico or the Caribbean islands does not restart the count if you come back to the United States. CBP can also refuse entry to someone who seems to be living in the country through back-to-back visits.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>The rule in the regulation</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5(d)(1)')} sets the general rule: two years from issuance, or until the passport expires if that comes first. The regulation also allows the period to be changed for a given country, with notice in the Federal Register, and the official ESTA site is then updated for that country. Unless such a notice concerns your passport, the period is two years for every one of the ${f.vwpCount} participating countries; ${h.src('estaApply', 'esta.cbp.dhs.gov')} shows the expiry date of your own ESTA.</p>
${h.table(['ESTA approved', 'Passport expires', 'ESTA valid until'], [[h.date('2026-03-10'), h.date('2031-06-01'), h.date('2028-03-09')], [h.date('2026-03-10'), h.date('2027-01-15'), h.date('2027-01-15')], [h.date('2025-11-02'), h.date('2030-08-20'), h.date('2027-11-01')]], 'Worked examples of the two-year rule', ['l', 'l', 'l'])}
<h2>What cancels an ESTA early</h2>
<p>Section 217.5(e) requires a new authorisation if you get a new passport, change your name, change your gender, change your citizenship, or if the circumstances behind a yes-or-no answer have changed, for example a new arrest or a trip to a designated country. CBP can also revoke an ESTA at any time.</p>
<h2>Validity is not the same as length of stay</h2>
<p>The ESTA is valid for two years; a visit lasts at most ${f.usStay} days. The officer at the border decides how long you may stay on each entry and records it electronically. Overstaying, even by a few days, usually ends your right to use the ESTA in future and means applying for a visa.</p>
<h2>When you need a new one</h2>
<p>If your dates show that the ESTA will not cover the arrival, apply again on the official site before you travel. Each person in the group needs a new one; enter the number of travellers below to see the total.</p>
<!--mini-->
<p>The fee in force on the day you apply is the one you pay: ${f.us} since ${f.usSince}. The ${h.a('esta-cost', 'cost page')} explains what the fee is made of, and the ${h.a('esta-status', 'status page')} how to check an application.</p>`;
    },
  },
  de: {
    slug: 'esta-gueltigkeit',
    nav: 'ESTA-Gültigkeit',
    card: 'Zwei Jahre oder bis zum Ablauf des Passes: prüfen Sie, ob Ihre ESTA die nächste Reise noch abdeckt.',
    title: 'ESTA Gültigkeit: zwei Jahre oder bis zum Ablauf des Passes',
    description: 'Wie lange die ESTA gilt: zwei Jahre ab Genehmigung oder bis zum Ablauf des Passes. Ihre eigenen Daten, die 90-Tage-Regel und wann eine neue ESTA nötig ist.',
    h1: 'ESTA-Gültigkeit: deckt Ihre ESTA die nächste Reise noch ab?',
    intro: 'Geben Sie das Genehmigungsdatum der ESTA, den Ablauf Ihres Passes und das Ankunftsdatum ein: der Rechner wendet die Regel aus 8 CFR 217.5 an.',
    resume: (h) => {
      const f = F(h);
      return `Nach der US-Verordnung 8 CFR 217.5(d) gilt eine ESTA zwei Jahre ab dem Tag der Genehmigung, es sei denn, der Reisepass läuft früher ab; dann endet die ESTA mit dem Pass. In dieser Zeit können Sie beliebig oft in die USA reisen, jeder Aufenthalt im Visa Waiver Program ist aber auf ${f.usStay} Tage begrenzt, und die ESTA muss am Tag der Einreise gültig sein, nicht während des ganzen Aufenthalts. Abschnitt 217.5(e) nennt fünf Ereignisse, nach denen die alte Genehmigung nicht mehr gilt und ein neuer Antrag zur aktuellen Gebühr von ${f.us} nötig ist: ein neuer Pass, ein neuer Name, ein geändertes Geschlecht, eine geänderte Staatsangehörigkeit oder geänderte Tatsachen hinter einer Ja-Nein-Antwort. Wer seinen Pass vorzeitig erneuert, etwa nach Verlust, zahlt also erneut, auch wenn die alte ESTA noch Monate gegolten hätte. Der Rechner oben wendet diese Regeln auf Ihre Daten an; das Ergebnis ist eine Rechnung, keine Auskunft der CBP.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Meine ESTA läuft während des USA-Urlaubs ab. Ist das ein Problem?', a: `Nein, solange sie am Tag der Einreise gültig ist. Die ESTA berechtigt zur Reise und zum Antrag auf Einreise; wie lange Sie bleiben dürfen, legt dann der CBP-Beamte fest, höchstens ${f.usStay} Tage im Visa Waiver Program. Eine Verlängerung mitten in der Reise ist nicht nötig, nur vor der nächsten Einreise.` },
        { q: 'Kann ich die ESTA vor Ablauf verlängern?', a: `Eine Verlängerung gibt es nicht: Sie stellen einen neuen Antrag, der den alten ersetzt, und zahlen erneut ${f.us}. Das geht jederzeit, zum Beispiel einige Wochen vor einer Reise, die nach dem Ablaufdatum liegt. Die neue Genehmigung gilt zwei Jahre ab ihrem eigenen Genehmigungsdatum.` },
        { q: 'Beginnen die 90 Tage neu, wenn ich kurz nach Kanada oder Mexiko fahre?', a: `Nein. Jede Einreise im Visa Waiver Program gilt für höchstens ${f.usStay} Tage, aber ein Abstecher nach Kanada, Mexiko oder auf die Karibikinseln setzt die Zählung bei der Rückkehr in die USA nicht zurück. Die CBP kann außerdem die Einreise verweigern, wenn jemand durch aufeinanderfolgende Besuche dort zu wohnen scheint.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>Die Regel in der Verordnung</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5(d)(1)')} legt die Grundregel fest: zwei Jahre ab Ausstellung oder bis zum Ablauf des Passes, wenn das früher ist. Die Verordnung erlaubt, die Dauer für einzelne Staaten zu ändern, mit Bekanntmachung im Federal Register, die amtliche ESTA-Seite wird dann für diesen Staat angepasst. Solange keine solche Bekanntmachung Ihren Pass betrifft, gelten für alle ${f.vwpCount} Teilnehmerstaaten, Deutschland, Österreich und die Schweiz eingeschlossen, zwei Jahre; ${h.src('estaApply', 'esta.cbp.dhs.gov')} zeigt das Ablaufdatum Ihrer eigenen ESTA.</p>
${h.table(['ESTA genehmigt', 'Pass läuft ab', 'ESTA gültig bis'], [[h.date('2026-03-10'), h.date('2031-06-01'), h.date('2028-03-09')], [h.date('2026-03-10'), h.date('2027-01-15'), h.date('2027-01-15')], [h.date('2025-11-02'), h.date('2030-08-20'), h.date('2027-11-01')]], 'Rechenbeispiele zur Zwei-Jahres-Regel', ['l', 'l', 'l'])}
<h2>Was eine ESTA vorzeitig beendet</h2>
<p>Abschnitt 217.5(e) verlangt eine neue Genehmigung bei neuem Pass, neuem Namen, geändertem Geschlecht oder geänderter Staatsangehörigkeit und wenn sich die Umstände hinter einer Ja-Nein-Antwort geändert haben, etwa eine neue Festnahme oder eine Reise in einen gelisteten Staat. Eine Heirat mit Namenswechsel ist der häufigste Fall. Die CBP kann eine ESTA außerdem jederzeit widerrufen.</p>
<h2>Gültigkeit ist nicht Aufenthaltsdauer</h2>
<p>Die ESTA gilt zwei Jahre; ein Aufenthalt dauert höchstens ${f.usStay} Tage. Der Grenzbeamte entscheidet bei jeder Einreise, wie lange Sie bleiben dürfen, und erfasst das elektronisch. Wer überzieht, auch nur um wenige Tage, verliert in der Regel das Recht, künftig mit ESTA zu reisen, und muss ein Visum beantragen.</p>
<h2>Wenn Sie eine neue brauchen</h2>
<p>Zeigen Ihre Daten, dass die ESTA die Einreise nicht abdeckt, beantragen Sie vor der Reise eine neue auf der amtlichen Seite. Jede Person in der Gruppe braucht eine eigene; geben Sie unten die Zahl der Reisenden ein, um den Betrag zu sehen.</p>
<!--mini-->
<p>Sie zahlen die Gebühr, die am Tag des Antrags gilt: ${f.us} seit dem ${f.usSince}. Die Seite ${h.a('esta-cost', 'ESTA-Kosten')} erklärt, woraus sie besteht, die Seite ${h.a('esta-status', 'ESTA-Status prüfen')} die Abfrage eines Antrags.</p>`;
    },
  },
  nl: {
    slug: 'esta-geldigheid',
    nav: 'ESTA-geldigheid',
    card: 'Twee jaar of tot het paspoort verloopt: controleer of uw ESTA de volgende reis nog dekt.',
    title: 'ESTA geldigheid: twee jaar of tot uw paspoort verloopt',
    description: 'Hoe lang een ESTA geldig is: twee jaar na goedkeuring of tot het paspoort verloopt. Controleer uw data, de 90-dagenregel en wanneer een nieuwe ESTA moet.',
    h1: 'ESTA-geldigheid: dekt uw ESTA de volgende reis nog?',
    intro: 'Vul de datum van goedkeuring van de ESTA, de vervaldatum van uw paspoort en uw aankomstdatum in: de rekenhulp past de regel uit 8 CFR 217.5 toe.',
    resume: (h) => {
      const f = F(h);
      return `Volgens de Amerikaanse verordening 8 CFR 217.5(d) is een ESTA twee jaar geldig vanaf de dag van goedkeuring, tenzij het paspoort eerder verloopt; dan eindigt de ESTA met het paspoort. In die periode reist u zo vaak naar de Verenigde Staten als u wilt, maar elk verblijf onder het Visa Waiver Program duurt hoogstens ${f.usStay} dagen, en de ESTA moet geldig zijn op de dag van aankomst, niet tijdens het hele verblijf. Artikel 217.5(e) noemt vijf gebeurtenissen waarna de oude vergunning niet meer geldt en een nieuwe aanvraag tegen het huidige tarief van ${f.us} nodig is: een nieuw paspoort, een nieuwe naam, een ander geslacht, een andere nationaliteit of veranderde feiten achter een ja-neeantwoord. Wie zijn paspoort vervroegd vernieuwt, bijvoorbeeld na verlies, betaalt dus opnieuw, ook al had de oude ESTA nog maanden gegolden. De rekenhulp hierboven past deze regels toe op uw eigen data; de uitkomst is een berekening, geen uitspraak van CBP.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Mijn ESTA verloopt tijdens mijn vakantie in Amerika. Is dat erg?', a: `Nee, zolang hij geldig is op de dag dat u binnenkomt. De ESTA geeft toestemming om te reizen en om toegang te vragen; hoe lang u mag blijven, bepaalt daarna de CBP-ambtenaar, hoogstens ${f.usStay} dagen onder het Visa Waiver Program. Halverwege de reis vernieuwen is niet nodig, alleen vóór de volgende aankomst.` },
        { q: 'Kan ik mijn ESTA verlengen voordat hij afloopt?', a: `Verlengen bestaat niet: u dient een nieuwe aanvraag in, die de oude vervangt, en betaalt opnieuw ${f.us}. Dat kan op elk moment, bijvoorbeeld een paar weken vóór een reis die na de vervaldatum valt. De nieuwe vergunning geldt twee jaar vanaf haar eigen datum van goedkeuring.` },
        { q: 'Beginnen de 90 dagen opnieuw na een uitstapje naar Canada of Mexico?', a: `Nee. Elke toegang onder het Visa Waiver Program geldt voor hoogstens ${f.usStay} dagen, maar een korte reis naar Canada, Mexico of de Caraïbische eilanden zet de telling bij terugkeer in de Verenigde Staten niet terug. CBP kan bovendien de toegang weigeren aan wie door opeenvolgende bezoeken in het land lijkt te wonen.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>De regel in de verordening</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5(d)(1)')} legt de hoofdregel vast: twee jaar vanaf afgifte, of tot het paspoort verloopt als dat eerder is. De verordening staat toe de duur per land te wijzigen, met bekendmaking in het Federal Register, de officiële ESTA-site wordt dan voor dat land aangepast. Zolang zo’n bekendmaking uw paspoort niet betreft, geldt voor alle ${f.vwpCount} deelnemende landen, Nederland en België inbegrepen, twee jaar; ${h.src('estaApply', 'esta.cbp.dhs.gov')} toont de vervaldatum van uw eigen ESTA.</p>
${h.table(['ESTA goedgekeurd', 'Paspoort verloopt', 'ESTA geldig tot'], [[h.date('2026-03-10'), h.date('2031-06-01'), h.date('2028-03-09')], [h.date('2026-03-10'), h.date('2027-01-15'), h.date('2027-01-15')], [h.date('2025-11-02'), h.date('2030-08-20'), h.date('2027-11-01')]], 'Rekenvoorbeelden van de tweejaarsregel', ['l', 'l', 'l'])}
<h2>Wat een ESTA eerder beëindigt</h2>
<p>Artikel 217.5(e) eist een nieuwe vergunning bij een nieuw paspoort, een nieuwe naam, een ander geslacht of een andere nationaliteit, en als de omstandigheden achter een ja-neeantwoord veranderd zijn, bijvoorbeeld een nieuwe arrestatie of een reis naar een aangewezen land. Een huwelijk met naamswijziging is het meest voorkomende geval. CBP kan een ESTA bovendien op elk moment intrekken.</p>
<h2>Geldigheid is geen verblijfsduur</h2>
<p>De ESTA geldt twee jaar; een verblijf duurt hoogstens ${f.usStay} dagen. De grensambtenaar beslist bij elke aankomst hoe lang u mag blijven en legt dat elektronisch vast. Wie te lang blijft, ook maar een paar dagen, verliest meestal het recht om in de toekomst met een ESTA te reizen en moet een visum aanvragen.</p>
<h2>Als u een nieuwe nodig hebt</h2>
<p>Blijkt uit uw data dat de ESTA de aankomst niet dekt, vraag dan vóór de reis een nieuwe aan op de officiële site. Elke persoon in het gezelschap heeft er een nodig; vul hieronder het aantal reizigers in om het totaal te zien.</p>
<!--mini-->
<p>U betaalt het tarief dat geldt op de dag van de aanvraag: ${f.us} sinds ${f.usSince}. De pagina ${h.a('esta-cost', 'ESTA-kosten')} legt uit waaruit het bestaat.</p>`;
    },
  },
});
