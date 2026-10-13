import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const fc = K.facts('colorado', 'fort-collins');
const de = K.facts('colorado', 'denver');
const gj = K.facts('colorado', 'grand-junction');
const pu = K.facts('colorado', 'pueblo');
const ce = K.cloudExtremes('colorado', 'denver');
const best = K.bestMonths('colorado', 'denver', 3);

export default defineRegion({
  slug: 'colorado',
  title: 'Northern Lights Colorado 2026: Tonight’s Odds in a Big Storm',
  description: `Northern lights in Colorado in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(fc.need)} needed in Fort Collins and ${K.kp(pu.need)} in Pueblo, and where to go to see it.`,
  intro: 'Colorado sees the aurora only in strong storms, but its dry air and high, dark country make those nights count.',
  resume: `Colorado is a strong-storm state for the northern lights. In the AACGM model its towns lie between ${K.num(pu.mlat, 1)} and ${K.num(fc.mlat, 1)} degrees magnetic latitude, south of the G3 line that NOAA's storm scale draws at ${K.P.facts.gScale[2].mlat} degrees. Fort Collins needs a planetary Kp of about ${K.kp(fc.need)}, Denver about ${K.kp(de.need)}, Grand Junction ${K.kp(gj.need)} and Pueblo ${K.kp(pu.need)}: a ${K.gName(de.g)} storm at least, and G4 for the south of the state. NOAA counts about ${K.P.facts.gScale[2].perCycle} G3 storms and ${K.P.facts.gScale[3].perCycle} G4 storms per eleven-year solar cycle. When one arrives, Colorado holds two advantages: dry air, with Denver's NASA POWER cloud amount at only ${K.num(ce.cloudiest.cloud, 0)}% in its cloudiest month, ${ce.cloudiest.name}, and wide, dark country on the eastern plains. The tool opens on Denver; type your own town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Colorado?', a: `Yes, during strong geomagnetic storms. The thresholds computed here run from about Kp ${K.kp(fc.need)} in Fort Collins to Kp ${K.kp(pu.need)} in Pueblo, which means G3 to G4 conditions on NOAA's scale. Coloradans saw the aurora during the G5 storm of May 2024; on ordinary active nights it stays below the horizon.` },
    { q: 'Where in Colorado is best to watch the aurora during a storm?', a: 'The eastern plains north of Interstate 70 and the northern border country, for their flat northern horizon and very little light: the Pawnee National Grassland northeast of Fort Collins is one example. Mountain valleys are dark but their ridges hide the low northern sky where a storm aurora usually sits.' },
    { q: 'What Kp is needed to see the aurora in Colorado?', a: `About Kp ${K.kp(fc.need)} in the north and up to Kp ${K.kp(pu.need)} in the south of the state, a G3 storm or stronger. The aurora then shows low in the north, often more red than green, because only its highest part rises above Colorado's horizon at that distance.` },
  ],
  body: (h) => `
<h2>Why only big storms reach Colorado</h2>
<p>Colorado lies far from the magnetic pole on the aurora's scale. Even Fort Collins, near the Wyoming line, sits at ${h.num(fc.mlat, 1)} degrees magnetic latitude, well south of where the oval usually ends. Seeing the aurora from here takes a storm big enough to push the oval down over the northern states, and then the light reaches Colorado from a few hundred kilometers away. Two things follow. The display sits low in the north, and it is often red: the top of the aurora, above 300 km, is where oxygen glows red, and at a distance it is the part that clears the horizon, as the ${h.a('northern-lights-colors', 'colors guide')} explains.</p>
${h.mini('kpNeed', { place: 'colorado/fort-collins', region: 'colorado' })}
<h2>Plains, mountains and the Western Slope</h2>
<p>The eastern plains are the best ground for a storm night: a flat northern horizon, small towns, dry air. The Pawnee National Grassland, northeast of Fort Collins, is a federal grassland with almost no lights and long views over the prairie. The mountains offer some of the darkest skies in the state, but their valleys face in every direction and their ridges hide the low northern sky. A high pass or an open park, such as North Park around Walden, combines altitude with a wider view. West of the Continental Divide, Grand Junction sits lower on the magnetic scale and needs about Kp ${h.kp(gj.need)}.</p>
<h2>Reading the watch</h2>
<p>For Colorado the useful forecast is an SWPC watch for G3 or G4 conditions, issued a day or two ahead when a fast coronal mass ejection leaves the Sun toward Earth. The watch says the storm is possible, not that it will reach its peak during a Colorado night. On the evening itself, the Kp estimate and the OVATION line of the tool tell you whether the storm has arrived and how far south the oval has moved. If the current Kp stays below 7, the display is very unlikely to show above the Front Range horizon.</p>
<h2>Dry air, but light domes</h2>
<p>Colorado's semi-arid climate gives clear skies more often than most of the country: Denver's cloud amount ranges from ${h.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} in NASA POWER averages. The Front Range cities, though, form an almost continuous band of light from Fort Collins to Pueblo, and on a storm night the drive east or north out of it is what makes the difference. By clear dark hours, ${h.listOf(best.map((b) => b.name))} lead in Denver. The ${h.a('city:colorado/denver', 'Denver page')} gives the month-by-month figures.</p>`,
  related: ['city:colorado/denver', 'region:south-dakota', 'region:montana', 'geomagnetic-storm-scale', 'northern-lights-colors'],
});
