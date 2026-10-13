/** Darkness, clouds and clear dark hours of a town in a month. arg: { place?: "region/slug" } */
import { darkWindow, darkHours } from '../engine/astro';
import { cloudOf } from '../data';
import { townOptions, townAt, townIndex, parseArg, n0, n1, MONTH_OPTS, METHOD } from './_kit';
import type { MiniSpec } from '../mini-types';
const YEAR = 2027;
export default function darkMonth(arg?: string): MiniSpec {
  const a = parseArg<{ place: string; month: number }>(arg);
  return {
    title: 'How dark, how clear: one town, one month', cta: 'See tonight’s dark hours and forecast',
    inputs: [{ id: 't', label: 'Town', def: townIndex(a.place), options: townOptions() }, { id: 'm', label: 'Month', def: a.month ?? 2, options: MONTH_OPTS }],
    run: (v) => {
      const t = townAt(v.t); const m = v.m;
      const w = darkWindow(YEAR, m, 15, t.lat, t.lon, METHOD.darkSun); const n = darkWindow(YEAR, m, 15, t.lat, t.lon, METHOD.twilightSun);
      const h = Math.min(24, darkHours(w)); const c = cloudOf(t)[m - 1];
      const tm = (ms: number) => new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: t.tz });
      return { head: ['Hours of full darkness on the 15th', w.kind === 'never' ? 'none' : `${n1(h)} h`], rows: [
        ['Dark sky', w.kind === 'night' ? `${tm(w.start!)} to ${tm(w.end!)}` : w.kind === 'always' ? 'all day' : 'the Sun stays above 18° below'],
        ['Including nautical twilight', `${n1(Math.min(24, darkHours(n)))} h`],
        ['Mean cloud amount (NASA POWER)', `${n0(c)}%`],
        ['Clear dark hours on an average night', `${n1(h * (1 - c / 100))} h`],
      ], note: `Computed for ${YEAR}; the hours move by a few minutes from one year to the next.` };
    },
  };
}
