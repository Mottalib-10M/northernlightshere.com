import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'edinburgh');
const m = K.monthly('uk', 'edinburgh');
const nd = K.noDarkMonths('uk', 'edinburgh');
const ce = K.cloudExtremes('uk', 'edinburgh');
const best = K.bestMonths('uk', 'edinburgh', 3);
const iv = K.facts('uk', 'inverness');

export default defineCity({
  region: 'uk',
  slug: 'edinburgh',
  title: 'Northern Lights Edinburgh 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Edinburgh in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the Firth of Forth view and the dark months.`,
  intro: 'Edinburgh looks north across the Firth of Forth; its summers are too bright, its winters long enough for a storm to show.',
  resume: `From Edinburgh the northern lights need a planetary Kp of about ${K.kp(f.need)} on this site's view line, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, well below its geographic ${K.num(f.town.lat, 1)} degrees north, because the magnetic pole sits over the Canadian Arctic, on the far side of the globe from Scotland. That threshold is cautious: under a very dark sky with an open northern horizon, people around the Forth sometimes catch a faint glow on smaller storms, which the tool rates as maybe rather than yes. Light is the other constraint. In ${K.listOf(nd)} the Sun never sinks 18 degrees below the horizon, while mid-December gives ${K.num(m[11].hours, 1)} hours of full darkness, from ${m[11].start} to ${m[11].end}. With NASA POWER cloud averages, the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}.`,
  faqs: [
    { q: 'Can you see the northern lights in Edinburgh?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or more, from a dark spot looking north across the Firth of Forth. Many people in Edinburgh saw the aurora during the G5 storm of May 2024. On ordinary nights it stays below the city's horizon, and the city's lights hide a faint display.` },
    { q: 'Where is the best place near Edinburgh to see the aurora?', a: 'Somewhere north-facing and away from street lights: the shore of the Forth at Cramond or along the East Lothian coast, the top of the Pentland Hills, or across the Forth in Fife. Arthur’s Seat is popular but sits in the middle of the city glow; a few miles out of town the sky is much darker.' },
    { q: 'When is aurora season in Edinburgh?', a: `From late August to April. In ${K.listOf(nd)} there is no astronomical darkness at all, so even a strong storm is hard to see. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first, with long nights and a NASA POWER cloud amount that stays high all year, around ${K.num(ce.clearest.cloud, 0)} to ${K.num(ce.cloudiest.cloud, 0)}%.` },
  ],
  body: (h) => `
<h2>Scotland's capital, magnetically farther south</h2>
<p>Edinburgh shares its geographic latitude with Moscow and with the southern tip of Alaska's panhandle, yet on the aurora's scale it is closer to Seattle. The reason is the position of the magnetic pole, which lies over Arctic Canada: places on the European side of the globe are farther from it, magnetically, than their latitude suggests. That puts Edinburgh at about Kp ${h.kp(f.need)}, a moderate to strong storm, while Inverness, ${h.num(h.townRef('uk', 'inverness').lat - f.town.lat, 1)} degrees farther north, needs about ${h.kp(iv.need)}. The north of Scotland is where small storms pay off; the Central Belt waits for the bigger ones.</p>
${h.mini('darkMonth', { place: 'uk/edinburgh', month: 11 })}
<h2>Looking across the Forth</h2>
<p>The city slopes down to the Firth of Forth, and its northern horizon is the estuary and the coast of Fife beyond it. From the shore west of Leith, at Cramond or around the Forth bridges at South Queensferry, the view north crosses water with the lights of Fife on the far side. East along the coast toward North Berwick, the Forth widens and the far shore recedes, giving a darker northern sky over the sea. The Pentland Hills, just south of the city, give height but look north over Edinburgh's own glow.</p>
<h2>Summer light and winter cloud</h2>
<p>Edinburgh's summer nights never get fully dark: from ${nd[0]} to ${nd[nd.length - 1]} the Sun stays within 18 degrees of the horizon, and around midsummer the northern sky keeps a glow all night. The dark season runs from late August, when September's equinox brings its tendency toward geomagnetic storms, to April. Cloud is the constant: the NASA POWER cloud amount stays above ${h.num(ce.clearest.cloud, 0)}% in every month. Clear nights often follow the passage of a front, when cold northwesterly air clears the sky for a few hours; the hour strip of the tool, fed here by the MET Norway forecast, shows when that window is expected. The Met Office space weather service publishes UK aurora guidance too. For the rest of the country see the ${h.a('region:uk', 'UK page')}, and for the west the ${h.a('city:uk/glasgow', 'Glasgow page')}.</p>`,
  related: ['region:uk', 'city:uk/glasgow', 'city:uk/inverness', 'city:uk/aberdeen', 'best-time-northern-lights'],
  extraSources: [{ name: 'Met Office, space weather forecast', url: 'https://www.metoffice.gov.uk/weather/specialist-forecasts/space-weather' }],
});
