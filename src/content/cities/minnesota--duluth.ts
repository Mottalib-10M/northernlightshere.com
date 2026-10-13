import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('minnesota', 'duluth');
const m = K.monthly('minnesota', 'duluth');
const best = K.bestMonths('minnesota', 'duluth', 3);
const ce = K.cloudExtremes('minnesota', 'duluth');
const mp = K.facts('minnesota', 'minneapolis');
const fa = K.facts('minnesota', 'international-falls');
const su = K.facts('wisconsin', 'superior');

export default defineCity({
  region: 'minnesota',
  slug: 'duluth',
  title: 'Northern Lights Duluth 2026: Tonight’s Verdict and Kp Needed',
  description: `Northern lights in Duluth in 2026: Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's yes, maybe or no, and where to stand on the Lake Superior shore.`,
  intro: 'Duluth climbs a steep hill above Lake Superior, so the right viewpoint matters as much as the storm.',
  resume: `Duluth needs a planetary Kp of about ${K.kp(f.need)} for the northern lights to clear its horizon, which is ${f.g ? `a ${K.gName(f.g)} storm` : 'an active night short of storm level'} on the NOAA scale, the lowest bar of any sizable Minnesota city. In the AACGM model the city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, and in this site's method the same Kp ${K.kp(f.overhead)} that lifts the aurora into view also brings the edge of the oval overhead. For comparison, Minneapolis needs Kp ${K.kp(mp.need)} and International Falls Kp ${K.kp(fa.need)}. Darkness is generous in winter, ${K.num(m[11].hours, 1)} hours on December 15, and scarce in June, with only ${K.num(m[5].hours, 1)} hours. NASA POWER cloud averages run from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours are ${best[0].name}, ${best[1].name} and ${best[2].name}. The tool below sets tonight's Kp blocks against the National Weather Service sky cover for Duluth.`,
  faqs: [
    { q: 'What Kp do you need to see the northern lights in Duluth?', a: `About Kp ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'just below storm level'}, from a dark spot with a clear view north or northeast. Duluth sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, so a minor storm on a clear, moonless night gives a realistic chance, and anything stronger usually brings the display high into the sky.` },
    { q: 'Where is the best spot in Duluth to watch the aurora?', a: `Above the city or out along the shore, never at the foot of the hill, where the slope itself hides the north. The ridge road high above downtown looks out over the rooftops, and the North Shore toward Two Harbors faces the lake with darkness ahead. Duluth's threshold of Kp ${K.kp(f.need)} leaves little margin for city glow, so a few miles outside town help.` },
    { q: 'Which winter month gives Duluth the most aurora chances?', a: `${best[0].name}, by clear dark hours: about ${K.num(best[0].hours, 1)} hours of full darkness on the 15th combined with ${K.num(best[0].cloud, 0)}% average cloud amount in NASA POWER data. ${ce.cloudiest.name} is the greyest month in Duluth, at ${K.num(ce.cloudiest.cloud, 0)}%. Expect nights well below freezing in either case, so dress for hours outside.` },
  ],
  body: (h) => `
<h2>A city on a slope, and a lake to the east</h2>
<p>Duluth has an odd layout for aurora watching. The city stretches for miles along the western tip of Lake Superior, but it is built on a steep hillside that rises from the water toward the north and west. Stand on the waterfront by the lift bridge and the hill is right behind you, exactly where a modest aurora would sit. The lake itself lies to the east and southeast, so the famous water views of Duluth face away from the oval. The fix is to go up: the ridge road that runs along the top of the hill looks out over the city, and from there the northern sky opens past the last streets. The alternative is to leave town on the North Shore, where the coast bends northeast and the lake becomes a dark foreground on your right.</p>
<p>Across the harbor, Superior, Wisconsin, needs Kp ${h.kp(su.need)}, practically the same figure. Minnesota Point, the long sandbar that closes the harbor, gives a flat horizon in most directions but sits inside the city's light.</p>
<h2>A threshold right at the minor storm line</h2>
<p>At Kp ${h.kp(f.need)}, Duluth stands almost exactly where the NOAA scale switches from active conditions to a ${h.gName(1)} storm. That position is useful in practice: SWPC counts about ${h.num(h.P.facts.gScale[0].perCycle, 0)} G1 storm periods in an average solar cycle, and each of them is a real possibility here, cloud permitting. The ${h.a('geomagnetic-storm-scale', 'storm scale guide')} explains what each level means. Because the threshold and the overhead Kp are the same here in this site's method, the night a storm finally reaches Duluth's level tends to put the glow well up the sky, not just a thin line on the horizon. The Twin Cities, ${h.num(h.townRef('minnesota', 'duluth').lat - h.townRef('minnesota', 'minneapolis').lat, 1)} degrees of latitude farther south, need about ${h.num(mp.need! - f.need!, 1)} Kp more.</p>
${h.mini('darkMonth', { place: 'minnesota/duluth', month: 2 })}
<h2>Lake Superior's cloud season</h2>
<p>The lake that complicates the view also shapes the sky. In early winter, before Lake Superior cools, cold air crossing the water picks up moisture and builds low cloud and snow showers along the shore, which is why ${ce.cloudiest.name} averages ${h.num(ce.cloudiest.cloud, 0)}% cloud amount. Later in winter, Arctic high pressure brings the dry nights that put ${best[0].name} and ${best[1].name} at the top of the clear dark hours. On a storm night with low cloud on the shore, driving inland up the hill and away from the lake often finds a clearer sky. The ${h.a('region:minnesota', 'Minnesota page')} compares the rest of the state, and the ${h.a('city:michigan/marquette', 'Marquette page')} covers the other big Lake Superior city.</p>`,
  related: ['region:minnesota', 'city:minnesota/minneapolis', 'city:michigan/marquette', 'region:wisconsin', 'geomagnetic-storm-scale'],
});
