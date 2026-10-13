import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('south-dakota', 'sioux-falls');
const m = K.monthly('south-dakota', 'sioux-falls');
const ce = K.cloudExtremes('south-dakota', 'sioux-falls');
const best = K.bestMonths('south-dakota', 'sioux-falls', 3);
const ab = K.facts('south-dakota', 'aberdeen');

export default defineCity({
  region: 'south-dakota',
  slug: 'sioux-falls',
  title: 'Northern Lights Sioux Falls 2026: Tonight’s Odds, Kp Needed',
  description: `Northern lights in Sioux Falls in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, where to leave the city glow and the best months.`,
  intro: 'South Dakota’s largest city needs a moderate storm, and a short drive north onto open farmland.',
  resume: `Sioux Falls needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale. In the AACGM model the city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude, the lowest of the South Dakota towns compared on this site, while Aberdeen, about 200 miles north, needs ${K.kp(ab.need)}. The aurora reaches the zenith over Sioux Falls only around Kp ${K.kp(f.overhead)}, a strong G3 storm. Most sightings here are therefore of a glow low in the north, which makes the city's own light the main local enemy. Sioux Falls' NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Taking dark hours into account, the months with the most clear dark sky are ${K.listOf(best.map((b) => b.name))}.`,
  faqs: [
    { q: 'Can you see the northern lights from Sioux Falls?', a: `Yes, on nights with a moderate storm, about Kp ${K.kp(f.need)} or more, and a clear sky. From inside the city the glow hides a faint display, so most sightings come from the farmland to the north, along roads toward Brandon, Baltic or Dell Rapids, with nothing lit between you and the northern horizon.` },
    { q: 'How strong a storm does Sioux Falls need for overhead aurora?', a: `About Kp ${K.kp(f.overhead)}, a strong G3 or G4 storm. Below that, the aurora stays in the northern half of the sky. NOAA counts about ${K.P.facts.gScale[2].perCycle} G3 storms per eleven-year solar cycle, so overhead displays in Sioux Falls are a few nights per cycle at most.` },
    { q: 'What is the best month to look for the aurora in Sioux Falls?', a: `${best[0].name}, by the combination of night length and clear sky in NASA POWER data. On the 15th of that month the Sun is more than 18 degrees below the horizon for ${K.num(m[best[0].month - 1].hours, 1)} hours. ${ce.cloudiest.name} is the cloudiest month, at ${K.num(ce.cloudiest.cloud, 0)}% average cloud amount.` },
  ],
  body: (h) => `
<h2>A southern corner of the aurora map</h2>
<p>Sioux Falls sits in the far southeastern corner of South Dakota, where the state meets Minnesota and Iowa, and its magnetic latitude is close to that of Madison or Grand Rapids. It needs about ${h.num(f.need! - ab.need!, 1)} Kp more than Aberdeen. That gap is the difference between storms that arrive several times a year near solar maximum and storms that come a few times a year, and it is why a drive north is the standard advice for Sioux Falls residents on a storm night: an hour up Interstate 29 toward Watertown buys part of that gap and leaves the city glow behind.</p>
${h.mini('darkMonth', { place: 'south-dakota/sioux-falls', month: 10 })}
<h2>The Big Sioux valley and the farmland</h2>
<p>The Big Sioux River runs through the city and north along a shallow valley lined with farms. The land is gently rolling, so a rise a few miles out of town gives a long view north over fields, with few lights other than farmsteads and grain elevators. Light from the city spreads into the sky as a dome visible from far away; on a storm night, standing with that dome behind you to the south is what matters. Snow cover in winter brightens the ground under any light and makes the dome larger, one more reason to drive farther in January than in October.</p>
<h2>Living with a moderate threshold</h2>
<p>A threshold of Kp ${h.kp(f.need)} changes how to use a forecast. The quiet and active nights of most of the year, Kp 2 to 4, are not worth a trip from Sioux Falls, however clear the sky. What is worth acting on is an SWPC watch for G2 or stronger, followed by a confirmation on the night itself: the OVATION line of the tool turning upward, or the current Kp estimate climbing past 6. That keeps the number of wasted drives low and catches the nights that matter.</p>
<h2>Weather and timing</h2>
<p>The southeast of the state gets more moisture than the west, with summer storms and winter systems from the south. Clear Arctic air behind a cold front gives the most reliable winter nights. On December 15, full darkness runs from ${m[11].start} to ${m[11].end}; on June 15 it lasts only ${h.num(m[5].hours, 1)} hours. The ${h.a('aurora-forecast', 'three-night forecast')} lines up the SWPC blocks with those hours, and the ${h.a('region:south-dakota', 'South Dakota page')} compares the rest of the state.</p>`,
  related: ['region:south-dakota', 'city:south-dakota/rapid-city', 'city:minnesota/minneapolis', 'region:iowa', 'aurora-forecast'],
});
