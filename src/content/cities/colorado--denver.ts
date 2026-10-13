import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('colorado', 'denver');
const m = K.monthly('colorado', 'denver');
const ce = K.cloudExtremes('colorado', 'denver');
const best = K.bestMonths('colorado', 'denver', 3);
const g4 = K.P.facts.gScale[3];

export default defineCity({
  region: 'colorado',
  slug: 'denver',
  title: 'Northern Lights Denver 2026: Tonight’s Chance in a Big Storm',
  description: `Northern lights in Denver in 2026: tonight's yes, maybe or no, why Kp ${K.kp(f.need)} is needed at ${K.num(f.mlat, 1)}° magnetic latitude, and where to escape the city's glow at night.`,
  intro: 'Denver needs a strong storm, a clear night and a drive out of the Front Range glow; the first is the rare part.',
  resume: `Denver needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, south of the latitude NOAA associates with G3 and close to where G4 storms, about ${g4.perCycle} per eleven-year solar cycle, have brought aurora. The oval itself would reach overhead only around Kp ${K.kp(f.overhead)}, so a Denver sighting is almost always a glow low in the north, often red. The sky is rarely the problem: Denver's NASA POWER cloud amount stays between ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} and ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, among the lowest of the cities on this site. By clear dark hours, ${K.listOf(best.map((b) => b.name))} lead. The tool checks each night against that threshold, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights in Denver?', a: `Only in strong geomagnetic storms, about Kp ${K.kp(f.need)} or more, and usually only from outside the metro area. The May 2024 G5 storm was visible from Colorado. On a typical active night, Kp 4 or 5, the aurora stays well below Denver's horizon, whatever apps and social media posts suggest.` },
    { q: 'Where should I drive from Denver to see the aurora?', a: 'North or east, out of the Front Range light dome: the plains toward Fort Morgan, the Pawnee National Grassland northeast of Greeley, or the open country along the Wyoming border. Facing north with the city behind you is the key. Driving into the mountains gives darkness but usually a blocked northern horizon.' },
    { q: 'Why does the aurora look red from Denver?', a: `Because Denver sees only the top of a storm aurora. SWPC explains that red light comes from oxygen above about ${K.P.facts.redHeightKmAbove} km, higher than the common green. From several hundred kilometers south of the oval, that upper red layer is what rises above the horizon, while the green lower part stays hidden.` },
  ],
  body: (h) => `
<h2>The Mile High City is far from the oval</h2>
<p>Altitude does not help with the aurora: what counts is distance from the oval, and Denver, at ${h.num(f.mlat, 1)} degrees magnetic latitude, is far from it. Its threshold of Kp ${h.kp(f.need)} puts it among the harder cities on this site, together with Philadelphia and New York. That has a simple practical consequence. A Denver aurora night is an event, announced by an SWPC watch for a G3 or G4 storm, and worth preparing for: a plan for where to go, a clear northern horizon, and patience.</p>
${h.mini('darkMonth', { place: 'colorado/denver', month: 11 })}
<h2>Escaping the light dome</h2>
<p>The Front Range urban corridor glows from Fort Collins to Colorado Springs, and Denver sits in the middle of it. The northern horizon from the city is lit by its own suburbs. The plains to the east and northeast empty quickly: past the airport and the last subdivisions, the farmland and grassland around Prospect Valley, Keenesburg or the Pawnee Grassland give a dark northern horizon within an hour or so. On the night of a big storm, many people make the same drive, so a county road beats a popular overlook.</p>
<h2>Red, not green</h2>
<p>What Denver sees of a storm is usually the upper part of the aurora. Green light, the most common color, comes from heights of about ${h.P.facts.greenHeightKm[0]} to ${h.P.facts.greenHeightKm[1]} km according to SWPC; red light comes from above ${h.P.facts.redHeightKmAbove} km. Seen from far to the south, the green part stays below the horizon and the red part shows, sometimes as a diffuse glow that the eye barely registers and a phone camera records clearly. The ${h.a('northern-lights-colors', 'colors guide')} lets you test the geometry with your own distances.</p>
<h2>Timing</h2>
<p>Big storms keep their own schedule: a G4 storm that peaks at midday Mountain time can be fading by nightfall, which is why the tool rates hours, not days.</p>
<p>Denver is on Mountain time, seven hours behind Universal Time in winter. Full darkness on December 15 runs from ${m[11].start} to ${m[11].end}. The ${h.a('aurora-forecast', 'three-night forecast')} converts the SWPC blocks and keeps the dark ones, and the ${h.a('region:colorado', 'Colorado page')} compares the rest of the state.</p>`,
  related: ['region:colorado', 'northern-lights-colors', 'geomagnetic-storm-scale', 'city:south-dakota/rapid-city', 'aurora-forecast'],
});
