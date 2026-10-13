import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('uk', 'inverness');
const m = K.monthly('uk', 'inverness');
const nd = K.noDarkMonths('uk', 'inverness');
const ce = K.cloudExtremes('uk', 'inverness');
const best = K.bestMonths('uk', 'inverness', 3);
const th = K.facts('uk', 'thurso');
const ed = K.facts('uk', 'edinburgh');
const le = K.facts('uk', 'lerwick');

export default defineCity({
  region: 'uk',
  slug: 'inverness',
  title: 'Northern Lights Inverness 2026: Highland Kp and Dark Hours',
  description: `Northern lights in Inverness in 2026: tonight's yes, maybe or no, the Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the Moray Firth view and the darker north coast.`,
  intro: 'Inverness, the Highland capital, needs only a minor storm for the aurora, one level less than the cities of the Scottish Central Belt.',
  resume: `From Inverness the northern lights need a planetary Kp of about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'below storm level'} on the NOAA scale. The Highland capital sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(f.mlat - ed.mlat, 1)} degrees higher than Edinburgh, and in this site's model the oval edge is already overhead at the same level, about Kp ${K.kp(f.overhead)}. That means a G1 night can bring more than a low glow. The year is lopsided, though: from ${nd[0]} to ${nd[nd.length - 1]} the sky never reaches astronomical darkness, and mid-August offers only ${K.num(m[7].hours, 1)} dark hours. December 15 gives ${K.num(m[11].hours, 1)}, from ${m[11].start} to ${m[11].end}. NASA POWER cloud amounts run from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}, when nights are too light to use, to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Taking both into account, ${K.listOf(best.map((b) => b.name))} offer the most clear dark hours. The tool checks tonight's SWPC Kp and MET Norway cloud cover for Inverness.`,
  faqs: [
    { q: 'What Kp do you need to see the northern lights in Inverness?', a: `About Kp ${K.kp(f.need)}, which is a ${K.gName(f.g)} storm on the NOAA scale. Those come around ${K.P.facts.gScale[0].perCycle} times per solar cycle, so they are not rare near solar maximum. Get out of the town glow to a shore or hillside with a clear northern view, and the clouds will be the deciding factor.` },
    { q: 'Is the north coast better than Inverness for the aurora?', a: `Somewhat. Thurso, on the Caithness coast, needs about Kp ${K.kp(th.need)} against Kp ${K.kp(f.need)} in Inverness, and looks straight out over the Pentland Firth with no land in the way. The difference in Kp is small, so on a strong night the shores of the Moray Firth closer to Inverness work almost as well.` },
    { q: 'When does aurora season start in Inverness?', a: `In late August, when the first fully dark hours return after the summer gap from ${nd[0]} to ${nd[nd.length - 1]}. By September 15 there are ${K.num(m[8].hours, 1)} hours of full darkness, and by October 15 ${K.num(m[9].hours, 1)}. ${best[0].name} ranks first in Inverness on clear dark hours, with the long nights of midwinter.` },
  ],
  body: (h) => `
<h2>At the head of the Moray Firth</h2>
<p>Inverness grew where the River Ness meets the sea, at the inner end of the Moray Firth, and its geography is unusually helpful for an aurora town. The firth runs northeast toward the open North Sea, and across the narrow water the Black Isle rises low and largely rural. From the northern edge of the city, or from the shore on the far side of the Kessock Bridge, the northern sky opens over farmland and water rather than streets. Loch Ness lies the other way, down the Great Glen to the southwest, and its steep sides make it a poor place to look north.</p>
${h.mini('kpNeed', { place: 'uk/inverness', region: 'uk' })}
<h2>Where the threshold and the overhead line meet</h2>
<p>Inverness sits in the narrow band of magnetic latitude where the Kp needed to see aurora and the Kp that brings the oval edge overhead coincide, about ${h.kp(f.need)}. For a watcher this means a minor storm can paint a large part of the sky, while a forecast below that level usually shows nothing. Lerwick, ${h.num(le.mlat - f.mlat, 1)} degrees farther north in magnetic latitude, needs about ${h.num(f.need! - le.need!, 1)} Kp less; Edinburgh needs about ${h.num(ed.need! - f.need!, 1)} Kp more. On the scale of Britain, Inverness is the point where aurora watching shifts from an occasional event to a regular winter possibility.</p>
<p>Driving north improves the odds only slowly. Thurso, on the Caithness coast, gains ${h.num(th.mlat - f.mlat, 1)} degrees of magnetic latitude and lowers the threshold by ${h.num(f.need! - th.need!, 1)} Kp, a real but modest gain for a long trip. The bigger reward of the north coast is the horizon: the sea to the north, and almost no artificial light between you and Orkney.</p>
<h2>Highland weather in the dark months</h2>
<p>The Highlands catch Atlantic fronts head on, but Inverness lies on the drier eastern side, in the lee of the mountains, and clear intervals are more frequent here than on the west coast. In winter, northerly winds can bring showers off the sea with clear gaps between them, and a calm high pressure spell brings frost and steady, open skies. ${h.cloudExtremes('uk', 'inverness').cloudiest.name} is the cloudiest month here, but it falls in the summer gap anyway. In the dark season the figures are close from month to month, so the nights to pick are the ones the forecast shows clear. The ${h.a('city:uk/lerwick', 'Lerwick page')} covers Shetland, and the ${h.a('city:uk/aberdeen', 'Aberdeen page')} the east coast.</p>`,
  related: ['region:uk', 'city:uk/lerwick', 'city:uk/aberdeen', 'city:uk/edinburgh', 'kp-index'],
});
