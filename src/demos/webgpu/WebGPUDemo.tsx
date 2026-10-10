import { createMemo, createSignal, For, Show } from 'solid-js';
import { formatCount } from '../../format';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import type { Demo } from '../../canvas/runner';
import { boids, type BoidPreset, type Boids, type GPUInfo } from './boids';

const presets: { label: string; value: BoidPreset }[] = [
  { label: 'Flock', value: 'flock' },
  { label: 'Swarm', value: 'swarm' },
  { label: 'Drift', value: 'drift' },
];

const counts = [
  { label: '1K', value: 1024 },
  { label: '2K', value: 2048 },
  { label: '4K', value: 4096 },
];

const pill = 'rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white';

export function WebGPUDemo() {
  const [preset, setPreset] = createSignal<BoidPreset>('flock');
  const [count, setCount] = createSignal(__ANDROID__ ? 1024 : 2048);
  const [info, setInfo] = createSignal<GPUInfo>();
  let flock: Boids | undefined;

  const demo = createMemo(() => boids({ count: count(), onInfo: setInfo }));

  function choosePreset(value: BoidPreset) {
    setPreset(value);
    flock?.setPreset(value);
  }

  function onStarted(instance: Boids) {
    flock = instance;
    instance.setPreset(preset());
  }

  const details = () => {
    const gpu = info();
    return gpu
      ? [
          { label: 'Vendor', value: gpu.vendor },
          { label: 'Architecture', value: gpu.architecture },
          { label: 'Adapter', value: gpu.description || '—' },
          { label: 'Canvas format', value: gpu.format },
        ]
      : [];
  };

  return (
    <DemoPage
      fill={760}
      eyebrow="WebGPU"
      title="Compute boids"
      description="Every frame a WGSL compute shader steers each boid from its neighbours, then an instanced render pass draws the flock. Touch the canvas to attract them."
    >
      <section class="card flex flex-1 flex-col gap-4">
        {/* The particle buffers are sized up front, so `keyed` mounts a fresh
            canvas for each count. */}
        <Show when={demo()} keyed>
          {(demo: Demo<Boids>) => (
            <CanvasView demo={demo} class="min-h-[240] w-full flex-1 rounded-2xl" onStarted={onStarted}>
              <div class="absolute left-3 top-3 flex flex-row gap-2">
                <span class={pill}>{`${formatCount(count())} boids`}</span>
                <span class={pill}>O(n²) per frame on the GPU</span>
              </div>
            </CanvasView>
          )}
        </Show>
        <div class="flex flex-row flex-wrap items-center justify-between gap-3">
          <Segmented options={presets} value={preset()} onChange={choosePreset} />
          <div class="flex flex-row flex-wrap items-center gap-2">
            <Segmented options={counts} value={count()} onChange={setCount} />
            <button
              class="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white active:bg-indigo-600"
              on:tap={() => flock?.reset()}
            >
              Scatter
            </button>
          </div>
        </div>
      </section>

      <section class="card flex flex-col gap-4">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Adapter</h2>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(200,1fr))] gap-3">
          <For each={details()}>
            {(item) => (
              <div class="flex flex-col gap-1 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <span class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{item.label}</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
              </div>
            )}
          </For>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Powered by wgpu, which picks the native graphics API: Metal on iOS, Vulkan on Android (API 27+),
          Direct3D or Vulkan on Windows.
        </p>
      </section>
    </DemoPage>
  );
}
