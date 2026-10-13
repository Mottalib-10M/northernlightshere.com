import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'ottawa');
const m = K.monthly('canada', 'ottawa');
const ce = K.cloudExtremes('canada', 'ottawa');
const best = K.bestMonths('canada', 'ottawa', 3);
const mo = K.facts('canada', 'montreal');
const to = K.facts('canada', 'toronto');

export default defineCity({
  region: 'canada',
  slug: 'ottawa',
  title: 'Northern Lights Ottawa 2026: Kp Needed and Gatineau Hills',
  description: `Northern lights in Ottawa in 2026: tonight's yes, maybe or no, the Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, and darker ground across the river.`,
  intro: 'Ottawa has the lowest storm threshold of the big cities along the St. Lawrence corridor, and the Gatineau Hills begin just across the river.',
  resume: `Ottawa needs ${K.needText(f)}, to see the northern lights. The capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, a touch higher than Montreal, which needs about Kp ${K.kp(mo.need)}, and clearly higher than Toronto, at about Kp ${K.kp(to.need)}. In this site's model the threshold and the Kp that brings the oval edge overhead are the same in Ottawa, about ${K.kp(f.overhead)}, so a storm that is visible at all tends to fill a large part of the sky. Full darkness never disappears: June 15 still has ${K.num(m[5].hours, 1)} hours and December 15 has ${K.num(m[11].hours, 1)}, from ${m[11].start} to ${m[11].end}. NASA POWER cloud amounts range from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool checks tonight's SWPC Kp and MET Norway cloud cover for Ottawa, hour by hour.`,
  faqs: [
    { q: 'What Kp is needed for the northern lights in Ottawa?', a: `About Kp ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. Below that level the aurora usually stays under Ottawa's northern horizon. When the forecast reaches it and the sky is clear, a dark site outside the city gives a fair chance, and the display can rise high quickly because the oval edge is close to overhead at the same level.` },
    { q: 'Is Gatineau Park good for seeing the aurora from Ottawa?', a: `It is the nearest large area of dark land. The park, run by the National Capital Commission on the Quebec side of the Ottawa River, sits north of the city, so its lookouts put the urban glow behind you. On a storm night of about Kp ${K.kp(f.need)} or more, an open spot facing north there beats any park inside the city.` },
    { q: 'Which month is best for the aurora around Ottawa?', a: `${best[0].name}, by clear dark hours: Ottawa has ${K.num(m[best[0].month - 1].hours, 1)} hours of full darkness on the 15th and the lowest cloud amount of the dark season, about ${K.num(m[best[0].month - 1].cloud, 0)}%. Late winter follows, when cold, dry air masses clear the sky over the valley, though the nights then are far colder and often well below freezing.` },
  ],
  body: (h) => `
<h2>Across the river, into the hills</h2>
<p>Rough, thinly lit country starts at Ottawa's doorstep. The Ottawa River marks the border with Quebec, and on the far bank the land rises into the Gatineau Hills, the southern edge of the Canadian Shield, mostly forest. Gatineau Park, the conservation park of the National Capital Region, covers more than 361 square kilometers of those hills, and one of its sectors is reached directly from downtown Ottawa and Gatineau. For an aurora watcher that means the urban glow can be put to the south within a short drive, with ridges and lakes opening a view north. On the Ontario side, the farmland to the west and south is flatter but closer to the city light.</p>
${h.mini('kpNeed', { place: 'canada/ottawa', region: 'canada' })}
<h2>A threshold that arrives all at once</h2>
<p>Many cities at the edge of the aurora have a long gap between the first faint glow on the horizon and a display overhead. Ottawa does not. Its magnetic latitude puts it in the narrow band where both thresholds meet, about Kp ${h.kp(f.need)}, so the difference between a dull night and a sky full of color can be one step on the Kp scale. That makes the three hour blocks of the SWPC forecast especially relevant here: a block at or above the threshold, during dark hours and under clear sky, is the moment to go. Montreal, ${h.num(f.mlat - mo.mlat, 1)} degrees lower in magnetic latitude, needs about ${h.num(mo.need! - f.need!, 1)} Kp more; Toronto needs ${h.num(to.need! - f.need!, 1)} Kp more.</p>
<h2>Cold clear spells and grey Decembers</h2>
<p>The Ottawa Valley has a continental climate with real winters. ${h.cloudExtremes('canada', 'ottawa').cloudiest.name} is the greyest month, at ${h.num(ce.cloudiest.cloud, 0)}% cloud amount, while late winter brings stretches of high pressure and very cold, clear nights. Early autumn is the comfortable choice, with ${h.num(m[8].hours, 1)} dark hours on September 15. Summer still gives a few dark hours around midnight, ${h.num(m[6].hours, 1)} on July 15, enough for a strong storm to register. Whatever the season, the twin glow of Ottawa and Gatineau lights low cloud from below, so a forecast of thin high cloud is worse here than in open country: it turns into a bright orange lid over the valley. Watch the hourly cloud strip in the tool, not only the Kp. For the city downstream, see the ${h.a('city:canada/montreal', 'Montreal page')}; for the rest of the country, the ${h.a('region:canada', 'Canada page')}.</p>`,
  related: ['region:canada', 'city:canada/montreal', 'city:canada/toronto', 'region:new-york', 'kp-index'],
  extraSources: [{ name: 'National Capital Commission, Gatineau Park', url: 'https://ncc-ccn.gc.ca/places/gatineau-park' }],
});
