import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('north-dakota', 'bismarck');
const fa = K.facts('north-dakota', 'fargo');
const m = K.monthly('north-dakota', 'bismarck');
const ce = K.cloudExtremes('north-dakota', 'bismarck');
const best = K.bestMonths('north-dakota', 'bismarck', 3);

export default defineCity({
  region: 'north-dakota',
  slug: 'bismarck',
  title: 'Northern Lights Bismarck 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Bismarck in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the Missouri bluffs and the clearest dark months.`,
  intro: 'Bismarck sits on the bluffs of the Missouri, close to a minor storm’s reach and with wide, empty country to the north.',
  resume: `Bismarck needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale. North Dakota's capital lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, slightly below Fargo's ${K.num(fa.mlat, 1)}, because magnetic latitude falls off toward the west across the northern plains, and the aurora reaches overhead around Kp ${K.kp(f.overhead)}. The Missouri River runs through town between bluffs, and the high ground above it gives long views over country with few lights. Bismarck's sky is clearest in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}% cloud amount in NASA POWER averages, and cloudiest in ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}%. Combining those figures with the dark hours, ${K.listOf(best.map((b) => b.name))} offer the most clear dark sky over a typical year.`,
  faqs: [
    { q: 'Can you see the northern lights from Bismarck, North Dakota?', a: `Yes, on clear nights with a minor to moderate storm, about Kp ${K.kp(f.need)}. The best results come from outside the city, on the high ground north of town or along the Missouri, away from the lights of Bismarck and Mandan, with an unobstructed view to the north.` },
    { q: 'What Kp is needed for the aurora in Bismarck?', a: `About Kp ${K.kp(f.need)}. That is slightly more than in Fargo, which needs ${K.kp(fa.need)}, and less than in Rapid City or Billings. At Kp ${K.kp(f.overhead)} the edge of the oval reaches Bismarck itself, so a G2 storm can light up a large part of the sky.` },
    { q: 'When is the best season for northern lights in Bismarck?', a: `${best[0].name} leads by clear dark hours, followed by ${best[1].name} and ${best[2].name}. Mid-December gives ${K.num(m[11].hours, 1)} hours of full darkness and mid-June only ${K.num(m[5].hours, 1)}, so summer chances are limited to the middle of the night, and long autumn evenings give the best balance between darkness, clear air and bearable temperatures.` },
  ],
  body: (h) => `
<h2>The view from the Missouri bluffs</h2>
<p>Bismarck and Mandan face each other across the Missouri, and the river has cut a broad trench through the plains. The bluffs above it, on both banks, are the natural viewpoints for a storm night: from up there the city lights fall away below, and the northern horizon stretches across the Missouri Coteau. Upstream, the river widens into Lake Sakakawea, whose shores northwest of Bismarck are among the darkest places in the central part of the state.</p>
${h.mini('kpNeed', { place: 'north-dakota/bismarck', region: 'north-dakota' })}
<h2>A western sky</h2>
<p>Bismarck is in the Central time zone but far to its west, so its clock runs well ahead of the Sun: solar midnight falls closer to 1 am than to midnight, and the dark window on December 15 runs from ${m[11].start} to ${m[11].end}. The most active hours of the aurora, which SWPC places around local midnight, therefore come later on the clock than in Fargo. The tool's hour strip takes that into account. Weather comes mostly from the west and northwest, and the semi-arid western half of the state is drier than the Red River Valley, though wind is more frequent.</p>
<h2>Practical notes for a storm night</h2>
<p>Interstate 94 and the river bridges carry most of the area's night traffic, and their lights reach a surprising distance across open country. A gravel section road a few miles north of the interstate is usually darker than a park inside the city. In winter, check the road conditions before leaving: blowing snow can close rural roads within an hour on the plains, even under a clear sky, and the coldest clear nights are also the ones when a stalled car becomes dangerous. Phones lose charge fast in that cold, so keep a spare battery inside your coat.</p>
<h2>From here to the border</h2>
<p>Every hundred miles north from Bismarck lowers the Kp needed: Minot needs about ${h.kp(h.facts('north-dakota', 'minot').need)}. For a strong storm, Bismarck itself is enough; for a weak one, the drive toward the Canadian border or the Turtle Mountains pays off. The ${h.a('region:north-dakota', 'North Dakota page')} lists every town, and the ${h.a('city:north-dakota/fargo', 'Fargo page')} covers the east of the state.</p>`,
  related: ['region:north-dakota', 'city:north-dakota/fargo', 'city:south-dakota/rapid-city', 'city:montana/billings', 'geomagnetic-storm-scale'],
});
