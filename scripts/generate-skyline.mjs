#!/usr/bin/env node
// Generates the Norlease "city skyline at dusk" SVG used by
// components/NorleaseSkyline.tsx. Run `node scripts/generate-skyline.mjs`
// to regenerate. Everything below the skyline is procedural and seeded, so
// re-running with the same SEED reproduces the same artwork; change SEED to
// get a different skyline layout.
//
// Output: components/norleaseSkylineMarkup.ts, exporting two pre-built SVG
// markup strings (animated + static/reduced-motion) that the React
// component injects directly. Generating at build time keeps the runtime
// component trivial and keeps hundreds of procedurally-placed shapes out of
// hand-authored JSX.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED = 20260805;
const W = 1200;
const H = 675;

// ---------------------------------------------------------------------------
// Seeded RNG (mulberry32) — deterministic across runs for a given SEED.
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(seed) {
  const rng = mulberry32(seed);
  const rand = (min, max) => min + rng() * (max - min);
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const chance = (p) => rng() < p;

  // rect-as-path segment, y is the TOP of the rect.
  const rectSeg = (x, y, w, h) => `M${x.toFixed(1)},${y.toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}z`;
  const circleSeg = (cx, cy, r) =>
    `M${(cx - r).toFixed(1)},${cy.toFixed(1)}a${r.toFixed(1)},${r.toFixed(1)} 0 1,0 ${(2 * r).toFixed(1)},0a${r.toFixed(1)},${r.toFixed(1)} 0 1,0 ${(-2 * r).toFixed(1)},0`;

  // -------------------------------------------------------------------------
  // Stars — batched into opacity buckets so ~90 stars cost only 4 <path>s.
  // -------------------------------------------------------------------------
  const starBuckets = [[], [], [], []]; // opacity tiers
  const starOpacities = [0.18, 0.32, 0.48, 0.65];
  for (let i = 0; i < 90; i++) {
    const x = rand(0, W);
    const y = rand(0, H * 0.34) * (1 - y_bias(x)); // slightly denser upper-left, fades toward horizon naturally via y range
    const r = rand(0.5, 1.3);
    const bucket = randInt(0, 3);
    starBuckets[bucket].push(circleSeg(x, Math.max(2, y), r));
  }
  function y_bias() {
    return 0; // reserved; range already confined to upper third
  }
  const starsMarkup = starBuckets
    .map((segs, i) => (segs.length ? `<path d="${segs.join('')}" fill="#fff" fill-opacity="${starOpacities[i]}"/>` : ''))
    .join('');

  // -------------------------------------------------------------------------
  // Clouds — 8-10 warm streaks near horizon, 2 cooler higher up.
  // -------------------------------------------------------------------------
  let cloudsMarkup = '';
  const warmCloudCount = randInt(8, 10);
  for (let i = 0; i < warmCloudCount; i++) {
    const cx = rand(40, W - 40);
    const cy = rand(H * 0.56, H * 0.72);
    const rx = rand(70, 150);
    const ry = rand(7, 16);
    const op = rand(0.12, 0.28);
    cloudsMarkup += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="#f3b57e" opacity="${op.toFixed(2)}" filter="url(#blurCloud)"/>`;
  }
  for (let i = 0; i < 2; i++) {
    const cx = rand(100, W - 100);
    const cy = rand(H * 0.16, H * 0.32);
    const rx = rand(90, 160);
    const ry = rand(8, 14);
    cloudsMarkup += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="#7ea0c4" opacity="0.14" filter="url(#blurCloud)"/>`;
  }

  // -------------------------------------------------------------------------
  // Building layers
  // -------------------------------------------------------------------------
  const ROOF_TYPES = ['flat', 'setback', 'tapered', 'peaked'];

  function generateLayer({ baseline, count, wMin, wMax, hMin, hMax, withWindows, litRatio, windowColor, layerName }) {
    const bodySegs = [];
    const windowSegs = [];
    let x = -10;
    const buildings = [];
    while (x < W + 10 && buildings.length < count * 1.6) {
      const w = rand(wMin, wMax);
      const gap = rand(2, 10);
      const h = rand(hMin, hMax);
      const top = baseline - h;
      buildings.push({ x, w, h, top });
      bodySegs.push(rectSeg(x, top, w, h));

      if (withWindows) {
        const cols = Math.max(1, Math.floor(w / 7));
        const rows = Math.max(1, Math.floor(h / 11));
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (!chance(litRatio)) continue;
            const wx = x + 2 + c * (w - 4) / cols;
            const wy = top + 4 + r * (h - 8) / rows;
            windowSegs.push(rectSeg(wx, wy, Math.min(2.6, (w - 4) / cols - 1), Math.min(3.4, (h - 8) / rows - 1)));
          }
        }
      }

      x += w + gap;
    }
    const bodyPath = `<path d="${bodySegs.join('')}" fill="url(#${layerName})"/>`;
    const windowPath = withWindows && windowSegs.length
      ? `<path d="${windowSegs.join('')}" fill="${windowColor}" opacity="0.85"/>`
      : '';
    return { bodyPath, windowPath, buildings };
  }

  const farthest = generateLayer({
    baseline: 470, count: 40, wMin: 12, wMax: 24, hMin: 40, hMax: 90,
    withWindows: false, litRatio: 0, windowColor: '', layerName: 'gradFar',
  });

  const midFar = generateLayer({
    baseline: 512, count: 30, wMin: 16, wMax: 32, hMin: 55, hMax: 130,
    withWindows: true, litRatio: 0.035, windowColor: '#ffe3b0', layerName: 'gradMidFar',
  });

  const mid = generateLayer({
    baseline: 582, count: 22, wMin: 22, wMax: 40, hMin: 80, hMax: 210,
    withWindows: true, litRatio: 0.055, windowColor: '#ffd9a0', layerName: 'gradMid',
  });

  // Near/hero layer — built by hand (not via generateLayer) since it also
  // carries roof variety, antennas, mullions, and rim-light strips.
  const nearBodySegs = [];
  const nearWindowSegs = [];
  const roofSegsByType = { setback: [], tapered: [], peaked: [] };
  const crownedSegs = [];
  const mullionSegs = [];
  const rimSegs = [];
  const antennaPoleSegs = [];
  const antennaLights = [];

  const NEAR_BASELINE = H;
  const nearBuildings = [];
  {
    let x = -10;
    let i = 0;
    // Every 4th-5th building (roughly 5 across the row) is a signature hero tower.
    while (x < W + 10) {
      const isHero = i % 4 === 3;
      const w = isHero ? rand(46, 68) : rand(30, 54);
      const gap = rand(4, 14);
      const h = isHero ? rand(300, 420) : rand(160, 300);
      const top = NEAR_BASELINE - h;
      nearBuildings.push({ x, w, h, top, isHero });
      nearBodySegs.push(rectSeg(x, top, w, h));

      // Roof.
      const roofType = isHero ? 'crowned' : pick(ROOF_TYPES);
      if (roofType === 'crowned') {
        const b1w = w * 0.72, b1h = rand(16, 22);
        const b2w = w * 0.48, b2h = rand(12, 18);
        const b3w = w * 0.26, b3h = rand(10, 15);
        let cy = top;
        cy -= b1h; crownedSegs.push(rectSeg(x + (w - b1w) / 2, cy, b1w, b1h));
        cy -= b2h; crownedSegs.push(rectSeg(x + (w - b2w) / 2, cy, b2w, b2h));
        cy -= b3h; crownedSegs.push(rectSeg(x + (w - b3w) / 2, cy, b3w, b3h));
      } else if (roofType === 'setback') {
        const bw = w * rand(0.5, 0.7);
        const bh = rand(12, 24);
        roofSegsByType.setback.push(rectSeg(x + (w - bw) / 2, top - bh, bw, bh));
      } else if (roofType === 'tapered') {
        const bh = rand(14, 26);
        const inset = w * 0.28;
        roofSegsByType.tapered.push(
          `M${x.toFixed(1)},${top.toFixed(1)}L${(x + inset).toFixed(1)},${(top - bh).toFixed(1)}L${(x + w - inset).toFixed(1)},${(top - bh).toFixed(1)}L${(x + w).toFixed(1)},${top.toFixed(1)}Z`
        );
      } else if (roofType === 'peaked') {
        const bh = rand(16, 30);
        roofSegsByType.peaked.push(
          `M${x.toFixed(1)},${top.toFixed(1)}L${(x + w / 2).toFixed(1)},${(top - bh).toFixed(1)}L${(x + w).toFixed(1)},${top.toFixed(1)}Z`
        );
      }

      // Windows.
      const cols = Math.max(1, Math.floor(w / 8));
      const rows = Math.max(1, Math.floor(h / 12));
      const litRatio = isHero ? 0.16 : 0.11;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!chance(litRatio)) continue;
          const wx = x + 2.5 + c * (w - 5) / cols;
          const wy = top + 5 + r * (h - 10) / rows;
          nearWindowSegs.push(rectSeg(wx, wy, Math.min(3, (w - 5) / cols - 1.2), Math.min(4, (h - 10) / rows - 1.2)));
        }
      }

      // Mullions on wider buildings.
      if (w > 42) {
        const lines = randInt(1, 3);
        for (let l = 1; l <= lines; l++) {
          const lx = x + (w / (lines + 1)) * l;
          mullionSegs.push(rectSeg(lx, top, 0.6, h));
        }
      }

      // Rim-light on the left edge.
      rimSegs.push(rectSeg(x, top, 3.2, h));

      // Antenna on ~16% of near buildings.
      if (chance(0.16)) {
        const poleH = rand(18, 34);
        antennaPoleSegs.push(rectSeg(x + w / 2 - 0.5, top - poleH, 1, poleH));
        antennaLights.push({ x: x + w / 2, y: top - poleH, delay: rand(0, 2.5) });
      }

      x += w + gap;
      i++;
    }
  }

  // One or two antennas on the mid layer too ("occasional antenna").
  const midAntennaLights = [];
  const midAntennaPoleSegs = [];
  mid.buildings.forEach((b) => {
    if (chance(0.08)) {
      const poleH = rand(12, 20);
      midAntennaPoleSegs.push(rectSeg(b.x + b.w / 2 - 0.4, b.top - poleH, 0.8, poleH));
      midAntennaLights.push({ x: b.x + b.w / 2, y: b.top - poleH, delay: rand(0, 2.5) });
    }
  });

  // -------------------------------------------------------------------------
  // Foreground silhouette row — flat dark, no gradient, sparse lit windows.
  // -------------------------------------------------------------------------
  const fgBodySegs = [];
  const fgWindowSegs = [];
  {
    let x = -10;
    while (x < W + 10) {
      const w = rand(20, 50);
      const gap = rand(3, 12);
      const h = rand(50, 130);
      const top = H - h;
      fgBodySegs.push(rectSeg(x, top, w, h));
      const cols = Math.max(1, Math.floor(w / 9));
      const rows = Math.max(1, Math.floor(h / 14));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!chance(0.04)) continue;
          fgWindowSegs.push(rectSeg(x + 2 + c * (w - 4) / cols, top + 4 + r * (h - 8) / rows, 2.4, 3.2));
        }
      }
      x += w + gap;
    }
  }

  // -------------------------------------------------------------------------
  // Pins — 8 fixed positions, 5 blue / 3 orange, varied scale.
  // -------------------------------------------------------------------------
  const PINS = [
    { x: 170, y: 250, color: 'blue', scale: 1.0 },
    { x: 330, y: 340, color: 'orange', scale: 0.86 },
    { x: 480, y: 200, color: 'blue', scale: 1.1 },
    { x: 620, y: 380, color: 'blue', scale: 0.95 },
    { x: 760, y: 260, color: 'orange', scale: 1.16 },
    { x: 900, y: 340, color: 'blue', scale: 0.9 },
    { x: 1030, y: 220, color: 'orange', scale: 1.05 },
    { x: 1120, y: 400, color: 'blue', scale: 0.8 },
  ];
  const ARC_EDGES = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [0, 2], [1, 3], [4, 6], [5, 7],
  ];

  const COLOR_HEX = { blue: '#5ad4ff', orange: '#ffab52' };

  return {
    farthest, midFar, mid, nearBuildings, nearBodySegs, nearWindowSegs,
    roofSegsByType, crownedSegs, mullionSegs, rimSegs, antennaPoleSegs, antennaLights,
    midAntennaLights, midAntennaPoleSegs, fgBodySegs, fgWindowSegs,
    starsMarkup, cloudsMarkup, PINS, ARC_EDGES, COLOR_HEX,
  };
}

