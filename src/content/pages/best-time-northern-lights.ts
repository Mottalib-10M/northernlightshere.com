import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const clock = (x: number) => (x === 0 ? 'midnight' : x === 12 ? 'noon' : x < 12 ? `${x} am` : `${x - 12} pm`);
const [h0, h1] = K.P.facts.bestLocalHours;
const win = `${clock(h0)} to ${clock(h1)}`;
const dlM = K.monthly('minnesota', 'duluth');
const fbM = K.monthly('alaska', 'fairbanks');
const mqM = K.monthly('michigan', 'marquette');
const dlBest = K.bestMonths('minnesota', 'duluth', 3);
const fbNo = K.noDarkMonths('alaska', 'fairbanks');
const dl = K.facts('minnesota', 'duluth');
const moonPct = K.num(K.METHOD.moonBright * 100, 0);
const hrs = (x: number) => K.num(x, 1);

export default definePage({
  id: 'best-time-northern-lights',
  group: 'guides',
  order: 20,
  slug: 'best-time-northern-lights',
  nav: 'Best time of year and night',
  card: 'The season, the hours and the Moon that give aurora its best chance',
  title: 'Best Time to See Northern Lights 2026: Month, Hour, Moon',
  description: `Best time to see the northern lights in 2026: SWPC says ${win} local time and the weeks around the equinoxes, with dark hours by month and moon phase.`,
  h1: 'The best time to see the northern lights: season, hour and Moon',
  intro: 'Three clocks run at once: the season sets the darkness, the night sets the hour, and the Moon sets the contrast.',
  resume: `The best time to see the northern lights is from ${win} local time, on a moonless night, in the months around the spring and fall equinoxes. The hours come from SWPC, which writes that the best aurora is usually within an hour or two of midnight and that the active window widens toward evening and morning as storms grow. The season comes from two effects. Geomagnetic storms show a tendency, noted by SWPC, to be larger near the equinoxes, and darkness decides whether you can see them at all: on the 15th of each month Duluth gets from ${hrs(Math.min(...dlM.map((m) => m.hours)))} hours of full darkness in June to ${hrs(Math.max(...dlM.map((m) => m.hours)))} in December, while Fairbanks has none from ${fbNo[0]} to ${fbNo[fbNo.length - 1]}. Cloud then cuts the useful hours. In Duluth, the months with the most clear dark hours on average are ${K.listOf(dlBest.map((m) => m.name))}. A Moon more than ${moonPct}% lit and well above the horizon washes out faint arcs, so the week around the new moon is the strongest bet.`,
  faqs: [
    { q: 'Which months are best for the northern lights in the northern United States?', a: `September to March, with a slight edge for the weeks around the equinoxes. SWPC notes that larger storms tend to occur near the equinoxes, and by late September the northern tier already has long nights. In Duluth, the months with the most clear dark hours on average in the NASA POWER cloud record are ${K.listOf(dlBest.map((m) => m.name))}. Summer nights are short and partly twilit.` },
    { q: 'Why are the equinoxes better for geomagnetic storms?', a: 'SWPC attributes it to subtleties in the way the solar wind couples with Earth’s magnetic field. The usual explanation is geometric: around March and September the tilt of Earth’s magnetic axis relative to the incoming solar wind lets a southward magnetic field in the wind connect more efficiently. It is a tendency over many years, not a rule for any given week.' },
    { q: 'Is midnight really the peak hour for aurora?', a: `On average, close to it. SWPC writes that the best aurora is usually within an hour or two of midnight, from ${win} local time, because the night side of Earth faces the magnetotail where auroral electrons are accelerated. During big storms the active window widens into the evening and toward dawn, and a substorm can flare at any dark hour. The tonight page rates each hour separately.` },
    { q: 'How bright does the Moon have to be to spoil the aurora?', a: `This site treats the Moon as a problem when it is at least ${moonPct}% lit and more than ${K.METHOD.moonAltitude} degrees above the horizon; that is one of its own rules, listed on the method page. SWPC says a full moon diminishes the apparent brightness of the aurora, not its actual brightness. A strong storm still shows through moonlight; a faint G1 arc low in the north often does not.` },
    { q: 'Does daylight saving time change the best viewing hours?', a: 'The physics follows the Sun, not the clock. SWPC gives the window in local time, and when daylight saving time is in force, clock midnight falls about an hour earlier relative to the Sun than in winter. In practice the useful hours in late September and early March run about an hour later on the clock than the same Sun position would give in standard time.' },
  ],
  body: (h) => `
<h2>The hour: why late evening to early morning</h2>
<p>The aurora is not switched on at dusk and off at dawn. It is always present around the magnetic pole, and what changes through the night is which part of the oval sits above you. The brightest, most active part lies on the side of Earth facing away from the Sun, fed by electrons accelerated in the tail of the magnetosphere, as SWPC's ${h.src('swpc_tutorial', 'aurora tutorial')} explains. As your town rotates through that sector, the display tends to peak. SWPC's ${h.src('swpc_tips', 'viewing tips')} put the best window from ${win} local time and add that the active period stretches toward the evening and the morning as geomagnetic activity rises.</p>
<p>In practice, on a night with a moderate Kp, the first sign in the northern states is often a quiet arc low in the north during the evening. The SWPC ${h.src('swpc_aurora', 'aurora page')} describes the sequence: arcs in the evening, twisting and brightening near midnight during a substorm, then patchy, pulsing glow toward morning. Substorms do not keep a schedule, though, and a strong storm can light the sky at nine in the evening. The tonight forecast on the ${h.a('home', 'home page')} rates every hour of the night for your town instead of assuming the midnight peak.</p>
<p>Clock time adds a twist. SWPC's window is local time, and the physics follows the Sun. When daylight saving time is in force, the solar midnight of a town sits closer to 1 am on the clock, so in September, October and March the window effectively slides an hour later on your watch.</p>

<h2>The season: equinoxes, darkness and cloud</h2>
<p>SWPC notes a tendency for larger geomagnetic storms near the spring and fall equinoxes, which it attributes to subtleties in the way the solar wind interacts with Earth's magnetosphere. It is a statistical tendency, not a calendar: a big storm can arrive in any month, and the G5 storm of ${h.day(h.P.facts.storms[0].date)} came well away from either equinox. What the equinoxes add is a combination. In late September the northern states already have long nights, the air is often milder than in January, and storms are slightly more likely.</p>
<p>Darkness is the stronger seasonal effect. The table shows the hours of full astronomical darkness, with the Sun more than 18 degrees below the horizon, on the 15th of each month, for Fairbanks, Duluth and Marquette, and the number of those hours you could expect to be clear on an average night, using the 2001 to 2025 cloud climatology from ${h.src('nasa_power', 'NASA POWER')}.</p>
${h.table(['Month', 'Fairbanks, dark hours', 'Duluth, dark hours', 'Duluth, clear dark hours', 'Marquette, clear dark hours'], dlM.map((m, i) => [m.name, fbM[i].kind === 'never' ? 'none' : hrs(fbM[i].hours), hrs(m.hours), hrs(m.clearDark), hrs(mqM[i].clearDark)]), 'Astronomical darkness on the 15th of each month (2027), cloud from NASA POWER, clear dark hours = dark hours × (1 − mean cloud).', ['l', 'r', 'r', 'r', 'r'])}
<p>Three things stand out. Interior Alaska, the easiest place in the country by Kp, loses its aurora season entirely from ${fbNo[0]} to ${fbNo[fbNo.length - 1]}: SWPC itself warns that a summer vacation to the Arctic for aurora usually does not work, because the light may be there but the sky never gets dark. Duluth never loses darkness completely, but in June it keeps only about ${hrs(dlM[5].hours)} hours, squeezed around ${dlM[5].start} to ${dlM[5].end}. And cloud reshapes the ranking: Marquette has the same darkness as Duluth but a cloudier winter, so its best months by clear dark hours are ${h.listOf(h.bestMonths('michigan', 'marquette', 3).map((m) => m.name))}, earlier and later in the season than the darkest ones.</p>
<p>The mini-simulator above gives the same figures for any town on the site and any month. The ${h.a('dark-sky-hours', 'dark sky hours tool')} gives the exact dark window for tonight.</p>

<h2>The Moon: contrast, not brightness</h2>
<p>A bright Moon does not weaken the aurora; it brightens the sky behind it. SWPC puts it precisely: a full moon diminishes the apparent brightness, not the actual brightness. For a display that fills the sky, the Moon hardly matters. For the faint green band that a G1 storm brings to the northern tier, often only a few degrees above the horizon, it can make the difference between seeing it and not.</p>
<p>The site's forecast turns a yes into a maybe when the Moon is at least ${moonPct}% lit and higher than ${h.METHOD.moonAltitude} degrees above the horizon, unless the forecast Kp clears the town's need by a full point; it is a rule of its own, published on the ${h.a('method', 'method page')}. Below that, the Moon is either too thin or too low to matter much. The darkest week runs about three days either side of the new moon; a waxing crescent sets in the evening, before the peak hours, and a waning crescent rises only before dawn, so both leave the midnight window dark.</p>
${h.mini('moonPhase')}
<p>Pick a month to see its new and full moons. A trip planned around the new moon, in a month with long nights and a reasonable cloud record, gives the best odds the calendar can offer; the Kp of the night still decides the rest.</p>

<h2>Putting the three clocks together</h2>
<p>For a town in the northern tier, the strongest plan is a week around a new moon between late August and mid-April, with the most attention in the weeks around the equinoxes, and an evening spent outside from ${win}. Duluth, for instance, needs about Kp ${h.kp(dl.need)}, ${h.gName(dl.g)}, so the deciding question each night is whether a storm of that size falls inside its dark hours. The ${h.a('aurora-forecast', 'three-night forecast')} answers it from the SWPC Kp forecast and the hourly cloud forecast, and the ${h.a('best-places-northern-lights-usa', 'best places guide')} compares the regions where the smallest storm is enough.</p>
<p>On the night itself, timing is also a matter of patience. Arrive before the window opens, because eyes need time: the National Park Service at ${h.ext('https://www.nps.gov/dena/learn/nature/aurora.htm', 'Denali')} advises at least 30 minutes away from bright light for full dark adaptation, and a phone screen at full brightness resets the clock. Displays come in pulses. A substorm can brighten the north for a while and then fade back to a dim band, sometimes for a long lull before the next surge, so a quiet sky at 11 pm says little about 1 am. Checking the forecast again around midnight costs nothing, and the hourly verdict on the tonight page is refreshed with each new SWPC and cloud forecast.</p>
<p>A last point about planning far ahead: no one can forecast a specific storm weeks in advance. SWPC's ${h.src('swpc_27day', '27-day outlook')} uses the Sun's rotation to flag days when a recurring high-speed stream may return, which is useful for choosing a week, but coronal mass ejections, the source of the largest storms, are only seen once they leave the Sun, from less than a day to several days before they arrive. The ${h.a('solar-cycle', 'solar cycle guide')} explains why the next few years still bring them.</p>`,
  mini: { kind: 'darkMonth', arg: { place: 'minnesota/duluth', month: 9 } },
  related: ['dark-sky-hours', 'aurora-forecast', 'best-places-northern-lights-usa', 'home', 'solar-cycle'],
  sources: ['swpc_tips', 'swpc_aurora', 'swpc_tutorial', 'nasa_power', 'swpc_27day', 'noaa_solcalc'],
});
