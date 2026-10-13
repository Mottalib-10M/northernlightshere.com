/**
 * Sun and Moon positions, pure functions (RECETTE §4). No network, no clock: every function takes a time
 * in milliseconds since 1970 (UTC).
 *
 * Sun: the NOAA Global Monitoring Laboratory solar calculator equations (Meeus, "Astronomical Algorithms",
 * chapter 25, low precision), accurate to about 0.01 degree over this century.
 * Moon: the low precision formulas of the Astronomical Almanac (section D), about 0.3 degree in position,
 * enough to say whether the Moon is up and how much of it is lit.
 * Both are tested against JPL ephemeris DE421 through Skyfield (tests/fixtures/astro-reference.json).
 */
const RAD = Math.PI / 180;
const sin = (d: number) => Math.sin(d * RAD);
const cos = (d: number) => Math.cos(d * RAD);
const norm360 = (d: number) => ((d % 360) + 360) % 360;

export const julianDay = (ms: number) => ms / 86400000 + 2440587.5;
const centuries = (ms: number) => (julianDay(ms) - 2451545) / 36525;

/** Apparent ecliptic longitude, declination (deg) and equation of time (minutes) of the Sun. */
export function sunCoords(ms: number) {
  const T = centuries(ms);
  const L0 = norm360(280.46646 + T * (36000.76983 + 0.0003032 * T));
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = sin(M) * (1.914602 - T * (0.004817 + 0.000014 * T)) + sin(2 * M) * (0.019993 - 0.000101 * T) + sin(3 * M) * 0.000289;
  const omega = 125.04 - 1934.136 * T;
  const lambda = L0 + C - 0.00569 - 0.00478 * sin(omega);
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * cos(omega);
  const decl = Math.asin(sin(eps) * sin(lambda)) / RAD;
  const y = Math.tan((eps / 2) * RAD) ** 2;
  const eot = (4 / RAD) * (y * sin(2 * L0) - 2 * e * sin(M) + 4 * e * y * sin(M) * cos(2 * L0) - 0.5 * y * y * sin(4 * L0) - 1.25 * e * e * sin(2 * M));
  return { lambda: norm360(lambda), decl, eot, eps };
}

/** Geometric altitude of the Sun's centre, in degrees (no refraction: it does not matter at -12 or -18). */
export function sunAltitude(ms: number, lat: number, lon: number): number {
  const { decl, eot } = sunCoords(ms);
  const d = new Date(ms);
  const minutes = d.getUTCHours() * 60 + d.getUTCMinutes() + d.getUTCSeconds() / 60 + d.getUTCMilliseconds() / 60000;
  const tst = (((minutes + eot + 4 * lon) % 1440) + 1440) % 1440;
  const ha = tst / 4 - 180;
  const cz = sin(lat) * sin(decl) + cos(lat) * cos(decl) * cos(ha);
  return 90 - Math.acos(Math.max(-1, Math.min(1, cz))) / RAD;
}

/** Greenwich mean sidereal time, degrees. */
const gmst = (ms: number) => norm360(280.46061837 + 360.98564736629 * (julianDay(ms) - 2451545));

/** Moon: ecliptic longitude and latitude, horizontal parallax (deg). */
export function moonEcliptic(ms: number) {
  const T = centuries(ms);
  const lambda = 218.32 + 481267.881 * T + 6.29 * sin(135.0 + 477198.87 * T) - 1.27 * sin(259.3 - 413335.36 * T) + 0.66 * sin(235.7 + 890534.22 * T)
    + 0.21 * sin(269.9 + 954397.74 * T) - 0.19 * sin(357.5 + 35999.05 * T) - 0.11 * sin(186.5 + 966404.03 * T);
  const beta = 5.13 * sin(93.3 + 483202.02 * T) + 0.28 * sin(228.2 + 960400.89 * T) - 0.28 * sin(318.3 + 6003.15 * T) - 0.17 * sin(217.6 - 407332.21 * T);
  const parallax = 0.9508 + 0.0518 * cos(135.0 + 477198.87 * T) + 0.0095 * cos(259.3 - 413335.36 * T) + 0.0078 * cos(235.7 + 890534.22 * T) + 0.0028 * cos(269.9 + 954397.74 * T);
  return { lambda: norm360(lambda), beta, parallax };
}

