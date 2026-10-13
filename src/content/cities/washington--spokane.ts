import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('washington', 'spokane');
const se = K.facts('washington', 'seattle');
const m = K.monthly('washington', 'spokane');
const ce = K.cloudExtremes('washington', 'spokane');
const best = K.bestMonths('washington', 'spokane', 3);

export default defineCity({
  region: 'washington',
  slug: 'spokane',
  title: 'Northern Lights Spokane 2026: Tonight’s Odds, Kp and Clouds',
  description: `Northern lights in Spokane in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and why it clears more often than Seattle does.`,
  intro: 'Spokane needs nearly the same storm as Seattle but gets far more clear nights to use it.',
  resume: `Spokane needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm, because the city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, a little higher than Seattle's ${K.num(se.mlat, 1)}. That small magnetic edge matters less than the weather. Spokane lies in the rain shadow of the Cascades, and in NASA POWER's monthly averages its sky is at ${K.num(ce.clearest.cloud, 0)}% cloud amount in ${ce.clearest.name}, one of the clearest summer skies in the northern tier of the country, while ${ce.cloudiest.name} reaches ${K.num(ce.cloudiest.cloud, 0)}% under the winter inversions. Taking dark hours into account, the months with the most clear dark sky are ${K.listOf(best.map((b) => b.name))}. When a G2 or G3 storm is forecast for an autumn evening, Spokane is often the best-placed city of the Northwest.`,
  faqs: [
    { q: 'Can you see the northern lights from Spokane?', a: `Yes, during geomagnetic storms around Kp ${K.kp(f.need)} or stronger, from a spot outside the city lights with an open northern horizon. Because the Inland Northwest is drier than the coast, a forecast storm has a better chance of meeting a clear sky in Spokane than in Seattle, especially from August to October.` },
    { q: 'Where should I go near Spokane to see the aurora?', a: 'North or onto high ground: the rolling country toward Deer Park and Chewelah, the open fields of the Palouse to the south when the display is strong, or a summit with a northern view. Mount Spokane rises above the valley haze and city glow; its access road and winter conditions decide whether it is practical on a given night.' },
    { q: 'Why is Spokane cloudy in winter if eastern Washington is dry?', a: `Because cold air settles in the basins in winter and traps low cloud and fog under an inversion, sometimes for days. The NASA POWER cloud amount for Spokane peaks in ${ce.cloudiest.name} at ${K.num(ce.cloudiest.cloud, 0)}%. High ground can sit above that layer in clear air, so a drive uphill may beat the forecast for town.` },
  ],
  body: (h) => `
<h2>The rain shadow advantage</h2>
<p>Seattle and Spokane lie at almost the same latitude, ${h.num(h.townRef('washington', 'spokane').lat, 2)} and ${h.num(h.townRef('washington', 'seattle').lat, 2)} degrees north, and their Kp thresholds differ by only ${h.num(se.need! - f.need!, 1)}. What separates them is the Cascade crest. Pacific air drops most of its moisture on the western slopes, and by the time it reaches the Spokane valley it is far drier. The difference shows most in the season that matters: in ${m[8].name}, with ${h.num(m[8].hours, 1)} hours of full darkness on the 15th, Spokane's average cloud amount is ${h.num(m[8].cloud, 0)}%, against ${h.num(h.monthly('washington', 'seattle')[8].cloud, 0)}% in Seattle.</p>
<p>Winter is a different story. Cold air pools in the valley between storms and holds a lid of low cloud and freezing fog that can outlast a geomagnetic storm. On those nights the forecast for the city and the sky from Mount Spokane or the higher farmland north of town can differ completely.</p>
<p>${h.mini('kpNeed', { place: 'washington/spokane', region: 'washington' })}</p>
<h2>Smoke season</h2>
<p>Late summer brings the clearest skies of the Inland Northwest, and in some years the smoke of distant wildfires. Smoke dims faint aurora much as thin cloud does, yet the cloud forecast of the tool does not count it. The quick test is the stars: if the Milky Way is invisible on a moonless night outside town, a faint display at the threshold will be too.</p>
<h2>Reading a storm forecast from Spokane</h2>
<p>At Kp ${h.kp(f.need)}, the aurora appears low in the north, more easily caught on a phone than by eye. Each extra Kp lifts it: around Kp 7 rays become visible over the northern half of the sky, and near Kp ${h.kp(f.overhead)} the oval can reach the zenith. Because the city is in the Pacific time zone at the western edge of the country, the peak of a storm forecast for the early hours UT often falls in its evening, which suits a weeknight outing. The ${h.a('aurora-forecast', 'three-night forecast')} converts every SWPC block to local time.</p>
<p>Spokane is also the gateway to darker country: north Idaho and the Pend Oreille valley sit at slightly higher magnetic latitudes. The ${h.a('region:idaho', 'Idaho page')} compares Sandpoint and Coeur d'Alene, and the ${h.a('region:washington', 'Washington page')} the rest of the state.</p>`,
  related: ['region:washington', 'city:washington/seattle', 'region:idaho', 'city:montana/missoula', 'aurora-forecast'],
});
