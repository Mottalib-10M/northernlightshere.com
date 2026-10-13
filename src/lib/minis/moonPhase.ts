/** New and full moons of a month, and the dark-moon week around the new moon. */
import { moonPhases } from '../engine/astro';
import type { MiniSpec } from '../mini-types';
const MONTHS = Array.from({ length: 15 }, (_, i) => { const d = new Date(Date.UTC(2026, 9 + i, 1)); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 }; });
const dLbl = (ms: number) => new Date(ms).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
export default function moonPhase(): MiniSpec {
  return {
    title: 'When is the Moon out of the way?', cta: 'Check tonight’s answer for your town',
    inputs: [{ id: 'm', label: 'Month', def: 2, options: MONTHS.map((x, i) => ({ value: String(i), label: new Date(Date.UTC(x.y, x.m - 1, 1)).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }) })) }],
    run: (v) => { const x = MONTHS[v.m] ?? MONTHS[0]; const p = moonPhases(x.y, x.m); const nw = p.filter((q) => q.kind === 'new'); const fl = p.filter((q) => q.kind === 'full');
      return { head: ['New moon', nw.length ? nw.map((q) => dLbl(q.ms)).join(' and ') : 'none this month'], rows: [
        ['Full moon', fl.length ? fl.map((q) => dLbl(q.ms)).join(' and ') : 'none this month'],
        ['Darkest week', nw.length ? `${dLbl(nw[0].ms - 3 * 86400000)} to ${dLbl(nw[0].ms + 3 * 86400000)}` : 'see the next month'],
      ], note: 'Dates in UTC from the site’s Moon equations (tested against JPL DE421).' }; },
  };
}