// ---------------------------------------------------------------------------
// SVG assembly
// ---------------------------------------------------------------------------
function defsBlock() {
  return `
<linearGradient id="sky" x1="0.08" y1="0" x2="0.16" y2="1">
<stop offset="0" stop-color="#040a1f"/><stop offset="0.15" stop-color="#0b1a3c"/>
<stop offset="0.32" stop-color="#173463"/><stop offset="0.48" stop-color="#2c5a86"/>
<stop offset="0.61" stop-color="#527f9b"/><stop offset="0.72" stop-color="#8a9490"/>
<stop offset="0.82" stop-color="#c19062"/><stop offset="0.91" stop-color="#e8ad6c"/>
<stop offset="1" stop-color="#f9d69c"/></linearGradient>
<radialGradient id="sunglow" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="#fff0cc" stop-opacity="0.98"/>
<stop offset="0.22" stop-color="#ffd79c" stop-opacity="0.70"/>
<stop offset="0.48" stop-color="#f0a86a" stop-opacity="0.34"/>
<stop offset="0.74" stop-color="#c8794f" stop-opacity="0.12"/>
<stop offset="1" stop-color="#8f5540" stop-opacity="0"/></radialGradient>
<radialGradient id="sunCore" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="#fffaf0" stop-opacity="0.95"/>
<stop offset="0.6" stop-color="#ffe3b0" stop-opacity="0.5"/>
<stop offset="1" stop-color="#ffe3b0" stop-opacity="0"/></radialGradient>
<radialGradient id="bloom" cx="0.5" cy="0.5" r="0.5">
<stop offset="0" stop-color="#ffbe7c" stop-opacity="0.26"/>
<stop offset="0.55" stop-color="#d68a58" stop-opacity="0.10"/>
<stop offset="1" stop-color="#7a5340" stop-opacity="0"/></radialGradient>
<linearGradient id="gradFar" gradientUnits="userSpaceOnUse" x1="0" y1="380" x2="0" y2="470">
<stop offset="0" stop-color="#8fa3b8"/><stop offset="1" stop-color="#4c5f74"/></linearGradient>
<linearGradient id="gradMidFar" gradientUnits="userSpaceOnUse" x1="0" y1="382" x2="0" y2="512">
<stop offset="0" stop-color="#7a90ab"/><stop offset="1" stop-color="#3c4c62"/></linearGradient>
<linearGradient id="gradMid" gradientUnits="userSpaceOnUse" x1="0" y1="372" x2="0" y2="582">
<stop offset="0" stop-color="#6c84a3"/><stop offset="1" stop-color="#2b384e"/></linearGradient>
<linearGradient id="gradNear" gradientUnits="userSpaceOnUse" x1="0" y1="255" x2="0" y2="675">
<stop offset="0" stop-color="#5c7396"/><stop offset="1" stop-color="#161f30"/></linearGradient>
<linearGradient id="haze0" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#9db3bd" stop-opacity="0"/><stop offset="0.34" stop-color="#9db3bd" stop-opacity="0.35"/>
<stop offset="0.70" stop-color="#9db3bd" stop-opacity="0.18"/><stop offset="1" stop-color="#9db3bd" stop-opacity="0"/></linearGradient>
<linearGradient id="haze1" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#7793a8" stop-opacity="0"/><stop offset="0.34" stop-color="#7793a8" stop-opacity="0.30"/>
<stop offset="0.70" stop-color="#7793a8" stop-opacity="0.16"/><stop offset="1" stop-color="#7793a8" stop-opacity="0"/></linearGradient>
<linearGradient id="haze2" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#5a7188" stop-opacity="0"/><stop offset="0.34" stop-color="#5a7188" stop-opacity="0.26"/>
<stop offset="0.70" stop-color="#5a7188" stop-opacity="0.14"/><stop offset="1" stop-color="#5a7188" stop-opacity="0"/></linearGradient>
<linearGradient id="beamBlue" x1="0" y1="1" x2="0" y2="0">
<stop offset="0" stop-color="#5ad4ff" stop-opacity="0"/><stop offset="1" stop-color="#5ad4ff" stop-opacity="0.55"/></linearGradient>
<linearGradient id="beamOrange" x1="0" y1="1" x2="0" y2="0">
<stop offset="0" stop-color="#ffab52" stop-opacity="0"/><stop offset="1" stop-color="#ffab52" stop-opacity="0.55"/></linearGradient>
<filter id="blurFar" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.5"/></filter>
<filter id="blurHaze" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="blurCloud" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="blurSun" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="blurGhost" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.5"/></filter>`;
}

