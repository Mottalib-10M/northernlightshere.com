import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = K.P.facts.gScale;
const fb = K.facts('alaska', 'fairbanks');
const an = K.facts('alaska', 'anchorage');
const intl = K.facts('minnesota', 'international-falls');
const ely = K.facts('minnesota', 'ely');
const mi = K.facts('north-dakota', 'minot');
const dk = K.facts('north-dakota', 'dickinson');
const ho = K.facts('michigan', 'houghton');
const dl = K.facts('minnesota', 'duluth');
const mq = K.facts('michigan', 'marquette');
const hv = K.facts('montana', 'havre');
const ka = K.facts('montana', 'kalispell');
const tc = K.facts('michigan', 'traverse-city');
const ss = K.facts('michigan', 'sault-ste-marie');
const er = K.facts('pennsylvania', 'erie');
const mp = K.facts('minnesota', 'minneapolis');
const ch = K.facts('illinois', 'chicago');
const fbNoDark = K.noDarkMonths('alaska', 'fairbanks');
const avgCloud = (r: string, s: string, months: number[]) => { const m = K.monthly(r, s); return months.reduce((a, i) => a + m[i - 1].cloud, 0) / months.length; };
const winter = [11, 12, 1, 2];
const dlCloud = avgCloud('minnesota', 'duluth', winter);
const mqCloud = avgCloud('michigan', 'marquette', winter);
const dkCloud = avgCloud('north-dakota', 'dickinson', winter);
const fbCloud = avgCloud('alaska', 'fairbanks', winter);

