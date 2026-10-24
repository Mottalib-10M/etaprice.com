import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'nz-cost',
  group: 'anz',
  order: 4,
  tool: { kind: 'cost', dest: 'NZ' },
  mini: { kind: 'overcharge', dest: 'NZ' },
  related: ['nz', 'au-cost', 'uk-cost', 'esta-cost'],
  sources: ['nzFees', 'nzNzeta', 'ecb'],
  en: {
    slug: 'nzeta-cost',
    nav: 'NZeTA cost',
    card: 'NZD 17 in the app or 23 online, plus the NZD 100 visitor levy: the total for your group in euros.',
    title: 'NZeTA cost 2026: NZD 117 in the app with the visitor levy',
    description: 'The NZeTA costs NZD 17 in the official app or NZD 23 online, plus the NZD 100 visitor levy most people pay with it. Your group total in dollars and euros.',
    h1: 'NZeTA cost: the authority, the levy and the total per group',
    intro: 'Choose your passport, the number of travellers and app or website: the calculator applies the Immigration New Zealand prices and converts them to euros.',
    resume: (h) => {
      const f = F(h);
      return `The price of an NZeTA has two parts. The authority itself costs ${f.nzAppFee} when requested in the official NZeTA app and ${f.nzWebFee} on the Immigration New Zealand website. Most travellers also pay, in the same transaction, the International Visitor Conservation and Tourism Levy (IVL) of ${f.ivl}, raised to that amount on ${h.date(f.A.nz.ivl.since)}. The usual total is therefore ${f.nzApp} per person in the app, about ${f.nzAppEur.replace('≈ ', '')} at the ECB rate of ${f.fxDate}, or ${f.nzWeb} on the website, about ${f.nzWebEur.replace('≈ ', '')}. There is no family rate: each traveller, child or adult, has a separate request, so a family of four pays ${f.times({ amount: f.A.nz.nzeta.app.amount + f.A.nz.ivl.amount, currency: 'NZD' }, 4).m} in the app. Both the NZeTA and the levy last ${f.nzYears} years, so the cost per year is half the headline price for a frequent visitor. Any price above these amounts for the same request includes a third party’s own charge.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Is the NZD 100 levy part of the NZeTA price?', a: `It is a separate charge collected at the same time. The NZeTA costs ${f.nzAppFee} in the app or ${f.nzWebFee} online; the IVL of ${f.ivl} is added for most visitors on a holiday or business trip. Immigration New Zealand lists the travellers who do not pay it. The calculator above adds it unless your passport is exempt.` },
        { q: 'Does a child pay the full NZeTA and levy?', a: `Immigration New Zealand publishes no child rate, so each child has a separate request at the same price as an adult. The app can handle up to ${h.P.nzFacts.appGroupMax} people in one session, which makes a family request quicker but not cheaper. Check the levy exemptions on the official site before paying for a very young child.` },
        { q: 'How much does the NZeTA cost in euros?', a: `At the ECB reference rate of ${f.fxDate}, the app total of ${f.nzApp} is about ${f.nzAppEur.replace('≈ ', '')} and the website total of ${f.nzWeb} about ${f.nzWebEur.replace('≈ ', '')}. Your card issuer applies its own rate and may add a foreign transaction fee, so the amount on your statement can differ slightly from these figures.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const app = { amount: A.nz.nzeta.app.amount + A.nz.ivl.amount, currency: 'NZD' };
      const web = { amount: A.nz.nzeta.web.amount + A.nz.ivl.amount, currency: 'NZD' };
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(app, n).m, f.times(app, n).e, f.times(web, n).m, f.times(web, n).e]);
      return `<h2>Totals by group size</h2>
<p>NZeTA plus levy per person, converted at the ECB reference rate of ${f.fxDate}. The ${h.src('nzFees', 'Immigration New Zealand fee table')} is the source for both charges.</p>
${h.table(['Travellers', 'App', 'In euros', 'Website', 'In euros'], rows, `Immigration New Zealand prices read on ${f.dataDay}`, ['l', 'r', 'r', 'r', 'r'])}
<h2>App or website</h2>
<p>The app saves ${h.money({ amount: A.nz.nzeta.web.amount - A.nz.nzeta.app.amount, currency: 'NZD' })} per person because it reads the passport chip and takes the photo itself. The website suits travellers without a compatible phone. The levy is the same either way, and the ${h.src('nzNzeta', 'NZeTA page')} asks everyone to allow ${h.P.nzFacts.allowHours} hours.</p>
<h2>Cost per year</h2>
<p>The NZeTA and the levy both last ${f.nzYears} years, against one year for the Australian ETA and two for the UK ETA and the ESTA. A new passport ends the NZeTA early and means paying again.</p>
<h2>When a price is higher</h2>
<p>A price above ${f.nzWeb} per person for an NZeTA with levy includes a third party’s mark-up. Enter a price you have been quoted to see it.</p>
<!--mini-->
<p>For the rules on who needs the NZeTA, see the ${h.a('nz', 'NZeTA page')}; for the Australian leg of a trip, the ${h.a('au-cost', 'Australia ETA cost page')}.</p>`;
    },
  },
});