function styleBlock() {
  return `
<style>
.pin{opacity:0;transform:translateY(-18px) scale(.6);transform-box:fill-box;transform-origin:center;animation:pinDrop .68s cubic-bezier(.2,1.5,.35,1) forwards;}
.halo{transform-box:fill-box;transform-origin:center;animation:breathe 3.8s ease-in-out infinite;}
.ring{transform-box:fill-box;transform-origin:center;animation:ringPulse 2.9s ease-out infinite;}
.beam{opacity:0;animation:beamGrow .9s ease-out forwards,beamFlicker 4.6s ease-in-out infinite;}
.antennaLight{animation:antennaBlink 2.5s steps(1) infinite;}
@keyframes pinDrop{0%{opacity:0;transform:translateY(-18px) scale(.6);}60%{opacity:1;}100%{opacity:1;transform:translateY(0) scale(1);}}
@keyframes breathe{0%,100%{opacity:.55;transform:scale(1);}50%{opacity:.85;transform:scale(1.12);}}
@keyframes ringPulse{0%{opacity:.6;transform:scale(.7);}100%{opacity:0;transform:scale(1.6);}}
@keyframes beamGrow{from{opacity:0;}to{opacity:1;}}
@keyframes beamFlicker{0%,100%{opacity:.85;}45%{opacity:.65;}55%{opacity:.9;}80%{opacity:.7;}}
@keyframes antennaBlink{0%,49%{opacity:1;}50%,100%{opacity:0;}}
@media (prefers-reduced-motion:reduce){.pin,.halo,.ring,.beam,.antennaLight,.arcDraw,.spark{animation:none!important;opacity:1!important;transform:none!important;}}
</style>`;
}

