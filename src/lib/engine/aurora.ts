/**
 * Space weather side of the answer: magnetic latitude, Kp needed, NOAA G scale, OVATION grid, cloud feeds,
 * and the verdict that combines them. Pure functions; the thresholds come from params-2026.json (`method`),
 * passed in by the caller, so that a test can check every rule against its source.
 */

export interface Method {
  /** [Kp, magnetic latitude] pairs: the southernmost magnetic latitude from which aurora is seen at that Kp. */
  viewLine: Array<[number, number]>;
  /** Equatorward edge of the oval at Kp 0 and its shift per Kp step (SWPC: 66 degrees, 2 degrees per step). */
  ovalEdgeKp0: number;
  ovalStepPerKp: number;
  /** Sun altitude below which the sky is dark (deg): -18 astronomical, -12 nautical. */
  darkSun: number;
  twilightSun: number;
  /** Distance (km) within which an OVATION cell counts as "in your sky". */
  skyReachKm: number;
  /** OVATION probability (%) treated as strong / as possible in your sky. */
  ovationStrong: number;
  ovationEdge: number;
  /** Cloud cover (%) at or below which the sky is clear / broken. */
  cloudClear: number;
  cloudBroken: number;
  /** Kp below the need that still counts as "at the edge". */
  edgeKp: number;
  /** A Moon lit at or above this fraction and higher than `moonAltitude` degrees dims a faint display. */
  moonBright: number;
  moonAltitude: number;
}

// ------------------------------------------------------------------ magnetic latitude
export interface Grid { meta: { lat0: number; lat1: number; lon0: number; step: number; scale: number }; rows: Array<Array<number | null>> }

/** Bilinear interpolation in the AACGM grid (1 degree). Null outside the grid. */
export function magLatFromGrid(g: Grid, lat: number, lon: number): number | null {
  const { lat0, lat1, lon0, step, scale } = g.meta;
  if (lat < lat0 || lat > lat1) return null;
  const x = (((lon - lon0) % 360) + 360) % 360 / step;
  const y = (lat - lat0) / step;
  const i0 = Math.floor(x), j0 = Math.min(Math.floor(y), g.rows.length - 2);
  const i1 = (i0 + 1) % g.rows[0].length;
  const fx = x - i0, fy = y - j0;
  const v = [g.rows[j0][i0], g.rows[j0][i1], g.rows[j0 + 1][i0], g.rows[j0 + 1][i1]];
  if (v.some((a) => a === null)) return null;
  const [a, b, c, d] = v as number[];
  return ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy) / scale;
}

// ------------------------------------------------------------------ Kp
/** Published points of the view line, linear between them. */
function viewPoints(kp: number, m: Method): number {
  const L = m.viewLine;
  if (kp <= L[0][0]) return L[0][1];
  for (let i = 1; i < L.length; i++) if (kp <= L[i][0]) { const [k0, a0] = L[i - 1], [k1, a1] = L[i]; return a0 + ((kp - k0) / (k1 - k0)) * (a1 - a0); }
  return L[L.length - 1][1];
}
/** Magnetic latitude down to which aurora is visible at a Kp: the more southern of the published points and of the
 *  oval edge itself (where the aurora is overhead it is visible too), so the line never sits north of the oval. */
export function viewLatitude(kp: number, m: Method): number {
  return Math.min(viewPoints(kp, m), m.ovalEdgeKp0 - m.ovalStepPerKp * Math.max(0, kp));
}

/** Kp at which aurora becomes visible from a magnetic latitude (inverse of the view line); null beyond Kp 9. */
export function kpNeeded(mlat: number, m: Method): number | null {
  if (mlat >= viewLatitude(0, m)) return 0;
  if (mlat < viewLatitude(9, m)) return null;
  let a = 0, b = 9;
  for (let i = 0; i < 50; i++) { const c = (a + b) / 2; if (viewLatitude(c, m) > mlat) a = c; else b = c; }
  return (a + b) / 2;
}

/** Kp at which the edge of the oval itself (aurora overhead) reaches the place; null beyond Kp 9. */
export function kpOverhead(mlat: number, m: Method): number | null {
  const k = (m.ovalEdgeKp0 - mlat) / m.ovalStepPerKp;
  if (k <= 0) return 0;
  return k > 9 ? null : k;
}

/** NOAA G scale of a Kp value: Kp 5 = G1, 6 = G2, 7 = G3, 8 and 9- = G4, 9o = G5. */
export function gLevel(kp: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (kp >= 9 - 1e-6) return 5;
  if (kp >= 7.67 - 1e-6) return 4;
  if (kp >= 6.67 - 1e-6) return 3;
  if (kp >= 5.67 - 1e-6) return 2;
  if (kp >= 4.67 - 1e-6) return 1;
  return 0;
}

/** SWPC writes Kp in thirds: 4.67 is "5-", 5.00 "5o", 5.33 "5+". */
export function kpThirds(kp: number): string {
  const n = Math.round(kp * 3) / 3;
  const base = Math.round(n);
  const d = n - base;
  return d > 0.1 ? `${base}+` : d < -0.1 ? `${base}-` : `${base}`;
}

