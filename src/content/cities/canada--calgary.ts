import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'calgary');
const m = K.monthly('canada', 'calgary');
const nd = K.noDarkMonths('canada', 'calgary');
const ce = K.cloudExtremes('canada', 'calgary');
const best = K.bestMonths('canada', 'calgary', 3);
const ed = K.facts('canada', 'edmonton');
const gf = K.facts('montana', 'great-falls');

export default defineCity({
  region: 'canada',
  slug: 'calgary',
  title: 'Northern Lights Calgary 2026: Tonight’s Odds Under Chinooks',
  description: `Northern lights in Calgary in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, Chinook clearings and the prairie view north.`,
  intro: 'Calgary needs a little more activity than Edmonton, but the dry foothills air and the Chinook give it more clear nights than its latitude would suggest.',
  resume: `From Calgary the northern lights need a planetary Kp of about ${K.kp(f.need)}, ${f.g ? `a ${K.gName(f.g)} storm` : 'just under the G1 storm level'} on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(ed.mlat - f.mlat, 1)} degrees south of Edmonton, and that gap costs about ${K.num(f.need! - ed.need!, 1)} Kp. Once activity reaches the threshold the oval edge is close to overhead, at about Kp ${K.kp(f.overhead)}. Full darkness disappears in ${K.listOf(nd)}, and on May 15 it lasts just ${K.num(m[4].hours, 1)} hours; December 15 brings ${K.num(m[11].hours, 1)} hours, from ${m[11].start} to ${m[11].end}. The NASA POWER cloud amount is highest in ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}%, the snowy spring month, and lowest in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%, when nights are too bright. By clear dark hours, ${K.listOf(best.map((b) => b.name))} lead. The tool checks tonight's SWPC Kp and MET Norway cloud cover for Calgary, hour by hour.`,
  faqs: [
    { q: 'What Kp do you need to see the northern lights in Calgary?', a: `About Kp ${K.kp(f.need)}, which is an active night rather than a storm. Calgary sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, so a forecast at or just above Kp ${K.kp(f.need)} with a clear, dark sky outside the city lights gives a fair chance, and a G1 storm a good one. Below that, the aurora usually stays north of the horizon.` },
    { q: 'Does the Chinook help aurora watching in Calgary?', a: `Often it does. The warm, dry wind coming down from the Rockies tends to clear the sky above the city while a band of cloud, the Chinook arch, stays over the mountains to the west. Since the aurora shows in the north, a Chinook night at Kp ${K.kp(f.need)} or more can be a good one, though the wind makes long exposures harder.` },
    { q: 'Where should you go near Calgary for the aurora?', a: `North or east onto the prairie, away from the city glow: the farmland toward Airdrie and beyond, or the open country east of the city. The foothills to the west are darker but their ridges can hide the low northern sky. At about Kp ${K.kp(f.need)} the aurora is often low, so a flat view north matters more here than in Edmonton.` },
  ],
  body: (h) => `
<h2>Where the Rockies meet the prairie</h2>
<p>Calgary sits on the Bow River where the high plains start to buckle into the foothills, with the front ranges of the Rockies visible to the west on a clear day. For the aurora that position is a split. Toward the north and east the land opens into prairie and the horizon is long and low, which is what a city with a Kp ${h.kp(f.need)} threshold needs, because on many nights the display only rises a little above it. Toward the west the darkness is better but the terrain gets in the way.</p>
<p>The city itself is the other obstacle. Calgary spreads wide across the plain, and its light dome reaches far enough that a faint green arc at threshold level is invisible from most neighborhoods. Once you are out on the dark grid roads, that same arc often shows as a pale grey band to the eye and an unmistakable green on a phone sensor. The summer gap is short here, ${h.listOf(nd)} only, and by mid-August the night already holds ${h.num(m[7].hours, 1)} dark hours.</p>
<p>${h.mini('kpNeed', { place: 'canada/calgary', region: 'canada' })}</p>
<h2>The Chinook arch and winter clear spells</h2>
<p>The signature weather of southern Alberta is the Chinook, a warm, dry wind that drops down the eastern slopes of the Rockies and can raise the temperature dramatically within hours. It often comes with a long, straight edge of cloud parked over the mountains, the Chinook arch, and a clear sky to the east of it. That geometry is kind to aurora watchers: the cloud usually stays to the west while the activity sits to the north. Arctic outbreaks bring a second kind of clear night, colder and calmer, when the air is dry enough to make the stars look sharp.</p>
<p>Spring is the weak season. ${h.cloudExtremes('canada', 'calgary').cloudiest.name} carries the highest cloud amount of the year, at ${h.num(ce.cloudiest.cloud, 0)}%, and wet snowstorms on the foothills are common then.</p>
<h2>Calgary between Edmonton and Montana</h2>
<p>Calgary needs about ${h.num(f.need! - ed.need!, 1)} Kp more than Edmonton, up the highway to the north, but about ${h.num(gf.need! - f.need!, 1)} Kp less than Great Falls, Montana, to the south. On a marginal night that difference is worth acting on: driving north toward Red Deer buys a little magnetic latitude, while simply leaving the city light behind buys more. For the northern half of the province see the ${h.a('city:canada/edmonton', 'Edmonton page')}; for the plains across the border, the ${h.a('region:montana', 'Montana page')}.</p>`,
  related: ['region:canada', 'city:canada/edmonton', 'city:canada/vancouver', 'region:montana', 'kp-index'],
});
