import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'edmonton');
const m = K.monthly('canada', 'edmonton');
const nd = K.noDarkMonths('canada', 'edmonton');
const ce = K.cloudExtremes('canada', 'edmonton');
const best = K.bestMonths('canada', 'edmonton', 3);
const ca = K.facts('canada', 'calgary');

export default defineCity({
  region: 'canada',
  slug: 'edmonton',
  title: 'Northern Lights Edmonton 2026: Kp Needed and Tonight’s Sky',
  description: `Northern lights in Edmonton in 2026: tonight's yes, maybe or no, why Kp ${K.kp(f.need)} is enough at ${K.num(f.mlat, 1)}° magnetic latitude, and when the summer nights stay too light.`,
  intro: 'Edmonton is a city of a million people that does not need a geomagnetic storm to see the aurora, only a clear, dark night away from its own glow.',
  resume: `Edmonton needs a planetary Kp of about ${K.kp(f.need)} for the northern lights, ${f.g ? `a ${K.gName(f.g)} storm` : 'below the G1 storm level'} on the NOAA scale, which makes it one of the easiest large cities in the world for the aurora. At ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, it sits ${K.num(f.mlat - ca.mlat, 1)} degrees closer to the oval than Calgary, and the oval reaches overhead at about Kp ${K.kp(f.overhead)}. The catch is the calendar. From ${nd[0]} to ${nd[nd.length - 1]} the sun never sinks 18 degrees below the horizon, and the first dark hours of August are short, ${K.num(m[7].hours, 1)} on the 15th. December gives ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. NASA POWER cloud amounts peak in ${ce.cloudiest.name} at ${K.num(ce.cloudiest.cloud, 0)}%, and ${K.listOf(best.map((b) => b.name))} give the most clear dark hours. The tool opens on Edmonton for the whole Canada section.`,
  faqs: [
    { q: 'How often can you see the northern lights in Edmonton?', a: `Fairly often for a big city, because Edmonton needs only about Kp ${K.kp(f.need)}, a level reached on many unsettled nights without any storm. The limits are cloud, the moon and the summer gap, when there is no full darkness from ${nd[0]} to ${nd[nd.length - 1]}. A clear winter night outside the city lights gives a real chance.` },
    { q: 'Where can you watch the aurora near Edmonton?', a: `Anywhere north or east of the metro area with a flat horizon and no streetlights: the farmland of Sturgeon County and the lakes beyond it are typical. The river valley parks in the city are darker than the streets but still sit in the glow. At Kp ${K.kp(f.need)}, the aurora rises high enough that a perfect horizon is not essential.` },
    { q: 'Is Edmonton better than Calgary for the aurora?', a: `By the numbers, yes. Edmonton needs about Kp ${K.kp(f.need)} and Calgary about Kp ${K.kp(ca.need)}, a difference of ${K.num(ca.need! - f.need!, 1)} Kp, because Edmonton lies ${K.num(f.mlat - ca.mlat, 1)} degrees farther north in magnetic latitude. Calgary's Chinook clearings can even things out on a given night, so check both in the tool.` },
  ],
  body: (h) => `
<h2>Aurora without a storm in a million-person city</h2>
<p>Few cities of Edmonton's size sit this close to the auroral oval. Its threshold of about Kp ${h.kp(f.need)} is lower than what Calgary, Winnipeg or Minneapolis needs, and it is close to the Kp that the SWPC forecast shows on an unremarkable night. The practical question in Edmonton is therefore rarely whether the activity is high enough. It is whether the sky above you is dark: the metro area throws a wide dome of light that hides faint aurora inside the city, while the same display can be obvious from a gravel road a short drive north.</p>
<p>That threshold also means storms behave differently here. A G1 or G2 night does not just add a glow on the horizon; it can carry the oval past the city to the south, so the light fills the northern half of the sky and sometimes the zenith. In the site's model the oval edge is already overhead at Kp ${h.kp(f.overhead)}, so every step above that moves the brightest band toward the south.</p>
<p>${h.mini('darkMonth', { place: 'canada/edmonton', month: 9 })}</p>
<h2>Parkland horizons and the North Saskatchewan</h2>
<p>The North Saskatchewan River cuts a deep, wooded valley through the middle of the city, and the land around it is aspen parkland and cropland, gently rolling, with few obstacles to the north. That makes the countryside around Edmonton easy aurora country. Farther west, Jasper National Park, which Parks Canada manages as one of the largest dark sky preserves in the world, offers truly dark skies, at the price of mountain walls that can hide the lowest part of the northern sky.</p>
<h2>The short season and the long one</h2>
<p>Edmonton loses full darkness for ${nd.length} months around the solstice. In practice the season opens in mid-August, when the dark window is ${h.num(m[7].hours, 1)} hours, and widens to ${h.num(m[8].hours, 1)} hours by mid-September, with milder weather than winter and moderate cloud. ${h.cloudExtremes('canada', 'edmonton').cloudiest.name} is the greyest month, and then midwinter cold brings clear spells and the longest nights. Because the activity threshold is so often met, the moon becomes a bigger factor in Edmonton than in cities that wait for storms: a full moon high in a winter sky washes out the faint arcs that would otherwise be the usual show, so the week around new moon deserves the most attention. The ${h.a('city:canada/calgary', 'Calgary page')} covers the south of the province and the ${h.a('region:canada', 'Canada page')} the rest of the country.</p>`,
  related: ['region:canada', 'city:canada/calgary', 'city:canada/yellowknife', 'city:canada/winnipeg', 'aurora-forecast'],
  extraSources: [{ name: 'Parks Canada, Jasper National Park dark sky', url: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/ciel-sky' }],
});
