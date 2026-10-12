#!/usr/bin/env python3
"""Rebuilds the data files of the site from official or open sources (replayable).

  python3 -m venv .venv && .venv/bin/pip install aacgmv2 timezonefinder
  .venv/bin/python scripts/build-data.py [--gazetteer DIR] [--skip-power]

Inputs, downloaded into .cache-raw/ (outside git):
  - Census Bureau 2024 Gazetteer files (places, ZCTAs): coordinates of US towns and ZIP codes, public domain;
  - NASA POWER climatology API, parameter CLOUD_AMT (2001-2025, CERES SYN1deg): monthly mean cloud amount;
  - Natural Earth 1:110m land polygons (public domain): outline drawn under the OVATION map.
Computed here:
  - AACGM-v2 magnetic latitude (Shepherd 2014, IGRF-14 coefficients of the aacgmv2 package) at 110 km,
    for every place and on a 1 degree grid from 20 to 80 N (public/geo/aacgm-grid.json);
  - IANA time zone of every place (timezonefinder).
Outputs: src/data/places.json, src/data/climate.json, public/geo/aacgm-grid.json, public/geo/land.json,
public/zip/<2 first digits>.json.
"""
import json, math, os, sys, time, zipfile, io, urllib.request, datetime as dt
import aacgmv2
from timezonefinder import TimezoneFinder

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, '.cache-raw'); os.makedirs(RAW, exist_ok=True)
EPOCH = dt.datetime(2026, 10, 1)
ALT_KM = 110
TF = TimezoneFinder()

def fetch(url, name):
    p = os.path.join(RAW, name)
    if not os.path.exists(p):
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (build-data; contact via site)'})
        with urllib.request.urlopen(req, timeout=120) as r, open(p, 'wb') as f: f.write(r.read())
        time.sleep(0.5)
    return p

GAZ = 'https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2024_Gazetteer/'
def gaz_rows(fname):
    z = zipfile.ZipFile(fetch(GAZ + fname, fname))
    txt = z.read(z.namelist()[0]).decode('utf-8', 'replace').splitlines()
    head = [h.strip() for h in txt[0].split('\t')]
    return [dict(zip(head, [c.strip() for c in l.split('\t')])) for l in txt[1:] if l.strip()]

