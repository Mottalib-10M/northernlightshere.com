import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ho = K.facts('michigan', 'houghton');
const tc = K.facts('michigan', 'traverse-city');
const de = K.facts('michigan', 'detroit');
const best = K.bestMonths('michigan', 'traverse-city', 2);

export default defineRegion({
  slug: 'michigan',
  title: 'Northern Lights Michigan 2026: Tonight’s Odds, Kp by Town',
  description: `Northern lights in Michigan in 2026: tonight's yes, maybe or no for your town, and the Kp each town needs, from Kp ${K.kp(ho.need)} in Houghton to Kp ${K.kp(de.need)} in Detroit.`,
  intro: 'Michigan spans more magnetic latitude than most states: the Keweenaw sees aurora several storm levels before Detroit does.',
  resume: `Michigan is two aurora states in one. The Upper Peninsula sits close to the line that NOAA's storm scale draws at G1: Houghton, on the Keweenaw Peninsula, is at ${K.num(ho.mlat, 1)} degrees magnetic latitude and needs about Kp ${K.kp(ho.need)}, so a minor storm on a clear night is often enough. The Lower Peninsula slopes away quickly: Traverse City needs about Kp ${K.kp(tc.need)}, a ${K.gName(tc.g)} storm, and Detroit about Kp ${K.kp(de.need)}, which only strong storms deliver. The tool opens on Traverse City; type your own town or ZIP code. In Traverse City the months with the most clear dark hours on average are ${best[0].name} and ${best[1].name}, from NASA POWER cloud data and the dark hours computed for each month, which is when a modest storm has the best chance of meeting a usable sky.`,
  faqs: [
    { q: 'Where is the best place to see the northern lights in Michigan?', a: `The Upper Peninsula, and the farther north and west the better: the Keweenaw needs about Kp ${K.kp(ho.need)}, Marquette about ${K.kp(K.facts('michigan', 'marquette').need)}. Lake Superior gives the U.P. a horizon free of city light to the north. In the Lower Peninsula, the Straits of Mackinac and the northern Lake Michigan shore are the usual choices.` },
    { q: 'What Kp do you need to see the aurora in Detroit, Michigan?', a: `About Kp ${K.kp(de.need)}, a ${K.gName(de.g)} storm, from a dark spot with an open view north. Detroit sits at ${K.num(de.mlat, 1)} degrees magnetic latitude, well south of the Kp 6 line of the NOAA scale. City light adds to the difficulty: drive north past the suburbs, toward Lake Huron's shore or the Thumb.` },
    { q: 'Can you see the northern lights in Michigan in summer?', a: 'Yes, but the nights are short. In June the Sun stays within 18 degrees of the horizon for most of the evening, so full darkness in Traverse City begins late and lasts a few hours. The table of months on this page gives the dark hours for each month. Late summer nights lengthen quickly, and September already offers long dark windows.' },
  ],
  body: (h) => `
<h2>The Upper Peninsula and the Lake Superior horizon</h2>
<p>What sets the U.P. apart is less its latitude than its northern horizon. From Copper Harbor to Whitefish Point the shore faces the open water of Lake Superior, with no town of any size for a hundred miles to the north. An aurora that stands only ten degrees above the horizon, which is what a storm at the edge of your range produces, is visible there when it would be hidden by trees or glow anywhere else. Houghton at ${h.num(ho.mlat, 1)} degrees and Marquette at ${h.num(h.facts('michigan', 'marquette').mlat, 1)} degrees magnetic latitude sit within half a Kp of the G1 threshold, which NOAA's scale describes as the level where aurora is commonly visible in northern Michigan. The ${h.a('city:michigan/marquette', 'Marquette page')} goes into the details for the central U.P.</p>
<h2>The Lower Peninsula, storm by storm</h2>
<p>South of the Straits, each level of the NOAA scale opens a new band of the state. Sault Ste. Marie and the Straits are close to the U.P. figures. Traverse City and the Leelanau Peninsula need a ${h.gName(tc.g)} storm. Grand Rapids and Lansing need Kp ${h.kp(h.facts('michigan', 'grand-rapids').need)} to ${h.kp(h.facts('michigan', 'lansing').need)}, and the Detroit area a strong G3 storm. The ${h.a('city:michigan/grand-rapids', 'Grand Rapids page')} and the ${h.a('city:michigan/detroit', 'Detroit page')} give the dark hours and cloud figures for those cities.</p>
<p>The Headlands International Dark Sky Park, west of Mackinaw City on the Lake Michigan shore, is one of the darkest public sites in the Lower Peninsula, with a northern view across the water toward the Straits. Along Lake Huron, the shoreline north of Port Huron and the tip of the Thumb offer dark skies within reach of the Detroit area.</p>
<h2>Lake effect and the cloud calendar</h2>
<p>Michigan's cloud calendar is shaped by the Great Lakes. When cold air crosses the warm open water in late autumn and early winter, it picks up moisture and builds the lake-effect clouds that cover the downwind shores, the western Lower Peninsula and much of the U.P., for days. NASA POWER's averages for Traverse City show it: the cloud amount is highest in ${h.cloudExtremes('michigan', 'traverse-city').cloudiest.name}, at ${h.num(h.cloudExtremes('michigan', 'traverse-city').cloudiest.cloud, 0)}%, against ${h.num(h.cloudExtremes('michigan', 'traverse-city').clearest.cloud, 0)}% in ${h.cloudExtremes('michigan', 'traverse-city').clearest.name}. On a storm night, moving inland, away from the downwind shore, can make the difference. ${h.mini('darkMonth', { place: 'michigan/traverse-city', month: 9 })}</p>`,
  related: ['city:michigan/marquette', 'city:michigan/grand-rapids', 'city:michigan/detroit', 'region:wisconsin', 'best-places-northern-lights-usa'],
  extraSources: [{ name: 'Michigan State University Extension, The Headlands International Dark Sky Park', url: 'https://www.canr.msu.edu/news/the_headlands_international_dark_sky_park' }],
});
