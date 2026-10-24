import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'ca-pr',
  group: 'ca',
  order: 3,
  tool: { kind: 'checker', dests: ['CA'], nat: 'IN' },
  mini: { kind: 'validity', dest: 'CA' },
  related: ['ca', 'ca-cost', 'uk-us', 'esta'],
  sources: ['irpr', 'caEta'],
  en: {
    slug: 'canada-eta-green-card',
    nav: 'Canada and the green card',
    card: 'US permanent residents fly to Canada without an eTA or visa: the documents to carry, and the cases that still need one.',
    title: 'Canada eTA for green card holders: exempt since April 2022',
    description: 'US green card holders have needed no Canada eTA since 26 April 2022, and no visitor visa. The documents to carry, and who the exemption still leaves out.',
    h1: 'Canada eTA for green card holders: what US permanent residents need',
    intro: 'The checker starts with a passport from India; set “US green card” to yes or no, or pick your own passport, to see the difference.',
    resume: (h) => {
      const f = F(h);
      return `Lawful permanent residents of the United States do not need a Canadian eTA or a Canadian visitor visa, whatever their nationality. The exemption is in section 190 of the Immigration and Refugee Protection Regulations and has applied since ${h.date(h.P.caFacts.usPrExemptSince)}. Green card holders were already exempt from the Canadian visitor visa before that date, but had to buy an eTA at ${f.ca} to fly; since then a permanent resident with a passport from India, China, Nigeria or France travels with two documents: a valid passport from their country of nationality and a valid green card, which airlines check before boarding. The rule covers flights, land crossings and sea arrivals alike. It does not cover people with only a pending green card application, an expired card without an extension notice, or a US visa: they follow the rule for their own passport. Children who are permanent residents need their own card. The checker above shows the result with and without the green card.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'What documents does a green card holder show to fly to Canada?', a: 'A valid passport from the country of nationality and a valid permanent resident card, the green card. The airline checks both at check-in, since there is no eTA in the system to confirm your status. Keep the green card with you rather than in checked luggage: the Canadian border officer may also ask to see it on arrival.' },
        { q: 'My green card has expired but I have an extension notice. Can I fly to Canada?', a: 'Canada asks for proof of valid status as a US lawful permanent resident. An expired card on its own is not enough. Travellers in this situation should check the official guidance on canada.ca before booking and carry the official US notice that extends the card, or apply for an eTA or visa according to their passport.' },
        { q: 'Does a US citizen need an eTA to fly to Canada?', a: `No. US citizens need neither an eTA nor a visa, only a valid US passport for flights. The eTA concerns visa-exempt travellers from other countries, such as the United Kingdom, France or Japan, at ${f.ca} each. A US citizen who holds another nationality as well should use the US passport for the trip.` },
      ];
    },
    body: (h) => {
      const f = F(h);
      return `<h2>The exemption in the regulations</h2>
<p>Section 190 of the ${h.src('irpr', 'Immigration and Refugee Protection Regulations')} exempts several groups from the visa requirement, and the eTA rules in section 7.01 follow it. Lawful permanent residents of the United States were already exempt from the visitor visa; since ${h.date(h.P.caFacts.usPrExemptSince)} they are exempt from the eTA as well, and need neither the eTA at ${f.ca} nor a visitor visa at ${f.caVisa}.</p>
${h.table(['Passport', 'Without a green card', 'With a valid green card'], [[h.land('GB') + ', ' + h.land('FR') + ', ' + h.land('JP'), 'eTA, ' + f.ca, 'Nothing'], [h.land('MX') + ', ' + h.land('BR') + ', ' + h.land('PH'), 'eTA under conditions, or visa', 'Nothing'], [h.land('IN') + ', ' + h.land('CN') + ', ' + h.land('NG'), 'Visitor visa, ' + f.caVisa, 'Nothing']], 'What a traveller needs to fly to Canada', ['l', 'l', 'l'])}
<h2>Documents to carry</h2>
<p>A valid passport from your country of nationality, and your valid green card. The airline checks them at check-in. Children who are permanent residents need their own passport and card. The ${h.src('caEta', 'official eTA page')} sets out the documents for each situation.</p>
<h2>Who is not covered</h2>
<p>The exemption is for lawful permanent residents only. Holders of a US work or student visa, applicants waiting for a green card, and people with conditional residence documents that have lapsed follow the rule for their passport: an eTA if they are from an eTA country, an eTA under conditions for the ${f.caCondCount} countries where a valid US non-immigrant visa qualifies them, or a visa.</p>
<h2>If you already hold an eTA</h2>
<p>An eTA issued before the exemption stays valid until its expiry but is no longer needed while you remain a permanent resident. If you lose that status, you fall back on the rule for your passport; check whether the old eTA still covers your trip below.</p>
<!--mini-->
<p>For the UK, the green card gives no exemption: a permanent resident with an ETA-country passport needs a UK ETA, as explained on the ${h.a('uk-us', 'page for Americans going to the UK')}.</p>`;
    },
  },
});