# ---------------------------------------------------------------- places
STATES = {
  'AK': ('alaska', 'Alaska'), 'WA': ('washington', 'Washington'), 'OR': ('oregon', 'Oregon'), 'ID': ('idaho', 'Idaho'),
  'MT': ('montana', 'Montana'), 'ND': ('north-dakota', 'North Dakota'), 'SD': ('south-dakota', 'South Dakota'),
  'MN': ('minnesota', 'Minnesota'), 'WI': ('wisconsin', 'Wisconsin'), 'MI': ('michigan', 'Michigan'), 'IA': ('iowa', 'Iowa'),
  'IL': ('illinois', 'Illinois'), 'OH': ('ohio', 'Ohio'), 'PA': ('pennsylvania', 'Pennsylvania'), 'NY': ('new-york', 'New York'),
  'VT': ('vermont', 'Vermont'), 'NH': ('new-hampshire', 'New Hampshire'), 'ME': ('maine', 'Maine'),
  'MA': ('massachusetts', 'Massachusetts'), 'CO': ('colorado', 'Colorado'),
}
# Towns of each state (Gazetteer NAME), north to south roughly. The first one marked * is the hub's default place.
TOWNS = {
  'AK': ['Utqiaġvik city', 'Kotzebue city', 'Fairbanks city*', 'Nome city', 'Bethel city', 'Anchorage municipality', 'Juneau city and borough', 'Ketchikan city'],
  'WA': ['Bellingham city', 'Spokane city', 'Seattle city*', 'Wenatchee city', 'Yakima city', 'Vancouver city'],
  'OR': ['Astoria city', 'Pendleton city', 'Portland city*', 'Bend city', 'Eugene city', 'Medford city'],
  'ID': ['Sandpoint city', "Coeur d'Alene city", 'Lewiston city', 'Boise City city*', 'Idaho Falls city', 'Pocatello city'],
  'MT': ['Havre city', 'Kalispell city', 'Great Falls city*', 'Missoula city', 'Bozeman city', 'Billings city'],
  'ND': ['Williston city', 'Minot city', 'Grand Forks city', 'Bismarck city*', 'Fargo city', 'Dickinson city'],
  'SD': ['Aberdeen city', 'Watertown city', 'Pierre city*', 'Rapid City city', 'Sioux Falls city'],
  'MN': ['International Falls city', 'Ely city', 'Bemidji city', 'Duluth city*', 'St. Cloud city', 'Minneapolis city', 'Rochester city'],
  'WI': ['Superior city', 'Ashland city', 'Wausau city', 'Green Bay city*', 'Eau Claire city', 'Madison city', 'Milwaukee city'],
  'MI': ['Houghton city', 'Marquette city', 'Sault Ste. Marie city', 'Traverse City city*', 'Grand Rapids city', 'Lansing city', 'Detroit city'],
  'IA': ['Mason City city', 'Dubuque city', 'Sioux City city', 'Cedar Rapids city', 'Des Moines city*', 'Davenport city'],
  'IL': ['Rockford city', 'Chicago city*', 'Peoria city', 'Champaign city', 'Springfield city'],
  'OH': ['Toledo city', 'Cleveland city*', 'Akron city', 'Columbus city', 'Dayton city', 'Cincinnati city'],
  'PA': ['Erie city*', 'Scranton city', 'State College borough', 'Pittsburgh city', 'Harrisburg city', 'Philadelphia city'],
  'NY': ['Plattsburgh city', 'Watertown city', 'Buffalo city', 'Rochester city', 'Syracuse city*', 'Albany city', 'New York city'],
  'VT': ['Newport city', 'St. Albans city', 'Burlington city*', 'Montpelier city', 'Rutland city'],
  'NH': ['Berlin city*', 'Lebanon city', 'Concord city', 'Manchester city', 'Portsmouth city', 'Nashua city'],
  'ME': ['Caribou city', 'Presque Isle city', 'Bangor city*', 'Augusta city', 'Portland city'],
  'MA': ['Pittsfield city', 'Springfield city', 'Worcester city', 'Boston city*', 'Barnstable Town city'],
  'CO': ['Fort Collins city', 'Boulder city', 'Denver city*', 'Grand Junction city', 'Colorado Springs city', 'Pueblo city'],
}
# City pages (state code, Gazetteer NAME, slug).
CITY_PAGES = [
  ('AK', 'Fairbanks city', 'fairbanks'), ('AK', 'Anchorage municipality', 'anchorage'), ('AK', 'Juneau city and borough', 'juneau'),
  ('WA', 'Seattle city', 'seattle'), ('WA', 'Spokane city', 'spokane'), ('MT', 'Missoula city', 'missoula'), ('MT', 'Billings city', 'billings'),
  ('ND', 'Fargo city', 'fargo'), ('ND', 'Bismarck city', 'bismarck'), ('SD', 'Sioux Falls city', 'sioux-falls'), ('SD', 'Rapid City city', 'rapid-city'),
  ('MN', 'Minneapolis city', 'minneapolis'), ('MN', 'Duluth city', 'duluth'), ('WI', 'Milwaukee city', 'milwaukee'), ('WI', 'Madison city', 'madison'),
  ('WI', 'Green Bay city', 'green-bay'), ('MI', 'Detroit city', 'detroit'), ('MI', 'Grand Rapids city', 'grand-rapids'), ('MI', 'Marquette city', 'marquette'),
  ('IL', 'Chicago city', 'chicago'), ('OH', 'Cleveland city', 'cleveland'), ('OH', 'Columbus city', 'columbus'), ('PA', 'Pittsburgh city', 'pittsburgh'),
  ('PA', 'Philadelphia city', 'philadelphia'), ('NY', 'New York city', 'new-york-city'), ('NY', 'Buffalo city', 'buffalo'), ('MA', 'Boston city', 'boston'),
  ('CO', 'Denver city', 'denver'),
]
# Gazetteer internal points that sit far from the city centre (very large municipalities): downtown instead.
OVERRIDE = {'Anchorage municipality': (61.2176, -149.8997), 'Juneau city and borough': (58.3019, -134.4197)}
DISPLAY = {'Utqiaġvik city': 'Utqiaġvik', 'Anchorage municipality': 'Anchorage', 'Juneau city and borough': 'Juneau', 'Boise City city': 'Boise',
           'State College borough': 'State College', 'Barnstable Town city': 'Barnstable', 'New York city': 'New York City'}
