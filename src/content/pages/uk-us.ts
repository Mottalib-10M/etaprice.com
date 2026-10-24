import { definePage } from '../../lib/guide-types';
import { F } from '../facts';

export default definePage({
  id: 'uk-us',
  group: 'uk',
  order: 4,
  tool: { kind: 'checker', dests: ['GB'], nat: 'US' },
  mini: { kind: 'cost', dest: 'GB', nat: 'US' },
  related: ['uk-apply', 'uk-who', 'ca-pr', 'uk-cost'],
  sources: ['govukEta', 'govukEtaApply', 'govukEtaList', 'govukFees'],
  en: {
    slug: 'uk-eta-for-us-citizens',
    nav: 'UK ETA for Americans',
    card: 'What US citizens need for London since 2025, green card holders, layovers and the cost in dollars.',
    title: 'UK ETA for US citizens: what Americans need for London',
    description: 'Americans have needed a UK ETA since 8 January 2025. The £20 fee in dollars, green card holders, Heathrow layovers, cruises, and the only official way to apply.',
    h1: 'UK ETA for US citizens: the rules for Americans visiting Britain',
    intro: 'The checker is set to a US passport. Change it for another member of your party, or add travellers to see the total.',
    resume: (h) => {
      const f = F(h);
      const usd = h.M.toEur(f.A.uk.fee, h.M.FX) * h.M.FX.rates.USD;
      return `US citizens have needed an Electronic Travel Authorisation to visit the United Kingdom since ${f.ukWaveUS}, when the United States joined the ETA list together with Canada, Australia, Japan and some forty other countries. Every American traveller, whatever their age, applies online on GOV.UK or in the UK ETA app before departure and pays ${f.uk}, about ${h.money({ amount: Math.round(usd * 100) / 100, currency: 'USD' })} at the ECB cross rate of ${f.fxDate}; your card issuer may add a foreign transaction fee. The ETA is linked to the US passport, lasts two years or until that passport expires, and covers any number of visits of up to six months to England, Scotland, Wales, Northern Ireland, Jersey, Guernsey and the Isle of Man. A decision usually arrives within a day, and you must not fly before the confirming email. What counts is the passport: a green card holder with a non-US passport follows the rule for that nationality, and a dual US and British citizen travels on the British passport without any ETA.`;
    },
    faqs: (h) => {
      const f = F(h);
      return [
        { q: 'Does a US green card holder need a UK ETA?', a: `It depends on the passport, not on the green card. A permanent resident with a passport from an ETA country, for example Mexico or Germany, needs an ETA at ${f.uk}. One from a country on the UK visa list needs a visitor visa at ${f.ukVisa}. The green card itself gives no exemption for the UK, unlike for Canada.` },
        { q: 'Do Americans on a cruise that stops in Southampton need an ETA?', a: 'Yes, if you go ashore and pass UK border control, which is the case when a cruise starts, ends or calls in a UK port and passengers disembark. Each passenger needs an ETA linked to their own passport, children included. Ask your cruise line where and when the UK border check takes place, and apply before you leave the United States so the decision is in hand when you embark.' },
        { q: 'Is the UK ETA fee charged in pounds or dollars?', a: `The Home Office charges ${f.uk}. Your US card converts the amount at the network rate on the day of payment, and some cards add a foreign transaction fee of a few percent. A site that quotes the ETA in dollars at a round figure well above the converted fee is adding its own service charge.` },
        { q: 'Can I apply for my whole American family from my phone?', a: 'Yes, if they are with you: the UK ETA app lets you scan each passport and each face one after the other, and pay for everyone. For a relative who is somewhere else, for example a student already abroad, use the GOV.UK website with a photo of their passport and a photo of their face.' },
      ];
    },
    body: (h) => {
      const f = F(h);
      const A = f.A;
      return `<h2>Since when Americans need an ETA</h2>
<p>The UK introduced the ETA in waves. Qatar came first, then the Gulf states, then on ${f.ukWaveUS} a large group that included the United States, Canada, Australia, New Zealand, Japan, South Korea and Mexico. Europeans followed on ${f.ukWaveEU}. Today about ${f.ukEtaCount} nationalities need an ETA; British and Irish citizens never do.</p>
<h2>What an American trip costs</h2>
<p>The fee is per person and does not depend on age or on the number of visits: a couple pays ${f.times(A.uk.fee, 2).m}, a family of four ${f.times(A.uk.fee, 4).m}, a family of five ${f.times(A.uk.fee, 5).m}. Adjust the number of travellers below for your own group; the euro figure helps if part of the trip is paid in the eurozone.</p>
<!--mini-->
<h2>Heathrow and other layovers</h2>
<p>A US traveller who connects at Heathrow to Europe, Africa or Asia without leaving the international transit area needs no ETA. Collecting bags, switching to Gatwick or staying overnight in a hotel means crossing border control, and an ETA is needed. Booking two separate tickets usually means collecting bags, so check before you choose a self-connection.</p>
<h2>Business trips and short courses</h2>
<p>The ETA covers business meetings, conferences, short study and a permitted paid engagement, for up to six months. It does not cover work for a UK employer, which needs a visa. An ETA does not guarantee entry: the Border Force officer can still ask about the purpose of your visit and your return ticket.</p>
<h2>If you are also going to Canada or Ireland</h2>
<p>US citizens need neither an eTA nor a visa for Canada, and Ireland has no ETA of its own. A US green card holder with another passport, however, is exempt from the Canadian eTA under section 190 of the Canadian regulations; see the ${h.a('ca-pr', 'green card page')}. For the UK, everyone on the ETA list applies, step by step, as described on the ${h.a('uk-apply', 'application page')}.</p>
<h2>Where to apply</h2>
<p>Only on ${h.src('govukEtaApply', 'gov.uk/eta/apply')} or in the UK ETA app published by the Home Office. GOV.UK warns that other websites may charge more and that you should avoid sites imitating government services; they do not get you a faster decision.</p>`;
    },
  },
});
