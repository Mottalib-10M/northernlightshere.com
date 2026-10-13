import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const to = K.facts('ohio', 'toledo');
const cl = K.facts('ohio', 'cleveland');
const co = K.facts('ohio', 'columbus');
const ci = K.facts('ohio', 'cincinnati');
const ceCl = K.cloudExtremes('ohio', 'cleveland');
const ceCi = K.cloudExtremes('ohio', 'cincinnati');
const bestTo = K.bestMonths('ohio', 'toledo', 2);
const lad = K.ladder('ohio');

export default defineRegion({
  slug: 'ohio',
  title: 'Northern Lights Ohio 2026: Lake Erie Odds and Kp by Town',
  description: `Northern lights in Ohio in 2026: Kp ${K.kp(to.need)} needed in Toledo, ${K.kp(cl.need)} in Cleveland and ${K.kp(ci.need)} in Cincinnati, a strong storm statewide, and tonight's verdict by town.`,
  intro: 'Ohio is the one Midwest state with a large lake along its northern edge, and that shore is where a strong storm shows first.',
  resume: `Seeing the northern lights anywhere in Ohio takes a strong geomagnetic storm. No Ohio town in this site's list needs less than Kp ${K.kp(lad[0].need)}: Toledo, the northernmost by magnetic latitude at ${K.num(to.mlat, 1)} degrees in the AACGM model, needs about Kp ${K.kp(to.need)}, Cleveland about Kp ${K.kp(cl.need)}, Columbus about Kp ${K.kp(co.need)} and Cincinnati, on the Ohio River, about Kp ${K.kp(ci.need)}. All of those land at ${K.gName(cl.g)} on the NOAA scale, so the gap from one end of the state to the other is a fraction of a Kp step rather than a whole storm level. What changes more is the weather. Cleveland's NASA POWER cloud average climbs to ${K.num(ceCl.cloudiest.cloud, 0)}% in ${ceCl.cloudiest.name}, while Cincinnati's clearest month, ${ceCi.clearest.name}, averages ${K.num(ceCi.clearest.cloud, 0)}%. In Toledo, ${bestTo[0].name} and ${bestTo[1].name} offer the most clear dark hours. The tool opens on Cleveland; enter any Ohio town or ZIP code to get its hourly answer for tonight.`,
  faqs: [
    { q: 'Which part of Ohio has the best chance of seeing the aurora?', a: `The northwest corner and the Lake Erie shore. Toledo needs about Kp ${K.kp(to.need)}, the lowest threshold in Ohio, and the lakefront from there east to the Pennsylvania line looks north over open water. Southern Ohio needs about Kp ${K.kp(ci.need)} near Cincinnati, so the same storm that glows over the lake can stay below the horizon there.` },
    { q: 'How often does a storm strong enough for Ohio happen?', a: `Ohio needs a ${K.gName(cl.g)} storm or stronger. SWPC counts about ${K.num(K.P.facts.gScale[2].perCycle, 0)} strong storm periods in an average eleven year solar cycle, spread over roughly ${K.num(K.P.facts.gScale[2].days, 0)} days, and most fall in the active years around solar maximum. Each one still has to arrive at night under a clear Ohio sky to be seen.` },
    { q: 'Is there a dark sky park in Ohio for watching the northern lights?', a: `Yes. Observatory Park in Montville, run by the Geauga Park District east of Cleveland, holds International Dark Sky Park status at the Silver tier, and the district calls it Ohio's only one. From Geauga County a storm needs about Kp ${K.kp(cl.need)}, like Cleveland, but the sky there is far darker than on the city's lakefront.` },
  ],
  body: (h) => `
<h2>A shoreline that looks toward Ontario</h2>
<p>Most of the lower Midwest has its big water on the wrong side. Chicago and Milwaukee face east over Lake Michigan, and Detroit looks south across its river at Canada. Ohio is the exception: Lake Erie lies along its northern border, so the beaches, piers and bluffs from Toledo past Sandusky, Cleveland and Ashtabula all open onto a horizon of water to the north. That matters because an aurora at Ohio's threshold never climbs high. At Kp ${h.kp(to.need)} in Toledo or Kp ${h.kp(cl.need)} in Cleveland, the glow sits in the lowest part of the northern sky, exactly where tree lines and suburbs usually block the view inland. Inland Ohio, with its woodlots and rolling farmland, rarely offers a view that open.</p>
<p>The catch is the urban glow along the same shore. Inside Cleveland, Lorain or Toledo the lakefront is lit; the dark stretches are the parks and small harbor towns between the cities, and the islands off Sandusky Bay for those who can reach them.</p>
<h2>One storm level for the whole state</h2>
<p>From the Michigan line to the Ohio River, every town in this site's Ohio list needs a ${h.gName(cl.g)} storm. Toledo and Cincinnati are less than one Kp apart at the threshold, Kp ${h.kp(to.need)} against Kp ${h.kp(ci.need)}. The difference grows when a storm overshoots. The oval itself reaches overhead in Toledo around Kp ${h.kp(to.overhead)}, but Cincinnati needs about Kp ${h.kp(ci.overhead)} for that, so during a severe storm northern Ohio may see color in the zenith while the south sees a bright band to the north. The ${h.a('city:ohio/cleveland', 'Cleveland page')} and the ${h.a('city:ohio/columbus', 'Columbus page')} go into those two cities, and the ${h.a('geomagnetic-storm-scale', 'storm scale guide')} explains what separates G3 from G4.</p>
${h.mini('darkMonth', { place: 'ohio/toledo', month: 10 })}
<h2>Geauga's dark park and the cloudy lake belt</h2>
<p>Northeast Ohio has the state's best dark site and its worst cloud. ${h.ext('https://www.geaugaparkdistrict.org/park/observatory-park/', 'Observatory Park')}, in Montville in Geauga County, holds International Dark Sky Park status at the Silver tier, which the Geauga Park District describes as the only such park in Ohio. It lies inland from the lake, in the hills east of Cleveland that catch lake-effect cloud and snow when cold air crosses Lake Erie in late autumn and winter. Cleveland's NASA POWER average reaches ${h.num(ceCl.cloudiest.cloud, 0)}% in ${ceCl.cloudiest.name}, against ${h.num(ceCl.clearest.cloud, 0)}% in ${ceCl.clearest.name}. Southwest Ohio is less grey: Cincinnati drops to ${h.num(ceCi.clearest.cloud, 0)}% in ${ceCi.clearest.name}. On a storm night with lake cloud in the northeast, driving west toward Toledo or south toward the farm country can be the better bet. The ${h.a('region:michigan', 'Michigan page')} and the ${h.a('region:pennsylvania', 'Pennsylvania page')} cover the neighbors.</p>`,
  related: ['city:ohio/cleveland', 'city:ohio/columbus', 'region:michigan', 'region:pennsylvania', 'geomagnetic-storm-scale'],
  extraSources: [{ name: 'Geauga Park District, Observatory Park', url: 'https://www.geaugaparkdistrict.org/park/observatory-park/' }],
});
