/** SWPC predicted sunspot number for a month, against the observed peak of cycle 25 (snapshot in src/data/solar-cycle.json). */
import CYCLE from '../../data/solar-cycle.json';
import { n0 } from './_kit';
import type { MiniSpec } from '../mini-types';
export default function solarCycle(): MiniSpec {
  const pred = CYCLE.predicted.filter((x) => x.m >= '2026-10');
  const s = CYCLE.observed.filter((x) => (x.smoothed ?? -1) > 0);
  const peak = s.reduce((a, b) => ((b.smoothed as number) > (a.smoothed as number) ? b : a));
  const mlabel = (m: string) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return {
    title: 'Where the solar cycle will be in a given month', cta: 'Tonight’s forecast for your town',
    inputs: [{ id: 'm', label: 'Month', def: 12, options: pred.map((x, i) => ({ value: String(i), label: mlabel(x.m) })) }],
    run: (v) => { const x = pred[v.m] ?? pred[0]; return { head: ['SWPC predicted sunspot number', n0(x.ssn ?? 0)], rows: [
      ['Likely range', `${n0(x.low ?? 0)} to ${n0(x.high ?? 0)}`], [`Cycle 25 peak, ${mlabel(peak.m)}`, n0(peak.smoothed as number)],
      ['Share of the peak', `${n0(((x.ssn ?? 0) / (peak.smoothed as number)) * 100)}%`],
    ], note: `SWPC solar cycle files read on ${CYCLE.retrieved}. Big storms still happen on the way down.` }; },
  };
}