export default definePage({
  id: 'best-places-northern-lights-usa',
  group: 'guides',
  order: 10,
  slug: 'best-places-northern-lights-usa',
  nav: 'Best places in the US',
  card: 'The US spots that need the smallest storm, with dark sky parks checked on official pages',
  title: 'Best Places to See Northern Lights in the US 2026, Ranked',
  description: `Best places to see the northern lights in the US in 2026: Fairbanks needs about Kp ${K.kp(fb.need)}, northern Minnesota about ${K.kp(intl.need)}, plus dark sky parks and cloud odds.`,
  h1: 'The best places to see the northern lights in the United States',
  intro: 'Ranked by the storm each place needs, then checked against darkness, cloud and the official dark sky sites nearby.',
  resume: `The best place in the United States to see the northern lights is interior Alaska: Fairbanks sits at ${K.num(fb.mlat, 1)} degrees magnetic latitude and needs only about Kp ${K.kp(fb.need)}, so aurora shows on most clear dark nights, but it has no astronomical darkness at all in ${K.listOf(fbNoDark)}. In the lower 48 the easiest places are along the Canadian border of Minnesota and North Dakota: International Falls needs about Kp ${K.kp(intl.need)}, Ely ${K.kp(ely.need)} and Minot ${K.kp(mi.need)}, all below the G1 storm threshold. The Keweenaw and the north shore of Lake Superior follow, with Houghton at Kp ${K.kp(ho.need)} and Duluth at ${K.kp(dl.need)}. Montana's Hi-Line, with Havre at Kp ${K.kp(hv.need)}, matches Duluth. South of these, every step costs a rarer storm: Minneapolis needs Kp ${K.kp(mp.need)}, a ${K.gName(mp.g)} storm, and Chicago Kp ${K.kp(ch.need)}, a ${K.gName(ch.g)} storm. Geometry decides the ranking; dark skies, a northern horizon and winter cloud decide the night.`,
  faqs: [
    { q: 'Where in the lower 48 do you need the smallest storm to see aurora?', a: `Along the Minnesota and North Dakota border with Canada. On this site's magnetic latitudes, International Falls needs about Kp ${K.kp(intl.need)}, Ely about ${K.kp(ely.need)} and Minot about ${K.kp(mi.need)}, all under the Kp 5 line where NOAA's G1 storm level starts. Those values follow SWPC's rule for the edge of the oval, so a moderately active night with no storm at all can be enough when the sky is clear and dark.` },
    { q: 'Is Alaska worth the trip just for the northern lights?', a: `For the odds, yes: Fairbanks needs about Kp ${K.kp(fb.need)}, which SWPC's oval rule reaches on most nights, and Anchorage about Kp ${K.kp(an.need)}. The catch is the calendar. Fairbanks has no astronomical darkness on the 15th of ${K.listOf(fbNoDark)}, so a summer visit misses the show. SWPC itself warns that summer trips to the Arctic for aurora usually do not work.` },
    { q: 'Do dark sky parks give a better view of the northern lights?', a: 'They remove one obstacle, artificial light, which hides the faint arcs of an ordinary night. They do not change the storm you need, which depends on magnetic latitude alone. Headlands near Mackinaw City in Michigan is an International Dark Sky Park on its county page, and Voyageurs in Minnesota lists two designated dark sky viewing areas. Both still need a clear northern horizon.' },
    { q: 'Why is northern Maine harder than northern Minnesota for aurora?', a: `Because the magnetic pole sits in the Canadian Arctic, closer to the middle of the continent than to New England. Caribou, at almost the same geographic latitude as Duluth, needs about Kp ${K.kp(K.facts('maine', 'caribou').need)} against ${K.kp(dl.need)} for Duluth, according to the AACGM magnetic latitudes the site uses. The difference is roughly one step on the Kp scale, which turns a G1 storm into a G2.` },
    { q: 'Which month has the fewest clouds for aurora around Lake Superior?', a: `It varies along the shore. In the NASA POWER climatology for 2001 to 2025, Duluth averages about ${K.num(dlCloud, 0)}% cloud from November to February while Marquette averages about ${K.num(mqCloud, 0)}% over the same months. The state and city pages list each month. Late summer and early fall are usually the least cloudy weeks there, and the nights are already long enough to watch.` },
    { q: 'Can you see the northern lights in a national park in North Dakota?', a: `Sometimes. The National Park Service writes that the northern lights may occasionally be visible from Theodore Roosevelt National Park, and it also warns that oil and gas development around the park adds light pollution. Dickinson, the nearest town in the site's data, needs about Kp ${K.kp(dk.need)}, a ${K.gName(dk.g)} storm, so a G1 night with clear skies is the realistic chance there.` },
  ],
  body: (h) => `
<h2>The ranking, by the storm each place needs</h2>
<p>Every place in this guide is placed by one number: the Kp at which aurora rises into view above its northern horizon. That number comes from the magnetic latitude of the place, computed with the AACGM-v2 model, and from the visibility rule published on the ${h.a('method', 'method page')}, which at each Kp takes the more southern of two lines: the edge of the oval in SWPC's ${h.src('swpc_tips', 'viewing tips')}, and the latitudes where the ${h.src('swpc_scales', 'NOAA Space Weather Scales')} say aurora has been seen during storms. The list below keeps only places a traveler could actually base a night from, a town with roads, lodging and a dark edge within a short drive.</p>
${h.table(['Place', 'Magnetic latitude', 'Kp to see aurora', 'Storm level'], [fb, an, intl, ely, mi, ho, dl, hv, mq, dk, ka, tc, mp, ch].map((f) => [f.label, `${h.num(f.mlat, 1)}°`, h.kp(f.need), h.gName(f.g)]), 'Kp needed from the site’s view line; magnetic latitudes from AACGM-v2 at 110 km.', ['l', 'r', 'r', 'l'])}
<p>The order surprises people who think in ordinary latitude. Minot in North Dakota lies slightly south of Havre in Montana, yet it needs a lower Kp than any Montana town in the data, and Duluth needs about Kp ${h.kp(dl.need)} against ${h.kp(h.facts('washington', 'seattle').need)} for Seattle although the two cities sit within a degree of latitude. The reason is the position of the north magnetic pole, which the ${h.src('ncei_poles', 'NOAA National Centers for Environmental Information')} track as it drifts across the Arctic: the American Midwest faces it more directly than the Pacific Northwest or New England.</p>
<p>The gaps also matter more than the order. Between Fairbanks at Kp ${h.kp(fb.need)} and Minneapolis at Kp ${h.kp(mp.need)} the difference is not a long drive but a different kind of night. NOAA counts about ${G[0].perCycle.toLocaleString('en-US')} G1 storms per eleven-year solar cycle and about ${G[1].perCycle} G2 storms, so a town that needs a G2 storm gets roughly a third as many chances as a town that needs a G1. Below the Kp 5 line no storm is needed at all, and the odds depend mostly on darkness and the weather.</p>

<h2>Interior Alaska: under the oval, short of darkness</h2>
<p>Fairbanks, the largest town of the Alaska interior, sits almost under the auroral oval even on a quiet night. SWPC's ${h.src('swpc_aurora', 'aurora page')} puts the best viewing between about 60 and 75 degrees of latitude, and the town's magnetic latitude of ${h.num(fb.mlat, 1)} degrees lands in the middle of that band. A night with Kp ${h.kp(fb.need)} or more, which is most nights, brings the light overhead or close to it. Anchorage, farther south and on the coast, needs about Kp ${h.kp(an.need)}, still no storm at all.</p>
<p>The limit in Alaska is the Sun. On the 15th of ${h.listOf(fbNoDark)}, the Sun never sinks 18 degrees below the horizon at Fairbanks, so the sky never reaches full darkness and faint aurora is lost in twilight. The season really runs from late August to mid-April. Winter cloud is the other filter: the NASA POWER record gives Fairbanks about ${h.num(fbCloud, 0)}% average cloud from November to February. For a park setting, the National Park Service describes ${h.ext('https://www.nps.gov/dena/learn/nature/aurora.htm', 'Denali')} as a strong aurora site because of its far northern latitude and very limited light pollution, and it advises letting your eyes adapt for at least 30 minutes.</p>

<h2>The northern border of the lower 48</h2>
<p>The best odds south of Canada are in a strip from Minot in North Dakota to the Arrowhead of Minnesota. International Falls, on the Rainy River, needs about Kp ${h.kp(intl.need)}; Ely, at the edge of the Boundary Waters, needs about ${h.kp(ely.need)}. Both sit below the line where a G1 storm begins, which means a moderately active night can do it. Nearby ${h.ext('https://www.nps.gov/voya/planyourvisit/stargazing.htm', 'Voyageurs National Park')} names two designated dark sky viewing areas on its stargazing page: the Meadwood Road day use area on the Ash River Visitor Center road and the upper parking lot of the Rainy Lake Visitor Center. The same page says the park is still working to reduce its lighting to become a Dark Sky Park, so it is not yet certified.</p>
<p>West of the Red River, Minot needs about Kp ${h.kp(mi.need)} and Dickinson about ${h.kp(dk.need)}. The badlands of ${h.ext('https://www.nps.gov/thro/learn/nature/lightscape.htm', 'Theodore Roosevelt National Park')} lie just west of Dickinson; the Park Service says the northern lights may occasionally be visible there and warns of light pollution from the oil and gas fields around the park. The plains have one advantage over the forests to the east: the northern horizon is open almost everywhere, and the NASA POWER record gives Dickinson about ${h.num(dkCloud, 0)}% average cloud from November to February.</p>
<p>Montana's Hi-Line follows the border west. Havre needs about Kp ${h.kp(hv.need)}, the same as Duluth, while Kalispell near Glacier needs about ${h.kp(ka.need)} because the mountains of the Northwest sit farther from the magnetic pole. The ${h.a('region:montana', 'Montana page')} ranks its towns.</p>

<h2>Lake Superior and the Great Lakes shore</h2>
<p>Lake Superior gives what few inland places can: a flat, unlit northern horizon over open water. Houghton on the Keweenaw needs about Kp ${h.kp(ho.need)}, Duluth about ${h.kp(dl.need)}, ${h.a('city:michigan/marquette', 'Marquette')} about ${h.kp(mq.need)} and Sault Ste. Marie about ${h.kp(ss.need)}. All four are G1 territory or just short of it. Cloud is the price: the NASA POWER climatology gives Marquette about ${h.num(mqCloud, 0)}% average cloud from November to February, against about ${h.num(dlCloud, 0)}% at Duluth. The ${h.a('city:minnesota/duluth', 'Duluth page')} and the ${h.a('region:michigan', 'Michigan page')} give the full month by month figures.</p>
<p>Farther south on Lake Michigan, ${h.ext('https://www.emmetcounty.org/headlands/', 'the Headlands')} near Mackinaw City is run by Emmet County as an International Dark Sky Park; its grounds and viewing areas are open around the clock every day of the year, and only red lights are allowed in the designated viewing area. It sits between Traverse City, which needs about Kp ${h.kp(tc.need)}, and Sault Ste. Marie, so a G1 or G2 storm is the usual requirement there.</p>
<p>In Pennsylvania, the Department of Conservation and Natural Resources declared ${h.ext('https://www.dcnr.pa.gov/StateParks/FindAPark/CherrySpringsStatePark/Pages/default.aspx', 'Cherry Springs State Park')} its first Dark Sky Park in 2000. The park protects its night sky, but its magnetic position is modest: Erie, the best placed town of the state in the site's data, needs about Kp ${h.kp(er.need)}, a ${h.gName(er.g)} storm, and Cherry Springs lies south and east of Erie, so it needs at least as much.</p>

<h2>Choosing a spot on the night</h2>
<p>A ranking tells you where the odds are best over a season. On a given evening, three things matter more than a tenth of a Kp. First, a clear view toward the north, low to the horizon, because on most nights south of Canada the aurora sits low: a lakeshore, a hilltop or open prairie beats a forest clearing. SWPC notes that from a good vantage point aurora can be seen even when it is about ${h.P.method.swpcMaxViewKm.toLocaleString('en-US')} km farther north. Second, distance from city glow, which hides the faint green arcs that a G1 storm brings to the northern tier. Third, the clouds hour by hour, which no ranking can predict.</p>
<p>That is what the forecast is for. The ${h.a('home', 'tonight page')} combines the Kp forecast, the OVATION model and the cloud forecast for any town or ZIP code, the ${h.a('aurora-forecast', 'three-night forecast')} helps plan a trip, and the ${h.a('best-time-northern-lights', 'best time guide')} explains which weeks and hours give the most darkness. For the full list of towns, sorted from the easiest to the hardest, see the ${h.a('northern-lights', 'ranking page')}.</p>`,
  mini: { kind: 'kpNeed', arg: { place: 'minnesota/international-falls' } },
  related: ['northern-lights', 'best-time-northern-lights', 'region:alaska', 'region:minnesota', 'city:minnesota/duluth', 'aurora-forecast'],
  sources: ['swpc_tips', 'swpc_scales', 'swpc_aurora', 'aacgm', 'ncei_poles', 'nasa_power'],
});
