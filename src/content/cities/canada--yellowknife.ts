import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'yellowknife');
const m = K.monthly('canada', 'yellowknife');
const nd = K.noDarkMonths('canada', 'yellowknife');
const ce = K.cloudExtremes('canada', 'yellowknife');
const best = K.bestMonths('canada', 'yellowknife', 3);
const fb = K.facts('alaska', 'fairbanks');
const wh = K.facts('canada', 'whitehorse');

export default defineCity({
  region: 'canada',
  slug: 'yellowknife',
  title: 'Northern Lights Yellowknife 2026: Tonight, Dark Season',
  description: `Northern lights in Yellowknife in 2026: tonight's yes, maybe or no, why ${K.num(f.mlat, 1)}° magnetic latitude puts the oval overhead, and the ${nd.length} months with no full dark.`,
  intro: 'Yellowknife sits so far into the auroral zone that a big storm can push the brightest light south of town.',
  resume: `Yellowknife needs ${K.needText(f)}. At ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, the capital of the Northwest Territories lies poleward of the oval's quiet position, which this site's method places at ${K.num(K.METHOD.ovalEdgeKp0, 0)} degrees, so on an ordinary night the band of light crosses its sky rather than hanging on the horizon. What takes nights away is the sun and the weather. From ${nd[0]} to ${nd[nd.length - 1]} the sun never drops 18 degrees below the horizon, so there is no full darkness at all; by mid-December the dark window runs ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. NASA POWER cloud amounts swing from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Put together, the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool checks the SWPC forecast and MET Norway cloud cover for tonight, hour by hour.`,
  faqs: [
    { q: 'Do you need a geomagnetic storm to see the aurora in Yellowknife?', a: `No. Yellowknife needs ${K.needText(f)}, because at ${K.num(f.mlat, 1)} degrees magnetic latitude it sits inside the auroral zone. A clear sky during the dark hours is the real requirement. A strong storm changes the shape of the show more than the odds, sometimes moving the brightest arcs into the southern sky.` },
    { q: 'Why is October often disappointing in Yellowknife?', a: `Because of cloud. October has the highest NASA POWER cloud amount of the year in Yellowknife, about ${K.num(ce.cloudiest.cloud, 0)}%, even though the nights already offer ${K.num(m[9].hours, 1)} hours of full darkness on the 15th. ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%, is the clearest month, which is why late winter trips are so common.` },
    { q: 'Can you see the northern lights in Yellowknife in summer?', a: `Not in a sky dark enough for this site's rule. From ${nd[0]} to ${nd[nd.length - 1]} the sun stays within 18 degrees of the horizon all night. Faint aurora can still show in deep twilight near the start and end of that stretch, but the first fully dark hours return in late August, with ${K.num(m[8].hours, 1)} hours by September 15.` },
  ],
  body: (h) => `
<h2>North of the quiet oval</h2>
<p>Most towns on this site look north for the aurora. Yellowknife often looks up, and on some nights south. Its magnetic latitude is ${h.num(f.mlat - fb.mlat, 1)} degrees higher than that of Fairbanks and ${h.num(f.mlat - wh.mlat, 1)} degrees higher than Whitehorse, which places the city on the poleward side of where the oval rests when the solar wind is calm. When activity picks up, the oval widens and slides toward the equator, so the most intense curtains may end up over the forest to the south while the zenith above town shows softer, pulsing patches. That is the opposite of what happens in Edmonton or Winnipeg, where a stronger storm always means a better view.</p>
<p>For the tool this means the answer is driven by the hours, not the Kp. A yes in Yellowknife can arrive on the quietest Kp of the week if the sky is clear between December dusk and dawn, and a maybe on a G3 night only reflects cloud or the moon.</p>
<h2>Great Slave Lake and the boreal rock</h2>
<p>The city stands on the north shore of Great Slave Lake, on the bare granite of the Canadian Shield, with lakes and black spruce on every side. Outside the small urban core, light pollution drops away within minutes. The flat terrain helps, since nothing like a mountain range cuts into the sky, and the frozen lakes in winter give open views in every direction. Highway 4, the Ingraham Trail, runs east from the city past a string of lakes whose shores make easy, unlit foregrounds, and a display bright enough to cast shadows on snow needs no camera to be convincing. Cold is the cost: midwinter nights here are routinely far below zero Fahrenheit, and batteries and fingers fail faster than the aurora fades.</p>
<p>${h.mini('darkMonth', { place: 'canada/yellowknife', month: 2 })}</p>
<h2>Choosing between late summer and late winter</h2>
<p>Two seasons compete. Late August and September bring the first dark hours after the midnight sun, mild nights and the reflections of aurora on open water, with ${h.num(m[8].hours, 1)} dark hours by mid-September. February and March are colder but drier, with ${h.num(m[2].hours, 1)} hours of full darkness on March 15 and the clearest skies of the year. The SWPC tendency toward stronger activity near the equinoxes favors both ends, and at this latitude even a modest equinox disturbance can fill most of the sky. For the territory next door, see the ${h.a('city:canada/whitehorse', 'Whitehorse page')}; for the rest of the country, the ${h.a('region:canada', 'Canada page')}.</p>`,
  related: ['region:canada', 'city:canada/whitehorse', 'city:canada/edmonton', 'city:alaska/fairbanks', 'best-time-northern-lights'],
});
