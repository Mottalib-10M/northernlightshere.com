import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'vancouver');
const m = K.monthly('canada', 'vancouver');
const nd = K.noDarkMonths('canada', 'vancouver');
const ce = K.cloudExtremes('canada', 'vancouver');
const best = K.bestMonths('canada', 'vancouver', 3);
const se = K.facts('washington', 'seattle');
const ca = K.facts('canada', 'calgary');

export default defineCity({
  region: 'canada',
  slug: 'vancouver',
  title: 'Northern Lights Vancouver 2026: Storm Needed, Clouds, Hours',
  description: `Northern lights in Vancouver in 2026: tonight's yes, maybe or no, the ${K.gName(f.g)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, and why the mountains matter less.`,
  intro: 'Vancouver needs a proper storm, and when one arrives the aurora tends to climb above the North Shore Mountains rather than hide behind them.',
  resume: `Vancouver needs ${K.needText(f)}, before the northern lights show over the city. It sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, well below its map latitude, because the magnetic pole lies far to the east over the Canadian Arctic. In this site's model the Kp needed and the Kp that puts the oval edge overhead are the same here, about ${K.kp(f.overhead)}, which means a storm strong enough to be seen is usually strong enough to rise high in the sky. Weather is the bigger hurdle. The NASA POWER cloud amount reaches ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name} and falls to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}, and only ${K.listOf(nd)} lacks any full darkness. Weighing both, ${K.listOf(best.map((b) => b.name))} give the most clear dark hours, before the rainy season settles in. The tool reads tonight's SWPC Kp and MET Norway cloud cover for Vancouver, hour by hour.`,
  faqs: [
    { q: 'Can you see the northern lights in Vancouver?', a: `Yes, during geomagnetic storms of about Kp ${K.kp(f.need)} or stronger, a ${K.gName(f.g)} level that NOAA counts about ${K.P.facts.gScale[f.g - 1].perCycle} times per solar cycle. The night also has to be clear, which is the harder part from October to March. The city glow hides the faint edges, so a darker shore or the Fraser Valley helps.` },
    { q: 'Do the North Shore Mountains block the aurora in Vancouver?', a: `Less than you might think. At Vancouver's threshold, about Kp ${K.kp(f.need)}, the oval edge in this site's model is already close to overhead, so the light is not confined to a low northern arc. The mountains do hide the faintest, lowest glow on weaker nights, and their ski area lights add to the city dome.` },
    { q: 'What is the best month for the aurora in Vancouver?', a: `${best[0].name}, by clear dark hours. On ${best[0].name} 15 Vancouver has ${K.num(m[best[0].month - 1].hours, 1)} hours of full darkness and the cloud amount is still near ${K.num(m[best[0].month - 1].cloud, 0)}%, well below the ${K.num(ce.cloudiest.cloud, 0)}% of ${ce.cloudiest.name}. The equinox tendency toward stronger storms adds a little more to early autumn, so a September storm alert deserves a real plan.` },
  ],
  body: (h) => `
<h2>Mountains to the north, ocean to the west</h2>
<p>Most towns on this site would be handicapped by a wall of mountains on their northern side. Vancouver has exactly that, with the North Shore peaks rising straight out of Burrard Inlet, and yet the handicap is smaller than it looks. The reason is the shape of the threshold. Vancouver's magnetic latitude puts it in the narrow band where the Kp that makes aurora visible and the Kp that brings the oval edge overhead coincide, at about ${h.kp(f.need)}. A storm that clears that bar tends to light the sky well above the ridgeline, and on the strongest nights the color can spread across the zenith toward the south.</p>
<p>${h.mini('darkMonth', { place: 'canada/vancouver', month: 8 })}</p>
<h2>A wetter coast than its neighbors</h2>
<p>The real competitor of the aurora here is the Pacific. Winter fronts arrive one after another, and the cloud amount from November through January stays near ${h.num(m[11].cloud, 0)}%. The dry season is late summer, when the nights are short, so the best compromise falls in early autumn, with ${h.num(m[8].hours, 1)} dark hours on September 15. Compared with Seattle, Vancouver needs about ${h.num(se.need! - f.need!, 1)} Kp less, a small edge that the clouds usually decide. Calgary, on the other side of the Rockies, needs about ${h.num(f.need! - ca.need!, 1)} Kp less again and sees far more clear winter nights.</p>
<p>When a storm is forecast, the useful move is often east rather than north. The Fraser Valley farmland, away from the metro glow and sometimes under a break in the coastal cloud, gives darker skies and flatter ground than the city beaches. The ${h.a('city:washington/seattle', 'Seattle page')} explains the same Pacific pattern from the south, and the ${h.a('region:canada', 'Canada page')} ranks the other cities.</p>
<h2>Reading a storm night from the Lower Mainland</h2>
<p>The great storm of May 2024 showed what Vancouver can get when everything lines up: pink and green rays visible from city parks and beaches despite the light, because the activity was far above the threshold. Nights like that are rare. The more common case is a G2 or small G3 event, where the aurora appears as a diffuse glow with occasional rays, brighter on a phone screen than to the eye. On those nights the hour matters as much as the place. Activity tends to peak in the hours around local magnetic midnight, and the MET Norway forecast in the tool shows whether those hours coincide with a gap in the cloud. If the first half of the night is overcast, a clearing after midnight can still deliver. The ${h.a('photograph-northern-lights-phone', 'phone photography guide')} covers settings for faint displays.</p>`,
  related: ['region:canada', 'city:washington/seattle', 'city:canada/calgary', 'region:washington', 'geomagnetic-storm-scale'],
});
