import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const yk = K.facts('canada', 'yellowknife');
const wh = K.facts('canada', 'whitehorse');
const ed = K.facts('canada', 'edmonton');
const ca = K.facts('canada', 'calgary');
const wi = K.facts('canada', 'winnipeg');
const va = K.facts('canada', 'vancouver');
const to = K.facts('canada', 'toronto');
const mo = K.facts('canada', 'montreal');
const ha = K.facts('canada', 'halifax');
const edm = K.monthly('canada', 'edmonton');
const ednd = K.noDarkMonths('canada', 'edmonton');
const ykm = K.monthly('canada', 'yellowknife');
const ce = K.cloudExtremes('canada', 'edmonton');
const best = K.bestMonths('canada', 'edmonton', 3);

export default defineRegion({
  slug: 'canada',
  title: 'Northern Lights Canada 2026: Kp Needed From Coast to Coast',
  description: `Northern lights in Canada in 2026: tonight's yes, maybe or no by city, from no storm in Yellowknife to Kp ${K.kp(to.need)} in Toronto, with MET Norway clouds and dark hours.`,
  intro: 'Canada holds more of the auroral oval than any other country, yet most Canadians live along its southern edge, where a storm is still needed.',
  resume: `How big a storm Canada needs depends almost entirely on which part of the country you stand in. Yellowknife, at ${K.num(yk.mlat, 1)} degrees magnetic latitude in the AACGM model, needs ${K.needText(yk)}; Whitehorse needs about Kp ${K.kp(wh.need)} and Edmonton about Kp ${K.kp(ed.need)}, both below storm level. The prairie capitals stay close to that: Winnipeg needs about Kp ${K.kp(wi.need)} and Calgary about Kp ${K.kp(ca.need)}. Then the thresholds jump for the cities where most people live: Vancouver needs ${K.needText(va)}, Montreal about Kp ${K.kp(mo.need)}, Toronto ${K.needText(to)} and Halifax about Kp ${K.kp(ha.need)}. In Edmonton, where the tool opens, the sky never reaches full darkness from ${ednd[0]} to ${ednd[ednd.length - 1]}, while mid-December brings ${K.num(edm[11].hours, 1)} dark hours. NASA POWER averages there run from ${K.num(ce.clearest.cloud, 0)}% cloud amount in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, so ${K.listOf(best.map((b) => b.name))} give the most clear dark hours. Type any Canadian town: clouds come from the MET Norway forecast.`,
  faqs: [
    { q: 'Where in Canada can you see the northern lights without a storm?', a: `Across the North and much of the western prairie. Yellowknife sits beneath the oval on quiet nights, Whitehorse needs about Kp ${K.kp(wh.need)} and Edmonton about Kp ${K.kp(ed.need)}, so an ordinary active evening is enough if the sky is clear and dark. East of Manitoba the thresholds rise quickly toward storm level.` },
    { q: 'What Kp does southern Canada need for the aurora?', a: `Roughly Kp ${K.kp(va.need)} in Vancouver, Kp ${K.kp(mo.need)} in Montreal and Kp ${K.kp(to.need)} in Toronto, which means a ${K.gName(to.g)} storm for the Great Lakes cities. NOAA counts about ${K.P.facts.gScale[to.g - 1].perCycle} of those per solar cycle, and a clear, dark spot north of the city lights is what turns one into a sighting.` },
    { q: 'When is the northern lights season in Canada?', a: `It depends on latitude. In Yellowknife full darkness lasts ${K.num(ykm[11].hours, 1)} hours in mid-December but disappears entirely from ${K.noDarkMonths('canada', 'yellowknife')[0]} to ${K.noDarkMonths('canada', 'yellowknife').slice(-1)[0]}. Toronto and Montreal keep some darkness all year, so a summer storm can still show there, although the short nights leave only a few hours.` },
    { q: 'Is there a dark sky preserve in Canada for aurora watching?', a: `Yes. Jasper National Park in Alberta is a dark sky preserve, which Parks Canada describes as the second largest in the world. At about Kp ${K.kp(ed.need)} to Kp ${K.kp(ca.need)} for the Alberta cities, a modest active night can show there when the mountain valleys open a view north.` },
  ],
  body: (h) => `
<h2>A country cut in two by the oval</h2>
<p>Draw the auroral oval on a map of North America on a quiet night and it crosses Canada diagonally, from the Yukon over Great Slave Lake to Hudson Bay and northern Quebec. Everything north of that line sees the aurora on clear nights almost by default; everything south of it waits for the oval to swell. Yellowknife is on the near side of that line, ${h.num(yk.mlat - ed.mlat, 1)} degrees of magnetic latitude north of Edmonton. Toronto is on the far side, ${h.num(ed.mlat - to.mlat, 1)} degrees south of Edmonton, which is why the same quiet night can be a vivid show over the Territories and nothing at all over Lake Ontario.</p>
<p>The geography of the magnetic pole adds a twist. The pole sits over the Canadian Arctic, north of the prairies, so the oval reaches lower over Manitoba and Alberta than over British Columbia. Vancouver lies south of Calgary by only ${h.num(h.townRef('canada', 'calgary').lat - h.townRef('canada', 'vancouver').lat, 1)} degrees on the map, yet needs about ${h.num(va.need! - ca.need!, 1)} Kp more.</p>
<p>${h.mini('kpNeed', { place: 'canada/winnipeg', region: 'canada' })}</p>
<h2>Prairie skies against Great Lakes cloud</h2>
<p>The interior of the continent has drier winter air than the coasts. Arctic high pressure settles over Saskatchewan and Manitoba for days at a time and leaves long, cold, clear nights, which is exactly when the aurora is easiest to catch. The Great Lakes and the St. Lawrence corridor have the opposite problem: lake effect cloud in early winter and grey Atlantic systems later, so Toronto and Montreal often lose a storm to overcast even when Kp gets high enough. On the Pacific side, Vancouver faces winter fronts and a wall of mountains to the north. For the prairie case, the ${h.a('city:canada/winnipeg', 'Winnipeg page')} explains it in detail; for the east, see ${h.a('city:canada/ottawa', 'Ottawa')}.</p>
<h2>Parks with a dark horizon</h2>
<p>Getting away from the light dome of a large city matters more than a few degrees of latitude when you are close to your threshold. Parks Canada manages Jasper National Park in the Rockies as a dark sky preserve and calls it the second largest in the world. From Alberta, a clear night in the park at Kp ${h.kp(ed.need)} or more has a real chance, though valley walls can hide the lowest part of the northern sky, so lake shores and wide valley floors work best. Farther north, the ${h.a('city:canada/yellowknife', 'Yellowknife page')} covers the city that sits under the oval itself, and the ${h.a('region:alaska', 'Alaska page')} the same belt across the border.</p>`,
  related: ['city:canada/yellowknife', 'city:canada/edmonton', 'city:canada/winnipeg', 'city:canada/toronto', 'region:alaska', 'aurora-map'],
  extraSources: [{ name: 'Parks Canada, Jasper National Park dark sky', url: 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/ciel-sky' }],
});
