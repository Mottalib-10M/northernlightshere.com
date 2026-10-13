import { it } from 'vitest';
import { REGION_PAGES, CITY_PAGES, PAGES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<table[\s\S]*?<\/table>/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
it('w', () => { const h = { ...helpers(), a: (_: string, t: string) => t } as never;
  for (const p of [...REGION_PAGES.map((r) => ['r:' + r.slug, r]), ...CITY_PAGES.map((c) => ['c:' + c.region + '/' + c.slug, c])] as Array<[string, { body: (h: never) => string; resume: string }]>) { const n = words(p[1].body(h)); if (n < 360) console.log('WORDS', p[0], n, words(p[1].resume)); }
  for (const p of PAGES) { const n = words(p.body(h)); if (n < (p.tool ? 470 : 1020)) console.log('WORDS', p.id, n); } });
