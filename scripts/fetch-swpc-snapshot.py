#!/usr/bin/env python3
"""Snapshot of the SWPC solar cycle files used at build time by the solar cycle guide (replayable).
python3 scripts/fetch-swpc-snapshot.py  ->  src/data/solar-cycle.json"""
import json, os, urllib.request, datetime as dt
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def get(u):
    with urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60) as r: return json.load(r)
obs = get('https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle-indices.json')
pred = get('https://services.swpc.noaa.gov/json/solar-cycle/predicted-solar-cycle.json')
o = [{'m': r['time-tag'], 'ssn': r.get('ssn'), 'smoothed': r.get('smoothed_ssn')} for r in obs if r['time-tag'] >= '2019-12']
p = [{'m': r['time-tag'], 'ssn': r.get('predicted_ssn'), 'high': r.get('high_ssn'), 'low': r.get('low_ssn')} for r in pred]
json.dump({'retrieved': dt.date.today().isoformat(), 'observedUrl': 'https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle-indices.json',
           'predictedUrl': 'https://services.swpc.noaa.gov/json/solar-cycle/predicted-solar-cycle.json', 'observed': o, 'predicted': p},
          open(os.path.join(ROOT, 'src/data/solar-cycle.json'), 'w'), indent=0)
print(len(o), 'observed months,', len(p), 'predicted months; last observed', o[-1], 'first predicted', p[0] if p else None)
