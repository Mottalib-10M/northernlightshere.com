/** llms.txt (RECETTE §21), generated at build from the page registry. */
import { PAGES, REGION_PAGES, CITY_PAGES, regionId, cityId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { regionRef, townRef, TOWNS } from '../lib/data';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> Northern lights forecast per town for the United States, Canada and the United Kingdom: a yes, maybe or no for tonight and the next two nights, with the best hours. It compares the NOAA SWPC planetary Kp forecast (3-hour blocks) and the OVATION aurora model with the Kp each place needs, from its AACGM-v2 magnetic latitude (at each Kp the more southern of the SWPC oval rule and the NOAA G scale latitudes), the hours with the Sun 18 degrees below the horizon, and the hourly cloud forecast of the National Weather Service (MET Norway outside the US). ${TOWNS.length} towns. Live data are fetched by the visitor's browser. Published by Radif Partners. Last reviewed ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...PAGES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## States, provinces and countries',
    ...REGION_PAGES.map((r) => `- [${regionRef(r.slug).name}](${SITE_URL}${route(regionId(r.slug), 'en')}): ${r.intro}`), '',
    '## Cities',
    ...CITY_PAGES.map((c) => `- [${townRef(c.region, c.slug).name}](${SITE_URL}${route(cityId(c.region, c.slug), 'en')}): ${c.intro}`), '',
    '## About',
    `- [How the answer works](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
