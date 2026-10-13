import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const er = K.facts('pennsylvania', 'erie');
const sc = K.facts('pennsylvania', 'scranton');
const sco = K.facts('pennsylvania', 'state-college');
const pi = K.facts('pennsylvania', 'pittsburgh');
const ph = K.facts('pennsylvania', 'philadelphia');
const ce = K.cloudExtremes('pennsylvania', 'erie');
const cs = K.cloudExtremes('pennsylvania', 'state-college');

export default defineRegion({
  slug: 'pennsylvania',
  title: 'Northern Lights Pennsylvania 2026: Tonight’s Odds by Town',
  description: `Northern lights in Pennsylvania in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(er.need)} needed in Erie and ${K.kp(ph.need)} in Philadelphia, and the north tier skies.`,
  intro: 'Pennsylvania needs a strong storm everywhere; its northern counties hold some of the darkest skies in the East to make it count.',
  resume: `Pennsylvania sees the northern lights only in strong geomagnetic storms. In the AACGM model its towns lie between ${K.num(ph.mlat, 1)} and ${K.num(er.mlat, 1)} degrees magnetic latitude, around the G3 line that NOAA's storm scale draws at ${K.P.facts.gScale[2].mlat} degrees. Erie, on Lake Erie in the northwest corner, needs a planetary Kp of about ${K.kp(er.need)}; Scranton about ${K.kp(sc.need)}; State College ${K.kp(sco.need)}; Pittsburgh ${K.kp(pi.need)}; and Philadelphia ${K.kp(ph.need)}. Those are all G3 storms, which NOAA counts at about ${K.P.facts.gScale[2].perCycle} per eleven-year solar cycle. Clouds are the second obstacle: Erie's NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, under lake-effect weather. The best ground is the forested north tier, where the Pennsylvania DCNR runs Cherry Springs State Park as a dark sky park. The tool opens on Erie; type your own town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Pennsylvania?', a: `Yes, during strong geomagnetic storms of about Kp ${K.kp(er.need)} to ${K.kp(ph.need)}, depending on the town, with a clear sky and a dark view north. The aurora was seen across the state during the G5 storm of May 2024. On ordinary active nights, Kp 4 or 5, it stays below the horizon.` },
    { q: 'Where is the best place in Pennsylvania to see the aurora?', a: 'The north tier counties, especially around Cherry Springs State Park in Potter County, which the state Department of Conservation and Natural Resources manages as a dark sky park. Any high, open spot in the Allegheny highlands with a clear northern horizon and no town lights to the north also works on a storm night.' },
    { q: 'What Kp do you need to see the aurora in Pennsylvania?', a: `About Kp ${K.kp(er.need)} in Erie, ${K.kp(sco.need)} in State College and ${K.kp(ph.need)} in Philadelphia: a G3 storm on NOAA's scale, sometimes G4 for the southeast. At those levels the aurora appears low in the north, often red rather than green, because only its upper part rises above the horizon.` },
  ],
  body: (h) => `
<h2>The north tier and Cherry Springs</h2>
<p>Pennsylvania's best asset for the aurora is not its latitude but the emptiness of its northern counties. The Allegheny Plateau along the New York border is mostly forest, with small towns and very little light. Cherry Springs State Park, on a mountaintop in Potter County, is managed by the Department of Conservation and Natural Resources as a dark sky park, and its astronomy field gives an open view of the sky that most of the eastern United States has lost. On a G3 night it is one of the few places within a day's drive of Philadelphia, Pittsburgh and New York where a low red aurora stands out against a truly dark horizon.</p>
<p>The ridge-and-valley country farther south has more relief and more towns; there, hilltops and fire towers with a northern view do better than valley floors. Wherever you stand, the aurora at Pennsylvania's thresholds sits within a few degrees of the northern horizon, so trees and hills to the north matter more than altitude.</p>
<p>${h.mini('kpNeed', { place: 'pennsylvania/state-college', region: 'pennsylvania' })}</p>
<h2>Lake Erie and the cloud calendar</h2>
<p>Erie has the lowest threshold of the state, Kp ${h.kp(er.need)}, but also its cloudiest winters. When cold air crosses the warm lake in late autumn and early winter, it builds the lake-effect bands that bury the snowbelt and cover the sky for days, which is why Erie's cloud amount climbs to ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} in NASA POWER averages. State College, inland, ranges from ${h.num(cs.clearest.cloud, 0)}% in ${cs.clearest.name} to ${h.num(cs.cloudiest.cloud, 0)}% in ${cs.cloudiest.name}. Across the state, September is the clearest month and the autumn months lead by clear dark hours.</p>
<h2>What a Pennsylvania aurora looks like</h2>
<p>Most sightings here are of a diffuse glow low over the northern skyline, pink to red, with sometimes a faint green band at its base and pale rays rising from it. SWPC explains that red light comes from oxygen above about ${h.P.facts.redHeightKmAbove} km, which is the part of a distant aurora that clears the horizon from this far south. The eye picks up the color poorly in that faint light; a phone camera on a long exposure records it well, as the ${h.a('photograph-northern-lights-phone', 'phone guide')} explains. The ${h.a('city:pennsylvania/pittsburgh', 'Pittsburgh page')} and the ${h.a('city:pennsylvania/philadelphia', 'Philadelphia page')} give the figures for the two cities.</p>`,
  related: ['city:pennsylvania/pittsburgh', 'city:pennsylvania/philadelphia', 'region:new-york', 'region:ohio', 'northern-lights-colors'],
  extraSources: [{ name: 'Pennsylvania DCNR, Cherry Springs State Park', url: 'https://www.dcnr.pa.gov/StateParks/FindAPark/CherrySpringsStatePark/Pages/default.aspx' }],
});
