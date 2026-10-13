import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('alaska', 'anchorage');
const fb = K.facts('alaska', 'fairbanks');
const m = K.monthly('alaska', 'anchorage');
const ce = K.cloudExtremes('alaska', 'anchorage');
const best = K.bestMonths('alaska', 'anchorage', 2);

export default defineCity({
  region: 'alaska',
  slug: 'anchorage',
  title: 'Northern Lights Anchorage 2026: Tonight’s Chance, Kp Needed',
  description: `Northern lights in Anchorage in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, cloud by month and where to escape the city glow.`,
  intro: 'Anchorage is close enough to the oval for quiet-night aurora; city light and coastal cloud are the obstacles.',
  resume: `From Anchorage you need a planetary Kp of about ${K.kp(f.need)} to see the northern lights, below the Kp 5 that marks a geomagnetic storm, because the city sits at ${K.num(f.mlat, 1)} degrees magnetic latitude, about ${K.num(fb.mlat - f.mlat, 1)} degrees south of Fairbanks in the AACGM model. A moderately active night is usually enough to show something; at Kp ${K.kp(f.overhead)} the oval itself reaches the city. What holds Anchorage back is its setting: Alaska's largest city throws a lot of light into the sky, and its position on Cook Inlet brings maritime cloud, with a NASA POWER cloud amount of ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Full darkness disappears from ${K.noDarkMonths('alaska', 'anchorage')[0]} to ${K.noDarkMonths('alaska', 'anchorage').slice(-1)[0]}; the months with the most clear dark hours are ${best[0].name} and ${best[1].name}, when the nights are longest.`,
  faqs: [
    { q: 'What Kp do you need to see the northern lights in Anchorage?', a: `About Kp ${K.kp(f.need)}, which is an active but not stormy night on the NOAA scale. At that level the aurora shows low in the northern sky from a dark spot. Around Kp ${K.kp(f.overhead)} it reaches overhead. City light raises the bar inside Anchorage itself, so a drive out of town is worth about a point of Kp.` },
    { q: 'Where can you see the aurora near Anchorage?', a: 'Anywhere with a clear view north and the city behind you. The Glenn Highway corridor toward the Mat-Su valleys and the trailheads above town in Chugach State Park are common choices, because they climb out of the city glow. Turnagain Arm faces the wrong way for a low aurora: its views run east and west.' },
    { q: 'Is March a good month for northern lights in Anchorage?', a: `Often one of the best. March has ${K.num(m[2].hours, 1)} hours of full darkness on the 15th and the clearest skies of the year in NASA POWER data, at ${K.num(ce.clearest.cloud, 0)}% cloud amount for ${ce.clearest.name}. It also falls near the equinox, when SWPC notes a tendency toward stronger geomagnetic storms.` },
  ],
  body: (h) => `
<h2>Between the mountains and the inlet</h2>
<p>Anchorage is pressed between the Chugach Mountains to the east and the waters of Cook Inlet to the west and north. The mountains cut off the eastern sky, which is rarely where the aurora is; the problem is the north, where Knik Arm and the lights of the suburbs sit. On a night at Kp ${h.kp(f.need)}, the aurora rises only a few degrees above that horizon, and from downtown it is easily lost in the orange glow. A few miles of driving changes the picture: up the slopes of the Chugach the lights fall below you, and toward Palmer and Wasilla the sky opens to the north.</p>
<p>Anchorage is still close to the oval in magnetic terms. Its magnetic latitude, ${h.num(f.mlat, 1)} degrees, is higher than that of any city in the lower 48, and on an active night the oval can sweep right over the city. When that happens, the light pollution matters much less: an overhead corona is bright enough to stand out even from a parking lot.</p>
<h2>Maritime weather</h2>
<p>Unlike the Interior, Anchorage receives moist air from the Gulf of Alaska, and its winter skies are more often overcast. NASA POWER's averages run from ${h.num(ce.clearest.cloud, 0)}% cloud amount in ${ce.clearest.name} to ${h.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. A cloudy forecast in town is not always cloudy everywhere: the Mat-Su valleys sometimes clear when the coast stays covered, and the reverse also happens, so the tool lets you check a second town nearby.</p>
<p>${h.mini('kpNeed', { place: 'alaska/anchorage', region: 'alaska' })}</p>
<h2>Light through the year</h2>
<p>In mid-December Anchorage gets ${h.num(m[11].hours, 1)} hours of full darkness, from ${m[11].start} to ${m[11].end}. By the spring equinox that falls to ${h.num(m[2].hours, 1)} hours, and from ${h.noDarkMonths('alaska', 'anchorage')[0]} onward the sky never fully darkens. September brings the dark back with mild temperatures, which makes it the comfortable choice for a first try. Many residents first see the aurora on a drive home from somewhere else, which says something about where the dark sky starts. For a comparison with the Interior, see the ${h.a('city:alaska/fairbanks', 'Fairbanks page')}; for the rest of the state, the ${h.a('region:alaska', 'Alaska page')}.</p>`,
  related: ['region:alaska', 'city:alaska/fairbanks', 'city:alaska/juneau', 'aurora-forecast', 'photograph-northern-lights-phone'],
  extraSources: [{ name: 'Alaska Department of Natural Resources, Chugach State Park', url: 'https://dnr.alaska.gov/parks/units/chugach/' }],
});
