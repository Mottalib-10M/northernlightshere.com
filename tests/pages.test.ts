/**
 * Every page file is checked before the build (CONTRIBUTING-PAGES.md): snippet lengths, answer block, FAQ length
 * and uniqueness, links, sources, banned phrases, prose length, minis.
 * Some pages only: PAGE_FILES=region:michigan,city:michigan/marquette,kp-index npx vitest run tests/pages.test.ts
 */
import { describe, it, expect } from 'vitest';
import { PAGES, REGION_PAGES, CITY_PAGES, regionId, cityId } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers, SOURCES } from '../src/lib/helpers';
import { MINIS } from '../src/lib/mini-specs';
import { ROUTES } from '../src/i18n/routes';
import { regionRef, townRef } from '../src/lib/data';

const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
const pages = only.length ? PAGES.filter((p) => only.includes(p.id)) : PAGES;
const regions = only.length ? REGION_PAGES.filter((p) => only.includes(regionId(p.slug))) : REGION_PAGES;
const cities = only.length ? CITY_PAGES.filter((p) => only.includes(cityId(p.region, p.slug))) : CITY_PAGES;
const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const BANNED = [/—/, /–/, /&mdash;/, /&ndash;/, /it[’']s important to note/i, /dive into/i, /whether you[’']re/i, /in today[’']s world/i, /\bMoreover\b/, /\bAdditionally\b/, /\bFurthermore\b/, /navigat(e|ing) the/i, /\bdelve\b/i, /taxineo/i, /\bINSEAD\b/, /\bMines\b/, /linkedin/i, /\bgame[- ]changer\b/i, /\bunlock\b/i, /breathtaking/i, /\bmagical\b/i, /once[- ]in[- ]a[- ]lifetime/i, /bucket list/i];
const allQ = [...HOME.faqs.map((f) => f.q), ...PAGES.flatMap((p) => p.faqs.map((f) => f.q)), ...REGION_PAGES.flatMap((p) => p.faqs.map((f) => f.q)), ...CITY_PAGES.flatMap((p) => p.faqs.map((f) => f.q))];
const allTitles = [HOME.title, ...PAGES.map((p) => p.title), ...REGION_PAGES.map((p) => p.title), ...CITY_PAGES.map((p) => p.title)];
const allDesc = [HOME.description, ...PAGES.map((p) => p.description), ...REGION_PAGES.map((p) => p.description), ...CITY_PAGES.map((p) => p.description)];
const ids = new Set(ROUTES.map((r) => r.id));
const h = helpers();
const snippet = (title: string, description: string) => {
  expect(title.length, title).toBeGreaterThanOrEqual(50); expect(title.length, title).toBeLessThanOrEqual(60);
  expect(description.length, description).toBeGreaterThanOrEqual(150); expect(description.length, description).toBeLessThanOrEqual(160);
  expect(title).toMatch(/2026/); expect(description).toMatch(/2026/);
  expect(title, 'key term first (RECETTE §11)').not.toMatch(/^(calculator|calculate|how|what|when|why|where|is|can|about|faq|methodology|us |usa|u\.s\.|united states|american|canada|canadian|uk |british)\b/i);
  expect(allTitles.filter((t) => t === title).length, title).toBe(1);
  expect(allDesc.filter((t) => t === description).length, description).toBe(1);
};
const faqCheck = (faqs: Array<{ q: string; a: string }>, min: number, max: number) => {
  expect(faqs.length).toBeGreaterThanOrEqual(min); expect(faqs.length).toBeLessThanOrEqual(max);
  for (const f of faqs) {
    const n = words(f.a); expect(n, f.q).toBeGreaterThanOrEqual(42); expect(n, f.q).toBeLessThanOrEqual(88);
    expect(allQ.filter((q) => q === f.q).length, f.q).toBe(1);
  }
};
const clean = (text: string) => {
  for (const b of BANNED) expect(text, String(b)).not.toMatch(b);
  expect(text).not.toMatch(/NaN|undefined|\[object|Infinity|null\b/);
};
const minis = (html: string) => { for (const m of html.matchAll(/<!--mini:([A-Za-z0-9_-]+)(?:\|([A-Za-z0-9+/=]+))?-->/g)) { expect(MINIS[m[1]], m[1]).toBeTruthy(); const arg = m[2] ? Buffer.from(m[2], 'base64').toString('utf8') : undefined; const spec = MINIS[m[1]](arg); const out = spec.run(Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]))); expect(out.head[1], m[1]).not.toMatch(/NaN|undefined/); } };
const links = (r: string[]) => { expect(r.length).toBeGreaterThanOrEqual(3); for (const x of r) expect(ids.has(x), `related ${x}`).toBe(true); };

