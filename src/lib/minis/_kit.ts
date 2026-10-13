/** Shared helpers of the mini-simulators (not a mini itself: the leading underscore keeps it out of the registry). */
import { TOWNS, METHOD, townLabel, type Town } from '../data';
import { formatNumber } from '../format';
export const n0 = (x: number) => formatNumber(x, 0);
export const n1 = (x: number) => formatNumber(x, 1);
const SORTED = [...TOWNS].sort((a, b) => townLabel(a).localeCompare(townLabel(b)));
export const townOptions = (region?: string) => SORTED.map((t, i) => ({ t, i })).filter((x) => !region || x.t.region === region).map((x) => ({ value: String(x.i), label: townLabel(x.t) }));
export const townAt = (i: number): Town => SORTED[i] ?? SORTED[0];
export const townIndex = (key?: string) => { const i = SORTED.findIndex((t) => `${t.region}/${t.slug}` === key); return i < 0 ? SORTED.findIndex((t) => t.slug === 'minneapolis') : i; };
export const parseArg = <T,>(arg?: string): Partial<T> => { try { return arg ? (JSON.parse(arg) as T) : {}; } catch { return {}; } };
export const MONTH_OPTS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => ({ value: String(i + 1), label: m }));
export { METHOD };
