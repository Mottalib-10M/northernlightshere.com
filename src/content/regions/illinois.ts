import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const rf = K.facts('illinois', 'rockford');
const ch = K.facts('illinois', 'chicago');
const pe = K.facts('illinois', 'peoria');
const cu = K.facts('illinois', 'champaign');
const sp = K.facts('illinois', 'springfield');
const g3 = K.P.facts.gScale[2];
const cePe = K.cloudExtremes('illinois', 'peoria');
const bestPe = K.bestMonths('illinois', 'peoria', 2);

export default defineRegion({
  slug: 'illinois',
  title: 'Northern Lights Illinois 2026: Tonight’s Verdict by Town',
  description: `Northern lights in Illinois in 2026: Kp ${K.kp(rf.need)} needed in Rockford and Chicago, Kp ${K.kp(sp.need)} in Springfield, the strong storms that reach the state, and tonight's odds.`,
  intro: 'NOAA names Illinois in its description of a strong storm, and that is the level most of the state needs.',
  resume: `Illinois is the state NOAA uses to describe a strong geomagnetic storm: at ${K.gName(3)}, the scale says aurora has been seen as low as ${g3.seen}. The thresholds computed here agree. Rockford and Chicago, in the north of the state, sit near ${K.num(ch.mlat, 1)} degrees magnetic latitude in the AACGM model and need about Kp ${K.kp(ch.need)}; Peoria needs Kp ${K.kp(pe.need)}, Champaign Kp ${K.kp(cu.need)} and Springfield about Kp ${K.kp(sp.need)}. South of the capital the bar keeps rising, toward the severe storms that only come a few times in a solar cycle. Darkness and weather help more than the map. In Peoria, NASA POWER cloud averages range from ${K.num(cePe.clearest.cloud, 0)}% in ${cePe.clearest.name} to ${K.num(cePe.cloudiest.cloud, 0)}% in ${cePe.cloudiest.name}, and ${bestPe[0].name} and ${bestPe[1].name} give the most clear dark hours. The tool opens on Chicago; type any Illinois town or ZIP code for its own hourly answer.`,
  faqs: [
    { q: 'What storm level brings the northern lights to Illinois?', a: `Usually a ${K.gName(3)} storm or stronger. Northern Illinois needs about Kp ${K.kp(ch.need)}, central Illinois Kp ${K.kp(pe.need)} to ${K.kp(sp.need)}. SWPC counts about ${K.num(g3.perCycle, 0)} strong storm periods in an average solar cycle, so the chances cluster in a few active years, and each one still needs a clear, dark night.` },
    { q: 'Where is the darkest place in northern Illinois for aurora?', a: `The northwest corner, between Rockford and the Mississippi, where farmland and the hills around Galena keep towns small and far apart. Rockford needs about Kp ${K.kp(rf.need)}, like Chicago, but the sky is much darker once you are west of the Fox River. Choose a ridge or open field with nothing tall to the north.` },
    { q: 'Can people in southern Illinois see the aurora?', a: `Only during severe or extreme storms. Springfield already needs about Kp ${K.kp(sp.need)}, and thresholds keep rising toward the Ohio River. During the G5 storm of May 2024, aurora was reported across much of the state, but such storms are rare: SWPC counts only a handful of G5 periods in a typical solar cycle.` },
  ],
  body: (h) => `
<h2>The state on NOAA's storm scale</h2>
<p>Illinois has an unusual place in aurora writing: it appears by name on the NOAA space weather scale. The ${h.src('swpc_scales', 'G scale')} describes a ${h.gName(3)} storm as one during which aurora has been seen as low as ${g3.seen}, and that line matches what this site computes for the state. The north, from Rockford across to the Chicago suburbs, needs about Kp ${h.kp(rf.need)}. The middle of the state, Peoria and the Illinois River valley, needs Kp ${h.kp(pe.need)}, and the prairie around Champaign and Springfield about Kp ${h.kp(sp.need)}. In other words, a G3 storm reaches the top third of Illinois comfortably and the center barely.</p>
${h.mini('darkMonth', { place: 'illinois/peoria', month: 11 })}
<h2>Prairie darkness versus the Chicago dome</h2>
<p>The Chicago metro produces one of the largest light domes in the country, and it spreads far into the surrounding counties. For aurora, that glow is the main problem in the northeast of the state: it brightens the very part of the sky where a low display would show. West of the Fox River the situation changes quickly. The farmland of north central Illinois is flat and sparsely lit, and the northwest corner, around the hills near Galena and the Mississippi bluffs, is darker still. From there, a storm that reaches Kp ${h.kp(rf.need)} has a clean northern horizon to rise from.</p>
<p>Central Illinois has the same open land, with a slightly higher threshold. The ${h.a('city:illinois/chicago', 'Chicago page')} covers the escape routes from the city, and the ${h.a('region:wisconsin', 'Wisconsin page')} shows how quickly the bar drops north of the state line.</p>
<h2>When the Illinois sky clears</h2>
<p>Illinois sits in the path of many winter storm systems, which keeps the cold months grey: ${cePe.cloudiest.name} is Peoria's cloudiest month at ${h.num(cePe.cloudiest.cloud, 0)}%. Early autumn is the friendlier season, with drier air, nights that lengthen quickly after the equinox and a cloud amount near ${h.num(cePe.clearest.cloud, 0)}% in ${cePe.clearest.name}. For a G3 storm, which may last only a few hours, being ready on a clear autumn evening matters more than waiting for the longest nights. The ${h.a('geomagnetic-storm-scale', 'storm scale guide')} explains how often each storm level occurs.</p>`,
  related: ['city:illinois/chicago', 'region:wisconsin', 'region:iowa', 'region:ohio', 'geomagnetic-storm-scale'],
});
