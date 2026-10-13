/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a tool or a guide: `src/content/pages/<id>.ts` (PageDef);
 *  - a state, province or country hub: `src/content/regions/<slug>.ts` (RegionDef), route /en/northern-lights/<slug>/;
 *  - a city: `src/content/cities/<region>--<slug>.ts` (CityDef), route /en/northern-lights/<region>/<slug>/.
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }
export interface Helpers extends Kit {
  /** Internal link by page id ("aurora-forecast", "region:michigan", "city:michigan/marquette", "method"). An unknown id fails the test. */
  a: (id: string, text: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  box: (title: string, html: string) => string;
  /** Inline mini-simulator `<!--mini:kind|arg-->`. */
  mini: (kind: string, arg?: unknown) => string;
}
export type Group = 'forecast' | 'guides';
export type ToolKind = 'tonight' | 'nights' | 'kp' | 'dark' | 'map' | 'places';
export interface PageDef {
  id: string;
  group: Group;
  order: number;
  slug: string;
  nav: string;
  card: string;
  /** 50 to 60 characters, key term first, 2026 included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, 2026 included. */
  description: string;
  h1: string;
  intro: string;
  /** ONE paragraph of 120 words or more (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  /** Tool pages: the full calculator, placed before the text. */
  tool?: ToolKind;
  /** Guides: the mini-simulator placed right after the answer block (RECETTE §9.3). */
  mini?: { kind: string; arg?: unknown };
  related: string[];
  sources: string[];
}
export const definePage = (p: PageDef): PageDef => p;

interface PlaceDef {
  title: string;
  description: string;
  /** One sentence under the H1. */
  intro: string;
  resume: string;
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
  extraSources?: Array<{ name: string; url: string }>;
}
export interface RegionDef extends PlaceDef { slug: string }
export interface CityDef extends PlaceDef { region: string; slug: string }
export const defineRegion = (r: RegionDef): RegionDef => r;
export const defineCity = (c: CityDef): CityDef => c;
