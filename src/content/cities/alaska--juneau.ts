import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('alaska', 'juneau');
const m = K.monthly('alaska', 'juneau');
const ce = K.cloudExtremes('alaska', 'juneau');
const best = K.bestMonths('alaska', 'juneau', 3);

export default defineCity({
  region: 'alaska',
  slug: 'juneau',
  title: 'Northern Lights Juneau 2026: Kp Needed and Tonight’s Clouds',
  description: `Northern lights in Juneau in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and why the clouds decide more often than the aurora.`,
  intro: 'Juneau is magnetically farther north than its map position suggests; its rainforest climate is the real hurdle.',
  resume: `Juneau needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, almost the same as Anchorage, even though it lies about three degrees of latitude farther south: in the AACGM model Alaska's capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, because the magnetic pole lies in northern Canada and the panhandle tucks toward it. On a geomagnetic basis, then, an ordinary active night can bring aurora. The difficulty is the weather. Juneau lies in a temperate rainforest, and the NASA POWER cloud amount never falls below ${K.num(ce.clearest.cloud, 0)}% in any month, peaking at ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Full darkness lasts ${K.num(m[11].hours, 1)} hours in mid-December and disappears in summer. The months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}, when a cold, dry spell can open the sky.`,
  faqs: [
    { q: 'Can you see the northern lights in Juneau, Alaska?', a: `Yes, when the sky clears. Juneau needs only about Kp ${K.kp(f.need)}, below storm level, so the aurora is often present above the clouds. The limiting factor is the cloud cover of the panhandle: in NASA POWER averages it stays above ${K.num(ce.clearest.cloud, 0)}% in every month. A clear, cold night with a modest Kp is a real chance.` },
    { q: 'When is the best time of year for aurora in Juneau?', a: `By clear dark hours, ${K.listOf(best.map((b) => b.name))}, when long nights and the occasional cold, dry spell coincide. From ${K.noDarkMonths('alaska', 'juneau')[0]} to ${K.noDarkMonths('alaska', 'juneau').slice(-1)[0]} there is no astronomical darkness at all, so summer cruise visitors rarely see the aurora even when it is active overhead.` },
    { q: 'Where should I look for the aurora from Juneau?', a: 'North, over the Gastineau Channel and the Mendenhall valley, from a spot where the steep mountains do not block the horizon. The surrounding peaks rise high and hide a low aurora from much of downtown. Beaches and roads along the shore northwest of town give wider views of the northern sky.' },
  ],
  body: (h) => `
<h2>Magnetically north, meteorologically wet</h2>
<p>Look at a map and Juneau seems far from the aurora's heartland, at the bottom of the panhandle, closer to Seattle than to Fairbanks by road distance. The magnetic picture is different. The magnetic pole sits in the Canadian Arctic, and Southeast Alaska bends toward it, which gives Juneau a magnetic latitude of ${h.num(f.mlat, 1)} degrees. On the Kp scale it needs ${h.kp(f.need)}, practically the same as Anchorage. If Juneau had Fairbanks' skies, it would be a first-rate place to watch.</p>
<p>It does not. Moist Pacific air rises against the Coast Mountains behind the city, and the rain and low cloud that make the Tongass a rainforest also make clear nights the exception. In the NASA POWER averages the clearest month, ${ce.clearest.name}, is still at ${h.num(ce.clearest.cloud, 0)}% cloud amount. That is why the cloud line of the tool matters more here than the Kp line: when the National Weather Service forecasts a clearing, check the Kp, and if it is anywhere near ${h.kp(f.need)}, go out.</p>
<p>${h.mini('darkMonth', { place: 'alaska/juneau', month: 2 })}</p>
<h2>Steep horizons</h2>
<p>Juneau's other constraint is its relief. Mount Juneau and Mount Roberts rise straight above downtown, and the channel is narrow, so the low northern sky where a moderate aurora sits is hidden from many streets. The Mendenhall valley opens more sky, and the shoreline north toward Auke Bay faces the water. When the Kp climbs well above the threshold, the display rises higher and the mountains matter less. Winter brings another pattern worth knowing: after a front passes, cold air from the Interior sometimes spills through the mountain passes and clears the sky for a night or two, often with strong wind. Those outflow nights are among the clearest of the season, and they are the ones to check the Kp forecast for. In the hour strip of the tool, a run of hours under ${h.METHOD.cloudClear}% cloud is rare enough in Juneau to be worth acting on even when the answer is only maybe. For the rest of the state see the ${h.a('region:alaska', 'Alaska page')}, and for a comparison with the dry Interior the ${h.a('city:alaska/fairbanks', 'Fairbanks page')}.</p>`,
  related: ['region:alaska', 'city:alaska/anchorage', 'city:canada/whitehorse', 'city:washington/seattle', 'aurora-forecast'],
});
