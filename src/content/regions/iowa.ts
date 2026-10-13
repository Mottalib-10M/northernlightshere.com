import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const mc = K.facts('iowa', 'mason-city');
const db = K.facts('iowa', 'dubuque');
const sx = K.facts('iowa', 'sioux-city');
const cr = K.facts('iowa', 'cedar-rapids');
const dm = K.facts('iowa', 'des-moines');
const ceDm = K.cloudExtremes('iowa', 'des-moines');
const bestDm = K.bestMonths('iowa', 'des-moines', 3);
const mDm = K.monthly('iowa', 'des-moines');

export default defineRegion({
  slug: 'iowa',
  title: 'Northern Lights Iowa 2026: Tonight’s Chance, Kp by Town',
  description: `Northern lights in Iowa in 2026: from Kp ${K.kp(mc.need)} in Mason City to Kp ${K.kp(dm.need)} in Des Moines, the storm each Iowa town needs, and tonight's verdict hour by hour.`,
  intro: 'Iowa needs a strong storm, but its flat, dark farmland gives that storm one of the cleanest northern horizons in the Midwest.',
  resume: `Every Iowa town needs a geomagnetic storm to see the northern lights, and the whole state fits in a narrow band of thresholds. Mason City, near the Minnesota line, sits at ${K.num(mc.mlat, 1)} degrees magnetic latitude in the AACGM model and needs about Kp ${K.kp(mc.need)}, a ${K.gName(mc.g)} storm on the NOAA scale. Dubuque needs Kp ${K.kp(db.need)}, Cedar Rapids Kp ${K.kp(cr.need)}, and Des Moines about Kp ${K.kp(dm.need)}, a ${K.gName(dm.g)} storm. The boundary between those two storm levels runs right across the state. Sioux City, on the Missouri, needs Kp ${K.kp(sx.need)}, more than Dubuque at the same latitude, because magnetic latitude falls toward the west. For Des Moines, NASA POWER cloud averages run from ${K.num(ceDm.clearest.cloud, 0)}% in ${ceDm.clearest.name} to ${K.num(ceDm.cloudiest.cloud, 0)}% in ${ceDm.cloudiest.name}, and ${bestDm[0].name}, ${bestDm[1].name} and ${bestDm[2].name} give the most clear dark hours. The tool opens on Des Moines; type any Iowa town or ZIP code to see tonight's verdict there.`,
  faqs: [
    { q: 'Can you see the northern lights in Iowa?', a: `Yes, during geomagnetic storms. Iowa's thresholds run from about Kp ${K.kp(mc.need)} near the Minnesota border to Kp ${K.kp(dm.need)} around Des Moines, so a ${K.gName(mc.g)} or ${K.gName(dm.g)} storm and a clear night are needed. Rural Iowa's flat land and dark skies make those storms easier to catch than from cities farther east.` },
    { q: 'Where in Iowa is best for watching the aurora?', a: `The northern tier of counties, along the Minnesota border, where the threshold is lowest, about Kp ${K.kp(mc.need)} around Mason City. Any open field away from towns works, since the land is flat. In the northeast, the bluffs above the Mississippi give a raised view, and in the west the Loess Hills offer high ground over the Missouri valley.` },
    { q: 'Why does western Iowa need a bigger storm than eastern Iowa?', a: `Because magnetic latitude, not ordinary latitude, decides. Sioux City and Dubuque sit at the same geographic latitude, but Sioux City is ${K.num(db.mlat - sx.mlat, 1)} degrees lower in magnetic latitude, so it needs Kp ${K.kp(sx.need)} against ${K.kp(db.need)} for Dubuque. The geomagnetic pole lies over northern Canada, east of the Iowa meridian, and the oval tilts accordingly.` },
  ],
  body: (h) => `
<h2>Flat land, open sky</h2>
<p>Iowa is not a natural aurora state by latitude, but it has an asset that eastern cities lack: a horizon. Most of the state is gently rolling farmland with few trees on the skyline and small towns spaced far apart, so from almost any gravel road outside a town the northern sky runs down to the ground. When a storm pushes the aurora to the edge of Iowa's range, it sits low, within the bottom few degrees of the sky. A ridge, a tree line or the dome of a city can hide it completely; an Iowa section road usually does not. The trade is that the state needs a real storm, a ${h.gName(mc.g)} level at best, and no amount of darkness changes that.</p>
<p>Two corners break the flat pattern. In the northeast, the Mississippi has cut deep bluffs, high places with long views but also valleys that block the north. In the west, the Loess Hills rise along the Missouri River, wind-built ridges that offer a raised viewpoint above the river plain.</p>
<h2>A state that straddles two storm levels</h2>
<p>From Mason City to Des Moines the threshold climbs only ${h.num(dm.need! - mc.need!, 1)} Kp, but that small step crosses the line between ${h.gName(2)} and ${h.gName(3)} on the NOAA scale. In practice, the strongest G2 blocks of a storm can reach the northern counties and leave the center of the state just short. The ${h.a('kp-index', 'Kp index page')} explains how the three-hour blocks are read. The west-east tilt is just as visible: Sioux City and Dubuque share a latitude, yet the eastern city needs less, because the geomagnetic pole sits east of Iowa's meridian.</p>
${h.mini('kpNeed', { place: 'iowa/mason-city', region: 'iowa' })}
<h2>Clear Iowa nights through the year</h2>
<p>Iowa's continental climate gives it fewer of the lake clouds that weigh on Michigan and Ohio. In Des Moines the cloud amount bottoms out in ${ceDm.clearest.name}, and the autumn months rank highest for clear dark hours. Summer nights are short but not empty: on June 15, full darkness in Des Moines still lasts ${h.num(mDm[5].hours, 1)} hours. Winter brings long nights, ${h.num(mDm[11].hours, 1)} hours in mid-December, but also more overcast and bitter wind on open ground. The ${h.a('region:minnesota', 'Minnesota page')} shows how much lower the thresholds get across the northern border, and the ${h.a('region:illinois', 'Illinois page')} covers the other bank of the Mississippi.</p>`,
  related: ['region:minnesota', 'region:illinois', 'region:wisconsin', 'kp-index', 'dark-sky-hours'],
});
