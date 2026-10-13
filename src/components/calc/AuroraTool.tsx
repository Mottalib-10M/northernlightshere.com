/**
 * The forecast tool (all tool pages, every place page). One place, one night, and an answer: yes, maybe or no,
 * with the hours. Live feeds (SWPC Kp and OVATION, NWS or MET Norway clouds) are fetched after the first
 * render; until they arrive, or if they fail, the tool works on what the visitor types (Kp, clouds).
 *
 * Hydration (RECETTE §17.5): the first render uses the build day and the default place only; the clock,
 * the address bar and the feeds are read in effects.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { buildNight, tonight, type PlaceLite, type Night } from '../../lib/engine/night';
import { kpNeeded, kpOverhead, gLevel, magLatFromGrid, type Method, type KpBin, type Ovation } from '../../lib/engine/aurora';
import { darkWindow, moonAltitude } from '../../lib/engine/astro';
import { loadKp, loadOvation, loadClouds, loadGrid, loadZip, type Clouds } from '../../lib/live';
import { updateURL } from '../../lib/url-state';
import { formatNumber } from '../../lib/format';
import AuroraMap from './AuroraMap';

export interface TownOpt { key: string; label: string; lat: number; lon: number; tz: string; mlat: number; href?: string }
export type Mode = 'tonight' | 'nights' | 'kp' | 'dark' | 'map' | 'places';
interface Props { mode: Mode; towns: TownOpt[]; defaultKey: string; method: Method; methodHref: string; buildDay: string; idPrefix?: string; embed?: boolean }

interface Place extends PlaceLite { label: string; key: string; href?: string; country: 'us' | 'other' }
const n1 = (x: number) => formatNumber(x, 1);
const kpTxt = (x: number | null) => (x === null ? 'beyond 9' : n1(x));
const G = ['', 'G1 minor', 'G2 moderate', 'G3 strong', 'G4 severe', 'G5 extreme'];
const time = (ms: number, tz: string) => new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz });
const hourLbl = (ms: number, tz: string) => new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', timeZone: tz });
const tzName = (ms: number, tz: string) => new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(new Date(ms)).find((p) => p.type === 'timeZoneName')?.value ?? '';
const dayLbl = (d: [number, number, number]) => new Date(Date.UTC(d[0], d[1] - 1, d[2], 12)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
const inUS = (lat: number, lon: number) => lat > 18 && lat < 72 && lon > -180 && lon < -64;
const ANSWER = { yes: 'Yes', maybe: 'Maybe', no: 'No' } as const;
const REASON: Record<string, string> = {
  quiet: 'the Kp forecast stays below what this place needs', cloudy: 'clouds cover the sky', twilight: 'the sky only reaches nautical twilight, not full darkness',
  moon: 'a bright Moon washes out a faint display', noKp: 'no Kp forecast covers this night yet', noCloud: 'no cloud forecast arrived: look at the sky yourself',
  noDark: 'the Sun never sinks 12° below the horizon this night', daylight: 'it is daylight', ovation: 'OVATION shows aurora within reach of your sky right now',
};

function townPlace(t: TownOpt): Place { return { key: t.key, label: t.label, lat: t.lat, lon: t.lon, tz: t.tz, mlat: t.mlat, href: t.href, country: inUS(t.lat, t.lon) ? 'us' : 'other' }; }

export default function AuroraTool({ mode, towns, defaultKey, method: M, methodHref, buildDay, idPrefix = 'au', embed = false }: Props) {
  const p = idPrefix;
  const def = towns.find((t) => t.key === defaultKey) ?? towns[0];
  const [place, setPlace] = useState<Place>(() => townPlace(def));
  const [text, setText] = useState(def.label);
  const [status, setStatus] = useState('');
  const [nightIx, setNightIx] = useState(0);
  const [cloudSel, setCloudSel] = useState('live');
  const [kpManual, setKpManual] = useState(0);
  const [now, setNow] = useState<number | null>(null);
  const [kp, setKp] = useState<KpBin[] | null>(null);
  const [kpErr, setKpErr] = useState(false);
  const [ov, setOv] = useState<Ovation | null>(null);
  const [clouds, setClouds] = useState<Clouds | null>(null);
  const [cloudErr, setCloudErr] = useState(false);
  const [copied, setCopied] = useState(false);
  const nights = mode === 'dark' ? 30 : 3;

  // ---- after the first render: clock, shared link, feeds
  useEffect(() => {
    setNow(Date.now());
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get('place'); if (q) choose(q, true);
    const nn = Number(sp.get('night')); if (nn > 0 && nn < nights) setNightIx(nn);
    const c = sp.get('clouds'); if (c && ['10', '50', '90'].includes(c)) setCloudSel(c);
    const k = Number(sp.get('kp')); if (k > 0 && k <= 9) setKpManual(k);
    if (mode !== 'dark') {
      loadKp().then(setKp).catch(() => setKpErr(true));
      loadOvation().then(setOv).catch(() => {});
    }
    const id = setInterval(() => setNow(Date.now()), 5 * 60000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode === 'dark' || now === null) return;
    setClouds(null); setCloudErr(false);
    let live = true;
    loadClouds(place.lat, place.lon).then((c) => { if (!live) return; setClouds(c); if (c.tz && place.key.startsWith('custom') && c.tz !== place.tz) setPlace((x) => ({ ...x, tz: c.tz! })); }).catch(() => live && setCloudErr(true));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.lat, place.lon, now === null]);
  useEffect(() => { updateURL({ place: place.key.startsWith('custom') ? `${place.lat.toFixed(3)},${place.lon.toFixed(3)}` : place.key, night: nightIx || undefined, clouds: cloudSel === 'live' ? undefined : cloudSel, kp: kpManual || undefined }); }, [place.key, place.lat, place.lon, nightIx, cloudSel, kpManual]);

  const browserTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } };
  async function custom(lat: number, lon: number, label: string) {
    let mlat: number | null = null;
    try { mlat = magLatFromGrid(await loadGrid(), lat, lon); } catch { mlat = null; }
    setPlace({ key: `custom:${lat.toFixed(3)},${lon.toFixed(3)}`, label, lat, lon, tz: browserTz(), mlat, country: inUS(lat, lon) ? 'us' : 'other' });
    setStatus(mlat === null ? 'This point is outside the magnetic latitude grid (20° to 80° N): the Kp needed cannot be computed.' : `${label}: magnetic latitude ${n1(mlat)}°.`);
  }
  async function choose(raw: string, fromLink = false) {
    const v = raw.trim();
    const t = towns.find((x) => x.key === v || x.label.toLowerCase() === v.toLowerCase()) ?? towns.find((x) => v.length >= 3 && x.label.toLowerCase().startsWith(v.toLowerCase()));
    if (t) { setPlace(townPlace(t)); setText(t.label); setStatus(''); return; }
    const ll = /^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/.exec(v);
    if (ll) { const lat = Number(ll[1]), lon = Number(ll[2]); if (Math.abs(lat) <= 90 && Math.abs(lon) <= 180) { if (fromLink) setText(`${lat}, ${lon}`); await custom(lat, lon, `${lat}, ${lon}`); return; } }
    if (/^\d{5}$/.test(v)) {
      setStatus('Looking up the ZIP code…');
      const z = await loadZip(v);
      if (z) { if (fromLink) setText(v); await custom(z[0], z[1], `ZIP ${v}`); } else setStatus(`ZIP ${v} is not in the Census ZIP code list.`);
      return;
    }
    if (v.length >= 3) setStatus('Type a 5-digit ZIP code, pick a town from the list, or enter "latitude, longitude".');
  }
  function geolocate() {
    if (!navigator.geolocation) { setStatus('Your browser does not share its location.'); return; }
    setStatus('Asking your browser for your position…');
    navigator.geolocation.getCurrentPosition((pos) => { const lat = pos.coords.latitude, lon = pos.coords.longitude; setText(`${lat.toFixed(3)}, ${lon.toFixed(3)}`); custom(lat, lon, 'Your location'); },
      () => setStatus('Location refused or unavailable: type a ZIP code or a town instead.'), { timeout: 10000, maximumAge: 600000 });
  }

  // ---- the nights
  const clock = now ?? Date.parse(`${buildDay}T20:00:00Z`);
  const baseDate = (off: number): [number, number, number] => (now === null ? (() => { const t = new Date(Date.parse(`${buildDay}T12:00:00Z`) + off * 86400000); return [t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()] as [number, number, number]; })() : tonight(now, place.tz, off));
  const cloudManual = cloudSel === 'live' ? null : Number(cloudSel);
  const calc = (off: number): Night => buildNight({ place, date: baseDate(off), now: clock, kp, kpManual: kpManual > 0 ? kpManual : null, clouds: clouds?.series ?? null, cloudManual, ovation: off === 0 ? ov : null }, M);
  const night = useMemo(() => calc(nightIx), [place, nightIx, now, kp, kpManual, clouds, cloudManual, ov]); // eslint-disable-line react-hooks/exhaustive-deps
  const three = useMemo(() => (mode === 'nights' ? [0, 1, 2].map(calc) : []), [mode, place, now, kp, kpManual, clouds, cloudManual, ov]); // eslint-disable-line react-hooks/exhaustive-deps
  const need = place.mlat === null ? null : kpNeeded(place.mlat, M);
  const over = place.mlat === null ? null : kpOverhead(place.mlat, M);
  const gNeed = need === null ? null : gLevel(Math.ceil(need * 3 - 1e-9) / 3);
  const loading = now === null || (mode !== 'dark' && !kp && !kpErr && kpManual === 0);
  const nightOpts = Array.from({ length: nights }, (_, i) => ({ value: String(i), label: `${i === 0 ? 'Tonight' : i === 1 ? 'Tomorrow night' : `In ${i} nights`} (${dayLbl(baseDate(i))})` }));

  const copy = async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ } };
  const tzAbbr = tzName(night.nautical.start ?? clock, place.tz);
  const darkLine = (n: Night) => n.astro.kind === 'night' ? `${time(n.astro.start!, place.tz)} to ${time(n.astro.end!, place.tz)}` : n.astro.kind === 'always' ? 'all night (polar night)' : n.nautical.kind !== 'never' ? `no full darkness; twilight ${time(n.nautical.start!, place.tz)} to ${time(n.nautical.end!, place.tz)}` : 'none: the sky stays bright';
  const best = (n: Night) => (n.best ? `${hourLbl(n.best.start, place.tz)} to ${hourLbl(n.best.end, place.tz)} ${tzName(n.best.start, place.tz)}` : '');
  const why = (n: Night) => n.reasons.filter((r) => REASON[r]).map((r) => REASON[r]);
  const cloudSrc = cloudManual !== null ? 'your choice' : clouds ? (clouds.source === 'nws' ? 'National Weather Service' : 'MET Norway') : cloudErr ? 'unavailable' : 'loading';

  const form = (
    <form className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); choose(text); }}>
      <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0 sm:col-span-2">
        <label htmlFor={`${p}-loc`} className="mb-1 block text-sm font-medium text-navy-700">Where are you? Town, ZIP code or latitude, longitude</label>
        <div className="flex gap-2">
          <input id={`${p}-loc`} list={`${p}-towns`} type="text" autoComplete="off" value={text} onChange={(e) => { setText(e.target.value); const t = towns.find((x) => x.label === e.target.value); if (t) choose(t.label); }}
            onBlur={() => { if (text !== place.label) choose(text); }} className="h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-4 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" aria-describedby={`${p}-loc-help`} />
          <button type="button" onClick={geolocate} className="h-12 shrink-0 rounded-lg border border-navy-300 bg-navy-50 px-3 text-sm font-semibold text-navy-800 hover:bg-navy-100">Use my location</button>
        </div>
        <p id={`${p}-loc-help`} role="status" className="mt-1 text-xs text-navy-600">{status || 'Pick a town from the list or type a US ZIP code; the position stays in your browser.'}</p>
        <datalist id={`${p}-towns`}>{towns.map((t) => <option key={t.key} value={t.label} />)}</datalist>
      </div>
      {mode !== 'nights' && <SelectField id={`${p}-night`} label="Which night" value={String(nightIx)} onChange={(v) => setNightIx(Number(v))} options={nightOpts} />}
      {mode !== 'dark' && <SelectField id={`${p}-clouds`} label="Clouds" value={cloudSel} onChange={setCloudSel} options={[{ value: 'live', label: 'Live forecast for this place' }, { value: '10', label: 'Clear sky (10%)' }, { value: '50', label: 'Partly cloudy (50%)' }, { value: '90', label: 'Overcast (90%)' }]} help={`Source: ${cloudSrc}`} />}
      {mode !== 'dark' && <NumberField id={`${p}-kp`} label="Kp you expect (empty = SWPC forecast)" value={kpManual} onChange={setKpManual} max={9} decimals={1} help={kpErr ? 'The SWPC feed did not answer: type the Kp of the forecast you read.' : 'From 0 (quiet) to 9 (extreme storm).'} />}
    </form>
  );

  const head = mode === 'kp' ? { label: `Kp you need at ${place.label}`, figure: need === null ? '9+' : n1(need), sub: need === null ? 'Beyond the scale: only the rarest storms reach this far south.' : gNeed ? `A ${G[gNeed]} storm or stronger. Overhead from Kp ${kpTxt(over)}.` : `No storm needed. Overhead from Kp ${kpTxt(over)}.` }
    : mode === 'dark' ? { label: `Real darkness at ${place.label}, ${dayLbl(night.date)}`, figure: night.astro.kind === 'never' ? 'None' : night.astro.kind === 'always' ? '24 h' : `${formatNumber((night.astro.end! - night.astro.start!) / 3600000, 1)} h`, sub: `Sun below 18°: ${darkLine(night)} ${tzAbbr}` }
    : { label: `${nightIx === 0 ? 'Tonight' : dayLbl(night.date)} at ${place.label}`, figure: loading ? '…' : ANSWER[night.answer], sub: loading ? 'Reading the SWPC Kp forecast and the cloud forecast…' : night.best ? `Best chance ${best(night)}` : why(night)[0] ? `Because ${why(night)[0]}.` : '' };

  const rows: Array<[string, string]> = [];
  if (mode !== 'dark') {
    rows.push(['Kp forecast during the dark hours', kpManual > 0 ? `${n1(kpManual)} (your value)` : night.kpMax !== null ? `up to ${n1(night.kpMax)}` : kpErr ? 'feed unavailable' : night.hours.length ? 'not yet forecast' : 'no dark hours']);
    rows.push(['Kp needed here', need === null ? 'beyond 9' : `${n1(need)}${gNeed ? ` (${G[gNeed]})` : ''}`]);
    rows.push(['Cloud cover in the dark hours', night.cloudMean !== null ? `${formatNumber(night.cloudMean, 0)}% (${cloudSrc})` : cloudSrc]);
  }
  rows.push(['Dark sky (Sun 18° down)', `${darkLine(night)}${night.astro.kind === 'night' ? ` ${tzAbbr}` : ''}`]);
  rows.push(['Moon', `${formatNumber(night.moonLit * 100, 0)}% lit`]);
  if (mode !== 'dark') rows.push(['Right now, OVATION (30 to 90 min)', night.ovationNow ? `${night.ovationNow.sky}% within ${M.skyReachKm} km, ${night.ovationNow.overhead}% overhead` : ov ? 'model run too old' : 'loading or unavailable']);
  if (place.mlat !== null) rows.push(['Magnetic latitude (AACGM)', `${n1(place.mlat)}°`]);

  const tone = mode === 'kp' || mode === 'dark' || loading ? 'neutral' : night.answer;
  const color = tone === 'yes' ? 'text-accent-300' : tone === 'maybe' ? 'text-amber-200' : tone === 'no' ? 'text-slate-200' : 'text-white';

  const result = (
    <div data-resultat aria-live="polite" className="rounded-xl bg-[#0b1a2e] p-4 text-white sm:p-5">
      <p className="text-sm font-medium text-slate-200">{head.label}</p>
      <p className={`tabular-nums mt-1 font-serif text-5xl font-bold ${color}`}>{head.figure}</p>
      {head.sub && <p className="mt-1 text-sm text-slate-100">{head.sub}</p>}
      <table className="mt-4 w-full text-sm"><tbody>
        {rows.map(([l, v]) => <tr key={l} className="border-t border-white/15"><th scope="row" className="py-1.5 pr-3 text-left font-normal text-slate-200">{l}</th><td className="tabular-nums py-1.5 text-right text-white">{v}</td></tr>)}
      </tbody></table>
      {mode !== 'dark' && mode !== 'kp' && !loading && why(night).length > 1 && <p className="mt-2 text-xs text-slate-200">Also: {why(night).slice(1).join('; ')}.</p>}
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <a href={methodHref} className="text-accent-200 underline hover:text-white">How this answer is built</a>
        {!embed && <button type="button" onClick={copy} className="text-accent-200 underline hover:text-white">{copied ? 'Link copied' : 'Copy share link'}</button>}
        {place.href && !embed && <a href={place.href} className="text-accent-200 underline hover:text-white">Page for {place.label}</a>}
      </p>
    </div>
  );

  const hours = night.hours.filter((h) => !h.reasons.includes('daylight'));
  const strip = mode !== 'dark' && hours.length > 0 && (
    <div className="mt-4">
      <p className="text-sm font-semibold text-navy-900">Hour by hour, {tzAbbr}</p>
      <div className="mt-2 flex gap-1 overflow-x-auto pb-1" role="list">
        {hours.map((h) => (
          <div role="listitem" key={h.t} className={`min-w-[3.4rem] rounded-md border px-1.5 py-1 text-center text-xs ${h.answer === 'yes' ? 'border-accent-600 bg-accent-50' : h.answer === 'maybe' ? 'border-amber-400 bg-amber-50' : 'border-navy-200 bg-white'}`}>
            <p className="font-semibold text-navy-900">{hourLbl(h.t, place.tz)}</p>
            <p className="text-navy-700">Kp {h.kp === null ? '–' : n1(h.kp)}</p>
            <p className="text-navy-700">{h.cloud === null ? '–' : `${Math.round(h.cloud)}%`} ☁</p>
            <p className={`font-semibold ${h.answer === 'yes' ? 'text-accent-700' : h.answer === 'maybe' ? 'text-amber-800' : 'text-navy-600'}`}>{ANSWER[h.answer]}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const nightsBlock = mode === 'nights' && (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      {three.map((n, i) => (
        <div key={i} className="rounded-lg border border-navy-200 p-3">
          <p className="text-sm font-semibold text-navy-900">{i === 0 ? 'Tonight' : dayLbl(n.date)}</p>
          <p className={`font-serif text-2xl font-bold ${n.answer === 'yes' ? 'text-accent-700' : n.answer === 'maybe' ? 'text-amber-800' : 'text-navy-700'}`}>{loading ? '…' : ANSWER[n.answer]}</p>
          <p className="text-xs text-navy-700">{n.best ? best(n) : why(n)[0] ?? ''}</p>
          <p className="mt-1 text-xs text-navy-600">Kp max {n.kpMax === null ? '–' : n1(n.kpMax)} · clouds {n.cloudMean === null ? '–' : `${Math.round(n.cloudMean)}%`} · dark {darkLine(n)}</p>
        </div>
      ))}
    </div>
  );

  const kpChart = mode === 'kp' && kp && (() => {
    const t0 = clock - 24 * 3600000;
    const bins = kp.filter((b) => b.start + 3 * 3600000 > t0).slice(0, 32);
    return (
      <div className="mt-4">
        <p className="text-sm font-semibold text-navy-900">Planetary Kp, last 24 hours and SWPC forecast ({tzAbbr})</p>
        <div className="mt-2 flex h-36 items-end gap-0.5 border-b border-navy-300" role="list" aria-label="Kp by three-hour block">
          {bins.map((b) => <div role="listitem" key={b.start} title={`${dayLbl(tonight(b.start, place.tz, 0))} ${hourLbl(b.start, place.tz)}: Kp ${n1(b.kp)} (${b.kind})`} className={`flex-1 ${b.kp >= (need ?? 99) ? 'bg-accent-600' : b.kind === 'predicted' ? 'bg-navy-300' : 'bg-navy-500'}`} style={{ height: `${Math.max(4, (b.kp / 9) * 100)}%` }} />)}
        </div>
        <p className="mt-1 text-xs text-navy-600">Dark bars: observed or estimated. Light bars: forecast. Green: at or above the Kp {need === null ? '' : n1(need)} this place needs.</p>
      </div>
    );
  })();

  const darkTable = mode === 'dark' && (() => {
    const rowsD = Array.from({ length: 7 }, (_, i) => { const d = baseDate(nightIx + i); const w = darkWindow(d[0], d[1], d[2], place.lat, place.lon, M.darkSun); const mid = w.kind === 'night' ? (w.start! + w.end!) / 2 : Date.UTC(d[0], d[1] - 1, d[2], 24) - (place.lon / 15) * 3600000; return { d, w, up: moonAltitude(mid, place.lat, place.lon) > 0 }; });
    return (
      <div className="mt-4 overflow-x-auto">
        <p className="text-sm font-semibold text-navy-900">The next seven nights ({tzAbbr})</p>
        <table className="journal mt-2 w-full text-sm"><thead><tr><th scope="col" className="px-2 py-1 text-left">Night of</th><th scope="col" className="px-2 py-1 text-left">Dark sky</th><th scope="col" className="px-2 py-1 text-right">Moon at mid-darkness</th></tr></thead>
          <tbody>{rowsD.map((r) => <tr key={r.d.join('-')}><td className="px-2 py-1">{dayLbl(r.d)}</td><td className="px-2 py-1">{r.w.kind === 'night' ? `${time(r.w.start!, place.tz)} to ${time(r.w.end!, place.tz)}` : r.w.kind === 'always' ? 'all night' : 'none'}</td><td className="px-2 py-1 text-right">{r.up ? 'up' : 'down'}</td></tr>)}</tbody></table>
      </div>
    );
  })();

  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {form}
        {result}
      </div>
      {nightsBlock}
      {strip}
      {kpChart}
      {darkTable}
      {mode === 'map' && <AuroraMap ovation={ov} lat={place.lat} lon={place.lon} reachKm={M.skyReachKm} label={place.label} tz={place.tz} />}
    </div>
  );
}
