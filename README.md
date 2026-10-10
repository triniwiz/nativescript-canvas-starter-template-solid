# NativeScript Canvas Starter (Solid)

A SolidJS starter for Windows, iOS and Android that draws with
[`@nativescript/canvas`](https://github.com/NativeScript/canvas): Canvas 2D,
WebGL, WebGPU and SVG, with three.js and PixiJS on top. Layout uses
[MasonKit](https://github.com/triniwiz/nativescript-mason), and styling uses
Tailwind CSS v4. Solid renders through
[`@nativescript-community/solid-js`](https://github.com/nativescript-community/solid-js)
into a [DOMiNATIVE](https://github.com/SudoMaker/DOMiNATIVE) DOM, so you write
ordinary Solid JSX: `<div class="flex gap-4">`, `<canvas />`, `<svg src={…} />`.

This is the Solid version of
[nativescript-canvas-starter-template](https://github.com/triniwiz/nativescript-canvas-starter-template)
(NativeScript-Vue) and
[nativescript-canvas-starter-template-react](https://github.com/triniwiz/nativescript-canvas-starter-template-react).
The demos are the same.

## Prerequisites

> NativeScript for Windows is in alpha. Expect rough edges.

To run on Windows you need the following. `npx ns doctor windows` checks them.

| Requirement | Notes |
| --- | --- |
| Windows 10 1809 (build 17763) or later | The app targets `net10.0-windows10.0.26100.0`, with a minimum of `10.0.17763.0`. |
| [Node.js](https://nodejs.org) LTS | Provides `npm` and `npx`. |
| [.NET 10 SDK](https://dotnet.microsoft.com/download) | The build runs `dotnet build`. Check it with `dotnet --version`. |
| Developer Mode | Settings → Privacy & security → For developers. Windows needs it to install and launch the unsigned debug build. |

For iOS and Android, follow the [NativeScript environment setup](https://docs.nativescript.org/setup/).

You don't need to install the NativeScript CLI globally. It's a dev dependency, and the npm scripts run it.

## Getting started

```bash
git clone https://github.com/triniwiz/nativescript-canvas-starter-template-solid my-app
cd my-app
npm install
npm run windows   # or: npm run ios / npm run android
```

`npm run windows` builds the app, installs and launches it, then rebuilds and
restarts it as you save. `npm run clean` removes the build output, and
`npm run typecheck` runs `tsc`.

Use npm. `package.json` relies on npm `overrides`.

## Demos

The home screen links to one page per renderer. Each page has its own folder in
`src/demos/`, holding the page (`*.tsx`) and its drawing code (`*.ts`):

| Page | Folder | What it shows |
| --- | --- | --- |
| Canvas 2D | `canvas2d/` | Flow-field particles, an analog clock and a live chart |
| WebGL | `webgl/` | GLSL fragment shaders |
| WebGPU | `webgpu/` | A WGSL compute shader simulating boids |
| three.js | `three/` | PBR materials and an instanced galaxy |
| PixiJS | `pixi/` | Sprites on WebGL or WebGPU |
| SVG | `svg/` | Animated SVG, and SVG generated from a signal |
| Offscreen & Workers | `offscreen/` | `OffscreenCanvas` sprites, and a canvas drawn by a Worker next to one drawn on the main thread |
| Mix & match | `mix/` | All of the above in one Tailwind grid |
| Layout playground | `playground/` | Flexbox and Grid with MasonKit |

The home screen's hero puts an animated Solid logo (`solidLogo` in
`src/demos/svg/art.ts`) over a live Canvas 2D flow field. It's SVG with SMIL
animation: the logo's layers rise one after another, so a ripple runs down
the stack.

## Project layout

| Path | What it's for |
| --- | --- |
| `src/app.tsx` | App entry. Sets up the DOM, then starts Solid with the home screen. |
| `src/dom.ts` | Loads the browser polyfills and Solid's DOM, and registers MasonKit's elements, `<canvas>` and `<svg>`. |
| `solid-workarounds.mjs`, `src/solid-dom.ts` | Keep the Solid renderer from replacing the canvas polyfill's globals (see [Temporary workarounds](#temporary-workarounds)). |
| `src/navigation.tsx` | `navigate(Screen)` and `goBack()`. Each screen is its own Solid root on a NativeScript `Page`. |
| `src/demos/<renderer>/` | One folder per demo page (see [Demos](#demos)). The `.ts` files are the drawing code. They don't depend on Solid, so you can copy one into any app. |
| `src/canvas/runner.ts` | Runs a demo on a canvas: sizing, the `requestAnimationFrame` loop and pointer input. |
| `src/canvas/worker-host.ts`, `src/canvas/worker-demo.ts` | Run a demo in a Worker: `runInWorker` hands a canvas over with `transferControlToOffscreen()`, and `serveDemo` draws into it on the Worker's side. |
| `src/components/CanvasView.tsx` | `<canvas>` wrapped for Solid. Its children are layered over the canvas. |
| `src/components/` | Also the home screen and the pieces the demo pages share. |
| `src/app.css` | Tailwind, plus the `dark:`, `ios:`, `android:`, `windows:`, `phone:` and `tablet:` variants. |
| `types/jsx.d.ts` | JSX typings for what NativeScript adds to Solid's DOM ones: `on:tap`, `on:loaded` and other NativeScript events, `src` on `<svg>`, and `<scroll>`. |
| `postcss-masonkit.mjs` | Keeps the Tailwind layout utilities (`flex`, `grid`, `gap-*`, `max-w-*`, `absolute`, ...) that NativeScript's Tailwind plugin would otherwise remove. |

## Tips

- **JSX:** write HTML-style tags in lowercase: `<div>`, `<section>`, `<h1>`,
  `<p>`, `<span>`, `<button>`, `<scroll>`, `<canvas>`, `<svg>`. Use `class`.
- **Events:** use Solid's `on:` namespace with the NativeScript event name:
  `on:tap={…}`, `on:loaded={…}`. `onClick` and other `on<Event>` props don't
  work. Event names are case sensitive, events don't bubble, and there is no
  delegation. `types/jsx.d.ts` lists the events JSX knows about; add others
  to `CustomEvents` there.
- **Styles:** a `style` object uses CSS property names, as elsewhere in
  Solid: `style={{ 'background-color': color }}`. Lengths are strings, so
  write `{ height: dp(400) }` (`dp` is in `src/format.ts`) or `'100%'`.
- **Navigation:** `navigate(Screen)` pushes a page and `goBack()` pops it.
  A screen's root is disposed when you navigate back from it, so `onCleanup`
  runs then. Inside a screen, `usePage()` returns its `Page`.
- **Sizing a canvas:** give `<canvas>` its size with an inline `style`, not
  classes. `CanvasView` does this for you: pass `height` for a fixed height,
  or leave it out and size its box with classes such as `flex-1`. The
  single-canvas demos use `<DemoPage fill={…}>`, so the canvas takes the
  window height left over and the page only scrolls in short windows. As on
  the web, `canvas.width` and `canvas.height` set the backing store; `runDemo`
  sets them for you.
- **Demo instances:** a Solid component runs once, so create a demo in its
  body: `const demo = clock()`. When it depends on a signal, use
  `createMemo`, and render the `CanvasView` inside `<Show when={demo()} keyed>`
  so each new demo gets a fresh canvas, as the PixiJS and WebGPU pages do.
- **Lists:** `<For>` keeps a row per item. When every update is a new array
  of new objects, as with the live chart's samples, `<Index>` keeps a row per
  position and updates it in place.
- **Workers:** create one with `new Worker(new URL('./x.worker.ts', import.meta.url))`
  so the bundler builds it, and import `@nativescript/canvas/worker` first in
  its entry file. Where the runtime supports transfers (Windows), the
  OffscreenCanvas moves with `postMessage(…, [offscreen])`; on Android and iOS
  it is sent with `OffscreenCanvas._toHandle()` and received with
  `OffscreenCanvas._fromHandle()`. `runInWorker` picks the right one.
- **Opaque 2D canvases** (`getContext('2d', { alpha: false })`) are faster
  when you paint the whole frame anyway.
- **Typings:** on Windows `getContext()` returns a union, so cast the result,
  for example `canvas.getContext('2d') as CanvasRenderingContext2D`. With
  TypeScript 6, `<Show>`'s render callback isn't inferred: give its parameter
  a type, or read the signal inside plain children instead.
- **Responsive layouts:** there are no `sm:` or `md:` breakpoints. Use layouts
  that fit the space they're given, like
  `grid-cols-[repeat(auto-fill,minmax(240,1fr))]` or `flex-wrap` with
  `basis-*`.
- **Units:** unitless values are dp, and `px` means physical pixels.
- **Avoid** `tracking-*`, `leading-*` and `bg-linear-*`. For gradients, write
  a `@utility` instead, like `bg-hero` in `src/app.css`.

## Known issues

- HMR is off: the npm scripts pass `--no-hmr`, so a save rebuilds the bundle
  and restarts the app. HMR hasn't been tried with this starter yet.
  `src/app.tsx` boots through `startSolidApp`, which remounts the app on HMR
  updates, so turning it on should only need the flag removed.
- In the iOS Simulator, WebGL is software rendered, so the three.js and
  Mix & match pages take several seconds to appear. Devices don't have this
  problem.
- On Windows, `Number.prototype.toLocaleString()` throws, so the demos format
  numbers with `formatCount` from `src/format.ts`.

## Troubleshooting

- **Something's missing from your setup:** `npx ns doctor windows` lists what it can't find and how to fix it.
- **The app builds but won't launch** ("deployment failed"): turn on Developer Mode.
- **A stale or broken build:** run `npm run clean`, then `npm run windows` again.

## Temporary workarounds

These can be removed once the fixes are released:

- `@nativescript/core` and `@nativescript/vite` are installed from a pkg.pr.new
  build (`c136c4b`) of [NativeScript/NativeScript](https://github.com/NativeScript/NativeScript).
- `overrides` pins the `@nativescript/canvas*` packages to `3.0.0-beta.4`.
  They depend on each other with `"*"`, which doesn't match prereleases.
- `solid-workarounds.mjs` swaps the Solid renderer's `src/dom.js` import for
  `src/solid-dom.ts`. The original copies every DOMiNATIVE class onto
  `globalThis` (`Image`, `document`, `Event`, `HTMLElement`, ...), replacing
  the canvas polyfill's classes, which PixiJS and three.js use, and the iOS
  runtime's `Event` and `EventTarget`. Because the renderer creates elements
  with the global `document`, the plugin also imports DOMiNATIVE's `document`
  into it.
- `canvas-workarounds.mjs` makes the canvas package's `./platform` import
  resolve to `platform.js` rather than the `platform/` folder
  ([#11464](https://github.com/NativeScript/NativeScript/pull/11464)).
  Its `threeAddons()` keeps three.js addons out of Vite's pre-bundling,
  because HMR requests them at the wrong URL
  ([#11466](https://github.com/NativeScript/NativeScript/pull/11466)). During
  HMR it also points PixiJS's dynamic imports at its ES modules instead of its
  CommonJS files, which would load a second copy of PixiJS.
- `masonkit-hmr.mjs` stops MasonKit from loading twice during HMR. It, and the
  HMR parts of `canvas-workarounds.mjs`, only run on the dev server, so they do
  nothing until HMR is back on.
- `postcss-selector-commas.mjs` makes classes with a comma, like
  `grid-cols-[repeat(auto-fill,minmax(240,1fr))]`, match
  ([#11463](https://github.com/NativeScript/NativeScript/pull/11463)).
