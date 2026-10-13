import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('pennsylvania', 'pittsburgh');
const m = K.monthly('pennsylvania', 'pittsburgh');
const ce = K.cloudExtremes('pennsylvania', 'pittsburgh');
const best = K.bestMonths('pennsylvania', 'pittsburgh', 3);
const er = K.facts('pennsylvania', 'erie');

export default defineCity({
  region: 'pennsylvania',
  slug: 'pittsburgh',
  title: 'Northern Lights Pittsburgh 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Pittsburgh in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the hills in the way and the clearest months.`,
  intro: 'Pittsburgh needs a strong storm, a break in its famously grey skies and a hilltop that looks north.',
  resume: `From Pittsburgh you need a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale. In the AACGM model the city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude, about ${K.num(er.mlat - f.mlat, 1)} degrees below Erie, which needs ${K.kp(er.need)}, and the aurora would reach overhead only around Kp ${K.kp(f.overhead)}. A Pittsburgh sighting is therefore a glow low in the north during a big storm. The local obstacles are the terrain, steep hills and river valleys that close much of the horizon, and the sky: the NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, one of the cloudiest winters among the cities on this site, and falls to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first, so autumn storms have the best odds.`,
  faqs: [
    { q: 'Can you see the northern lights from Pittsburgh?', a: `During strong storms, yes: about Kp ${K.kp(f.need)} or more, from a high place with an open view to the north, away from the city lights. The G5 storm of May 2024 was seen across western Pennsylvania. On a typical Kp 5 night the aurora stays below Pittsburgh's horizon.` },
    { q: 'Where should Pittsburgh residents go to see the aurora?', a: 'North and up: the high ground of Butler and Armstrong counties, or farther north toward the forests of the Allegheny Plateau, where hilltops look across country with few lights. Inside the city, river valleys and hillsides block the low northern sky that matters on a storm night.' },
    { q: 'What months are best for aurora chances in Pittsburgh?', a: `${K.listOf(best.map((b) => b.name))}, by the clear dark hours computed from NASA POWER cloud averages and the Sun's position. Winter nights are longer, with ${K.num(m[11].hours, 1)} hours of full darkness on December 15, but ${ce.cloudiest.name} is often overcast for days at a time.` },
  ],
  body: (h) => `
<h2>A city of hills and grey skies</h2>
<p>Pittsburgh is built where the Allegheny and the Monongahela meet to form the Ohio, and its neighborhoods climb steep hillsides above the rivers. That topography is the first thing to plan around. An aurora at the city's threshold, Kp ${h.kp(f.need)}, rises only a few degrees above the true northern horizon, and from most of the city a hill, a ridge or a row of houses stands higher than that. The second thing is the weather: the Ohio valley sits under the track of many winter systems and in the reach of lake-effect clouds from Lake Erie, and long grey spells are common from November to March.</p>
<p>The answer is to go north and up. The plateau north of the city rises gently toward the Allegheny National Forest, with farms, woods and small towns. Within an hour, an open hilltop in Butler County gives a far better view than anything inside the city, and within two or three hours the north tier offers some of the darkest skies in the state.</p>
${h.mini('darkMonth', { place: 'pennsylvania/pittsburgh', month: 10 })}
<h2>Strong storms only</h2>
<p>A threshold of Kp ${h.kp(f.need)} means waiting for SWPC watches of G3 or more. NOAA counts about ${h.P.facts.gScale[2].perCycle} G3 storms per eleven-year cycle, concentrated in the active years, and fewer each year as the ${h.a('solar-cycle', 'solar cycle')} declines. Many of those storms peak during daylight in Pennsylvania or under cloud. That makes each clear storm night worth acting on quickly: when the hour strip of the tool shows a run of hours with Kp at the threshold and a clear sky, the time to leave is at the start of the run, not at its end.</p>
<h2>What to expect</h2>
<p>From the Pittsburgh area, a storm aurora usually appears as a red or pink glow over the northern horizon, with pale vertical rays at its brightest moments. The eye sees it faintly; a phone records it far better. For the rest of the state see the ${h.a('region:pennsylvania', 'Pennsylvania page')}, and for the city across the state, the ${h.a('city:pennsylvania/philadelphia', 'Philadelphia page')}.</p>`,
  related: ['region:pennsylvania', 'city:pennsylvania/philadelphia', 'city:ohio/cleveland', 'city:new-york/buffalo', 'geomagnetic-storm-scale'],
});
