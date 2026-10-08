/**
 * Hero background: a slow fly-over of a DEM-style wireframe valley with an
 * LOD1 block city along a river, swept periodically by a scan line.
 * Plain Canvas 2D, no dependencies. Mounted into `section.hero-terrain`.
 */
(() => {
  'use strict';

  const section = document.querySelector('.hero-terrain');
  if (!section) return;
  const host = section.querySelector('.home-section-bg') || section;

  const canvas = document.createElement('canvas');
  canvas.className = 'hero-terrain__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const veil = document.createElement('div');
  veil.className = 'hero-terrain__veil';
  host.append(canvas, veil);

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  /* ---------------------------------------------------------------- World */

  const CELL = 1.25; // terrain grid spacing == city lot size (world units)
  const X_HALF = 75; // terrain half-width
  const NCOL = Math.round((2 * X_HALF) / CELL);
  const Z_NEAR = 2;
  const Z_FAR = 64;
  const CAM_Y = 10;
  const SPEED = 1.5; // fly-over speed, units per second
  const CITY = 10; // half-width of the flat valley floor
  const RIVER = 1.3; // river half-width
  const SCAN_PERIOD = 12; // seconds between scan sweeps
  const SCAN_SWEEP = 9; // seconds a sweep takes, far to near

  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const smooth = (v) => v * v * (3 - 2 * v);
  const lerp = (a, b, t) => a + (b - a) * t;

  // Seeded Perlin noise.
  const perm = new Uint8Array(512);
  {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let s = 20240611;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  }
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  function grad(h, x, y) {
    switch (h & 7) {
      case 0: return x + y;
      case 1: return -x + y;
      case 2: return x - y;
      case 3: return -x - y;
      case 4: return x;
      case 5: return -x;
      case 6: return y;
      default: return -y;
    }
  }
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const X = xi & 255, Y = yi & 255;
    const xf = x - xi, yf = y - yi;
    const u = fade(xf), v = fade(yf);
    const a = perm[X] + Y, b = perm[X + 1] + Y;
    return lerp(
      lerp(grad(perm[a], xf, yf), grad(perm[b], xf - 1, yf), u),
      lerp(grad(perm[a + 1], xf, yf - 1), grad(perm[b + 1], xf - 1, yf - 1), u),
      v,
    );
  }
  // Ridged multifractal: sharp crests, soft valleys.
  function ridged(x, y) {
    let sum = 0, amp = 0.5, freq = 1, prev = 1;
    for (let o = 0; o < 4; o++) {
      let n = 1 - Math.abs(noise(x * freq, y * freq));
      n *= n;
      sum += n * amp * prev;
      prev = n;
      freq *= 2.03;
      amp *= 0.5;
    }
    return sum;
  }
  function hash(a, b, c) {
    let h = (a * 374761393 + b * 668265263 + c * 2246822519) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  // The valley (and the river in it) meanders as we fly along +z.
  const valleyX = (z) => 8 * Math.sin(z * 0.028) + 3.5 * Math.sin(z * 0.071 + 1.3);

  function heightAt(x, z) {
    const d = Math.abs(x - valleyX(z)) - CITY;
    if (d <= 0) return 0;
    const m = d >= 16 ? 1 : smooth(d / 16);
    return m * (1 + 19 * ridged(x * 0.04, z * 0.04)) + m * m * 3;
  }

  // Terrain heights per world row, cached while the row is in view.
  const rowCache = new Map();
  function rowHeights(r) {
    let hs = rowCache.get(r);
    if (!hs) {
      hs = new Float32Array(NCOL + 1);
      const z = r * CELL;
      for (let j = 0; j <= NCOL; j++) hs[j] = heightAt(-X_HALF + j * CELL, z);
      rowCache.set(r, hs);
    }
    return hs;
  }

  // Buildings per row of city lots (lot k sits between terrain rows k and k+1).
  const lotCache = new Map();
  function lotRow(k) {
    let list = lotCache.get(k);
    if (list) return list;
    list = [];
    const zc = (k + 0.5) * CELL;
    const c = valleyX(zc);
    const iLo = Math.floor((c - CITY + X_HALF) / CELL);
    const iHi = Math.floor((c + CITY + X_HALF) / CELL);
    for (let i = iLo; i <= iHi; i++) {
      const xc = -X_HALF + (i + 0.5) * CELL;
      const d = Math.abs(xc - c);
      if (d < RIVER + 0.9 || d > CITY - 0.7) continue;
      const u = (d - RIVER) / (CITY - RIVER); // 0 at the river, 1 at the foothills
      if (hash(i, k, 1) > 0.92 - 0.5 * u) continue;
      const hw = CELL * (0.27 + 0.13 * hash(i, k, 2));
      const hd = CELL * (0.27 + 0.13 * hash(i, k, 3));
      let h = 0.4 + 1.1 * hash(i, k, 4) + (1 - u) * (1 - u) * 5.5 * Math.pow(hash(i, k, 5), 1.6);
      if (hash(i, k, 6) < 0.05 * (1 - u)) h += 4 + 4 * hash(i, k, 7); // landmark towers
      list.push({ i, k, x0: xc - hw, x1: xc + hw, z0: zc - hd, z1: zc + hd, h });
    }
    lotCache.set(k, list);
    return list;
  }

  /* --------------------------------------------------------------- Colour */

  const SKY_TOP = [2, 5, 14];
  const SKY_HORIZON = [12, 38, 48];
  const HAZE = [9, 28, 37];
  const GROUND = [3, 10, 15];
  const LINE = [
    [45, 212, 191], // valley floor  (teal-400)
    [45, 212, 191], // foothills
    [52, 211, 153], // slopes        (emerald-400)
    [209, 250, 229], // crests       (emerald-100)
  ];
  const LINE_ALPHA = [0.16, 0.42, 0.6, 0.78];
  const SCAN = [103, 232, 249]; // cyan-300
  const SCAN_GLOW = [16, 78, 92];
  const EDGE = [110, 231, 183]; // emerald-300
  const WATER = [6, 46, 62];
  const WINDOW = [253, 230, 138]; // amber-200
  const FACE_FRONT = [10, 32, 40];
  const FACE_SIDE = [6, 21, 29];
  const FACE_TOP = [17, 48, 54];
  const HEADLIGHT = [254, 243, 199];
  const TAILLIGHT = [251, 113, 133];

  const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;

  // Fog-level lookup for building colours, so the hot loop allocates no strings.
  const FOG_STEPS = 48;
  const buildingLUT = Array.from({ length: FOG_STEPS + 1 }, (_, n) => {
    const fog = n / FOG_STEPS;
    return {
      front: rgba(mix(FACE_FRONT, HAZE, fog), 1),
      side: rgba(mix(FACE_SIDE, HAZE, fog), 1),
      top: rgba(mix(FACE_TOP, HAZE, fog), 1),
      edge: rgba(EDGE, 0.72 * (1 - fog)),
      window: rgba(WINDOW, 0.85 * (1 - fog)),
    };
  });
  function nearBuildingColors(fog, nf) {
    const face = (c) => rgba(mix(GROUND, mix(c, HAZE, fog), nf), 1);
    return {
      front: face(FACE_FRONT),
      side: face(FACE_SIDE),
      top: face(FACE_TOP),
      edge: rgba(EDGE, 0.72 * (1 - fog) * (0.2 + 0.8 * nf)),
      window: rgba(WINDOW, 0.85 * (1 - fog) * nf),
    };
  }

  /* ------------------------------------------------------------- Viewport */

  let W = 0, H = 0, dpr = 1, f = 1, cx = 0, cy0 = 0, lowRes = false;
  let skyGrad = null, glowGrad = null;
  let stars = [];
  const RIDGES = [
    { depth: 190, base: 10, amp: 34, scale: 2.1, seed: 11, fill: [14, 41, 53], line: 0.16 },
    { depth: 130, base: 7, amp: 26, scale: 3.3, seed: 37, fill: [11, 34, 44], line: 0.2 },
    { depth: 90, base: 5, amp: 18, scale: 4.6, seed: 71, fill: HAZE, line: 0.24 },
  ];
  // Distant ridgelines are sampled once by azimuth and looked up per frame.
  const AZ_MIN = -2.2, AZ_STEP = 0.002;
  const AZ_N = Math.ceil(4.4 / AZ_STEP) + 1;
  for (const layer of RIDGES) {
    layer.profile = new Float32Array(AZ_N);
    for (let n = 0; n < AZ_N; n++) {
      const az = AZ_MIN + n * AZ_STEP;
      layer.profile[n] = layer.base + layer.amp * ridged(az * layer.scale + layer.seed, layer.seed * 0.37);
    }
  }

  function resize() {
    W = section.clientWidth;
    H = section.clientHeight;
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, lowRes ? 1 : 1.5);
    if (W * H * dpr * dpr > 5e6) dpr = Math.max(1, Math.sqrt(5e6 / (W * H)));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    // Frame the scene on the part of the section seen first.
    const view = Math.min(H, Math.max(window.innerHeight || 800, 560));
    cy0 = view * 0.44;
    f = Math.max(W * 0.5, view * 0.62);
    cx = W / 2;

    skyGrad = ctx.createLinearGradient(0, 0, 0, cy0 + 40);
    skyGrad.addColorStop(0, rgba(SKY_TOP, 1));
    skyGrad.addColorStop(0.65, rgba(mix(SKY_TOP, SKY_HORIZON, 0.45), 1));
    skyGrad.addColorStop(1, rgba(SKY_HORIZON, 1));
    glowGrad = ctx.createRadialGradient(cx, cy0, 0, cx, cy0, Math.max(W, view) * 0.6);
    glowGrad.addColorStop(0, 'rgba(16,185,129,0.10)');
    glowGrad.addColorStop(1, 'rgba(16,185,129,0)');

    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const count = Math.round((W * cy0) / 6000);
    stars = Array.from({ length: count }, () => ({
      x: rand() * W,
      y: rand() * cy0 * 0.92,
      a: 0.12 + rand() * 0.5,
      p: rand() * Math.PI * 2,
      s: rand() < 0.15 ? 1.6 : 1,
    }));

    if (!running) render(lastT);
  }

  /* -------------------------------------------------------------- Render */

  const MAX_ROWS = Math.ceil((Z_FAR - Z_NEAR) / CELL) + 3;
  const PX = new Float32Array(MAX_ROWS * (NCOL + 1));
  const PY = new Float32Array(MAX_ROWS * (NCOL + 1));
  const Q = new Float32Array(16); // projected building corners

  let camX = 0, camZ = 40, yaw = 0, cy = 0, cosY = 1, sinY = 0;
  let mouseX = 0, mouseY = 0, lookX = 0, lookY = 0;

  // Project a world point into Q[slot*2], Q[slot*2+1]; returns view depth.
  function proj(slot, x, y, z) {
    const dx = x - camX, dz = z - camZ;
    const rz = Math.max(0.5, dx * sinY + dz * cosY);
    const s = f / rz;
    Q[slot * 2] = cx + (dx * cosY - dz * sinY) * s;
    Q[slot * 2 + 1] = cy - (y - CAM_Y) * s;
    return rz;
  }

  // Scan sweep intensity at world z: sharp leading edge, fading trail behind it.
  function scanAt(z, scanZ) {
    const dz = z - scanZ;
    if (dz < -1.2 || dz > 8) return 0;
    return dz < 0 ? 1 + dz / 1.2 : (1 - dz / 8) * (1 - dz / 8);
  }

  function fogAt(depth) {
    return Math.pow(clamp01((depth - Z_NEAR) / (Z_FAR - Z_NEAR)), 1.35);
  }
  // The near field dissolves into dark ground so the lower half stays calm behind text.
  function nearFadeAt(depth) {
    return smooth(clamp01((depth - 6) / 16));
  }

  function drawSky(t) {
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, cy + 40);
    ctx.fillStyle = rgba(HAZE, 1);
    ctx.fillRect(0, cy + 40, W, H - cy - 40);
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#e6fff6';
    const shift = yaw * f;
    for (const st of stars) {
      let x = (st.x - shift) % W;
      if (x < 0) x += W;
      ctx.globalAlpha = st.a * (0.65 + 0.35 * Math.sin(t * 0.8 + st.p));
      ctx.fillRect(x, st.y + (cy - cy0), st.s, st.s);
    }
    ctx.globalAlpha = 1;
  }

  function drawRidges() {
    for (const layer of RIDGES) {
      const k = f / layer.depth;
      ctx.beginPath();
      ctx.moveTo(-10, H);
      for (let sx = -10; sx <= W + 10; sx += 4) {
        const az = Math.atan((sx - cx) / f) + yaw + camX / layer.depth;
        const n = Math.min(AZ_N - 1, Math.max(0, Math.round((az - AZ_MIN) / AZ_STEP)));
        ctx.lineTo(sx, cy - (layer.profile[n] - CAM_Y) * k);
      }
      ctx.lineTo(W + 10, H);
      ctx.closePath();
      ctx.fillStyle = rgba(layer.fill, 1);
      ctx.fill();
      ctx.strokeStyle = rgba(EDGE, layer.line);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawRiverAndTraffic(zNear, zFar, fog, nf, alpha, t) {
    const cN = valleyX(zNear), cF = valleyX(zFar);
    proj(0, cN - RIVER, 0, zNear);
    proj(1, cN + RIVER, 0, zNear);
    proj(2, cF + RIVER, 0, zFar);
    proj(3, cF - RIVER, 0, zFar);
    if (Math.max(Q[0], Q[6]) < -20 || Math.min(Q[2], Q[4]) > W + 20) return;

    ctx.beginPath();
    ctx.moveTo(Q[0], Q[1]);
    ctx.lineTo(Q[2], Q[3]);
    ctx.lineTo(Q[4], Q[5]);
    ctx.lineTo(Q[6], Q[7]);
    ctx.closePath();
    ctx.fillStyle = rgba(mix(GROUND, mix(WATER, HAZE, fog), 0.3 + 0.7 * nf), alpha);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(Q[0], Q[1]);
    ctx.lineTo(Q[6], Q[7]);
    ctx.moveTo(Q[2], Q[3]);
    ctx.lineTo(Q[4], Q[5]);
    ctx.strokeStyle = rgba(SCAN, 0.5 * (1 - fog) * nf * alpha);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Light trails on the riverside roads: oncoming on the left, outbound on the right.
    const depth = (zNear + zFar) / 2 - camZ;
    const width = Math.min(2.6, Math.max(0.7, (f / depth) * 0.05));
    const SP = 1.9;
    for (let lane = 0; lane < 2; lane++) {
      const dir = lane === 0 ? -1 : 1;
      const offset = (lane === 0 ? -1 : 1) * (RIVER + 0.25);
      const shift = dir * t * 2.6 + lane * 0.7;
      ctx.beginPath();
      for (let m = Math.ceil((zNear - shift) / SP); ; m++) {
        const z = m * SP + shift;
        if (z >= zFar) break;
        if (hash(m, lane, 13) > 0.6) continue;
        const tail = z - dir * 0.8;
        proj(0, valleyX(z) + offset, 0.05, z);
        proj(1, valleyX(tail) + offset, 0.05, tail);
        ctx.moveTo(Q[0], Q[1]);
        ctx.lineTo(Q[2], Q[3]);
      }
      ctx.strokeStyle = rgba(dir < 0 ? HEADLIGHT : TAILLIGHT, 0.85 * (1 - fog) * nf * alpha);
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.lineCap = 'butt';
  }

  function drawBuilding(b, scan) {
    const depth = proj(0, b.x0, 0, b.z0); // A front-bottom-left
    proj(1, b.x1, 0, b.z0); // B front-bottom-right
    proj(2, b.x0, b.h, b.z0); // C front-top-left
    proj(3, b.x1, b.h, b.z0); // D front-top-right
    proj(4, b.x0, b.h, b.z1); // E back-top-left
    proj(5, b.x1, b.h, b.z1); // F back-top-right
    proj(6, b.x0, 0, b.z1); // G back-bottom-left
    proj(7, b.x1, 0, b.z1); // H back-bottom-right
    let minX = Infinity, maxX = -Infinity, minY = Infinity;
    for (let n = 0; n < 16; n += 2) {
      if (Q[n] < minX) minX = Q[n];
      if (Q[n] > maxX) maxX = Q[n];
      if (Q[n + 1] < minY) minY = Q[n + 1];
    }
    if (maxX < -10 || minX > W + 10 || minY > H + 10) return;

    const zMid = (b.z0 + b.z1) / 2 - camZ;
    const fog = fogAt(zMid);
    const nf = nearFadeAt(zMid);
    const lut = nf < 1 ? nearBuildingColors(fog, nf) : buildingLUT[Math.round(fog * FOG_STEPS)];
    const showLeft = camX < b.x0, showRight = camX > b.x1, showTop = CAM_Y > b.h;
    const quad = (a, c, d, e) => {
      ctx.beginPath();
      ctx.moveTo(Q[a * 2], Q[a * 2 + 1]);
      ctx.lineTo(Q[c * 2], Q[c * 2 + 1]);
      ctx.lineTo(Q[d * 2], Q[d * 2 + 1]);
      ctx.lineTo(Q[e * 2], Q[e * 2 + 1]);
      ctx.closePath();
      ctx.fill();
    };
    ctx.fillStyle = lut.side;
    if (showLeft) quad(0, 2, 4, 6);
    if (showRight) quad(1, 3, 5, 7);
    if (showTop) {
      ctx.fillStyle = lut.top;
      quad(2, 3, 5, 4);
    }
    ctx.fillStyle = lut.front;
    quad(0, 1, 3, 2);

    // Lit windows on the front face of nearby buildings.
    const floorPx = (Q[1] - Q[5]) / (b.h / 0.34);
    if (floorPx > 3) {
      const floors = Math.max(1, Math.floor((b.h - 0.12) / 0.34));
      const cols = Math.max(2, Math.round((b.x1 - b.x0) / 0.22));
      const ww = ((Q[2] - Q[0]) / cols) * 0.36;
      const wh = floorPx * 0.34;
      ctx.beginPath();
      for (let fl = 0; fl < floors; fl++) {
        const v = (0.17 + fl * 0.34) / b.h;
        for (let col = 0; col < cols; col++) {
          if (hash(b.i * 31 + col, b.k * 17 + fl, 9) > 0.2) continue;
          const u = (col + 0.5) / cols;
          const x = lerp(lerp(Q[0], Q[2], u), lerp(Q[4], Q[6], u), v);
          const y = lerp(lerp(Q[1], Q[3], u), lerp(Q[5], Q[7], u), v);
          ctx.rect(x - ww / 2, y - wh / 2, ww, wh);
        }
      }
      ctx.fillStyle = lut.window;
      ctx.fill();
    }

    // Visible edges, each drawn once.
    const seg = (a, c) => {
      ctx.moveTo(Q[a * 2], Q[a * 2 + 1]);
      ctx.lineTo(Q[c * 2], Q[c * 2 + 1]);
    };
    ctx.beginPath();
    seg(0, 1); seg(1, 3); seg(3, 2); seg(2, 0);
    if (showTop) { seg(2, 4); seg(4, 5); seg(5, 3); }
    if (showLeft) { seg(0, 6); seg(6, 4); if (!showTop) seg(2, 4); }
    if (showRight) { seg(1, 7); seg(7, 5); if (!showTop) seg(3, 5); }
    ctx.strokeStyle = scan > 0 ? rgba(mix(EDGE, SCAN, scan), Math.max(0.72, scan) * (1 - fog) * nf) : lut.edge;
    ctx.lineWidth = depth < 12 ? 1.2 : 1;
    ctx.stroke();
  }

  function render(t) {
    if (!W || !H) return;

    // Camera follows the valley, banking gently toward where it turns next.
    camZ = 40 + t * SPEED;
    camX = valleyX(camZ + 2);
    lookX += (mouseX - lookX) * 0.04;
    lookY += (mouseY - lookY) * 0.04;
    yaw = Math.atan2(valleyX(camZ + 16) - camX, 14) * 0.55 + lookX * 0.08;
    cosY = Math.cos(yaw);
    sinY = Math.sin(yaw);
    cy = cy0 + lookY * 24;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawSky(t);
    drawRidges();

    const r0 = Math.floor((camZ + Z_NEAR) / CELL);
    const r1 = Math.ceil((camZ + Z_FAR) / CELL);
    const nRows = Math.min(MAX_ROWS, r1 - r0 + 1);
    for (let i = 0; i < nRows; i++) {
      const hs = rowHeights(r0 + i);
      const dz = (r0 + i) * CELL - camZ;
      let o = i * (NCOL + 1);
      for (let j = 0; j <= NCOL; j++, o++) {
        const dx = -X_HALF + j * CELL - camX;
        const s = f / Math.max(0.5, dx * sinY + dz * cosY);
        PX[o] = cx + (dx * cosY - dz * sinY) * s;
        PY[o] = cy - (hs[j] - CAM_Y) * s;
      }
    }
    for (const r of rowCache.keys()) if (r < r0 - 1) rowCache.delete(r);
    for (const k of lotCache.keys()) if (k < r0 - 1) lotCache.delete(k);

    const phase = (t % SCAN_PERIOD) / SCAN_SWEEP;
    const scanZ = reduceMotion.matches || phase > 1 ? -1e9 : camZ + lerp(Z_FAR, 5, phase);

    const buildings = [];

    // Paint strips far to near: each strip's fill hides what lies behind it.
    for (let i = nRows - 2; i >= 0; i--) {
      const zNear = (r0 + i) * CELL, zFar = zNear + CELL;
      const depth = zFar - camZ;
      const fz = clamp01((depth - Z_NEAR) / (Z_FAR - Z_NEAR));
      const fog = Math.pow(fz, 1.35);
      const alpha = 1 - smooth(clamp01((fz - 0.82) / 0.18));
      const nf = nearFadeAt(depth);
      const lineA = (1 - fog) * alpha * (0.25 + 0.75 * nf);
      const near = i * (NCOL + 1), far = near + NCOL + 1;
      const hsN = rowHeights(r0 + i), hsF = rowHeights(r0 + i + 1);

      let jLo = 0, jHi = NCOL;
      while (jLo < NCOL - 1 && PX[near + jLo + 1] < -40 && PX[far + jLo + 1] < -40) jLo++;
      while (jHi > jLo + 1 && PX[near + jHi - 1] > W + 40 && PX[far + jHi - 1] > W + 40) jHi--;

      ctx.beginPath();
      ctx.moveTo(PX[far + jLo], PY[far + jLo]);
      for (let j = jLo + 1; j <= jHi; j++) ctx.lineTo(PX[far + j], PY[far + j]);
      for (let j = jHi; j >= jLo; j--) ctx.lineTo(PX[near + j], PY[near + j]);
      ctx.closePath();
      const scan = scanAt(zFar, scanZ) * nf;
      ctx.fillStyle = rgba(mix(mix(GROUND, HAZE, fog), SCAN_GLOW, scan * (1 - fog) * 0.6), alpha);
      ctx.fill();

      const strip = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      const band = (h) => (h < 0.05 ? 0 : h < 4 ? 1 : h < 11 ? 2 : 3);
      for (let j = jLo; j <= jHi; j++) {
        if (j < jHi) {
          const p = strip[band((hsF[j] + hsF[j + 1]) / 2)];
          p.moveTo(PX[far + j], PY[far + j]);
          p.lineTo(PX[far + j + 1], PY[far + j + 1]);
        }
        const p = strip[band((hsN[j] + hsF[j]) / 2)];
        p.moveTo(PX[near + j], PY[near + j]);
        p.lineTo(PX[far + j], PY[far + j]);
      }
      ctx.lineWidth = 1 + scan * 0.6;
      for (let b = 0; b < 4; b++) {
        const a = LINE_ALPHA[b] * lineA;
        ctx.strokeStyle = scan > 0
          ? rgba(mix(LINE[b], SCAN, scan), Math.max(a, 0.95 * scan * (1 - fog) * alpha))
          : rgba(LINE[b], a);
        ctx.stroke(strip[b]);
      }

      drawRiverAndTraffic(zNear, zFar, fog, nf, alpha, t);

      if (depth > 4) {
        buildings.length = 0;
        for (const b of lotRow(r0 + i)) buildings.push(b);
        buildings.sort((a, c) => Math.abs(c.x0 + c.x1 - 2 * camX) - Math.abs(a.x0 + a.x1 - 2 * camX));
        ctx.globalAlpha = alpha;
        for (const b of buildings) {
          drawBuilding(b, scanAt(b.z0, scanZ));
        }
        ctx.globalAlpha = 1;
      }
    }
  }

  /* ---------------------------------------------------------------- Loop */

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let running = false, visible = true, raf = 0, lastT = 30, lastNow = 0;
  let sampleFrames = 0, sampleTime = 0;

  function tick(now) {
    const dt = Math.min(0.1, (now - lastNow) / 1000 || 0);
    lastNow = now;
    lastT += dt;
    // Slow device: drop to 1x resolution once, after a short warm-up sample.
    if (!lowRes && dpr > 1 && ++sampleFrames > 30) {
      sampleTime += dt;
      if (sampleFrames === 150 && sampleTime / 120 > 1 / 40) {
        lowRes = true;
        resize();
      }
    }
    render(lastT);
    raf = requestAnimationFrame(tick);
  }
  function update() {
    const should = visible && !document.hidden && !reduceMotion.matches;
    if (should && !running) {
      running = true;
      lastNow = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
    if (!running) render(lastT);
  }

  new ResizeObserver(resize).observe(section);
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    update();
  }).observe(section);
  document.addEventListener('visibilitychange', update);
  reduceMotion.addEventListener?.('change', update);
  window.addEventListener(
    'pointermove',
    (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );

  resize();
  update();
})();
