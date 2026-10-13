import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ab = K.facts('south-dakota', 'aberdeen');
const wt = K.facts('south-dakota', 'watertown');
const pi = K.facts('south-dakota', 'pierre');
const rc = K.facts('south-dakota', 'rapid-city');
const sf = K.facts('south-dakota', 'sioux-falls');
const ce = K.cloudExtremes('south-dakota', 'pierre');
const best = K.bestMonths('south-dakota', 'pierre', 3);

export default defineRegion({
  slug: 'south-dakota',
  title: 'Northern Lights South Dakota 2026: Tonight’s Odds by Town',
  description: `Northern lights in South Dakota in 2026: tonight's yes, maybe or no, from Kp ${K.kp(ab.need)} needed in Aberdeen to Kp ${K.kp(sf.need)} in Sioux Falls, and the dark hours by month.`,
  intro: 'South Dakota needs a moderate storm almost everywhere; its empty prairie and dry west make the most of one.',
  resume: `In South Dakota a moderate geomagnetic storm is the usual requirement for the northern lights. In the AACGM model the state's towns sit between ${K.num(sf.mlat, 1)} and ${K.num(ab.mlat, 1)} degrees magnetic latitude: Aberdeen, in the northeast, needs a planetary Kp of about ${K.kp(ab.need)}, Watertown about ${K.kp(wt.need)}, Pierre ${K.kp(pi.need)}, and both Rapid City and Sioux Falls about ${K.kp(rc.need)} to ${K.kp(sf.need)}, a ${K.gName(sf.g)} storm on the NOAA scale. What the state offers is space. Outside its two cities, the prairie and the reservations of the center and west hold some of the darkest skies of the Great Plains. Pierre's NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and its months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool opens on Pierre; type your own town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in South Dakota?', a: `Yes, during moderate geomagnetic storms. The thresholds computed here run from about Kp ${K.kp(ab.need)} in Aberdeen to Kp ${K.kp(sf.need)} in Sioux Falls, so a G2 storm usually brings the aurora into view from a dark spot looking north; the northeast corner needs only the low end of that level.` },
    { q: 'Where is the darkest place in South Dakota to watch the aurora?', a: 'The open country of the center and west, far from Rapid City and Sioux Falls: the grasslands along the Missouri reservoirs, the reservations of the west river country and the area around Badlands National Park. A place with no ranch lights to the north and a level horizon matters more than elevation.' },
    { q: 'What Kp is needed for the northern lights in Sioux Falls, South Dakota?', a: `About Kp ${K.kp(sf.need)}, a ${K.gName(sf.g)} storm, from a dark site north of the city. Sioux Falls sits at the southeastern corner of the state, which places it about as far from the aurora as any South Dakota town, and its lights are the brightest of the state.` },
  ],
  body: (h) => `
<h2>East river, west river</h2>
<p>South Dakotans divide their state at the Missouri, and the river also separates two aurora landscapes. East river is farm country with many small towns, lakes left by the glaciers and the larger population of Sioux Falls, Brookings and Watertown. The northeast corner, around Aberdeen and the glacial lakes of the Coteau des Prairies, is the best placed part of the state magnetically, at Kp ${h.kp(ab.need)}. West river is ranch land, with fewer roads, fewer lights and drier air, from the breaks of the Missouri to the Black Hills.</p>
<p>The thresholds differ by only about ${h.num(sf.need! - ab.need!, 1)} Kp across the state, much less than the difference in sky quality between a farmyard light and a remote pasture. On a storm night the decision is mostly about where the darkness and the clear air are.</p>
${h.mini('kpNeed', { place: 'south-dakota/aberdeen', region: 'south-dakota' })}
<h2>The Missouri reservoirs</h2>
<p>A string of large reservoirs follows the Missouri through the middle of the state, Lake Oahe above Pierre among them. Their shores face long distances of open water and grassland, and the country around them is very thinly settled. Looking north up a reservoir from a high bank gives the kind of flat, dark horizon that an aurora at the edge of the range requires. Pierre itself is small enough that a few minutes of driving takes you out of its light.</p>
<h2>What a G2 night looks like here</h2>
<p>At the threshold, the aurora over South Dakota is a pale arch close to the northern horizon, steady for long minutes and then suddenly brighter when a substorm sends rays up from it. The eye often reads it as grey or white; a phone camera shows green at the bottom and, in stronger storms, red above. Above Kp 7 the rays climb toward the zenith and the red glow can spread across the northern half of the sky. Keep watching after the first peak: substorms often come in a series an hour or two apart on a storm night.</p>
<h2>Seasons on the plains</h2>
<p>Summer thunderstorms and short nights limit June and July, with about ${h.num(h.monthly('south-dakota', 'pierre')[5].hours, 1)} hours of full darkness on June 15 in Pierre. Autumn brings long, often clear nights before the winter cold; winter adds hours of darkness but also cloud from passing systems and dangerous wind chill. The ${h.a('city:south-dakota/rapid-city', 'Rapid City page')} covers the Black Hills side of the state and the ${h.a('city:south-dakota/sioux-falls', 'Sioux Falls page')} the southeast. For lower thresholds, the ${h.a('region:north-dakota', 'North Dakota page')} is the neighbor to check.</p>`,
  related: ['city:south-dakota/rapid-city', 'city:south-dakota/sioux-falls', 'region:north-dakota', 'region:minnesota', 'kp-index'],
});
