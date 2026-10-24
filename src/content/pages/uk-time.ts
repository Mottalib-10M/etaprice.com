import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'uk-time',
  group: 'uk',
  order: 5,
  tool: { kind: 'applyby', dest: 'GB' },
  mini: { kind: 'validity', dest: 'GB' },
  related: ['uk-apply', 'uk-cost', 'ca', 'nz'],
  sources: ['govukEtaApply', 'govukEta', 'govukFees'],
  en: {
    slug: 'uk-eta-processing-time',
    nav: 'UK ETA processing time',
    card: 'Usually a day, up to three working days: the last comfortable date to apply before your trip.',
    title: 'UK ETA processing time: one day, up to 3 working days',
    description: 'How long a UK ETA takes: usually within a day, up to three working days according to GOV.UK. Enter your departure date to get the last safe day to apply.',
    h1: 'UK ETA processing time: when to apply before you fly',
    intro: 'Enter your departure date: the calculator subtracts the official delay, counted in calendar days so that a weekend does not catch you out.',
    resume: (h) => {
      const f = F(h);
      return `GOV.UK says you will usually get a decision on a UK ETA by email within a day, but that it can take up to three working days, and that you must not travel until the email confirming your ETA has arrived. Working days exclude Saturdays, Sundays and UK bank holidays, so an application sent on a Friday evening may only be decided on the following Wednesday. That is why the calculator above counts five calendar days back from your departure: it covers three working days plus a weekend. There is no paid fast track: the fee is ${f.uk} whatever the timing, and GOV.UK states that applying through another website or app does not get you a faster decision. When you apply for several people, each decision can arrive at a different time. If nothing has arrived after three working days, look in your spam folder before contacting UK Visas and Immigration through its webchat. Once granted, the ETA lasts two years, so a frequent traveller only waits once.`;
    },
    faqs: () => [
      { q: 'Can I pay extra to get my UK ETA faster?', a: 'No. There is no priority service for the ETA. GOV.UK says plainly that you cannot get a faster decision by applying through another website or app, and the Home Office fee is the same whenever you apply. A site that sells an urgent ETA is charging for a promise it cannot keep: the application joins the same queue.' },
      { q: 'My UK ETA decision has not arrived and I fly tomorrow. What can I do?', a: 'Check the spam or junk folder first, and use the official online check to see whether an ETA is already linked to your passport. If not, contact UK Visas and Immigration through its webchat. Do not board without the confirmation: the airline checks the ETA electronically and can refuse to carry you.' },
      { q: 'Why did my children’s ETAs arrive at different times?', a: 'Each application is decided separately, even when one parent sends them together and pays in one go. GOV.UK warns that you may get decisions at different times to other people you applied for. Wait until every member of the group has their own confirmation email before the day of travel.' },
    ],
    body: (h) => {
      const f = F(h);
      return `<h2>What the official text says</h2>
<p>The ${h.src('govukEtaApply', 'GOV.UK application page')} gives three facts: a decision usually arrives by email within a day; it can take up to three working days; and you must wait for the email confirming your ETA before you travel. It gives no figure for complex cases, and we do not invent one.</p>
<h2>Three working days, five calendar days</h2>
<p>Working days are Monday to Friday, excluding UK bank holidays. A Thursday afternoon application can therefore run into the next Tuesday. Counting five calendar days back from your departure, as the calculator does, covers the worst case with a weekend in the middle. Around Christmas, Easter or the late May and August bank holidays, add a further day or two.</p>
${h.table(['Application sent', 'Decision usually', 'Up to three working days'], [['Monday', 'Tuesday', 'Thursday'], ['Wednesday', 'Thursday', 'Monday'], ['Friday', 'Saturday or Monday', 'Wednesday']], 'Examples without a bank holiday', ['l', 'l', 'l'])}
<h2>Once you have it, you keep it</h2>
<p>The wait only happens once every two years, as long as your passport stays valid. Before booking a new trip, check that your existing ETA still covers the arrival date: enter its issue date and your passport expiry below.</p>
<!--mini-->
<h2>What can slow an application</h2>
<p>GOV.UK names one cause itself: a face photo that does not meet the digital photo rules can delay the application or get it rejected. Answer the questions on criminal convictions and immigration history accurately, use the passport you will travel with, and give an email address you check. A rejected application means applying again and paying ${f.uk} again.</p>
<h2>Compared with other countries</h2>
<p>Canada approves most eTAs within minutes but may ask for documents within 72 hours; New Zealand asks you to allow 72 hours for an NZeTA. The ${h.a('ca', 'Canada eTA page')} and the ${h.a('nz', 'NZeTA page')} give their own apply-by dates.</p>`;
    },
  },
  fr: {
    slug: 'delai-eta-royaume-uni',
    nav: 'Délai de l’ETA',
    card: 'En général un jour, jusqu’à trois jours ouvrés : la dernière date sûre pour faire la demande.',
    title: 'Délai ETA Royaume-Uni : un jour, jusqu’à trois jours ouvrés',
    description: 'Combien de temps pour avoir l’ETA britannique : en général un jour, jusqu’à trois jours ouvrés selon GOV.UK. Saisissez votre date de départ pour la date limite.',
    h1: 'Délai de l’ETA britannique : quand faire la demande avant de partir',
    intro: 'Saisissez votre date de départ : le calculateur retranche le délai officiel, compté en jours calendaires pour qu’un week-end ne vous surprenne pas.',
    resume: (h) => {
      const f = F(h);
      return `Selon GOV.UK, la décision sur une ETA britannique arrive en général par courriel en un jour, mais elle peut prendre jusqu’à trois jours ouvrés, et il est interdit de voyager avant d’avoir reçu le courriel qui confirme l’autorisation. Les jours ouvrés excluent le samedi, le dimanche et les jours fériés britanniques : une demande envoyée le vendredi soir peut n’être tranchée que le mercredi suivant. C’est pourquoi le calculateur ci-dessus compte cinq jours calendaires avant votre départ, soit trois jours ouvrés plus un week-end. Il n’existe aucune procédure accélérée payante : le prix reste de ${f.uk}, et GOV.UK précise que passer par un autre site ou une autre application ne donne pas de décision plus rapide. Pour une famille, chaque décision peut arriver à un moment différent. Sans nouvelles après trois jours ouvrés, regardez dans les courriels indésirables avant de contacter UK Visas and Immigration par sa messagerie en ligne. Une fois accordée, l’ETA vaut deux ans : on n’attend qu’une fois.`;
    },
    faqs: () => [
      { q: 'Peut-on payer plus pour obtenir l’ETA britannique plus vite ?', a: 'Non. Il n’existe aucun service prioritaire pour l’ETA. GOV.UK le dit clairement : passer par un autre site ou une autre application ne permet pas d’obtenir une décision plus rapide, et le tarif du Home Office est le même quel que soit le moment. Un site qui vend une ETA urgente facture une promesse qu’il ne peut pas tenir : la demande rejoint la même file.' },
      { q: 'Mon ETA n’est pas arrivée et je pars demain : que faire ?', a: 'Regardez d’abord dans les courriels indésirables, puis utilisez la vérification officielle en ligne pour savoir si une ETA est déjà reliée à votre passeport. Sinon, contactez UK Visas and Immigration par sa messagerie en ligne. N’embarquez pas sans confirmation : le transporteur vérifie l’ETA électroniquement et peut refuser de vous prendre.' },
      { q: 'Pourquoi les ETA de mes enfants arrivent-elles à des moments différents ?', a: 'Chaque demande est examinée séparément, même quand un parent les envoie ensemble et paie en une fois. GOV.UK prévient que les décisions peuvent arriver à des moments différents pour les personnes au nom desquelles vous avez fait la demande. Attendez que chaque membre du groupe ait reçu son propre courriel avant le jour du départ.' },
    ],
    body: (h) => {
      const f = F(h);
      return `<h2>Ce que dit le texte officiel</h2>
<p>La ${h.src('govukEtaApply', 'page de demande de GOV.UK')} donne trois éléments : une décision arrive en général par courriel en un jour ; elle peut prendre jusqu’à trois jours ouvrés ; il faut attendre le courriel de confirmation avant de voyager. Elle ne donne aucun chiffre pour les cas complexes, et nous n’en inventons pas.</p>
<h2>Trois jours ouvrés, cinq jours calendaires</h2>
<p>Les jours ouvrés vont du lundi au vendredi, hors jours fériés britanniques. Une demande du jeudi après-midi peut donc courir jusqu’au mardi suivant. Compter cinq jours calendaires avant le départ, comme le fait le calculateur, couvre le pire cas avec un week-end au milieu. Autour de Noël, de Pâques ou des jours fériés de fin mai et de fin août au Royaume-Uni, ajoutez un ou deux jours.</p>
${h.table(['Demande envoyée', 'Décision en général', 'Au plus tard (trois jours ouvrés)'], [['Lundi', 'Mardi', 'Jeudi'], ['Mercredi', 'Jeudi', 'Lundi'], ['Vendredi', 'Samedi ou lundi', 'Mercredi']], 'Exemples sans jour férié', ['l', 'l', 'l'])}
<h2>Une fois obtenue, on la garde</h2>
<p>L’attente ne revient qu’une fois tous les deux ans, tant que le passeport reste valable. Avant de réserver un nouveau voyage, vérifiez que l’ETA actuelle couvre la date d’arrivée : indiquez sa date de délivrance et la fin de votre passeport ci-dessous.</p>
<!--mini-->
<h2>Ce qui peut ralentir une demande</h2>
<p>GOV.UK cite une cause : une photo du visage qui ne respecte pas les règles des photos numériques peut retarder la demande ou la faire rejeter. Répondez avec exactitude aux questions sur les condamnations et l’historique d’immigration, utilisez le passeport du voyage et une adresse électronique que vous consultez. Une demande rejetée oblige à recommencer et à repayer ${f.uk}.</p>
<h2>Par comparaison</h2>
<p>Le Canada accorde la plupart des AVE en quelques minutes mais peut demander des documents sous 72 heures ; la Nouvelle-Zélande demande de prévoir 72 heures pour une NZeTA. Les pages ${h.a('ca', 'AVE Canada')} et ${h.a('nz', 'NZeTA')} donnent leurs propres dates limites.</p>`;
    },
  },
});
