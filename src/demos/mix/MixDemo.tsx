import { createSignal, For } from 'solid-js';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { shaderGallery } from '../webgl/shaders';
import { liveChart, type ChartSeries } from '../canvas2d/live-chart';
import { threeGalaxy } from '../three/galaxy';
import { gauge, icons } from '../svg/art';

const KPIS = [
  { key: 'fps', label: 'Frame time', unit: 'ms', factor: 0.25 },
  { key: 'gpu', label: 'GPU load', unit: '%', factor: 1 },
  { key: 'mem', label: 'Texture memory', unit: 'MB', factor: 4.2 },
];

const activity = [
  { icon: icons.webgpu, title: 'Compute pass', body: 'boids · 2,048 invocations', time: 'now' },
  { icon: icons.three, title: 'Scene graph', body: 'InstancedMesh · 300 cubes', time: '2s' },
  { icon: icons.canvas2d, title: 'Canvas 2D', body: '3 sparklines redrawn', time: '4s' },
  { icon: icons.svg, title: 'SVG', body: 'gauge re-rendered from a signal', time: '5s' },
];

export function MixDemo() {
  const hero = shaderGallery({ shader: 'aurora', timeScale: 0.5 });
  const preview = threeGalaxy({ cubes: 300, compact: true });

  // Each KPI card gets its own sparkline canvas and its own signal; the
  // numbers beside it are MasonKit text fed from the same samples, so a
  // sample only updates the card it belongs to.
  const kpis = KPIS.map((kpi) => {
    const [latest, setLatest] = createSignal<ChartSeries[]>([]);
    const value = () => latest()[0]?.value;
    return {
      ...kpi,
      value,
      reading: () => {
        const v = value();
        return v === undefined ? '—' : (v * kpi.factor).toFixed(kpi.factor < 1 ? 1 : 0);
      },
      demo: liveChart({ compact: true, onSample: setLatest }),
    };
  });

  const gpu = kpis.find((kpi) => kpi.key === 'gpu')!;
  const budget = () => gauge(gpu.value() ?? 0, 'GPU load');

  return (
    <DemoPage
      eyebrow="Mix & match"
      title="Dashboard"
      description="Canvases are ordinary views, so they drop into MasonKit layouts next to text, SVG and each other. Here a WebGL shader, three 2D sparklines, an SVG gauge and a three.js scene share one Tailwind grid."
    >
      <CanvasView demo={hero} height={220} class="w-full rounded-3xl">
        <div class="absolute inset-0 flex flex-col justify-end gap-2 p-6">
          <span class="self-start rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
            WebGL background · MasonKit foreground
          </span>
          <h2 class="text-3xl font-bold text-white">Render pipeline health</h2>
          <p class="text-sm text-white/80">All systems nominal across 2D, WebGL, WebGPU and SVG.</p>
        </div>
      </CanvasView>

      <div class="flex flex-row flex-wrap gap-4">
        <For each={kpis}>
          {(kpi) => (
            <div class="card flex flex-1 basis-48 flex-col gap-3">
              <span class="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</span>
              <div class="flex flex-row items-end gap-1">
                <span class="text-3xl font-bold text-slate-900 dark:text-white">{kpi.reading()}</span>
                <span class="pb-1 text-sm text-slate-500 dark:text-slate-400">{kpi.unit}</span>
              </div>
              <CanvasView demo={kpi.demo} height={64} class="w-full rounded-xl" />
            </div>
          )}
        </For>
      </div>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(280,1fr))] gap-4">
        <section class="card flex flex-col items-center gap-3">
          <span class="self-start eyebrow">SVG</span>
          <div class="size-[200] rounded-3xl bg-slate-950 p-3">
            <svg src={budget()} class="size-[176]" />
          </div>
        </section>

        <section class="card flex flex-col gap-3">
          <span class="eyebrow">three.js</span>
          <CanvasView demo={preview} height={220} class="w-full rounded-2xl" />
          <p class="text-xs text-slate-500 dark:text-slate-400">Drag to orbit the preview.</p>
        </section>

        <section class="card flex flex-col gap-3">
          <span class="eyebrow">Activity</span>
          <For each={activity}>
            {(item) => (
              <div class="flex flex-row items-center gap-3">
                <svg src={item.icon} class="size-12" />
                <div class="flex flex-1 flex-col">
                  <span class="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</span>
                  <span class="text-xs text-slate-500 dark:text-slate-400">{item.body}</span>
                </div>
                <span class="text-xs text-slate-400">{item.time}</span>
              </div>
            )}
          </For>
        </section>
      </div>
    </DemoPage>
  );
}
