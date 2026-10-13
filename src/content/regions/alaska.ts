import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ut = K.facts('alaska', 'utqiagvik');
const fb = K.facts('alaska', 'fairbanks');
const an = K.facts('alaska', 'anchorage');
const kt = K.facts('alaska', 'ketchikan');
const nd = K.noDarkMonths('alaska', 'fairbanks');

export default defineRegion({
  slug: 'alaska',
  title: 'Northern Lights Alaska 2026: Tonight’s Answer, Town by Town',
  description: `Northern lights in Alaska in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(fb.need)} needed in Fairbanks, ${K.kp(an.need)} in Anchorage, and the months without a dark sky.`,
  intro: 'In Alaska the question is rarely whether the oval is close enough: it is whether the sky is dark and clear.',
  resume: `Alaska is the one US state that sits under the auroral oval rather than beside it. Fairbanks, at ${K.num(fb.mlat, 1)} degrees magnetic latitude, needs about Kp ${K.kp(fb.need)}, so on most clear dark nights there is something to see; Anchorage, at ${K.num(an.mlat, 1)} degrees, needs about Kp ${K.kp(an.need)}, still below storm level; and on the North Slope, Utqiaġvik sits at ${K.num(ut.mlat, 1)} degrees, so far north of the oval's usual edge that quiet aurora can appear in its southern sky. What limits Alaska is light. In Fairbanks the Sun never gets 18 degrees below the horizon in ${K.listOf(nd)}, and cloud cover peaks in ${K.cloudExtremes('alaska', 'fairbanks').cloudiest.name}. The tool opens on Fairbanks; type your own town or a ZIP code for tonight's hours and answer.`,
  faqs: [
    { q: 'When is aurora season in Alaska?', a: `It is set by darkness, not by the aurora, which is present all year. In Fairbanks there is no astronomical night in ${K.listOf(nd)}; the season runs roughly from late August, when real darkness returns, to mid-April. The months with the most clear dark hours in Fairbanks are ${K.listOf(K.bestMonths('alaska', 'fairbanks', 3).map((m) => m.name))}.` },
    { q: 'Can you see the northern lights in Anchorage, Alaska?', a: `Yes, often, but less easily than in the Interior. Anchorage needs about Kp ${K.kp(an.need)} against ${K.kp(fb.need)} for Fairbanks, and the city's light and coastal clouds work against it. Heading out of town, away from the Glenn Highway lights and toward an open view north, makes most of the difference on a Kp 3 or 4 night.` },
    { q: 'Do you need a geomagnetic storm to see aurora in Alaska?', a: `Not in the Interior or the Arctic. Fairbanks needs about Kp ${K.kp(fb.need)}, which is a quiet night on the NOAA scale; storms, Kp 5 and above, push the oval south of Fairbanks and toward the southern coast. In the southeast panhandle, Ketchikan needs about Kp ${K.kp(kt.need)}, so storms help there.` },
  ],
  body: (h) => `
<h2>Under the oval, not beside it</h2>
<p>Everywhere else on this site, a higher Kp means better odds. In Alaska the relationship bends. When the oval expands during a storm it can slide south of the Interior, so that Fairbanks watches the brightest arcs in its southern sky while Anchorage gets them overhead. On a quiet night the reverse happens: the oval contracts toward the Brooks Range and the North Slope, and Fairbanks sees it in the north. Utqiaġvik, at ${h.num(ut.mlat, 1)} degrees magnetic latitude, is poleward of the oval's quiet position, which is why the tool still shows a Kp needed of ${h.kp(ut.need)} there while the best displays may sit to its south.</p>
<p>The University of Alaska Fairbanks Geophysical Institute has studied the aurora from the Interior for decades, and its Poker Flat Research Range north of Fairbanks launches rockets into it. The reason is the same one that makes the region good for watching: the oval passes overhead on most nights.</p>
<h2>Four regions, four skies</h2>
<p>The Interior, from Fairbanks to the Yukon border, is dry and cold in winter, with long clear spells under high pressure. Southcentral, around Anchorage and the Mat-Su valleys, gets more maritime cloud and city glow. The Southeast panhandle, Juneau and Ketchikan, is a temperate rainforest: the cloud amount there stays high in every month of the NASA POWER averages, and clear nights are the real constraint. The North Slope and the west coast, Utqiaġvik, Kotzebue and Nome, have the darkest winters of all, with weeks of polar night around the December solstice.</p>
<p>${h.mini('darkMonth', { place: 'alaska/fairbanks', month: 9 })}</p>
<h2>Summer: the aurora is there, the dark is not</h2>
<p>From late April to mid-August the Interior has no astronomical night, and around the June solstice not even nautical twilight. The oval keeps shining, but against a sky that is too bright. Visitors who come for the midnight sun and hope for aurora on the same trip are usually disappointed, as SWPC itself warns. The first dark nights return in the second half of August, when the September equinox, with its tendency toward geomagnetic activity, is close. The ${h.a('city:alaska/fairbanks', 'Fairbanks page')}, the ${h.a('city:alaska/anchorage', 'Anchorage page')} and the ${h.a('city:alaska/juneau', 'Juneau page')} give the dark hours and clouds month by month.</p>`,
  related: ['city:alaska/fairbanks', 'city:alaska/anchorage', 'city:alaska/juneau', 'region:canada', 'best-time-northern-lights'],
  extraSources: [{ name: 'University of Alaska Fairbanks, Geophysical Institute', url: 'https://www.gi.alaska.edu/' }],
});