# Canada and the UK: city centre coordinates (city hall or the main square), entered by hand and checked on the
# official city or national mapping sites; time zones from timezonefinder.
ABROAD = {
  'canada': ('Canada', [
    ('yellowknife', 'Yellowknife', 'NT', 62.4540, -114.3718, True), ('whitehorse', 'Whitehorse', 'YT', 60.7212, -135.0568, True),
    ('edmonton', 'Edmonton', 'AB', 53.5461, -113.4938, True), ('calgary', 'Calgary', 'AB', 51.0447, -114.0719, True),
    ('vancouver', 'Vancouver', 'BC', 49.2827, -123.1207, True), ('winnipeg', 'Winnipeg', 'MB', 49.8954, -97.1385, True),
    ('toronto', 'Toronto', 'ON', 43.6532, -79.3832, True), ('ottawa', 'Ottawa', 'ON', 45.4215, -75.6972, True),
    ('montreal', 'Montreal', 'QC', 45.5019, -73.5674, True), ('saskatoon', 'Saskatoon', 'SK', 52.1579, -106.6702, False),
    ('regina', 'Regina', 'SK', 50.4452, -104.6189, False), ('quebec-city', 'Quebec City', 'QC', 46.8139, -71.2080, False),
    ('halifax', 'Halifax', 'NS', 44.6488, -63.5752, False), ('st-johns', "St. John's", 'NL', 47.5615, -52.7126, False),
  ]),
  'uk': ('United Kingdom', [
    ('lerwick', 'Lerwick', 'Shetland', 60.1546, -1.1494, True), ('inverness', 'Inverness', 'Highland', 57.4778, -4.2247, True),
    ('aberdeen', 'Aberdeen', 'Aberdeen', 57.1497, -2.0943, True), ('edinburgh', 'Edinburgh', 'Edinburgh', 55.9533, -3.1883, True),
    ('glasgow', 'Glasgow', 'Glasgow', 55.8642, -4.2518, True), ('belfast', 'Belfast', 'Northern Ireland', 54.5973, -5.9301, True),
    ('london', 'London', 'England', 51.5074, -0.1278, True), ('kirkwall', 'Kirkwall', 'Orkney', 58.9810, -2.9605, False),
    ('thurso', 'Thurso', 'Highland', 58.5936, -3.5221, False), ('newcastle', 'Newcastle upon Tyne', 'England', 54.9783, -1.6178, False),
    ('manchester', 'Manchester', 'England', 53.4808, -2.2426, False), ('cardiff', 'Cardiff', 'Wales', 51.4816, -3.1791, False),
  ]),
}

def mlat(lat, lon):
    return round(float(aacgmv2.get_aacgm_coord(lat, lon, ALT_KM, EPOCH)[0]), 2)

def slugify(s):
    import unicodedata
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return s.lower().replace("'", '').replace('.', '').replace(' ', '-')

