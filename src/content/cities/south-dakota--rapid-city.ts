import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('south-dakota', 'rapid-city');
const m = K.monthly('south-dakota', 'rapid-city');
const ce = K.cloudExtremes('south-dakota', 'rapid-city');
const best = K.bestMonths('south-dakota', 'rapid-city', 3);

export default defineCity({
  region: 'south-dakota',
  slug: 'rapid-city',
  title: 'Northern Lights Rapid City 2026: Tonight’s Odds, Kp Needed',
  description: `Northern lights in Rapid City in 2026: tonight's yes, maybe or no, Kp ${K.kp(f.need)} needed at ${K.num(f.mlat, 1)}° magnetic latitude, the plains north of the hills and the best months.`,
  intro: 'Rapid City sits where the Black Hills meet the plains; the northern horizon lies over the plains, not the hills.',
  resume: `From Rapid City the northern lights need a planetary Kp of about ${K.kp(f.need)}, a ${K.gName(f.g)} storm on the NOAA scale. The city lies at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, and the aurora reaches overhead only around Kp ${K.kp(f.overhead)}. Its position at the eastern foot of the Black Hills shapes the experience: the hills rise to the west and southwest, while the plains to the north and east are open, dry and very dark. Rapid City's NASA POWER cloud amount is lowest in ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}%, and highest in ${ce.cloudiest.name}, at ${K.num(ce.cloudiest.cloud, 0)}%, one of the lower winter figures among the cities on this site. By clear dark hours, the best months are ${K.listOf(best.map((b) => b.name))}. The city is in the Mountain time zone, so the tool gives its hours an hour behind Sioux Falls.`,
  faqs: [
    { q: 'Can you see the northern lights in Rapid City, South Dakota?', a: `Yes, during storms of about Kp ${K.kp(f.need)} or stronger, from a dark place with a view north over the plains. The open grassland north of the city, toward Sturgis and beyond, is darker and flatter than the Black Hills, whose ridges and pine forest close the horizon in most of their valleys.` },
    { q: 'Are the Black Hills near Rapid City a good place to watch the aurora?', a: 'For stars, yes; for a low aurora, only from high, open points with a clear northern view. The hills block much of the horizon from the canyons. On a moderate storm, the plains just east and north of the hills usually give a better view of the low northern sky, with similar darkness.' },
    { q: 'When are skies clearest for the aurora around Rapid City?', a: `In ${ce.clearest.name}, at ${K.num(ce.clearest.cloud, 0)}% cloud amount in NASA POWER averages, though summer nights are short. Counting dark hours too, ${K.listOf(best.map((b) => b.name))} come first. Winter nights offer ${K.num(m[11].hours, 1)} hours of full darkness on December 15, often under dry continental air with little haze.` },
  ],
  body: (h) => `
<h2>Hills to the west, plains to the north</h2>
<p>Rapid City grew along Rapid Creek where it leaves the Black Hills, and the city looks two ways. To the west, the pine-covered hills rise above town; to the north and east, the land drops onto the high plains. For the aurora, which at Rapid City's threshold sits low in the north, the plains side is the one that matters. The country along the highways north toward Belle Fourche or northeast toward the Cheyenne River is sparsely settled, with a nearly flat northern skyline and very little light.</p>
<p>Badlands National Park, about an hour east, is a well-known stargazing destination, with dark skies over eroded buttes. Its formations face every direction, so a high overlook with an open northern view is the place to wait for a storm there.</p>
${h.mini('kpNeed', { place: 'south-dakota/rapid-city', region: 'south-dakota' })}
<h2>Dry air and Chinook nights</h2>
<p>The western half of South Dakota is semi-arid, and Rapid City's skies are often clear, with less winter cloud than the eastern cities in NASA POWER averages. Warm downslope winds off the Black Hills can bring mild, clear nights in the middle of winter, with gusts. The National Weather Service forecast used by the tool covers the grid cell of the place you choose, so a site on the plains can differ from the city.</p>
<h2>Mountain time and the forecast blocks</h2>
<p>Rapid City runs on Mountain time, seven hours behind Universal Time in winter. The SWPC block from 03 to 06 UT is therefore 8 to 11 pm locally, and the block from 06 to 09 UT runs from 11 pm to 2 am, the stretch SWPC describes as the most active part of the night. Visitors arriving from the Central time zone sometimes look an hour too early; the hour strip of the tool is written in local time, so following it avoids the mistake.</p>
<h2>Compared with its neighbors</h2>
<p>Rapid City needs about the same storm as Sioux Falls and Billings, and a little more than Bismarck, ${h.kp(h.facts('north-dakota', 'bismarck').need)}. Driving north into North Dakota or Montana lowers the threshold; driving into the hills raises the darkness but closes the horizon. The ${h.a('region:south-dakota', 'South Dakota page')} lists the other towns, and the ${h.a('city:montana/billings', 'Billings page')} the closest western neighbor.</p>`,
  related: ['region:south-dakota', 'city:south-dakota/sioux-falls', 'city:montana/billings', 'city:north-dakota/bismarck', 'best-places-northern-lights-usa'],
  extraSources: [{ name: 'National Park Service, Badlands National Park', url: 'https://www.nps.gov/badl/index.htm' }],
});
