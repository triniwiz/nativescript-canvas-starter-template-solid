import { createMemo, createSignal, Show } from 'solid-js';
import { formatCount } from '../../format';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import type { Demo } from '../../canvas/runner';
import { pixiCritters, type PixiBackend, type PixiCritters, type PixiStats } from './critters';

const backends: { label: string; value: PixiBackend }[] = [
  { label: 'WebGL', value: 'webgl' },
  { label: 'WebGPU', value: 'webgpu' },
];

const pill = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';

export function PixiDemo() {
  const [backend, setBackend] = createSignal<PixiBackend>('webgl');
  const [stats, setStats] = createSignal<PixiStats>({ sprites: 0, fps: 0, renderer: '' });
  let critters: PixiCritters | undefined;

  const demo = createMemo(() => pixiCritters({ backend: backend(), onStats: setStats }));

  return (
    <DemoPage
      fill={620}
      eyebrow="PixiJS"
      title="Sprite party"
      description="PixiJS v8 through @nativescript/canvas-pixi: textures generated from vector Graphics, a parallax starfield and a bunnymark of bouncing sprites. Tap the canvas for a burst."
    >
      <section class="card flex flex-1 flex-col gap-4">
        {/* PixiJS picks its renderer at init, so `keyed` mounts a fresh canvas
            for each backend. */}
        <Show when={demo()} keyed>
          {(demo: Demo<PixiCritters>) => (
            <CanvasView
              demo={demo}
              class="min-h-[240] w-full flex-1 rounded-2xl"
              onStarted={(instance) => (critters = instance)}
            >
              <div class="absolute left-3 top-3 flex flex-row flex-wrap gap-2">
                <span class={pill}>{stats().renderer || '…'}</span>
                <span class={pill}>{`${formatCount(stats().sprites)} sprites`}</span>
                <span class={pill}>{`${stats().fps} fps`}</span>
              </div>
            </CanvasView>
          )}
        </Show>
        <div class="flex flex-row flex-wrap items-center justify-between gap-3">
          <Segmented options={backends} value={backend()} onChange={setBackend} />
          <div class="flex flex-row flex-wrap gap-2">
            <button
              class="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              on:tap={() => critters?.add(100)}
            >
              +100
            </button>
            <button
              class="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              on:tap={() => critters?.add(1000)}
            >
              +1000
            </button>
            <button
              class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              on:tap={() => critters?.clear()}
            >
              Clear
            </button>
          </div>
        </div>
      </section>
    </DemoPage>
  );
}
