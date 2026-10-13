import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'glasgow');
const m = K.monthly('uk', 'glasgow');
const nd = K.noDarkMonths('uk', 'glasgow');
const ce = K.cloudExtremes('uk', 'glasgow');
const best = K.bestMonths('uk', 'glasgow', 3);

export default defineCity({
  region: 'uk',
  slug: 'glasgow',
  title: 'Northern Lights Glasgow 2026: Tonight’s Odds and Kp Needed',
  description: `Northern lights in Glasgow in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, Atlantic cloud, and dark skies near the city.`,
  intro: 'Glasgow sits under Atlantic weather; the Campsie Fells and the lochs to the north hold its best aurora views.',
  resume: `Glasgow needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights on this site's view line, a ${K.gName(f.g)} storm on the NOAA scale, almost the same as Edinburgh. In the AACGM model the city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude, and the aurora reaches overhead around Kp ${K.kp(f.overhead)}. The threshold is cautious: from a dark, north-facing spot, smaller storms can show a faint glow that the tool rates as maybe. What makes Glasgow harder than its latitude suggests is the weather. Atlantic fronts reach the west of Scotland first, and the NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. In ${K.listOf(nd)} there is no full darkness; mid-December gives ${K.num(m[11].hours, 1)} hours. By clear dark hours, ${K.listOf(best.map((b) => b.name))} lead.`,
  faqs: [
    { q: 'Can you see the northern lights from Glasgow?', a: `Yes, during storms of about Kp ${K.kp(f.need)} or more, from a dark place north of the city with a clear view to the north. Glaswegians photographed the aurora during the big storms of 2024. Inside the city the light pollution hides a faint display, and cloud often hides everything.` },
    { q: 'Where can I see the aurora near Glasgow?', a: 'North of the city: the Campsie Fells and the Kilpatrick Hills, both within half an hour, look north over darker country; the shores of Loch Lomond and the Trossachs farther on are darker still. Galloway Forest Park, south of the city, is a designated dark sky park, but its main asset is darkness rather than a northern view.' },
    { q: 'Why is Glasgow often cloudy on aurora nights?', a: `Because it lies in the path of Atlantic weather systems, which bring cloud and rain to the west of Scotland before the east. NASA POWER puts Glasgow's cloud amount at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Clear spells often come behind a front, in colder north-westerly air, and they can be short.` },
  ],
  body: (h) => `
<h2>The view from the Campsies</h2>
<p>Glasgow fills the Clyde valley, and its glow spreads far across the surrounding hills. The closest escape to the north is the line of the Campsie Fells and the Kilpatrick Hills, a short drive from the city centre. From their slopes the view north crosses the Fintry hills and the Carse of Stirling toward the Highlands, with far fewer lights than the valley behind. On a G2 or G3 night, a lay-by on the Crow Road over the Campsies, or a high point near Fintry, is the classic quick option. Farther north, Loch Lomond and the Trossachs offer genuinely dark skies, though the mountains around the lochs close part of the northern horizon.</p>
${h.mini('kpNeed', { place: 'uk/glasgow', region: 'uk' })}
<h2>Galloway, south of the city</h2>
<p>Galloway Forest Park, about two hours south, became the first dark sky park in the United Kingdom in 2009, as Forestry and Land Scotland describes. Its skies are among the darkest in Britain, which helps with any faint glow, but the aurora sits to the north, toward the Glasgow conurbation's light, so the best spots there look north from high ground in the park. For a storm that is clearly strong, the darkness of Galloway can be worth the extra drive.</p>
<h2>Clyde coast and the islands</h2>
<p>West of the city, the Firth of Clyde opens toward Arran and Bute. Its shores mostly face south and west, away from the aurora, but the north end of Bute and the hills above the Cowal shore look north over dark, thinly settled country. A ferry crossing makes for a long evening; the hills north of the city remain the practical choice on most storm nights.</p>
<h2>Atlantic timing</h2>
<p>West of Scotland weather changes fast. A forecast overcast evening can clear after midnight as a front moves east, and the reverse is common too. The hour strip of the tool reads the MET Norway forecast for the coordinates you give, so it is worth checking a point north of the city as well as Glasgow itself. On December 15 the full darkness runs from ${m[11].start} to ${m[11].end}, which leaves plenty of time for a front to pass. For the east of Scotland see the ${h.a('city:uk/edinburgh', 'Edinburgh page')}, and for the country as a whole the ${h.a('region:uk', 'UK page')}.</p>`,
  related: ['region:uk', 'city:uk/edinburgh', 'city:uk/belfast', 'city:uk/inverness', 'photograph-northern-lights-phone'],
  extraSources: [{ name: 'Forestry and Land Scotland, Galloway Forest Park dark skies', url: 'https://forestryandland.gov.scot/visit/forest-parks/galloway-forest-park/dark-skies' }],
});
