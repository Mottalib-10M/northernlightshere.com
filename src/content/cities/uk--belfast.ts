import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'belfast');
const m = K.monthly('uk', 'belfast');
const nd = K.noDarkMonths('uk', 'belfast');
const ce = K.cloudExtremes('uk', 'belfast');
const best = K.bestMonths('uk', 'belfast', 3);
const gl = K.facts('uk', 'glasgow');

export default defineCity({
  region: 'uk',
  slug: 'belfast',
  title: 'Northern Lights Belfast 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Belfast in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the north Antrim coast and the darkest months.`,
  intro: 'From Belfast the northern horizon runs over Belfast Lough and the Antrim hills; the north coast is an hour away.',
  resume: `Belfast needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights on this site's view line, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, about ${K.num(gl.mlat - f.mlat, 1)} degrees below Glasgow, and the aurora reaches overhead only around Kp ${K.kp(f.overhead)}, in the strongest storms. The threshold is cautious: on a smaller storm, a faint glow can show low in the north from the Antrim coast, which the tool rates as maybe. Northern Ireland's nights are short in summer, with no astronomical darkness in ${K.listOf(nd)}, and long in winter, ${K.num(m[11].hours, 1)} hours in mid-December. Its weather is Atlantic: the NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. By clear dark hours, ${K.listOf(best.map((b) => b.name))} lead.`,
  faqs: [
    { q: 'Can you see the northern lights in Belfast?', a: `Yes, during storms of about Kp ${K.kp(f.need)} or more, from a dark spot with a view north. The aurora was seen widely across Northern Ireland during the storms of 2024. Inside the city, light pollution and the hills around Belfast Lough hide a low display, so most sightings come from the coast.` },
    { q: 'Where is the best place near Belfast to see the aurora?', a: 'The north coast of County Antrim, about an hour away, which faces north over the sea toward Scotland: the Causeway Coast and the headlands between Ballycastle and Portrush give dark, open horizons. Closer to the city, the hills above Belfast Lough look north over the Antrim plateau.' },
    { q: 'What months are best for the aurora in Belfast?', a: `${K.listOf(best.map((b) => b.name))}, by clear dark hours. In ${K.listOf(nd)} the Sun never gets 18 degrees below the horizon, so even big storms are hard to see. ${ce.cloudiest.name} is the cloudiest month at ${K.num(ce.cloudiest.cloud, 0)}% average cloud amount, so a clear storm night then is worth acting on.` },
  ],
  body: (h) => `
<h2>To the north coast</h2>
<p>Belfast sits at the head of Belfast Lough, ringed by hills, and its own lights fill the low northern sky. The real asset of Northern Ireland for the aurora is its north coast, a little over an hour away. From the headlands of the Causeway Coast, between Portrush and Ballycastle, the view north runs across the open sea toward the islands of Scotland, with almost no light on the horizon. A storm that barely reaches the threshold sits low there, and the sea gives the flat skyline it needs.</p>
${h.mini('darkMonth', { place: 'uk/belfast', month: 12 })}
<h2>The Antrim plateau and Lough Neagh</h2>
<p>Between the city and the coast, the Antrim plateau rises in moorland and glens with scattered farms. Its high roads give wide views and much darker skies than the lough shore. Lough Neagh, west of the city, is the largest lake in the British Isles, and its shores are low and dark; the northern horizon there runs over farmland toward the Sperrins. Any of these work on a strong storm night, and the plateau is the quickest to reach from Belfast.</p>
<h2>What a storm looks like from here</h2>
<p>At Kp ${h.kp(f.need)}, the aurora over Northern Ireland is a low arc above the northern sea, pale to the eye and green or pink on a phone screen. In stronger storms, rays rise from it and a red glow spreads above, the light of oxygen at heights above 300 km. Give your eyes twenty minutes away from car headlights before judging what is there.</p>
<h2>Weather from the west</h2>
<p>Atlantic systems arrive in Northern Ireland early, and cloud is the main reason a forecast storm goes unseen. Clear spells usually come behind a front, in cooler air from the north-west, and they often last only a few hours. The tool uses the MET Norway forecast for the coordinates you choose, so it is worth comparing Belfast with a point on the north coast before setting off: the two can differ on the same night. The SWPC forecast blocks are written in Universal Time, the same as Greenwich Mean Time in winter, so in Belfast the blocks need no conversion until British Summer Time begins. For the rest of the United Kingdom, see the ${h.a('region:uk', 'UK page')}; across the North Channel, the ${h.a('city:uk/glasgow', 'Glasgow page')}.</p>`,
  related: ['region:uk', 'city:uk/glasgow', 'city:uk/edinburgh', 'aurora-forecast', 'best-time-northern-lights'],
});
