import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const ot = require('opentype.js');

const f800 = ot.parse(fs.readFileSync('oxanium-800.ttf').buffer.slice(0));
const OUT = new URL('.', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

/* Render a word as one combined path with optional per-gap tracking (px). */
function word(font, text, size, x, y, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  let cx = x, d = '';
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    d += g.getPath(cx, y, size).toPathData(2);
    cx += g.advanceWidth * scale;
    if (i < glyphs.length - 1) cx += tracking;
  }
  return { d, width: cx - x };
}
function naturalWidth(font, text, size) {
  const scale = size / font.unitsPerEm;
  return font.stringToGlyphs(text).reduce((w, g) => w + g.advanceWidth * scale, 0);
}

/* ── Finishes ──────────────────────────────────────────────────────── */
const ember = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#ffd75e"/><stop offset=".16" stop-color="#ffbe1d"/>
    <stop offset=".44" stop-color="#ff8000"/><stop offset=".60" stop-color="#f26522"/>
    <stop offset=".80" stop-color="#b34a00"/><stop offset="1" stop-color="#6e2f00"/>
  </linearGradient>`;
const chrome = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".24" stop-color="#e9eff5"/>
    <stop offset=".50" stop-color="#c3d0dc"/><stop offset=".52" stop-color="#7f97a9"/>
    <stop offset=".62" stop-color="#a9bac7"/><stop offset=".84" stop-color="#e6edf3"/>
    <stop offset="1" stop-color="#f9fbfd"/>
  </linearGradient>`;
const war = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#e8524a"/><stop offset=".45" stop-color="#d5352e"/>
    <stop offset=".80" stop-color="#a81f1a"/><stop offset="1" stop-color="#7e120e"/>
  </linearGradient>`;
const steel = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#d6ebfa"/><stop offset=".22" stop-color="#9ccdf0"/>
    <stop offset=".50" stop-color="#69aad7"/><stop offset=".78" stop-color="#3d7ba6"/>
    <stop offset="1" stop-color="#27567a"/>
  </linearGradient>`;