export interface KpBin { start: number; kp: number; kind: 'observed' | 'estimated' | 'predicted' }

/** SWPC "noaa-planetary-k-index-forecast.json": array of objects (2026 format) or array of arrays (older). */
export function parseKpForecast(json: unknown): KpBin[] {
  if (!Array.isArray(json)) return [];
  const out: KpBin[] = [];
  const add = (t: string, kp: unknown, kind: unknown) => {
    const k = Number(kp); const ms = Date.parse(/Z|[+-]\d\d:?\d\d$/.test(t) ? t : `${t.replace(' ', 'T')}Z`);
    if (Number.isFinite(k) && Number.isFinite(ms)) out.push({ start: ms, kp: k, kind: (String(kind) as KpBin['kind']) || 'predicted' });
  };
  for (const r of json) {
    if (Array.isArray(r)) { if (r[0] === 'time_tag') continue; add(String(r[0]), r[1], r[2]); }
    else if (r && typeof r === 'object') { const o = r as Record<string, unknown>; add(String(o.time_tag), o.kp ?? o.Kp, o.observed); }
  }
  return out.sort((a, b) => a.start - b.start);
}

/** Kp of the 3-hour bin that contains t (null outside the forecast). */
export function kpAt(bins: KpBin[], t: number): number | null {
  for (const b of bins) if (t >= b.start && t < b.start + 3 * 3600000) return b.kp;
  return null;
}

// ------------------------------------------------------------------ OVATION
export interface Ovation { observed: number; forecast: number; grid: Uint8Array }
/** SWPC "ovation_aurora_latest.json": coordinates [lon 0..359, lat -90..90, probability %]. */
export function parseOvation(json: unknown): Ovation | null {
  const o = json as { 'Observation Time'?: string; 'Forecast Time'?: string; coordinates?: number[][] };
  if (!o || !Array.isArray(o.coordinates)) return null;
  const grid = new Uint8Array(360 * 181);
  for (const c of o.coordinates) { const lon = ((Math.round(c[0]) % 360) + 360) % 360; const lat = Math.round(c[1]); if (lat < -90 || lat > 90) continue; grid[lon * 181 + lat + 90] = Math.max(0, Math.min(100, Math.round(c[2]))); }
  return { observed: Date.parse(o['Observation Time'] ?? ''), forecast: Date.parse(o['Forecast Time'] ?? ''), grid };
}
export const ovationAt = (ov: Ovation, lat: number, lon: number) => ov.grid[(((Math.round(lon) % 360) + 360) % 360) * 181 + Math.round(lat) + 90];

const EARTH_KM = 6371;
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}
/** Highest OVATION probability within `reachKm` of the place: the aurora you could see in your sky. */
export function ovationSky(ov: Ovation, lat: number, lon: number, reachKm: number): { overhead: number; sky: number } {
  const overhead = ovationAt(ov, lat, lon);
  let sky = overhead;
  const dLat = Math.ceil(reachKm / 111);
  for (let la = Math.round(lat) - dLat; la <= Math.round(lat) + dLat; la++) {
    if (la < -90 || la > 90) continue;
    const dLon = Math.min(180, Math.ceil(reachKm / (111 * Math.max(0.05, Math.cos((la * Math.PI) / 180)))));
    for (let lo = Math.round(lon) - dLon; lo <= Math.round(lon) + dLon; lo++) {
      if (distanceKm(lat, lon, la, lo) <= reachKm) sky = Math.max(sky, ovationAt(ov, la, lo));
    }
  }
  return { overhead, sky };
}

/** Elevation (deg) above the horizon of a point at `heightKm` seen from `groundKm` away (spherical Earth). */
export function elevationOf(heightKm: number, groundKm: number) {
  const th = groundKm / EARTH_KM;
  const k = EARTH_KM / (EARTH_KM + heightKm);
  return (Math.atan2(Math.cos(th) - k, Math.sin(th)) * 180) / Math.PI;
}