/** Topocentric altitude of the Moon's centre (deg). */
export function moonAltitude(ms: number, lat: number, lon: number): number {
  const { lambda, beta, parallax } = moonEcliptic(ms);
  const eps = 23.4393 - 0.013 * centuries(ms);
  const ra = Math.atan2(sin(lambda) * cos(eps) - Math.tan(beta * RAD) * sin(eps), cos(lambda)) / RAD;
  const dec = Math.asin(sin(beta) * cos(eps) + cos(beta) * sin(eps) * sin(lambda)) / RAD;
  const ha = gmst(ms) + lon - ra;
  const alt = Math.asin(sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(ha)) / RAD;
  return alt - parallax * cos(alt);
}

/** Fraction of the Moon's disk that is lit (0 to 1), and whether it is waxing. */
export function moonIllumination(ms: number): { fraction: number; waxing: boolean } {
  const m = moonEcliptic(ms);
  const s = sunCoords(ms);
  const elong = Math.acos(cos(m.beta) * cos(m.lambda - s.lambda)) / RAD;
  // Phase angle: the Sun is ~389 times farther than the Moon, so i is close to 180 - elongation.
  const i = Math.atan2(sin(elong), 0.00257 - cos(elong)) / RAD;
  return { fraction: (1 + cos(i)) / 2, waxing: norm360(m.lambda - s.lambda) < 180 };
}

export interface DarkWindow {
  /** 'night' : the Sun goes below the threshold and comes back; 'always' : below all 24 hours; 'never' : never below. */
  kind: 'night' | 'always' | 'never';
  start?: number;
  end?: number;
  /** Lowest altitude of the Sun during the 24 hours examined (deg). */
  lowest: number;
}

/**
 * The darkness window of the night that follows a calendar date at a place: from local mean solar noon of
 * that date to the next one, the interval where the Sun is below `threshold` degrees (-18: astronomical
 * night, -12: nautical). Step of 5 minutes, then bisection to the second.
 */
export function darkWindow(y: number, m: number, d: number, lat: number, lon: number, threshold = -18): DarkWindow {
  const noon = Date.UTC(y, m - 1, d, 12) - (lon / 15) * 3600000;
  const step = 5 * 60000;
  const f = (t: number) => sunAltitude(t, lat, lon) - threshold;
  let lowest = Infinity;
  let start: number | undefined, end: number | undefined;
  let prev = f(noon);
  let below = 0;
  const n = (24 * 3600000) / step;
  const refine = (a: number, b: number) => { let fa = f(a); for (let k = 0; k < 30; k++) { const c = (a + b) / 2; const fc = f(c); if ((fc < 0) === (fa < 0)) { a = c; fa = fc; } else b = c; } return Math.round((a + b) / 2); };
  for (let i = 1; i <= n; i++) {
    const t = noon + i * step;
    const v = f(t);
    lowest = Math.min(lowest, v + threshold);
    if (v < 0) below++;
    if (start === undefined && prev >= 0 && v < 0) start = refine(t - step, t);
    else if (start !== undefined && end === undefined && prev < 0 && v >= 0) end = refine(t - step, t);
    prev = v;
  }
  if (below === n) return { kind: 'always', start: noon, end: noon + 24 * 3600000, lowest };
  if (start === undefined || end === undefined) {
    if (below === 0) return { kind: 'never', lowest };
    // The Sun was already below at noon (polar winter edge): take what lies inside the 24 hours.
    return { kind: 'night', start: start ?? noon, end: end ?? noon + 24 * 3600000, lowest };
  }
  return { kind: 'night', start, end, lowest };
}

/** Hours of darkness in a window, 0 when there is none. */
export const darkHours = (w: DarkWindow) => (w.kind === 'never' || w.start === undefined || w.end === undefined ? 0 : (w.end - w.start) / 3600000);

/** New and full moons of a calendar month (UTC): local minima and maxima of the lit fraction, to the hour. */
export function moonPhases(y: number, m: number): Array<{ kind: 'new' | 'full'; ms: number }> {
  const out: Array<{ kind: 'new' | 'full'; ms: number }> = [];
  const t0 = Date.UTC(y, m - 1, 1) - 3600000, t1 = Date.UTC(y, m, 1) + 3600000;
  let a = moonIllumination(t0 - 3600000).fraction, b = moonIllumination(t0).fraction;
  for (let t = t0 + 3600000; t <= t1; t += 3600000) {
    const c = moonIllumination(t).fraction;
    const mid = t - 3600000;
    if (mid >= Date.UTC(y, m - 1, 1) && mid < Date.UTC(y, m, 1)) {
      if (b < a && b <= c && b < 0.05) out.push({ kind: 'new', ms: mid });
      if (b > a && b >= c && b > 0.95) out.push({ kind: 'full', ms: mid });
    }
    a = b; b = c;
  }
  return out;
}
