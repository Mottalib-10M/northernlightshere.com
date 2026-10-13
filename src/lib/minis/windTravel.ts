/** Travel time of the solar wind from the L1 monitors to Earth, and from the Sun, at a given speed. */
import { P } from '../data';
import { n0, n1 } from './_kit';
import type { MiniSpec } from '../mini-types';
export default function windTravel(): MiniSpec {
  const L1 = P.facts.l1DistanceKm, AU = P.facts.auMeanKm;
  return {
    title: 'How much warning does the solar wind give?', cta: 'See what Kp is forecast tonight',
    inputs: [{ id: 'v', label: 'Solar wind speed', def: 450, unit: 'km/s', max: 3000 }],
    run: (x) => { const v = Math.max(50, x.v || 450); return { head: ['Warning from the L1 monitors', `${n0(L1 / v / 60)} min`], rows: [
      ['At the slow wind speed, 400 km/s', `${n0(L1 / 400 / 60)} min`], ['At a fast stream, 800 km/s', `${n0(L1 / 800 / 60)} min`],
      ['Sun to Earth at this speed', `${n1(AU / v / 86400)} days`],
    ], note: 'L1 distance: about 1.6 million km (SWPC). Real CMEs slow down or speed up on the way.' }; },
  };
}
