/**
 * Inline SVG for <svg src="...">. @nativescript/canvas-svg renders these
 * natively with Skia, SMIL animations included.
 *
 * Each document states its size in dp, and the <svg> showing it gets the same
 * size. Percentage sizes resolve against the view's laid-out size, which
 * Windows doesn't report for views inside a MasonKit layout.
 */

/** Size of the gallery tiles, the gauge and the card icons, in dp. */
export const TILE_SIZE = 120;
export const GAUGE_SIZE = 176;
export const ICON_SIZE = 48;

const svg = (body: string, viewBox = '0 0 200 200', size = TILE_SIZE) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${body}</svg>`;

export const orbits = svg(`
  <defs>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="60%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="34" fill="url(#sun)"/>
  <circle cx="100" cy="100" r="16" fill="#fbbf24"/>
  <g fill="none" stroke="#334155" stroke-width="1">
    <circle cx="100" cy="100" r="46"/>
    <circle cx="100" cy="100" r="66"/>
    <circle cx="100" cy="100" r="88"/>
  </g>
  <g>
    <circle cx="146" cy="100" r="6" fill="#22d3ee"/>
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="3s" repeatCount="indefinite"/>
  </g>
  <g>
    <circle cx="100" cy="34" r="9" fill="#a78bfa"/>
    <circle cx="116" cy="34" r="3" fill="#e2e8f0"/>
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="6s" repeatCount="indefinite"/>
  </g>
  <g>
    <circle cx="12" cy="100" r="7" fill="#f472b6"/>
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="-360 100 100" dur="11s" repeatCount="indefinite"/>
  </g>
`);

export const equalizer = svg(
  [0, 1, 2, 3, 4, 5, 6]
    .map((i) => {
      const x = 22 + i * 24;
      const colors = ['#818cf8', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#fb923c'];
      const dur = (0.7 + ((i * 37) % 5) * 0.12).toFixed(2);
      return `
    <rect x="${x}" y="60" width="14" height="80" rx="7" fill="${colors[i]}">
      <animate attributeName="height" values="30;130;50;100;30" dur="${dur}s" repeatCount="indefinite"/>
      <animate attributeName="y" values="85;35;75;50;85" dur="${dur}s" repeatCount="indefinite"/>
    </rect>`;
    })
    .join(''),
);

export const pulse = svg(`
  ${[0, 1, 2]
    .map(
      (i) => `
  <circle cx="100" cy="100" r="20" fill="none" stroke="#22d3ee" stroke-width="3">
    <animate attributeName="r" from="20" to="92" dur="2.4s" begin="${i * 0.8}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" begin="${i * 0.8}s" repeatCount="indefinite"/>
  </circle>`,
    )
    .join('')}
  <circle cx="100" cy="100" r="22" fill="#0891b2"/>
  <path d="M88 100 l8 8 l16 -18" fill="none" stroke="#ecfeff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
`);

export const signature = svg(`
  <defs>
    <linearGradient id="ink" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <path d="M20 130 C 40 40, 70 40, 70 110 S 100 170, 120 90 S 160 30, 180 120"
        fill="none" stroke="url(#ink)" stroke-width="8" stroke-linecap="round"
        stroke-dasharray="420" stroke-dashoffset="420">
    <animate attributeName="stroke-dashoffset" values="420;0;0;420" keyTimes="0;0.45;0.8;1" dur="4s" repeatCount="indefinite"/>
  </path>
  <circle r="7" fill="#f0abfc">
    <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1;0" keyTimes="0;0.45;0.8;1" calcMode="linear"
                   path="M20 130 C 40 40, 70 40, 70 110 S 100 170, 120 90 S 160 30, 180 120"/>
  </circle>
`);

export const blob = svg(`
  <defs>
    <linearGradient id="blob" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <path fill="url(#blob)">
    <animate attributeName="d" dur="6s" repeatCount="indefinite"
      values="M100 30 C140 30 170 60 170 100 C170 140 140 170 100 170 C60 170 30 140 30 100 C30 60 60 30 100 30 Z;
              M100 20 C150 40 160 70 175 105 C160 150 130 160 95 175 C55 160 40 130 25 95 C45 50 70 30 100 20 Z;
              M100 40 C130 25 180 55 160 100 C175 150 120 180 100 160 C70 185 20 140 45 100 C25 60 75 50 100 40 Z;
              M100 30 C140 30 170 60 170 100 C170 140 140 170 100 170 C60 170 30 140 30 100 C30 60 60 30 100 30 Z"/>
  </path>
  <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="18s" repeatCount="indefinite"/>
`);

export const spinner = svg(`
  <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" stroke-width="14"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="#f472b6" stroke-width="14" stroke-linecap="round"
          stroke-dasharray="90 290">
    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="1.1s" repeatCount="indefinite"/>
    <animate attributeName="stroke-dasharray" values="20 357;200 177;20 357" dur="2.2s" repeatCount="indefinite"/>
  </circle>
`);

export const gallery = [
  { title: 'Orbits', body: 'animateTransform rotations on groups', src: orbits },
  { title: 'Equalizer', body: 'animate on height and y', src: equalizer },
  { title: 'Pulse', body: 'staggered begin times', src: pulse },
  { title: 'Signature', body: 'dash offset + animateMotion', src: signature },
  { title: 'Morph', body: 'path d interpolation', src: blob },
  { title: 'Spinner', body: 'dasharray and rotation', src: spinner },
];

/** A ring gauge; the markup is rebuilt whenever the `value` it reads changes. */
export function gauge(value: number, label: string) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const hue = 190 + (clamped / 100) * 130;
  return svg(`
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue - 40}, 90%, 60%)"/>
        <stop offset="100%" stop-color="hsl(${hue}, 90%, 62%)"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="${r}" fill="none" stroke="#1e293b" stroke-width="18"/>
    <circle cx="100" cy="100" r="${r}" fill="none" stroke="url(#g)" stroke-width="18" stroke-linecap="round"
            stroke-dasharray="${(circumference * clamped) / 100} ${circumference}" transform="rotate(-90 100 100)"/>
    <text x="100" y="108" text-anchor="middle" font-size="34" font-weight="700" fill="#f8fafc" font-family="sans-serif">${Math.round(clamped)}%</text>
    <text x="100" y="134" text-anchor="middle" font-size="13" fill="#94a3b8" font-family="sans-serif">${label}</text>
  `, undefined, GAUGE_SIZE);
}

/**
 * Solid's logo, its four layers bobbing one after another so a ripple runs
 * down the stack, like a signal propagating through its dependents, while a
 * sheen sweeps the top slab.
 */
export function solidLogo(size: number) {
  // Each layer rises and settles on an ease-out curve, starting a beat after
  // the one above it.
  const bob = (delay: number) =>
    `<animateTransform attributeName="transform" type="translate" values="0 0; 0 -9; 0 0; 0 0"
       keyTimes="0; 0.25; 0.6; 1" calcMode="spline" keySplines="0.3 0 0.2 1; 0.4 0 0.2 1; 0 0 1 1"
       dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>`;
  return svg(
    `<defs>
      <linearGradient id="sheen" gradientUnits="userSpaceOnUse" x1="27.5" y1="3" x2="152" y2="63.5">
        <stop offset="0.1" stop-color="#76b3e1"/>
        <stop offset="0.3" stop-color="#dcf2fd"/>
        <stop offset="1" stop-color="#76b3e1"/>
      </linearGradient>
      <linearGradient id="upper" gradientUnits="userSpaceOnUse" x1="95.8" y1="32.6" x2="74" y2="105.2">
        <stop offset="0" stop-color="#76b3e1"/>
        <stop offset="0.5" stop-color="#4377bb"/>
        <stop offset="1" stop-color="#1f3b77"/>
      </linearGradient>
      <linearGradient id="slab" gradientUnits="userSpaceOnUse" x1="18.4" y1="64.2" x2="144.3" y2="149.8">
        <stop offset="0" stop-color="#315aa9"/>
        <stop offset="0.5" stop-color="#518ac8"/>
        <stop offset="1" stop-color="#315aa9"/>
      </linearGradient>
      <linearGradient id="lower" gradientUnits="userSpaceOnUse" x1="75.2" y1="74.5" x2="24.4" y2="260.8">
        <stop offset="0" stop-color="#4377bb"/>
        <stop offset="0.5" stop-color="#1a336b"/>
        <stop offset="1" stop-color="#1a336b"/>
      </linearGradient>
    </defs>
    <g>
      <path d="M163 35 S110 -4 69 5 l-3 1 c-6 2 -11 5 -14 9 l-2 3 l-15 26 l26 5 c11 7 25 10 38 7 l46 9 l18 -30 z" fill="#76b3e1"/>
      <path d="M163 35 S110 -4 69 5 l-3 1 c-6 2 -11 5 -14 9 l-2 3 l-15 26 l26 5 c11 7 25 10 38 7 l46 9 l18 -30 z" fill="url(#sheen)" opacity="0.3">
        <animate attributeName="opacity" values="0.3; 0.9; 0.3" dur="2.8s" repeatCount="indefinite"/>
      </path>
      ${bob(0)}
    </g>
    <g>
      <path d="M52 35 l-4 1 c-17 5 -22 21 -13 35 c10 13 31 20 48 15 l62 -21 S92 26 52 35 z" fill="#518ac8"/>
      <path d="M52 35 l-4 1 c-17 5 -22 21 -13 35 c10 13 31 20 48 15 l62 -21 S92 26 52 35 z" fill="url(#upper)" opacity="0.3"/>
      ${bob(0.15)}
    </g>
    <g>
      <path d="M134 80 a45 45 0 0 0 -48 -15 L24 85 L4 120 l112 19 l20 -36 c4 -7 3 -15 -2 -23 z" fill="url(#slab)"/>
      ${bob(0.3)}
    </g>
    <g>
      <path d="M114 115 a45 45 0 0 0 -48 -15 L4 120 s53 40 94 30 l3 -1 c17 -5 23 -21 13 -34 z" fill="url(#lower)"/>
      ${bob(0.45)}
    </g>`,
    // Square, with headroom for the bob.
    '-5 -14 176 176',
    size,
  );
}

/** Small glyphs for the home screen cards. */
export const icons = {
  canvas2d: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#6366f1"/>
     <path d="M12 32 L20 20 L27 28 L31 23 L37 32 Z" fill="#e0e7ff"/>
     <circle cx="31" cy="15" r="4" fill="#fde68a"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  webgl: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#db2777"/>
     <path d="M24 11 L37 34 H11 Z" fill="none" stroke="#fce7f3" stroke-width="3" stroke-linejoin="round"/>
     <circle cx="24" cy="26" r="4" fill="#fce7f3"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  webgpu: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#0891b2"/>
     <g fill="#cffafe"><rect x="13" y="13" width="9" height="9" rx="2"/><rect x="26" y="13" width="9" height="9" rx="2"/>
     <rect x="13" y="26" width="9" height="9" rx="2"/><rect x="26" y="26" width="9" height="9" rx="2" opacity="0.5"/></g>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  three: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#7c3aed"/>
     <path d="M24 11 L36 18 V31 L24 38 L12 31 V18 Z" fill="none" stroke="#ede9fe" stroke-width="2.5" stroke-linejoin="round"/>
     <path d="M12 18 L24 25 L36 18 M24 25 V38" fill="none" stroke="#ede9fe" stroke-width="2.5" stroke-linejoin="round"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  pixi: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#e11d48"/>
     <path d="M24 12 L27 21 L36 21 L29 27 L32 36 L24 30 L16 36 L19 27 L12 21 L21 21 Z" fill="#ffe4e6"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  svg: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#059669"/>
     <path d="M12 30 C 16 14, 24 14, 24 24 S 32 34, 36 18" fill="none" stroke="#d1fae5" stroke-width="3" stroke-linecap="round"/>
     <circle cx="12" cy="30" r="3" fill="#d1fae5"/><circle cx="36" cy="18" r="3" fill="#d1fae5"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  offscreen: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#2563eb"/>
     <rect x="11" y="12" width="17" height="13" rx="2.5" fill="none" stroke="#dbeafe" stroke-width="2.5"/>
     <rect x="20" y="23" width="17" height="13" rx="2.5" fill="#dbeafe"/>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  mix: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#d97706"/>
     <g fill="#fef3c7"><rect x="11" y="11" width="12" height="16" rx="3"/><rect x="25" y="11" width="12" height="8" rx="3"/>
     <rect x="25" y="21" width="12" height="16" rx="3"/><rect x="11" y="29" width="12" height="8" rx="3"/></g>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
  layout: svg(
    `<rect x="4" y="4" width="40" height="40" rx="10" fill="#475569"/>
     <g fill="none" stroke="#f1f5f9" stroke-width="2.5"><rect x="12" y="12" width="24" height="24" rx="3"/>
     <path d="M12 21 H36 M22 21 V36"/></g>`,
    '0 0 48 48',
    ICON_SIZE,
  ),
};