// ------------------------------------------------------------------ clouds
export type CloudSeries = Array<{ t: number; v: number }>;
const iso = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?$/;
/** NWS gridpoint "skyCover": values [{ validTime: "2026-10-12T21:00:00+00:00/PT3H", value: 45 }], expanded hourly. */
export function parseNwsSky(json: unknown): CloudSeries {
  const vals = (json as { properties?: { skyCover?: { values?: Array<{ validTime: string; value: number | null }> } } })?.properties?.skyCover?.values ?? [];
  const out: CloudSeries = [];
  for (const { validTime, value } of vals) {
    if (value === null || value === undefined) continue;
    const [t0, dur] = validTime.split('/'); const start = Date.parse(t0); const m = iso.exec(dur ?? 'PT1H');
    const hours = m ? (Number(m[1] ?? 0) * 24 + Number(m[2] ?? 0) + (m[3] ? 1 : 0)) || 1 : 1;
    for (let h = 0; h < hours; h++) out.push({ t: start + h * 3600000, v: value });
  }
  return out;
}
/** MET Norway Locationforecast 2.0 (compact): properties.timeseries[].data.instant.details.cloud_area_fraction. */
export function parseMetNo(json: unknown): CloudSeries {
  const ts = (json as { properties?: { timeseries?: Array<{ time: string; data: { instant: { details: { cloud_area_fraction?: number } } } }> } })?.properties?.timeseries ?? [];
  return ts.filter((x) => x.data?.instant?.details?.cloud_area_fraction !== undefined).map((x) => ({ t: Date.parse(x.time), v: x.data.instant.details.cloud_area_fraction as number }));
}
/** Cloud cover at t: the value of the last step at or before t, if it is less than 6 hours old. */
export function cloudAt(s: CloudSeries, t: number): number | null {
  let best: { t: number; v: number } | null = null;
  for (const x of s) if (x.t <= t && (!best || x.t > best.t)) best = x;
  return best && t - best.t <= 6 * 3600000 ? best.v : null;
}

// ------------------------------------------------------------------ verdict
export type Answer = 'yes' | 'maybe' | 'no';
export interface HourInput { t: number; kp: number | null; cloud: number | null; sun: number; moonAlt?: number; moonLit?: number; ovationSky?: number | null }
export interface HourResult extends HourInput { activity: 0 | 1 | 2; sky: 0 | 1 | 2; dark: boolean; answer: Answer; margin: number | null; reasons: string[] }

const ANS: Answer[] = ['no', 'maybe', 'yes'];
/** One hour: activity (Kp against the need, or OVATION when it is valid), sky (clouds), darkness, Moon. */
export function rateHour(h: HourInput, need: number | null, m: Method): HourResult {
  const reasons: string[] = [];
  const dark = h.sun <= m.darkSun;
  const twilight = !dark && h.sun <= m.twilightSun;
  let margin: number | null = need === null || h.kp === null ? null : h.kp - need;
  let activity: 0 | 1 | 2 = margin === null ? 0 : margin >= 0 ? 2 : margin >= -m.edgeKp ? 1 : 0;
  if (h.ovationSky !== undefined && h.ovationSky !== null) {
    const o: 0 | 1 | 2 = h.ovationSky >= m.ovationStrong ? 2 : h.ovationSky >= m.ovationEdge ? 1 : 0;
    if (o > activity) { activity = o; reasons.push('ovation'); }
  }
  if (h.kp === null && (h.ovationSky === undefined || h.ovationSky === null)) reasons.push('noKp');
  else if (activity === 0) reasons.push('quiet');
  let sky: 0 | 1 | 2 = h.cloud === null ? 1 : h.cloud <= m.cloudClear ? 2 : h.cloud <= m.cloudBroken ? 1 : 0;
  if (h.cloud === null) reasons.push('noCloud'); else if (sky === 0) reasons.push('cloudy');
  let score = Math.min(activity, sky);
  if (!dark && !twilight) { score = 0; reasons.push('daylight'); }
  else if (twilight) { score = Math.min(score, 1); reasons.push('twilight'); }
  if (score === 2 && h.moonLit !== undefined && h.moonAlt !== undefined && h.moonLit >= m.moonBright && h.moonAlt >= m.moonAltitude && (margin === null || margin < 1)) { score = 1; reasons.push('moon'); }
  return { ...h, activity, sky, dark, margin, answer: ANS[score], reasons };
}

export interface NightResult { answer: Answer; hours: HourResult[]; best: { start: number; end: number } | null; reasons: string[] }
/** The night: the best hourly answer, and the longest run of hours that reach it (ties: the larger Kp margin). */
export function rateNight(hours: HourInput[], need: number | null, m: Method): NightResult {
  const rated = hours.map((h) => rateHour(h, need, m));
  const usable = rated.filter((h) => !h.reasons.includes('daylight'));
  if (!usable.length) return { answer: 'no', hours: rated, best: null, reasons: ['noDark'] };
  const top = Math.max(...usable.map((h) => ANS.indexOf(h.answer)));
  const answer = ANS[top];
  let best: { start: number; end: number; score: number } | null = null;
  let run: HourResult[] = [];
  const close = () => {
    if (!run.length) return;
    const score = run.length * 10 + run.reduce((a, h) => a + (h.margin ?? 0) - (h.cloud ?? 50) / 100, 0);
    if (!best || score > best.score) best = { start: run[0].t, end: run[run.length - 1].t + 3600000, score };
    run = [];
  };
  for (const h of rated) { if (h.answer === answer && !h.reasons.includes('daylight')) run.push(h); else close(); }
  close();
  const reasons = Array.from(new Set(usable.filter((h) => h.answer === answer).flatMap((h) => h.reasons)));
  const b = best as { start: number; end: number } | null;
  return { answer, hours: rated, best: top === 0 ? null : b ? { start: b.start, end: b.end } : null, reasons };
}
