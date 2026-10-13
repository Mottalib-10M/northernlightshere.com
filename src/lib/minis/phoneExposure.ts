/** Longest exposure before stars trail, by the "500 rule" (500 ÷ 35 mm equivalent focal length), for the lenses of a phone. */
import { n0, n1 } from './_kit';
import type { MiniSpec } from '../mini-types';
export default function phoneExposure(): MiniSpec {
  return {
    title: 'How long can the shutter stay open?', cta: 'Check whether there is anything to shoot tonight',
    inputs: [{ id: 'f', label: 'Lens, 35 mm equivalent focal length', def: 26, unit: 'mm', max: 400 }],
    run: (v) => { const f = Math.max(1, v.f || 26); const s = 500 / f; return { head: ['Longest exposure before stars trail', `${n1(s)} s`], rows: [
      ['Same rule at 13 mm (ultra-wide)', `${n1(500 / 13)} s`], ['At 26 mm (main camera)', `${n1(500 / 26)} s`], ['At 77 mm (3x lens)', `${n1(500 / 77)} s`],
      ['Frames in a 3-minute night mode burst', n0(180 / s)],
    ], note: 'The 500 rule is a photographers’ rule of thumb, not a measurement: fast-moving aurora blurs sooner than stars.' }; },
  };
}
