import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'toronto');
const m = K.monthly('canada', 'toronto');
const ce = K.cloudExtremes('canada', 'toronto');
const best = K.bestMonths('canada', 'toronto', 3);
const ot = K.facts('canada', 'ottawa');
const wi = K.facts('canada', 'winnipeg');

export default defineCity({
  region: 'canada',
  slug: 'toronto',
  title: 'Northern Lights Toronto 2026: Storm Level and Where to Go',
  description: `Northern lights in Toronto in 2026: tonight's yes, maybe or no, the Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, and why the lake faces the wrong way.`,
  intro: 'Toronto needs a real geomagnetic storm, a clear sky and a drive north, since its lakeshore looks south over Lake Ontario.',
  resume: `Toronto needs ${K.needText(f)}, before the northern lights clear its northern horizon. The city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(wi.mlat - f.mlat, 1)} degrees below Winnipeg, and only around Kp ${K.kp(f.overhead)} does the oval edge itself reach overhead in this site's model. Unlike the western cities, Toronto keeps some full darkness every month of the year, ${K.num(m[5].hours, 1)} hours even on June 15, so a summer storm is not wasted; December 15 offers ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. Clouds are the main enemy: the NASA POWER cloud amount climbs to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} and is lowest in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%. That makes ${K.listOf(best.map((b) => b.name))} the months with the most clear dark hours, an autumn season more than a winter one. The tool checks tonight's SWPC Kp and MET Norway cloud cover for Toronto.`,
  faqs: [
    { q: 'Can you see the northern lights from Toronto?', a: `Yes, during storms of about Kp ${K.kp(f.need)} or more, a ${K.gName(f.g)} level, and from somewhere darker than the city itself. NOAA counts about ${K.P.facts.gScale[f.g - 1].perCycle} storms of that level per solar cycle, more near solar maximum. Toronto's glow hides faint aurora, so the best views come from the countryside to the north.` },
    { q: 'Where should you go from Toronto to see the aurora?', a: `North, not south. The lakeshore faces Lake Ontario and the American shore, so the aurora sits behind the city. Farm country beyond the Oak Ridges Moraine, the shores of Lake Simcoe or the lakes of Muskoka put the glow behind you. At Kp ${K.kp(f.need)} the display is often low, so an open northern horizon is essential.` },
    { q: 'Why is September good for the aurora in Toronto?', a: `It combines the clearest skies of the dark season with ${K.num(m[8].hours, 1)} hours of full darkness on September 15, and the equinox brings a SWPC noted tendency toward stronger storms. In Toronto the cloud amount in September averages about ${K.num(m[8].cloud, 0)}%, against ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, which is why ${best[0].name} ranks first.` },
  ],
  body: (h) => `
<h2>A lakeshore that faces the wrong way</h2>
<p>Toronto's best open horizons are on the water, and the water is to the south. From the Scarborough Bluffs or the Toronto Islands, the view across Lake Ontario is wide and dark, but it points away from the aurora. The northern sky above the city is filled by the glow of the largest urban area in Canada, which at a threshold of Kp ${h.kp(f.need)} is the worst possible place for a display that usually starts low. So the first step on a storm night is a drive inland, beyond the edge of the suburbs, toward the farmland and lakes where a northern horizon opens without streetlights.</p>
<p>What you find there on a typical qualifying night is modest: a grey or faintly green glow along the northern skyline that a phone camera turns into an obvious band, sometimes topped by red when the storm is strong. Only well above Kp ${h.kp(f.overhead)} do rays climb high enough to be seen easily from inside the suburbs, as happened during the exceptional storms of 2024.</p>
<p>${h.mini('darkMonth', { place: 'canada/toronto', month: 10 })}</p>
<h2>Why the threshold is lower than its latitude suggests</h2>
<p>Toronto lies at ${h.num(h.townRef('canada', 'toronto').lat, 1)} degrees north, farther south than Seattle, but the magnetic pole sits well toward the eastern half of the Canadian Arctic, so magnetic latitudes run high in the Great Lakes region. The result is that Toronto needs less than many American cities at the same map latitude. Ottawa, ${h.num(ot.mlat - f.mlat, 1)} degrees higher in magnetic latitude, needs about ${h.num(f.need! - ot.need!, 1)} Kp less, which on a borderline night can be the difference between a faint glow and a clear arc. The gap between the Kp needed and the Kp that brings the oval overhead is small here, ${h.num(f.overhead! - f.need!, 1)} Kp, so a storm that just reaches visibility can grow into an overhead display with little extra push.</p>
<h2>Lake cloud and the autumn window</h2>
<p>In late autumn and winter, cold air crossing the open Great Lakes picks up moisture and turns it into low cloud and snow squalls, mostly downwind of Lake Huron and Georgian Bay. The NASA POWER averages fit that picture: ${h.cloudExtremes('canada', 'toronto').cloudiest.name} is the cloudiest month in Toronto, and the late summer and early autumn months beat midwinter here. A summer storm can still be seen, with ${h.num(m[6].hours, 1)} dark hours on July 15. For the capital to the east see the ${h.a('city:canada/ottawa', 'Ottawa page')}; for the state across the lake, the ${h.a('region:new-york', 'New York page')}.</p>`,
  related: ['region:canada', 'city:canada/ottawa', 'city:canada/montreal', 'region:new-york', 'geomagnetic-storm-scale'],
});
