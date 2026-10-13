import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const fa = K.facts('minnesota', 'international-falls');
const el = K.facts('minnesota', 'ely');
const du = K.facts('minnesota', 'duluth');
const mp = K.facts('minnesota', 'minneapolis');
const ro = K.facts('minnesota', 'rochester');
const best = K.bestMonths('minnesota', 'international-falls', 2);
const ceFa = K.cloudExtremes('minnesota', 'international-falls');
const lower48 = K.REGIONS.filter((r) => !['alaska', 'canada', 'uk'].includes(r.slug)).flatMap((r) => K.ladder(r.slug));
const lowest = [...lower48].sort((a, b) => (a.need ?? 99) - (b.need ?? 99))[0];

export default defineRegion({
  slug: 'minnesota',
  title: 'Northern Lights Minnesota 2026: Kp, Border to Twin Cities',
  description: `Northern lights in Minnesota in 2026: Kp ${K.kp(fa.need)} at International Falls, Kp ${K.kp(mp.need)} in Minneapolis, Kp ${K.kp(ro.need)} in Rochester, and tonight's verdict for your own town.`,
  intro: 'Along the Ontario border Minnesota needs only an active night, while the Twin Cities wait for a real storm.',
  resume: `Minnesota reaches farther toward the auroral oval than any other part of the lower 48 covered here. International Falls, on the Rainy River facing Ontario, sits at ${K.num(fa.mlat, 1)} degrees magnetic latitude in the AACGM model and needs only about Kp ${K.kp(fa.need)}, an unsettled to active night that falls short of storm level on the NOAA scale; ${lowest.town.slug === 'international-falls' ? 'no other town in the lower 48 on this site needs less' : `only ${lowest.label} needs less`}. Ely, at the edge of the Boundary Waters, needs Kp ${K.kp(el.need)}, and Duluth Kp ${K.kp(du.need)}, a ${K.gName(du.g)} storm. Farther south the bar rises: Minneapolis needs Kp ${K.kp(mp.need)}, a ${K.gName(mp.g)} storm, and Rochester Kp ${K.kp(ro.need)}. For International Falls, NASA POWER cloud averages swing from ${K.num(ceFa.clearest.cloud, 0)}% in ${ceFa.clearest.name} to ${K.num(ceFa.cloudiest.cloud, 0)}% in ${ceFa.cloudiest.name}, and the months with the most clear dark hours are ${best[0].name} and ${best[1].name}, when long nights meet the dry air of an Arctic high. The tool opens on Minneapolis; type any Minnesota town or ZIP code to get its own verdict.`,
  faqs: [
    { q: 'Where in Minnesota do you need the smallest storm to see the northern lights?', a: `Along the Canadian border. International Falls needs about Kp ${K.kp(fa.need)} and Ely about Kp ${K.kp(el.need)}, so on a clear, moonless night an active geomagnetic field can be enough, with no storm declared. Voyageurs National Park, next to International Falls, adds certified dark skies and open lake views to the north.` },
    { q: 'Can the Twin Cities see the aurora, or do you have to drive north in Minnesota?', a: `Minneapolis needs about Kp ${K.kp(mp.need)}, a ${K.gName(mp.g)} storm. On those nights the aurora can show from the metro, but the urban glow hides the faint lower part. Driving an hour or two north, toward St. Cloud (Kp ${K.kp(K.facts('minnesota', 'st-cloud').need)}) or the lake country, gains both darkness and a slightly lower threshold.` },
    { q: 'Is winter or autumn better for aurora in northern Minnesota?', a: `By clear dark hours, ${best[0].name} leads at International Falls, with about ${K.num(best[0].hours, 1)} hours of full darkness on the 15th. ${ceFa.cloudiest.name} is the cloudiest month there, at ${K.num(ceFa.cloudiest.cloud, 0)}% average cloud amount. September offers milder nights and equinox storms, a fair compromise if extreme cold puts you off.` },
  ],
  body: (h) => `
<h2>The border lakes, closest to the oval</h2>
<p>Look at a magnetic map rather than an ordinary one and the Arrowhead of Minnesota pokes up toward the auroral oval like a thumb. The geomagnetic pole sits over northern Canada, and the stretch of the border between Lake of the Woods and Lake Superior lies almost due south of it, so a town like International Falls ends up at ${h.num(fa.mlat, 1)} degrees magnetic latitude even though it is no farther north on the globe than parts of Montana. That is why its threshold, Kp ${h.kp(fa.need)}, is lower than Havre's or Minot's.</p>
<p>The National Park Service runs Voyageurs National Park on that border, a park made mostly of water, with Rainy, Kabetogama and Namakan lakes opening wide horizons to the north. The park was ${h.ext('https://nps.gov/voya/learn/news/voyageurs-national-park-certified-as-international-dark-sky-park.htm', 'certified as an International Dark Sky Park in December 2020')}, and the NPS keeps a page on ${h.ext('https://www.nps.gov/thingstodo/voya-northern-lights.htm', 'watching the northern lights over Voyageurs')}. Ely and the Boundary Waters edge, at Kp ${h.kp(el.need)}, share the same advantage: very little artificial light between you and the oval.</p>
${h.mini('kpNeed', { place: 'minnesota/bemidji', region: 'minnesota' })}
<h2>From the North Shore down to the Mississippi bluffs</h2>
<p>Below the border lakes, the state steps down one storm level at a time. Duluth and the North Shore need a ${h.gName(du.g)} storm; the shore runs northeast from the city, so the best views look out over Lake Superior with the dark Canadian side ahead. From Duluth through St. Cloud (Kp ${h.kp(h.facts('minnesota', 'st-cloud').need)}) to the Twin Cities, the Kp that first lifts the aurora above the horizon in this site's method is also the Kp that brings the edge of the oval overhead, so a first sighting there can fill much of the northern sky at once. The Twin Cities need Kp ${h.kp(mp.need)} and the southeast corner, around Rochester and the Mississippi bluffs, Kp ${h.kp(ro.need)}. The western prairie toward Moorhead is a good surprise: almost no trees, almost no relief, and a horizon flat enough that even a low glow stays in view. The ${h.a('city:minnesota/duluth', 'Duluth page')} and the ${h.a('city:minnesota/minneapolis', 'Minneapolis page')} give the details for those two cities.</p>
<h2>Cold, clear Arctic highs</h2>
<p>Minnesota's weather favors the aurora in an unexpected season. When a high pressure system slides down from Canada in January or February, it brings dry, still air and some of the clearest skies of the year, which is why midwinter tops the clear dark hours in the north of the state. The price is cold well below zero Fahrenheit at night. November, by contrast, is often grey as the first cold air moves over lakes that are still open. Central time also helps: the SWPC forecast block 06 to 09 UT falls between midnight and 3 am Central Standard Time, inside the darkest part of a winter night.</p>`,
  related: ['city:minnesota/duluth', 'city:minnesota/minneapolis', 'region:wisconsin', 'region:north-dakota', 'best-places-northern-lights-usa'],
  extraSources: [
    { name: 'National Park Service, Voyageurs National Park certified as International Dark Sky Park', url: 'https://nps.gov/voya/learn/news/voyageurs-national-park-certified-as-international-dark-sky-park.htm' },
    { name: 'National Park Service, Watch the northern lights over Voyageurs National Park', url: 'https://www.nps.gov/thingstodo/voya-northern-lights.htm' },
  ],
});
