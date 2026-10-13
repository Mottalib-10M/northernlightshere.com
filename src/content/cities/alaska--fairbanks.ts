import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('alaska', 'fairbanks');
const m = K.monthly('alaska', 'fairbanks');
const nd = K.noDarkMonths('alaska', 'fairbanks');
const ce = K.cloudExtremes('alaska', 'fairbanks');
const best = K.bestMonths('alaska', 'fairbanks', 3);

export default defineCity({
  region: 'alaska',
  slug: 'fairbanks',
  title: 'Northern Lights Fairbanks 2026: Tonight’s Odds, Dark Hours',
  description: `Northern lights in Fairbanks in 2026: tonight's yes, maybe or no, why Kp ${K.kp(f.need)} is enough at ${K.num(f.mlat, 1)}° magnetic latitude, and the dark months, August to April.`,
  intro: 'Fairbanks lies beneath the auroral oval on most nights; darkness and clouds decide, not the size of the storm.',
  resume: `Fairbanks needs a planetary Kp of only about ${K.kp(f.need)} to see the northern lights, which means no storm at all: at ${K.num(f.mlat, 1)} degrees magnetic latitude, the city sits under the usual position of the auroral oval, and a clear dark night is very often an aurora night. The limits are elsewhere. From ${nd[0]} to ${nd[nd.length - 1]} the Sun never sinks 18 degrees below the horizon, so the sky never gets fully dark; in mid-December, by contrast, it is dark for ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. Clouds come next: NASA POWER averages put ${ce.cloudiest.name} at ${K.num(ce.cloudiest.cloud, 0)}% cloud amount and ${ce.clearest.name} at ${K.num(ce.clearest.cloud, 0)}%. Combining both, the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}, the heart of the Interior winter.`,
  faqs: [
    { q: 'How often can you see the northern lights in Fairbanks?', a: `On most clear, dark nights from late August to mid-April, because Fairbanks needs only about Kp ${K.kp(f.need)} and the oval usually lies overhead or close by. SWPC says observers under the oval see aurora on more than half the nights of a year. Clouds and summer daylight are what take nights away.` },
    { q: 'What time is best for the aurora in Fairbanks?', a: `Around local magnetic midnight, which in Fairbanks falls later than clock midnight: the hours from about 11 pm to 3 am are usually the most active. In December the sky is fully dark from ${m[11].start} to ${m[11].end}, so early evening displays are possible too. The hour strip of the tool shows tonight's best run.` },
    { q: 'Can you see the aurora in Fairbanks in summer?', a: `Not between ${nd[0]} and ${nd[nd.length - 1]}: the Sun stays within 18 degrees of the horizon all night, and around the June solstice within 12 degrees. The aurora is still there, but the sky is too bright. The first real dark nights return in late August.` },
    { q: 'Is it too cold in Fairbanks to watch the northern lights in winter?', a: 'It can be very cold: Interior Alaska winter nights regularly drop far below zero Fahrenheit. The cold also brings the clearest skies, under high pressure. Dress in layers, keep phone batteries warm in an inner pocket, and watch from somewhere you can retreat to between bursts of activity.' },
  ],
  body: (h) => `
<h2>A city built where the oval passes</h2>
<p>Most aurora pages explain how big a storm must be. For Fairbanks the honest answer is that it hardly matters: at Kp ${h.kp(f.need)} the oval already reaches the city, and a G1 storm pushes it to the south, where it lights the sky above the Alaska Range. That is also why the Geophysical Institute of the University of Alaska and the rockets of the Poker Flat Research Range are here. A quiet night with a faint arc in the north and an active one with curtains overhead both count as a yes in the tool; the difference is what you see, not whether you see something.</p>
<p>The flip side of being under the oval is that a very strong storm can carry the brightest light away. During a G4 or G5 storm the oval expands toward the lower 48, and from Fairbanks much of the display sits low in the south. It remains spectacular, but the record shows of those nights are often seen from farther south.</p>
<h2>Interior weather</h2>
<p>Fairbanks sits in the Tanana Valley, sheltered by the Alaska Range from the moist Pacific air that clouds over Anchorage and Juneau. In midwinter, cold air pools in the valley under strong inversions: the skies are often clear, and the ice fog that forms in the coldest spells mostly hugs the ground in town, which is a good reason to drive up onto the surrounding hills. Late summer and early autumn are the cloudiest part of the dark season, with ${h.cloudExtremes('alaska', 'fairbanks').cloudiest.name} at the top of the NASA POWER averages.</p>
${h.mini('darkMonth', { place: 'alaska/fairbanks', month: 3 })}
<h2>The equinox months</h2>
<p>SWPC notes a tendency toward larger geomagnetic storms near the equinoxes. In Fairbanks, March combines that tendency with ${h.num(m[2].hours, 1)} hours of full darkness on the 15th and the clearest skies of the year, which is why many visitors plan for it. September offers ${h.num(m[8].hours, 1)} hours and milder nights, with more cloud. For the full picture month by month, see the table below; for the rest of the state, the ${h.a('region:alaska', 'Alaska page')}.</p>`,
  related: ['region:alaska', 'city:alaska/anchorage', 'city:canada/yellowknife', 'city:canada/whitehorse', 'best-time-northern-lights'],
  extraSources: [{ name: 'University of Alaska Fairbanks, Geophysical Institute', url: 'https://www.gi.alaska.edu/' }],
});
