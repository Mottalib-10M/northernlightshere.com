/**
 * Engine tests. Astronomy against JPL DE421 (Skyfield, tests/fixtures/astro-reference.json); space weather
 * rules against the SWPC statements quoted in params-2026.json; parsers against real SWPC, NWS and MET Norway
 * payloads (tests/fixtures/*.json, saved on 2026-10-12/13).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { sunAltitude, darkWindow, moonAltitude, moonIllumination } from '../src/lib/engine/astro';
import { viewLatitude, kpNeeded, kpOverhead, gLevel, kpThirds, parseKpForecast, kpAt, parseOvation, ovationAt, ovationSky, magLatFromGrid, parseNwsSky, parseMetNo, cloudAt, rateHour, rateNight, elevationOf, type Method } from '../src/lib/engine/aurora';
import P from '../src/data/params-2026.json';
import PLACES from '../src/data/places.json';

const REF = JSON.parse(readFileSync('tests/fixtures/astro-reference.json', 'utf8'));
const M = P.method as unknown as Method;
const fx = (f: string) => JSON.parse(readFileSync(`tests/fixtures/${f}`, 'utf8'));

describe('Sun (NOAA equations vs DE421)', () => {
  it('altitude within 0.05 degree at 100 instants', () => {
    for (const r of REF.alt) expect(Math.abs(sunAltitude(r.ms, r.lat, r.lon) - r.sun), `${r.place} ${r.ms}`).toBeLessThan(0.05);
  });
  it('astronomical night within 2 minutes, and the nights without darkness', () => {
    for (const r of REF.dark) {
      const w = darkWindow(r.date[0], r.date[1], r.date[2], r.lat, r.lon, -18);
      expect(w.kind, `${r.place} ${r.date}`).toBe(r.kind);
      if (r.kind === 'night') {
        expect(Math.abs(w.start! - r.start) / 60000, `${r.place} ${r.date} start`).toBeLessThan(2);
        expect(Math.abs(w.end! - r.end) / 60000, `${r.place} ${r.date} end`).toBeLessThan(2);
      }
    }
  });
  it('Fairbanks has no astronomical night in late August but a nautical one', () => {
    expect(darkWindow(2026, 8, 25, 64.8365, -147.6517, -18).kind).toBe('never');
    expect(darkWindow(2026, 8, 25, 64.8365, -147.6517, -12).kind).toBe('night');
  });
});

describe('Moon (Almanac low precision vs DE421)', () => {
  it('altitude within 1 degree, lit fraction within 0.02', () => {
    for (const r of REF.moon) {
      expect(Math.abs(moonAltitude(r.ms, r.lat, r.lon) - r.alt), `${r.place} ${r.ms} alt`).toBeLessThan(1);
      expect(Math.abs(moonIllumination(r.ms).fraction - r.lit), `${r.ms} lit`).toBeLessThan(0.02);
    }
  });
});

describe('Kp rules (SWPC)', () => {
  it('view line: oval edge 66 - 2 Kp up to Kp 5, then the G scale latitudes', () => {
    expect(viewLatitude(0, M)).toBe(66);
    expect(viewLatitude(3, M)).toBe(60);
    expect(viewLatitude(5, M)).toBe(56);
    expect(viewLatitude(6, M)).toBe(55);
    expect(viewLatitude(7, M)).toBe(50);
    expect(viewLatitude(8, M)).toBe(45);
    expect(viewLatitude(9, M)).toBe(40);
    expect(viewLatitude(6.5, M)).toBeCloseTo(52.5, 6);
  });
  it('Kp needed is the inverse of the view line', () => {
    for (const k of [0, 0.5, 2.2, 4.9, 5.5, 6.3, 7.7, 9]) expect(kpNeeded(viewLatitude(k, M), M)).toBeCloseTo(k, 6);
    expect(kpNeeded(70, M)).toBe(0);
    expect(kpNeeded(39.9, M)).toBeNull();
  });
  it('Kp overhead: (66 - magnetic latitude) / 2, null beyond Kp 9', () => {
    expect(kpOverhead(60, M)).toBe(3);
    expect(kpOverhead(48, M)).toBe(9);
    expect(kpOverhead(47, M)).toBeNull();
  });
  it('G scale from Kp in thirds, as SWPC labels its forecast', () => {
    expect(gLevel(4.33)).toBe(0); expect(gLevel(4.67)).toBe(1); expect(gLevel(5.67)).toBe(2); expect(gLevel(6.67)).toBe(3);
    expect(gLevel(7.67)).toBe(4); expect(gLevel(8.67)).toBe(4); expect(gLevel(9)).toBe(5);
    const bins = fx('kp-forecast.json');
    for (const b of bins) if (b.noaa_scale) expect(gLevel(b.kp), `${b.time_tag}`).toBe(Number(String(b.noaa_scale).slice(1)));
    expect(kpThirds(4.67)).toBe('5-'); expect(kpThirds(5)).toBe('5'); expect(kpThirds(5.33)).toBe('5+');
  });
  it('places: Fairbanks under the oval, Minneapolis near Kp 6, Denver beyond Kp 7', () => {
    const t = (r: string, s: string) => PLACES.towns.find((x) => x.region === r && x.slug === s)!;
    expect(kpNeeded(t('alaska', 'fairbanks').mlat, M)!).toBeLessThan(1);
    expect(kpNeeded(t('minnesota', 'minneapolis').mlat, M)!).toBeGreaterThan(5.8);
    expect(kpNeeded(t('minnesota', 'minneapolis').mlat, M)!).toBeLessThan(6.5);
    expect(kpNeeded(t('colorado', 'denver').mlat, M)!).toBeGreaterThan(7);
  });
});

describe('magnetic latitude grid', () => {
  const grid = JSON.parse(readFileSync('public/geo/aacgm-grid.json', 'utf8'));
  it('the 1 degree grid gives every page place within 0.3 degree of its exact AACGM value', () => {
    for (const t of PLACES.towns) expect(Math.abs(magLatFromGrid(grid, t.lat, t.lon)! - t.mlat), t.slug).toBeLessThan(0.3);
  });
  it('null outside the grid', () => expect(magLatFromGrid(grid, 10, 0)).toBeNull());
});

describe('parsers on real payloads', () => {
  it('Kp forecast, 2026 object format and legacy arrays', () => {
    const b = parseKpForecast(fx('kp-forecast.json'));
    expect(b.length).toBeGreaterThan(50);
    expect(b.some((x) => x.kind === 'predicted')).toBe(true);
    const legacy = parseKpForecast([['time_tag', 'kp', 'observed', 'noaa_scale'], ['2026-10-13 00:00:00', '4.00', 'predicted', null]]);
    expect(legacy).toEqual([{ start: Date.UTC(2026, 9, 13), kp: 4, kind: 'predicted' }]);
    expect(kpAt(legacy, Date.UTC(2026, 9, 13, 2, 59))).toBe(4);
    expect(kpAt(legacy, Date.UTC(2026, 9, 13, 3, 0))).toBeNull();
  });
  it('OVATION grid', () => {
    const o = parseOvation(fx('ovation.json'))!;
    expect(o.forecast - o.observed).toBeGreaterThan(0);
    expect(ovationAt(o, 0, 0)).toBeLessThan(5);
    const s = ovationSky(o, 64.84, -147.65, 500);
    expect(s.sky).toBeGreaterThanOrEqual(s.overhead);
  });
  it('NWS sky cover expands durations hourly', () => {
    const s = parseNwsSky({ properties: { skyCover: { values: [{ validTime: '2026-10-13T00:00:00+00:00/PT3H', value: 40 }, { validTime: '2026-10-13T03:00:00+00:00/PT1H', value: 90 }] } } });
    expect(s.length).toBe(4);
    expect(cloudAt(s, Date.UTC(2026, 9, 13, 2, 30))).toBe(40);
    expect(cloudAt(s, Date.UTC(2026, 9, 13, 3, 10))).toBe(90);
    expect(cloudAt(s, Date.UTC(2026, 9, 14))).toBeNull();
    expect(parseNwsSky(fx('nws-grid.json')).length).toBeGreaterThan(24);
  });
  it('MET Norway cloud fraction', () => expect(parseMetNo(fx('metno.json')).length).toBeGreaterThan(24));
});

describe('verdict rules', () => {
  const h = (o: Partial<Parameters<typeof rateHour>[0]>) => ({ t: 0, kp: 5, cloud: 10, sun: -25, ...o });
  it('yes needs enough Kp, a clear sky and darkness', () => {
    expect(rateHour(h({}), 4.5, M).answer).toBe('yes');
    expect(rateHour(h({ cloud: 50 }), 4.5, M).answer).toBe('maybe');
    expect(rateHour(h({ cloud: 90 }), 4.5, M).answer).toBe('no');
    expect(rateHour(h({ kp: 3.8 }), 4.5, M).answer).toBe('maybe');
    expect(rateHour(h({ kp: 2 }), 4.5, M).answer).toBe('no');
    expect(rateHour(h({ sun: -14 }), 4.5, M).answer).toBe('maybe');
    expect(rateHour(h({ sun: -5 }), 4.5, M).answer).toBe('no');
  });
  it('OVATION in the sky lifts a quiet Kp, a bright Moon dims a faint display', () => {
    expect(rateHour(h({ kp: 2, ovationSky: 25 }), 4.5, M).answer).toBe('yes');
    expect(rateHour(h({ moonLit: 0.95, moonAlt: 30 }), 4.5, M).answer).toBe('maybe');
    expect(rateHour(h({ kp: 6, moonLit: 0.95, moonAlt: 30 }), 4.5, M).answer).toBe('yes');
  });
  it('unknown clouds never give a yes', () => expect(rateHour(h({ cloud: null }), 4.5, M).answer).toBe('maybe'));
  it('night: best answer and its longest run', () => {
    const base = Date.UTC(2026, 9, 13, 4);
    const hrs = [80, 20, 20, 20, 90].map((c, i) => ({ t: base + i * 3600000, kp: 5, cloud: c, sun: -25 }));
    const n = rateNight(hrs, 4.5, M);
    expect(n.answer).toBe('yes');
    expect(n.best).toEqual({ start: base + 3600000, end: base + 4 * 3600000 });
    expect(rateNight([{ t: base, kp: 9, cloud: 0, sun: 5 }], 4.5, M)).toMatchObject({ answer: 'no', best: null });
  });
  it('geometry behind the 500 km reach: a 100 km high border seen from 500 km sits about 9 degrees up', () => {
    expect(elevationOf(P.method.auroraBottomKm, P.method.skyReachKm)).toBeGreaterThan(8.5);
    expect(elevationOf(P.method.auroraBottomKm, P.method.skyReachKm)).toBeLessThan(9.5);
  });
});

import { moonPhases } from '../src/lib/engine/astro';
describe('moon phases', () => {
  it('October 2026 has one new and one full moon, two weeks apart', () => {
    const p = moonPhases(2026, 10);
    expect(p.filter((x) => x.kind === 'new').length).toBe(1);
    expect(p.filter((x) => x.kind === 'full').length).toBe(1);
    for (const x of p) expect(Math.abs(moonIllumination(x.ms).fraction - (x.kind === 'full' ? 1 : 0))).toBeLessThan(0.01);
  });
});
