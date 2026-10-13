import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('minnesota', 'minneapolis');
const m = K.monthly('minnesota', 'minneapolis');
const best = K.bestMonths('minnesota', 'minneapolis', 3);
const ce = K.cloudExtremes('minnesota', 'minneapolis');
const sc = K.facts('minnesota', 'st-cloud');
const du = K.facts('minnesota', 'duluth');
const ro = K.facts('minnesota', 'rochester');

export default defineCity({
  region: 'minnesota',
  slug: 'minneapolis',
  title: 'Northern Lights Minneapolis 2026: Kp Needed and Tonight',
  description: `Northern lights in Minneapolis in 2026: tonight's yes, maybe or no for the Twin Cities, a Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the darkest drives.`,
  intro: 'The Twin Cities sit on the boundary between a moderate storm and a minor one, and the metro glow decides the rest.',
  resume: `From Minneapolis and St. Paul you need a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale, right at the boundary with G1. The metro lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, and in this site's method the edge of the oval reaches overhead at about the same Kp, ${K.kp(f.overhead)}. An hour north the threshold drops: St. Cloud needs Kp ${K.kp(sc.need)} and Duluth ${K.kp(du.need)}, while Rochester, to the south, needs ${K.kp(ro.need)}. Full darkness lasts ${K.num(m[11].hours, 1)} hours on December 15 and ${K.num(m[5].hours, 1)} hours on June 15. NASA POWER cloud averages for the metro go from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and ${best[0].name}, ${best[1].name} and ${best[2].name} give the most clear dark hours. The tool below checks the forecast hour by hour for the Twin Cities against National Weather Service sky cover.`,
  faqs: [
    { q: 'Can you see the northern lights from inside Minneapolis?', a: `Sometimes, on strong nights. With a threshold near Kp ${K.kp(f.need)}, a ${K.gName(f.g)} storm can put a glow above the northern rooftops, and during the extreme storm of May 2024 it was seen across the metro. On a storm at the edge of the range, though, the city's own light hides the faint lower part; a phone camera may still catch it.` },
    { q: 'How far do you need to drive from Minneapolis to see the aurora?', a: `Far enough to put the metro glow behind you, north or northwest past the outer suburbs, where farmland replaces streetlights. That trip also lowers the threshold slightly: St. Cloud needs Kp ${K.kp(sc.need)} against ${K.kp(f.need)} for Minneapolis. Pick open farmland or a lake with a clear northern shore rather than a wooded park.` },
    { q: 'What time should I look for the aurora in Minneapolis?', a: `Between about 10 pm and 2 am Central time on a storm night, when the darkness is deepest and storms often peak in the forecast. In December, full darkness in Minneapolis runs from ${m[11].start} to ${m[11].end}, so a storm arriving early in the evening can still be caught. Check the hourly verdict above before driving.` },
  ],
  body: (h) => `
<h2>Two downtowns and a wide light dome</h2>
<p>The Twin Cities add up to one of the larger light domes in the upper Midwest, and it spreads in every direction from the two downtowns along the Mississippi. That glow is the real limit here, more than latitude. At ${h.num(f.mlat, 1)} degrees magnetic latitude, Minneapolis is close enough to the oval that the lowest Kp bringing aurora into view, ${h.kp(f.need)}, is also the Kp at which the oval edge stands overhead in this site's method. In other words, when the metro is in range at all, the activity tends to spread across a large part of the sky rather than hug the horizon. What the glow erases is the soft lower arc that shows first.</p>
<p>Inside the cities, the north shores of the larger lakes help a little: a stretch of open water to the north pushes the nearest lights back. For a real view, though, the metro has to be left behind.</p>
<h2>Which way out of the Twin Cities</h2>
<p>North and northwest are the useful directions, because the sky you need to see is ahead of you and the city glow ends up at your back. Interstate 94 toward St. Cloud and the highways toward the lake country around Mille Lacs both reach dark farmland and lakeshores without a long drive, and each mile north trims the threshold a little: St. Cloud, ${h.num(h.townRef('minnesota', 'st-cloud').lat - h.townRef('minnesota', 'minneapolis').lat, 1)} degrees of latitude higher, needs ${h.num(f.need! - sc.need!, 1)} Kp less. The St. Croix valley to the northeast is darker than the suburbs but its bluffs can block a low view, so climb out of the valley rather than stay by the river. Going south toward Rochester is the wrong way on both counts.</p>
${h.mini('kpNeed', { place: 'minnesota/minneapolis', region: 'minnesota' })}
<h2>Minnesota winters and the clear-night calendar</h2>
<p>The clearest Twin Cities skies come with a quiet pattern: a ridge of high pressure from Canada, cold air, light wind. That is why ${best[0].name} ranks first for clear dark hours here despite deep cold, while ${ce.cloudiest.name} sits at ${h.num(ce.cloudiest.cloud, 0)}% average cloud amount, the greyest month. September and October offer a softer option, with long enough nights and the equinox months that SWPC associates with more geomagnetic activity. The ${h.a('best-time-northern-lights', 'best time guide')} explains that seasonal effect, and the ${h.a('city:minnesota/duluth', 'Duluth page')} shows what a lower threshold looks like at the head of Lake Superior.</p>`,
  related: ['region:minnesota', 'city:minnesota/duluth', 'city:wisconsin/madison', 'best-time-northern-lights', 'aurora-forecast'],
});
