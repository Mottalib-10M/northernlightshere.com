import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'whitehorse');
const m = K.monthly('canada', 'whitehorse');
const nd = K.noDarkMonths('canada', 'whitehorse');
const ce = K.cloudExtremes('canada', 'whitehorse');
const best = K.bestMonths('canada', 'whitehorse', 3);
const jn = K.cloudExtremes('alaska', 'juneau');
const jf = K.facts('alaska', 'juneau');

export default defineCity({
  region: 'canada',
  slug: 'whitehorse',
  title: 'Northern Lights Whitehorse 2026: Yukon Odds and Dark Hours',
  description: `Northern lights in Whitehorse in 2026: tonight's yes, maybe or no for the Yukon capital, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the late clock nights.`,
  intro: 'Whitehorse sits in the dry lee of the coastal mountains, close enough to the oval that a calm night can still bring it over the Yukon River.',
  resume: `From Whitehorse the northern lights need a planetary Kp of only about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'well below any storm'} on the NOAA scale. The Yukon capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, right where the edge of the oval rests on many ordinary nights, and at about Kp ${K.kp(f.overhead)} it is overhead. Daylight is the limit: from ${nd[0]} to ${nd[nd.length - 1]} the sky never gets fully dark, and even in April the dark window shrinks to ${K.num(m[3].hours, 1)} hours on the 15th. In mid-December it lasts ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end} on the clock. NASA POWER cloud amounts run from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first. The tool reads tonight's SWPC Kp blocks and MET Norway cloud cover for the town you type.`,
  faqs: [
    { q: 'What Kp do you need to see the aurora in Whitehorse?', a: `About Kp ${K.kp(f.need)}, which is a quiet to unsettled night rather than a storm. At ${K.num(f.mlat, 1)} degrees magnetic latitude, Whitehorse lies close to the resting edge of the oval, so a clear, dark sky is usually the deciding factor. On storm nights the light spreads across the whole sky instead of staying in the north.` },
    { q: 'Why does darkness start so late on the clock in Whitehorse?', a: `Because the Yukon keeps its clocks on a time far ahead of the sun for its longitude. On December 15 full darkness begins at ${m[11].start} and lasts until ${m[11].end}, later on both ends than the sun alone would suggest. Plan an evening out around ${m[11].start} at the earliest, and expect the best activity after local midnight.` },
    { q: 'Is Whitehorse clearer than Juneau for the northern lights?', a: `Usually, yes. The two towns lie on opposite sides of the Coast Mountains. Juneau's cloudiest month averages ${K.num(jn.cloudiest.cloud, 0)}% cloud amount in NASA POWER data, against ${K.num(ce.cloudiest.cloud, 0)}% for Whitehorse, and Juneau also needs about Kp ${K.kp(jf.need)} against Kp ${K.kp(f.need)}. Interior skies after a cold front give the best odds.` },
  ],
  body: (h) => `
<h2>On the dry side of the mountains</h2>
<p>Pacific storms that soak the Alaska Panhandle lose most of their moisture climbing the Coast Mountains and the St. Elias ranges, and Whitehorse, on the far side, gets what is left. The difference shows in the cloud averages: ${h.cloudExtremes('canada', 'whitehorse').clearest.name} in Whitehorse averages ${h.num(ce.clearest.cloud, 0)}% cloud amount, while the clearest month in Juneau sits at ${h.num(jn.clearest.cloud, 0)}%. That is not a desert sky, and summer and autumn are grey, but late winter here can stay clear for nights in a row once a cold air mass settles into the valley.</p>
<p>The town lies in the valley of the Yukon River, with ridges on both sides. Those ridges matter less than they would farther south, because at Kp ${h.kp(f.need)} the aurora does not need a flat horizon: on most active nights it climbs well above the hills, and during a storm it can cover the zenith. A short drive out of the downtown glow onto a ridge road or a lakeshore is enough.</p>
${h.mini('kpNeed', { place: 'canada/whitehorse', region: 'canada' })}
<h2>Midnight on the clock is not midnight in the sky</h2>
<p>The Yukon keeps its clocks well ahead of the sun. The practical effect is that darkness starts and ends later than visitors expect. In mid-January full darkness runs from ${h.monthly('canada', 'whitehorse')[0].start} to ${h.monthly('canada', 'whitehorse')[0].end}, and the most active part of the night, centered on magnetic midnight, often comes in the small hours. Waiting until after midnight, and staying until the first hint of blue, is a better plan than heading out at dinner time. The same shift works in your favor in spring: on April 15 the only fully dark stretch, ${h.num(m[3].hours, 1)} hours, begins only at ${h.monthly('canada', 'whitehorse')[3].start}, so a late season trip still has a window if you are willing to stay up for it.</p>
<h2>When the light comes back</h2>
<p>Darkness disappears from ${nd[0]} to ${nd[nd.length - 1]}, and returns quickly in late August. By mid-September there are ${h.num(m[8].hours, 1)} dark hours, ${h.num(m[9].hours, 1)} by mid-October, though those months are among the cloudiest. March offers the clearest sky with ${h.num(m[2].hours, 1)} hours of darkness on the 15th, which makes it the strongest single choice for a trip. Winter nights in between are longer still, but the sky in December and January is cloudier, and the deep cold of a still night in the valley can drop well below what most visitors have packed for. A heated car with a view of the north is a perfectly good observatory here. For a city deeper in the auroral zone, see the ${h.a('city:canada/yellowknife', 'Yellowknife page')}; across the border, the ${h.a('city:alaska/fairbanks', 'Fairbanks page')}.</p>`,
  related: ['region:canada', 'city:canada/yellowknife', 'city:alaska/fairbanks', 'city:alaska/juneau', 'dark-sky-hours'],
});
