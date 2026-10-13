import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const np = K.facts('vermont', 'newport');
const sa = K.facts('vermont', 'st-albans');
const bu = K.facts('vermont', 'burlington');
const mo = K.facts('vermont', 'montpelier');
const ru = K.facts('vermont', 'rutland');
const ce = K.cloudExtremes('vermont', 'burlington');
const m = K.monthly('vermont', 'burlington');

export default defineRegion({
  slug: 'vermont',
  title: 'Northern Lights Vermont 2026: Tonight’s Chance, Kp by Town',
  description: `Northern lights in Vermont in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(np.need)} needed in Newport, ${K.kp(ru.need)} in Rutland, and the Northeast Kingdom's dark skies.`,
  intro: 'Vermont needs a moderate to strong storm, and offers what the rest of the Northeast lacks: dark, quiet northern horizons.',
  resume: `Vermont sees the northern lights during moderate to strong geomagnetic storms. In the AACGM model the state lies between about ${K.num(ru.mlat, 1)} and ${K.num(sa.mlat, 1)} degrees magnetic latitude: Newport, on Lake Memphremagog near the Quebec border, and St. Albans need a planetary Kp of about ${K.kp(np.need)}; Burlington about ${K.kp(bu.need)}; Montpelier ${K.kp(mo.need)}; and Rutland, in the south, ${K.kp(ru.need)}. That is a ${K.gName(bu.g)} storm for most of the state. What Vermont has going for it is darkness: small towns, forests and hills, with the Northeast Kingdom among the darkest corners of New England. Clouds are the limit, with Burlington's NASA POWER cloud amount ranging from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. The tool opens on Burlington; type your own town or ZIP code for tonight's hours.`,
  faqs: [
    { q: 'Can you see the northern lights in Vermont?', a: `Yes, during storms of about Kp ${K.kp(np.need)} in the north of the state to Kp ${K.kp(ru.need)} in the south, from a dark spot with a clear view to the north. A G2 storm usually brings the aurora into view along the Canadian border; the south of the state needs a G3.` },
    { q: 'Where in Vermont is best for watching the aurora?', a: 'The Northeast Kingdom, around Newport and Island Pond, for its darkness and its northern position, and the Champlain islands and shore north of Burlington, which look north up the lake. Summits help too, as long as the view to the north is open: forested ridges hide the low sky where the aurora appears.' },
    { q: 'When is the best season for the aurora in Vermont?', a: `September and October, when nights are already long and the sky is clearest: ${ce.clearest.name} has the lowest cloud amount in Burlington, at ${K.num(ce.clearest.cloud, 0)}%. December offers ${K.num(m[11].hours, 1)} hours of full darkness but is the cloudiest month. Mud season and summer have shorter nights.` },
  ],
  body: (h) => `
<h2>The Northeast Kingdom and the border</h2>
<p>The three northeastern counties of Vermont, the Northeast Kingdom, are forest, lakes and small farms with very few lights. Newport, on Lake Memphremagog, which stretches north across the Quebec border, has one of the best northern horizons of the state: the lake runs straight toward the oval. Its threshold of Kp ${h.kp(np.need)} is the lowest of the Vermont towns compared here, together with St. Albans. On a G2 night, a lakeshore or a hilltop in the Kingdom gives as good a chance as anywhere in New England south of Maine's north woods.</p>
${h.mini('kpNeed', { place: 'vermont/newport', region: 'vermont' })}
<h2>Lake Champlain</h2>
<p>West of the Green Mountains, the Champlain valley is broader and flatter, with the lake running north into Quebec. From the islands of Grand Isle County or the shore north of Burlington, the view up the lake offers a dark northern horizon over water, while Burlington's lights stay to the south. Across the lake, the Adirondacks rise on the New York side; the ${h.a('region:new-york', 'New York page')} covers Plattsburgh, which shares the same valley.</p>
<h2>A small state, a narrow range</h2>
<p>From St. Albans to Rutland the thresholds differ by only about ${h.num(ru.need! - sa.need!, 1)} Kp, so in Vermont the storm level matters less than where you stand. Two towns a few miles apart can give very different nights: one on a ridge with a northern view, the other in a hollow where the hills rise twenty degrees above the horizon. Before a storm night, pick a spot in daylight, check that the northern skyline is low, and note how to reach it in snow.</p>
<h2>Hills, valleys and clouds</h2>
<p>The Green Mountains split the state, and their valleys close much of the horizon. Towns like Montpelier and Rutland sit in such valleys, and on a storm night the drive up to an open ridge, a high pasture or a ski area parking lot with a northern view makes the difference. Clouds are frequent, as everywhere in the interior Northeast: Burlington's cloud amount averages ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Autumn, with ${h.num(m[9].hours, 1)} hours of full darkness on October 15, is the season that balances darkness and clear skies best. The ${h.a('region:new-hampshire', 'New Hampshire page')} and the ${h.a('city:canada/montreal', 'Montreal page')} cover the neighbors.</p>`,
  related: ['region:new-york', 'region:new-hampshire', 'region:maine', 'city:canada/montreal', 'best-time-northern-lights'],
});
