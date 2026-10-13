/**
 * Assembles one night at one place: the hours between the end and the start of nautical twilight, each with
 * the Sun, the Moon, the Kp of its three-hour bin, the cloud cover and, for the hour that is happening now,
 * OVATION. Then rates it with `rateNight`. Pure: the caller passes "now" and the feeds.
 */
import { darkWindow, sunAltitude, moonAltitude, moonIllumination, type DarkWindow } from './astro';
import { kpAt, cloudAt, ovationSky, kpNeeded, rateNight, type KpBin, type CloudSeries, type Ovation, type Method, type HourInput, type NightResult } from './aurora';

export interface PlaceLite { lat: number; lon: number; tz: string; mlat: number | null }
export interface NightInput { place: PlaceLite; date: [number, number, number]; now: number; kp?: KpBin[] | null; kpManual?: number | null; clouds?: CloudSeries | null; cloudManual?: number | null; ovation?: Ovation | null }
export interface Night extends NightResult { date: [number, number, number]; astro: DarkWindow; nautical: DarkWindow; need: number | null; kpMax: number | null; cloudMean: number | null; moonLit: number; ovationNow: { overhead: number; sky: number } | null }

/** Calendar date [y, m, d] of a time in a time zone. */
export function dateIn(ms: number, tz: string): [number, number, number] {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ms)).split('-').map(Number);
  return [p[0], p[1], p[2]];
}
export const hourIn = (ms: number, tz: string) => Number(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hourCycle: 'h23' }).format(new Date(ms)));
/** "Tonight" at a place: before 6 am local, the night that is still going on (the previous date). */
export function tonight(now: number, tz: string, offset = 0): [number, number, number] {
  const back = hourIn(now, tz) < 6 ? -1 : 0;
  const [y, m, d] = dateIn(now, tz);
  const t = new Date(Date.UTC(y, m - 1, d + back + offset));
  return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()];
}

export function buildNight(i: NightInput, M: Method): Night {
  const { lat, lon, mlat } = i.place;
  const [y, m, d] = i.date;
  const astro = darkWindow(y, m, d, lat, lon, M.darkSun);
  const nautical = darkWindow(y, m, d, lat, lon, M.twilightSun);
  const need = mlat === null ? null : kpNeeded(mlat, M);
  const hours: HourInput[] = [];
  if (nautical.kind !== 'never' && nautical.start !== undefined && nautical.end !== undefined) {
    const start = Math.floor(nautical.start / 3600000) * 3600000;
    for (let t = start; t < nautical.end; t += 3600000) {
      const mid = Math.max(t, nautical.start) + Math.min(30 * 60000, (Math.min(t + 3600000, nautical.end) - Math.max(t, nautical.start)) / 2);
      const ovValid = i.ovation && i.now >= t - 30 * 60000 && i.now < t + 3600000 && i.now <= i.ovation.forecast + 30 * 60000;
      hours.push({
        t, sun: sunAltitude(mid, lat, lon),
        kp: i.kpManual ?? (i.kp ? kpAt(i.kp, mid) : null),
        cloud: i.cloudManual ?? (i.clouds ? cloudAt(i.clouds, mid) : null),
        moonAlt: moonAltitude(mid, lat, lon), moonLit: moonIllumination(mid).fraction,
        ovationSky: ovValid ? ovationSky(i.ovation!, lat, lon, M.skyReachKm).sky : null,
      });
    }
  }
  const r = rateNight(hours, need, M);
  const darkHrs = r.hours.filter((h) => !h.reasons.includes('daylight'));
  const kps = darkHrs.map((h) => h.kp).filter((x): x is number => x !== null);
  const cl = darkHrs.map((h) => h.cloud).filter((x): x is number => x !== null);
  const midNight = astro.kind === 'night' ? (astro.start! + astro.end!) / 2 : nautical.kind === 'night' ? (nautical.start! + nautical.end!) / 2 : Date.UTC(y, m - 1, d, 12) - (lon / 15) * 3600000 + 12 * 3600000;
  const ovNow = i.ovation && i.now <= i.ovation.forecast + 30 * 60000 ? ovationSky(i.ovation, lat, lon, M.skyReachKm) : null;
  return { ...r, date: i.date, astro, nautical, need, kpMax: kps.length ? Math.max(...kps) : null, cloudMean: cl.length ? cl.reduce((a, b) => a + b, 0) / cl.length : null, moonLit: moonIllumination(midNight).fraction, ovationNow: ovNow };
}
