import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'esta',
  group: 'us',
  order: 1,
  tool: { kind: 'checker', dests: ['US'] },
  mini: { kind: 'overcharge', dest: 'US' },
  related: ['esta-cost', 'esta-apply', 'esta-validity', 'us-entry'],
  sources: ['estaApply', 'cbpEsta', 'frNotice', 'dhsVwp', 'usc1187'],
  en: {
    slug: 'esta-usa',
    nav: 'ESTA',
    card: 'Who needs an ESTA, the official fee, the only official address and how to spot a copy.',
    title: 'ESTA USA 2026: the $40.62 official fee and who needs one',
    description: 'ESTA for the USA: which 42 passports need one, the official $40.62 fee since 16 October 2026, the only official site esta.cbp.dhs.gov, and what copies charge.',
    h1: 'ESTA for the United States: official fee, who needs it, where to apply',
    intro: 'Pick your passport and the number of travellers: the checker tells you whether you need an ESTA or a visa and gives the official total.',
    resume: (h) => {
      const f = F(h);
      return `The ESTA (Electronic System for Travel Authorization) is the online permission that citizens of the ${f.vwpCount} Visa Waiver Program countries, including the United Kingdom, Ireland, Germany, the Netherlands, France, Japan and Australia, must hold before boarding a plane or ship to the United States, or before arriving at a land border, for visits of up to ${f.usStay} days. The official fee is ${f.us} per person since ${f.usSince}, set by the Federal Register notice of ${f.usNoticeDate}; if the application is refused, ${f.usDenied} is kept. Children pay the same as adults. The only official application site is esta.cbp.dhs.gov, run by US Customs and Border Protection (CBP). An approved ESTA lasts two years or until the passport expires, and it requires an e-passport with a chip. An ESTA is not a visa and does not guarantee entry: a CBP officer decides at the border. Anyone who has been in Iraq, Syria or a designated country since ${f.usIneligible} cannot use the ESTA and needs a visa.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Is the ESTA the same thing as a US visa?', a: `No. The ESTA only confirms that you may travel under the Visa Waiver Program, for tourism or business for up to ${f.usStay} days. A visa is issued by a US embassy after an interview and covers other purposes or longer stays. Under federal rules, being approved for an ESTA does not mean you are admissible: the CBP officer decides at the port of entry.` },
        { q: 'Why do some websites charge far more than the official ESTA fee?', a: `Because they add their own service charge to the government fee of ${f.us}. They take your passport details, submit the same CBP form and keep the difference. The decision comes from the same system and is not faster. On the official site esta.cbp.dhs.gov, the total for one traveller is ${f.us} and nothing more.` },
        { q: 'Does a Canadian or a US green card holder need an ESTA?', a: 'No. Canadian citizens visiting the United States need neither a visa nor an ESTA in most cases, and US lawful permanent residents enter with their green card. The ESTA is only for citizens of Visa Waiver Program countries who are not US citizens or residents.' },
        { q: 'Can I travel to the US with an ESTA by car from Canada?', a: 'Yes. Since the rule now covers land borders as well, a Visa Waiver Program traveller who drives in from Canada or Mexico must already have an approved ESTA when applying for admission at the border post. The fee and validity are the same as for air travel.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['GB', 'IE', 'DE', 'NL', 'FR', 'BE', 'IT', 'ES', 'JP', 'AU', 'NZ', 'KR'].filter((c) => A.us.vwp.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Who needs an ESTA</h2>
<p>The ESTA is for citizens of the ${f.vwpCount} countries in the Visa Waiver Program, listed on the ${h.src('dhsVwp', 'DHS page')}, among them ${sample}. They can visit the United States for tourism, family visits or business for up to ${f.usStay} days without a visa, provided they hold an approved ESTA and an e-passport. Everybody needs their own ESTA, babies included. Citizens of other countries apply for a visa at a US embassy; Canadians and US green card holders need neither.</p>
<h2>What the ESTA costs</h2>
<p>The ${h.src('frNotice', 'Federal Register notice')} of ${f.usNoticeDate} sets the fee at ${f.us} per approved application from ${f.usSince}: ${f.usPromo} for travel promotion, ${f.usDenied} for the cost of running the system and ${f.usHr1} added by the 2025 budget law. If CBP refuses the application, only the ${f.usDenied} system fee is charged. A family of four pays ${f.times(A.us.fee, 4).m}, about ${f.times(A.us.fee, 4).e.replace('≈ ', '')} at the ECB rate of ${f.fxDate}.</p>
<h2>The only official site</h2>
<p>CBP runs the application at ${h.src('estaApply', 'esta.cbp.dhs.gov')}. Every other address that offers an ESTA is a private intermediary, whatever its design or its use of the US flag. These sites fill in the same form and add a service charge; the decision still comes from CBP. If a site has already quoted you a price, enter it below to see the mark-up.</p>
<!--mini-->
<p>The test is the domain: the official form ends in .dhs.gov. If you paid an intermediary, you can still look up your application on the official site with your passport details to check that it was actually filed.</p>
<h2>Who cannot use the ESTA</h2>
<p>Federal law, at ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')}, excludes from the Visa Waiver Program anyone who has been present in Iraq, Syria or a country designated as a state sponsor of terrorism since ${f.usIneligible}, with narrow exceptions for official duties. Those travellers apply for a visa. A previous refusal, an overstay or certain criminal records also lead to a visa application; the ${h.a('esta-status', 'status page')} explains what to do after a refusal.</p>
<h2>Validity</h2>
<p>An approved ESTA lasts two years or until the passport expires, whichever comes first, and covers any number of trips. A new passport, a change of name or of citizenship means a new application; the ${h.a('esta-validity', 'validity page')} has a checker for your own dates.</p>`;
    },
  },
  de: {
    slug: 'esta-usa',
    nav: 'ESTA USA',
    card: 'Wer eine ESTA braucht, die amtliche Gebühr, die einzige amtliche Adresse und wie Sie Nachbauten erkennen.',
    title: 'ESTA USA 2026: amtliche Gebühr 40,62 $, wer sie braucht',
    description: 'ESTA für die USA: wer sie braucht, die amtliche Gebühr von 40,62 $ seit dem 16. Oktober 2026, die einzige amtliche Seite esta.cbp.dhs.gov, Nachbauten.',
    h1: 'ESTA USA: amtliche Gebühr, wer sie braucht und wo Sie sie beantragen',
    intro: 'Wählen Sie Ihren Pass und die Zahl der Reisenden: der Check zeigt, ob Sie eine ESTA oder ein Visum brauchen, und nennt den amtlichen Betrag.',
    resume: (h) => {
      const f = F(h);
      return `Die ESTA (Electronic System for Travel Authorization) ist die elektronische Reisegenehmigung, die Deutsche, Österreicher, Schweizer und die Bürger der übrigen ${f.vwpCount} Staaten des Visa Waiver Program vor jeder USA-Reise brauchen, für Aufenthalte bis ${f.usStay} Tage als Tourist oder Geschäftsreisender. Sie muss genehmigt sein, bevor Sie in Flugzeug oder Schiff steigen oder an einer Landgrenze einreisen. Die amtliche Gebühr beträgt seit dem ${f.usSince} ${f.us} pro Person, festgelegt in der Bekanntmachung im Federal Register vom ${f.usNoticeDate}, rund ${f.usEur.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}; bei einer Ablehnung werden ${f.usDenied} einbehalten. Kinder zahlen gleich viel wie Erwachsene. Beantragt wird ausschließlich auf esta.cbp.dhs.gov, der Seite der US-Grenzschutzbehörde CBP. Jede andere Adresse ist ein privater Vermittler, der dasselbe Formular ausfüllt und einen Aufschlag nimmt. Die ESTA gilt zwei Jahre oder bis zum Ablauf des Passes und setzt einen elektronischen Reisepass voraus. Sie ist kein Visum: an der Grenze entscheidet ein CBP-Beamter.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Warum verlangen manche Seiten für die ESTA ein Vielfaches der Gebühr?', a: `Weil diese Seiten zur amtlichen Gebühr von ${f.us} eine eigene Servicegebühr schlagen. Sie übernehmen Ihre Passdaten, reichen dasselbe Formular bei der CBP ein und behalten die Differenz. Die Entscheidung kommt aus demselben System und nicht schneller. Auf esta.cbp.dhs.gov zahlen Sie für eine Person ${f.us}, rund ${f.usEur.replace('≈ ', '')}, und nichts darüber hinaus.` },
        { q: 'Ist die ESTA dasselbe wie ein USA-Visum?', a: `Nein. Die ESTA bestätigt nur, dass Sie im Rahmen des Visa Waiver Program reisen dürfen, für Urlaub oder Geschäftstermine bis ${f.usStay} Tage. Ein Visum stellt die US-Botschaft nach einem Gespräch aus, für andere Zwecke oder längere Aufenthalte. Eine genehmigte ESTA ist laut Bundesrecht keine Garantie für die Einreise: der CBP-Beamte entscheidet am Flughafen.` },
        { q: 'Reicht mein Kinderreisepass für die ESTA?', a: 'Nur wenn er ein elektronischer Pass mit Chip ist. Für das Visa Waiver Program verlangt das DHS einen E-Pass, erkennbar am Chip-Symbol auf dem Umschlag. Der frühere deutsche Kinderreisepass ohne Chip genügt dafür nicht; für das Kind ist dann ein Reisepass mit Chip oder ein Visum nötig. Prüfen Sie das früh, denn ein neuer Pass braucht Zeit.' },
        { q: 'Brauche ich für den Umstieg in den USA eine ESTA?', a: 'Ja. Auch wer in New York, Miami oder Los Angeles nur umsteigt, zum Beispiel nach Mexiko oder in die Karibik, reist formell in die USA ein und braucht eine genehmigte ESTA oder ein Visum. Einen Transitbereich ohne Einreise gibt es an US-Flughäfen nicht. Die Gebühr ist dieselbe wie für einen Urlaub.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['DE', 'AT', 'CH', 'NL', 'BE', 'LU', 'FR', 'IT', 'ES', 'PL', 'GB', 'IE'].filter((c) => A.us.vwp.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Wer eine ESTA braucht</h2>
<p>Die ESTA gilt für die Bürger der ${f.vwpCount} Staaten des Visa Waiver Program, die das ${h.src('dhsVwp', 'US-Heimatschutzministerium')} aufführt, darunter ${sample}. Sie reisen ohne Visum bis zu ${f.usStay} Tage in die USA, als Tourist, für Familienbesuche oder Geschäftstermine, wenn sie eine genehmigte ESTA und einen elektronischen Reisepass haben. Jeder Reisende braucht eine eigene ESTA, auch ein Baby. Wer einen Pass eines anderen Staates hat, beantragt ein Visum; wer eine Green Card hat, braucht keine ESTA.</p>
<h2>Was die ESTA kostet</h2>
<p>Die ${h.src('frNotice', 'Bekanntmachung im Federal Register')} vom ${f.usNoticeDate} setzt die Gebühr ab dem ${f.usSince} auf ${f.us} pro genehmigtem Antrag fest: ${f.usPromo} Tourismusabgabe, ${f.usDenied} für den Betrieb des Systems und ${f.usHr1}, die das Haushaltsgesetz von 2025 hinzugefügt hat. Lehnt die CBP ab, werden nur die ${f.usDenied} für den Systembetrieb berechnet. Eine vierköpfige Familie zahlt ${f.times(A.us.fee, 4).m}, rund ${f.times(A.us.fee, 4).e.replace('≈ ', '')} zum EZB-Kurs vom ${f.fxDate}. Ihre Bank rechnet am Zahltag mit ihrem eigenen Kurs und kann eine Auslandsgebühr berechnen.</p>
<h2>Die einzige amtliche Seite</h2>
<p>Die CBP betreibt den Antrag auf ${h.src('estaApply', 'esta.cbp.dhs.gov')}. Jede andere Adresse, die eine ESTA anbietet, gehört einem privaten Vermittler, auch wenn sie mit US-Flagge, Adler oder „offiziell“ wirbt. Diese Seiten füllen dasselbe Formular aus und verlangen einen Aufschlag; die Entscheidung trifft trotzdem die CBP. Wurde Ihnen schon ein Preis genannt, geben Sie ihn unten ein: Sie sehen, wie viel davon nicht an die US-Regierung geht.</p>
<!--mini-->
<p>Das Erkennungszeichen ist die Adresse: das amtliche Formular endet auf .dhs.gov. Haben Sie bei einem Vermittler bezahlt, können Sie Ihren Antrag auf der amtlichen Seite mit Ihren Passdaten abrufen und prüfen, ob er überhaupt eingereicht wurde. Wegen einer überhöhten Servicegebühr wenden Sie sich an Ihre Kartenbank.</p>
<h2>Wer die ESTA nicht nutzen kann</h2>
<p>Das US-Bundesgesetz, ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')}, schließt vom Visa Waiver Program aus, wer sich seit dem ${f.usIneligible} im Irak, in Syrien oder in einem als Terrorunterstützer eingestuften Staat aufgehalten hat, mit engen Ausnahmen für dienstliche Reisen. Diese Reisenden beantragen ein Visum. Auch nach einer früheren Ablehnung oder einer Überziehung des Aufenthalts führt der Weg meist über das Visum; mehr dazu auf der Seite ${h.a('esta-status', 'ESTA-Status prüfen')}.</p>
<h2>Gültigkeit</h2>
<p>Eine genehmigte ESTA gilt zwei Jahre oder bis zum Ablauf des Passes, je nachdem, was früher eintritt, und für beliebig viele Reisen. Ein neuer Pass, ein neuer Name oder eine neue Staatsangehörigkeit erfordern einen neuen Antrag; die Seite ${h.a('esta-validity', 'ESTA-Gültigkeit')} prüft Ihre eigenen Daten.</p>`;
    },
  },
  nl: {
    slug: 'esta-usa',
    nav: 'ESTA USA',
    card: 'Wie een ESTA nodig heeft, het officiële tarief, het enige officiële adres en hoe u een namaaksite herkent.',
    title: 'ESTA USA 2026: officieel tarief 40,62 $, wie hem nodig heeft',
    description: 'ESTA voor de VS: wie hem nodig heeft, het officiële tarief van 40,62 $ sinds 16 oktober 2026, de enige officiële site esta.cbp.dhs.gov en wat kopieën vragen.',
    h1: 'ESTA USA: officieel tarief, wie hem nodig heeft en waar u aanvraagt',
    intro: 'Kies uw paspoort en het aantal reizigers: de check laat zien of u een ESTA of een visum nodig hebt en geeft het officiële totaal.',
    resume: (h) => {
      const f = F(h);
      return `De ESTA (Electronic System for Travel Authorization) is de elektronische reisvergunning die Nederlanders, Belgen en de burgers van de andere ${f.vwpCount} landen van het Visa Waiver Program nodig hebben voor elke reis naar de Verenigde Staten, voor verblijven tot ${f.usStay} dagen als toerist of voor zaken. Hij moet goedgekeurd zijn voordat u aan boord gaat van een vliegtuig of schip, of voordat u bij een landgrens aankomt. Het officiële tarief is sinds ${f.usSince} ${f.us} per persoon, vastgelegd in de bekendmaking in het Federal Register van ${f.usNoticeDate}, ongeveer ${f.usEur.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}; bij een weigering wordt ${f.usDenied} ingehouden. Kinderen betalen evenveel als volwassenen. Aanvragen kan alleen op esta.cbp.dhs.gov, de site van de Amerikaanse grensbewaking CBP. Elk ander adres is een private tussenpersoon die hetzelfde formulier invult en een toeslag rekent. De ESTA geldt twee jaar of tot het paspoort verloopt en vereist een elektronisch paspoort. Hij is geen visum: aan de grens beslist een CBP-ambtenaar.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Waarom vragen sommige sites veel meer dan het officiële ESTA-tarief?', a: `Omdat die sites hun eigen servicekosten optellen bij het officiële tarief van ${f.us}. Ze nemen uw paspoortgegevens over, dienen hetzelfde formulier in bij CBP en houden het verschil. De beslissing komt uit hetzelfde systeem en niet sneller. Op esta.cbp.dhs.gov betaalt u voor één persoon ${f.us}, ongeveer ${f.usEur.replace('≈ ', '')}, en niets meer.` },
        { q: 'Is een ESTA hetzelfde als een visum voor Amerika?', a: `Nee. De ESTA bevestigt alleen dat u onder het Visa Waiver Program mag reizen, voor vakantie of zaken tot ${f.usStay} dagen. Een visum geeft de Amerikaanse ambassade na een gesprek af, voor andere doelen of langere verblijven. Een goedgekeurde ESTA is volgens de federale regels geen garantie op toegang: de CBP-ambtenaar beslist op de luchthaven.` },
        { q: 'Moet ik voor een overstap in de VS ook een ESTA hebben?', a: 'Ja. Wie in New York, Atlanta of Miami alleen overstapt, bijvoorbeeld naar Mexico, Aruba of Curaçao, reist formeel de Verenigde Staten binnen en heeft een goedgekeurde ESTA of een visum nodig. Een transitzone zonder grenscontrole bestaat op Amerikaanse luchthavens niet. Het tarief is hetzelfde als voor een vakantie.' },
        { q: 'Kan ik met een Nederlandse identiteitskaart een ESTA aanvragen?', a: 'Nee. De ESTA wordt aangevraagd met een paspoort en blijft aan dat paspoortnummer gekoppeld. Voor het Visa Waiver Program eist het Amerikaanse ministerie van Binnenlandse Veiligheid een elektronisch paspoort met chip, herkenbaar aan het chipsymbool op de omslag. Een identiteitskaart wordt voor reizen naar de Verenigde Staten niet aanvaard.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const sample = ['NL', 'BE', 'LU', 'DE', 'FR', 'GB', 'IE', 'IT', 'ES', 'PT', 'DK', 'SE'].filter((c) => A.us.vwp.includes(c)).map((c) => h.land(c)).join(', ');
      return `<h2>Wie een ESTA nodig heeft</h2>
<p>De ESTA geldt voor de burgers van de ${f.vwpCount} landen van het Visa Waiver Program, die het ${h.src('dhsVwp', 'Amerikaanse ministerie van Binnenlandse Veiligheid')} opsomt, waaronder ${sample}. Zij reizen zonder visum tot ${f.usStay} dagen naar de Verenigde Staten, als toerist, voor familiebezoek of voor zaken, met een goedgekeurde ESTA en een elektronisch paspoort. Elke reiziger heeft een eigen ESTA nodig, ook een baby. Wie een paspoort van een ander land heeft, vraagt een visum aan; wie een green card heeft, heeft geen ESTA nodig.</p>
<h2>Wat de ESTA kost</h2>
<p>De ${h.src('frNotice', 'bekendmaking in het Federal Register')} van ${f.usNoticeDate} legt het tarief vanaf ${f.usSince} vast op ${f.us} per goedgekeurde aanvraag: ${f.usPromo} toerismeheffing, ${f.usDenied} voor de kosten van het systeem en ${f.usHr1} die de begrotingswet van 2025 toevoegde. Weigert CBP de aanvraag, dan wordt alleen de ${f.usDenied} voor het systeem gerekend. Een gezin van vier betaalt ${f.times(A.us.fee, 4).m}, ongeveer ${f.times(A.us.fee, 4).e.replace('≈ ', '')} tegen de ECB-koers van ${f.fxDate}. Uw bank rekent op de betaaldag met haar eigen koers en kan buitenlandkosten toevoegen.</p>
<h2>De enige officiële site</h2>
<p>CBP beheert de aanvraag op ${h.src('estaApply', 'esta.cbp.dhs.gov')}. Elk ander adres dat een ESTA aanbiedt, is van een private tussenpersoon, ook als het met de Amerikaanse vlag, een adelaar of het woord “officieel” werkt. Zulke sites vullen hetzelfde formulier in en vragen een toeslag; de beslissing neemt nog steeds CBP. Is u al een prijs genoemd, vul die hieronder in: u ziet hoeveel ervan niet naar de Amerikaanse overheid gaat.</p>
<!--mini-->
<p>Het herkenningsteken is het adres: het officiële formulier eindigt op .dhs.gov. Hebt u bij een tussenpersoon betaald, dan kunt u uw aanvraag op de officiële site opzoeken met uw paspoortgegevens en controleren of hij echt is ingediend. Voor te hoge servicekosten neemt u contact op met uw bank.</p>
<h2>Wie de ESTA niet kan gebruiken</h2>
<p>De Amerikaanse federale wet, ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')}, sluit van het Visa Waiver Program uit wie sinds ${f.usIneligible} in Irak, Syrië of een als terreursponsor aangewezen land is geweest, met smalle uitzonderingen voor dienstreizen. Die reizigers vragen een visum aan. Ook na een eerdere weigering of een te lang verblijf loopt de weg meestal via het visum.</p>
<h2>Geldigheid</h2>
<p>Een goedgekeurde ESTA geldt twee jaar of tot het paspoort verloopt, wat het eerst komt, voor zoveel reizen als u wilt. Een nieuw paspoort, een nieuwe naam of een andere nationaliteit vraagt om een nieuwe aanvraag; de pagina ${h.a('esta-validity', 'ESTA-geldigheid')} controleert uw eigen data.</p>`;
    },
  },
});
