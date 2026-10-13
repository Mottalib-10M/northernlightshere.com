/** How high above the horizon aurora appears at a distance: its 100 km lower border and the 300 km red top. */
import { elevationOf } from '../engine/aurora';
import { P } from '../data';
import { n0, n1 } from './_kit';
import type { MiniSpec } from '../mini-types';
export default function auroraHeight(): MiniSpec {
  return {
    title: 'How high will it look from where you stand?', cta: 'Tonight’s forecast for your town',
    inputs: [{ id: 'd', label: 'Distance to the aurora, along the ground', def: 500, unit: 'km', max: 3000 }],
    run: (x) => { const d = Math.max(0, x.d || 0); const e = (h: number) => elevationOf(h, d); return { head: ['Green lower border (100 km up)', e(100) > 0 ? `${n1(e(100))}° above the horizon` : 'below the horizon'], rows: [
      ['Red top (300 km up)', e(P.facts.redHeightKmAbove) > 0 ? `${n1(e(P.facts.redHeightKmAbove))}°` : 'below the horizon'],
      ['Top of the tallest rays (400 km)', e(400) > 0 ? `${n1(e(400))}°` : 'below the horizon'],
      ['Distance in miles', n0(d * 0.621371)],
    ], note: 'Spherical Earth, no refraction. Heights: SWPC Aurora Tutorial.' }; },
  };
}
