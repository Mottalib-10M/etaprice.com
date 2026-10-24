import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'au-cost',
  group: 'anz',
  order: 2,
  tool: { kind: 'cost', dest: 'AU' },
  mini: { kind: 'overcharge', dest: 'AU' },
  related: ['au', 'nz-cost', 'esta-cost', 'ca-cost'],
  sources: ['auEta', 'auEvisitor', 'ecb'],
  en: {
    slug: 'australia-eta-cost',
    nav: 'Australia ETA cost',
    card: 'AUD 20 per person in the official app, nothing for the eVisitor: the total for your group in euros.',
    title: 'Australia ETA cost 2026: AUD 20 in the app, eVisitor free',
    description: 'The Australia ETA costs an AUD 20 service charge per person in the official app, and the eVisitor is free for Europeans. Your family total in dollars and euros.',
    h1: 'Australia ETA cost: what each traveller really pays',
    intro: 'Choose your passport and the number of travellers: the calculator applies the Home Affairs charge and shows when the free eVisitor is open to you.',
    resume: (h) => {
      const f = F(h);
      return `The Australian Electronic Travel Authority costs a service charge of ${f.au} per person, about ${f.auEur.replace('≈ ', '')} at the ECB rate of ${f.fxDate}, paid in the official Australian ETA app; the Department of Home Affairs states that there is no other charge for an ETA. The eVisitor, open to European passports, costs nothing at all. Neither has a child rate or a family rate: each family member needs a separate application, so an American family of four pays ${f.times(f.A.au.eta.fee, 4).m}, while a European family of four using the eVisitor pays nothing. Both authorisations are valid for ${h.P.auFacts.validityMonths} months, or until the passport expires if sooner, with stays of up to ${h.P.auFacts.stayMonths} months after each entry; because they last one year rather than two, a frequent visitor pays the ETA charge again every year. A site or app that asks for more than ${f.au} for an ETA, or for any money for an eVisitor, is adding its own charge to a government service.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Why does Australia call the ETA price a service charge?', a: `Because the ETA itself carries no visa application charge: the ${f.au} pays for the use of the Australian ETA app. Home Affairs says there is no other charge payable for an ETA. In practice the effect is the same as a fee: each applicant, child or adult, pays it once in the app for each application, and a new passport means paying it again.` },
        { q: 'Is the eVisitor really free, or is there a hidden charge?', a: 'It is free. Home Affairs states that there is no charge to make an eVisitor application. It is applied for online on the Home Affairs website. Some private sites offer to submit an eVisitor for a fee: the authorisation they obtain is the same free one, and the money goes to the intermediary, not to Australia.' },
        { q: 'Does the Australian ETA cost more for a business trip?', a: `No. The ETA and the eVisitor cover both tourism and business visitor activities, such as meetings and conferences, at the same price: ${f.au} for the ETA in the app and nothing for the eVisitor. Work for an Australian employer, however, needs a different visa with its own charge.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [String(n), f.times(A.au.eta.fee, n).m, f.times(A.au.eta.fee, n).e, h.money({ amount: 0, currency: 'AUD' })]);
      return `<h2>Totals by group size</h2>
<p>The ETA is charged per person in the app; the eVisitor costs nothing for anyone. This table converts the ETA total at the ECB reference rate of ${f.fxDate}.</p>
${h.table(['Travellers', 'ETA in the app', 'In euros', 'eVisitor'], rows, `Home Affairs charges read on ${f.dataDay}`, ['l', 'r', 'r', 'r'])}
<h2>Who pays what</h2>
<p>Travellers from the United States, Canada, Japan, Singapore, South Korea and the other non-European ETA countries pay ${f.au} each. Travellers with a European passport on the eVisitor list pay nothing if they choose the eVisitor; some Western European passports are also eligible for the paid ETA, which they may prefer for the app. The ${h.a('au', 'Australia ETA page')} lists which passports can use which.</p>
<h2>When a price is higher</h2>
<p>A price above ${f.au} for an ETA, or any price for an eVisitor, includes a third party’s service charge. The ${h.src('auEta', 'Home Affairs ETA page')} names the Australian ETA app as the way to apply, and the ${h.src('auEvisitor', 'eVisitor page')} the online application. Enter a price you have been quoted to see the mark-up.</p>
<!--mini-->
<h2>Cost per year of validity</h2>
<p>The Australian authorisations last ${h.P.auFacts.validityMonths} months, against two years for the UK ETA and the ESTA and up to five years for the Canadian eTA. For a single holiday the ${f.au} is modest; for a traveller who goes to Australia every year it is paid every year. A new passport also means a new application. For the New Zealand leg of a trip, see the ${h.a('nz-cost', 'NZeTA cost page')}.</p>`;
    },
  },
});
