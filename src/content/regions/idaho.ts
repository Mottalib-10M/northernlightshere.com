import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const sa = K.facts('idaho', 'sandpoint');
const cd = K.facts('idaho', 'coeur-dalene');
const bo = K.facts('idaho', 'boise');
const ifa = K.facts('idaho', 'idaho-falls');
const ce = K.cloudExtremes('idaho', 'boise');

export default defineRegion({
  slug: 'idaho',
  title: 'Northern Lights Idaho 2026: Tonight’s Odds, Kp by Town',
  description: `Northern lights in Idaho in 2026: tonight's yes, maybe or no, Kp ${K.kp(sa.need)} needed in Sandpoint, ${K.kp(bo.need)} in Boise, and the dark sky country of central and eastern Idaho.`,
  intro: 'NOAA names Idaho at the G2 level of its storm scale; the panhandle reaches it first, the Snake River Plain needs more.',
  resume: `Idaho appears by name in NOAA's geomagnetic storm scale: at G2, a Kp 6 storm, aurora has been seen as low as New York and Idaho, around ${K.P.facts.gScale[1].mlat} degrees magnetic latitude. The state is long from north to south, and its thresholds follow. In the panhandle, Sandpoint sits at ${K.num(sa.mlat, 1)} degrees in the AACGM model and needs about Kp ${K.kp(sa.need)}, and Coeur d'Alene about ${K.kp(cd.need)}. On the Snake River Plain, Idaho Falls needs ${K.kp(ifa.need)} and Boise ${K.kp(bo.need)}, a ${K.gName(bo.g)} storm. What southern and central Idaho offer in return is some of the darkest country in the lower 48, and dry air: Boise's NASA POWER cloud amount falls to ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name}. The tool opens on Boise; type your town or ZIP code.`,
  faqs: [
    { q: 'Can you see the northern lights in Idaho?', a: `Yes. NOAA's storm scale names Idaho at the G2 level, Kp 6. The thresholds computed here run from about Kp ${K.kp(sa.need)} in Sandpoint to Kp ${K.kp(bo.need)} in Boise, so the panhandle sees aurora on moderate storms and the south of the state on strong ones, given a clear sky and a dark spot.` },
    { q: 'What is the best place in Idaho to see the aurora?', a: 'For the lowest Kp, the panhandle around Sandpoint and Bonners Ferry. For the darkest sky, central Idaho and the lava fields of Craters of the Moon, which the National Park Service says was designated an International Dark Sky Park in 2017. Both need a clear view of the northern horizon, which mountains often block.' },
    { q: 'What Kp is needed to see the aurora in Boise, Idaho?', a: `About Kp ${K.kp(bo.need)}, a ${K.gName(bo.g)} storm, looking north from outside the city. The Boise foothills rise directly north of town, so a viewpoint up on the ridges or out on the open plain to the west sees more of the low sky than the valley floor does.` },
  ],
  body: (h) => `
<h2>The panhandle and the plain</h2>
<p>Idaho runs about seven degrees of latitude from the Nevada line to the Canadian border, and from Sandpoint to Pocatello its towns spread over ${h.num(sa.mlat - h.facts('idaho', 'pocatello').mlat, 1)} degrees of magnetic latitude. In Kp, that is the difference between a moderate storm and a strong one. The panhandle, wedged between Washington and Montana, shares the thresholds of Spokane and Kalispell: Sandpoint on Lake Pend Oreille needs Kp ${h.kp(sa.need)}. South of the Salmon River country, the Snake River Plain needs a G3 storm almost everywhere.</p>
<p>${h.mini('kpNeed', { place: 'idaho/sandpoint', region: 'idaho' })}</p>
<h2>Dark country</h2>
<p>Southern Idaho trades latitude for darkness. Craters of the Moon National Monument and Preserve, on the lava fields between Arco and Carey, was designated an International Dark Sky Park in 2017, as the National Park Service announced, and the mountain valleys of central Idaho around Stanley are among the least lit places in the lower 48. On a storm night those skies make a faint aurora easier to see than from a town that sits a little farther north but under its own glow. Mountain horizons are the catch: in the valleys, the northern sky starts ten or twenty degrees up, which hides the low edge of a display. Open plains and high benches do better than canyon floors.</p>
<h2>Two time zones, one storm</h2>
<p>Idaho is split between Pacific time in the panhandle and Mountain time in the south, a detail that confuses storm watchers more than it should. The aurora does not care about clocks: a storm that peaks at 05 UT peaks at 9 pm in Sandpoint and 10 pm in Boise during standard time. The tool takes the time zone of the place you type and prints every hour in it, so the best hours it shows for Coeur d'Alene and Idaho Falls on the same night can look an hour apart while describing the same burst of activity.</p>
<h2>Seasons and weather</h2>
<p>Boise's sky is at its clearest in ${ce.clearest.name}, at ${h.num(ce.clearest.cloud, 0)}% cloud amount in NASA POWER averages, and cloudiest in ${ce.cloudiest.name}, at ${h.num(ce.cloudiest.cloud, 0)}%, when winter inversions trap low cloud on the plain. The dark hours run from about ${h.num(h.monthly('idaho', 'boise')[5].hours, 1)} on the 15th of June to ${h.num(h.monthly('idaho', 'boise')[11].hours, 1)} in mid-December, as the table below shows. Late summer and early autumn combine both, which is why ${h.bestMonths('idaho', 'boise', 1)[0].name} comes first by clear dark hours. For the panhandle, the ${h.a('city:washington/spokane', 'Spokane page')} is the closest match.</p>`,
  related: ['region:washington', 'region:montana', 'city:washington/spokane', 'region:oregon', 'best-places-northern-lights-usa'],
  extraSources: [{ name: 'National Park Service, Craters of the Moon designated an International Dark Sky Park', url: 'https://www.nps.gov/crmo/learn/news/craters-of-the-moon-designated-an-international-dark-sky-park.htm' }],
});
