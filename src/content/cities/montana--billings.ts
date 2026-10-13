import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('montana', 'billings');
const m = K.monthly('montana', 'billings');
const ce = K.cloudExtremes('montana', 'billings');
const best = K.bestMonths('montana', 'billings', 3);
const hv = K.facts('montana', 'havre');

export default defineCity({
  region: 'montana',
  slug: 'billings',
  title: 'Northern Lights Billings 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Billings in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the Rimrocks view and its clearest months of all.`,
  intro: 'Montana’s largest city sits under the Rimrocks; the plains to the north give it a wide sky once you climb out of the valley.',
  resume: `From Billings the northern lights need a planetary Kp of about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale. In the AACGM model the city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, a little less favorable than the Hi-Line towns, where Havre needs about ${K.kp(hv.need)}, but better than cities of the same latitude farther east. The aurora reaches the zenith around Kp ${K.kp(f.overhead)}. Billings has two assets: the sandstone Rimrocks that rise above the north side of town give an elevated viewpoint over the plains, and the air is dry, with a NASA POWER cloud amount of ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. The cloudiest month is ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}%. Counting clear dark hours, the product of night length and clear sky, ${K.listOf(best.map((b) => b.name))} come first.`,
  faqs: [
    { q: 'Can you see the northern lights in Billings, Montana?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or more, looking north from a dark spot above or outside the city. The Yellowstone valley holds the city lights, so climbing onto the Rims or driving north onto the plains removes most of the glow and opens the horizon.` },
    { q: 'Where is the best spot near Billings to see the aurora?', a: 'Above the city or north of it: the Rimrocks along the north edge of Billings give a view across open country, and the roads north toward Roundup run through ranchland with very little light. Look for a place where the land to the north is lower than you are.' },
    { q: 'What months have the clearest dark skies in Billings?', a: `By clear dark hours, ${K.listOf(best.map((b) => b.name))}. In mid-December the Sun is more than 18 degrees down for ${K.num(m[11].hours, 1)} hours, but cloud is more frequent in winter; ${ce.clearest.name} is the clearest month at ${K.num(ce.clearest.cloud, 0)}% average cloud amount, with much shorter nights.` },
  ],
  body: (h) => `
<h2>Above the Yellowstone valley</h2>
<p>Billings spreads along the Yellowstone River beneath a line of sandstone cliffs, the Rimrocks, which rise a few hundred feet above downtown on the north side. For an aurora watcher that is a gift: from the top of the Rims the view runs north over the plains, and the lights of the city fall behind and below. At Kp ${h.kp(f.need)}, the aurora appears as a low arc over that northern horizon, and the extra height helps clear any haze in the valley.</p>
<p>North of the city the land empties quickly. The ranch country toward Roundup and the Musselshell has few lights, and on a G2 or G3 night it gives a dark, open sky within an hour's drive.</p>
<p>${h.mini('kpNeed', { place: 'montana/billings', region: 'montana' })}</p>
<h2>Weather on the plains</h2>
<p>Billings sits in the lee of the Beartooth and Absaroka ranges, and Pacific moisture reaches it only after crossing several mountain chains. In NASA POWER averages the cloud amount runs from ${h.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Chinook winds in winter can clear the sky fast and keep it clear for several nights, though they also bring gusts that make standing outside harder. The hour strip of the tool shows how the National Weather Service expects the sky to evolve through the night.</p>
<h2>How Billings compares</h2>
<p>Billings and Missoula share almost the same threshold, ${h.kp(f.need)} against ${h.kp(h.facts('montana', 'missoula').need)}, but Billings has the flatter horizon and the drier air. Sioux Falls and Rapid City, farther east, need about the same storm. For lower thresholds within the state the Hi-Line is the answer, as the ${h.a('region:montana', 'Montana page')} shows; for the neighboring plains, see the ${h.a('region:north-dakota', 'North Dakota page')} and the ${h.a('city:south-dakota/rapid-city', 'Rapid City page')}.</p>`,
  related: ['region:montana', 'city:montana/missoula', 'city:south-dakota/rapid-city', 'region:north-dakota', 'kp-index'],
});
