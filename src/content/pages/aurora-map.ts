import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

export default definePage({
  id: 'aurora-map',
  group: 'forecast',
  order: 30,
  slug: 'aurora-map',
  nav: 'Live aurora map (OVATION)',
  card: 'The SWPC OVATION grid for the next 30 to 90 minutes, centred on your town',
  title: 'Aurora Map 2026: Live OVATION Oval Centred on Your Town',
  description: 'Live aurora map for 2026: the SWPC OVATION probability grid redrawn around your town, with the chance of aurora in your sky over the next 30 to 90 minutes.',
  h1: 'Live aurora map: the OVATION oval around your town',
  intro: 'The same model SWPC draws for the whole pole, turned so that your town sits under it, with the circle of sky you can actually see.',
  resume: `OVATION is the model behind the oval maps of the NOAA Space Weather Prediction Center. It takes the solar wind speed and magnetic field measured at the L1 point, about ${K.num(K.P.facts.l1DistanceKm / 1e6, 1)} million km upstream of Earth, and turns them into a probability, from 0 to 100%, of seeing aurora overhead at every one-degree point of the globe for the next ${K.P.facts.ovationLeadMinutes[0]} to ${K.P.facts.ovationLeadMinutes[1]} minutes, the time it takes the wind to reach us. This page draws that grid on a polar view turned toward your town and adds what the SWPC map does not: a dashed circle of ${K.METHOD.skyReachKm} km around you, the distance at which aurora sitting 100 km up still stands about ${K.num(K.elevationOf(K.METHOD.auroraBottomKm, K.METHOD.skyReachKm), 0)} degrees above the horizon. The figure in the result card is the highest probability inside that circle, the number that matters for your sky right now.`,
  faqs: [
    { q: 'What do the colors on the aurora map mean?', a: 'They are OVATION probabilities of seeing aurora overhead at each point. On this map, pale green covers 3 to 9%, green 10 to 24%, yellow 25 to 49% and red 50% or more. The values come unchanged from the SWPC file; only the projection and the colors are ours. A point outside the colored band can still see aurora on its horizon, which is what the dashed circle is for.' },
    { q: 'How far ahead does the OVATION aurora map look?', a: 'Between 30 and 90 minutes, depending on the speed of the solar wind: the model is driven by the wind measured at L1 and forecasts the aurora for the moment that wind reaches Earth. The time of validity is printed under the map. When the solar wind data are missing, SWPC runs the model from the current Kp instead, and the lead time drops to zero.' },
    { q: 'Why does the map show aurora when the forecast says no?', a: 'Usually because of darkness or clouds. OVATION ignores both: it draws aurora on the day side and under overcast. It can also show a band north of you that is out of your reach. The verdict on the tonight page combines the map with your dark hours, the cloud forecast and the Kp of the next blocks.' },
    { q: 'Can I trust a 10% probability on the aurora map?', a: `SWPC derived the probabilities from aurora intensity, assuming a linear relationship validated against images of NASA's Polar satellite. Ten percent is low for an overhead display but often enough for a visible glow on the horizon from a dark site, which is why the tool counts ${K.METHOD.ovationStrong}% within your ${K.METHOD.skyReachKm} km circle as strong activity.` },
  ],
  body: (h) => `
<h2>Where the map comes from</h2>
<p>The OVATION Prime model was developed at the Johns Hopkins University Applied Physics Laboratory by Patrick Newell and co-workers and put into real-time service by NOAA in 2011, as the ${h.src('swpc_ovation', 'SWPC aurora page')} recounts. It estimates the flux of electrons and protons falling into the atmosphere, then converts that energy into a viewing probability. SWPC publishes the result every few minutes as a grid of 360 by 181 points (${h.src('swpc_data_ovation', 'OVATION JSON')}), which this page downloads in your browser, about one megabyte, and redraws.</p>
<p>The projection is azimuthal equidistant centred on the geographic pole, with parallels every 10 degrees from 30 to 80 north, and it is rotated so that your longitude points down. Land comes from the Natural Earth 1:110 million outline. No interpolation is added: each colored square is one cell of the SWPC grid.</p>
<h2>Why a circle of ${h.P.method.skyReachKm} km</h2>
<p>The aurora is high: SWPC puts it between ${h.P.facts.auroraHeightKm[0]} and ${h.P.facts.auroraHeightKm[1]} km, with the common green light from about ${h.P.facts.greenHeightKm[0]} km up. Light that high is visible from far away, and SWPC notes that a bright display can be seen up to ${h.num(h.P.method.swpcMaxViewKm, 0)} km away from a good vantage point. We use half of that as the everyday reach: at ${h.P.method.skyReachKm} km, the lower edge of an aurora 100 km up stands about ${h.num(h.elevationOf(100, h.P.method.skyReachKm), 0)} degrees above a flat horizon, high enough to clear trees and haze. At ${h.num(h.P.method.swpcMaxViewKm, 0)} km it would sit about ${h.num(h.elevationOf(100, h.P.method.swpcMaxViewKm), 1)} degrees up, which only an open sea or prairie horizon allows. The ${h.a('northern-lights-colors', 'colors guide')} lets you try other distances.</p>
<h2>Reading the map in practice</h2>
<p>Look for two things. First, the position of the equatorward edge of the colored band against your dashed circle: if the band touches the circle, aurora is within reach of your sky. Second, the time printed under the map: OVATION is a nowcast, and a run that is an hour old describes conditions that may already have changed. Reload during a storm; the grid refreshes every few minutes. A band that suddenly thickens and brightens on the night side of the pole is the signature of a substorm, often the best twenty minutes of the night, and the moment to step outside if your circle is close to the green.</p>
<h2>Limits of the map</h2>
<p>OVATION is a statistical model: it reproduces how the aurora usually responds to a given solar wind, not the exact shape of tonight's arcs. It tends to be smoother than reality, missing the bright folds of a substorm and sometimes the far southern reach of a big storm. Its probabilities are for a dark, clear sky; the map knows nothing of the Sun or the clouds over you. Use it for the next hour, and the ${h.a('aurora-forecast', 'three-night forecast')} for anything later.</p>`,
  tool: 'map',
  related: ['home', 'kp-index', 'aurora-forecast', 'northern-lights-colors', 'solar-wind-bz'],
  sources: ['swpc_ovation', 'swpc_data_ovation', 'swpc_tips', 'swpc_aurora', 'natural_earth'],
});
