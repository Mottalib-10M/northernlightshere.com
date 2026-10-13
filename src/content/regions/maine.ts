import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ca = K.facts('maine', 'caribou');
const pi = K.facts('maine', 'presque-isle');
const ba = K.facts('maine', 'bangor');
const au = K.facts('maine', 'augusta');
const po = K.facts('maine', 'portland');
const ce = K.cloudExtremes('maine', 'caribou');
const best = K.bestMonths('maine', 'caribou', 3);

export default defineRegion({
  slug: 'maine',
  title: 'Northern Lights Maine 2026: Tonight’s Odds, Kp by Town',
  description: `Northern lights in Maine in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(ca.need)} needed in Caribou and ${K.kp(po.need)} in Portland, and the dark north woods.`,
  intro: 'NOAA names Maine at the first level of its storm scale; Aroostook County, at the top of the state, is where that holds best.',
  resume: `Maine is one of the two places NOAA's storm scale names at its first level: at G1, a Kp 5 storm, aurora is commonly visible at high latitudes such as northern Michigan and Maine. The site's view line is more cautious. In the AACGM model Caribou, in Aroostook County, sits at ${K.num(ca.mlat, 1)} degrees magnetic latitude and needs a planetary Kp of about ${K.kp(ca.need)}, Presque Isle ${K.kp(pi.need)}, Bangor ${K.kp(ba.need)}, Augusta ${K.kp(au.need)} and Portland ${K.kp(po.need)}. The difference is a matter of how far above the horizon a display has to rise to be noticed; on a G1 night a faint glow can show low in the north of Aroostook from a very dark spot. Caribou's NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}; its months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool opens on Bangor; type your town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Maine?', a: `Yes. NOAA's scale says aurora is commonly visible in Maine at G1, Kp 5, and the north of the state is the best placed part of New England. This site's cautious view line puts Caribou at about Kp ${K.kp(ca.need)} and Portland at Kp ${K.kp(po.need)}, so a G2 storm gives a good chance from a dark spot in the north woods.` },
    { q: 'Where is the best place in Maine to see the aurora?', a: 'Aroostook County and the north woods: the farmland around Caribou and Presque Isle, with its wide horizons, and the forest lakes farther west, where almost no light reaches the sky. On the coast, Acadia National Park offers dark skies near Bar Harbor, with northern views from its summits and shores.' },
    { q: 'What month is best for northern lights in northern Maine?', a: `By clear dark hours, ${K.listOf(best.map((b) => b.name))} in Caribou: deep winter combines long nights with clear, cold spells. ${ce.clearest.name} has the lowest cloud amount, at ${K.num(ce.clearest.cloud, 0)}%, with shorter nights. Winter cold in Aroostook is severe, so a sheltered spot and warm layers matter.` },
  ],
  body: (h) => `
<h2>Aroostook, the top of New England</h2>
<p>Aroostook County reaches farther north than Quebec City, and its potato farms and forests are among the darkest inhabited land in the eastern United States. Caribou and Presque Isle need about Kp ${h.kp(ca.need)} on this site's view line, the lowest thresholds of New England. The open farmland around them gives something the rest of the Northeast often lacks: a flat, unobstructed horizon in every direction. A field road a few miles out of town, with no farmyard lights to the north, is all a storm night needs.</p>
<p>The north woods to the west, around the Allagash and the large lakes, are darker still, though forest closes the horizon except at a lakeshore or a clearing. Roads there are few and many are private logging roads, which makes them hard to reach at night in winter.</p>
<p>${h.mini('darkMonth', { place: 'maine/caribou', month: 1 })}</p>
<h2>Why NOAA says G1 and this site says more</h2>
<p>NOAA's storm scale is a summary of where aurora has been seen, written for the public. This site's line, used for every town, keeps the more southern of two published limits at each Kp, and between Kp 5 and Kp 6 that limit stays close to the edge of the oval itself, which places northern Maine just past the Kp 6 mark. The gap between the two is the uncertainty of the subject: under a perfect sky, with an open northern horizon and dark-adapted eyes, people in Aroostook do see aurora at Kp 5. The tool answers maybe for those nights rather than yes, and the hour strip shows how close each hour comes.</p>
<h2>The coast and the south</h2>
<p>Bangor needs about Kp ${h.kp(ba.need)} and the coast around Portland ${h.kp(po.need)}, a G3 storm. Acadia National Park, near Bar Harbor, is known for dark skies, and its granite summits and eastern shores give wide views. Coastal fog and clouds come with the Gulf of Maine's cool water, especially in spring and early summer. The ${h.a('region:new-hampshire', 'New Hampshire page')} covers the neighbor to the west, and across the border the ${h.a('city:canada/montreal', 'Montreal page')} and the ${h.a('region:canada', 'Canada page')}.</p>`,
  related: ['region:new-hampshire', 'region:vermont', 'region:canada', 'city:massachusetts/boston', 'geomagnetic-storm-scale'],
  extraSources: [{ name: 'National Park Service, Acadia National Park', url: 'https://www.nps.gov/acad/index.htm' }],
});
