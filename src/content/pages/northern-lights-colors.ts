import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const F = K.P.facts;
const M = K.METHOD;
const bottom = M.auroraBottomKm;
const red = F.redHeightKmAbove;
const top = F.greenHeightKm[1];
const el = (hKm: number, dKm: number) => K.elevationOf(hKm, dKm);
/** Ground distance (km) at which a layer at hKm sinks to the horizon: solved on the engine's own geometry. */
const horizonKm = (hKm: number) => { let lo = 0, hi = 5000; for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (el(hKm, mid) > 0) lo = mid; else hi = mid; } return lo; };
const dBottom = horizonKm(bottom);
const dRed = horizonKm(red);
const dTop = horizonKm(top);
const deg = (x: number) => (x > 0 ? `${K.num(x, 1)}°` : 'below the horizon');
const km = (x: number) => Math.round(x / 10) * 10;
const mi = (x: number) => Math.round((x * 0.621371) / 10) * 10;
const DISTS = [200, 500, 800, 1000, 1500];

export default definePage({
  id: 'northern-lights-colors',
  group: 'guides',
  order: 60,
  slug: 'northern-lights-colors',
  nav: 'Colors and heights',
  card: 'Green, red and purple: which gas glows at which height, and why storms look red from the south',
  title: 'Northern Lights Colors 2026: Green, Red, Purple and Heights',
  description: `Northern lights colors in 2026: green oxygen at ${F.greenNm} nm from ${F.greenHeightKm[0]} to ${F.greenHeightKm[1]} km, red oxygen above ${F.redHeightKmAbove} km, purple nitrogen, and why storms look red from far south.`,
  h1: 'Northern lights colors: what glows, how high, and why it looks red from afar',
  intro: 'Every color of the aurora is a signature of one gas at one height. Distance then decides which of those layers you can see.',
  resume: `The green of the northern lights is atomic oxygen glowing at ${F.greenNm} nanometers, typically between ${F.greenHeightKm[0]} and ${F.greenHeightKm[1]} km above the ground, according to SWPC's aurora tutorial. Red comes from oxygen too, but in a state that lives so long it can only emit in the thin air above about ${red} km. The purple or blue lower fringe comes from molecular nitrogen, which glows instantly when struck. Height explains why storms seen from far south often look red or grey rather than green: from a distance, Earth's curve hides the lower part of the display. On a spherical Earth, the ${bottom} km lower border sinks below a flat horizon about ${km(dBottom).toLocaleString('en-US')} km away, while the red layer at ${red} km stays visible to about ${km(dRed).toLocaleString('en-US')} km. Faint light is also seen by the eye's rods, which register no color, so a dim aurora looks like a pale cloud. Cameras record the colors the eye misses.`,
  faqs: [
    { q: 'What causes the green color of the northern lights?', a: `Atomic oxygen. Electrons guided down Earth's magnetic field collide with oxygen atoms and raise them to an excited state that releases green light at ${F.greenNm} nanometers after about a second. SWPC's aurora tutorial places this emission typically between ${F.greenHeightKm[0]} and ${F.greenHeightKm[1]} km up. It is the most common auroral color and the one the eye perceives best when the display is bright.` },
    { q: 'Why do the northern lights look red from the southern states?', a: `Because only the top of the display rises above their horizon. The red glow of oxygen sits above about ${red} km, high enough to be seen from far away, while the green lower layer is hidden by Earth's curve beyond roughly ${km(dBottom).toLocaleString('en-US')} km on a flat horizon. During big storms, southern observers therefore see mostly the red upper part, low in the north.` },
    { q: 'What makes the purple lower edge of an aurora?', a: 'Molecular nitrogen. SWPC’s tutorial explains that excited nitrogen emits almost immediately after the collision, so it can glow lower in the atmosphere than oxygen, where the air is denser. The result is a purplish or bluish lower border under the green curtain. Near sunrise or sunset, sunlight can also make nitrogen glow purple at the tops of high rays.' },
    { q: 'How high above the ground are the northern lights?', a: `SWPC says the aurora typically forms ${F.auroraHeightKm[0]} to ${F.auroraHeightKm[1]} km above Earth's surface. The green part sits mostly between ${F.greenHeightKm[0]} and ${F.greenHeightKm[1]} km and the red part above ${red} km. That is far higher than any cloud and well above the altitude of commercial aircraft, which is why the same display can be seen from places hundreds of kilometers apart.` },
    { q: 'Why does a faint aurora look white or grey?', a: 'Because the eye switches to night vision. In low light, rod cells do the seeing, and rods do not distinguish color. SWPC’s tutorial says reports of white aurora are a manifestation of this night vision; only fairly bright aurora shows its true green and red. A camera, which adds up light for seconds through color filters, records the hue the eye misses.' },
  ],
  body: (h) => `
<h2>One gas, one height, one color</h2>
<p>The aurora is made by electrons accelerated in Earth's magnetosphere and guided down its magnetic field into the upper atmosphere. They hit oxygen atoms and nitrogen molecules and lift them into excited states; each relaxes by emitting light at wavelengths fixed by its atomic structure. SWPC's ${h.src('swpc_aurora', 'aurora page')} compares it to a neon sign, where a gas glows in its own color when electrons pass through it. What makes the aurora layered is that the different excited states do not live equally long, and the air gets thinner with height.</p>
<p>The green line, at ${h.P.facts.greenNm} nanometers, comes from oxygen in a state that lasts about a second before emitting. That is short enough for the atom to release its light before another collision takes the energy away, across a broad band of height: SWPC's ${h.src('swpc_tutorial', 'aurora tutorial')} puts it between ${h.P.facts.greenHeightKm[0]} and ${h.P.facts.greenHeightKm[1]} km. The red emission comes from another state of oxygen that lasts more than 150 seconds. Below about ${red} km, collisions are so frequent that the atom is nearly always knocked out of that state before it can shine, so red aurora is restricted to the thin air above. Molecular nitrogen behaves the other way: it emits almost instantly, so it can glow even lower, and it gives the purplish fringe at the bottom of bright curtains.</p>
${h.table(['Color', 'Source', 'Typical height', 'When it is seen'], [
    ['Green', `Atomic oxygen, ${h.P.facts.greenNm} nm`, `${h.P.facts.greenHeightKm[0]} to ${h.P.facts.greenHeightKm[1]} km`, 'Almost every display; the most common color'],
    ['Red', 'Atomic oxygen, long-lived state', `above ${red} km`, 'Tops of tall rays, high storm aurora seen from far away'],
    ['Purple, blue', 'Molecular nitrogen, prompt emission', 'lower border of bright curtains', 'Active displays with fast electrons'],
    ['Purple at the top', 'Nitrogen lit by sunlight', 'highest rays', 'Near sunset or sunrise'],
  ], 'Source: SWPC Aurora Tutorial and Aurora pages.', ['l', 'l', 'l', 'l'])}
<p>The energy of the incoming electrons decides how deep they go. Faster electrons penetrate further into denser air, which favors the green and the purple; slower ones stop higher and favor the red. That is why the color mix changes from one display to the next and even along a single curtain.</p>

<h2>Why storms look red from the south</h2>
<p>The aurora is high, but Earth is round. When the display sits far to your north, the curve of the planet hides its lower part, and only the upper layers stay above your horizon. The engine of this site computes that geometry for a spherical Earth without refraction, the same formula as the mini-simulator above. The table shows how high above a flat horizon three layers appear, by their distance along the ground.</p>
${h.table(['Distance to the aurora', `Lower border, ${bottom} km`, `Red layer, ${red} km`, `Top of the green, ${top} km`], DISTS.map((d) => [`${d.toLocaleString('en-US')} km (${mi(d)} mi)`, deg(el(bottom, d)), deg(el(red, d)), deg(el(top, d))]), 'Elevation above a flat horizon on a spherical Earth, no refraction.', ['l', 'r', 'r', 'r'])}
<p>At ${km(dBottom).toLocaleString('en-US')} km, about ${mi(dBottom).toLocaleString('en-US')} miles, the ${bottom} km lower border reaches the horizon; beyond it, the green curtain is hidden. The red layer at ${red} km stays visible to about ${km(dRed).toLocaleString('en-US')} km, and the highest emission at ${top} km to about ${km(dTop).toLocaleString('en-US')} km. So an observer in the central states during a G4 storm, with the bright part of the oval over Canada, often sees a glow low in the north that is mostly red: the top of a display whose green base is below the horizon. The same storm seen from under the oval is overwhelmingly green.</p>
<p>The numbers explain two practical points. SWPC's ${h.src('swpc_tips', 'viewing tips')} say that from a good vantage point aurora can be seen about ${h.P.method.swpcMaxViewKm.toLocaleString('en-US')} km to the north, which is about where the lower border sits just ${h.num(el(bottom, h.P.method.swpcMaxViewKm), 1)} degrees above a flat horizon while the red layer still stands about ${h.num(el(red, h.P.method.swpcMaxViewKm), 0)} degrees up. And a degree or two is not much: trees, buildings or a ridge to the north can hide a storm that is perfectly visible from a lakeshore. The forecast on this site counts aurora within ${h.P.method.skyReachKm} km as reaching your sky, where the lower border stands about ${h.num(el(bottom, h.P.method.skyReachKm), 0)} degrees high; the ${h.a('method', 'method page')} gives that rule.</p>

<p>Distance along the ground converts easily into latitude: one degree of latitude spans about 111 km along a meridian. The lower border therefore slips below the horizon for an observer about ${h.num(dBottom / 111.2, 0)} degrees of latitude south of the display, and the red layer for one about ${h.num(dRed / 111.2, 0)} degrees south. That is the size of the band, roughly the width of a couple of states, in which a storm can look red and low while it is green and overhead farther north. Use the mini-simulator to test any distance.</p>
<h2>What the eye sees, and what the camera adds</h2>
<p>Seeing color needs light. In the dark, the retina's rod cells take over; they are far more sensitive than the color cones but do not separate colors at all. SWPC's tutorial is explicit: people who report a white aurora are seeing it with night vision, and the true green and red appear only when the display is fairly bright. Red loses the most, because rods are almost insensitive to it, which is another reason the red glow of a distant storm can go unseen while a phone picks it up.</p>
<p>Cameras do not have that limit. Their pixels sit under red, green and blue filters and add up light for seconds, so even a faint display comes out in color, often more vivid than anyone on the spot saw it. SWPC notes that digital cameras can detect aurora and its colors when it is too dim for the eye. The ${h.a('photograph-northern-lights-phone', 'phone photography guide')} explains how to use that. The Park Service at ${h.ext('https://www.nps.gov/dena/learn/nature/aurora.htm', 'Denali')} gives visitors the same warning in the other direction: photos and time-lapse videos set expectations higher than what eyes alone will see.</p>

<h2>Shapes and heights together</h2>
<p>Color and shape are linked through height. A quiet arc is a thin ribbon of green stretched east to west at the bottom of the emission layer. Rays are tall columns along the magnetic field lines, green at the base and sometimes red at the top, which is why a bright curtain overhead can show both colors at once. During a substorm, SWPC's aurora page describes arcs that brighten, twist and spread across the sky, then break into pulsing patches before dawn; those patches are usually faint and pale to the eye.</p>
<p>Two more details round out the picture. SWPC notes that protons also cause aurora, but a faint, diffuse one that is usually hard to see with the eye. And the northern and southern auroras are mirror images, in the words of its tutorial: when the aurora becomes active in one hemisphere, it becomes active in the other at the same time, because the magnetic field lines that guide the electrons link the two polar regions.</p>
<p>None of this changes the forecast. The colors you can hope for depend on how far the display is from you, which depends on the storm, the Kp, and your magnetic latitude. The ${h.a('northern-lights', 'ranking by town')} gives the Kp each place needs, the ${h.a('geomagnetic-storm-scale', 'storm scale guide')} explains the levels, and the ${h.a('aurora-map', 'aurora map')} shows where the oval is right now.</p>`,
  mini: { kind: 'auroraHeight' },
  related: ['photograph-northern-lights-phone', 'northern-lights', 'geomagnetic-storm-scale', 'aurora-map', 'home'],
  sources: ['swpc_tutorial', 'swpc_aurora', 'swpc_tips', 'swpc_scales'],
});
