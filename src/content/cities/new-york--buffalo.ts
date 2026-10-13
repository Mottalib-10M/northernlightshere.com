import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('new-york', 'buffalo');
const m = K.monthly('new-york', 'buffalo');
const ce = K.cloudExtremes('new-york', 'buffalo');
const best = K.bestMonths('new-york', 'buffalo', 3);
const to = K.facts('canada', 'toronto');

export default defineCity({
  region: 'new-york',
  slug: 'buffalo',
  title: 'Northern Lights Buffalo 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Buffalo in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, lake-effect clouds and the autumn window.`,
  intro: 'Buffalo looks north over Lake Ontario’s basin toward Toronto; its real opponent on storm nights is Lake Erie’s cloud.',
  resume: `From Buffalo the northern lights need a planetary Kp of about ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, close to Toronto across the lake at ${K.num(to.mlat, 1)}, and the aurora would reach overhead around Kp ${K.kp(f.overhead)}. Buffalo's geography gives it a northern view over water toward Lake Ontario, but its climate fights back: the city sits at the downwind end of Lake Erie, and the NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, one of the cloudiest winters among the cities on this site. ${ce.clearest.name} is the clearest month, at ${K.num(ce.clearest.cloud, 0)}%. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first, so the storms that matter most for Buffalo are those of late summer and autumn.`,
  faqs: [
    { q: 'Can you see the northern lights in Buffalo?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or stronger, when the sky is clear. The aurora appears low in the north. Lake-effect clouds from Lake Erie make winter chances poor, so a storm between August and October has the best odds of meeting a clear night over western New York.` },
    { q: 'Where is a good spot near Buffalo to watch the aurora?', a: 'The Lake Ontario shore north of the city, from the Niagara River mouth east along the lake plain, faces open water to the north, with Toronto’s glow on the far horizon to the northwest. Farmland in Niagara and Orleans counties offers darker skies with flat horizons.' },
    { q: 'Why is Buffalo so cloudy in winter for aurora watching?', a: `Because cold air crossing the open water of Lake Erie picks up heat and moisture and builds lake-effect clouds and snow downwind, over Buffalo and the snowbelts south of it. NASA POWER puts the city's cloud amount at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Once the lake freezes over in a cold winter, the effect weakens.` },
  ],
  body: (h) => `
<h2>Between two lakes</h2>
<p>Buffalo sits at the eastern tip of Lake Erie, where the Niagara River carries its water north to Lake Ontario. For the aurora, the two lakes play opposite roles. Lake Ontario, to the north, offers what a watcher wants: a flat, dark horizon over water in the direction of the oval. Lake Erie, to the west and southwest, is the source of the clouds. In late autumn and early winter, when the lake is still warm and the air above it cold, lake-effect bands can cover the city for days. That is why ${h.cloudExtremes('new-york', 'buffalo').cloudiest.name} reaches ${h.num(ce.cloudiest.cloud, 0)}% cloud amount in the NASA POWER averages, and why the months with the most clear dark hours are those before the snow season.</p>
<p>${h.mini('kpNeed', { place: 'new-york/buffalo', region: 'new-york' })}</p>
<h2>Facing Ontario</h2>
<p>From the south shore of Lake Ontario, the view north crosses about 50 km of water toward the Canadian shore, where the lights of Toronto and its suburbs glow on the horizon to the northwest. A storm aurora sits above that glow; picking a spot that puts the city lights off to one side, toward the east along the lake plain, gives a darker northern sky. The lake plain is farmland and orchards, with few lights between the shore and the Erie Canal towns.</p>
<h2>Niagara's own light</h2>
<p>The falls are lit at night and the cities around them glow; along the Niagara River the northern sky is brighter than the farmland a few miles east. Moving along the lake plain toward Olcott or the Lakeside area puts that light to the west and leaves a darker horizon to the north.</p>
<h2>A storm-night routine</h2>
<p>Buffalo's threshold, Kp ${h.kp(f.need)}, means G2 to G3 storms. When SWPC issues a watch, the first thing to check here is the cloud forecast, not the Kp: the hour strip of the tool shows the National Weather Service sky cover for each hour of the night. If the lake bands sit over the city but the forecast clears the north, the drive is short. On September 15, full darkness lasts ${h.num(m[8].hours, 1)} hours. For the rest of the state, see the ${h.a('region:new-york', 'New York page')}, and across the water the ${h.a('city:canada/toronto', 'Toronto page')}.</p>`,
  related: ['region:new-york', 'city:canada/toronto', 'city:ohio/cleveland', 'city:pennsylvania/pittsburgh', 'aurora-forecast'],
});
