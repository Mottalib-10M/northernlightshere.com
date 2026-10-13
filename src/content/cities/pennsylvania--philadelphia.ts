import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('pennsylvania', 'philadelphia');
const m = K.monthly('pennsylvania', 'philadelphia');
const ce = K.cloudExtremes('pennsylvania', 'philadelphia');
const best = K.bestMonths('pennsylvania', 'philadelphia', 3);
const g4 = K.P.facts.gScale[3];

export default defineCity({
  region: 'pennsylvania',
  slug: 'philadelphia',
  title: 'Northern Lights Philadelphia 2026: Tonight’s Odds, Kp Needed',
  description: `Northern lights in Philadelphia in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, why only big storms reach it, and where to drive.`,
  intro: 'Philadelphia sees the aurora a few times per solar cycle, in big storms, from outside the city glow.',
  resume: `Philadelphia needs a planetary Kp of about ${K.kp(f.need)} to see the northern lights, a ${K.gName(f.g)} storm on the NOAA scale and close to G4. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, the lowest of the Pennsylvania towns compared here, and the aurora would reach overhead only around Kp ${K.kp(f.overhead)}, in the rarest storms. NOAA counts about ${g4.perCycle} G4 storms per eleven-year solar cycle, which gives an idea of how seldom Philadelphia gets a chance. When one comes, the sky is usually less of a problem than the light: the NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, but the metro area's glow fills the northern horizon. By clear dark hours, ${K.listOf(best.map((b) => b.name))} come first.`,
  faqs: [
    { q: 'Can you see the northern lights in Philadelphia?', a: `Only during strong storms of about Kp ${K.kp(f.need)} or more, and usually from outside the city. Many Philadelphians photographed the aurora during the G5 storm of May 2024. On ordinary active nights the aurora is far below the horizon, whatever the social media posts after a weaker storm suggest.` },
    { q: 'Where should I go from Philadelphia to see the aurora?', a: 'North, past the suburbs: the farmland of Bucks and Berks counties, or the Pocono plateau two hours away, where hilltops look north across forest. Cherry Springs State Park, in Potter County, is far but offers one of the darkest skies in the East. Facing north with the city behind you is the essential point.' },
    { q: 'Why does the aurora look pink or red from Philadelphia?', a: `Because only the top of the aurora rises above Philadelphia's horizon. SWPC says red light comes from oxygen above about ${K.P.facts.redHeightKmAbove} km, above the more common green. From far south of the oval, that red upper layer is what you see, and phone cameras record it more vividly than the eye.` },
  ],
  body: (h) => `
<h2>Waiting for the big ones</h2>
<p>Philadelphia's threshold, Kp ${h.kp(f.need)}, places it with New York and Denver among the harder cities on this site. Seeing the aurora from here is not a matter of picking a good night in winter, but of being ready for the few storms per cycle that push the oval far enough south. The SWPC watch for a G3 or G4 storm, issued a day or two before a fast coronal mass ejection arrives, is the signal. On the night, the Kp estimate and the OVATION line of the tool confirm whether the storm has actually reached that level.</p>
<p>${h.mini('kpNeed', { place: 'pennsylvania/philadelphia', region: 'pennsylvania' })}</p>
<h2>Out of the Delaware Valley glow</h2>
<p>The Philadelphia metro area runs almost continuously from Wilmington to Trenton, and its light dome is visible from far away. Inside it, a faint red glow in the north has no chance. The distance to darker country is the deciding factor: an hour north, the farmland of upper Bucks County or the hills along the Lehigh offer horizons with far less light; two hours north, the Pocono plateau has forested hilltops with views across country with few towns. The aim is a place where the northern horizon is dark, even if the southern sky still glows from the city.</p>
<h2>What the camera sees that you do not</h2>
<p>At Philadelphia's distance from the oval, a storm aurora is often at the limit of what the eye can detect against a suburban sky: a faint, slightly pink brightening of the northern horizon that is easy to mistake for city glow or thin cloud. A phone on a tripod or a car roof, in night mode with a long exposure, is the quickest test. If the screen shows a red or magenta band with vertical streaks that the eye did not notice, that is the aurora. Many of the images shared after big storms were taken this way by people who saw little at the time.</p>
<h2>The season and the hour</h2>
<p>Philadelphia keeps some astronomical darkness all year, ${h.num(m[5].hours, 1)} hours on June 15 and ${h.num(m[11].hours, 1)} on December 15. The autumn months combine long nights with relatively clear skies, which is why they lead by clear dark hours. The SWPC forecast blocks are written in Universal Time; Philadelphia is five hours behind in winter, so the block from 03 to 06 UT is 10 pm to 1 am. The ${h.a('aurora-forecast', 'three-night forecast')} does the conversion, and the ${h.a('region:pennsylvania', 'Pennsylvania page')} lists the rest of the state.</p>`,
  related: ['region:pennsylvania', 'city:pennsylvania/pittsburgh', 'city:new-york/new-york-city', 'geomagnetic-storm-scale', 'northern-lights-colors'],
  extraSources: [{ name: 'Pennsylvania DCNR, Cherry Springs State Park', url: 'https://www.dcnr.pa.gov/StateParks/FindAPark/CherrySpringsStatePark/Pages/default.aspx' }],
});
