import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const dl = K.facts('minnesota', 'duluth');
const dn = K.facts('colorado', 'denver');

export default definePage({
  id: 'kp-index',
  group: 'forecast',
  order: 20,
  slug: 'kp-index',
  nav: 'Kp index, live',
  card: 'The planetary Kp of the last day and the next three, against the Kp your town needs',
  title: 'Kp Index 2026: Live Kp Forecast and the Kp Your Town Needs',
  description: 'Kp index 2026, live from SWPC: the last 24 hours and the 3-day forecast in your time zone, with the Kp your town needs to see aurora and its NOAA storm level.',
  h1: 'Kp index: live values, the forecast, and the Kp your town needs',
  intro: 'One chart for the planet, one number for your place. Green bars are the blocks that reach your town.',
  resume: `The planetary K-index, Kp, measures how disturbed Earth's magnetic field is over each three-hour block, on a scale from 0 to 9 written in thirds: 4.67 is 5-, 5.00 is 5 and 5.33 is 5+. The official index is computed by the GFZ in Potsdam from ${K.P.facts.kpStations} observatories; SWPC publishes a real-time estimate from a smaller set of magnetometers and a three-day forecast, which this page draws in your time zone. What makes the number useful is the line it is compared with. The tool turns the magnetic latitude of your town into the Kp at which aurora rises above your northern horizon: about Kp ${K.kp(dl.need)} in Duluth, ${K.kp(dn.need)} in Denver. Any bar that reaches that line is drawn in green. Kp 5 and above are geomagnetic storms on the NOAA scale, from G1 at Kp 5 to G5 at Kp 9.`,
  faqs: [
    { q: 'What Kp index do you need to see the northern lights?', a: `There is no single answer: it depends on your magnetic latitude. Under the oval, in Fairbanks or Yellowknife, Kp 1 to 2 is enough. In the northern lower 48 it is usually between Kp 5 and Kp 7, for instance about ${K.kp(dl.need)} in Duluth. South of about ${K.P.facts.gScale[3].mlat} degrees magnetic latitude, only G4 and G5 storms, Kp 8 and 9, bring aurora into view.` },
    { q: 'What does Kp 5- or 6+ mean?', a: 'SWPC and the GFZ write Kp in thirds of a unit. A minus sign takes a third off, a plus sign adds one: 5- is 4.67, 5 is 5.00, 5+ is 5.33. SWPC already treats 5- as a G1 storm in its forecast table. The tool shows decimals, so 5- appears as 4.7.' },
    { q: 'How often is the Kp index updated?', a: 'The official Kp covers three-hour blocks starting at 00, 03, 06 UT and so on. SWPC estimates the current block every minute from its magnetometer network and refreshes the three-day forecast several times a day. The definitive values from the GFZ come later. This page reloads the SWPC file each time you open it and every five minutes while it stays open.' },
    { q: 'Is a high Kp enough to see aurora?', a: 'No. Kp says the oval has grown; it does not say that it is dark, clear or happening in your evening. A Kp 7 block that falls at 4 pm local time shows nothing. The tool on this page keeps the chart for the planet and the verdict for your place separate on purpose: the yes or no lives on the tonight page.' },
  ],
  body: (h) => `
<h2>What the Kp index measures</h2>
<p>A magnetometer records the horizontal component of the magnetic field all day. Its K-index is the largest swing over three hours, sorted into ten classes whose limits are scaled to the station, so that a K of 5 means the same level of disturbance in Sitka and in Fredericksburg. The planetary index averages the standardized K of observatories between ${h.P.facts.kpMagLatBand[0]} and ${h.P.facts.kpMagLatBand[1]} degrees magnetic latitude. SWPC's ${h.src('swpc_kp', 'Planetary K-index page')} lists the stations of its real-time estimate, from Alaska to Australia, and the ${h.src('gfz_kp', 'GFZ')} keeps the official series going back to 1932.</p>
<p>The link to the aurora is physical: the currents that flow along the auroral oval are the same currents that shake the magnetometers. When Kp rises, the oval brightens, thickens and slides toward the equator.</p>
<h2>From a Kp value to your town</h2>
<p>SWPC gives a simple relationship on its ${h.src('swpc_tips', 'aurora viewing tips')}: at Kp 0 the equatorward edge of the oval sits near ${h.P.method.ovalEdgeKp0} degrees magnetic latitude and it moves about ${h.P.method.ovalStepPerKp} degrees per Kp step, reaching about 48 degrees at Kp 9. For the storm levels, the ${h.src('swpc_scales', 'NOAA Space Weather Scales')} give the latitudes where aurora has been seen: ${h.P.facts.gScale[1].mlat} degrees at G2, ${h.P.facts.gScale[2].mlat} at G3, ${h.P.facts.gScale[3].mlat} at G4, ${h.P.facts.gScale[4].mlat} at G5. The tool joins the two and keeps, at each Kp, the more southern line: the oval rule up to about Kp 6.3, then the storm-scale latitudes, because during big storms the aurora is seen from much farther than the edge of the oval, rising high enough above the horizon to be noticed.</p>
<p>Magnetic latitude comes from the AACGM-v2 model at ${h.P.method.aacgmAltKm} km. For towns of the site it is computed exactly; for a ZIP code or coordinates it is interpolated in a one-degree grid, which the site's tests check to within 0.3 degree of the exact value for every town.</p>
<h2>Kp compared with the other signals</h2>
<p>Kp is a three-hour average and a global one. It lags: a sudden substorm can light up Montana for twenty minutes inside a block that ends at Kp 4. And it says nothing about the solar wind that will arrive in the next hour. That is why the forecast on the ${h.a('home', 'tonight page')} also reads OVATION for the current hour, and why the ${h.a('solar-wind-bz', 'Bz guide')} is worth reading before a storm night. For a single number to plan around, though, Kp remains the one SWPC forecasts days ahead, and the one its alerts, watches and warnings are expressed in.</p>`,
  tool: 'kp',
  related: ['home', 'aurora-forecast', 'geomagnetic-storm-scale', 'northern-lights', 'solar-wind-bz'],
  sources: ['swpc_kp', 'swpc_data_kp', 'gfz_kp', 'swpc_tips', 'swpc_scales', 'aacgm'],
});