const gold = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#fff3c4"/><stop offset=".22" stop-color="#ffe27a"/>
    <stop offset=".50" stop-color="#ffc61d"/><stop offset=".78" stop-color="#e09b00"/>
    <stop offset="1" stop-color="#8f6200"/>
  </linearGradient>`;
const phosphor = (id, y0, y1) => `
  <linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}">
    <stop offset="0" stop-color="#e9d8ff"/><stop offset=".16" stop-color="#c9a6ff"/>
    <stop offset=".44" stop-color="#ae7ff0"/><stop offset=".60" stop-color="#a06be8"/>
    <stop offset=".80" stop-color="#6d43ac"/><stop offset="1" stop-color="#3a2363"/>
  </linearGradient>`;
const FIN = {
  ember:  { grad: ember,  stroke: '#2c1403', extrude: '#1a0c02' },
  chrome: { grad: chrome, stroke: '#1d262e', extrude: '#0d1216' },
  war:    { grad: war,    stroke: '#260404', extrude: '#140202' },
  steel:  { grad: steel,  stroke: '#0e2230', extrude: '#071320' },
  gold:   { grad: gold,   stroke: '#332302', extrude: '#1c1301' },
  phosphor: { grad: phosphor, stroke: '#241040', extrude: '#120826' },
};

/* Buracos de bala — furos escuros com anel de chamuscado, recortados nas
   letras da segunda palavra. Posições determinísticas (reprodutível). */
function bulletHoles(x0, width, yTop, yBot, scale) {
  const spots = [
    [.06, .30, 4.6], [.15, .72, 3.1], [.24, .22, 5.2], [.33, .62, 3.4],
    [.42, .18, 4.1], [.50, .70, 2.9], [.58, .35, 5.4], [.67, .68, 3.3],
    [.76, .25, 4.4], [.85, .60, 3.0], [.93, .38, 4.9],
  ];
  return spots.map(([fx, fy, r]) => {
    const cx = (x0 + fx * width).toFixed(1);
    const cy = (yTop + fy * (yBot - yTop)).toFixed(1);
    const rr = (r * scale).toFixed(1);
    return `<circle cx="${cx}" cy="${cy}" r="${(rr * 1.55).toFixed(1)}" fill="#160303" opacity=".5"/>
      <circle cx="${cx}" cy="${cy}" r="${rr}" fill="url(#hole)"/>`;
  }).join('');
}

/* Raios — zigue-zagues determinísticos; a corrente atravessa a palavra
   e se intensifica até descarregar no final. */
const JIT = [3, -5, 7, -2, 6, -7, 2, -4, 5, -6, 4, -3, 7, -5, 2, -6, 3, -7, 5, -2, 6, -4];
function zig(x0, x1, yMid, amp, n, phase) {
  let d = `M ${x0.toFixed(1)} ${yMid.toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const x = x0 + (x1 - x0) * (i / n);
    const y = i === n ? yMid : yMid + (JIT[(i + phase) % JIT.length] / 7) * amp;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
function electricLayer(x0, width, yTop, yBot) {
  const h = yBot - yTop, yMid = yTop + h * 0.52;
  const bolts = [
    // corrente principal: atravessa a palavra, rente ao meio
    { d: zig(x0 - 5, x0 + width + 12, yMid, h * 0.15, 15, 0), w: 1.3 },
    // arco superior discreto: entra depois da metade
    { d: zig(x0 + width * 0.46, x0 + width + 7, yTop + h * 0.18, h * 0.11, 8, 5), w: 0.9 },
    // ramificações de descarga no final
    { d: zig(x0 + width * 0.90, x0 + width + 15, yTop + h * 0.04, h * 0.12, 4, 3), w: 0.8 },
    { d: zig(x0 + width * 0.94, x0 + width + 12, yBot - h * 0.06, h * 0.10, 3, 7), w: 0.8 },
  ];
  const sparks = [
    [x0 + width + 12, yMid, 1.6], [x0 + width + 15, yTop + h * 0.04, 1.1],
    [x0 + width + 12, yBot - h * 0.06, 1.2],
  ];
  const glow = bolts.map(b => `<path d="${b.d}" stroke="#8fd8ff" stroke-width="${(b.w * 2.2).toFixed(1)}"/>`).join('');
  const halo = bolts.map(b => `<path d="${b.d}" stroke="#4fb6f0" stroke-width="${(b.w * 5).toFixed(1)}"/>`).join('');
  const core = bolts.map(b => `<path d="${b.d}" stroke="#ffffff" stroke-width="${b.w}"/>`).join('');
  const dots = sparks.map(([x, y, r]) =>
    `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r * 2.2}" fill="#8fd8ff" opacity=".3"/>
     <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#ffffff"/>`).join('');
  return `
<g fill="none" stroke-linejoin="round" stroke-linecap="round" filter="url(#ehalo)" opacity=".32">${halo}</g>
<g fill="none" stroke-linejoin="round" stroke-linecap="round" filter="url(#eglow)" opacity=".75">${glow}</g>
<g fill="none" stroke-linejoin="round" stroke-linecap="round">${core}</g>
${dots}`;
}

/* ── Wordmark builder ──────────────────────────────────────────────
   Layout inherited from the 2004/2005 logos: big word on top, second
   word below, indented left, stretched by tracking to end flush right. */
function wordmark(file, top, bottom, finTop, finBottom, opts = {}) {
  const S1 = 100, PAD = 8, EX = 3;           // main size, padding, extrusion
  const w1 = word(f800, top, S1, PAD, 100);
  const W = w1.width;
  const indent = Math.round(W * 0.17);
  const target = W - indent;
  // second word: tracking capped at 15px; short words grow to fill instead
  const CAP = 15, S2MAX = 56;
  let S2 = 40;
  let nat = naturalWidth(f800, bottom, S2);
  let tr = (target - nat) / (bottom.length - 1);
  if (tr > CAP) {
    const unit = nat / S2;
    S2 = Math.min(S2MAX, (target - CAP * (bottom.length - 1)) / unit);
    nat = unit * S2;
    tr = (target - nat) / (bottom.length - 1);
  }
  const base2 = Math.round(100 + 22 + 0.73 * S2);
  const w2 = word(f800, bottom, S2, PAD + indent, base2, tr);

  const vbW = Math.round(W + PAD * 2 + EX) + (opts.electric ? 14 : 0), vbH = base2 + 14;
  const g1 = FIN[finTop].grad('g1', 26, 102),
        g2 = FIN[finBottom].grad('g2', Math.round(base2 - 0.75 * S2), base2 + 2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" role="img" aria-label="${top} ${bottom}">
<defs>${g1}${g2}
  <linearGradient id="spec" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${vbW}" y2="${vbH}">
    <stop offset=".30" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".46" stop-color="#fff" stop-opacity=".32"/>
    <stop offset=".52" stop-color="#fff" stop-opacity=".08"/>
    <stop offset=".62" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="letters"><path d="${w1.d}"/><path d="${w2.d}"/></clipPath>
  <clipPath id="word2"><path d="${w2.d}"/></clipPath>
  <radialGradient id="hole">
    <stop offset="0" stop-color="#050101"/><stop offset=".62" stop-color="#1a0404"/>
    <stop offset=".88" stop-color="#3d0f0c"/><stop offset="1" stop-color="#54140f"/>
  </radialGradient>
  <filter id="ds" x="-8%" y="-12%" width="116%" height="130%">
    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".55"/>
  </filter>
  <filter id="eglow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="2.2"/>
  </filter>
  <filter id="ehalo" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="6"/>
  </filter>
  <linearGradient id="charge" gradientUnits="userSpaceOnUse"
    x1="${PAD + indent}" y1="0" x2="${PAD + indent + target}" y2="0">
    <stop offset="0" stop-color="#bfe6ff" stop-opacity="0"/>
    <stop offset=".60" stop-color="#bfe6ff" stop-opacity=".06"/>
    <stop offset=".88" stop-color="#dff2ff" stop-opacity=".16"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity=".28"/>
  </linearGradient>
</defs>
<g filter="url(#ds)">
  <path d="${w1.d}" transform="translate(${EX},${EX})" fill="${FIN[finTop].extrude}"/>
  <path d="${w2.d}" transform="translate(${EX},${EX})" fill="${FIN[finBottom].extrude}"/>
  <path d="${w1.d}" fill="url(#g1)" stroke="${FIN[finTop].stroke}" stroke-width="1.6"/>
  <path d="${w2.d}" fill="url(#g2)" stroke="${FIN[finBottom].stroke}" stroke-width="1.3"/>
</g>
${opts.holes ? `<g clip-path="url(#word2)">${bulletHoles(PAD + indent, target, base2 - 0.73 * S2, base2, S2 / 44)}</g>` : ''}
<rect width="${vbW}" height="${vbH}" fill="url(#spec)" clip-path="url(#letters)"/>
${opts.electric ? `<rect width="${vbW}" height="${vbH}" fill="url(#charge)" clip-path="url(#word2)"/>
${electricLayer(PAD + indent, target, base2 - 0.73 * S2, base2)}` : ''}
</svg>`;
  fs.writeFileSync(`${OUT}/${file}`, svg.replace(/\n\s*/g, ' ').replace(/> </g, '><').trim() + '\n');
  console.log(file, `${vbW}x${vbH}`);
}

/* ── Lockup de uma linha: duas palavras, dois acabamentos ──────────── */
function lockup(file, wordA, wordB, finA, finB) {
  const S = 100, PAD = 8, EX = 3, GAP = 26;
  const wa = word(f800, wordA, S, PAD, 100);
  const wb = word(f800, wordB, S, PAD + wa.width + GAP, 100);
  const vbW = Math.round(wa.width + GAP + wb.width + PAD * 2 + EX), vbH = 118;
  const ga = FIN[finA].grad('ga', 26, 102), gb = FIN[finB].grad('gb', 26, 102);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" role="img" aria-label="${wordA} ${wordB}">
<defs>${ga}${gb}
  <linearGradient id="spec" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${vbW}" y2="${vbH}">
    <stop offset=".30" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".46" stop-color="#fff" stop-opacity=".32"/>
    <stop offset=".52" stop-color="#fff" stop-opacity=".08"/>
    <stop offset=".62" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <clipPath id="letters"><path d="${wa.d}"/><path d="${wb.d}"/></clipPath>
  <filter id="ds" x="-8%" y="-14%" width="116%" height="134%">
    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".55"/>
  </filter>
</defs>
<g filter="url(#ds)">
  <path d="${wa.d}" transform="translate(${EX},${EX})" fill="${FIN[finA].extrude}"/>
  <path d="${wb.d}" transform="translate(${EX},${EX})" fill="${FIN[finB].extrude}"/>
  <path d="${wa.d}" fill="url(#ga)" stroke="${FIN[finA].stroke}" stroke-width="1.6"/>
  <path d="${wb.d}" fill="url(#gb)" stroke="${FIN[finB].stroke}" stroke-width="1.6"/>
</g>
<rect width="${vbW}" height="${vbH}" fill="url(#spec)" clip-path="url(#letters)"/>
</svg>`;
  fs.writeFileSync(`${OUT}/${file}`, svg.replace(/\n\s*/g, ' ').replace(/> </g, '><').trim() + '\n');
  console.log(file, `${vbW}x${vbH}`);
}

/* ── Emblem: riveted gunmetal plate + ember H ──────────────────────── */
function emblem(file) {
  const S = 60;
  const hw = naturalWidth(f800, 'H', S);
  const h = word(f800, 'H', S, (96 - hw) / 2, 69);
  const rivet = (x, y) => `<circle cx="${x}" cy="${y}" r="3.2" fill="url(#riv)"/>
    <path d="M ${x - 2.2} ${y + 1.6} L ${x + 2.2} ${y - 1.6}" stroke="#0a0b0d" stroke-width="1.1"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Hangar Network">
<defs>
  <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#34383e"/><stop offset=".55" stop-color="#22252a"/>
    <stop offset="1" stop-color="#191b1f"/>
  </linearGradient>
  ${FIN.ember.grad('hg', 25, 71)}
  <radialGradient id="riv" cx=".32" cy=".28" r="1">
    <stop offset="0" stop-color="#8a9099"/><stop offset=".52" stop-color="#3c4046"/>
    <stop offset="1" stop-color="#0e0f11"/>
  </radialGradient>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="7"/>
  </filter>
</defs>
<rect x="1.5" y="1.5" width="93" height="93" rx="16" fill="url(#plate)" stroke="#000" stroke-width="1.6"/>
<rect x="3.6" y="3.6" width="88.8" height="88.8" rx="14" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width="1.2"/>
<ellipse cx="48" cy="62" rx="26" ry="12" fill="#ff8000" opacity=".38" filter="url(#glow)"/>
${rivet(12, 12)}${rivet(84, 12)}${rivet(12, 84)}${rivet(84, 84)}
<path d="${h.d}" transform="translate(1.6,1.6)" fill="#1a0c02"/>
<path d="${h.d}" fill="url(#hg)" stroke="#2c1403" stroke-width="1.4"/>
</svg>`;
  fs.writeFileSync(`${OUT}/${file}`, svg.replace(/\n\s*/g, ' ').replace(/> </g, '><').trim() + '\n');
  console.log(file, '96x96');
}

/* Family system: HANGAR always chrome (2005), sector word always ember
   (2004) — the fusion IS the brand story. Plus the two heritage tributes. */
wordmark('hangar-network.svg', 'HANGAR', 'NETWORK', 'chrome', 'ember');
/* hangar-network-electric.svg é ANIMADO e mantido À MÃO (CSS keyframes
   embutidos, autoria 2026-07-04) — NÃO regenerar por aqui, ou a animação
   será perdida. A camada elétrica estática (opts.electric) fica disponível
   para outros usos. */
wordmark('hangar-network-ember.svg', 'HANGAR', 'NETWORK', 'ember', 'ember');
wordmark('hangar-network-chrome.svg', 'HANGAR', 'NETWORK', 'chrome', 'chrome');
/* Setores na cor da própria marca: sites = ouro (prosperidade),
   cloud = aço-azul (confiança/sistema), games = brasa (herança),
   tv = violeta-fósforo (a luz da tela ligada). */
wordmark('hangar-sites.svg', 'HANGAR', 'SITES', 'chrome', 'gold');
wordmark('hangar-cloud.svg', 'HANGAR', 'CLOUD', 'chrome', 'steel');
wordmark('hangar-games.svg', 'HANGAR', 'GAMES', 'chrome', 'ember');
lockup('hnet-tv.svg', 'HNET', 'TV', 'chrome', 'phosphor');
/* HCA — a arena: vermelho de guerra, furos de bala. Original desde 1999. */
wordmark('hca.svg', 'HANGAR', 'COMBAT ARENA', 'chrome', 'war', { holes: true });
emblem('hangar-emblem.svg');
