import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('illinois', 'chicago');
const m = K.monthly('illinois', 'chicago');
const best = K.bestMonths('illinois', 'chicago', 3);
const ce = K.cloudExtremes('illinois', 'chicago');
const mk = K.facts('wisconsin', 'milwaukee');
const pe = K.facts('illinois', 'peoria');
const g3 = K.P.facts.gScale[2];

export default defineCity({
  region: 'illinois',
  slug: 'chicago',
  title: 'Northern Lights Chicago 2026: Kp Needed and Tonight’s Odds',
  description: `Northern lights in Chicago in 2026: about Kp ${K.kp(f.need)} needed, a ${K.gName(f.g)} storm at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's verdict and where to escape the glow.`,
  intro: 'Chicago has one of the brightest skies in the country, so its aurora nights are decided as much by where you stand as by the storm.',
  resume: `Chicago needs a planetary Kp of about ${K.kp(f.need)} before the northern lights rise above its horizon, a ${K.gName(f.g)} storm on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, slightly below Milwaukee's ${K.num(mk.mlat, 1)}, and the NOAA scale itself names Illinois as the state where aurora has been seen during strong storms. Overhead aurora would take about Kp ${K.kp(f.overhead)}. Light pollution is the local handicap: from the city, only the brightest part of a display shows, so the realistic plan is a drive to dark country. NASA POWER cloud averages for Chicago range from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and with darkness factored in, ${best[0].name}, ${best[1].name} and ${best[2].name} give the most clear dark hours. On December 15, full darkness runs ${K.num(m[11].hours, 1)} hours. The tool below runs tonight's forecast against hourly NWS sky cover for Chicago.`,
  faqs: [
    { q: 'Can you see the northern lights in Chicago?', a: `Yes, during strong storms, about Kp ${K.kp(f.need)} or higher, from a place dark enough to show a low glow in the north. The NOAA scale says aurora has been seen as low as ${g3.seen} during ${K.gName(3)} storms. From downtown, the city glow hides most of it; phone cameras catch color the eye misses.` },
    { q: 'Where is the best place near Chicago to watch the aurora?', a: `Somewhere with the city behind you and open land or water to the north. The Lake Michigan shore at Indiana Dunes National Park faces north over the water, with Chicago off to the northwest. Rural spots west of the Fox River or north toward the Wisconsin line work too, with the same Kp ${K.kp(f.need)} threshold.` },
    { q: 'What is the best month to see the aurora from Chicago?', a: `${best[0].name}, on clear dark hours. NASA POWER puts Chicago's average cloud amount at ${K.num(best[0].cloud, 0)}% that month, the lowest of the year, and full darkness lasts ${K.num(best[0].hours, 1)} hours on the 15th. ${ce.cloudiest.name} is the cloudiest month at ${K.num(ce.cloudiest.cloud, 0)}%. A storm of about Kp ${K.kp(f.need)} is needed whatever the season.` },
    { q: 'Why does Chicago need a stronger storm than northern Wisconsin?', a: `Because the aurora is tied to magnetic latitude, which falls as you go south. Chicago is at ${K.num(f.mlat, 1)} degrees and needs about Kp ${K.kp(f.need)}; the Lake Superior shore of Wisconsin needs about Kp ${K.kp(K.facts('wisconsin', 'ashland').need)}. Each step of the NOAA scale pushes the visible oval a few degrees farther south.` },
  ],
  body: (h) => `
<h2>A city that faces the lake, east</h2>
<p>Chicago's front yard is Lake Michigan, but the shoreline runs north to south, so the water lies east of the Loop. The northern sky from the lakefront is the North Side, Evanston and the North Shore suburbs, one continuous field of lights. On a storm night, people along the lakefront tend to see the aurora first to the northeast, above the darker water, and only when the display is strong. At Kp ${h.kp(f.need)} the glow sits near the horizon, where the light dome over the metro is brightest. Inside the city the honest expectation is a pale reddish or greenish wash that a phone camera confirms, not a sky full of curtains.</p>
<p>If you cannot leave town, the end of a breakwater or a lakefront park with no streetlights in front of you is the least bad option, because it puts dark water across the northeast quarter of the sky. Give your eyes twenty minutes away from screens, and shoot a test frame toward the lake every few minutes: the sensor will show the color long before you do.</p>
<h2>Turning the geometry around at the dunes</h2>
<p>The south end of the lake reverses the picture. ${h.ext('https://www.nps.gov/indu/index.htm', 'Indiana Dunes National Park')} stretches along fifteen miles of the Indiana coast, according to the National Park Service, and its beaches look north across open water. From there, Chicago's skyline glows off to the northwest, while due north is nothing but lake for dozens of miles. That is the closest thing to a dark northern horizon about an hour from the Loop. Inland, the other choice is distance: west past the Fox River into farm country, or north toward the Wisconsin state line, where the threshold drops slightly toward Milwaukee's Kp ${h.kp(mk.need)}. Heading south does the opposite; Peoria already needs Kp ${h.kp(pe.need)}. ${h.mini('kpNeed', { place: 'illinois/chicago', region: 'illinois' })}</p>
<h2>Strong storms and the Chicago calendar</h2>
<p>A ${h.gName(f.g)} storm is uncommon. SWPC counts about ${h.num(g3.perCycle, 0)} strong storm periods in an average solar cycle, bunched around solar maximum, so most years bring only a few chances, and many fall in daylight or under cloud. Chicago's weather year helps in early autumn: ${ce.clearest.name} has the lowest NASA POWER cloud amount, ${h.num(ce.clearest.cloud, 0)}%, and full darkness on the 15th runs from ${m[8].start} to ${m[8].end}. October and November keep long nights with moderate cloud, while ${ce.cloudiest.name} is the greyest month at ${h.num(ce.cloudiest.cloud, 0)}%. In June the dark window shrinks to ${h.num(m[5].hours, 1)} hours, from ${m[5].start}. The ${h.a('region:illinois', 'Illinois page')} compares the rest of the state, and the ${h.a('city:wisconsin/milwaukee', 'Milwaukee page')} covers the other big city on this shore.</p>`,
  related: ['region:illinois', 'city:wisconsin/milwaukee', 'city:wisconsin/madison', 'geomagnetic-storm-scale', 'photograph-northern-lights-phone'],
  extraSources: [{ name: 'National Park Service, Indiana Dunes National Park', url: 'https://www.nps.gov/indu/index.htm' }],
});
