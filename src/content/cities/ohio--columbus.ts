import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('ohio', 'columbus');
const m = K.monthly('ohio', 'columbus');
const best = K.bestMonths('ohio', 'columbus', 3);
const ce = K.cloudExtremes('ohio', 'columbus');
const cl = K.facts('ohio', 'cleveland');
const ci = K.facts('ohio', 'cincinnati');
const ceCl = K.cloudExtremes('ohio', 'cleveland');

export default defineCity({
  region: 'ohio',
  slug: 'columbus',
  title: 'Northern Lights Columbus 2026: Kp Needed in Central Ohio',
  description: `Northern lights in Columbus in 2026: about Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, a ${K.gName(f.g)} storm, tonight's verdict and the clearest months to try.`,
  intro: 'Columbus sits in the middle of Ohio, far from Lake Erie, so its aurora nights depend on a strong storm and a short drive out of the metro glow.',
  resume: `Columbus needs a planetary Kp of about ${K.kp(f.need)} for the northern lights to clear its northern horizon, a ${K.gName(f.g)} storm on the NOAA scale. At ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, Ohio's capital is about ${K.num(cl.mlat - f.mlat, 1)} degrees south of Cleveland and ${K.num(f.mlat - ci.mlat, 1)} degrees north of Cincinnati, which needs Kp ${K.kp(ci.need)}. An overhead display would take about Kp ${K.kp(f.overhead)}, the territory of severe storms. Being far from the lake has an upside: the NASA POWER cloud average falls to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}, and even the greyest month, ${ce.cloudiest.name}, averages ${K.num(ce.cloudiest.cloud, 0)}%, below Cleveland's ${K.num(ceCl.cloudiest.cloud, 0)}% peak. With ${K.num(m[10].hours, 1)} hours of full darkness on November 15 and ${K.num(m[8].hours, 1)} on September 15, ${best[0].name}, ${best[1].name} and ${best[2].name} offer the most clear dark hours. The tool checks tonight's forecast against hourly NWS sky cover for Columbus.`,
  faqs: [
    { q: 'Can you see the northern lights in Columbus, Ohio?', a: `Only during strong storms, about Kp ${K.kp(f.need)} or more. That is ${K.gName(f.g)} on the NOAA scale, a level reached a limited number of times in a solar cycle. On such a night, a low glow to the north is a fair chance from a dark field outside the city, and phone cameras pick up the color more easily than the eye.` },
    { q: 'Which direction should I drive from Columbus to see the aurora?', a: `North or northwest, into the flat farmland toward Delaware County and beyond, which keeps the city glow behind you while you face the aurora. Driving north also lowers the threshold a little, toward Cleveland's Kp ${K.kp(cl.need)}. The hill country to the southeast is darker, but the city then sits in the northern sky you are trying to watch.` },
    { q: 'What month gives Columbus the best northern lights odds?', a: `${best[0].name}, by clear dark hours. On ${best[0].name} 15 the Sun stays more than 18 degrees down for ${K.num(best[0].hours, 1)} hours, and NASA POWER's cloud average is ${K.num(best[0].cloud, 0)}%. Winter nights are longer but cloudier, with ${ce.cloudiest.name} at ${K.num(ce.cloudiest.cloud, 0)}%. A strong storm is still required, whatever the month, so watch the three-day forecast.` },
  ],
  body: (h) => `
<h2>A capital in the middle of the till plains</h2>
<p>Columbus is Ohio's largest city, set on the Scioto River roughly halfway between Lake Erie and the Ohio River. That middle position defines its aurora odds. There is no lake horizon to lean on, as there is in Cleveland or Toledo, and the threshold, Kp ${h.kp(f.need)}, sits above that of any city on the Ohio lakeshore. North of the city the land flattens into glacial till plain, farmland with long straight roads and few tall obstacles, which is what an aurora low on the horizon requires. That is the useful direction for two reasons: the view looks away from the city, and every mile north brings you slightly closer to the oval.</p>
<p>The rolling hills to the southeast are the darkest country within reach of Columbus, and they suit stargazing well. For aurora they work against you twice. Ridges and gorges block the low northern sky, and the metro's glow sits right in that part of the horizon.</p>
<h2>How much storm Columbus needs</h2>
<p>A ${h.gName(f.g)} storm is the price of entry here, and the margin matters. At Kp ${h.kp(f.need)} the aurora barely clears the horizon in the view line used on this site; at Kp 8, a severe storm, it stands far higher, and around Kp ${h.kp(f.overhead)} the oval itself would reach the zenith. Those severe nights are when central Ohio sees red and green to the north sometimes even from suburban yards. ${h.mini('kpNeed', { place: 'ohio/columbus', region: 'ohio' })} The ${h.a('kp-index', 'Kp index page')} explains the three-hour blocks the forecast uses, and the ${h.a('city:ohio/cleveland', 'Cleveland page')} shows what the lake shore adds two hours north.</p>
<h2>An inland sky that clears in autumn</h2>
<p>Distance from the Great Lakes gives Columbus a gentler cloud year than northeast Ohio. Lake-effect bands seldom reach this far south, and the clearest stretch arrives in early autumn: ${ce.clearest.name} averages ${h.num(ce.clearest.cloud, 0)}% cloud amount in NASA POWER data. That month also brings a dark window from ${m[8].start} to ${m[8].end} on the 15th. By November darkness runs ${h.num(m[10].hours, 1)} hours, from ${m[10].start}, so a storm in the early evening still has a chance. Midwinter is greyer, with ${ce.cloudiest.name} the cloudiest month at ${h.num(ce.cloudiest.cloud, 0)}%. In June, full darkness shrinks to ${h.num(m[5].hours, 1)} hours, starting at ${m[5].start}. Short summer nights and a high threshold make that season the weakest bet of the year. The ${h.a('region:ohio', 'Ohio page')} compares the other cities of the state.</p>`,
  related: ['region:ohio', 'city:ohio/cleveland', 'city:michigan/detroit', 'kp-index', 'best-time-northern-lights'],
});
