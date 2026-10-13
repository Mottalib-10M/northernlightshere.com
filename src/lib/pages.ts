/** Registry: every file of src/content/{pages,regions,cities} is loaded here. */
import type { PageDef, RegionDef, CityDef } from './page-types';
import { REGIONS, TOWNS } from './data';
const load = <T,>(mods: Record<string, { default: T }>, check: (file: string, v: T) => void) => Object.entries(mods).map(([f, m]) => { check(f.split('/').pop()!.replace(/\.ts$/, ''), m.default); return m.default; });
export const PAGES: PageDef[] = load(import.meta.glob<{ default: PageDef }>(['../content/pages/*.ts', '!../content/pages/_*.ts'], { eager: true }), (b, p) => { if (p.id !== b) throw new Error(`${b}: id "${p.id}" differs from the file name`); })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const REGION_PAGES: RegionDef[] = load(import.meta.glob<{ default: RegionDef }>(['../content/regions/*.ts', '!../content/regions/_*.ts'], { eager: true }), (b, r) => { if (r.slug !== b) throw new Error(`${b}: slug differs`); if (!REGIONS.some((x) => x.slug === r.slug)) throw new Error(`${b}: unknown region`); })
  .sort((a, b) => REGIONS.findIndex((x) => x.slug === a.slug) - REGIONS.findIndex((x) => x.slug === b.slug));
export const CITY_PAGES: CityDef[] = load(import.meta.glob<{ default: CityDef }>(['../content/cities/*.ts', '!../content/cities/_*.ts'], { eager: true }), (b, c) => { if (`${c.region}--${c.slug}` !== b) throw new Error(`${b}: file must be <region>--<slug>.ts`); if (!TOWNS.some((t) => t.region === c.region && t.slug === c.slug && t.page)) throw new Error(`${b}: not a page town in places.json`); })
  .sort((a, b) => TOWNS.findIndex((t) => t.region === a.region && t.slug === a.slug) - TOWNS.findIndex((t) => t.region === b.region && t.slug === b.slug));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
export const regionId = (slug: string) => `region:${slug}`;
export const cityId = (region: string, slug: string) => `city:${region}/${slug}`;
export const PLACES_INDEX = 'northern-lights';
