import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('north-dakota', 'fargo');
const m = K.monthly('north-dakota', 'fargo');
const ce = K.cloudExtremes('north-dakota', 'fargo');
const best = K.bestMonths('north-dakota', 'fargo', 3);
const mp = K.facts('minnesota', 'minneapolis');

export default defineCity({
  region: 'north-dakota',
  slug: 'fargo',
  title: 'Northern Lights Fargo 2026: Tonight’s Odds and Kp Needed',
  description: `Northern lights in Fargo in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the flat Red River Valley and the best months.`,
  intro: 'Fargo needs one of the smallest storms of any sizable US city outside Alaska, and the Red River Valley around it is flat to the horizon.',
  resume: `From Fargo the northern lights need a planetary Kp of about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale, which makes it one of the easiest sizable cities in the lower 48 for the aurora. Fargo sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(f.mlat - mp.mlat, 1)} degrees more than Minneapolis, which needs about Kp ${K.kp(mp.need)}. At Kp ${K.kp(f.overhead)} the edge of the oval itself reaches the city, so on a G1 night it can be close to overhead. The flat bed of the old glacial lake that forms the Red River Valley leaves the horizon open on every side. Fargo's NASA POWER cloud amount is lowest in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%, and highest in ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}%. By clear dark hours the best months are ${K.listOf(best.map((b) => b.name))}.`,
  faqs: [
    { q: 'Can you see the northern lights from Fargo?', a: `Yes, more often than from most US cities. Fargo needs about Kp ${K.kp(f.need)}, the level of a minor G1 storm, which NOAA counts at about 1,700 per solar cycle. On a clear, dark night with that level forecast, a drive out of the city's glow onto the valley farmland gives a good chance.` },
    { q: 'Where should I go near Fargo to see the aurora?', a: 'North and away from the lights of Fargo and Moorhead: county roads through the open fields toward Argusville, Gardner or Hillsboro give flat horizons with very little light. The Red River Valley has no hills to climb, so distance from the city glow is what counts.' },
    { q: 'Is winter the best time for the aurora in Fargo?', a: `By clear dark hours, ${best[0].name} comes first in Fargo: mid-winter nights bring ${K.num(m[11].hours, 1)} hours of full darkness on December 15 and frequent clear spells under Arctic high pressure. The cold is severe, so the autumn months, with fewer dark hours but milder nights, are a reasonable alternative.` },
  ],
  body: (h) => `
<h2>The bed of Lake Agassiz</h2>
<p>Fargo sits in the middle of the Red River Valley, which is not a valley in the usual sense but the floor of an ancient glacial lake, Lake Agassiz, one of the flattest landscapes in North America. For aurora watching that flatness is the main local asset. The aurora at Fargo's threshold sits a few degrees above the northern horizon, and in the valley there are no ridges or forests to hide it, only the glow of towns. Ten or fifteen miles of driving north of the metro area are enough to reach dark farmland.</p>
<p>${h.mini('darkMonth', { place: 'north-dakota/fargo', month: 1 })}</p>
<h2>Why Fargo beats cities farther north</h2>
<p>Fargo lies at ${h.num(h.townRef('north-dakota', 'fargo').lat, 1)} degrees north, a little south of Seattle, yet needs about ${h.num(h.facts('washington', 'seattle').need! - f.need!, 1)} Kp less. The reason is the magnetic pole's position, which pulls the auroral oval south over central North America. For the same reason Fargo has the edge over Minneapolis, a few hours southeast. In the hierarchy of this site, only the Canadian border strip, northern Minnesota and Michigan's Upper Peninsula need smaller storms in the lower 48.</p>
<h2>Blizzards, inversions and clear Arctic nights</h2>
<p>Winter brings two kinds of weather to the valley: blizzards with blowing snow that hide everything, and calm, very cold nights under Arctic high pressure that are among the clearest of the year. The second kind is what aurora watchers wait for. Spring and autumn are milder, with ${h.num(m[2].hours, 1)} hours of darkness on March 15 and ${h.num(m[8].hours, 1)} on September 15. The ${h.a('region:north-dakota', 'North Dakota page')} compares the rest of the state, and the ${h.a('city:canada/winnipeg', 'Winnipeg page')} the city at the north end of the same valley.</p>`,
  related: ['region:north-dakota', 'city:north-dakota/bismarck', 'city:minnesota/minneapolis', 'city:canada/winnipeg', 'region:minnesota'],
});
