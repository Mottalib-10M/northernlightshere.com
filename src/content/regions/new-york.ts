import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pl = K.facts('new-york', 'plattsburgh');
const wt = K.facts('new-york', 'watertown');
const sy = K.facts('new-york', 'syracuse');
const al = K.facts('new-york', 'albany');
const ny = K.facts('new-york', 'new-york-city');
const ce = K.cloudExtremes('new-york', 'syracuse');

export default defineRegion({
  slug: 'new-york',
  title: 'Northern Lights New York 2026: Tonight’s Odds, Kp by Town',
  description: `Northern lights in New York State in 2026: tonight's yes, maybe or no, from Kp ${K.kp(pl.need)} in Plattsburgh to Kp ${K.kp(ny.need)} in New York City, and the dark skies upstate.`,
  intro: 'NOAA names New York at G2 on its storm scale; upstate needs that storm, the city needs a far bigger one.',
  resume: `New York is one of the states NOAA's storm scale names: at G2, a Kp 6 storm, aurora has been seen as low as New York and Idaho. In the AACGM model the north of the state, around Plattsburgh and Watertown, lies near ${K.num(pl.mlat, 1)} degrees magnetic latitude and needs a planetary Kp of about ${K.kp(pl.need)} to ${K.kp(wt.need)}. Syracuse needs about ${K.kp(sy.need)}, Albany ${K.kp(al.need)}, and New York City, at ${K.num(ny.mlat, 1)} degrees, about ${K.kp(ny.need)}, a strong G3 storm. Clouds weigh heavily upstate: the Great Lakes feed long overcast spells, and Syracuse's NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. September is the clearest month across the state. The tool opens on Syracuse; type your own town or ZIP code for tonight's hours.`,
  faqs: [
    { q: 'Where is the best place in New York to see the northern lights?', a: `The North Country: the Adirondacks, the St. Lawrence valley and the Champlain shore, where the threshold falls to about Kp ${K.kp(pl.need)} and the forests of the Adirondack Park hold the darkest skies of the state. A lake shore or a summit with a clear northern horizon makes the most of a storm.` },
    { q: 'What Kp do you need to see the aurora in New York State?', a: `About Kp ${K.kp(pl.need)} in the far north and up to Kp ${K.kp(ny.need)} in New York City. NOAA's scale associates G2, Kp 6, with aurora seen as low as New York, which matches the north of the state; the south and the city need G3 or more.` },
    { q: 'Why is upstate New York so often cloudy for the aurora?', a: `Because Lake Ontario and Lake Erie feed moisture into the cold air that crosses them, building lake-effect clouds downwind from late autumn through winter. Syracuse's cloud amount peaks at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} in NASA POWER averages. Autumn, before the lakes start their snow season, gives the best odds.` },
  ],
  body: (h) => `
<h2>The North Country</h2>
<p>New York's best aurora ground is the north: the Adirondack Park, the largest protected area in the lower 48, and the St. Lawrence and Champlain valleys that frame it. Plattsburgh, on Lake Champlain, needs about Kp ${h.kp(pl.need)}, and the lake gives a long northern view toward Quebec from its western shore. Watertown, near the eastern end of Lake Ontario, needs about ${h.kp(wt.need)}. Inside the park, summits and lakes give the open horizons that the forested valleys lack, and the darkness is that of a region with very few towns.</p>
<p>${h.mini('kpNeed', { place: 'new-york/plattsburgh', region: 'new-york' })}</p>
<h2>Lakes, snowbelts and clear spells</h2>
<p>The Great Lakes shape the cloud calendar of the whole western and central part of the state. From November to February, cold air crossing Lake Ontario and Lake Erie builds the lake-effect bands of the Tug Hill and Buffalo snowbelts, and the sky can stay overcast for long stretches. The clearest month in the NASA POWER averages for Syracuse is ${ce.clearest.name}, at ${h.num(ce.clearest.cloud, 0)}% cloud amount. On a storm night in winter, the eastern Adirondacks and the Champlain valley, farther from the lakes, are often clearer than the western cities.</p>
<h2>Downstate</h2>
<p>South of Albany the thresholds climb, and the Hudson Valley and the city sit at G3. The Catskills offer dark skies within reach of the city, though their valleys close much of the northern horizon; a summit or a high open field does better. The ${h.a('city:new-york/new-york-city', 'New York City page')} looks at what a strong storm means from the five boroughs, and the ${h.a('city:new-york/buffalo', 'Buffalo page')} at the western end of the state. Neighbouring ${h.a('region:vermont', 'Vermont')} shares the Champlain valley.</p>`,
  related: ['city:new-york/new-york-city', 'city:new-york/buffalo', 'region:vermont', 'region:pennsylvania', 'city:canada/montreal'],
});
