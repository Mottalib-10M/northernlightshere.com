import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const hv = K.facts('montana', 'havre');
const gf = K.facts('montana', 'great-falls');
const ka = K.facts('montana', 'kalispell');
const bz = K.facts('montana', 'bozeman');
const ce = K.cloudExtremes('montana', 'great-falls');
const best = K.bestMonths('montana', 'great-falls', 2);

export default defineRegion({
  slug: 'montana',
  title: 'Northern Lights Montana 2026: Tonight’s Answer, Kp by Town',
  description: `Northern lights in Montana in 2026: tonight's yes, maybe or no for your town, from Kp ${K.kp(hv.need)} on the Hi-Line at Havre to Kp ${K.kp(bz.need)} in Bozeman, and the dark hours.`,
  intro: 'Montana’s Hi-Line, along the Canadian border, is one of the better places in the lower 48 for a modest storm.',
  resume: `Montana's chances depend on how close you are to Canada. Along the Hi-Line, the highway and railroad that follow the northern border, Havre sits at ${K.num(hv.mlat, 1)} degrees magnetic latitude in the AACGM model and needs about Kp ${K.kp(hv.need)}, ${hv.g ? `a ${K.gName(hv.g)} storm` : 'below storm level'}. Great Falls needs about ${K.kp(gf.need)}, Kalispell ${K.kp(ka.need)}, and the southern valleys around Bozeman ${K.kp(bz.need)}. Above the plains east of the Rockies, the northern horizon is flat for a hundred miles, light pollution is scarce and the air is dry: in Great Falls the NASA POWER cloud amount falls to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. Taking darkness and clouds together, ${best[0].name} and ${best[1].name} give Great Falls the most clear dark hours. The tool opens on Great Falls; type your own town or ZIP code.`,
  faqs: [
    { q: 'Where is the best place in Montana to see the northern lights?', a: `The Hi-Line, from Shelby and Havre east to Glasgow and Plentywood, where the Kp needed drops to about ${K.kp(hv.need)} and the prairie gives an open northern horizon with almost no light. West of the divide, the Flathead valley around Kalispell is good too, though mountains limit the low northern sky in places.` },
    { q: 'What Kp do you need to see the aurora in Montana?', a: `About Kp ${K.kp(hv.need)} on the northern border, rising to about Kp ${K.kp(bz.need)} in the southwestern valleys around Bozeman. In practice a G1 storm can show aurora on the Hi-Line from a dark spot, while Bozeman and Billings need a G2 or a small G3.` },
    { q: 'When is aurora season in Montana?', a: `From late August to April, when the nights are long enough. In Great Falls the Sun stays more than 18 degrees down for ${K.num(K.monthly('montana', 'great-falls')[11].hours, 1)} hours in mid-December, against only ${K.num(K.monthly('montana', 'great-falls')[5].hours, 1)} hours in mid-June. ${best[0].name} combines long nights with clear air, which puts it first by clear dark hours.` },
  ],
  body: (h) => `
<h2>The Hi-Line and the open prairie</h2>
<p>East of the Rocky Mountain Front, northern Montana is a wide, high plain with few towns and a northern horizon that runs uninterrupted into Alberta and Saskatchewan. For the aurora, that geometry is ideal. At the edge of a town's range the display sits low, and on the Hi-Line nothing stands in the way. Havre needs about Kp ${h.kp(hv.need)}, which puts it within reach of the G1 storms that NOAA counts by the hundreds per solar cycle. Driving north from Great Falls toward the border buys about ${h.num(gf.need! - hv.need!, 1)} Kp, and it takes the city lights out of the picture.</p>
${h.mini('kpNeed', { place: 'montana/havre', region: 'montana' })}
<h2>West of the divide</h2>
<p>The western valleys are different country: Missoula, Kalispell and the Flathead sit among ranges that cut off part of the sky, and Pacific air brings more winter cloud than the plains receive. Kalispell's threshold, about Kp ${h.kp(ka.need)}, is still among the better ones of the West, and Flathead Lake opens a long view north from its southern shore. The ${h.a('city:montana/missoula', 'Missoula page')} looks at the valley and its inversions.</p>
<h2>Glacier and the Rocky Mountain Front</h2>
<p>Where the plains meet the mountains, from Browning to Augusta, the Front rises abruptly to the west and leaves the northern and eastern sky open. That edge is a good compromise for visitors to Glacier National Park: the park's own valleys are deep and their northern horizons often blocked, while the plains just east of the mountains keep a flat view toward Alberta. Wind is the usual companion there in winter, and clear, windy nights after a Chinook are common.</p>
<h2>The south: Bozeman and Billings</h2>
<p>In the southern half of the state the thresholds climb to Kp ${h.kp(bz.need)} in Bozeman and ${h.kp(h.facts('montana', 'billings').need)} in Billings. That is still lower than most cities at the same latitude in the East, because the magnetic pole sits north of the Canadian prairies. Billings, on the Yellowstone River with open rangeland to the north, is covered on the ${h.a('city:montana/billings', 'Billings page')}. For the plains to the east, see ${h.a('region:north-dakota', 'North Dakota')}; across the border, the ${h.a('city:canada/calgary', 'Calgary page')}.</p>`,
  related: ['city:montana/missoula', 'city:montana/billings', 'region:north-dakota', 'region:idaho', 'city:canada/calgary'],
});
