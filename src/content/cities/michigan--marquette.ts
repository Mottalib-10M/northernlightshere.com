import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('michigan', 'marquette');
const m = K.monthly('michigan', 'marquette');
const best = K.bestMonths('michigan', 'marquette', 3);
const ce = K.cloudExtremes('michigan', 'marquette');

export default defineCity({
  region: 'michigan',
  slug: 'marquette',
  title: 'Northern Lights Marquette 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Marquette, Michigan, in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed from ${K.num(f.mlat, 1)}° magnetic latitude, and dark hours month by month.`,
  intro: 'Marquette faces Lake Superior to the north: few towns in the lower 48 have a darker, wider view of the aurora’s horizon.',
  resume: `From Marquette you need a planetary Kp of about ${K.kp(f.need)} to see the northern lights, which is ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, among the highest of any sizable town in the lower 48, and its lakeshore looks straight north over Lake Superior, so an aurora low on the horizon is not lost behind hills or streetlights. Overhead displays need about Kp ${K.kp(f.overhead)}. Darkness is the limit in summer: on ${m[5].name} 15 the Sun stays more than 18 degrees down for only ${K.num(m[5].hours, 1)} hours, against ${K.num(m[11].hours, 1)} hours in mid-December. Combining those hours with NASA POWER cloud averages, the months with the most clear dark hours are ${best[0].name}, ${best[1].name} and ${best[2].name}.`,
  faqs: [
    { q: 'Can you see the northern lights from Marquette, Michigan?', a: `Yes, and more often than from almost anywhere else in the Midwest. Marquette needs about Kp ${K.kp(f.need)}, close to the G1 level at which NOAA says aurora is commonly visible in northern Michigan. On a clear, dark night with a minor storm, a glow over Lake Superior is a realistic expectation, and stronger storms can bring it overhead.` },
    { q: 'Where should I go in Marquette to watch the aurora?', a: 'Somewhere on the Lake Superior shore with the city lights behind you: the beaches and rock points north of downtown, or Presque Isle Park, look north over open water. Away from the city, the shoreline toward Big Bay is darker still. What matters most is an unobstructed northern horizon, since the aurora sits low when Kp is near your threshold.' },
    { q: 'What month is best for the northern lights in Marquette?', a: `By clear dark hours, ${best[0].name}: it combines long nights with a cloud amount of ${K.num(best[0].cloud, 0)}% on average in NASA POWER data. ${ce.cloudiest.name} is the cloudiest month, at ${K.num(ce.cloudiest.cloud, 0)}%, partly because of lake-effect cloud. The equinox months also tend to bring more geomagnetic activity, as SWPC notes.` },
  ],
  body: (h) => `
<h2>Lake Superior as a horizon</h2>
<p>The geometry of a storm at the edge of your range is simple: the aurora sits low in the north, perhaps ten degrees up, and anything taller than a house a few hundred meters away hides it. Marquette's shoreline removes that problem. North of the city there is nothing but water for well over a hundred miles, and on a clear night the lake surface is black. Photographers who line up the ore dock or the lighthouse in the foreground are using the same open horizon that lets the eye see a faint arc.</p>
<p>The lake also brings the main drawback. In ${ce.cloudiest.name} the average cloud amount reaches ${h.num(ce.cloudiest.cloud, 0)}%, the highest of the year, as cold air crossing the open water builds lake-effect cloud along the south shore. Inland, toward the Michigamme highlands, a storm night can be clearer than on the beach.</p>
<h2>What each storm level means here</h2>
<p>At Kp ${h.kp(f.need)} the aurora rises above Marquette's northern horizon in the view line used on this site. One level higher, a ${h.gName(Math.min(5, f.g + 1))} storm moves it higher and brighter, and around Kp ${h.kp(f.overhead)} the oval itself passes overhead, the nights when the sky to the south lights up too. ${h.mini('kpNeed', { place: 'michigan/marquette', region: 'michigan' })} The comparison with the rest of the state is in the table below and on the ${h.a('region:michigan', 'Michigan page')}: Detroit needs about ${h.kp(h.facts('michigan', 'detroit').need)}, so a storm that makes the evening news in the south of the state is often a strong show here.</p>
<h2>Summer nights and winter nights</h2>
<p>Marquette's longest dark window, in December, lasts ${h.num(m[11].hours, 1)} hours on the 15th, from ${m[11].start} to ${m[11].end}. In ${m[5].name} it shrinks to ${h.num(m[5].hours, 1)} hours, from ${m[5].start} to ${m[5].end}, which leaves little room for a storm to line up with darkness. March and September sit between, with about ${h.num(m[2].hours, 1)} and ${h.num(m[8].hours, 1)} hours. Winter cold is the other constraint: a long night at the shore in January is a serious outing, and the ${h.a('photograph-northern-lights-phone', 'phone photography guide')} explains why batteries die faster then.</p>`,
  related: ['region:michigan', 'city:wisconsin/green-bay', 'city:minnesota/duluth', 'best-places-northern-lights-usa', 'home'],
});
