import { defineRegion } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const gf = K.facts('north-dakota', 'grand-forks');
const mi = K.facts('north-dakota', 'minot');
const wi = K.facts('north-dakota', 'williston');
const di = K.facts('north-dakota', 'dickinson');
const bi = K.facts('north-dakota', 'bismarck');
const ce = K.cloudExtremes('north-dakota', 'bismarck');
const best = K.bestMonths('north-dakota', 'bismarck', 3);

export default defineRegion({
  slug: 'north-dakota',
  title: 'Northern Lights North Dakota 2026: Tonight’s Odds by Town',
  description: `Northern lights in North Dakota in 2026: tonight's yes, maybe or no for your town, Kp ${K.kp(gf.need)} needed in Grand Forks and ${K.kp(bi.need)} in Bismarck, with dark hours and clouds.`,
  intro: 'North Dakota has the lowest Kp thresholds of the lower 48 in this comparison, and almost nothing between you and the northern horizon.',
  resume: `North Dakota is the best placed state of the lower 48 in this site's comparison. The whole state sits between about ${K.num(di.mlat, 1)} and ${K.num(gf.mlat, 1)} degrees magnetic latitude in the AACGM model, because the magnetic pole lies due north, over the Canadian Arctic. Grand Forks needs a planetary Kp of about ${K.kp(gf.need)} and Minot about ${K.kp(mi.need)}, right at the G1 level of NOAA's storm scale; Bismarck needs about ${K.kp(bi.need)}. The landscape helps as much as the latitude: flat or rolling prairie, small towns and long, dark horizons in every direction. Clouds are moderate, with Bismarck's NASA POWER cloud amount between ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} and ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}, and the months with the most clear dark hours there are ${K.listOf(best.map((b) => b.name))}. The tool opens on Bismarck; type your own town or a ZIP code.`,
  faqs: [
    { q: 'How often can you see the northern lights in North Dakota?', a: `Whenever a minor storm meets a clear, dark night. Grand Forks and Minot need about Kp ${K.kp(gf.need)} to ${K.kp(mi.need)}, the G1 level, which NOAA counts at about 1,700 storms per eleven-year solar cycle. Near solar maximum that means many chances a year; clouds and short summer nights take some away.` },
    { q: 'Where is the best place in North Dakota to see the aurora?', a: `The north of the state, away from the few cities: the country around the Turtle Mountains, Devils Lake and the Canadian border, where the threshold falls to about Kp ${K.kp(gf.need)}. The flat horizon means almost any rural road with no farmyard lights to the north will do.` },
    { q: 'Do you need a storm to see the aurora in North Dakota?', a: `Usually a small one. Thresholds here run from about Kp ${K.kp(gf.need)} to ${K.kp(di.need)}, so a G1 storm is the typical requirement, and a strong substorm on a Kp 4 night can also reach the northern horizon. The OVATION line of the tool shows when that happens in the current hour.` },
  ],
  body: (h) => `
<h2>Closer to the magnetic pole than it looks</h2>
<p>On a globe, North Dakota is a mid-latitude state, between about 46 and 49 degrees north. On a magnetic map it is the northernmost of the lower 48 after the border strip of Minnesota, because the magnetic pole sits almost due north of it, in the Canadian Arctic. That is why Bismarck, at ${h.num(h.townRef('north-dakota', 'bismarck').lat, 1)} degrees north, needs less Kp than Seattle or Missoula, which lie farther north on the map. Every town in the state is within about ${h.num(di.need! - gf.need!, 1)} Kp of Grand Forks.</p>
<p>${h.mini('kpNeed', { place: 'north-dakota/minot', region: 'north-dakota' })}</p>
<h2>Prairie horizons and small lights</h2>
<p>The aurora at a town's threshold sits low on the northern horizon, and North Dakota's prairie leaves that horizon open. The Red River Valley in the east is as flat as land gets; the Missouri Coteau and the Badlands in the west have more relief but few lights. The main sources of glow outside the cities are the oil field flares and lights of the Williston Basin in the northwest, which can brighten the sky around Williston, at Kp ${h.kp(wi.need)}, and a long way beyond. Driving away from them, or using a hill to put them below the horizon, helps more than a slightly higher latitude.</p>
<h2>Eastern valley, western badlands</h2>
<p>The state divides into two landscapes. The Red River Valley in the east, around Fargo and Grand Forks, is farmland on a dead-flat lake bed, with towns every few miles and very little relief. West of the Missouri the land rises toward the Badlands of the Little Missouri, with buttes, draws and fewer people. For aurora purposes, the east has the lower thresholds and the flattest horizons; the west has darker skies and drier air. Both work on a G1 night. Grand Forks, the northernmost of the larger cities, needs about Kp ${h.kp(gf.need)}, and the drive from there to the Canadian border takes little more than an hour.</p>
<h2>Cold, wind and the clearest weeks</h2>
<p>Winter nights here are long, ${h.num(h.monthly('north-dakota', 'bismarck')[11].hours, 1)} hours of full darkness in mid-December in Bismarck, and often clear under Arctic high pressure, with dangerous wind chill. Autumn is the gentler season: ${best[0].name} leads Bismarck's clear dark hours, before the snow. Summer nights shrink to about ${h.num(h.monthly('north-dakota', 'bismarck')[5].hours, 1)} hours of real darkness in June. The ${h.a('city:north-dakota/fargo', 'Fargo page')} and the ${h.a('city:north-dakota/bismarck', 'Bismarck page')} give the month-by-month figures for each city.</p>`,
  related: ['city:north-dakota/fargo', 'city:north-dakota/bismarck', 'region:minnesota', 'region:montana', 'city:canada/winnipeg'],
});
