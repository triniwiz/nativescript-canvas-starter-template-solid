import { createSignal, Index } from 'solid-js';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { flowField, type FlowField, type FlowPalette } from './flow-field';
import { clock } from './clock';
import { liveChart, type ChartSeries } from './live-chart';

const palettes: { label: string; value: FlowPalette }[] = [
  { label: 'Aurora', value: 'aurora' },
  { label: 'Ember', value: 'ember' },
  { label: 'Ocean', value: 'ocean' },
];

export function Canvas2DDemo() {
  const [palette, setPalette] = createSignal<FlowPalette>('aurora');
  const [series, setSeries] = createSignal<ChartSeries[]>([]);
  let field: FlowField | undefined;

  // A component runs once, so each demo is created once too.
  const flowDemo = flowField({ palette: palette() });
  const clockDemo = clock();
  const chartDemo = liveChart({ onSample: setSeries });

  function choosePalette(value: FlowPalette) {
    setPalette(value);
    field?.setPalette(value);
  }

  return (
    <DemoPage
      eyebrow="Canvas 2D"
      title="Paths, gradients & text"
      description="The web's CanvasRenderingContext2D, drawn natively with Skia. Every frame below is plain ctx.* calls."
    >
      <section class="card flex flex-col gap-4">
        <div class="flex flex-row flex-wrap items-center justify-between gap-3">
          <div class="flex flex-col gap-1">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Flow field</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Thousands of particle trails, additive blending. Drag to stir.
            </p>
          </div>
          <button
            class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            on:tap={() => field?.clear()}
          >
            Clear
          </button>
        </div>
        <CanvasView
          demo={flowDemo}
          height={380}
          class="w-full rounded-2xl"
          onStarted={(instance) => (field = instance)}
        >
          <span class="absolute left-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            globalCompositeOperation = 'lighter'
          </span>
        </CanvasView>
        <Segmented options={palettes} value={palette()} onChange={choosePalette} />
      </section>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(300,1fr))] gap-6">
        <section class="card flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Clock</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              save/restore, rotate, arcs, radial gradients, shadows and fillText.
            </p>
          </div>
          <CanvasView demo={clockDemo} height={320} class="w-full rounded-2xl" />
        </section>

        <section class="card flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Live chart</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Streaming curves drawn on canvas; the legend is MasonKit, fed by the same data.
            </p>
          </div>
          <CanvasView demo={chartDemo} height={240} class="w-full rounded-2xl" />
          <div class="flex flex-row flex-wrap gap-3">
            {/* Index keeps each row and updates it in place: every sample is a new array. */}
            <Index each={series()}>
              {(s) => (
                <div class="flex flex-1 basis-24 flex-row items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800">
                  <div class="size-3 rounded-full" style={{ 'background-color': s().color }} />
                  <span class="flex-1 text-sm text-slate-600 dark:text-slate-300">{s().name}</span>
                  <span class="text-sm font-bold text-slate-900 dark:text-white">{Math.round(s().value)}</span>
                </div>
              )}
            </Index>
          </div>
        </section>
      </div>
    </DemoPage>
  );
}
