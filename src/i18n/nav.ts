import { route, type Locale } from './routes';
import { PAGES, pageById, REGION_PAGES, CITY_PAGES, regionId, cityId } from '../lib/pages';
import { regionRef, townRef } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Northern lights tonight', method: 'How the answer works', about: 'About', widget: 'Embed the forecast', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'forecast', label: 'Forecast tools' },
  { id: 'guides', label: 'Guides' },
];
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const p = pageById(id); if (p) return p.nav;
  if (id.startsWith('region:')) return `Northern lights in ${regionRef(id.slice(7)).name}`;
  if (id.startsWith('city:')) { const [r, s] = id.slice(5).split('/'); return `Northern lights in ${townRef(r, s).name}`; }
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
const placesCat = (lang: Locale): NavCategory => ({ label: 'By place', links: REGION_PAGES.map((r) => ({ href: route(regionId(r.slug), lang), label: regionRef(r.slug).name })) });
export function navCategories(lang: Locale): NavCategory[] {
  return [...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })), placesCat(lang)].filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'States and countries', links: placesCat(lang).links },
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every city page in the footer row: each one is one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => CITY_PAGES.map((c) => ({ href: route(cityId(c.region, c.slug), lang), label: townRef(c.region, c.slug).name }));
