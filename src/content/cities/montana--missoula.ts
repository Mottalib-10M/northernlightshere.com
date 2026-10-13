import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('montana', 'missoula');
const m = K.monthly('montana', 'missoula');
const ce = K.cloudExtremes('montana', 'missoula');
const best = K.bestMonths('montana', 'missoula', 3);

export default defineCity({
  region: 'montana',
  slug: 'missoula',
  title: 'Northern Lights Missoula 2026: Tonight’s Odds, Kp Needed',
  description: `Northern lights in Missoula in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, valley inversions and the best months to try.`,
  intro: 'Missoula sits where five valleys meet; getting above the valley floor is half the work on a storm night.',
  resume: `Missoula needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, about the same as Spokane and Billings, and the aurora reaches overhead around Kp ${K.kp(f.overhead)}. Its setting is the complication: the city fills the floor of a basin ringed by mountains, so the low northern sky, where a storm at the edge of the range appears, is hidden from town. Clouds follow a valley pattern too, with the NASA POWER cloud amount at ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} and ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, when inversions trap low cloud. By clear dark hours the best months are ${K.listOf(best.map((b) => b.name))}, with ${K.num(m[best[0].month - 1].hours, 1)} hours of full darkness on the 15th of the first.`,
  faqs: [
    { q: 'Can you see the northern lights from Missoula?', a: `Yes, during geomagnetic storms around Kp ${K.kp(f.need)} or stronger, from a place that sees the northern horizon over the surrounding ridges. From the valley floor in town, the mountains hide the lower part of the sky, so a moderate storm is often missed by people who do not leave the city.` },
    { q: 'Where can I watch the aurora near Missoula?', a: 'Somewhere higher or more open than the valley floor: the trailheads and ridges above town, or the long valleys north toward Flathead Lake, where the view up the Mission Valley opens to the north. Getting out of the city glow and above any inversion matters more than the exact spot.' },
    { q: 'What months are best for aurora in Missoula?', a: `${K.listOf(best.map((b) => b.name))}, by the clear dark hours computed from NASA POWER cloud averages and the Sun's position. Mid-winter nights are long but the valley inversions of ${ce.cloudiest.name} often bring low cloud; late summer and early autumn have shorter nights with clearer air.` },
  ],
  body: (h) => `
<h2>A city at the bottom of a bowl</h2>
<p>Missoula grew where the Clark Fork, the Bitterroot and the Blackfoot rivers meet, in a basin that once held Glacial Lake Missoula. The mountains around it are what make the city attractive and what make aurora watching harder. A display at Kp ${h.kp(f.need)} rises only a few degrees above the true horizon, and from most streets the ridges to the north are higher than that. On a strong storm the aurora climbs well above them, but the nights at the threshold are the common ones, and they reward the people who drive.</p>
<p>The valleys leading north are the natural escape. Highway 93 climbs out of town toward the Mission Valley and Flathead Lake, where the land opens and the northern sky drops close to a flat horizon. The run north also gains a little latitude: Kalispell needs about Kp ${h.kp(h.facts('montana', 'kalispell').need)}.</p>
${h.mini('darkMonth', { place: 'montana/missoula', month: 8 })}
<h2>Inversions and smoke</h2>
<p>In winter, cold air drains into the basin on calm nights and stays under warmer air above, holding haze, fog and low cloud on the valley floor. The tool reads the National Weather Service sky cover for the coordinates you give, so try a point on the ridges or up the valley when town is socked in. In late summer the problem can be wildfire smoke, which dims a faint aurora the way thin cloud does; the cloud forecast does not measure it, so judge by how many stars you see.</p>
<h2>A university town's habits</h2>
<p>Missoula is a university town, and a storm night tends to send a stream of cars up the same few roads at the same hour. Two habits help. Leave earlier than the forecast peak, because the SWPC blocks are three hours long and the burst of activity inside a block can come at its start. And let your eyes adapt for twenty minutes away from headlights before deciding there is nothing there: at the threshold, the aurora often looks like a grey band that the camera reveals as green. The ${h.a('photograph-northern-lights-phone', 'phone guide')} explains why.</p>
<h2>Compared with the rest of Montana</h2>
<p>Missoula's threshold is close to that of Billings, ${h.kp(h.facts('montana', 'billings').need)}, and well behind the Hi-Line towns. For the full ladder of Montana towns see the table below and the ${h.a('region:montana', 'Montana page')}; for the neighboring Inland Northwest, the ${h.a('city:washington/spokane', 'Spokane page')}.</p>`,
  related: ['region:montana', 'city:montana/billings', 'city:washington/spokane', 'region:idaho', 'aurora-forecast'],
});
