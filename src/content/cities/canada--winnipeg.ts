import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'winnipeg');
const m = K.monthly('canada', 'winnipeg');
const nd = K.noDarkMonths('canada', 'winnipeg');
const ce = K.cloudExtremes('canada', 'winnipeg');
const best = K.bestMonths('canada', 'winnipeg', 3);
const fa = K.facts('north-dakota', 'fargo');
const to = K.facts('canada', 'toronto');

export default defineCity({
  region: 'canada',
  slug: 'winnipeg',
  title: 'Northern Lights Winnipeg 2026: Kp Needed, Cold Clear Nights',
  description: `Northern lights in Winnipeg in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and why ${best[0].name} comes first for clear dark hours.`,
  intro: 'Winnipeg lies under one of the most southerly reaches of the auroral oval in the world, on a plain with no hills to hide it.',
  resume: `From Winnipeg the northern lights need a planetary Kp of about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'which is short of a G1 storm'} on the NOAA scale. Manitoba's capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(f.mlat - K.facts('canada', 'calgary').mlat, 1)} degrees higher than Calgary, because the magnetic pole lies almost due north over the Arctic islands and drags the oval down over the center of the continent. Toronto, ${K.num(K.townRef('canada', 'winnipeg').lat - K.townRef('canada', 'toronto').lat, 1)} degrees farther south on the map, needs about Kp ${K.kp(to.need)}. Only ${K.listOf(nd)} goes without any full darkness, and December 15 brings ${K.num(m[11].hours, 1)} hours of it, from ${m[11].start} to ${m[11].end}. The NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} and drops to ${K.num(m[1].cloud, 0)}% in February, which together with long nights puts ${K.listOf(best.map((b) => b.name))} at the top for clear dark hours. The tool reads tonight's SWPC Kp blocks and MET Norway clouds for Winnipeg.`,
  faqs: [
    { q: 'How strong a storm does Winnipeg need for the northern lights?', a: `No storm at all, strictly speaking. Winnipeg needs about Kp ${K.kp(f.need)}, below the G1 level, so an active but ordinary night can show aurora low in the north from a dark spot outside the city. A G1 storm usually lifts it higher, and at about Kp ${K.kp(f.overhead)} the oval edge reaches the city in this site's model.` },
    { q: 'Is February the best month for the aurora in Winnipeg?', a: `By clear dark hours it ranks first: February 15 has ${K.num(m[1].hours, 1)} hours of full darkness and a NASA POWER cloud amount near ${K.num(m[1].cloud, 0)}%, among the lowest of the dark season. The nights are bitterly cold, though. September, with ${K.num(m[8].hours, 1)} dark hours and mild weather, is the comfortable alternative.` },
    { q: 'Where can you see the aurora near Winnipeg?', a: `North of the city along the Red River toward Lake Winnipeg, or east into the forest and lakes near the Ontario border, where the glow fades fast. The farmland of the valley is flat in every direction. At Kp ${K.kp(f.need)} the display usually sits low, so the important thing is leaving the city's light dome behind.` },
  ],
  body: (h) => `
<h2>The southern tip of the oval</h2>
<p>If you trace the quiet auroral oval around the globe, it dips farthest from the pole over central North America, below Hudson Bay. Winnipeg sits under the western side of that dip, which explains its low threshold. It lies at ${h.num(h.townRef('canada', 'winnipeg').lat, 1)} degrees north, ${h.num(h.townRef('uk', 'london').lat - h.townRef('canada', 'winnipeg').lat, 1)} degrees south of London, yet it needs only about Kp ${h.kp(f.need)}. Compared with Fargo, at the other end of the same valley, Winnipeg gains ${h.num(f.mlat - fa.mlat, 1)} degrees of magnetic latitude and needs about ${h.num(fa.need! - f.need!, 1)} Kp less.</p>
<p>Westward across the prairie the advantage holds and grows slowly. Regina needs about Kp ${h.kp(h.facts('canada', 'regina').need)} and Saskatoon about Kp ${h.kp(h.facts('canada', 'saskatoon').need)}, so the three prairie cities share much the same odds on a given night, and the weather decides which one gets the show. Eastward the thresholds climb fast: by the time the oval has to reach Ottawa, it needs about Kp ${h.kp(h.facts('canada', 'ottawa').need)}, a storm that Winnipeg would see high in its sky.</p>
<p>${h.mini('kpNeed', { place: 'canada/winnipeg', region: 'canada' })}</p>
<h2>Where two rivers meet and the land goes flat</h2>
<p>The city grew where the Assiniboine joins the Red River, and the land around it is the floor of a former glacial lake, as level as anywhere in Canada. North of the city the Red River runs on toward Lake Winnipeg, through farmland and small towns with very little light. That flatness suits a threshold like Winnipeg's, because aurora at Kp ${h.kp(f.need)} often begins as a low band near the horizon and climbs only when activity grows. East of the city the prairie gives way to the granite and forest of the Shield, darker still but more closed in.</p>
<h2>Arctic highs and the deep freeze</h2>
<p>Winnipeg's winter skies are shaped by Arctic high pressure. When a cold air mass settles over Manitoba, the sky clears for days, the wind drops and the temperature can plunge far below zero Fahrenheit. Those are the nights that make ${best[0].name} and ${best[1].name} the best months on paper. ${h.cloudExtremes('canada', 'winnipeg').cloudiest.name} is the opposite: grey, damp and the cloudiest month of the year, at ${h.num(ce.cloudiest.cloud, 0)}%. In summer, short nights shrink the window to ${h.num(m[6].hours, 1)} dark hours on July 15, though a strong storm can still show late at night, once the long prairie twilight finally fades. For the American side of the valley see the ${h.a('city:north-dakota/fargo', 'Fargo page')}; for the rest of the country, the ${h.a('region:canada', 'Canada page')}.</p>`,
  related: ['region:canada', 'city:north-dakota/fargo', 'city:canada/edmonton', 'region:minnesota', 'aurora-map'],
});
