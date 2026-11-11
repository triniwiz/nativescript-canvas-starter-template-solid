import { defineConfig, mergeConfig } from 'vite';
import { solidConfig } from '@nativescript/vite/solid';
import { protect, restore } from './postcss-masonkit.mjs';
import { dynamicImportsToEsm } from './canvas-workarounds.mjs';
import { nativescriptSolid } from './solid-workarounds.mjs';

export default defineConfig(({ mode }) =>
  mergeConfig(solidConfig({ mode }), {
    plugins: [...nativescriptSolid(), dynamicImportsToEsm()],
    optimizeDeps: {
      exclude: [
        // Served as is, so nativescriptSolid() can patch its renderer.
        '@nativescript-community/solid-js',
        // MasonKit must load as a single instance over the HMR server. If Vite
        // pre-bundles a subpath (e.g. `/elements`), that copy is routed to the
        // vendor bundle, where MasonKit is deliberately absent, and its exports
        // come back undefined.
        '@triniwiz/nativescript-masonkit',
        '@triniwiz/nativescript-masonkit/web',
        '@triniwiz/nativescript-masonkit/elements',
      ],
    },
    css: {
      postcss: {
        // Lets Tailwind layout utilities (flex, grid, gap, max-w, ...) reach
        // MasonKit views instead of being stripped for core layouts.
        plugins: [protect(), restore()],
      },
    },
  }),
);
