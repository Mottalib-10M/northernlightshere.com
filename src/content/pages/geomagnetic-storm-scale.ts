import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = K.P.facts.gScale;
const st = K.facts('minnesota', 'st-cloud');
const cb = K.facts('maine', 'caribou');

export default definePage({
  id: 'geomagnetic-storm-scale',
  group: 'guides',
  order: 40,
  slug: 'geomagnetic-storm-scale',
  nav: 'G1 to G5 storms explained',
  card: 'What each NOAA storm level means for the aurora, and how often it comes',
  title: 'Geomagnetic Storm Scale 2026: G1 to G5, Where Aurora Shows',
  description: 'Geomagnetic storm scale in 2026: what G1 to G5 mean, the Kp behind each level, how often NOAA says they come per solar cycle and where aurora was seen in each.',
  h1: 'Geomagnetic storms from G1 to G5: what each level means for the aurora',
  intro: 'NOAA grades geomagnetic storms like hurricanes. For a sky watcher, each step down the scale moves the aurora toward the equator and makes it rarer.',
  resume: `NOAA's geomagnetic storm scale has five levels tied to the planetary Kp index: G1 (minor) at Kp 5, G2 (moderate) at Kp 6, G3 (strong) at Kp 7, G4 (severe) at Kp 8 including 9-, and G5 (extreme) at Kp 9. For each level the NOAA Space Weather Scales list the effects on power grids, satellites and radio, the average number of storms per eleven-year solar cycle, and where aurora has been seen: commonly at high latitudes such as northern Michigan and Maine at G1, as low as ${G[1].seen} at G2, ${G[2].seen} at G3, ${G[3].seen} at G4 and ${G[4].seen} at G5. Frequency falls fast: about ${G[0].perCycle.toLocaleString('en-US')} G1 storms per cycle, ${G[2].perCycle} G3, and only ${G[4].perCycle} G5. For a town like St. Cloud, Minnesota, which needs about Kp ${K.kp(st.need)}, that is the difference between dozens of chances a year and a handful.`,
  faqs: [
    { q: 'What does a G1 geomagnetic storm mean for the northern lights?', a: 'A G1 storm, Kp 5, is the first level of the NOAA scale. NOAA says aurora is then commonly visible at high latitudes such as northern Michigan and Maine. It is the most frequent storm level, about 1,700 per solar cycle, and for the northern tier of the lower 48 it is the level that turns a quiet night into a possible one.' },
    { q: 'Is a G3 storm good for seeing the aurora?', a: `Yes, for a large part of the northern United States. NOAA lists G3, Kp 7, as the level at which aurora has been seen as low as Illinois and Oregon, around ${G[2].mlat} degrees magnetic latitude. About ${G[2].perCycle} such storms happen per eleven-year cycle, spread over roughly ${G[2].days} days, so several a year near solar maximum.` },
    { q: 'How rare is a G5 extreme geomagnetic storm?', a: `NOAA counts about ${G[4].perCycle} per solar cycle, about ${G[4].days} days in eleven years. A G5 storm can bring aurora as low as Florida and southern Texas. The storm of May 10 and 11, 2024 reached G5, the first such storm since October 2003 according to SWPC; most people in the United States who saw aurora that night had never seen it before.` },
    { q: 'What is the difference between a G4 and a G5 storm?', a: 'One third of a Kp unit at the top of the scale. G4 covers Kp 8 and 9-, which is 8.67; G5 begins at Kp 9 exactly. The consequences differ more: NOAA warns of possible widespread voltage control problems at G4 and of possible grid collapse or blackouts at G5. For the aurora, G4 has brought it as low as Alabama and northern California.' },
    { q: 'Does a storm watch mean I will see aurora?', a: 'No. SWPC issues a watch when it expects a given storm level on a given day, usually after a coronal mass ejection, and a warning when the storm is imminent. The arrival time can be off by hours and the storm can end up weaker. Watches are a reason to check the forecast for your town on the night, not a promise of a show.' },
  ],
  body: (h) => `
<h2>The five levels, as NOAA writes them</h2>
${h.table(['Level', 'Kp', 'Aurora has been seen as low as', 'Typical magnetic latitude', 'Storms per cycle'], G.map((x) => [`G${x.g} ${x.label}`, x.kp, x.seen, x.mlat === null ? 'not stated' : `${x.mlat}°`, x.perCycle.toLocaleString('en-US')]), 'Source: NOAA Space Weather Scales, geomagnetic storms (frequencies are averages over an eleven-year cycle).', ['l', 'l', 'l', 'r', 'r'])}
<p>The scale was introduced so that the public could read space weather the way it reads hurricane categories. Its physical measure is Kp alone. That is why SWPC's three-day forecast prints a G label next to any block forecast at Kp 5- or higher: the label is simply the Kp, translated. The ${h.src('swpc_scales', 'NOAA Space Weather Scales')} also cover radiation storms (S) and radio blackouts (R), which are different phenomena with no direct link to the aurora.</p>
<h2>Reading a storm level for your own town</h2>
<p>The latitudes in the table describe where the aurora has been seen, low on the northern horizon, not where it was overhead. They are also the backbone of this site's view line from Kp 6 to 9. Between Kp 6 and Kp 9 the line drops ${h.num(G[1].mlat - G[4].mlat, 0)} degrees of magnetic latitude, about ${h.num(G[1].mlat - G[2].mlat, 0)} per level, so each extra level adds a band of states. Caribou, at the top of Maine, needs about Kp ${h.kp(cb.need)}, a ${h.gName(cb.g)} storm. The mini-simulator above lists what each level brings, and the ${h.a('kp-index', 'Kp index page')} turns any town into its threshold.</p>
<h2>Where storms come from</h2>
<p>G3 and stronger storms are almost always caused by coronal mass ejections, clouds of magnetized plasma that SWPC describes as a billion tons leaving the Sun at up to a million miles per hour. SWPC notes that the fastest Earth-directed ones arrive in as little as 15 to 18 hours, while slower ones take several days. Moderate storms, G1 and G2, also come from high-speed streams out of coronal holes, which return with the Sun's 27-day rotation. Both are most frequent in the years around solar maximum, and big storms keep coming during the decline, as the ${h.a('solar-cycle', 'solar cycle guide')} shows.</p>
<h2>What the storm level does not tell you</h2>
<p>A G level is a three-hour value for the whole planet. It says nothing about the hour of the peak, which may fall in your daytime, nor about the clouds. It also hides the finer structure: a G2 block can contain a twenty-minute substorm brighter than a whole G3 night. For an evening decision, the useful sequence is the watch from SWPC a day or two ahead, then the ${h.a('aurora-forecast', 'three-night forecast')} for your town, then the ${h.a('aurora-map', 'OVATION map')} once the storm has started.</p>`,
  mini: { kind: 'gScale' },
  related: ['kp-index', 'aurora-forecast', 'solar-cycle', 'home', 'northern-lights'],
  sources: ['swpc_scales', 'swpc_storms', 'swpc_cme', 'swpc_kp', 'swpc_3day'],
});
