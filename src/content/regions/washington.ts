import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const be = K.facts('washington', 'bellingham');
const sp = K.facts('washington', 'spokane');
const se = K.facts('washington', 'seattle');
const va = K.facts('washington', 'vancouver');
const ce = K.cloudExtremes('washington', 'seattle');

export default defineRegion({
  slug: 'washington',
  title: 'Northern Lights Washington 2026: Tonight’s Odds Across WA',
  description: `Northern lights in Washington in 2026: tonight's yes, maybe or no for your town, from Kp ${K.kp(be.need)} near Bellingham to Kp ${K.kp(va.need)} in Vancouver, WA, and the clouds.`,
  intro: 'The Cascades split Washington into two skies: a cloudy west that needs a storm and a clear east that needs the same storm.',
  resume: `Seeing the northern lights from Washington takes a geomagnetic storm almost everywhere in the state. In the AACGM model the north of the state sits near ${K.num(be.mlat, 1)} degrees magnetic latitude, around Bellingham, which needs about Kp ${K.kp(be.need)}; Seattle, at ${K.num(se.mlat, 1)} degrees, needs about Kp ${K.kp(se.need)}; Spokane needs ${K.kp(sp.need)}, and Vancouver on the Columbia about ${K.kp(va.need)}. All of those are ${K.gName(sp.g)} storms or stronger on the NOAA scale, nights that SWPC counts by the hundreds per solar cycle rather than by the thousands. The bigger difference inside the state is weather: west of the Cascades, Seattle's NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, while the dry east clears far more often. The tool opens on Seattle; type your own town or ZIP code.`,
  faqs: [
    { q: 'Where is the best place in Washington to see the northern lights?', a: `Anywhere east of the Cascades with a clear northern horizon, or the far north of the state. The Okanogan highlands and the area north of Spokane combine dry air with distance from city light. Bellingham needs about Kp ${K.kp(be.need)}, the lowest threshold of the state, but the Puget Sound lowlands are cloudier.` },
    { q: 'What Kp is needed to see the aurora in Washington State?', a: `Between about Kp ${K.kp(be.need)} in the north and Kp ${K.kp(va.need)} along the Columbia River, so a G2 to G3 storm on the NOAA scale. Below Kp 6 the aurora usually stays under the horizon of most of the state, except from high ground looking north in the Okanogan and Pend Oreille country.` },
    { q: 'Why can people in eastern Washington see the aurora when Seattle is cloudy?', a: 'Because the Cascades wring most of the Pacific moisture out of the air before it crosses to the east. Spokane and the Columbia Basin sit in the rain shadow, with far more clear nights than Puget Sound, especially in late summer and early autumn. On a storm night, crossing the passes eastward is often the best move.' },
  ],
  body: (h) => `
<h2>A storm state, split by the Cascades</h2>
<p>Washington's magnetic latitudes are lower than its geographic ones would suggest. The magnetic pole sits over northern Canada, far to the east of the Pacific Northwest, so the whole state is tilted away from it: Seattle at ${h.num(h.townRef('washington', 'seattle').lat, 1)} degrees north has about the same Kp threshold as Sioux Falls, South Dakota, ${h.num(h.townRef('washington', 'seattle').lat - h.townRef('south-dakota', 'sioux-falls').lat, 1)} degrees of latitude farther south. In practice, the northern lights in Washington are a storm phenomenon, and the useful forecast is the SWPC watch for G2 or G3 conditions.</p>
<p>Within the state, the north-south difference is modest: from Bellingham to Vancouver the threshold climbs by about ${h.num(va.need! - be.need!, 1)} Kp. The east-west difference in weather is far larger. The Cascades take the moisture out of the Pacific air, and the eastern half of the state sits in their rain shadow. In NASA POWER averages, Spokane's sky in ${h.cloudExtremes('washington', 'spokane').clearest.name} is at ${h.num(h.cloudExtremes('washington', 'spokane').clearest.cloud, 0)}% cloud amount, against ${h.num(ce.clearest.cloud, 0)}% for Seattle in its clearest month.</p>
<p>${h.mini('kpNeed', { place: 'washington/wenatchee', region: 'washington' })}</p>
<h2>Where to stand</h2>
<p>West of the mountains, the shores that face north across open water are the best bets near the cities: the north ends of Whidbey and Camano islands, the Skagit flats and the bay at Bellingham. East of the Cascades, the Waterville Plateau, the Okanogan valley and the high ground around Spokane offer wide northern horizons. Wherever you go, the aurora at the edge of Washington's range sits within ten or fifteen degrees of the horizon, so a ridge to the north hides it. The ${h.a('city:washington/seattle', 'Seattle page')} and the ${h.a('city:washington/spokane', 'Spokane page')} give the dark hours and cloud averages month by month.</p>
<h2>The season</h2>
<p>Storm timing adds a Pacific twist. The SWPC forecast is written in three-hour blocks of Universal Time, and Washington runs eight hours behind UT in winter and seven in summer, so the block 06 to 09 UT, when storms often peak in the forecast tables, falls between 10 pm and 1 am Pacific standard time, right in the useful part of the night.</p>
<p>Washington keeps some astronomical darkness even in June, unlike Alaska or Scotland, but only about ${h.num(h.monthly('washington', 'seattle')[5].hours, 1)} hours on the 15th in Seattle. The months with the most clear dark hours are late summer and early autumn, before the Pacific storms set in, which the table below shows for Seattle.</p>`,
  related: ['city:washington/seattle', 'city:washington/spokane', 'region:oregon', 'region:idaho', 'city:canada/vancouver'],
});
