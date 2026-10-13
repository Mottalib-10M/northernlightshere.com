import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const be = K.facts('new-hampshire', 'berlin');
const le = K.facts('new-hampshire', 'lebanon');
const co = K.facts('new-hampshire', 'concord');
const ma = K.facts('new-hampshire', 'manchester');
const na = K.facts('new-hampshire', 'nashua');
const ce = K.cloudExtremes('new-hampshire', 'berlin');
const best = K.bestMonths('new-hampshire', 'berlin', 3);

export default defineRegion({
  slug: 'new-hampshire',
  title: 'Northern Lights New Hampshire 2026: Tonight’s Odds by Town',
  description: `Northern lights in New Hampshire in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(be.need)} needed in Berlin, ${K.kp(na.need)} in Nashua, and the dark north country.`,
  intro: 'New Hampshire is a narrow state with a long north-south reach: the North Country needs a smaller storm than the Merrimack valley.',
  resume: `In New Hampshire the northern lights need a moderate to strong geomagnetic storm. In the AACGM model, Berlin, the main town of the North Country, lies at ${K.num(be.mlat, 1)} degrees magnetic latitude and needs a planetary Kp of about ${K.kp(be.need)}; Lebanon, on the Connecticut River, about ${K.kp(le.need)}; Concord ${K.kp(co.need)}; Manchester ${K.kp(ma.need)}; and Nashua, near the Massachusetts line, ${K.kp(na.need)}. The north of the state, beyond the White Mountains, is forest and lakes with very few lights, and that is where a storm night is worth driving to. In Berlin the NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool opens on Berlin; type your own town or a ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in New Hampshire?', a: `Yes, during storms of about Kp ${K.kp(be.need)} in the North Country to Kp ${K.kp(na.need)} in the southern tier, with a clear sky and a dark northern horizon. Most sightings come from north of the White Mountains, where towns are small and the forest stretches to the Canadian border.` },
    { q: 'Where is the best place in New Hampshire to see the aurora?', a: 'The North Country: the area around Berlin, Errol and the Connecticut Lakes near Pittsburg, the northernmost town of the state, where very little light reaches the sky. Lakeshores and open fields with a view to the north work best, since the surrounding forest and mountains block the low horizon.' },
    { q: 'What Kp is needed to see the aurora in southern New Hampshire?', a: `About Kp ${K.kp(ma.need)} in Manchester and ${K.kp(na.need)} in Nashua, a ${K.gName(na.g)} storm, from a spot outside the city lights. The Merrimack valley's towns and the Boston metro glow to the south make a northern-facing location outside the cities essential on a storm night.` },
  ],
  body: (h) => `
<h2>North of the notches</h2>
<p>The White Mountains divide New Hampshire in two. South of them lies the populated Lakes Region and the Merrimack valley; north of them, past the notches that the roads squeeze through, lies the North Country, a land of forest, paper-mill towns and lakes that runs to the Canadian border. Berlin, on the Androscoggin River, needs about Kp ${h.kp(be.need)}; farther north, around the Connecticut Lakes, the threshold falls slightly and the darkness deepens. On a storm night this is the part of the state where the aurora has its best chance against a black horizon.</p>
${h.mini('kpNeed', { place: 'new-hampshire/berlin', region: 'new-hampshire' })}
<h2>Mountains: help and hindrance</h2>
<p>The mountains offer altitude and dark valleys, but their slopes also close the horizon. An aurora at the edge of a town's range sits within a few degrees of the northern skyline, and from a valley floor in the White Mountains that skyline is a ridge. Summits and high open areas with a northern view, and lakes such as those of the North Country, are better choices than the bottoms of the notches. Weather on the high peaks is severe and changes fast in every season, which makes a lake or a field the safer bet at night.</p>
<h2>The Connecticut valley</h2>
<p>Along the western border, the Connecticut River valley runs north from Lebanon and Hanover toward the Vermont line and the Connecticut Lakes. Its towns are small, and the river corridor offers a few open stretches with views up the valley. Lebanon needs about Kp ${h.kp(le.need)}, between the North Country and the south of the state. Fog collects in the valley on calm autumn nights; on those nights the hilltops above it often stand in clear air under a dark sky.</p>
<h2>The southern tier</h2>
<p>From Concord south, the thresholds climb past Kp ${h.kp(co.need)}, a G3 storm, and the light of the Merrimack valley and of greater Boston fills the southern sky. On a strong storm the aurora can still show low in the north from a dark field, but the drive north toward the Lakes Region is usually worth it. The ${h.a('region:vermont', 'Vermont page')} and the ${h.a('region:maine', 'Maine page')} cover the neighboring states, and the ${h.a('city:massachusetts/boston', 'Boston page')} the city to the south.</p>`,
  related: ['region:vermont', 'region:maine', 'region:massachusetts', 'city:massachusetts/boston', 'best-places-northern-lights-usa'],
});
