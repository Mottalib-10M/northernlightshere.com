import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('michigan', 'detroit');
const m = K.monthly('michigan', 'detroit');
const best = K.bestMonths('michigan', 'detroit', 3);
const ce = K.cloudExtremes('michigan', 'detroit');
const mq = K.facts('michigan', 'marquette');
const la = K.facts('michigan', 'lansing');
const to = K.facts('ohio', 'toledo');

export default defineCity({
  region: 'michigan',
  slug: 'detroit',
  title: 'Northern Lights Detroit 2026: Kp Needed, Tonight’s Verdict',
  description: `Northern lights in Detroit in 2026: a Kp ${K.kp(f.need)} storm needed from ${K.num(f.mlat, 1)}° magnetic latitude, tonight's hour by hour answer, and the darker shores north of the city.`,
  intro: 'Detroit is the Michigan city farthest from the aurora oval, and its river view points the wrong way, toward Canada in the south.',
  resume: `To see the northern lights from Detroit you need a planetary Kp of about ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, the lowest of the Michigan towns on this site and close to Toledo's ${K.num(to.mlat, 1)}, while Marquette, in the Upper Peninsula, needs only Kp ${K.kp(mq.need)}. The oval itself would pass overhead around Kp ${K.kp(f.overhead)}. Cloud is a serious limit in winter: the NASA POWER average for Detroit reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, against ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. Full darkness on the 15th spans ${K.num(m[11].hours, 1)} hours in December and only ${K.num(m[5].hours, 1)} in June. Taking both into account, ${best[0].name}, ${best[1].name} and ${best[2].name} hold the most clear dark hours. The tool below matches tonight's Kp forecast with National Weather Service sky cover for Detroit, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights in Detroit?', a: `Yes, but it takes a strong storm, about Kp ${K.kp(f.need)}, a ${K.gName(f.g)} level. On an ordinary active night the aurora stays below the horizon in southeast Michigan. When a storm of that size arrives after dark and the sky is clear, a low glow to the north is possible from outside the metro, and cameras record it best.` },
    { q: 'Where can people from Detroit go for a darker view north?', a: `North and northeast, away from the metro: the Lake Huron shore and the Thumb, or the lake country of north Oakland and Lapeer counties. Driving north also lowers the bar a little; Lansing needs about Kp ${K.kp(la.need)}. Avoid the riverfront downtown, which faces south across the water toward Windsor, Ontario.` },
    { q: 'Which month is best for aurora watching in Detroit, Michigan?', a: `${best[0].name}, on clear dark hours. NASA POWER gives Detroit a ${K.num(best[0].cloud, 0)}% average cloud amount that month, the lowest of the year, with ${K.num(best[0].hours, 1)} hours of full darkness on the 15th. ${ce.cloudiest.name} is the cloudiest month, at ${K.num(ce.cloudiest.cloud, 0)}%, so long winter nights are often wasted under overcast.` },
  ],
  body: (h) => `
<h2>Canada to the south, suburbs to the north</h2>
<p>Detroit has a geographic oddity that trips up aurora hunters: from downtown, Canada lies to the south. The Detroit River bends so that Windsor, Ontario, sits across the water below the city on the map, and the riverfront walks and parks face that way. They are pleasant places to stand at night, but they look at the southern sky, the one direction a storm at Detroit's threshold never reaches. Turn around and the northern horizon is the long spread of the suburbs up Woodward Avenue and into Oakland County, the brightest part of the region.</p>
<p>So the Detroit plan is a drive. The nearest open water to the northeast is Lake St. Clair, whose shoreline parks give a wider sky than any city street, though the far shore is lit too. For a genuinely dark horizon, the farmland of the Thumb and the Lake Huron shore beyond Port Huron are the realistic targets, and the ${h.a('region:michigan', 'Michigan page')} lists the darker sites farther north.</p>
<h2>Why a strong storm, and how strong</h2>
<p>At ${h.num(f.mlat, 1)} degrees magnetic latitude, Detroit sits between the Kp 6 and Kp 7 points of the NOAA storm scale, which the view line on this site links in a straight line. The result is a threshold of Kp ${h.kp(f.need)}, a ${h.gName(f.g)} storm, ${h.num((f.need ?? 0) - (mq.need ?? 0), 1)} Kp above what Marquette needs. Overhead aurora, the nights when color fills the sky to the south as well, would take about Kp ${h.kp(f.overhead)}, a level reached only in the biggest storms of a solar cycle.</p>${h.mini('kpNeed', { place: 'michigan/detroit', region: 'michigan' })}<p>Across the state line, Toledo needs about Kp ${h.kp(to.need)}, so southeast Michigan and northwest Ohio share the same odds; the ${h.a('city:ohio/cleveland', 'Cleveland page')} covers the Lake Erie side.</p>
<h2>Grey winters in the Detroit area</h2>
<p>The months with the longest nights are also the cloudiest here. NASA POWER averages put ${ce.cloudiest.name} at ${h.num(ce.cloudiest.cloud, 0)}%, and January is close behind, as storm systems and lake moisture keep low cloud over southeast Michigan. Early autumn is the window: ${ce.clearest.name} drops to ${h.num(ce.clearest.cloud, 0)}% with full darkness from ${m[8].start} to ${m[8].end} on the 15th, and October still offers ${h.num(m[9].hours, 1)} dark hours. When a strong storm is forecast, check the hourly cloud cover in the tool before driving north, since the Thumb and the metro can see different skies. The ${h.a('city:michigan/grand-rapids', 'Grand Rapids page')} shows the west side of the state.</p>`,
  related: ['region:michigan', 'city:michigan/grand-rapids', 'city:ohio/cleveland', 'aurora-forecast', 'geomagnetic-storm-scale'],
});
