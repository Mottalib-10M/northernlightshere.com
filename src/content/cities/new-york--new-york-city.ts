import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('new-york', 'new-york-city');
const m = K.monthly('new-york', 'new-york-city');
const ce = K.cloudExtremes('new-york', 'new-york-city');
const best = K.bestMonths('new-york', 'new-york-city', 3);
const pl = K.facts('new-york', 'plattsburgh');

export default defineCity({
  region: 'new-york',
  slug: 'new-york-city',
  title: 'Northern Lights New York City 2026: Tonight’s Odds, Kp',
  description: `Northern lights in New York City in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, why only big storms show, and where to go north.`,
  intro: 'From New York City the aurora is a rare, faint guest of the biggest storms; the trick is getting out of the light.',
  resume: `New York City needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale, close to G4. In the AACGM model the city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude, and the aurora would reach overhead only around Kp ${K.kp(f.overhead)}. NOAA's scale mentions New York at G2, but that describes the north of the state: Plattsburgh needs about ${K.kp(pl.need)}. For the city, the realistic chances are the few G3 and G4 storms of each solar cycle, seen as a red or pink glow low in the north, and only away from the glow of the metro area, one of the brightest on the continent. The sky itself is fairly often clear, with a NASA POWER cloud amount of ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. By clear dark hours, ${K.listOf(best.map((b) => b.name))} lead.`,
  faqs: [
    { q: 'Can you see the northern lights in New York City?', a: `Rarely, during strong storms of about Kp ${K.kp(f.need)} or more, and usually as a faint red glow that phone cameras capture better than the eye. Many New Yorkers photographed the aurora during the G5 storm of May 2024. On ordinary active nights it is far below the city's horizon.` },
    { q: 'Where can I see the aurora near New York City?', a: 'Somewhere north of the city with a dark northern horizon: the hills of the Hudson Highlands, the open country of the upper Hudson Valley, or the north shore of Long Island looking across the Sound, though Connecticut lights sit beyond it. The farther north, the darker and the lower the threshold.' },
    { q: 'What Kp does New York City need for the aurora?', a: `About Kp ${K.kp(f.need)}, a strong G3 storm, which NOAA counts at about ${K.P.facts.gScale[2].perCycle} per eleven-year solar cycle, many of them in daylight or under cloud for the city. G4 and G5 storms, the ones that bring aurora high into the sky over the region, are rarer still.` },
  ],
  body: (h) => `
<h2>A big storm and a long drive</h2>
<p>New York City is far from the oval: its threshold of Kp ${h.kp(f.need)} is among the highest of the cities on this site, and its light is among the brightest. Both point the same way. When SWPC issues a watch for G3 or G4 conditions, the plan is to be north of the city with a dark northern horizon by the time darkness falls, then to watch the Kp estimate and the OVATION line of the tool through the evening. Every hour of driving north lowers the threshold a little and removes a lot of light: Albany needs about ${h.kp(h.facts('new-york', 'albany').need)}, and the Adirondacks less again.</p>
${h.mini('darkMonth', { place: 'new-york/new-york-city', month: 11 })}
<h2>The light dome</h2>
<p>Seen from the countryside, the metro area is a glowing dome that rises tens of degrees above the horizon, and from inside it a faint red aurora disappears. What matters is where the dome sits relative to the aurora: from the Hudson Highlands or the Catskills, the city glow is to the south and the northern sky can be quite dark. Long Island's north shore faces north across the Sound, but the lights of the Connecticut coast sit on that horizon. Upstate fields and hilltops are the safer bet.</p>
<h2>Signals to watch on the night</h2>
<p>For the city, three signs justify the drive. An SWPC watch or warning for G3 or stronger; a current Kp estimate climbing toward ${h.kp(f.need)}; and an OVATION band that has moved far south over the Great Lakes on the ${h.a('aurora-map', 'live map')}. Any one of them alone is a reason to keep checking; together they are a reason to go.</p>
<h2>What it looks like from here</h2>
<p>From this far south of the oval, the part of a storm aurora that rises above the horizon is its upper layer, where oxygen above about ${h.P.facts.redHeightKmAbove} km emits red light, as SWPC explains. The result is a diffuse pink or red glow, sometimes with pale rays, that the eye may read as a strange cloud. A phone in night mode on a steady support shows it clearly, as the ${h.a('photograph-northern-lights-phone', 'phone photography guide')} explains. On December 15, full darkness runs from ${m[11].start} to ${m[11].end}. For the rest of the state, see the ${h.a('region:new-york', 'New York page')}.</p>`,
  related: ['region:new-york', 'city:new-york/buffalo', 'city:pennsylvania/philadelphia', 'city:massachusetts/boston', 'northern-lights-colors'],
});
