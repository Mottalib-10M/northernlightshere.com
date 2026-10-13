import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const as = K.facts('wisconsin', 'ashland');
const wa = K.facts('wisconsin', 'wausau');
const gb = K.facts('wisconsin', 'green-bay');
const md = K.facts('wisconsin', 'madison');
const mk = K.facts('wisconsin', 'milwaukee');
const ceAs = K.cloudExtremes('wisconsin', 'ashland');
const bestWa = K.bestMonths('wisconsin', 'wausau', 2);

export default defineRegion({
  slug: 'wisconsin',
  title: 'Northern Lights Wisconsin 2026: Tonight and Kp by Town',
  description: `Northern lights in Wisconsin in 2026: about Kp ${K.kp(as.need)} on the Lake Superior shore, Kp ${K.kp(md.need)} for Madison and Milwaukee, and tonight's verdict for every town.`,
  intro: 'Wisconsin has two coasts, and only the northern one faces the aurora.',
  resume: `In Wisconsin the northern lights are a minor storm affair along Lake Superior and a moderate storm affair everywhere else. Ashland and Superior, on the state's northern shore, sit near ${K.num(as.mlat, 1)} degrees magnetic latitude in the AACGM model and need about Kp ${K.kp(as.need)}, a ${K.gName(as.g)} storm on the NOAA scale. The Northwoods and the center of the state come next: Wausau needs Kp ${K.kp(wa.need)}. Green Bay needs Kp ${K.kp(gb.need)}, and the two big southern cities, Madison and Milwaukee, both about Kp ${K.kp(md.need)}, a ${K.gName(md.g)} storm. Clouds matter as much as latitude. On the Superior shore, NASA POWER averages run from ${K.num(ceAs.clearest.cloud, 0)}% cloud amount in ${ceAs.clearest.name} to ${K.num(ceAs.cloudiest.cloud, 0)}% in ${ceAs.cloudiest.name}, and in Wausau the months with the most clear dark hours are ${bestWa[0].name} and ${bestWa[1].name}. The tool opens on Milwaukee; type any Wisconsin town or ZIP code for its own hourly verdict.`,
  faqs: [
    { q: 'Where is the best place in Wisconsin to see the northern lights?', a: `The Lake Superior shore around Bayfield, Ashland and Superior, where the threshold is about Kp ${K.kp(as.need)} and open water lies to the north. The Apostle Islands National Lakeshore, at the tip of the Bayfield Peninsula, adds a dark shoreline. In the Northwoods, any lake with a clear northern shore works on a ${K.gName(wa.g)} night.` },
    { q: 'What Kp is needed to see the aurora in southern Wisconsin?', a: `About Kp ${K.kp(md.need)} for Madison and Milwaukee, a ${K.gName(md.g)} storm or stronger on the NOAA scale, seen from a dark place with a low northern horizon. On weaker nights the aurora usually stays below the horizon of southern Wisconsin, though a long phone exposure can sometimes record a faint glow that the eye misses.` },
    { q: 'Does Lake Michigan help aurora viewing in eastern Wisconsin?', a: `Less than you might think, because Lake Michigan lies to the east of Milwaukee, Sheboygan and Green Bay, not to the north. It gives a dark view northeast, which still helps on strong storms. Green Bay needs Kp ${K.kp(gb.need)}; the bay's eastern shore and the Door Peninsula offer the darkest lakeside views on that side of the state.` },
  ],
  body: (h) => `
<h2>Bayfield, the Apostle Islands and the north coast</h2>
<p>Wisconsin's best aurora ground is its short Lake Superior coast, which faces north across open water toward Ontario. The Bayfield Peninsula pushes out into the lake there, and the National Park Service manages the ${h.ext('https://www.nps.gov/apis/index.htm', 'Apostle Islands National Lakeshore')} at its northern tip: 21 islands and a stretch of mainland shoreline with very little light. Ashland, at the head of Chequamegon Bay, and Superior, across the harbor from Duluth, both need about Kp ${h.kp(as.need)}, which puts the north coast within reach of a ${h.gName(as.g)} storm on a clear night. The same shore also brings lake cloud in early winter, which is why ${ceAs.cloudiest.name} is the greyest month there.</p>
<h2>The Northwoods, the middle and the south</h2>
<p>Below the Superior coast the state is a long slope of rising thresholds. The Northwoods lake country, with its scattered small lakes and few towns, sits between the coast and Wausau, which needs Kp ${h.kp(wa.need)}. The center of the state, around Eau Claire and Stevens Point, needs about Kp ${h.kp(h.facts('wisconsin', 'eau-claire').need)}, and the south needs Kp ${h.kp(md.need)}. Between the coast and Milwaukee the threshold rises by about ${h.num(mk.need! - as.need!, 1)} Kp, a full step on the storm scale. The southwest corner, the hilly Driftless Area along the Mississippi, is dark but deeply cut by valleys: watch from a ridge top, not from a coulee bottom.</p>
${h.mini('darkMonth', { place: 'wisconsin/wausau', month: 10 })}
<h2>Wisconsin's eastern shore faces the wrong way</h2>
<p>Lake Michigan gives eastern Wisconsin its most open horizons, but they point east. From Milwaukee, Sheboygan or Manitowoc, the lake covers the northeast at best, and the north runs up a lit shoreline. Green Bay is a partial exception: the bay itself reaches northeast from the city, and the Door Peninsula offers dark shores with water to the north and east. Inland, the flat farmland of the Fox Valley often gives a cleaner northern view than the coast. The pages for ${h.a('city:wisconsin/milwaukee', 'Milwaukee')}, ${h.a('city:wisconsin/madison', 'Madison')} and ${h.a('city:wisconsin/green-bay', 'Green Bay')} go into each city, and the ${h.a('region:minnesota', 'Minnesota page')} covers the other side of the St. Croix.</p>`,
  related: ['city:wisconsin/milwaukee', 'city:wisconsin/madison', 'city:wisconsin/green-bay', 'region:minnesota', 'region:michigan', 'aurora-map'],
  extraSources: [{ name: 'National Park Service, Apostle Islands National Lakeshore', url: 'https://www.nps.gov/apis/index.htm' }],
});
