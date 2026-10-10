import { fileURLToPath } from 'node:url';

/**
 * @returns {import('vite').Plugin[]}
 */
export function nativescriptSolid() {
  return [keepBrowserGlobals()];
}

/**
 * Keeps @nativescript-community/solid-js from replacing browser globals.
 *
 * The renderer's `src/dom.js` calls DOMiNATIVE's `globalRegister(globalThis)`,
 * which copies every element class onto globalThis: `Image`, `document`,
 * `Document`, `SVGElement`, `Event`, `EventTarget`, `HTMLElement`, `Frame`, ...
 * That replaces the canvas polyfill's classes, which three.js and PixiJS rely
 * on, and the iOS runtime's own `Event` and `EventTarget`.
 *
 * This swaps that import in `src/renderer.js` for src/solid-dom.ts, which
 * keeps the rest of what it does, and gives the renderer DOMiNATIVE's
 * `document`: it calls `document.createElement` on the global, which is the
 * polyfill's once DOMiNATIVE no longer registers its own.
 *
 * @returns {import('vite').Plugin}
 */
function keepBrowserGlobals() {
  const RENDERER = /[\\/]node_modules[\\/]@nativescript-community[\\/]solid-js[\\/]src[\\/]renderer\.js$/;
  const DOM_IMPORT = /import\s+['"]\.\/dom\.js['"];?/;
  const replacement = fileURLToPath(new URL('./src/solid-dom.ts', import.meta.url)).replace(/\\/g, '/');

  return {
    name: 'nativescript-solid-keep-browser-globals',
    enforce: 'pre',
    transform(code, id) {
      if (!RENDERER.test(id.split('?')[0])) {
        return null;
      }
      if (!DOM_IMPORT.test(code)) {
        this.error(`Expected ${id} to import './dom.js'. Has @nativescript-community/solid-js changed?`);
      }
      return {
        code: code.replace(
          DOM_IMPORT,
          `import { document } from 'dominative';\nimport ${JSON.stringify(replacement)};`,
        ),
        map: null,
      };
    },
  };
}
