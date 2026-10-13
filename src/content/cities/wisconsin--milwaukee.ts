import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('wisconsin', 'milwaukee');
const m = K.monthly('wisconsin', 'milwaukee');
const best = K.bestMonths('wisconsin', 'milwaukee', 3);
const ce = K.cloudExtremes('wisconsin', 'milwaukee');
const ch = K.facts('illinois', 'chicago');
const gb = K.facts('wisconsin', 'green-bay');

export default defineCity({
  region: 'wisconsin',
  slug: 'milwaukee',
  title: 'Northern Lights Milwaukee 2026: Kp Needed, Tonight’s Odds',
  description: `Northern lights in Milwaukee in 2026: a Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's hourly verdict with NWS clouds, and the clearest months.`,
  intro: 'Milwaukee looks east over Lake Michigan, so its aurora watchers turn their backs on the water and face a lit shoreline.',
  resume: `To see the northern lights from Milwaukee you need a planetary Kp of about ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, a touch more than Chicago's ${K.num(ch.mlat, 1)}, and the oval itself only reaches overhead around Kp ${K.kp(f.overhead)}. Green Bay, up the shore, needs Kp ${K.kp(gb.need)}. Full darkness on the 15th ranges from ${K.num(m[5].hours, 1)} hours in June to ${K.num(m[11].hours, 1)} in December. The lake shapes the cloud calendar in an unusual way: NASA POWER averages for Milwaukee peak in ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}% cloud amount, and bottom out in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%. Taking darkness and cloud together, ${best[0].name}, ${best[1].name} and ${best[2].name} offer the most clear dark hours. The tool below checks tonight's forecast against National Weather Service sky cover for Milwaukee, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights in Milwaukee?', a: `Yes, during storms of about Kp ${K.kp(f.need)} or stronger, a ${K.gName(f.g)} level on the NOAA scale, and from a spot with little light to the north. Ordinary active nights, Kp 4 or 5, usually leave the aurora below Milwaukee's horizon. When the storm is strong enough, the glow often shows first to the north and northeast over the lake.` },
    { q: 'Where should I go near Milwaukee for a dark view north?', a: `North along the lakeshore past the suburbs, or northwest into the Kettle Moraine country, where farmland and forest replace streetlights. The bluffs on the city's north side give a view over the water to the northeast. With a threshold of Kp ${K.kp(f.need)}, every bit of darkness between you and the northern horizon counts.` },
    { q: 'Why is spring so cloudy in Milwaukee for aurora watching?', a: `In NASA POWER averages, ${ce.cloudiest.name} is Milwaukee's cloudiest month at ${K.num(ce.cloudiest.cloud, 0)}%, while ${ce.clearest.name} is the clearest at ${K.num(ce.clearest.cloud, 0)}%. Lake Michigan stays cold well into spring, and mild, moist air crossing it often turns into low cloud and fog along the shore. Moving inland on a spring storm night can help.` },
  ],
  body: (h) => `
<h2>A lakefront city that faces east</h2>
<p>Milwaukee's identity is its lakefront, but for the aurora the lake sits on the wrong side. The shore runs roughly north to south, so the open water lies east of downtown and the northern horizon follows a line of suburbs up the coast. On a storm night the darkest direction from the lakefront is northeast, over the water, and that is often where the first glow shows. The bluffs north of downtown, along the residential lakeshore, lift you above the beach and give that northeast view, but the true north there is still lit.</p>
<p>The better answer is often inland. Northwest of the city, the Kettle Moraine country is a landscape of glacial hills, kettle lakes and forest, much darker than the shore. Pick a hilltop or an open field rather than a hollow, because the moraine's knobs can hide a low aurora as easily as a building can.</p>
<h2>A moderate storm, with little room to spare</h2>
<p>At ${h.num(f.mlat, 1)} degrees magnetic latitude, Milwaukee is about where the NOAA scale's second level begins to reach. The threshold, Kp ${h.kp(f.need)}, means the aurora rises into view in the north during ${h.gName(f.g)} storms, and the ${h.a('kp-index', 'Kp index page')} explains how to read the three-hour blocks of the forecast. Overhead aurora needs about Kp ${h.kp(f.overhead)}, so the nights when the whole sky lights up belong to the strong storms of the solar cycle. Madison, inland, sits at almost the same magnetic latitude; what separates the two cities is the lake's effect on cloud, not the storm needed.</p>
${h.mini('darkMonth', { place: 'wisconsin/milwaukee', month: 3 })}
<h2>The lake's cloud calendar</h2>
<p>Milwaukee's cloud year is different from that of inland Wisconsin. Lake Michigan warms slowly, so it stays cold into late spring, and humid air crossing it then tends to condense into low stratus and fog along the shore. In NASA POWER averages, that pushes ${ce.cloudiest.name} to ${h.num(ce.cloudiest.cloud, 0)}%, the cloudiest month of the year. Late summer reverses the pattern: the lake is warm, the air is drier, and ${ce.clearest.name} reaches the lowest cloud amount at ${h.num(ce.clearest.cloud, 0)}%. On December 15, full darkness runs from ${m[11].start} to ${m[11].end}, plenty of time if a storm and a clear spell coincide. The ${h.a('region:wisconsin', 'Wisconsin page')} compares the rest of the state, and the ${h.a('city:illinois/chicago', 'Chicago page')} covers the other big city on the same shore.</p>`,
  related: ['region:wisconsin', 'city:wisconsin/madison', 'city:illinois/chicago', 'city:wisconsin/green-bay', 'kp-index'],
});
