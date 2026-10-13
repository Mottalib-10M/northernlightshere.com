import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const le = K.facts('uk', 'lerwick');
const iv = K.facts('uk', 'inverness');
const ed = K.facts('uk', 'edinburgh');
const be = K.facts('uk', 'belfast');
const mc = K.facts('uk', 'manchester');
const lo = K.facts('uk', 'london');
const wi = K.facts('canada', 'winnipeg');
const edm = K.monthly('uk', 'edinburgh');
const ednd = K.noDarkMonths('uk', 'edinburgh');
const lend = K.noDarkMonths('uk', 'lerwick');
const lond = K.noDarkMonths('uk', 'london');
const ce = K.cloudExtremes('uk', 'edinburgh');
const best = K.bestMonths('uk', 'edinburgh', 3);

export default defineRegion({
  slug: 'uk',
  title: 'Northern Lights UK 2026: Tonight’s Odds From Shetland Down',
  description: `Northern lights in the UK in 2026: tonight's yes, maybe or no by town, from Kp ${K.kp(le.need)} in Shetland to Kp ${K.kp(lo.need)} in London, with MET Norway clouds and the dark hours.`,
  intro: 'The UK sits on the far side of the magnetic pole from North America, so it needs bigger storms than its map latitude suggests, and Shetland is the only part close to the oval.',
  resume: `How large a storm the UK needs depends on how far north you are, and the range is wide. Lerwick in Shetland, at ${K.num(le.mlat, 1)} degrees magnetic latitude in the AACGM model, needs about Kp ${K.kp(le.need)}; Inverness needs ${K.needText(iv)}; Edinburgh, where the tool opens, about Kp ${K.kp(ed.need)}; Belfast about Kp ${K.kp(be.need)}; Manchester about Kp ${K.kp(mc.need)}; and London ${K.needText(lo)}. The second constraint is summer light. Shetland has no astronomical darkness at all from ${lend[0]} to ${lend[lend.length - 1]}, Edinburgh from ${ednd[0]} to ${ednd[ednd.length - 1]}, and even London from ${lond[0]} to ${lond[lond.length - 1]}. In winter the nights are long: ${K.num(edm[11].hours, 1)} dark hours in Edinburgh on December 15. Clouds weigh heavily, with NASA POWER amounts in Edinburgh between ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} and ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, so ${K.listOf(best.map((b) => b.name))} give the most clear dark hours. Cloud forecasts in the tool come from MET Norway.`,
  faqs: [
    { q: 'Where is the best place in the UK to see the northern lights?', a: `The far north of Scotland and the islands. Lerwick needs about Kp ${K.kp(le.need)}, the Caithness and Orkney coasts not much more, while the Central Belt needs about Kp ${K.kp(ed.need)}. A north facing coast with no town lights is the ideal spot, since at most UK thresholds the aurora sits low over the sea.` },
    { q: 'Why does the UK need a bigger storm than Canada at the same latitude?', a: `Because the magnetic pole lies over the Canadian Arctic. Winnipeg and London are close on the map, yet Winnipeg sits at ${K.num(wi.mlat, 1)} degrees magnetic latitude and needs about Kp ${K.kp(wi.need)}, while London sits at ${K.num(lo.mlat, 1)} degrees and needs about Kp ${K.kp(lo.need)}. The oval is centered on that pole, so it reaches lower over North America.` },
    { q: 'Can you see the aurora in the UK in summer?', a: `Rarely, because the sky never gets fully dark. Edinburgh has no astronomical darkness from ${ednd[0]} to ${ednd[ednd.length - 1]}, and Shetland loses it from ${lend[0]} to ${lend[lend.length - 1]}. A strong storm can still show in the deep twilight around midnight, but the season that counts runs from late August to April.` },
    { q: 'Who forecasts the aurora for the UK?', a: `The Met Office runs a space weather service that publishes aurora forecasts for the UK, and NOAA's SWPC publishes the Kp forecast in three hour blocks that this site uses. Their language differs, but both point to the same storms. The tool turns the SWPC Kp into a local answer, for example about Kp ${K.kp(ed.need)} for Edinburgh.` },
  ],
  body: (h) => `
<h2>From Shetland to the Channel</h2>
<p>Few countries cover such a range of aurora odds in so small an area. From Lerwick to London the threshold rises by ${h.num(lo.need! - le.need!, 1)} Kp, which on the NOAA scale is the gap between an ordinary active night and a strong storm. The north of Scotland lies close enough to the oval that a G1 night is worth watching; the Central Belt and Northern Ireland need a G2; much of England needs a G3. NOAA counts about ${h.P.facts.gScale[2].perCycle} storms of that strength per solar cycle, far fewer than the ${h.P.facts.gScale[0].perCycle} of G1 level, which is why the southern sightings of 2024 made headlines.</p>
<p>The cause is magnetic, not geographic. The UK lies on the Atlantic side of the globe, far from the magnetic pole in the Canadian Arctic, so its magnetic latitude runs several degrees below its map latitude: Edinburgh sits at ${h.num(h.townRef('uk', 'edinburgh').lat, 1)} degrees north on the map but ${h.num(ed.mlat, 1)} degrees in the AACGM model.</p>
${h.mini('kpNeed', { place: 'uk/inverness', region: 'uk' })}
<h2>Bright northern summers and long winter nights</h2>
<p>Northern latitudes cut both ways. In midwinter Shetland has ${h.num(h.monthly('uk', 'lerwick')[11].hours, 1)} hours of full darkness on December 15, plenty for a long watch. In midsummer the same islands get none at all for ${lend.length} months, a period Shetlanders call the simmer dim. For aurora purposes the year therefore splits into a dark season from late August to April and a summer gap that widens the farther north you go. London's gap covers only ${h.listOf(lond)}, but London needs a far larger storm, so its real season is no longer than Scotland's.</p>
<h2>Cloud, coasts and dark sky parks</h2>
<p>Atlantic weather is the British handicap. Fronts cross the country every few days, and the NASA POWER averages stay high everywhere: even the clearest month in Glasgow, ${h.cloudExtremes('uk', 'glasgow').clearest.name}, averages ${h.num(h.cloudExtremes('uk', 'glasgow').clearest.cloud, 0)}% cloud amount. The useful trick is to watch the gaps behind a cold front, which often clear the sky for a few hours, and to move east or west to find them. Dark sites help once the sky is open: Galloway Forest Park in southwest Scotland was designated an International Dark Sky Park in 2009, one of the first in the world, and Forestry and Land Scotland points stargazers to sites such as Clatteringshaws Loch and Glentrool. For the northern isles see the ${h.a('city:uk/lerwick', 'Lerwick page')}; for the Highlands, ${h.a('city:uk/inverness', 'Inverness')}; for the capital, ${h.a('city:uk/london', 'London')}.</p>`,
  related: ['city:uk/edinburgh', 'city:uk/lerwick', 'city:uk/inverness', 'city:uk/london', 'region:canada', 'geomagnetic-storm-scale'],
  extraSources: [
    { name: 'Met Office, space weather', url: 'https://www.metoffice.gov.uk/weather/specialist-forecasts/space-weather' },
    { name: 'Forestry and Land Scotland, Galloway Forest Dark Sky Park', url: 'https://forestryandland.gov.scot/visit/forest-parks/galloway-forest-park/dark-skies' },
  ],
});
