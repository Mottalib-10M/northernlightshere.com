import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('wisconsin', 'green-bay');
const m = K.monthly('wisconsin', 'green-bay');
const best = K.bestMonths('wisconsin', 'green-bay', 3);
const ce = K.cloudExtremes('wisconsin', 'green-bay');
const mk = K.facts('wisconsin', 'milwaukee');
const mq = K.facts('michigan', 'marquette');

export default defineCity({
  region: 'wisconsin',
  slug: 'green-bay',
  title: 'Northern Lights Green Bay 2026: Kp Needed, Tonight’s Sky',
  description: `Northern lights in Green Bay in 2026: Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's yes, maybe or no, and the Door Peninsula's dark shores nearby.`,
  intro: 'The bay that gives the city its name runs off to the northeast, a ready-made dark horizon at the edge of town.',
  resume: `Green Bay needs a planetary Kp of about ${K.kp(f.need)} for the northern lights, a ${K.gName(f.g)} storm on the NOAA scale, though it sits right on the edge of the minor storm range. At ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, the city is the northernmost of Wisconsin's three largest metro areas, and in this site's method the first visible aurora here comes with the oval edge overhead, at the same Kp ${K.kp(f.overhead)}. Milwaukee, down the shore, needs Kp ${K.kp(mk.need)}; Marquette, across the Upper Peninsula, ${K.kp(mq.need)}. Full darkness on December 15 lasts ${K.num(m[11].hours, 1)} hours and on June 15 only ${K.num(m[5].hours, 1)}. NASA POWER cloud averages reach ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, when the bay is still cold, and drop to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. By clear dark hours, ${best[0].name}, ${best[1].name} and ${best[2].name} come first. The tool below checks tonight's Kp blocks against National Weather Service sky cover for Green Bay.`,
  faqs: [
    { q: 'Can you see the northern lights in Green Bay, Wisconsin?', a: `Yes, when the planetary Kp reaches about ${K.kp(f.need)}, a ${K.gName(f.g)} storm, and the sky is clear. Green Bay's threshold is the lowest of Wisconsin's three largest metro areas, so storms that only touch the horizon in Milwaukee can climb higher here. Watch from the bay shore or the countryside rather than under city lights.` },
    { q: 'Is Door County good for seeing the aurora from Green Bay?', a: `Often, yes. The Door Peninsula runs northeast from Green Bay between the bay and Lake Michigan, with small towns and long stretches of dark shoreline. From its bay side you look west and northwest across open water. The threshold there is close to Green Bay's Kp ${K.kp(f.need)}, but the darker sky shows fainter aurora.` },
    { q: 'What month should I plan an aurora night in Green Bay?', a: `${best[0].name}, which leads in clear dark hours with ${K.num(best[0].cloud, 0)}% average cloud amount in NASA POWER data and about ${K.num(best[0].hours, 1)} hours of full darkness on the 15th. Avoid ${ce.cloudiest.name}, the cloudiest month at ${K.num(ce.cloudiest.cloud, 0)}%. Any month works if a storm arrives on a clear night.` },
  ],
  body: (h) => `
<h2>The bay as a horizon</h2>
<p>Green Bay grew up where the Fox River empties into the southern tip of a long arm of Lake Michigan, and that arm, the bay of Green Bay, runs off toward the northeast. It gives the city something Milwaukee and Chicago lack: open water in a northerly direction. From the river mouth and the bay shore just north of town, the dark surface of the bay fills the north-northeast. To the true north the western shore is lit by small communities, but the bay itself carries the eye far toward the Upper Peninsula.</p>
<p>The Door Peninsula, on the far side of the bay, is the darker option. Its western shore faces across the bay to the northwest, and its towns are small and spaced out. On a storm night, a pullout on that shore looking over the water is about as good a view as eastern Wisconsin offers.</p>
<h2>At the meeting point of two storm levels</h2>
<p>With a threshold of Kp ${h.kp(f.need)}, Green Bay sits just beyond the line where the NOAA scale moves from ${h.gName(1)} to ${h.gName(2)}. A G1 night, however strong, usually falls short, and even the first G2 blocks only just reach the threshold. That makes the decimal in the three-hour forecast worth reading closely: a block a third of a Kp below the line is a likely no here, a third above it a real maybe. Because the threshold and the overhead Kp are the same, a night that does reach Green Bay's level tends to light up a broad band of the northern sky. The ${h.a('geomagnetic-storm-scale', 'storm scale guide')} lists what each level means in practice.</p>
${h.mini('darkMonth', { place: 'wisconsin/green-bay', month: 1 })}
<h2>Spring fog, autumn clarity</h2>
<p>The bay stays cold well into spring, and humid air moving over it tends to produce low cloud and fog. That is a likely reason NASA POWER averages put ${ce.cloudiest.name}, at ${h.num(ce.cloudiest.cloud, 0)}%, ahead of the winter months for cloud amount. By ${ce.clearest.name} the picture has turned around, with ${h.num(ce.clearest.cloud, 0)}% and nights that already last ${h.num(m[ce.clearest.month - 1].hours, 1)} hours of full darkness. ${best[1].name} follows, thanks to the cold and dry air of Arctic highs. The ${h.a('region:wisconsin', 'Wisconsin page')} gives every town's threshold, and the ${h.a('city:michigan/marquette', 'Marquette page')} covers the Lake Superior shore farther north.</p>`,
  related: ['region:wisconsin', 'city:wisconsin/milwaukee', 'city:michigan/marquette', 'geomagnetic-storm-scale', 'aurora-forecast'],
});
