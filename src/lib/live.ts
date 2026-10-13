/**
 * Live feeds, called from the visitor's browser only (never at build, never through our server):
 *  - NOAA SWPC Kp forecast and OVATION grid: public domain, CORS open (Access-Control-Allow-Origin: *);
 *  - National Weather Service gridpoint sky cover for US places: public domain, CORS open;
 *  - MET Norway Locationforecast cloud fraction elsewhere (and as the US fallback): CC BY 4.0, CORS open
 *    for low-volume sites that identify themselves by their Origin, which the browser sends.
 * Conditions read on 2026-10-12, quoted in CONTRIBUTING-PAGES.md. Each call fails soft: the tool then asks
 * the visitor for the missing figure instead of inventing it.
 */
import { parseKpForecast, parseOvation, parseNwsSky, parseMetNo, type KpBin, type Ovation, type CloudSeries, type Grid } from './engine/aurora';

const TIMEOUT = 15000;
async function getJson(url: string): Promise<unknown> {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { signal: c.signal, headers: { Accept: 'application/json, application/geo+json' } });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return await r.json();
  } finally { clearTimeout(id); }
}
const memo = new Map<string, Promise<unknown>>();
const once = <T,>(key: string, f: () => Promise<T>): Promise<T> => { if (!memo.has(key)) memo.set(key, f().catch((e) => { memo.delete(key); throw e; })); return memo.get(key) as Promise<T>; };

export const SWPC_KP = 'https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json';
export const SWPC_OVATION = 'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json';

export const loadKp = (): Promise<KpBin[]> => once('kp', async () => { const b = parseKpForecast(await getJson(SWPC_KP)); if (!b.length) throw new Error('empty Kp'); return b; });
export const loadOvation = (): Promise<Ovation> => once('ov', async () => { const o = parseOvation(await getJson(SWPC_OVATION)); if (!o) throw new Error('empty OVATION'); return o; });
export const loadGrid = (): Promise<Grid> => once('grid', () => getJson('/geo/aacgm-grid.json') as Promise<Grid>);
export const loadZip = (zip: string): Promise<[number, number] | null> => once(`zip${zip.slice(0, 2)}`, () => getJson(`/zip/${zip.slice(0, 2)}.json`) as Promise<Record<string, [number, number]>>).then((m) => m[zip] ?? null).catch(() => null);

export interface Clouds { series: CloudSeries; source: 'nws' | 'metno'; tz?: string }
const inUS = (lat: number, lon: number) => lat > 18 && lat < 72 && lon > -180 && lon < -64;
export function loadClouds(lat: number, lon: number): Promise<Clouds> {
  const la = lat.toFixed(4), lo = lon.toFixed(4);
  return once(`cl${la},${lo}`, async () => {
    if (inUS(lat, lon)) {
      try {
        const pt = (await getJson(`https://api.weather.gov/points/${la},${lo}`)) as { properties?: { forecastGridData?: string; timeZone?: string } };
        const g = pt.properties?.forecastGridData;
        if (g) { const s = parseNwsSky(await getJson(g)); if (s.length) return { series: s, source: 'nws', tz: pt.properties?.timeZone }; }
      } catch { /* fall back to MET Norway */ }
    }
    const s = parseMetNo(await getJson(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`));
    if (!s.length) throw new Error('no clouds');
    return { series: s, source: 'metno' };
  });
}
