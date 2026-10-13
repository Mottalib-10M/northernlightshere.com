import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import CYCLE from '../../data/solar-cycle.json';

const S = K.solar;
const peak = S.peak;
const last = S.lastSmoothed;
const pk = peak.smoothed as number;
const now = S.predicted('2026-10')!;
const nextYear = S.predicted('2027-10')!;
const end = S.predictedAll[S.predictedAll.length - 1];
const half = S.predictedAll.find((x) => (x.ssn ?? 0) < pk / 2);
const raw = CYCLE.observed.filter((x) => x.m > last.m);
const rawLast = raw[raw.length - 1];
const octs = S.predictedAll.filter((x) => x.m.endsWith('-10') || x.m === end.m);
const G = K.P.facts.gScale;
const storm = K.P.facts.storms[0];
const n0 = (x: number) => K.num(x, 0);
const share = (x: number) => `${n0((x / pk) * 100)}%`;

export default definePage({
  id: 'solar-cycle',
  group: 'guides',
  order: 50,
  slug: 'solar-cycle',
  nav: 'Solar cycle 25',
  card: 'Where the 11-year cycle stands, what SWPC predicts, and why storms outlast the peak',
  title: 'Solar Cycle 25 in 2026: Peak Passed, What It Means for Aurora',
  description: `Solar cycle 25 in 2026: the smoothed sunspot number peaked at ${n0(pk)} in ${K.month(peak.m)}; SWPC predicts about ${n0(now.ssn ?? 0)} now. Why aurora storms still come.`,
  h1: 'Solar cycle 25: past the peak, still producing storms',
  intro: 'The Sun’s 11-year cycle sets how often big storms come. Cycle 25 has passed its maximum, and the decline is not the end of the aurora season.',
  resume: `Solar cycle 25 passed its maximum in ${K.month(peak.m)}, when the 13-month smoothed sunspot number reached ${n0(pk)}, according to the SWPC solar cycle files read on ${K.day(S.retrieved)}. The latest smoothed value, for ${K.month(last.m)}, is ${n0(last.smoothed as number)}, and SWPC's prediction puts the sunspot number near ${n0(now.ssn ?? 0)} in October 2026, with a likely range of ${n0(now.low ?? 0)} to ${n0(now.high ?? 0)}, then about ${n0(nextYear.ssn ?? 0)} a year later and ${n0(end.ssn ?? 0)} by ${K.month(end.m)}. A declining cycle does not mean the end of storms. Large active regions keep producing coronal mass ejections for years after the peak, and the coronal holes that send fast solar wind streams tend to become more prominent on the way down. The G5 storm of ${K.day(storm.date)} came before this cycle's smoothed peak; the October 2003 storms it was compared with came in the decline of the previous cycle. For the northern United States, 2026 to 2028 remain good years to watch.`,
  faqs: [
    { q: 'When did solar cycle 25 reach its maximum?', a: `On the smoothed sunspot number that SWPC plots, in ${K.month(peak.m)}, at ${n0(pk)}. A smoothed value averages thirteen months, so a peak can only be confirmed about six months later, and SWPC calls the most recent six months preliminary. Monthly values were high both before and after that date, which is why the maximum felt like a plateau of two years rather than a single month.` },
    { q: 'Will there still be northern lights after the solar maximum?', a: `Yes. Strong storms keep coming during the declining phase, from big active regions that remain and from fast solar wind out of coronal holes. SWPC predicts a sunspot number of about ${n0(now.ssn ?? 0)} for October 2026, still ${share(now.ssn ?? 0)} of the peak. The October 2003 storms, among the largest on record, came well after the maximum of cycle 23.` },
    { q: 'When will the next solar minimum be?', a: `SWPC's prediction falls to about ${n0(end.ssn ?? 0)} by ${K.month(end.m)}, the end of its published table, which points to a minimum around the end of the decade. SWPC writes that solar cycle 26 is expected to begin some time between January 2029 and December 2032 and that it does not yet produce a prediction for that cycle.` },
    { q: 'Was solar cycle 25 stronger than forecast?', a: `Yes. The panel convened in 2019 by NOAA, NASA and the International Space Environment Service predicted a maximum of 115 around July 2025, within a range of 105 to 125. The observed smoothed peak reached ${n0(pk)}. SWPC has since replaced that forecast with an updated prediction refitted every month to the observed values.` },
    { q: 'What does the sunspot number have to do with aurora?', a: 'Sunspots mark active regions, where intense magnetic fields store the energy released in flares and coronal mass ejections. CMEs drive the strongest geomagnetic storms, the ones that bring aurora deep into the United States. More spots means more chances for such eruptions, which is why SWPC says the cycle prediction gives a rough idea of how often space weather storms of all types will occur.' },
  ],
  body: (h) => `
<h2>Where cycle 25 stands in 2026</h2>
<p>The solar cycle is counted in sunspots. SWPC's ${h.src('swpc_cycle', 'Solar Cycle Progression')} page plots the monthly International Sunspot Number from the Royal Observatory of Belgium, and a smoothed version that averages it over thirteen months to remove the month to month noise. Cycle 24 ended and cycle 25 began in December 2019. The smoothed number climbed through 2022 and 2023 and reached ${h.num(pk, 1)} in ${h.month(peak.m)}, the highest value of the cycle in the files read on ${h.day(S.retrieved)}.</p>
<p>The smoothing has a cost: it needs six months of data on each side, so the latest smoothed value is always about half a year old. In those files it is ${h.num(last.smoothed as number, 1)} for ${h.month(last.m)}, ${share(last.smoothed as number)} of the peak. The raw monthly numbers after that are noisier; the last one, for ${h.month(rawLast.m)}, is ${h.num(rawLast.ssn, 1)}. SWPC flags the latest six months as preliminary.</p>
<p>The cycle was stronger than expected. In 2019 a panel convened by NOAA, NASA and the International Space Environment Service predicted a peak of 115 in July 2025, with a range of 105 to 125 between November 2024 and March 2026. The observed peak came inside that time window but well above the range, and in February 2025 SWPC replaced the panel's curve with an updated prediction, refitted each month to the observed values.</p>

<h2>What SWPC predicts for the next years</h2>
<p>SWPC's prediction fits a curve with the average shape of past cycles to the observations, taking into account that stronger cycles tend to rise faster. Its uncertainty bands come from running the same method on earlier cycles at the same stage and measuring how far off it was. The table shows the predicted sunspot number for October of each year and the end of the published table, with the band SWPC gives as the likely range.</p>
${h.table(['Month', 'Predicted sunspot number', 'Likely range', 'Share of the cycle 25 peak'], octs.map((x) => [h.month(x.m), n0(x.ssn ?? 0), `${n0(x.low ?? 0)} to ${n0(x.high ?? 0)}`, share(x.ssn ?? 0)]), `Source: SWPC predicted solar cycle file, read on ${h.day(S.retrieved)}.`, ['l', 'r', 'r', 'r'])}
<p>On this prediction the cycle falls below half its peak ${half ? `around ${h.month(half.m)}` : 'after the end of the table'}, and toward single digits by the end of the decade. SWPC expects solar cycle 26 to begin some time between January 2029 and December 2032 and does not yet forecast its strength. The mini-simulator above gives the predicted value and its range for any month to the end of the table.</p>
<p>A sunspot number is not a storm forecast. SWPC writes that its cycle prediction gives a rough idea of how often space weather storms of all types will occur, and it is used that way by satellite operators and power companies. It cannot say whether a given month will bring a G4 storm.</p>

<h2>Why the aurora does not stop on the way down</h2>
<p>Two different sources drive geomagnetic storms, and they do not follow the cycle in the same way. The first is the coronal mass ejection, a cloud of magnetized plasma blown off the Sun, usually from the complex active regions around sunspot groups. ${h.src('swpc_cme', 'SWPC')} describes CMEs leaving the Sun at speeds from below 250 km/s to nearly 3,000 km/s; the fastest ones reach Earth in as little as 15 to 18 hours. The ${h.src('swpc_storms', 'geomagnetic storms page')} credits them with the largest storms. Active regions grow rarer as the cycle declines, but the ones that do appear can still be large and complex, and a single eruption is enough for a G4 or G5 night.</p>
<p>The second source is the high-speed stream of solar wind from coronal holes, which ${h.src('swpc_wind', 'SWPC')} puts at 500 to 800 km/s against about ${h.P.facts.slowWindKms} km/s for the ordinary slow wind. When a fast stream overtakes slow wind, it builds a compressed region of strong magnetic field. SWPC says the storms from these regions are less intense than CME storms but can deposit more energy over a longer interval. Coronal holes reaching toward the Sun's equator are a familiar feature of the declining years, and because the Sun rotates in about 27 days, a stream that produced a G1 or G2 storm once often returns four weeks later.</p>
<p>History backs this up. The storms of October 2003, among the largest of the space age, came in the decline of cycle 23, years after its maximum. In the current cycle, the G5 storm of ${h.day(storm.date)} came several months before the smoothed peak. NOAA's ${h.src('swpc_scales', 'storm scale')} counts about ${G[3].perCycle} G4 storms and ${G[4].perCycle} G5 storms per cycle on average, spread unevenly across its eleven years.</p>

<h2>What it means for watching in 2026 to 2028</h2>
<p>For the northern tier of the United States, where a G1 or G2 storm is usually what it takes, the next two or three years remain a good period. Recurring high-speed streams are well suited to that level, and their 27-day rhythm makes them partly predictable: SWPC's 27-day outlook marks the days when a known stream is due back. For the rarer G3 to G5 storms that reach the central states, the odds fall slowly as active regions thin out, but they do not reach zero until the Sun is close to minimum.</p>
<p>In practice nothing changes in the method: the forecast for your town reads the Kp forecast and the clouds of the night, whatever the phase of the cycle. The ${h.a('geomagnetic-storm-scale', 'storm scale guide')} explains what each level brings, the ${h.a('solar-wind-bz', 'solar wind guide')} shows how a storm announces itself an hour ahead, and the ${h.a('aurora-forecast', 'three-night forecast')} tells you whether the next storm reaches you.</p>`,
  mini: { kind: 'solarCycle' },
  related: ['geomagnetic-storm-scale', 'solar-wind-bz', 'best-time-northern-lights', 'aurora-forecast', 'kp-index'],
  sources: ['swpc_cycle', 'swpc_cme', 'swpc_storms', 'swpc_wind', 'swpc_scales', 'swpc_27day'],
});
