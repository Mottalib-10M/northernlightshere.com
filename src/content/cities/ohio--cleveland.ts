import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('ohio', 'cleveland');
const m = K.monthly('ohio', 'cleveland');
const best = K.bestMonths('ohio', 'cleveland', 3);
const ce = K.cloudExtremes('ohio', 'cleveland');
const ak = K.facts('ohio', 'akron');
const to = K.facts('ohio', 'toledo');

export default defineCity({
  region: 'ohio',
  slug: 'cleveland',
  title: 'Northern Lights Cleveland 2026: Kp Needed Over Lake Erie',
  description: `Northern lights in Cleveland in 2026: a Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's hourly answer, and why the Lake Erie shore is the spot.`,
  intro: 'Cleveland is one of the few big Midwest cities whose lakefront faces due north, the direction a strong storm rises from.',
  resume: `From Cleveland the northern lights need a planetary Kp of about ${K.kp(f.need)}, which the NOAA scale counts as a ${K.gName(f.g)} storm. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, a little south of Toledo's ${K.num(to.mlat, 1)}, and the oval would only pass overhead around Kp ${K.kp(f.overhead)}. The lake to the north gives the city an open horizon that most inland towns lack. Akron, to the south, needs about Kp ${K.kp(ak.need)}. Clouds are the bigger obstacle here: NASA POWER averages for Cleveland reach ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, its greyest month, and fall to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. Full darkness on the 15th lasts ${K.num(m[11].hours, 1)} hours in December and ${K.num(m[5].hours, 1)} in June. Weighing dark hours against cloud, ${best[0].name}, ${best[1].name} and ${best[2].name} come out best. The tool below compares tonight's Kp forecast with National Weather Service sky cover for Cleveland, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights from Cleveland, Ohio?', a: `Yes, during strong storms. Cleveland needs about Kp ${K.kp(f.need)}, a ${K.gName(f.g)} level, so the usual active night at Kp 4 or 5 leaves nothing visible. When a storm of that strength meets a clear night, the glow appears low over Lake Erie, and a camera often records color before the eye does.` },
    { q: 'Where should I watch the aurora along the Cleveland lakefront?', a: `Anywhere the shore lets you put the lake in front and the downtown lights behind or beside you. The farther you go from the city center toward the east or west suburbs, the darker the water horizon. At Kp ${K.kp(f.need)} the aurora stays within a few fist widths of the horizon, so a high bluff beats a low beach.` },
    { q: 'Why is winter so cloudy for aurora watching in Cleveland?', a: `Lake Erie stays unfrozen and relatively warm into early winter, and cold air crossing it picks up moisture that turns into lake-effect cloud and snow on the south shore. NASA POWER averages put Cleveland's cloud amount at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%, gives a storm a much better chance.` },
    { q: 'Is Cuyahoga Valley National Park good for northern lights near Cleveland?', a: `It is darker than the city, but Cleveland's glow sits to its north, the direction the aurora comes from, and the valley floor hides the low horizon. For a storm near Kp ${K.kp(f.need)}, a ridge or open field on the valley rim works better than the river bottom. Check park hours before going at night.` },
  ],
  body: (h) => `
<h2>The north coast, literally</h2>
<p>Cleveland calls itself the North Coast, and for aurora purposes the name is accurate. Lake Erie spreads out directly north of downtown, so the lakefront parks, breakwalls and shoreline bluffs face the same direction an aurora rises from. Inland Midwest cities have to find a hill or a cleared field to see the bottom of the northern sky; here the lake gives that view for free. A storm at Kp ${h.kp(f.need)} puts the glow just above the water, a low arc or a faint wash of green and red that can easily hide behind a row of houses but shows plainly over open lake.</p>
<p>The trade off is light. The lakefront next to downtown is bright, and the glow of the city spreads out over the water as well as inland. The most useful spots are the shoreline parks well east or west of the center, where the lake still lies to the north but the lights fall away behind you.</p>
<h2>Thresholds south of the lake</h2>
<p>Leaving the shore for darker country means accepting the city glow on your northern horizon. ${h.ext('https://www.nps.gov/cuva/index.htm', 'Cuyahoga Valley National Park')}, which the National Park Service describes as lying a short distance from Cleveland and Akron, is much darker than the city, but downtown sits to its north. Akron's threshold, Kp ${h.kp(ak.need)}, is barely different from Cleveland's, so the move south buys darkness, not a lower bar. ${h.mini('darkMonth', { place: 'ohio/cleveland', month: 2 })} The ${h.a('region:ohio', 'Ohio page')} covers Geauga County's dark sky park to the east, and the ${h.a('city:ohio/columbus', 'Columbus page')} shows how the numbers shift in the center of the state.</p>
<h2>Picking a night through the lake cloud</h2>
<p>In Cleveland the calendar matters as much as the forecast. From late autumn into winter, Arctic air crossing the warmer lake builds bands of cloud and snow over the south shore, especially on the east side of the city and into the hills beyond it. NASA POWER's averages for Cleveland reach ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the long winter nights rarely line up with a clear sky. September is the opposite case, with a cloud amount near ${h.num(ce.clearest.cloud, 0)}% and dark hours lengthening fast, from ${m[8].start} to ${m[8].end} on the 15th. When a strong storm is forecast in the snow season, check the hourly sky cover in the tool: lake-effect bands can leave the west side or areas south of Akron clear while the east side is buried. The ${h.a('aurora-forecast', 'aurora forecast page')} explains how far ahead such a storm can be seen coming.</p>`,
  related: ['region:ohio', 'city:ohio/columbus', 'city:michigan/detroit', 'aurora-forecast', 'geomagnetic-storm-scale'],
  extraSources: [{ name: 'National Park Service, Cuyahoga Valley National Park', url: 'https://www.nps.gov/cuva/index.htm' }],
});
