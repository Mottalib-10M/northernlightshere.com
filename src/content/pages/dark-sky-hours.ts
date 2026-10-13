import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const fb = K.monthly('alaska', 'fairbanks');
const ed = K.monthly('uk', 'edinburgh');
const mn = K.monthly('minnesota', 'minneapolis');

export default definePage({
  id: 'dark-sky-hours',
  group: 'forecast',
  order: 40,
  slug: 'dark-sky-hours',
  nav: 'Dark sky hours tonight',
  card: 'When the Sun is 18° below your horizon, tonight and the next 30 nights, with the Moon',
  title: 'Dark Sky Hours 2026: When It Gets Truly Dark Tonight',
  description: 'Dark sky hours for 2026: when the Sun sinks 18° below your horizon tonight and on the next 30 nights, for any US town or ZIP code, with the Moon at midnight.',
  h1: 'Dark sky hours: when it gets truly dark tonight',
  intro: 'Sunset is not darkness. Full darkness begins when the Sun is 18 degrees below the horizon, sometimes two hours later, and in the far north some nights never get there.',
  resume: `Astronomers call the sky fully dark once the centre of the Sun is more than 18 degrees below the horizon: the last glow of twilight is gone and the faintest objects, a weak aurora among them, can show. This tool computes that moment and the moment the sky starts to brighten again, for the place and the night you choose, from the same solar equations as the NOAA solar calculator, tested on this site against the JPL DE421 ephemeris to within two minutes. In Minneapolis on ${K.MONTHS[11]} 15 the dark sky lasts ${K.num(mn[11].hours, 1)} hours and on ${K.MONTHS[5]} 15 only ${K.num(mn[5].hours, 1)}. Fairbanks gets ${K.num(fb[11].hours, 1)} hours in mid-December and none at all from ${fb.filter((m) => m.kind === 'never')[0].name} to ${fb.filter((m) => m.kind === 'never').slice(-1)[0].name}. The table under the result gives the next seven nights and whether the Moon is up in the middle of each.`,
  faqs: [
    { q: 'What is astronomical twilight?', a: 'It is the last stage of dusk, while the Sun is between 12 and 18 degrees below the horizon. The sky looks dark to most people but still holds a faint glow toward the west. Once the Sun passes 18 degrees down the night is astronomically dark. Before that come civil twilight, down to 6 degrees, and nautical twilight, down to 12.' },
    { q: 'Can I see the northern lights during twilight?', a: 'A strong display, yes: bright arcs show well in nautical twilight, and photographers like the blue they keep in the sky. A faint one, no. That is why the forecast on this site lets twilight hours reach maybe but never yes. In June at high latitudes, twilight is all there is, so only big storms show.' },
    { q: 'Why does it never get dark in summer in Alaska and Scotland?', a: `Because the Sun does not sink far enough below the horizon. At ${K.num(K.townRef('alaska', 'fairbanks').lat, 0)} degrees north, Fairbanks keeps the Sun within 18 degrees of the horizon all night for weeks around the June solstice; Edinburgh, at ${K.num(K.townRef('uk', 'edinburgh').lat, 0)} degrees, has no full darkness in ${K.listOf(ed.filter((m) => m.kind === 'never').map((m) => m.name))}. The aurora is still there, invisible in the bright sky.` },
    { q: 'Does daylight saving time change the dark hours?', a: 'It changes the clock times, not the darkness. When clocks move forward in March, full darkness starts an hour later on the clock than the evening before. The tool computes in Universal Time and converts to the time zone of the place, daylight saving included, so the times shown are the ones on your phone.' },
  ],
  body: (h) => `
<h2>How the dark window is computed</h2>
<p>For each night the tool starts at local mean solar noon, the moment the Sun crosses your meridian on average, and steps through the next 24 hours five minutes at a time, computing the Sun's altitude from its declination and the equation of time, the method published by the ${h.src('noaa_solcalc', 'NOAA Global Monitoring Laboratory')}. When the altitude crosses ${h.P.method.darkSun} degrees, the crossing is refined to the second. The same is done at ${h.P.method.twilightSun} degrees for nautical twilight. If the Sun never goes below the threshold the night is reported as having no darkness; if it never comes back above it, as polar night.</p>
<p>Refraction, the bending of light that lifts the Sun near the horizon, is left out: at 18 degrees below it does not apply. The result is accurate to a minute or two, which is far below the hour-by-hour resolution of the aurora forecast.</p>
<h2>Why darkness decides more nights than Kp</h2>
<p>Over a year, the places with the most aurora are also the ones with the shortest nights in summer. A town in the northern lower 48 gets roughly twice as many dark hours in December as in June, and the far north gets none in June. Add the cloud climate, and the clear dark hours of a month, the figure on every state and city page, vary more than the aurora itself. In Minneapolis the clearest dark month by that measure is ${h.bestMonths('minnesota', 'minneapolis', 1)[0].name}; in Fairbanks it is ${h.bestMonths('alaska', 'fairbanks', 1)[0].name}. The ${h.a('best-time-northern-lights', 'best time guide')} goes through the seasons and the equinox effect.</p>
<h2>The Moon in the table</h2>
<p>The last column says whether the Moon is above the horizon at the middle of the dark window, from the low-precision lunar formulas of the Astronomical Almanac. The Moon does not stop the aurora, but SWPC notes that a full Moon lowers its apparent brightness, and on the edge of your range it is often the difference between a glow you notice and one you miss. Moon-free nights around the new Moon are the ones to aim for when you have a choice.</p>`,
  tool: 'dark',
  related: ['home', 'best-time-northern-lights', 'aurora-forecast', 'region:alaska', 'city:uk/edinburgh'],
  sources: ['noaa_solcalc', 'swpc_tips', 'swpc_aurora', 'census_gazetteer'],
});
