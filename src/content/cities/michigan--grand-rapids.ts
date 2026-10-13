import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('michigan', 'grand-rapids');
const m = K.monthly('michigan', 'grand-rapids');
const best = K.bestMonths('michigan', 'grand-rapids', 3);
const ce = K.cloudExtremes('michigan', 'grand-rapids');
const tc = K.facts('michigan', 'traverse-city');
const de = K.facts('michigan', 'detroit');

export default defineCity({
  region: 'michigan',
  slug: 'grand-rapids',
  title: 'Northern Lights Grand Rapids 2026: Kp Needed and Best Months',
  description: `Northern lights in Grand Rapids in 2026: Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, tonight's yes, maybe or no, and how lake-effect cloud shapes the season.`,
  intro: 'Grand Rapids sits inland from Lake Michigan, close enough to catch its lake-effect cloud and far enough that the water is no help on the northern horizon.',
  resume: `Grand Rapids needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale. At ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model it sits a little north of Detroit, which needs Kp ${K.kp(de.need)}, and well south of Traverse City, which needs about Kp ${K.kp(tc.need)}. The oval would reach overhead around Kp ${K.kp(f.overhead)}. West Michigan's weather is the real filter: the NASA POWER cloud average for Grand Rapids peaks at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, when lake-effect cloud sits over the region for days, and drops to about ${K.num(ce.clearest.cloud, 0)}% in high summer. Darkness on the 15th lasts ${K.num(m[11].hours, 1)} hours in December against ${K.num(m[5].hours, 1)} in June. Combining the two, ${best[0].name}, ${best[1].name} and ${best[2].name} give the most clear dark hours, which makes late summer and early autumn the season to watch. The tool below checks tonight's Kp forecast against hourly NWS sky cover for Grand Rapids.`,
  faqs: [
    { q: 'Can you see the northern lights in Grand Rapids?', a: `Yes, when a storm reaches about Kp ${K.kp(f.need)}, a ${K.gName(f.g)} level, and the sky is clear. SWPC counts about ${K.num(K.P.facts.gScale[1].days, 0)} days with moderate storms in an average solar cycle, most near solar maximum. From the city, expect a low glow to the north that a phone camera shows better than the eye; a field outside the metro improves the view considerably.` },
    { q: 'Where should I go from Grand Rapids for a dark northern sky?', a: `North, up US 131 or into the farm and forest country of Newaygo and Montcalm counties, where the city glow falls behind you. Heading north also lowers the threshold; Traverse City needs about Kp ${K.kp(tc.need)}. The Lake Michigan beaches are dark but face west, so the northern horizon there runs along the shoreline.` },
    { q: 'Why are Grand Rapids winters so bad for aurora watching?', a: `Cold air crossing Lake Michigan picks up moisture and dumps it as cloud and snow over west Michigan, and Grand Rapids is in that belt. NASA POWER averages put its ${ce.cloudiest.name} cloud amount at ${K.num(ce.cloudiest.cloud, 0)}%. ${best[0].name}, with ${K.num(best[0].cloud, 0)}% cloud and ${K.num(best[0].hours, 1)} dark hours, gives a storm far better odds.` },
  ],
  body: (h) => `
<h2>Near a lake whose shore faces the wrong way</h2>
<p>Grand Rapids grew up on the Grand River, inland from Lake Michigan, and the lake shapes its sky without ever giving it a view. The beaches at Grand Haven and Holland face west, toward Wisconsin, so the open water there sits to the left of an aurora watcher looking north, and the northern horizon runs along a coastline of dunes and towns. Inland, the city's own glow fills the northern sky from most neighborhoods. The useful move is north on US 131 or the back roads toward the Muskegon River country, where farmland gives way to forest and the lights thin out quickly.</p>
<p>That drive also changes the numbers. Grand Rapids needs about Kp ${h.kp(f.need)}; by the time you reach Traverse City the threshold is down to Kp ${h.kp(tc.need)}, ${h.num((f.need ?? 0) - (tc.need ?? 0), 1)} Kp lower, and the ${h.a('city:michigan/marquette', 'Marquette page')} shows how far the bar falls by Lake Superior.</p>
<h2>A moderate storm city</h2>
<p>West Michigan sits right at the line where the second level of the NOAA scale starts to deliver. At ${h.num(f.mlat, 1)} degrees magnetic latitude, a ${h.gName(f.g)} storm lifts the aurora just above the northern horizon in the view line this site uses, and the margin between seeing and missing it is small. A storm that just touches Kp ${h.kp(f.need)} for one three-hour block may show only to a camera; one that holds Kp 7 through the evening is a different night, and around Kp ${h.kp(f.overhead)} the oval would come overhead. Detroit, on the other side of the state, needs a full ${h.gName(de.g)} storm, so Grand Rapids gets slightly better odds on the same night.</p>
${h.mini('darkMonth', { place: 'michigan/grand-rapids', month: 8 })}
<h2>The lake-effect season and the summer window</h2>
<p>From November into February, west Michigan lives under lake-effect cloud. NASA POWER's averages show it: ${ce.cloudiest.name} reaches ${h.num(ce.cloudiest.cloud, 0)}% cloud amount in Grand Rapids, and the longest nights of the year are mostly overcast. The clearer half of the year starts in summer, when the lake is warm and the air stable, but June nights are short, with full darkness from ${m[5].start} to ${m[5].end} on the 15th. August is the compromise, with ${h.num(m[7].hours, 1)} dark hours and a cloud amount near ${h.num(m[7].cloud, 0)}%, and September adds more darkness at similar cloud. A strong storm in late summer, after midnight, is the best realistic chance here. The ${h.a('region:michigan', 'Michigan page')} compares the rest of the state.</p>`,
  related: ['region:michigan', 'city:michigan/detroit', 'city:michigan/marquette', 'city:wisconsin/milwaukee', 'best-time-northern-lights'],
});