function assemble(data, { staticFrame }) {
  const { farthest, midFar, mid, nearBodySegs, nearWindowSegs, roofSegsByType, crownedSegs,
    mullionSegs, rimSegs, antennaPoleSegs, antennaLights, midAntennaLights, midAntennaPoleSegs,
    fgBodySegs, fgWindowSegs, starsMarkup, cloudsMarkup, PINS, ARC_EDGES, COLOR_HEX } = data;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustrated city skyline at dusk with glowing location markers linked by light arcs">`;
  svg += `<defs>${defsBlock()}${staticFrame ? '' : styleBlock()}</defs>`;
  svg += `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  svg += `<g>${starsMarkup}</g>`;
  svg += cloudsMarkup;
  svg += `<ellipse cx="240" cy="250" rx="230" ry="200" fill="url(#sunglow)"/>`;
  svg += `<ellipse cx="240" cy="250" rx="70" ry="60" fill="url(#sunCore)" filter="url(#blurSun)"/>`;

  // Farthest layer.
  svg += `<g opacity="0.32" filter="url(#blurFar)">${farthest.bodyPath}</g>`;
  svg += `<rect x="0" y="380" width="${W}" height="140" fill="url(#haze0)" filter="url(#blurHaze)"/>`;

  // Mid-far layer.
  svg += `<g opacity="0.58">${midFar.bodyPath}${midFar.windowPath}</g>`;
  svg += `<rect x="0" y="400" width="${W}" height="140" fill="url(#haze1)" filter="url(#blurHaze)"/>`;

  // Mid layer.
  svg += `<g opacity="0.8">${mid.bodyPath}${mid.windowPath}</g>`;
  svg += `<ellipse cx="600" cy="560" rx="500" ry="90" fill="url(#bloom)"/>`;
  if (midAntennaPoleSegs.length) svg += `<path d="${midAntennaPoleSegs.join('')}" fill="#3a4658"/>`;
  midAntennaLights.forEach((l, i) => {
    const delayAttr = staticFrame ? '' : ` style="animation-delay:${l.delay.toFixed(2)}s"`;
    svg += `<circle class="antennaLight" cx="${l.x.toFixed(1)}" cy="${l.y.toFixed(1)}" r="1.6" fill="#ff5a4a"${delayAttr}/>`;
  });
  svg += `<rect x="0" y="470" width="${W}" height="140" fill="url(#haze2)" filter="url(#blurHaze)"/>`;

  // Near/hero layer.
  svg += `<g opacity="0.97">`;
  svg += `<path d="${nearBodySegs.join('')}" fill="url(#gradNear)"/>`;
  if (roofSegsByType.setback.length) svg += `<path d="${roofSegsByType.setback.join('')}" fill="url(#gradNear)"/>`;
  if (roofSegsByType.tapered.length) svg += `<path d="${roofSegsByType.tapered.join('')}" fill="url(#gradNear)"/>`;
  if (roofSegsByType.peaked.length) svg += `<path d="${roofSegsByType.peaked.join('')}" fill="url(#gradNear)"/>`;
  if (crownedSegs.length) svg += `<path d="${crownedSegs.join('')}" fill="url(#gradNear)"/>`;
  if (mullionSegs.length) svg += `<path d="${mullionSegs.join('')}" fill="#0f1826" opacity="0.3"/>`;
  if (rimSegs.length) svg += `<path d="${rimSegs.join('')}" fill="#ffcf9e" opacity="0.32"/>`;
  svg += `<path d="${nearWindowSegs.join('')}" fill="#ffdca8" opacity="0.9"/>`;
  if (antennaPoleSegs.length) svg += `<path d="${antennaPoleSegs.join('')}" fill="#3a4658"/>`;
  svg += `</g>`;
  antennaLights.forEach((l) => {
    const delayAttr = staticFrame ? '' : ` style="animation-delay:${l.delay.toFixed(2)}s"`;
    svg += `<circle class="antennaLight" cx="${l.x.toFixed(1)}" cy="${l.y.toFixed(1)}" r="1.8" fill="#ff5a4a"${delayAttr}/>`;
  });

  // Foreground silhouette row.
  svg += `<path d="${fgBodySegs.join('')}" fill="#0b1220"/>`;
  svg += `<path d="${fgWindowSegs.join('')}" fill="#ffd9a0" opacity="0.7"/>`;
  svg += `<ellipse cx="${W / 2}" cy="${H + 20}" rx="${W * 0.7}" ry="60" fill="#040814" opacity="0.55" filter="url(#blurHaze)"/>`;

  // Beams (behind pins, above buildings).
  svg += `<g>`;
  PINS.forEach((p, i) => {
    const grad = p.color === 'blue' ? 'beamBlue' : 'beamOrange';
    const beamW = 3.2 * p.scale;
    const style = staticFrame ? ' opacity="1"' : ` style="animation-delay:${(i * 0.1).toFixed(2)}s"`;
    svg += `<rect class="beam" x="${(p.x - beamW / 2).toFixed(1)}" y="${p.y.toFixed(1)}" width="${beamW.toFixed(1)}" height="${(H - p.y).toFixed(1)}" fill="url(#${grad})"${style}/>`;
  });
  svg += `</g>`;

  // Arcs (mesh) with draw-in + travelling sparks.
  svg += `<g fill="none">`;
  const arcMids = [];
  ARC_EDGES.forEach(([a, b], i) => {
    const p1 = PINS[a], p2 = PINS[b];
    const mx = (p1.x + p2.x) / 2;
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const my = Math.min(p1.y, p2.y) - Math.max(28, dist * 0.16);
    arcMids.push({ mx, my });
    const stroke = COLOR_HEX[p1.color];
    const id = `arc${i}`;
    const drawDelay = 2.6 + i * 0.09;
    const dashAttrs = staticFrame
      ? ''
      : ` pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" class="arcDraw"><animate attributeName="stroke-dashoffset" values="1;0" dur="0.9s" begin="${drawDelay.toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/></path`;
    svg += `<path id="${id}" d="M${p1.x},${p1.y}Q${mx.toFixed(1)},${my.toFixed(1)} ${p2.x},${p2.y}" stroke="${stroke}" stroke-width="1.1" stroke-opacity="0.5" stroke-linecap="round"${dashAttrs === '' ? '/>' : dashAttrs + '>'}`;
  });
  svg += `</g>`;

  // Pins.
  svg += `<g>`;
  PINS.forEach((p, i) => {
    const hex = COLOR_HEX[p.color];
    const s = p.scale;
    const dropDelay = i * 0.32;
    const pinStyle = staticFrame ? '' : ` style="animation-delay:${dropDelay.toFixed(2)}s"`;
    // Classic map-pin teardrop: rounded top (radius r) tapering to a point
    // at the bottom, centered horizontally on the anchor.
    const teardropPath = (scale) => {
      const r = 13 * scale;
      const tail = (r * 2.3).toFixed(1);
      const r1 = r.toFixed(1);
      const r066 = (r * 0.66).toFixed(1);
      const r034 = (-r * 0.34).toFixed(1);
      const r09 = (r * 0.9).toFixed(1);
      const nr = (-r).toFixed(1);
      const nr066 = (-r * 0.66).toFixed(1);
      return `M0,${(-r).toFixed(1)}C${r066},${(-r).toFixed(1)} ${r1},${r034} ${r1},0C${r1},${r09} 0,${tail} 0,${tail}C0,${tail} ${nr},${r09} ${nr},0C${nr},${r034} ${nr066},${(-r).toFixed(1)} 0,${(-r).toFixed(1)}Z`;
    };
    const pinPath = teardropPath(s);
    svg += `<g class="pin" transform="translate(${p.x},${p.y})"${pinStyle}>`;
    // Halo.
    svg += `<ellipse class="halo" cx="0" cy="4" rx="${(30 * s).toFixed(1)}" ry="${(22 * s).toFixed(1)}" fill="${hex}" opacity="0.55" filter="url(#blurGhost)"/>`;
    // Ghost blur copy (glass/frost effect).
    svg += `<path d="${pinPath}" transform="translate(1.2,1.6)" fill="${hex}" opacity="0.16" filter="url(#blurGhost)"/>`;
    // Glass pin body.
    svg += `<path d="${pinPath}" fill="rgba(255,255,255,0.14)" stroke="${hex}" stroke-width="1.6" stroke-opacity="0.9"/>`;
    // Specular highlight.
    svg += `<path d="M${(-6 * s).toFixed(1)},${(-8 * s).toFixed(1)}q${(3 * s).toFixed(1)},${(-5 * s).toFixed(1)} ${(8 * s).toFixed(1)},${(-4 * s).toFixed(1)}" stroke="#ffffff" stroke-width="${(1.6 * s).toFixed(1)}" stroke-linecap="round" stroke-opacity="0.6" fill="none"/>`;
    // Lens (solid, non-glass).
    svg += `<circle cx="0" cy="${(-6.5 * s).toFixed(1)}" r="${(4.2 * s).toFixed(1)}" fill="#ffffff"/>`;
    // Pulse ring.
    if (staticFrame) {
      svg += `<circle cx="0" cy="${(-6.5 * s).toFixed(1)}" r="${(6 * s).toFixed(1)}" fill="none" stroke="${hex}" stroke-width="1" opacity="0.4"/>`;
    } else {
      svg += `<circle class="ring" cx="0" cy="${(-6.5 * s).toFixed(1)}" r="${(4.2 * s).toFixed(1)}" fill="none" stroke="${hex}" stroke-width="1.2" style="animation-delay:${(dropDelay + 0.6 + i * 0.15).toFixed(2)}s"/>`;
    }
    svg += `</g>`;
  });
  svg += `</g>`;

  // Sparks travelling along arcs (animated variant only).
  if (!staticFrame) {
    svg += `<g>`;
    ARC_EDGES.forEach(([a], i) => {
      const p1 = PINS[a];
      const hex = COLOR_HEX[p1.color];
      const drawDelay = 2.6 + i * 0.09 + 0.9;
      svg += `<circle class="spark" r="2" fill="${hex}" opacity="0.9"><animateMotion dur="${(3 + (i % 3) * 0.4).toFixed(2)}s" begin="${drawDelay.toFixed(2)}s" repeatCount="indefinite"><mpath href="#arc${i}" xlink:href="#arc${i}"/></animateMotion></circle>`;
    });
    svg += `</g>`;
  }

  svg += `</svg>`;
  return svg;
}

// ---------------------------------------------------------------------------
// Build both variants and write the output module.
// ---------------------------------------------------------------------------
const data = build(SEED);
const animatedSvg = assemble(data, { staticFrame: false });
const staticSvg = assemble(data, { staticFrame: true });

const outFile = path.join(__dirname, '..', 'components', 'norleaseSkylineMarkup.ts');
const contents = `// GENERATED FILE — do not hand-edit. Regenerate with:
//   node scripts/generate-skyline.mjs
// Source generator: scripts/generate-skyline.mjs (seed ${SEED}).

export const animatedSkylineSvg = ${JSON.stringify(animatedSvg)};

export const staticSkylineSvg = ${JSON.stringify(staticSvg)};
`;

writeFileSync(outFile, contents, 'utf-8');

const sizeKb = (Buffer.byteLength(animatedSvg) / 1024).toFixed(1);
console.log(`Wrote ${outFile}`);
console.log(`Animated SVG: ${sizeKb} KB, static SVG: ${(Buffer.byteLength(staticSvg) / 1024).toFixed(1)} KB`);
