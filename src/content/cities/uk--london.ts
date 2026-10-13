import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'london');
const m = K.monthly('uk', 'london');
const nd = K.noDarkMonths('uk', 'london');
const ce = K.cloudExtremes('uk', 'london');
const best = K.bestMonths('uk', 'london', 3);
const g4 = K.P.facts.gScale[3];

export default defineCity({
  region: 'uk',
  slug: 'london',
  title: 'Northern Lights London 2026: Tonight’s Odds in a Big Storm',
  description: `Northern lights in London in 2026: tonight's yes, maybe or no, why Kp ${K.kp(f.need)} is needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the dark skies of the South Downs.`,
  intro: 'London sees the aurora only in the great storms, as a red glow low in the north, from outside the city’s light.',
  resume: `London needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale and close to G4. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, among the lowest of the places on this site, so far south of the oval that the aurora never reaches overhead even at Kp 9. NOAA counts about ${g4.perCycle} G4 storms per eleven-year solar cycle, and many of them peak in daylight in Britain or under cloud. When one arrives at night, what London sees is the top of a distant aurora, a red glow low in the north, best caught on a phone camera from somewhere dark. The South Downs, an International Dark Sky Reserve, are the nearest large dark area. London has no full darkness in ${K.listOf(nd)}; its NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}.`,
  faqs: [
    { q: 'Can you see the northern lights in London?', a: `Only in the strongest storms, about Kp ${K.kp(f.need)} or more, and mostly as a red glow that cameras record better than eyes. People across south-east England photographed the aurora during the G5 storm of May 2024. On a typical active night it is far below London's horizon.` },
    { q: 'Where should I go from London to see the aurora?', a: 'Out of the city and its suburbs to a place with a dark northern horizon: the Chilterns or the countryside north of the M25 look north over darker land than the South Downs, which are darker overall but have London and the Home Counties to their north. Any high, open spot with the city glow behind you helps.' },
    { q: 'Why does the aurora look red from London?', a: `Because London sees only the top of the aurora. SWPC explains that red light comes from oxygen above about ${K.P.facts.redHeightKmAbove} km, above the more common green. From the south of England, that red upper layer is what rises above the northern horizon, while the green lower part stays hidden behind the curve of the Earth.` },
  ],
  body: (h) => `
<h2>The great storms only</h2>
<p>From London the aurora is a rare event, tied to the strongest storms of a solar cycle. The city's threshold of Kp ${h.kp(f.need)} places it with Denver and Philadelphia among the hardest places on this site, and its light dome is among the largest in Europe. The practical sign to watch is a G4 watch or warning, followed on the night by the current Kp estimate climbing past 7 and an OVATION band on the ${h.a('aurora-map', 'live map')} that has moved over Scotland and the North Sea. The Met Office runs a space weather service for the United Kingdom, which issues its own aurora guidance during such events.</p>
${h.mini('kpNeed', { place: 'uk/london', region: 'uk' })}
<h2>Where the dark begins</h2>
<p>Greater London's glow reaches tens of kilometres into the countryside. The South Downs National Park, south of the capital, has been an International Dark Sky Reserve for ten years in 2026, according to the park authority, and its open downland gives very dark skies. For the aurora the direction matters, though: from the Downs, the northern horizon lies over the lights of the Home Counties and London. North of the city, the Chiltern escarpment and the farmland of Bedfordshire and Hertfordshire look north over darker land, which is often the better choice for a storm.</p>
<h2>Seeing it in the suburbs</h2>
<p>During the storms of 2024, many Londoners caught the aurora on their phones from gardens and parks while seeing little with their eyes. A long exposure records a faint red glow that the eye, in a sky brightened by streetlights, cannot separate from the background. If a G4 storm is under way and you cannot travel, a phone pointed north from the darkest corner of a park is still worth a try.</p>
<h2>Light, cloud and timing</h2>
<p>London keeps a short astronomical night even in early summer, but in ${h.listOf(nd)} there is none, and the dark season effectively runs from August to May. On December 15 full darkness lasts ${h.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. Cloud is frequent all year, with ${h.listOf(best.map((b) => b.name))} leading by clear dark hours. The SWPC blocks are in Universal Time, which matches Greenwich Mean Time in winter: the block from 21 to 24 UT is 9 pm to midnight in London. For Scotland's better odds, see the ${h.a('region:uk', 'UK page')} and the ${h.a('city:uk/edinburgh', 'Edinburgh page')}.</p>`,
  related: ['region:uk', 'city:uk/edinburgh', 'geomagnetic-storm-scale', 'northern-lights-colors', 'photograph-northern-lights-phone'],
  extraSources: [
    { name: 'South Downs National Park Authority, dark night skies', url: 'https://www.southdowns.gov.uk/dark-night-skies/' },
    { name: 'Met Office, space weather forecast', url: 'https://www.metoffice.gov.uk/weather/specialist-forecasts/space-weather' },
  ],
});
