/**
 * The writing kit (`KIT`, passed to every page body as `h`): every figure a page prints is computed here from
 * the data files and the engine, never typed into the text (RECETTE §17.4, point 7).
 */
import { P, METHOD, TOWNS, REGIONS, townRef, regionRef, townsOf, cloudOf, townLabel, type Town } from './data';
import { kpNeeded, kpOverhead, gLevel, viewLatitude, elevationOf } from './engine/aurora';
import { darkWindow, darkHours, moonIllumination } from './engine/astro';
import { num, pct, day, month, listOf } from './fmt';
import CYCLE from '../data/solar-cycle.json';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** Reference year for the "by month" figures: the 15th of each month of 2027. */
export const REF_YEAR = 2027;

const fmtTime = (ms: number, tz: string) => new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz });

export interface PlaceFacts {
  town: Town; label: string; name: string; mlat: number;
  /** Kp needed to see aurora from here (view line), null beyond Kp 9. */
  need: number | null;
  /** Kp at which the oval itself is overhead, null beyond Kp 9. */
  overhead: number | null;
  /** NOAA G level at which the need is met (0 = no storm needed). */
  g: number;
}
export function facts(region: string, slug: string): PlaceFacts {
  const town = townRef(region, slug);
  const need = kpNeeded(town.mlat, METHOD);
  const overhead = kpOverhead(town.mlat, METHOD);
  return { town, label: townLabel(town), name: town.name, mlat: town.mlat, need, overhead, g: need === null ? 6 : gLevel(Math.ceil(need * 3 - 1e-9) / 3) };
}

export interface MonthDark { month: number; name: string; hours: number; kind: 'night' | 'always' | 'never'; start?: string; end?: string; nautical: number; cloud: number; clearDark: number }
/** Astronomical darkness on the 15th of each month (REF_YEAR), mean cloud amount (NASA POWER), and clear dark hours. */
export function monthly(region: string, slug: string): MonthDark[] {
  const t = townRef(region, slug);
  const cloud = cloudOf(t);
  return MONTHS.map((name, i) => {
    const w = darkWindow(REF_YEAR, i + 1, 15, t.lat, t.lon, METHOD.darkSun);
    const n = darkWindow(REF_YEAR, i + 1, 15, t.lat, t.lon, METHOD.twilightSun);
    const hours = Math.min(24, darkHours(w));
    return { month: i + 1, name, hours, kind: w.kind, start: w.kind === 'night' ? fmtTime(w.start!, t.tz) : undefined, end: w.kind === 'night' ? fmtTime(w.end!, t.tz) : undefined,
      nautical: Math.min(24, darkHours(n)), cloud: cloud[i], clearDark: hours * (1 - cloud[i] / 100) };
  });
}
/** Months without any astronomical darkness. */
export const noDarkMonths = (region: string, slug: string) => monthly(region, slug).filter((m) => m.kind === 'never').map((m) => m.name);
/** The three months with the most clear dark hours on average. */
export const bestMonths = (region: string, slug: string, n = 3) => [...monthly(region, slug)].sort((a, b) => b.clearDark - a.clearDark).slice(0, n);
/** Cloudiest and clearest months (NASA POWER cloud amount). */
export const cloudExtremes = (region: string, slug: string) => { const m = monthly(region, slug); const s = [...m].sort((a, b) => a.cloud - b.cloud); return { clearest: s[0], cloudiest: s[s.length - 1] }; };

/** Kp needed, formatted with one decimal, or "beyond 9". */
export const kp = (x: number | null) => (x === null ? 'beyond 9' : num(x, 1));
/** "G2 (Moderate)" for a G level, "no storm" for 0. */
export const gName = (g: number) => (g <= 0 ? 'no storm' : g > 5 ? 'beyond G5' : `G${g} (${P.facts.gScale[g - 1].label})`);

/** Places of a region sorted from the lowest Kp needed to the highest. */
export const ladder = (region: string) => townsOf(region).map((t) => facts(t.region, t.slug)).sort((a, b) => (a.need ?? 99) - (b.need ?? 99));

/** Distance (km) north of the equatorward edge... : how far the view line sits south of the oval edge at a Kp. */
export const viewGapDeg = (k: number) => METHOD.ovalEdgeKp0 - METHOD.ovalStepPerKp * k - viewLatitude(k, METHOD);

export const solar = {
  retrieved: CYCLE.retrieved,
  /** Highest 13-month smoothed sunspot number observed in cycle 25 and its month. */
  peak: (() => { const s = CYCLE.observed.filter((x) => (x.smoothed ?? -1) > 0); return s.reduce((a, b) => ((b.smoothed as number) > (a.smoothed as number) ? b : a)); })(),
  lastSmoothed: (() => { const s = CYCLE.observed.filter((x) => (x.smoothed ?? -1) > 0); return s[s.length - 1]; })(),
  predicted: (m: string) => CYCLE.predicted.find((x) => x.m === m),
  predictedAll: CYCLE.predicted,
};

export const KIT = {
  P, METHOD, TOWNS, REGIONS, townRef, regionRef, townsOf, townLabel, facts, monthly, noDarkMonths, bestMonths, cloudExtremes, ladder, kp, gName,
  num, pct, day, month, listOf, MONTHS, REF_YEAR, solar, elevationOf, viewLatitude, kpNeeded, moonIllumination,
  /** "Kp 6.2, a G2 (Moderate) storm" */
  needText: (f: PlaceFacts) => (f.need === null ? 'more than Kp 9, so only an exceptional storm' : f.need < 0.05 ? 'no storm at all: the oval often sits overhead' : `Kp ${kp(f.need)}${f.g > 0 ? `, a ${gName(f.g)} storm` : ''}`),
};
export type Kit = typeof KIT;
