import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'lerwick');
const m = K.monthly('uk', 'lerwick');
const nd = K.noDarkMonths('uk', 'lerwick');
const ce = K.cloudExtremes('uk', 'lerwick');
const best = K.bestMonths('uk', 'lerwick', 3);
const wh = K.facts('canada', 'whitehorse');
const ed = K.facts('uk', 'edinburgh');
const kw = K.facts('uk', 'kirkwall');

export default defineCity({
  region: 'uk',
  slug: 'lerwick',
  title: 'Northern Lights Lerwick 2026: Shetland Odds and Dark Hours',
  description: `Northern lights in Lerwick in 2026: tonight's yes, maybe or no for Shetland, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the ${nd.length} months with no full dark.`,
  intro: 'Lerwick is the most northerly town in the UK and the one that needs the smallest storm, as long as the Atlantic cloud breaks.',
  resume: `Lerwick needs a planetary Kp of about ${K.kp(f.need)} for the northern lights, ${f.g ? `a ${K.gName(f.g)} storm` : 'which is just short of a G1 storm'} on the NOAA scale, the lowest threshold of any town in the UK. Shetland's capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(f.mlat - kw.mlat, 1)} degrees higher than Kirkwall in Orkney and ${K.num(f.mlat - ed.mlat, 1)} degrees higher than Edinburgh, and at about Kp ${K.kp(f.overhead)} the oval edge reaches overhead. Two things work against it. From ${nd[0]} to ${nd[nd.length - 1]} there is no astronomical darkness at all, and cloud is persistent: NASA POWER amounts range from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, among the highest on this site. Against that, December 15 brings ${K.num(m[11].hours, 1)} hours of full darkness, from ${m[11].start} to ${m[11].end}. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first. The tool reads tonight's SWPC Kp and the MET Norway cloud forecast for Lerwick.`,
  faqs: [
    { q: 'How often are the northern lights visible from Lerwick?', a: `More often than anywhere else in the UK, because Lerwick needs only about Kp ${K.kp(f.need)}, a level reached on many active nights without a named storm. The limit is cloud: even the clearest dark season month in Lerwick averages well over half cloud in NASA POWER data. A clear spell between Atlantic fronts during the dark hours is what to wait for.` },
    { q: 'What do Shetlanders call the aurora in Lerwick?', a: `The Mirrie Dancers, the old Shetland name for the northern lights. They dance most readily when the forecast reaches about Kp ${K.kp(f.need)} or more and the sky clears, from late August to April. In summer the islands have the simmer dim instead, a long twilight with no full darkness from ${nd[0]} to ${nd[nd.length - 1]}.` },
    { q: 'Is Lerwick as good as Alaska or the Yukon for the aurora?', a: `Not quite. Lerwick shares its map latitude with Whitehorse, but Whitehorse sits at ${K.num(wh.mlat, 1)} degrees magnetic latitude and needs about Kp ${K.kp(wh.need)}, against ${K.num(f.mlat, 1)} degrees and Kp ${K.kp(f.need)} for Lerwick. Shetland is also cloudier. It is still one of the best places in Europe outside Scandinavia and Iceland.` },
  ],
  body: (h) => `
<h2>Sixty degrees north, on the wrong side of the pole</h2>
<p>Lerwick lies at ${h.num(h.townRef('uk', 'lerwick').lat, 1)} degrees north, almost exactly the latitude of Whitehorse in the Yukon. In magnetic terms the two towns are far apart: Whitehorse is ${h.num(wh.mlat - f.mlat, 1)} degrees higher and needs about ${h.num(f.need! - wh.need!, 1)} Kp less, because the magnetic pole sits over the Canadian Arctic and the auroral oval leans toward North America. Shetland is therefore not under the oval on a quiet night, as northern Canada is, but it sits close enough to its edge that modest activity brings the aurora into view, low over the northern sea at first, then higher as the oval expands.</p>
<p>That geography also explains why Lerwick does better than the Scottish mainland. Every degree north counts on this side of the Atlantic, and the islands are the last land before open ocean. Looking north from the town, there is nothing but water and the rest of the Shetland archipelago between you and the oval.</p>
${h.mini('darkMonth', { place: 'uk/lerwick', month: 11 })}
<h2>Mirrie Dancers and the simmer dim</h2>
<p>Shetland has its own words for both sides of the year. The Mirrie Dancers are the northern lights, and the simmer dim is the summer twilight that never quite becomes night. For aurora purposes the simmer dim means a long blank: from ${nd[0]} to ${nd[nd.length - 1]} the sun never sinks 18 degrees below the horizon. The season opens in late August and grows quickly, to ${h.num(m[8].hours, 1)} dark hours by mid-September and ${h.num(m[10].hours, 1)} by mid-November.</p>
<h2>Waiting for the gap in the cloud</h2>
<p>The Northern Isles sit in the path of North Atlantic depressions, and the cloud amount stays above ${h.num(Math.floor(Math.min(...m.map((x) => x.cloud))), 0)}% in every month of the NASA POWER record here. Showers on a northwest wind often leave clear intervals between them, which can last long enough for a display. Because Lerwick's own lights are small, a short walk or drive to a north facing shore or headland outside the town is usually enough to reach dark sky. Timing is generous in winter: on December 15 full darkness starts at ${h.monthly('uk', 'lerwick')[11].start} on UK clocks, so an evening display can be caught before dinner, and the Met Office aurora outlook gives a second opinion beside the SWPC Kp on nights that look promising. The ${h.a('region:uk', 'UK page')} compares the rest of the country, and the ${h.a('city:uk/inverness', 'Inverness page')} the Highland mainland.</p>`,
  related: ['region:uk', 'city:uk/inverness', 'city:uk/aberdeen', 'city:canada/whitehorse', 'northern-lights-colors'],
  extraSources: [{ name: 'Met Office, space weather', url: 'https://www.metoffice.gov.uk/weather/specialist-forecasts/space-weather' }],
});