def main():
    places = gaz_rows('2024_Gaz_place_national.zip')
    import unicodedata
    nfc = lambda x: unicodedata.normalize('NFC', x)
    by = {(r['USPS'], nfc(r['NAME'])): r for r in places}
    out = {'meta': {'aacgm': f'AACGM-v2 at {ALT_KM} km, epoch {EPOCH.date()}, aacgmv2 {aacgmv2.__version__}',
                    'gazetteer': 'Census Bureau 2024 Gazetteer, places', 'built': dt.date.today().isoformat()},
           'regions': [], 'towns': []}
    def town(code, name, slug, lat, lon, region, page):
        tz = TF.timezone_at(lat=lat, lng=lon)
        return {'slug': slug, 'name': DISPLAY.get(name, name.rsplit(' ', 1)[0] if name.endswith((' city', ' borough', ' municipality')) else name),
                'region': region, 'sub': code, 'lat': round(lat, 4), 'lon': round(lon, 4), 'tz': tz, 'mlat': mlat(lat, lon), 'page': page}
    page_slugs = {(c, n): s for c, n, s in CITY_PAGES}
    for code, (rslug, rname) in STATES.items():
        default = None
        for n in TOWNS[code]:
            star = n.endswith('*'); n = n.rstrip('*')
            r = by.get((code, nfc(n)))
            if not r: sys.exit(f'Gazetteer: {code} {n} not found')
            lat, lon = OVERRIDE.get(n, (float(r['INTPTLAT']), float(r['INTPTLONG'])))
            s = page_slugs.get((code, n)) or slugify(DISPLAY.get(n, n.rsplit(' ', 1)[0]))
            t = town(code, n, s, lat, lon, rslug, (code, n) in page_slugs)
            out['towns'].append(t)
            if star: default = s
        for c, n, s in CITY_PAGES:
            if c == code and not any(t['slug'] == s and t['region'] == rslug for t in out['towns']): sys.exit(f'{s} missing from TOWNS')
        out['regions'].append({'slug': rslug, 'name': rname, 'abbr': code, 'country': 'us', 'default': default})
    for rslug, (rname, cities) in ABROAD.items():
        for s, n, sub, lat, lon, page in cities:
            out['towns'].append({'slug': s, 'name': n, 'region': rslug, 'sub': sub, 'lat': lat, 'lon': lon,
                                 'tz': TF.timezone_at(lat=lat, lng=lon), 'mlat': mlat(lat, lon), 'page': page})
        out['regions'].append({'slug': rslug, 'name': rname, 'abbr': 'CA' if rslug == 'canada' else 'UK', 'country': rslug,
                               'default': 'edmonton' if rslug == 'canada' else 'edinburgh'})
    json.dump(out, open(os.path.join(ROOT, 'src/data/places.json'), 'w'), indent=1, ensure_ascii=False)
    print(len(out['towns']), 'towns,', len(out['regions']), 'regions')

    # ------------------------------------------------------------ cloud climatology (NASA POWER)
    if '--skip-power' not in sys.argv:
        clim = {'meta': {'source': 'NASA POWER Climatology API v2, CLOUD_AMT, January 2001 - December 2025 (CERES SYN1deg)',
                         'url': 'https://power.larc.nasa.gov/', 'retrieved': dt.date.today().isoformat()}, 'cloud': {}}
        for t in out['towns']:
            key = f"{t['region']}/{t['slug']}"
            u = f"https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=CLOUD_AMT&community=RE&longitude={t['lon']}&latitude={t['lat']}&format=JSON"
            d = json.load(open(fetch(u, f"power-{t['region']}-{t['slug']}.json")))
            m = d['properties']['parameter']['CLOUD_AMT']
            clim['cloud'][key] = [round(m[k], 1) for k in ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']]
        json.dump(clim, open(os.path.join(ROOT, 'src/data/climate.json'), 'w'), indent=0)
        print('climate', len(clim['cloud']))

    # ------------------------------------------------------------ AACGM grid
    os.makedirs(os.path.join(ROOT, 'public/geo'), exist_ok=True)
    lat0, lat1, lon0 = 20, 80, -180
    rows = []
    for la in range(lat0, lat1 + 1):
        lats = [la] * 360; lons = list(range(lon0, lon0 + 360))
        ml = aacgmv2.convert_latlon_arr(lats, lons, ALT_KM, EPOCH, method_code='G2A')[0]
        rows.append([None if (v != v) else round(float(v) * 10) for v in ml])
    json.dump({'meta': {'lat0': lat0, 'lat1': lat1, 'lon0': lon0, 'step': 1, 'scale': 10, 'alt_km': ALT_KM, 'epoch': EPOCH.date().isoformat(),
                        'model': f'AACGM-v2 (aacgmv2 {aacgmv2.__version__})'}, 'rows': rows},
              open(os.path.join(ROOT, 'public/geo/aacgm-grid.json'), 'w'), separators=(',', ':'))
    print('grid', len(rows), 'x', len(rows[0]))

    # ------------------------------------------------------------ land outline (Natural Earth 110m), north of 15 N
    land = json.load(open(fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson', 'ne_110m_land.geojson')))
    polys = []
    for f in land['features']:
        g = f['geometry']; parts = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
        for p in parts:
            ring = p[0]
            if max(c[1] for c in ring) < 15: continue
            polys.append([[round(c[0], 1), round(c[1], 1)] for c in ring])
    json.dump({'source': 'Natural Earth 1:110m land, public domain', 'polys': polys}, open(os.path.join(ROOT, 'public/geo/land.json'), 'w'), separators=(',', ':'))
    print('land polys', len(polys))

    # ------------------------------------------------------------ ZIP codes (ZCTA internal points)
    zc = gaz_rows('2024_Gaz_zcta_national.zip')
    os.makedirs(os.path.join(ROOT, 'public/zip'), exist_ok=True)
    buckets = {}
    for r in zc:
        z = r['GEOID']; buckets.setdefault(z[:2], {})[z] = [round(float(r['INTPTLAT']), 3), round(float(r['INTPTLONG']), 3)]
    for k, v in buckets.items():
        json.dump(v, open(os.path.join(ROOT, f'public/zip/{k}.json'), 'w'), separators=(',', ':'))
    print('zip files', len(buckets), 'zips', len(zc))

if __name__ == '__main__':
    main()
