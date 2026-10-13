import { defineCity } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const f = K.facts('canada', 'montreal');
const m = K.monthly('canada', 'montreal');
const ce = K.cloudExtremes('canada', 'montreal');
const best = K.bestMonths('canada', 'montreal', 3);
const ot = K.facts('canada', 'ottawa');
const qc = K.facts('canada', 'quebec-city');
const bu = K.facts('vermont', 'burlington');

export default defineCity({
  region: 'canada',
  slug: 'montreal',
  title: 'Northern Lights Montreal 2026: Storm Needed, Laurentian Sky',
  description: `Northern lights in Montreal in 2026: tonight's yes, maybe or no, the Kp ${K.kp(f.need)} storm needed at ${K.num(f.mlat, 1)}° magnetic latitude, and the darker Laurentians to the north.`,
  intro: 'Montreal is an island city whose own light hides most auroras, but the Laurentian hills rise just beyond the north shore of the river.',
  resume: `Montreal needs ${K.needText(f)}, for the northern lights to appear. The island sits at ${K.num(f.mlat, 1)} degrees magnetic latitude in the AACGM model, ${K.num(ot.mlat - f.mlat, 1)} degrees lower than Ottawa and ${K.num(qc.mlat - f.mlat, 1)} degrees lower than Quebec City, which needs about Kp ${K.kp(qc.need)}. At about Kp ${K.kp(f.overhead)} the oval edge reaches overhead in this site's model, so once a storm crosses Montreal's threshold it rarely stays a timid glow on the horizon. Some full darkness remains every month, ${K.num(m[5].hours, 1)} hours on June 15, rising to ${K.num(m[11].hours, 1)} hours on December 15, from ${m[11].start} to ${m[11].end}. The NASA POWER cloud amount runs from ${K.num(ce.clearest.cloud, 0)}% in ${ce.clearest.name} to ${K.num(ce.cloudiest.cloud, 0)}% in ${ce.cloudiest.name}. Combining darkness with clear sky, ${K.listOf(best.map((b) => b.name))} come first. The tool reads tonight's SWPC Kp blocks and MET Norway cloud cover for Montreal.`,
  faqs: [
    { q: 'Can the northern lights be seen from Montreal itself?', a: `Only during strong storms, and even then poorly from downtown. Montreal needs about Kp ${K.kp(f.need)}, a ${K.gName(f.g)} storm, and the island's glow hides the faint edges of a display. During the strongest events of the cycle color has been visible from the city, but a dark site north of the river gives a much better chance at the threshold.` },
    { q: 'Where is it dark enough near Montreal to watch the aurora?', a: `North of the island, beyond the suburbs of Laval and the north shore, where the Laurentians begin and lakes open the view. Farmland east and west along the river works too. At Kp ${K.kp(f.need)} or more the aurora can rise high, so any spot with a clear northern half of the sky and no nearby lights will do.` },
    { q: 'Is winter or autumn better for the aurora in Montreal?', a: `Autumn starts ahead: ${best[0].name} ranks first in Montreal by clear dark hours, with ${K.num(m[best[0].month - 1].hours, 1)} hours of full darkness on the 15th and about ${K.num(m[best[0].month - 1].cloud, 0)}% cloud amount. January and February follow closely, with longer nights and cold, clear spells, while ${ce.cloudiest.name} is the cloudiest month and the least promising time to plan around.` },
  ],
  body: (h) => `
<h2>An island lit from shore to shore</h2>
<p>Montreal occupies an island in the St. Lawrence, densely built and lit from one end to the other, with Mount Royal rising in the middle. That geography leaves no dark corner inside the city. The aurora at Montreal's threshold of about Kp ${h.kp(f.need)} needs to be looked for from off the island, and the direction that pays is north: across the Rivière des Prairies, past Laval and the northern suburbs, the land starts to climb into the Laurentians, a region of forested hills and lakes where the night grows darker the farther you go.</p>
${h.mini('darkMonth', { place: 'canada/montreal', month: 1 })}
<h2>Between Ottawa and Quebec City</h2>
<p>The three cities of the corridor sit close together in magnetic latitude, but not identically. Quebec City, downstream, needs about ${h.num(f.need! - qc.need!, 1)} Kp less than Montreal; Ottawa, upstream, about ${h.num(f.need! - ot.need!, 1)} Kp less. The differences are small but real on a borderline night, when the Kp blocks of the SWPC forecast hover right around the threshold. South of the border, Burlington in Vermont needs about Kp ${h.kp(bu.need)}, which shows how quickly the odds fall away from the St. Lawrence toward New England.</p>
<p>Montreal shares one trait with Ottawa: the Kp that makes aurora visible and the Kp that brings the oval edge overhead coincide here, so a storm that reaches the city often arrives as a broad display rather than a thin arc on the horizon. It also means a forecast just short of the threshold usually gives nothing at all from the island.</p>
<h2>Winter cloud and the September window</h2>
<p>Storm systems tracking up the St. Lawrence valley keep the sky grey for long periods in early winter, and ${h.cloudExtremes('canada', 'montreal').cloudiest.name} carries the highest cloud amount of the year. After a cold front passes, a sharp, dry Arctic air mass often follows with one or two very clear nights, and those are the ones to watch when a storm is forecast. September, with ${h.num(m[8].hours, 1)} dark hours on the 15th and a milder climate, is the easiest month for a first try. Snow cover later in the season works against you in one way: a white landscape reflects so much skyglow that the drive away from the suburbs has to be longer in February than in September to reach the same darkness. For the capital upstream see the ${h.a('city:canada/ottawa', 'Ottawa page')}; for the state just south, the ${h.a('region:vermont', 'Vermont page')}.</p>`,
  related: ['region:canada', 'city:canada/ottawa', 'city:canada/toronto', 'region:vermont', 'region:new-york'],
});
