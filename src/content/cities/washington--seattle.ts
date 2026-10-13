import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('washington', 'seattle');
const m = K.monthly('washington', 'seattle');
const ce = K.cloudExtremes('washington', 'seattle');
const best = K.bestMonths('washington', 'seattle', 2);

export default defineCity({
  region: 'washington',
  slug: 'seattle',
  title: 'Northern Lights Seattle 2026: Tonight’s Chance and Kp Needed',
  description: `Northern lights in Seattle in 2026: tonight's yes, maybe or no with NWS clouds, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the clearest months for a try.`,
  intro: 'Seattle needs a real storm and a break in the clouds at the same hour; when both happen, Puget Sound turns green.',
  resume: `From Seattle you need a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm or stronger on the NOAA scale. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, lower than its position on the map suggests, because the magnetic pole lies far to the east over Arctic Canada. The aurora reaches overhead only around Kp ${K.kp(f.overhead)}. The second obstacle is the sky: the NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and storm nights from October to March are often lost to Pacific fronts. Taking darkness and clouds together, ${best[0].name} and ${best[1].name} give the most clear dark hours. The tool below checks tonight's Kp blocks against the National Weather Service sky cover for Seattle, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights from Seattle?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or more, from a dark spot with an open view to the north. Seattle saw them clearly during the G5 storm of May 2024. On ordinary active nights, Kp 4 or 5, the aurora stays below the city's horizon.` },
    { q: 'Where is the best place near Seattle to watch the aurora?', a: 'Somewhere north of the city glow with water or flat land to the north: the north ends of Whidbey and Camano islands, the Skagit Valley flats, or the beaches of the Kitsap Peninsula facing north. City parks on the north shore of Lake Washington are a fallback when time is short, but the glow of Seattle itself sits in the way.' },
    { q: 'What month is best for the northern lights in Seattle?', a: `${best[0].name}, by the measure of clear dark hours: the nights are already long, at ${K.num(m[best[0].month - 1].hours, 1)} hours of full darkness on the 15th, and the Pacific storm season has not yet begun. Winter nights are longer but cloudier, at ${K.num(ce.cloudiest.cloud, 0)}% average cloud amount in ${ce.cloudiest.name}.` },
  ],
  body: (h) => `
<h2>Why the Pacific Northwest needs a bigger storm</h2>
<p>Seattle's latitude, ${h.num(h.townRef('washington', 'seattle').lat, 1)} degrees north, is close to that of Fargo or Duluth, two cities that see the aurora on modest storms. Seattle needs about ${h.num(f.need! - h.facts('north-dakota', 'fargo').need!, 1)} Kp more than Fargo. The reason is the tilt of Earth's magnetic field: the oval is centred on the magnetic pole in the Canadian Arctic, far to the east of the Pacific coast, so it dips south over the Great Lakes and stays farther north over the Pacific. For Seattle, the realistic opportunities are the G2 and G3 storms of the solar cycle, a few dozen nights a year near maximum and fewer as the cycle declines, as the ${h.a('solar-cycle', 'solar cycle guide')} explains.</p>
<h2>Fighting the Puget Sound clouds</h2>
<p>Marine air keeps the lowlands overcast for long stretches between October and March. When a storm is forecast, the useful question is where the clouds will break. Two patterns help: a ridge of high pressure after a front often brings a clear, cold night; and the rain shadow of the Olympics sometimes opens holes around the north Sound and Whidbey Island when Seattle stays grey. The hour strip of the tool, fed by the National Weather Service sky cover, shows when the breaks are expected for the place you type, so it is worth trying a town north of the city as well.</p>
<p>${h.mini('darkMonth', { place: 'washington/seattle', month: 9 })}</p>
<h2>Ferries, islands and the north Sound</h2>
<p>The islands and peninsulas around Puget Sound give Seattle residents something unusual: dark shorelines facing north within an hour's drive or ferry ride. Each shore has its own skyline, so look at a map before a storm night and pick one that looks north across water rather than toward the Olympic or Cascade foothills.</p>
<h2>What it looks like from here</h2>
<p>At the edge of Seattle's range, the aurora appears as a pale band low over the northern horizon, often grey to the eye and green or pink on a phone camera. Above Kp 7, rays rise higher and red light from the top of the aurora, more than 300 km up, shows over the north. Only near Kp ${h.kp(f.overhead)} does the display reach overhead. The ${h.a('photograph-northern-lights-phone', 'phone photography guide')} helps with the faint cases, and the ${h.a('region:washington', 'Washington page')} compares the rest of the state.</p>`,
  related: ['region:washington', 'city:washington/spokane', 'city:canada/vancouver', 'aurora-forecast', 'photograph-northern-lights-phone'],
});
