/** The NOAA G scale for a Kp: level, frequency per solar cycle, and where aurora has been seen. */
import { P } from '../data';
import type { MiniSpec } from '../mini-types';
export default function gScale(): MiniSpec {
  const G = P.facts.gScale;
  return {
    title: 'From a Kp value to the storm scale', cta: 'Does that reach your town tonight?',
    inputs: [{ id: 'g', label: 'Forecast Kp', def: 2, options: G.map((x, i) => ({ value: String(i + 1), label: `Kp ${x.kp}` })) }],
    run: (v) => { const x = G[v.g - 1]; return { head: ['NOAA geomagnetic storm level', `G${x.g} ${x.label}`], rows: [
      ['Aurora has been seen as low as', x.seen], ['Typical magnetic latitude', x.mlat === null ? 'not given by NOAA' : `${x.mlat}°`],
      ['Storms of this level per 11-year cycle', `about ${x.perCycle.toLocaleString('en-US')}`], ['Days per cycle', `about ${x.days}`],
    ], note: 'Source: NOAA Space Weather Scales, geomagnetic storms.' }; },
  };
}