describe('home', () => {
  it('snippets, answer block, FAQ, sections', () => {
    snippet(HOME.title, HOME.description);
    expect(words(HOME.resume)).toBeGreaterThanOrEqual(120);
    faqCheck(HOME.faqs, 6, 8);
    const secs = HOME.sections(h);
    expect(secs.length).toBeGreaterThanOrEqual(5);
    clean([HOME.resume, HOME.intro, HOME.ladderIntro(h), ...secs.map((s) => s.title + s.html), ...HOME.faqs.flatMap((f) => [f.q, f.a])].join(' '));
    for (const k of HOME.sources) expect(SOURCES[k], k).toBeTruthy();
  });
});

describe.each(pages.map((p) => [p.id, p] as const))('page %s', (_id, p) => {
  it('snippets (RECETTE §11)', () => { snippet(p.title, p.description); expect(p.slug).toMatch(/^[a-z-]+$/); });
  it('answer block of 120 words or more (RECETTE §21)', () => expect(words(p.resume)).toBeGreaterThanOrEqual(120));
  it('FAQ: 4 to 8, unique, 42 to 88 words (RECETTE §7)', () => faqCheck(p.faqs, 4, 8));
  it('a tool or a mini (RECETTE §9.3), links and sources', () => {
    expect(!!p.tool || !!p.mini).toBe(true);
    if (p.mini) { expect(MINIS[p.mini.kind], p.mini.kind).toBeTruthy(); const s = MINIS[p.mini.kind](p.mini.arg === undefined ? undefined : JSON.stringify(p.mini.arg)); expect(s.run(Object.fromEntries(s.inputs.map((i) => [i.id, i.def]))).head[1]).not.toMatch(/NaN|undefined/); }
    expect(() => p.body(h)).not.toThrow();
    links(p.related);
    expect(p.sources.length).toBeGreaterThanOrEqual(3);
    for (const s of p.sources) expect(!!SOURCES[s], s).toBe(true);
    minis(p.body(h));
  });
  it('no banned phrase, no dash', () => clean([p.title, p.description, p.h1, p.intro, p.resume, p.card, ...p.faqs.flatMap((f) => [f.q, f.a]), p.body(h)].join(' ')));
  it('body length: tools 450+ words, guides 1,000+ words of prose outside tables', () => {
    expect(words(p.body(h).replace(/<table[\s\S]*?<\/table>/g, ''))).toBeGreaterThanOrEqual(p.tool ? 450 : 1000);
  });
});

const place = (kind: string, name: string, d: { title: string; description: string; intro: string; resume: string; faqs: Array<{ q: string; a: string }>; body: (h: never) => string; related: string[] }) => {
  it('snippets: "Northern Lights <place>" first (RECETTE §11)', () => { snippet(d.title, d.description); expect(d.title.startsWith(`Northern Lights ${name}`), d.title).toBe(true); });
  it('answer block of 120 words or more (RECETTE §21)', () => expect(words(d.resume)).toBeGreaterThanOrEqual(120));
  it('FAQ: 3 to 5, unique, 42 to 88 words, place named', () => { faqCheck(d.faqs, 3, 5); for (const f of d.faqs) expect(f.q.includes(name), f.q).toBe(true); });
  it(`prose: 330+ words written for this ${kind}, related pages exist`, () => {
    const b = (d.body as (x: typeof h) => string)(h);
    expect(words(b.replace(/<table[\s\S]*?<\/table>/g, ''))).toBeGreaterThanOrEqual(330);
    links(d.related); minis(b);
  });
  it('no banned phrase, no dash', () => clean([d.title, d.description, d.intro, d.resume, ...d.faqs.flatMap((f) => [f.q, f.a]), (d.body as (x: typeof h) => string)(h)].join(' ')));
};
describe.each(regions.map((p) => [regionId(p.slug), p] as const))('region %s', (_s, p) => place('region', regionRef(p.slug).name === 'United Kingdom' ? 'UK' : regionRef(p.slug).name, p as never));
describe.each(cities.map((p) => [cityId(p.region, p.slug), p] as const))('city %s', (_s, p) => place('city', townRef(p.region, p.slug).name, p as never));

it('slugs are unique', () => { const s = [...PAGES.map((p) => p.slug), ...REGION_PAGES.map((p) => `r/${p.slug}`), ...CITY_PAGES.map((p) => `c/${p.region}/${p.slug}`)]; expect(new Set(s).size).toBe(s.length); });
