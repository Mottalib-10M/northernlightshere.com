import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('massachusetts', 'boston');
const m = K.monthly('massachusetts', 'boston');
const ce = K.cloudExtremes('massachusetts', 'boston');
const best = K.bestMonths('massachusetts', 'boston', 3);
const be = K.facts('new-hampshire', 'berlin');

export default defineCity({
  region: 'massachusetts',
  slug: 'boston',
  title: 'Northern Lights Boston 2026: Tonight’s Chance and Kp Needed',
  description: `Northern lights in Boston in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the storms that reach New England and where to drive.`,
  intro: 'Boston needs a strong storm and a dark northern horizon, which in practice means leaving the city.',
  resume: `From Boston the northern lights need a planetary Kp of about ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, and the aurora would reach overhead only around Kp ${K.kp(f.overhead)}, in the rarest storms. A Boston sighting is therefore a glow low in the north, often pink or red, during the few strong storms of each solar cycle. The metro area's light is the main local obstacle; two or three hours north, Berlin in New Hampshire needs about Kp ${K.kp(be.need)} under a much darker sky. Boston's NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours are ${K.listOf(best.map((b) => b.name))}. The tool checks tonight's SWPC Kp against that threshold, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights from Boston?', a: `Only during strong storms of about Kp ${K.kp(f.need)} or more, and much better from outside the city. During the G5 storm of May 2024 the aurora was photographed across Massachusetts. On a typical active night, Kp 4 or 5, it does not rise above Boston's horizon.` },
    { q: 'Where should I go from Boston to see the aurora?', a: 'North and west, away from the metro glow: the hills of north-central Massachusetts, the Monadnock region of southern New Hampshire, or, for a weaker storm, the North Country of New Hampshire and northern Vermont. Choose a field or a summit with an open northern view and the city behind you.' },
    { q: 'When is the best time of year for aurora near Boston?', a: `By clear dark hours, ${K.listOf(best.map((b) => b.name))}. On December 15 the Sun is more than 18 degrees down for ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. Storms, though, come when the Sun sends them, so the useful habit is to watch for SWPC G3 watches in any season.` },
  ],
  body: (h) => `
<h2>Strong storms, strong lights</h2>
<p>Boston combines two handicaps: a magnetic latitude that requires a G3 storm, and one of the larger light domes of the East Coast. Its threshold of Kp ${h.kp(f.need)} puts it close to Philadelphia and New York City among the cities on this site. In practice, the aurora has been seen from the Boston area only on the big nights of a solar cycle, and the best views came from the dark country north and west of the city.</p>
<p>${h.mini('darkMonth', { place: 'massachusetts/boston', month: 11 })}</p>
<h2>Getting out of the dome</h2>
<p>The glow of greater Boston extends far beyond Route 128 and Interstate 495. The first truly dark horizons appear in the hills of north-central Massachusetts, around the Quabbin Reservoir and the towns along the New Hampshire line, about an hour or so west. For a weaker storm, the drive north into New Hampshire gains both darkness and a lower threshold: every hour of driving lowers the Kp needed a little, up to about ${h.kp(be.need)} in the North Country.</p>
<h2>How to read a storm night</h2>
<p>A G3 or G4 watch from SWPC is the starting point; on the night, the Kp estimate and the OVATION line of the tool show whether the storm has arrived and how far south the oval sits. Boston is five hours behind Universal Time in winter, so the SWPC block from 00 to 03 UT is 7 to 10 pm and the block from 03 to 06 UT is 10 pm to 1 am. The aurora at this distance usually looks pale to the eye, a pink or grey glow with occasional rays; a phone camera shows the colors, as the ${h.a('photograph-northern-lights-phone', 'phone guide')} explains. For the rest of the state, see the ${h.a('region:massachusetts', 'Massachusetts page')}.</p>`,
  related: ['region:massachusetts', 'region:new-hampshire', 'city:new-york/new-york-city', 'region:maine', 'aurora-forecast'],
});
