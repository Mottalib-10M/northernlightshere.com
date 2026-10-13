import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'aberdeen');
const m = K.monthly('uk', 'aberdeen');
const nd = K.noDarkMonths('uk', 'aberdeen');
const ce = K.cloudExtremes('uk', 'aberdeen');
const best = K.bestMonths('uk', 'aberdeen', 3);
const iv = K.facts('uk', 'inverness');
const ed = K.facts('uk', 'edinburgh');

export default defineCity({
  region: 'uk',
  slug: 'aberdeen',
  title: 'Northern Lights Aberdeen 2026: Tonight on the North Sea',
  description: `Northern lights in Aberdeen in 2026: tonight's yes, maybe or no, the Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, the coast to Fraserburgh and the haar.`,
  intro: 'Aberdeen looks east over the North Sea, so its best aurora views come from the stretch of coast that turns to face north.',
  resume: `Aberdeen needs ${K.needText(f)}, for the northern lights. The Granite City sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, only ${K.num(iv.mlat - f.mlat, 1)} degrees below Inverness, and that small step lifts the threshold from Inverness's Kp ${K.kp(iv.need)} to about Kp ${K.kp(f.need)}, enough to cross from the G1 to the ${K.gName(f.g)} level. In this site's model the oval edge is overhead at the same Kp, so a qualifying storm tends to rise well above the horizon. There is no astronomical darkness from ${nd[0]} to ${nd[nd.length - 1]}, and only ${K.num(m[7].hours, 1)} hours on August 15. December 15 gives ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. NASA POWER cloud amounts range from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, so the best months on clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool reads tonight's SWPC Kp and MET Norway cloud cover for Aberdeen.`,
  faqs: [
    { q: 'Can you see the northern lights from Aberdeen?', a: `Yes, on storm nights of about Kp ${K.kp(f.need)} or more, a ${K.gName(f.g)} level that NOAA counts about ${K.P.facts.gScale[f.g - 1].perCycle} times per solar cycle. The city and harbor lights hide faint displays, so the coast north of the city, with the sea to the north and east, gives the best chance on a clear night.` },
    { q: 'Where is the best spot near Aberdeen for the aurora?', a: `Up the coast toward Peterhead and Fraserburgh, where the shoreline turns west and starts to face due north over the open sea. Inland Aberdeenshire is dark too, but rolling hills and woods can block the low sky. At Kp ${K.kp(f.need)} the aurora often begins low on the horizon before it climbs.` },
    { q: 'Does sea fog stop aurora watching in Aberdeen?', a: `Sometimes. The haar, a cold sea fog off the North Sea, is most common in spring and early summer, when Aberdeen has little or no darkness anyway, with no astronomical night from ${nd[0]} to ${nd[nd.length - 1]}. In the dark season the bigger problem is frontal cloud; a few miles inland can escape coastal mist on a still night.` },
  ],
  body: (h) => `
<h2>A city that faces the sunrise</h2>
<p>Aberdeen's coastline runs north and south, and the city looks east across the North Sea toward Norway. For an aurora watcher that orientation is half useful. The sea is dark and the eastern sky is clear of buildings, but the aurora sits to the north, where the coast itself and the city's northern suburbs fill the view. The fix is to follow the coast north. Past Peterhead the shore curves west at Fraserburgh and begins to face the Moray Firth and the open water beyond, with nothing between the shingle and the northern horizon.</p>
<p>${h.mini('darkMonth', { place: 'uk/aberdeen', month: 12 })}</p>
<h2>One step across a storm boundary</h2>
<p>The difference between Aberdeen and Inverness looks tiny on paper, ${h.num(iv.mlat - f.mlat, 1)} degrees of magnetic latitude and about ${h.num(f.need! - iv.need!, 1)} Kp. It matters because it falls across a boundary of the NOAA scale: Inverness can see aurora on a G1 storm, Aberdeen generally needs a G2, and G2 storms are about a third as frequent. Edinburgh, farther south, needs about ${h.num(ed.need! - f.need!, 1)} Kp more again. On a night when the SWPC forecast shows a block right at Kp 5 or 6, the hour by hour answer in the tool can differ between the two northern cities, so it is worth checking both.</p>
<h2>North along the coast road</h2>
<p>The coast north of the city, past the dunes of the Ythan estuary toward Peterhead and Fraserburgh, is flat farmland with long views over the sea to the north and northeast. Every few miles leaves more of the city's glow behind, and Fraserburgh, at the corner of the Buchan coast, looks straight out over the Moray Firth's mouth toward the open North Sea. It is the natural drive on a night when the forecast for the city is a maybe.</p>
<h2>Haar, fronts and the east coast advantage</h2>
<p>The east of Scotland lies in the rain shadow of the Highlands, and Aberdeen gets fewer of the wet westerly fronts that soak Glasgow and the west coast. Its own weather problem is the haar, a cold sea fog that rolls in off the North Sea, mostly in spring and early summer. By autumn the haar is rarer, the nights are long, and November and December carry the most clear dark hours. A northerly or northwesterly wind after a front often brings the sharpest skies. For the Highland capital see the ${h.a('city:uk/inverness', 'Inverness page')}; for the rest of the country, the ${h.a('region:uk', 'UK page')}.</p>`,
  related: ['region:uk', 'city:uk/inverness', 'city:uk/edinburgh', 'city:uk/lerwick', 'geomagnetic-storm-scale'],
});
