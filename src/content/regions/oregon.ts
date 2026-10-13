import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pe = K.facts('oregon', 'pendleton');
const as = K.facts('oregon', 'astoria');
const po = K.facts('oregon', 'portland');
const be = K.facts('oregon', 'bend');
const me = K.facts('oregon', 'medford');
const cb = K.cloudExtremes('oregon', 'bend');
const cp = K.cloudExtremes('oregon', 'portland');

export default defineRegion({
  slug: 'oregon',
  title: 'Northern Lights Oregon 2026: Tonight’s Chance, Kp by Town',
  description: `Northern lights in Oregon in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(po.need)} needed in Portland, ${K.kp(be.need)} in Bend, and where the skies clear most often.`,
  intro: 'NOAA lists Oregon among the states reached by a strong G3 storm; the high desert east of the Cascades is where those nights pay off.',
  resume: `Oregon is a strong-storm state for the northern lights. NOAA's storm scale names it at G3: a Kp 7 storm has brought aurora as low as Illinois and Oregon, around ${K.P.facts.gScale[2].mlat} degrees magnetic latitude. In the AACGM model Portland sits at ${K.num(po.mlat, 1)} degrees and needs about Kp ${K.kp(po.need)}; Pendleton, in the northeast, is the best placed of the towns compared here at Kp ${K.kp(pe.need)}; Bend needs ${K.kp(be.need)} and Medford, in the southwest, ${K.kp(me.need)}. Those thresholds sit close together, so the deciding factor is the sky. West of the Cascades, Portland's NASA POWER cloud amount reaches ${K.num(cp.cloudiest.cloud, 0)}% in ${cp.cloudiest.name}. East of them, Bend falls to ${K.num(cb.clearest.cloud, 0)}% in ${cb.clearest.name}. The tool opens on Portland; type your own town or a ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Oregon?', a: `Yes, during strong geomagnetic storms. NOAA's scale says a G3 storm, Kp 7, has brought aurora as low as Oregon, and the AACGM thresholds computed here run from Kp ${K.kp(pe.need)} in Pendleton to ${K.kp(me.need)} in Medford. On a weaker storm, the aurora stays below the horizon of most of the state.` },
    { q: 'Where in Oregon is best for watching the aurora?', a: 'The high desert east of the Cascades, for its dry air and dark skies: the country around Bend, Prineville and the Fort Rock basin, or the Blue Mountains foothills near Pendleton. A wide view to the north matters more than altitude. On the coast, Astoria and the north beaches face the open Pacific but are often cloudy.' },
    { q: 'What Kp is needed to see the aurora in Portland, Oregon?', a: `About Kp ${K.kp(po.need)}, a ${K.gName(po.g)} storm, from a dark place with an open northern view. Portland's own light, and the cloud that marine air brings into the Willamette Valley from October to March, push the practical threshold higher. The Columbia River Gorge east of the city opens the northern sky somewhat.` },
  ],
  body: (h) => `
<h2>Two climates on either side of the Cascades</h2>
<p>Oregon's thresholds span less than ${h.num(me.need! - pe.need! + 0.1, 1)} Kp from one corner of the state to another, which is small compared with the gap between a Pacific winter night and a high desert one. The Willamette Valley, where most Oregonians live, collects marine cloud for much of the dark season. Central and eastern Oregon sit in the rain shadow of the Cascades, where the air is drier, the towns are small and the night is dark. The NASA POWER averages show the contrast month by month: in ${cb.clearest.name}, Bend is at ${h.num(cb.clearest.cloud, 0)}% cloud amount against ${h.num(h.monthly('oregon', 'portland')[cb.clearest.month - 1].cloud, 0)}% in Portland in the same month.</p>
<p>${h.mini('kpNeed', { place: 'oregon/bend', region: 'oregon' })}</p>
<h2>What a G3 night looks like here</h2>
<p>When the Kp reaches the threshold of a town, the aurora appears low over the northern horizon, a pale glow with a green or reddish tint that a phone camera brings out. Most Oregon sightings are of that kind. Only around Kp ${h.kp(po.overhead)} does the oval itself reach Portland, which happens in the rarest storms. Above a dark horizon, though, the red light from the upper part of the aurora, more than 300 km high, can stand far above the green and stay visible from much farther south, as the ${h.a('northern-lights-colors', 'colors guide')} explains.</p>
<h2>Timing a storm from the West Coast</h2>
<p>Oregon has one advantage over the Midwest on storm nights: it is far to the west. A coronal mass ejection that arrives in the late evening on the East Coast arrives three hours earlier on the Pacific clock, still before midnight in Bend or Portland. SWPC writes its forecast blocks in Universal Time, and Oregon runs eight hours behind in winter, so a block forecast for 06 to 09 UT is 10 pm to 1 am Pacific standard time. The ${h.a('aurora-forecast', 'three-night forecast')} does the conversion and keeps only the dark hours. Plan for a long wait in the cold either way: the peak of a storm rarely lands where the forecast puts it, and the OVATION line of the tool is the better guide once it has begun.</p>
<h2>Coast, valley or desert</h2>
<p>Astoria, at the mouth of the Columbia, needs about Kp ${h.kp(as.need)} and has the ocean to the west, not the north, so the northern horizon there crosses land and river. Pendleton has the lowest threshold of the state in this comparison and the flat wheat country of the Columbia Plateau around it. The ${h.a('region:washington', 'Washington page')} covers the other side of the river, and the ${h.a('region:idaho', 'Idaho page')} the high country to the east.</p>`,
  related: ['region:washington', 'region:idaho', 'city:washington/seattle', 'geomagnetic-storm-scale', 'best-places-northern-lights-usa'],
});
