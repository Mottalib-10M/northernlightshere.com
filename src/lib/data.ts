/** Places, climate and parameters, read once at build (src/data/*.json, rebuilt by scripts/build-data.py). */
import PLACES from '../data/places.json';
import CLIMATE from '../data/climate.json';
import PARAMS from '../data/params-2026.json';
import type { Method } from './engine/aurora';

export const P = PARAMS;
export const METHOD = PARAMS.method as unknown as Method;
export interface Town { slug: string; name: string; region: string; sub: string; lat: number; lon: number; tz: string; mlat: number; page: boolean }
export interface Region { slug: string; name: string; abbr: string; country: string; default: string }
export const TOWNS = PLACES.towns as Town[];
export const REGIONS = PLACES.regions as Region[];
export const PLACES_META = PLACES.meta;
export const CLIMATE_META = CLIMATE.meta;
export const regionRef = (slug: string): Region => { const r = REGIONS.find((x) => x.slug === slug); if (!r) throw new Error(`Unknown region ${slug}`); return r; };
export const townRef = (region: string, slug: string): Town => { const t = TOWNS.find((x) => x.region === region && x.slug === slug); if (!t) throw new Error(`Unknown town ${region}/${slug}`); return t; };
export const townsOf = (region: string) => TOWNS.filter((t) => t.region === region);
export const cloudOf = (t: Town): number[] => (CLIMATE.cloud as Record<string, number[]>)[`${t.region}/${t.slug}`];
/** "Fairbanks, AK", "Calgary, AB", "Edinburgh, UK". */
export const townLabel = (t: Town) => `${t.name}, ${t.region === 'uk' ? 'UK' : t.sub}`;
