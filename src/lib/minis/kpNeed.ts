/** Kp needed at a town: the view line and the overhead line, with the NOAA G level. arg: { place: "region/slug", region?: "slug" } */
import { kpNeeded, kpOverhead, gLevel } from '../engine/aurora';
import { P } from '../data';
import { townOptions, townAt, townIndex, parseArg, n1, METHOD } from './_kit';
import type { MiniSpec } from '../mini-types';
export default function kpNeed(arg?: string): MiniSpec {
  const a = parseArg<{ place: string; region: string }>(arg);
  return {
    title: 'What Kp does this town need?', cta: 'Check tonight’s forecast for your town',
    inputs: [{ id: 't', label: 'Town', def: townIndex(a.place), options: townOptions(a.region) }],
    run: (v) => {
      const t = townAt(v.t); const need = kpNeeded(t.mlat, METHOD); const over = kpOverhead(t.mlat, METHOD);
      const g = need === null ? 6 : gLevel(Math.ceil(need * 3 - 1e-9) / 3); const gs = g >= 1 && g <= 5 ? P.facts.gScale[g - 1] : null;
      return { head: ['Kp to see aurora from here', need === null ? 'beyond 9' : n1(need)], rows: [
        ['Magnetic latitude (AACGM)', `${n1(t.mlat)}°`], ['Kp for aurora overhead', over === null ? 'beyond 9' : n1(over)],
        ['Storm level', g === 0 ? 'no storm needed' : gs ? `G${g} ${gs.label}` : 'beyond G5'],
        ['How often that level comes', gs ? `about ${gs.days} days per 11-year cycle` : g === 0 ? 'most active nights' : 'rarer than G5'],
      ], note: 'View line: the more southern of the SWPC oval rule and the NOAA G scale latitudes at each Kp.' };
    },
  };
}
