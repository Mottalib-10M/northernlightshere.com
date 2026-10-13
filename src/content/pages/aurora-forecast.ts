import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const mq = K.facts('michigan', 'marquette');
const bi = K.facts('north-dakota', 'bismarck');

export default definePage({
  id: 'aurora-forecast',
  group: 'forecast',
  order: 10,
  slug: 'aurora-forecast',
  nav: 'Aurora forecast, 3 nights',
  card: 'Yes, maybe or no for tonight and the next two nights, with the best hours',
  title: 'Aurora Forecast 2026: Northern Lights Forecast for 3 Nights',
  description: 'Aurora forecast for the next three nights in 2026: SWPC Kp blocks, NWS cloud cover and dark hours for your town, turned into a yes, maybe or no per night.',
  h1: 'Aurora forecast: the next three nights for your town',
  intro: 'The SWPC forecast runs about three days ahead in three-hour blocks. Here each block meets your sky: darkness, clouds and the Kp your place needs.',
  resume: `An aurora forecast is really two forecasts stacked. The first is the planetary Kp forecast of the NOAA Space Weather Prediction Center, a value from 0 to 9 for each three-hour block of Universal Time over roughly the next three days, revised as new solar wind data and solar images come in. The second is your local weather, because the best storm of the year is worthless under overcast. This page puts both side by side for tonight, tomorrow night and the night after, at the place you choose. A night gets a yes when at least one hour of full darkness has a forecast Kp at or above the value your magnetic latitude needs and a sky forecast at ${K.METHOD.cloudClear}% cloud or less. Marquette needs about Kp ${K.kp(mq.need)}, Bismarck about ${K.kp(bi.need)}, so the same SWPC table can mean three yes nights in one town and none in the next.`,
  faqs: [
    { q: 'How far ahead can the northern lights be forecast?', a: 'SWPC publishes a three-day Kp forecast in three-hour blocks and a 27-day outlook of the largest daily Kp, based on the 27-day rotation of the Sun. The three-day forecast is the one to plan a night with; the 27-day outlook only flags returning coronal hole streams. Beyond the next hour or two, any aurora forecast is a probability, not a schedule.' },
    { q: 'Why does the forecast for tomorrow night keep changing?', a: 'Because the Kp forecast is revised as SWPC sees new eruptions on the Sun and new solar wind measurements, and because cloud forecasts are refreshed several times a day. A coronal mass ejection forecast to arrive at midnight can arrive in the morning, or miss Earth. Open this page again in the evening: the three nights are recomputed from the latest feeds.' },
    { q: 'What do the times in the SWPC Kp forecast mean for me?', a: 'SWPC writes its blocks in Universal Time: 00 to 03 UT, 03 to 06 UT and so on. For Central Daylight Time that block 03 to 06 UT is 10 pm to 1 am. The tool converts every block to the time zone of the place you pick and keeps only the blocks that fall in your dark hours, so you never have to do the subtraction yourself.' },
    { q: 'Is a Kp 5 night a good night to go out?', a: `It depends on where you stand. Kp 5 is a G1 storm. It is plenty for Fairbanks or Yellowknife and roughly the threshold for the Upper Peninsula of Michigan, where Marquette needs about Kp ${K.kp(mq.need)}. For Chicago, which needs about Kp ${K.kp(K.facts('illinois', 'chicago').need)}, a Kp 5 night is a no, and the tool says so.` },
    { q: 'Does the forecast include the Moon and twilight?', a: `Yes. Each night's dark hours are computed for your coordinates, with the Sun 18 degrees below the horizon; hours of nautical twilight can reach maybe, never yes. The Moon's lit fraction is shown for the middle of the night, and a Moon more than ${K.num(K.METHOD.moonBright * 100, 0)}% lit and high in the sky lowers a narrow yes to maybe.` },
  ],
  body: (h) => `
<h2>Reading three nights at once</h2>
<p>The three cards under the tool summarise each night with one word, the best hours, the highest Kp forecast while it is dark, and the average cloud cover over those hours. Open a night in the selector of the ${h.a('home', 'tonight page')} to see it hour by hour. The point of three nights is choice: if tonight is a maybe under broken cloud and the night after a yes with a clear forecast, the second is the one worth staying up for, especially at the edge of your range.</p>
<p>The Kp blocks come straight from the SWPC data service (${h.src('swpc_data_kp', 'planetary K-index forecast, JSON')}), which carries observed values for the past week, an estimate for the current block, and predictions for the next blocks. The tool uses the predicted values for future hours and the estimated value for the current one. Nothing is smoothed or adjusted: if SWPC predicts Kp 4.67 for 03 to 06 UT, every hour inside that block carries 4.67, which SWPC labels 5- and which already counts as a G1 storm on the ${h.a('geomagnetic-storm-scale', 'NOAA storm scale')}.</p>
<h2>Why a Kp forecast misses</h2>
<p>Most strong forecasts follow a coronal mass ejection seen leaving the Sun one to three days earlier. Its speed is estimated from coronagraph images, so the arrival time carries an uncertainty of several hours, and the strength of the storm depends on the direction of the magnetic field inside the cloud, which nobody can measure until it passes the monitors at L1, ${h.num(h.P.facts.l1DistanceKm / 1e6, 1)} million kilometers upstream. A field pointing north can deliver a fast cloud and almost no aurora. The ${h.a('solar-wind-bz', 'solar wind and Bz guide')} explains what to watch on the night itself.</p>
<p>Coronal hole streams are easier: the Sun rotates in about 27 days, so a stream that brought Kp 5 last month often returns, which is what the ${h.src('swpc_27day', '27-day outlook')} anticipates. Those storms rarely go beyond G1 or G2, but they are punctual.</p>
<h2>Clouds three days out</h2>
<p>For US places the tool reads the hourly sky cover of the ${h.src('nws_api', 'National Weather Service API')} for the forecast grid cell that holds your coordinates; elsewhere, the cloud fraction of MET Norway. Weather models are reliable on the broad picture a day or two ahead and weaker on the exact hour a front clears. A night announced overcast that clears at 1 am is common around the Great Lakes in autumn. If you can see stars, set the cloud selector to clear and the answer follows your sky instead of the model.</p>
<h2>What this forecast does not know</h2>
<p>It does not know your horizon: a ridge, a forest or city glow to the north can hide a display that is low in the sky, which is where it sits when your place is at the edge of the oval. It does not know local light pollution, and it cannot predict substorms, the bursts of activity that can light up a sky for twenty minutes on a night forecast at Kp 3. That last point cuts both ways, and it is the reason the current hour also looks at OVATION, shown on the ${h.a('aurora-map', 'live aurora map')}.</p>`,
  tool: 'nights',
  related: ['home', 'kp-index', 'aurora-map', 'dark-sky-hours', 'geomagnetic-storm-scale'],
  sources: ['swpc_data_kp', 'swpc_3day', 'swpc_27day', 'swpc_kp', 'nws_api', 'metno'],
});
