import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'esta-status',
  group: 'us',
  order: 5,
  tool: { kind: 'denied' },
  mini: { kind: 'validity', dest: 'US' },
  related: ['esta', 'esta-apply', 'esta-validity', 'us-entry'],
  sources: ['estaApply', 'ecfr2175', 'usc1187', 'frNotice'],
  en: {
    slug: 'esta-status',
    nav: 'ESTA status',
    card: 'How to check an ESTA on the official site, what each status means, and what a refusal costs.',
    title: 'ESTA status check: approved, pending, travel not authorized',
    description: 'How to check your ESTA status on esta.cbp.dhs.gov, what approved, pending and travel not authorized mean, what a refusal costs and why the next step is a visa.',
    h1: 'ESTA status: how to check it and what to do after a refusal',
    intro: 'If someone in your group was refused, enter the numbers: the calculator shows what CBP kept. The steps to check a status follow below.',
    resume: (h) => {
      const f = F(h);
      return `You check an ESTA on the official site esta.cbp.dhs.gov, under the option to check an existing application, with either the application number or the passport number, date of birth and passport issue and expiry dates. The site shows one of three results: authorisation approved, which means you may travel and lasts two years or until the passport expires; authorisation pending, which means CBP has not yet decided and you should check again before booking anything you cannot cancel; and travel not authorized, which means you cannot use the Visa Waiver Program for this trip. A refused application is not free: ${f.usDenied} of the ${f.us} fee is kept to cover the system. Federal rules state that a refusal is not a finding that you are ineligible for a visa and is not open to judicial review, so the way forward is a visa application at a US embassy or consulate. Applying again for an ESTA with the same answers usually brings the same result.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Can I appeal an ESTA refusal?', a: 'No. Under 8 CFR 217.5(f), an ESTA determination is not subject to judicial review, and there is no appeal form on the ESTA site. The regulation also says that a refusal does not mean you are ineligible for a visa. The practical route is to apply for a nonimmigrant visa at a US embassy or consulate, explaining your situation at the interview.' },
        { q: 'My ESTA shows pending. Should I book my flight?', a: 'Wait if you can. Pending means CBP has not yet decided, and you cannot board a plane or ship to the United States without an approved ESTA. CBP itself advises applying before you buy tickets for that reason. If you have already booked, check the status again on the official site and keep the application number to hand.' },
        { q: 'Why might an ESTA be refused?', a: `CBP does not give detailed reasons. The law and the eligibility questions point to the usual causes: a yes answer on health, arrests or previous refusals, an earlier overstay in the United States, or presence in Iraq, Syria or a designated country since ${f.usIneligible}, which is a statutory bar. Errors in the passport details can also cause trouble.` },
        { q: 'Can an approved ESTA be cancelled later?', a: 'Yes. The regulation allows the Secretary of Homeland Security to revoke an ESTA at any time, and a new application is required after a new passport, a change of name, gender or citizenship, or a change behind an eligibility answer. Check the status on the official site a few days before each trip, not only after applying.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>How to check a status</h2>
<p>Open ${h.src('estaApply', 'esta.cbp.dhs.gov')} and choose to check an existing application. For one person, the passport number, date of birth and the passport issue and expiry dates are enough; for a group, the group number. The answer is the same as the one CBP holds: there is no other place where an ESTA can be checked, and a third-party site can only look it up on your behalf.</p>
<h2>The three results</h2>
${h.table(['Status on the official site', 'What it means', 'What to do'], [['Authorization approved', 'You may board and apply for admission', 'Note the expiry date'], ['Authorization pending', 'No decision yet', 'Check again before paying for travel'], ['Travel not authorized', 'No Visa Waiver travel for now', 'Apply for a visa']], 'ESTA results as shown in English on the CBP site', ['l', 'l', 'l'])}
<h2>What a refusal costs</h2>
<p>The ${h.src('frNotice', 'Federal Register notice')} keeps ${f.usDenied} per refused application, the part that covers the cost of the system; the other ${h.money({ amount: Math.round((f.A.us.fee.amount - f.A.us.feeIfDenied.amount) * 100) / 100, currency: 'USD' })} is only charged on approval. The calculator at the top adds up a group with refusals.</p>
<h2>After a refusal</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5(f)(2)')} says a refusal is not a determination that you are ineligible for a visa and does not prevent you from applying for one at a consulate. That is the next step: a B-1 or B-2 visa application, with its own fee and an interview. Do not pay a site that promises to overturn the decision; nobody can.</p>
<h2>Is the approved ESTA still valid?</h2>
<p>An approved ESTA ends after two years or with the passport. Enter your dates below to see whether it covers your next arrival.</p>
<!--mini-->
<p>The statutory bar in ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')}, for travellers who have been in Iraq, Syria or a designated country since ${f.usIneligible}, applies even with a valid ESTA if the trip took place later; such a traveller needs a visa for the next visit.</p>`;
    },
  },
  de: {
    slug: 'esta-status-pruefen',
    nav: 'ESTA-Status prüfen',
    card: 'So prüfen Sie eine ESTA auf der amtlichen Seite, was jeder Status bedeutet und was eine Ablehnung kostet.',
    title: 'ESTA Status prüfen: genehmigt, ausstehend oder abgelehnt',
    description: 'So prüfen Sie den ESTA-Status auf esta.cbp.dhs.gov: was genehmigt, ausstehend und abgelehnt bedeutet, was eine Ablehnung kostet, warum dann ein Visum folgt.',
    h1: 'ESTA-Status prüfen: Abfrage und was nach einer Ablehnung zu tun ist',
    intro: 'Wurde jemand in Ihrer Gruppe abgelehnt, geben Sie die Zahlen ein: der Rechner zeigt, was die CBP einbehalten hat. Die Abfrage des Status folgt unten.',
    resume: (h) => {
      const f = F(h);
      return `Den Status einer ESTA prüfen Sie auf der amtlichen Seite esta.cbp.dhs.gov unter der Abfrage eines bestehenden Antrags, entweder mit der Antragsnummer oder mit Passnummer, Geburtsdatum sowie Ausstellungs- und Ablaufdatum des Passes. Die Seite zeigt eines von drei Ergebnissen, auf Englisch: Authorization Approved heißt genehmigt, Sie dürfen reisen, gültig zwei Jahre oder bis zum Ablauf des Passes; Authorization Pending heißt, die CBP hat noch nicht entschieden, und Sie sollten vor einer Buchung, die sich nicht stornieren lässt, erneut nachsehen; Travel Not Authorized heißt abgelehnt, Sie können für diese Reise nicht ohne Visum fahren. Eine Ablehnung ist nicht kostenlos: von den ${f.us} werden ${f.usDenied} für den Betrieb des Systems einbehalten. Laut US-Verordnung ist eine Ablehnung keine Feststellung, dass Sie kein Visum bekommen können, und nicht gerichtlich anfechtbar. Der Weg führt daher über ein Visum bei der US-Botschaft in Berlin oder einem Generalkonsulat. Ein neuer ESTA-Antrag mit denselben Angaben bringt meist dasselbe Ergebnis.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Kann ich gegen eine ESTA-Ablehnung Widerspruch einlegen?', a: 'Nein. Nach 8 CFR 217.5(f) ist eine ESTA-Entscheidung nicht gerichtlich überprüfbar, und auf der ESTA-Seite gibt es kein Widerspruchsformular. Die Verordnung sagt auch, dass eine Ablehnung nicht bedeutet, dass Sie kein Visum erhalten. Der praktische Weg ist ein Antrag auf ein Besuchervisum bei einer US-Vertretung, mit einem Gespräch, in dem Sie Ihre Lage erklären.' },
        { q: 'Meine ESTA steht auf Pending. Soll ich schon den Flug buchen?', a: 'Warten Sie, wenn es geht. Pending heißt, dass die CBP noch nicht entschieden hat, und ohne genehmigte ESTA dürfen Sie kein Flugzeug und kein Schiff in die USA besteigen. Die CBP rät genau deshalb, vor dem Ticketkauf zu beantragen. Haben Sie schon gebucht, prüfen Sie den Status erneut auf der amtlichen Seite und halten Sie die Antragsnummer bereit.' },
        { q: 'Aus welchen Gründen wird eine ESTA abgelehnt?', a: `Die CBP nennt keine genauen Gründe. Gesetz und Fragebogen zeigen die üblichen Ursachen: ein Ja bei Gesundheit, Festnahmen oder früheren Ablehnungen, eine frühere Überziehung des Aufenthalts in den USA oder ein Aufenthalt im Irak, in Syrien oder einem gelisteten Staat seit dem ${f.usIneligible}, der gesetzlich ausschließt. Auch Fehler in den Passdaten können Probleme machen.` },
        { q: 'Kann eine genehmigte ESTA später ungültig werden?', a: 'Ja. Die Verordnung erlaubt dem US-Heimatschutzminister, eine ESTA jederzeit zu widerrufen, und ein neuer Antrag ist nach einem neuen Pass, einem neuen Namen, geändertem Geschlecht oder geänderter Staatsangehörigkeit nötig. Prüfen Sie den Status deshalb einige Tage vor jeder Reise auf der amtlichen Seite, nicht nur direkt nach dem Antrag.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>So fragen Sie den Status ab</h2>
<p>Öffnen Sie ${h.src('estaApply', 'esta.cbp.dhs.gov')} und wählen Sie die Abfrage eines bestehenden Antrags. Für eine Person genügen Passnummer, Geburtsdatum und Ausstellungs- und Ablaufdatum des Passes, für eine Gruppe die Gruppennummer. Die Antwort ist die, die bei der CBP gespeichert ist: einen anderen Ort, an dem eine ESTA geprüft werden kann, gibt es nicht, und eine fremde Seite kann sie nur für Sie nachschlagen.</p>
<h2>Die drei Ergebnisse</h2>
${h.table(['Status auf der amtlichen Seite', 'Bedeutung', 'Was zu tun ist'], [['Authorization Approved', 'Sie dürfen einsteigen und die Einreise beantragen', 'Ablaufdatum notieren'], ['Authorization Pending', 'Noch keine Entscheidung', 'Vor dem Bezahlen der Reise erneut prüfen'], ['Travel Not Authorized', 'Vorerst keine Reise ohne Visum', 'Visum beantragen']], 'ESTA-Ergebnisse, wie sie auf Englisch auf der CBP-Seite erscheinen', ['l', 'l', 'l'])}
<h2>Was eine Ablehnung kostet</h2>
<p>Laut ${h.src('frNotice', 'Federal Register')} bleiben pro abgelehntem Antrag ${f.usDenied} bei der CBP, der Anteil für die Kosten des Systems; die übrigen ${h.money({ amount: Math.round((f.A.us.fee.amount - f.A.us.feeIfDenied.amount) * 100) / 100, currency: 'USD' })} werden nur bei Genehmigung berechnet. Der Rechner oben addiert eine Gruppe mit Ablehnungen.</p>
<h2>Nach einer Ablehnung</h2>
<p>${h.src('ecfr2175', '8 CFR 217.5(f)(2)')} stellt klar, dass eine Ablehnung keine Feststellung ist, dass Sie kein Visum bekommen, und Sie nicht hindert, eines bei einem Konsulat zu beantragen. Das ist der nächste Schritt: ein Antrag auf ein B-1- oder B-2-Visum, mit eigener Gebühr und einem Gespräch in der Botschaft in Berlin oder den Generalkonsulaten in Frankfurt und München. Zahlen Sie keiner Seite, die verspricht, die Entscheidung zu kippen; das kann niemand.</p>
<h2>Gilt die genehmigte ESTA noch?</h2>
<p>Eine genehmigte ESTA endet nach zwei Jahren oder mit dem Pass. Geben Sie unten Ihre Daten ein, um zu sehen, ob sie die nächste Einreise abdeckt.</p>
<!--mini-->
<p>Der gesetzliche Ausschluss nach ${h.src('usc1187', '8 U.S.C. 1187(a)(12)')} für Reisende, die seit dem ${f.usIneligible} im Irak, in Syrien oder in einem gelisteten Staat waren, gilt auch bei einer gültigen ESTA, wenn die Reise danach stattfand; für den nächsten USA-Besuch ist dann ein Visum nötig.</p>`;
    },
  },
});
