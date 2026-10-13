import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pf = K.facts('massachusetts', 'pittsfield');
const sp = K.facts('massachusetts', 'springfield');
const wo = K.facts('massachusetts', 'worcester');
const bo = K.facts('massachusetts', 'boston');
const bn = K.facts('massachusetts', 'barnstable');
const ce = K.cloudExtremes('massachusetts', 'pittsfield');

export default defineRegion({
  slug: 'massachusetts',
  title: 'Northern Lights Massachusetts 2026: Tonight’s Odds by Town',
  description: `Northern lights in Massachusetts in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(pf.need)} needed in Pittsfield, ${K.kp(bn.need)} on Cape Cod, and where the dark sky starts.`,
  intro: 'Massachusetts needs a strong storm everywhere; the Berkshires and the Quabbin country give it a dark place to watch.',
  resume: `Massachusetts sees the northern lights only in strong geomagnetic storms. In the AACGM model the state lies around ${K.num(bo.mlat, 1)} degrees magnetic latitude, close to the G3 line that NOAA's storm scale draws at ${K.P.facts.gScale[2].mlat} degrees: Pittsfield, in the Berkshires, needs a planetary Kp of about ${K.kp(pf.need)}, Springfield and Worcester about ${K.kp(sp.need)}, Boston ${K.kp(bo.need)} and Barnstable, on Cape Cod, ${K.kp(bn.need)}. Those are G3 storms, which NOAA counts at about ${K.P.facts.gScale[2].perCycle} per eleven-year solar cycle, many of them in daylight or under cloud for New England. The differences inside the state come less from latitude than from light: the Boston metro area fills the eastern sky, while the hill towns of the west are dark. Pittsfield's NASA POWER cloud amount ranges from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. The tool opens on Boston; type your own town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Massachusetts?', a: `Yes, during strong storms of about Kp ${K.kp(pf.need)} to ${K.kp(bn.need)}, from a dark place with a clear view to the north. Many people across the state saw the aurora during the G5 storm of May 2024. On ordinary active nights, Kp 4 or 5, it stays below the Massachusetts horizon.` },
    { q: 'Where in Massachusetts is darkest for aurora watching?', a: 'The western and north-central hills: the Berkshires around Pittsfield and the hill towns along the Vermont line, and the forested country around the Quabbin Reservoir. A summit or an open field with a northern view is better than a valley floor. Boston and its suburbs light the sky too much for a faint display.' },
    { q: 'What Kp do you need to see the aurora on Cape Cod, Massachusetts?', a: `About Kp ${K.kp(bn.need)}, a strong ${K.gName(bn.g)} storm, from a beach or a dune with a view north across Cape Cod Bay. The open water helps, but the lights of the South Shore and Boston sit on that northern horizon, so the outer Cape, farther from them, is darker.` },
  ],
  body: (h) => `
<h2>A state at the G3 line</h2>
<p>From Pittsfield to Barnstable, Massachusetts spans little more than a degree of magnetic latitude, and its thresholds run from Kp ${h.kp(pf.need)} to ${h.kp(bn.need)}. All of them mean a strong storm. When SWPC issues a watch for G3 conditions, the state is in play; for anything weaker, the drive north into Vermont, New Hampshire or Maine is the realistic option. Those storms usually follow a fast coronal mass ejection one to three days earlier, which leaves time to plan the evening.</p>
<p>${h.mini('kpNeed', { place: 'massachusetts/pittsfield', region: 'massachusetts' })}</p>
<h2>West is dark, east is bright</h2>
<p>The Berkshires and the hill towns of western and north-central Massachusetts are the darkest part of the state. Ridges such as those around Mount Greylock and the open farmland of the upper Connecticut valley give views to the north without the glow of big cities. The country around the Quabbin Reservoir, a large protected watershed in the center of the state, is another dark zone close to Worcester and Springfield. East of Interstate 495, the Boston metro area lights the sky in every direction; a northern horizon there is never truly dark.</p>
<h2>When the storm comes in daylight</h2>
<p>Many strong storms peak while it is day in New England, and the aurora is invisible however high the Kp. A storm that starts in the afternoon can still be strong after dark, or it can fade. The hour strip of the tool rates each hour of the coming night with the Kp of its three-hour block, so it shows at a glance whether the forecast peak falls in the evening, in the middle of the night or outside the dark window altogether.</p>
<h2>Coastal nights</h2>
<p>On the coast, the sea offers dark horizons to the east and south, but the aurora is in the north, and the north shore of Massachusetts Bay faces the wrong way. Cape Cod's bay side looks north across the water toward the lights of the South Shore. Coastal fog and low cloud are frequent in late spring and early summer. The ${h.a('city:massachusetts/boston', 'Boston page')} details the city's options, and the ${h.a('region:new-hampshire', 'New Hampshire page')} the closest darker country to the north.</p>`,
  related: ['city:massachusetts/boston', 'region:new-hampshire', 'region:vermont', 'city:new-york/new-york-city', 'geomagnetic-storm-scale'],
});
