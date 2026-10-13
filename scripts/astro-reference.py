#!/usr/bin/env python3
"""Reference values for tests/astro.test.ts from JPL ephemeris DE421 through Skyfield (replayable):
.venv/bin/pip install skyfield ; .venv/bin/python scripts/astro-reference.py"""
import json, os, datetime as dt
from skyfield import api, almanac
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ts = api.load.timescale(); eph = api.load(os.path.join(ROOT, '.cache-raw', 'de421.bsp'))
sun, moon, earth = eph['sun'], eph['moon'], eph['earth']
PLACES = [('fairbanks', 64.8365, -147.6517), ('minneapolis', 44.9633, -93.2683), ('seattle', 47.6193, -122.3515), ('edinburgh', 55.9533, -3.1883), ('denver', 39.7619, -104.8811)]
DATES = [(2026, 10, 13), (2026, 12, 21), (2027, 3, 20), (2027, 6, 21), (2026, 8, 15)]
out = {'source': 'JPL DE421 via Skyfield', 'alt': [], 'dark': [], 'moon': []}
for name, lat, lon in PLACES:
    top = api.wgs84.latlon(lat, lon)
    obs = earth + top
    for (y, m, d) in DATES:
        for hh in (0, 6, 12, 18):
            t = ts.utc(y, m, d, hh, 17)
            a = obs.at(t).observe(sun).apparent().altaz(temperature_C=None, pressure_mbar=0)[0].degrees
            ma = obs.at(t).observe(moon).apparent().altaz(temperature_C=None, pressure_mbar=0)[0].degrees
            ill = almanac.fraction_illuminated(eph, 'moon', t)
            out['alt'].append({'place': name, 'lat': lat, 'lon': lon, 'ms': int(t.utc_datetime().timestamp() * 1000), 'sun': round(float(a), 3)})
            out['moon'].append({'place': name, 'lat': lat, 'lon': lon, 'ms': int(t.utc_datetime().timestamp() * 1000), 'alt': round(float(ma), 2), 'lit': round(float(ill), 3)})
        # astronomical darkness of the night after local mean solar noon
        noon = dt.datetime(y, m, d, 12, tzinfo=dt.timezone.utc) - dt.timedelta(hours=lon / 15)
        t0 = ts.from_datetime(noon); t1 = ts.from_datetime(noon + dt.timedelta(days=1))
        f = almanac.dark_twilight_day(eph, top)
        times, events = almanac.find_discrete(t0, t1, f)
        start = end = None
        prev = f(t0).item()
        for t, e in zip(times, events):
            if prev >= 1 and e == 0 and start is None: start = int(t.utc_datetime().timestamp() * 1000)
            if prev == 0 and e >= 1 and start is not None and end is None: end = int(t.utc_datetime().timestamp() * 1000)
            prev = e
        kind = 'night' if start and end else ('always' if f(t0).item() == 0 and not len(times) else 'never')
        out['dark'].append({'place': name, 'lat': lat, 'lon': lon, 'date': [y, m, d], 'kind': kind, 'start': start, 'end': end})
json.dump(out, open(os.path.join(ROOT, 'tests/fixtures/astro-reference.json'), 'w'), indent=0)
print(len(out['alt']), len(out['dark']), [ (x['place'],x['date'],x['kind']) for x in out['dark'] if x['kind']!='night'])
