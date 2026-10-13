import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const all = K.TOWNS.map((t) => K.facts(t.region, t.slug));
const easy = all.filter((f) => f.need !== null && f.need < 1).length;
const hard = all.filter((f) => f.need === null || f.need >= 7).length;
const ut = K.facts('alaska', 'utqiagvik');
const lon = K.facts('uk', 'london');

export default definePage({
  id: 'northern-lights',
  group: 'forecast',
  order: 5,
  slug: 'northern-lights',
  nav: 'Where you can see them',
  card: `Kp needed in ${K.TOWNS.length} towns of the US, Canada and the UK, easiest first`,
  title: 'Northern Lights by Place 2026: Kp Needed in Every Town',
  description: `Where to see the northern lights in 2026: the Kp needed in ${K.TOWNS.length} US, Canadian and UK towns, from Alaska to London, with tonight's yes, maybe or no for each.`,
  h1: 'Where you can see the northern lights, town by town',
  intro: 'Every town on the site, ranked by the Kp it needs, with its state or country page. Pick one in the tool for tonight’s answer.',
  resume: `Seeing the northern lights is mostly a question of where you stand relative to the magnetic pole, and this page puts a number on it for ${K.TOWNS.length} towns. For each one, the table gives the AACGM magnetic latitude, the Kp at which aurora becomes visible on the northern horizon, the Kp at which the oval itself passes overhead, and the storm level on the NOAA scale that this represents. ${easy} of the towns need less than Kp 1, which means aurora on most clear dark nights; ${hard} need Kp 7 or more, a G3 storm, which SWPC counts at about ${K.P.facts.gScale[2].perCycle} per eleven-year solar cycle. The extremes are Utqiaġvik, at ${K.num(ut.mlat, 1)} degrees magnetic, where the aurora can sit south of you on quiet nights, and London, at ${K.num(lon.mlat, 1)} degrees, which needs about Kp ${K.kp(lon.need)}.`,
  faqs: [
    { q: 'What is the farthest south the northern lights can be seen in the US?', a: `In the strongest storms, very far. NOAA's storm scale says a G5 storm, Kp 9, has brought aurora as low as Florida and southern Texas, around ${K.P.facts.gScale[4].mlat} degrees magnetic latitude. Those storms are rare: about ${K.P.facts.gScale[4].perCycle} per solar cycle. On an ordinary active night, Kp 4 or 5, the line runs through southern Canada and the northern edge of the lower 48.` },
    { q: 'Which US state has the best chance of seeing the aurora?', a: 'Alaska, by far: Fairbanks and the interior lie under the auroral oval itself, so aurora shows on most clear, dark nights from late August to mid-April. In the lower 48, northern Minnesota, North Dakota, Michigan’s Upper Peninsula and northern Montana need the smallest storms, because the magnetic pole sits in northern Canada and pulls the oval toward the Midwest.' },
    { q: 'Why is magnetic latitude different from ordinary latitude?', a: 'Ordinary latitude is measured from the geographic pole. The aurora is arranged around the magnetic pole, which the NOAA National Centers for Environmental Information place in the Arctic north of Canada, drifting toward Siberia. Places on the American side of the globe are therefore closer to it, magnetically, than places at the same latitude in Europe or Asia.' },
    { q: 'Can I see the northern lights from a big city?', a: `Sometimes, during big storms, but city light hides the faint green arcs of an ordinary night. Minneapolis needs about Kp ${K.kp(K.facts('minnesota', 'minneapolis').need)} and Chicago about Kp ${K.kp(K.facts('illinois', 'chicago').need)} even before the glow is taken into account. Driving forty miles north to a dark spot with an open view gains more than any forecast tweak.` },
  ],
  body: (h) => `
<h2>How to read the ranking</h2>
<p>The Kp to see it is the value at which the southern edge of visibility, as SWPC and the NOAA scale describe it, reaches the town: below it, the aurora stays below your northern horizon. The Kp overhead is the value at which the oval itself, the band where the light is produced, moves over the town; at that point the display can fill the sky and even appear to the south. The gap between the two columns is the range of nights when you would see it low in the north, often more clearly on a phone camera than by eye.</p>
<p>Places are sorted by the first column. Two towns at the same geographic latitude can sit far apart: Seattle and Fargo are both close to ${h.num(h.townRef('north-dakota', 'fargo').lat, 0)} degrees north, yet Fargo needs about Kp ${h.kp(h.facts('north-dakota', 'fargo').need)} and Seattle about ${h.kp(h.facts('washington', 'seattle').need)}, because Fargo is closer to the magnetic pole. Across the Atlantic the effect is stronger: Edinburgh, at ${h.num(h.townRef('uk', 'edinburgh').lat, 0)} degrees north, needs Kp ${h.kp(h.facts('uk', 'edinburgh').need)}, more than Fargo.</p>
<h2>Why a ranking by Kp, and not a map with colored bands</h2>
<p>The maps most sites show are the SWPC view lines for a few Kp values, drawn on a continent. They are honest but hard to read for one town, and they hide the step that matters: the line does not move evenly with Kp. Up to Kp 5, SWPC's rule moves the edge of the oval ${h.P.method.ovalStepPerKp} degrees per step; from Kp 6 the NOAA scale's latitudes move ${h.num(h.P.facts.gScale[1].mlat - h.P.facts.gScale[2].mlat, 0)} degrees per step. A town just south of the Kp 6 line needs a storm three times rarer than one just north of it, which a band on a map does not show. The table gives the exact value so you can compare it with tonight's forecast on the ${h.a('kp-index', 'Kp index page')}.</p>
<h2>What the ranking leaves out</h2>
<p>It is a ranking of geometry, not of experience. Darkness changes with the season and is worst where the aurora is easiest: interior Alaska and Shetland have no astronomical night for weeks around the June solstice. Cloud climate varies just as much, and the monthly tables on each state and city page show it from NASA POWER data. And the ranking assumes a clear view of the northern horizon: from a valley floor or a street lined with buildings, add a point of Kp.</p>
<p>The state and country pages compare the towns of one region and give, for its main town, the darkness and cloud figures by month. City pages do the same for one city and explain what is singular about watching from there. The ${h.a('best-places-northern-lights-usa', 'best places guide')} picks the spots worth a trip.</p>`,
  tool: 'places',
  related: ['home', 'best-places-northern-lights-usa', 'kp-index', 'region:alaska', 'region:minnesota'],
  sources: ['swpc_tips', 'swpc_scales', 'aacgm', 'ncei_poles', 'census_gazetteer', 'nasa_power'],
});
