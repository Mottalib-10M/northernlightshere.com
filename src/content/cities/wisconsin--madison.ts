import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('wisconsin', 'madison');
const m = K.monthly('wisconsin', 'madison');
const best = K.bestMonths('wisconsin', 'madison', 3);
const ce = K.cloudExtremes('wisconsin', 'madison');
const mk = K.facts('wisconsin', 'milwaukee');
const wa = K.facts('wisconsin', 'wausau');

export default defineCity({
  region: 'wisconsin',
  slug: 'madison',
  title: 'Northern Lights Madison 2026: Tonight’s Odds and Kp Needed',
  description: `Northern lights in Madison, Wisconsin, in 2026: tonight's verdict hour by hour, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and views across Lake Mendota.`,
  intro: 'Madison has a lake on its northern doorstep, which gives the isthmus a darker north than most cities its size.',
  resume: `Madison needs a planetary Kp of about ${K.kp(f.need)} before the northern lights climb above its horizon, a ${K.gName(f.g)} storm on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, practically level with Milwaukee (${K.num(mk.mlat, 1)} degrees), and the edge of the oval comes overhead only near Kp ${K.kp(f.overhead)}. Driving north helps: Wausau needs Kp ${K.kp(wa.need)}. Mid-December brings ${K.num(m[11].hours, 1)} hours of full darkness, from ${m[11].start} to ${m[11].end}; mid-June only ${K.num(m[5].hours, 1)}. For clouds, NASA POWER averages range from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours are ${best[0].name}, ${best[1].name} and ${best[2].name}, the autumn stretch when nights lengthen before winter cloud settles in. The tool below compares tonight's Kp forecast with National Weather Service sky cover for Madison.`,
  faqs: [
    { q: 'Can you see the northern lights from Madison, Wisconsin?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or more, a ${K.gName(f.g)} level, on a clear night with a low view north. Lake Mendota helps: its open surface north of the isthmus keeps lights at a distance. Below that level, the aurora generally stays under Madison's horizon, apart from faint traces a phone may record.` },
    { q: 'Where can you watch the aurora around Madison?', a: `The south shore of Lake Mendota, looking north across the water, is the closest good view to downtown. For a darker sky, head north or northwest out of Dane County into farmland, away from the glow of the city. Madison's threshold of Kp ${K.kp(f.need)} leaves the aurora low in the north, so a flat horizon matters more than altitude.` },
    { q: 'Which months are best for northern lights in Madison?', a: `${best[0].name} and ${best[1].name}, by clear dark hours: the nights are long again, and the cloud amount stays moderate, about ${K.num(best[0].cloud, 0)}% in ${best[0].name} in NASA POWER averages. ${ce.cloudiest.name} is Madison's cloudiest month, at ${K.num(ce.cloudiest.cloud, 0)}%. The equinox season is also when SWPC notes geomagnetic storms are more common.` },
  ],
  body: (h) => `
<h2>Looking north over Lake Mendota</h2>
<p>Few cities of Madison's size have a dark northern view within walking distance of downtown. The center of the city sits on a narrow isthmus between two lakes, with Lake Monona to the south and the larger Lake Mendota to the north. From the Mendota shore, the water stretches away northward, and the nearest bright lights are on the far bank. On a storm night that open surface does what a hilltop does elsewhere: it pushes the city glow back and gives a low aurora room to show. The lake is not a dark sky site, and the glow of the isthmus behind you still washes out faint detail, but as a first look before driving out, it works better than most city parks.</p>
<p>For a full view, the countryside north and northwest of Dane County is the next step. The land there rolls gently, with wide fields and few lights, and a ridge or an open road shoulder gives a clean horizon. Southwest of the city the Driftless hills begin, beautiful but full of valleys that hide the low north.</p>
<h2>A G2 city with a G1 drive</h2>
<p>At Kp ${h.kp(f.need)}, Madison sits at the start of the ${h.gName(f.g)} range. Up Interstate 39, Wausau and the Northwoods need only Kp ${h.kp(wa.need)}, and the Lake Superior coast is lower still. On a forecast night with Kp hovering between those two figures, the drive north can turn a probable no into a maybe.</p>${h.mini('kpNeed', { place: 'wisconsin/madison', region: 'wisconsin' })}<p>The ${h.a('aurora-forecast', 'three-day forecast page')} shows which nights are worth that drive, and the ${h.a('region:wisconsin', 'Wisconsin page')} gives the threshold of every town on the way.</p>
<h2>Autumn, the Madison season</h2>
<p>Inland from Lake Michigan, Madison escapes the spring lake cloud that hangs over Milwaukee, and its clearest stretch comes from late summer through autumn. That is when ${best[0].name} and ${best[1].name} lead the year in clear dark hours. Winter nights are longer, but ${ce.cloudiest.name} averages ${h.num(ce.cloudiest.cloud, 0)}% cloud amount, and a storm then is more often hidden. A clear winter night after a cold front is still a good chance, as long as you dress for the cold. The ${h.a('city:wisconsin/milwaukee', 'Milwaukee page')} shows how much the lakeshore changes the calendar for a city at the same magnetic latitude.</p>`,
  related: ['region:wisconsin', 'city:wisconsin/milwaukee', 'city:minnesota/minneapolis', 'city:illinois/chicago', 'aurora-forecast'],
});
