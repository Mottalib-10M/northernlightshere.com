/**
 * OVATION map: the SWPC probability grid drawn on a north polar view (azimuthal equidistant), turned so that
 * the chosen place sits below the pole, with the land outline of Natural Earth, the place and the circle of
 * sky it can see. Drawn after the first render only (canvas), so the HTML of the build stays stable.
 */
import { useEffect, useRef, useState } from 'react';
import type { Ovation } from '../../lib/engine/aurora';

interface Props { ovation: Ovation | null; lat: number; lon: number; reachKm: number; label: string; tz: string }
type Land = { polys: number[][][] };
let landPromise: Promise<Land> | null = null;
const loadLand = () => (landPromise ??= fetch('/geo/land.json').then((r) => r.json() as Promise<Land>));

export default function AuroraMap({ ovation, lat, lon, reachKm, label, tz }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [land, setLand] = useState<Land | null>(null);
  useEffect(() => { loadLand().then(setLand).catch(() => {}); }, []);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const W = c.width, H = c.height, cx = W / 2, cy = H * 0.42, R = Math.min(W, H) * 0.62;
    const maxColat = 70; // draw from the pole down to 20 N
    const rot = ((-lon - 90) * Math.PI) / 180 + Math.PI; // place below the pole
    const xy = (la: number, lo: number): [number, number] => { const r = ((90 - la) / maxColat) * R; const a = (lo * Math.PI) / 180 + rot; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    ctx.fillStyle = '#0b1a2e'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#16304d'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    if (land) {
      ctx.fillStyle = '#2b4562'; ctx.strokeStyle = '#4a6a8c'; ctx.lineWidth = 0.6;
      for (const poly of land.polys) { ctx.beginPath(); poly.forEach(([lo, la], i) => { const [x, y] = xy(Math.max(la, 20), lo); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    }
    if (ovation) {
      for (let lo = 0; lo < 360; lo++) for (let la = 20; la <= 90; la++) {
        const v = ovation.grid[lo * 181 + la + 90]; if (v < 3) continue;
        const [x, y] = xy(la, lo);
        ctx.fillStyle = v >= 50 ? 'rgba(255,90,90,0.85)' : v >= 25 ? 'rgba(255,230,90,0.8)' : v >= 10 ? 'rgba(80,230,140,0.75)' : 'rgba(80,230,140,0.35)';
        const s = Math.max(2.5, ((Math.PI * 2 * ((90 - la) / maxColat) * R) / 360) * 1.3);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1;
    for (const la of [30, 40, 50, 60, 70, 80]) { ctx.beginPath(); ctx.arc(cx, cy, ((90 - la) / maxColat) * R, 0, Math.PI * 2); ctx.stroke(); }
    const [px, py] = xy(lat, lon);
    ctx.strokeStyle = '#ffffff'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(px, py, (reachKm / 111 / maxColat) * R, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = '13px system-ui, sans-serif'; ctx.fillText(label, px + 7, py + 4);
  }, [ovation, land, lat, lon, reachKm, label]);
  const when = ovation ? new Date(ovation.forecast).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', month: 'short', day: 'numeric', timeZone: tz, timeZoneName: 'short' }) : null;
  return (
    <figure className="mt-4">
      <canvas ref={ref} width={900} height={640} className="h-auto w-full rounded-lg" role="img" aria-label={`OVATION aurora probability map around ${label}`} />
      <figcaption className="mt-2 text-xs text-navy-600">
        {when ? `OVATION forecast valid ${when}.` : 'Loading the OVATION grid from SWPC…'} Green: 3 to 9% and 10 to 24% chance of seeing aurora overhead; yellow 25 to 49%; red 50% and more. Dashed circle: the {reachKm} km of sky you can see from {label}. Land outline: Natural Earth.
      </figcaption>
    </figure>
  );
}
