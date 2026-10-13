# Écrire ou étoffer une page d'« Aurora Tonight » (us-aurora)

Notice pour les agents qui écrivent ou prolongent le site. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9, §9.3, §11, §17.4, §21, §26).

Le site : « will I see the northern lights tonight here? ». Pour une ville, un code ZIP ou des coordonnées, il donne
**oui / peut-être / non** avec les heures, en croisant le Kp prévu par le SWPC, l'OVATION, la latitude magnétique du lieu,
la nuit noire (Soleil à −18°) et la couverture nuageuse heure par heure. **Anglais américain seul**, sous `/en/`.
Éditeur : la société **Radif Partners** (jamais un nom de personne, ni photo, ni INSEAD, ni Mines, ni LinkedIn).
Aucun lien vers un autre site du portefeuille (`_trame/domaines-ovh.txt`), jamais « taxineo ». **Jamais « NOAA » dans le
nom du site ni le logo** (le nom de l'agence reste permis dans le texte, comme source).

**L'angle** : le premier résultat Google (SWPC, spaceweatherlive.com) donne un Kp planétaire ou des probabilités par
bande de latitude, sans réponse pour un lieu, et pousse une appli ou un abonnement. Ici : la réponse pour TA ville,
avec les heures, et chaque règle publiée sur `/en/method/`.

## Les données et leurs droits (règle 5 : rien d'inventé)

| Donnée | Source | Droits | Où |
|---|---|---|---|
| Kp observé, estimé, prévu 3 jours (blocs de 3 h) | SWPC `products/noaa-planetary-k-index-forecast.json` | domaine public (œuvre du gouvernement US), CORS `*` vérifié le 2026-10-12 | navigateur, `src/lib/live.ts` |
| Grille OVATION (probabilité %, 360 × 181) | SWPC `json/ovation_aurora_latest.json` (~0,9 Mo, gzip) | domaine public, CORS `*` | navigateur |
| Couverture nuageuse horaire, US | NWS `api.weather.gov/points` → `gridpoints/.../skyCover` | domaine public, CORS `*` | navigateur |
| Nuages hors US (et secours US) | MET Norway Locationforecast 2.0 `compact`, `cloud_area_fraction` | CC BY 4.0 ; conditions lues le 2026-10-12 : appels navigateur admis pour un site à faible trafic qui s'identifie par l'en-tête Origin (envoyé par le navigateur), coordonnées tronquées, **au-delà d'un trafic élevé il faut un proxy avec cache** (à prévoir si le site dépasse quelques milliers de visites/jour) | navigateur |
| ~~Open-Meteo~~ | écarté : l'API gratuite interdit l'usage commercial, et un site avec publicité est commercial (conditions lues le 2026-10-12) | – | – |
| Latitude magnétique AACGM-v2 à 110 km, époque 2026-10 | paquet `aacgmv2` 2.7.1 (Shepherd 2014, IGRF-14) | faits calculés | `src/data/places.json`, `public/geo/aacgm-grid.json` |
| Couverture nuageuse moyenne mensuelle 2001-2025 | NASA POWER `CLOUD_AMT` (CERES SYN1deg) | données NASA ouvertes | `src/data/climate.json` |
| Positions des villes, codes ZIP | Census Bureau, Gazetteer 2024 | domaine public | `places.json`, `public/zip/NN.json` |
| Contours des terres | Natural Earth 1:110m | domaine public | `public/geo/land.json` |
| Cycle solaire (observé, prévu) | SWPC `json/solar-cycle/*.json`, instantané | domaine public | `src/data/solar-cycle.json` |

Scripts rejouables : `scripts/build-data.py` (lieux, AACGM, nuages, grille, ZIP, terres ; venv avec `aacgmv2 timezonefinder`),
`scripts/fetch-swpc-snapshot.py` (cycle solaire), `scripts/astro-reference.py` (valeurs de référence DE421 des tests ; venv avec `skyfield`).
Bruts dans `.cache-raw/` (hors dépôt). Faits SWPC recopiés pour la rédaction : `research/swpc-facts.txt`.

## Les règles du verdict

Toutes dans `src/data/params-2026.json > method`, testées dans `tests/engine.test.ts` :
- **Ligne de visibilité** (Kp → latitude magnétique d’où l’aurore se voit) : à chaque Kp, la plus méridionale de deux lignes, bord de l’ovale SWPC (66° − 2° par Kp) et
  points de l'échelle NOAA G (Kp 6 à 9 : 55, 50, 45, 40°), linéaires entre eux. Kp nécessaire = inverse (bissection). Conséquence : entre ~53,3° et 56° le Kp nécessaire égale le Kp au zénith.
- **Kp au zénith** : (66 − latitude magnétique) ÷ 2.
- **Règles propres au site** (`ownRules`) : portée du ciel 500 km, OVATION 10 % / 5 %, ciel clair ≤ 30 %, coupé ≤ 70 %, marge 1 Kp,
  Lune ≥ 75 % éclairée et ≥ 10° de haut. Chaque heure = min(activité, ciel), plafonnée par l'obscurité et la Lune ; la nuit = meilleure heure,
  meilleur créneau = plus longue suite d'heures à ce niveau.

## Les fichiers d'une page

| Page | Fichier | Route |
|---|---|---|
| Outil ou guide | `src/content/pages/<id>.ts` (`definePage`) | `/en/<slug>/` |
| État, province ou pays | `src/content/regions/<slug>.ts` (`defineRegion`) | `/en/northern-lights/<slug>/` |
| Ville | `src/content/cities/<region>--<slug>.ts` (`defineCity`) | `/en/northern-lights/<region>/<slug>/` |
| Accueil | `src/content/home.ts` | `/en/` |

Modèles : `pages/geomagnetic-storm-scale.ts` (guide), `pages/kp-index.ts` (outil), `regions/michigan.ts`, `cities/michigan--marquette.ts`.
Copier la **structure**, jamais les phrases. Une ville doit figurer dans `src/data/places.json` avec `"page": true` (sinon : modifier
`CITY_PAGES` de `scripts/build-data.py` et relancer le script).

Identifiants de liens (`h.a(id, texte)`) : `home`, `method`, `about`, les `id` des pages, `region:<slug>`, `city:<region>/<slug>`.
Un identifiant inconnu fait échouer le test.

Le composant affiche seul : l'outil réglé sur le lieu, la bande de chiffres (Kp nécessaire, niveau G, Kp au zénith, meilleur mois),
le chapeau replié, le corps, puis les tableaux générés (villes de la région par Kp, obscurité et nuages par mois). **La prose ne les répète pas.**

### Champs d'un guide ou d'un outil (`definePage`)

| Champ | Règle |
|---|---|
| `id` = `slug` = nom du fichier | minuscules et tirets, sans chiffre (un nombre seul dans l'URL ferait passer la page pour une page « par montant ») |
| `group`, `order` | `forecast` (outils) ou `guides` |
| `title` | 50 à 60 caractères, contient 2026, terme-clé en tête ; jamais How/What/Where/Can/Is ni pays en tête ; pas de tiret cadratin ; unique |
| `description` | 150 à 160 caractères, contient 2026 et un fait chiffré ; unique |
| `h1`, `intro`, `nav`, `card` | H1 sans année ; une phrase ; libellé court ; une phrase |
| `resume` | **UN** paragraphe ≥ 120 mots (viser 140-170), la réponse avec les chiffres ; la première phrase porte le message |
| `body(h)` | HTML. Outil : ≥ 450 mots de prose hors tableaux. **Guide : ≥ 1 050 mots** (check-seo veut 1 200 avec chapeau et FAQ) |
| `faqs` | 4 à 8 vraies questions, réponses de **45 à 85 mots** (le test compte 42 à 88), chiffre + condition + source, uniques sur tout le site |
| `tool` ou `mini` | outil : `tonight`, `nights`, `kp`, `dark`, `map`, `places` ; guide : `mini: { kind, arg? }` placé après le chapeau |
| `related` | 3 à 6 ids existants |
| `sources` | ≥ 3 clés de `params-2026.json > sources` |

### Champs d'une région ou d'une ville

| Champ | Règle |
|---|---|
| `title` | 50 à 60 car., commence par « Northern Lights <Nom> 2026: » (régions : nom de l'État ou « Canada », « UK » ; villes : nom de la ville), unique |
| `description` | 150 à 160 car., 2026, au moins un chiffre calculé avec le kit |
| `intro` | une phrase propre au lieu |
| `resume` | UN paragraphe ≥ 120 mots, chiffres du kit |
| `body(h)` | **≥ 330 mots de prose** écrite pour ce lieu seulement (viser 380 à 500). Deux ou trois `h2` **propres au lieu** (jamais le même titre d'une page à l'autre). Au moins un mini : `${h.mini('kpNeed', { place: 'region/slug', region: 'slug' })}` ou `${h.mini('darkMonth', { place: 'region/slug', month: 10 })}` |
| `faqs` | 3 à 5 questions **contenant le nom du lieu** (ville ou région), réponses 45 à 85 mots, uniques |
| `related` | 3 à 6 ids : la région, des villes voisines, un outil ou un guide |
| `extraSources` | les pages officielles lues pour les faits sur le lieu (parc, réserve de ciel noir, office de tourisme public) : `{ name, url }` |

## La règle des chiffres (non négociable)

Aucune latitude magnétique, aucun Kp, aucune heure d'obscurité, aucun pourcentage de nuages n'est tapé en dur : tout se lit avec le kit
(`src/lib/kit.ts`, importé `KIT as K`, et passé au corps sous `h`).

```ts
const f = K.facts('michigan', 'marquette');   // { town, label, name, mlat, need, overhead, g }  need/overhead : null au-delà de Kp 9
K.kp(f.need)            // "5.3" ou "beyond 9"
K.gName(f.g)            // "G1 (Minor)" ou "no storm"
K.needText(f)           // "Kp 5.3, a G1 (Minor) storm"
const m = K.monthly('michigan', 'marquette'); // 12 mois : { name, hours, kind, start, end, nautical, cloud, clearDark }, 15 du mois 2027
K.bestMonths(r, s, 3); K.noDarkMonths(r, s); K.cloudExtremes(r, s)  // { clearest, cloudiest }
K.ladder('michigan')    // villes de la région triées par Kp nécessaire
K.townRef(r, s).lat / .lon / .tz ; K.regionRef(r).name ; K.P.facts.gScale[0..4] ; K.METHOD.* ; K.num(x, d) ; K.listOf([...])
```

Dans `body(h)` : tout le kit, plus `h.a(id, texte)`, `h.table(entêtes, lignes, légende, alignements)`, `h.src(clé, texte)`,
`h.ext(url, texte)`, `h.box(titre, html)`, `h.mini(kind, arg)`.

Minis disponibles (`src/lib/minis/`) : `kpNeed` {place, region}, `darkMonth` {place, month}, `gScale`, `phoneExposure`, `solarCycle`,
`windTravel`, `auroraHeight`, `moonPhase`. Un nouveau mini = un fichier, qui appelle le moteur.

**Faits sur un lieu** (parc, réserve de ciel noir, rive orientée au nord, altitude d'un col) : uniquement s'ils sont lus sur une page
officielle ou institutionnelle (NPS, parc d'État, DarkSky International, Parks Canada, office public), citée dans `extraSources`
et vérifiée en 200 avec `curl -sL -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0' <url>`. Un fait incertain ne s'écrit pas.
Jamais de nom d'agence de voyage, de guide privé, d'hôtel ni d'appli. Jamais d'affirmation sur « combien de nuits par an on la voit » sans source.

## Pièges rencontrés (à ne pas refaire)

- **Jamais de mini-simulateur dans un `<p>`** : `<p>${h.mini(...)}</p>` ou un mini au milieu d'un paragraphe fait sortir un `<div>` d'un `<p>` ; le navigateur referme le paragraphe, le DOM ne correspond plus au HTML de React et l'hydratation casse (erreur React 418, invisible au build et aux tests). Le mini se pose entre deux blocs.
- **Une apostrophe droite dans une chaîne entre apostrophes** (`'Toronto's'`) casse la compilation du fichier, et les tests de ce fichier ne se lancent plus sans bruit : écrire `’` ou utiliser des accents graves.
- **Un tri `localeCompare` exécuté dans le navigateur** peut différer de Node : les listes des minis sont triées sur une clé sans accents, en ordre des points de code.
- **Le test « prose » s'arrête au premier lien inconnu** : tant qu'une page liée n'existe pas, son nombre de mots n'est pas mesuré. Recompter une fois toutes les pages écrites.

## Ton et langue

- Anglais américain, voix humaine, phrases de longueur variable, **le chiffre d'abord**. Les pages canadiennes et britanniques
  restent en anglais américain mais nomment les lieux et organismes locaux (Parks Canada, Met Office).
- Interdits (le test les refuse) : tirets cadratin et demi-cadratin, « it's important to note », « dive into », « delve », « whether you're »,
  « navigate the », « Moreover », « Additionally », « Furthermore », « game changer », « unlock », « breathtaking », « magical »,
  « once in a lifetime », « bucket list ». Pas de triplets en série, pas de conclusion qui résume, pas d'émoji.
- Honnêteté : une chance, jamais une promesse.
- **Unicité** (§6) : `check-unique` compare toutes les pages, chiffres neutralisés, seuil 30 %, sur les 12 000 premiers caractères.
  Ouvrir le corps sur ce que le lieu a de plus singulier (géographie, horizon, climat, ville voisine, histoire locale vérifiée),
  avec un vocabulaire propre ; ne pas réutiliser les tournures des pages modèles ni d'une autre ville.

## Contrôles

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/us-aurora
PAGE_FILES=region:michigan,city:michigan/marquette npx vitest run tests/pages.test.ts   # vos pages
npx vitest run                                                                           # tout
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build && S=scripts
python3 $S/check-seo.py . ; python3 $S/check-trame.py . ; python3 $S/check-unique.py dist
python3 $S/check-simulateurs.py . ; python3 $S/check-regles.py . ; python3 $S/check-portefeuille.py .
python3 $S/check-snippets.py . ; python3 $S/check-cookies.py . ; python3 $S/check-liens.py dist
node $S/check-sources.mjs . ; node $S/check-legal.mjs . ; node $S/check-contraste.mjs dist
node $S/check-saisie.mjs dist --max=60 ; node $S/check-nombres.mjs dist ; node $S/typo-nbsp.mjs dist --check
node $S/check-url-propre.mjs dist ; node $S/check-premier-ecran.mjs .
node $S/check-layout.mjs dist > /tmp/layout-aurora.log 2>&1   # long
```

Serveur local : port **4443** (`npm run preview`). L'arrêter par son port (`lsof -ti tcp:4443 | xargs kill`), jamais `pkill -f`.

## Mise à jour

- Chaque année (octobre) : relancer `build-data.py` (nouvelle époque AACGM, dérive du pôle), `fetch-swpc-snapshot.py`, relire chaque source de
  `params-2026.json` → `params-2027.json`, `retrieved_at`, puis `npx vitest run` et tous les contrôles.
- Si le SWPC change le format d'un JSON (il l'a fait en 2025-2026 : tableaux → objets), les parseurs de `engine/aurora.ts` acceptent les deux
  formes ; ajouter la nouvelle et une fixture dans `tests/fixtures/`.
- Trafic élevé : prévoir un proxy avec cache pour MET Norway (conditions), et éventuellement pour OVATION.

## Ce qu'on ne fait pas

- Pas de dépôt GitHub, pas de push, pas de DNS sans validation de l'éditeur.
- Ne pas toucher à `_trame` ni à la RECETTE ; suggestions dans le compte rendu.
- `ADS_ENABLED`/`CLARITY_ID` : laissés vides tant que l'éditeur n'a pas décidé.
