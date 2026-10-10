import { createSignal, For } from 'solid-js';
import { DemoPage } from '../../components/DemoPage';
import { gallery, gauge } from './art';

export function SvgDemo() {
  const [value, setValue] = createSignal(64);

  function nudge(delta: number) {
    setValue((current) => Math.max(0, Math.min(100, current + delta)));
  }

  return (
    <DemoPage
      eyebrow="SVG"
      title="Vector, animated"
      description="The Svg view from @nativescript/canvas-svg renders SVG natively with Skia, SMIL animation included. Each tile below is inline markup passed to src."
    >
      <div class="grid grid-cols-[repeat(auto-fill,minmax(160,1fr))] gap-4">
        <For each={gallery}>
          {(item) => (
            <article class="card flex flex-col gap-3">
              <div class="flex h-[140] w-full items-center justify-center rounded-2xl bg-slate-950">
                <svg src={item.src} class="size-[120]" />
              </div>
              <div class="flex flex-col gap-1">
                <h3 class="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">{item.body}</p>
              </div>
            </article>
          )}
        </For>
      </div>

      <section class="card flex flex-row flex-wrap items-center gap-6">
        <div class="size-[200] rounded-3xl bg-slate-950 p-3">
          <svg src={gauge(value(), 'GPU budget')} class="size-[176]" />
        </div>
        <div class="flex flex-1 basis-60 flex-col gap-3">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Driven by a signal</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            The gauge's markup reads the value signal, so changing it updates just the view's src; nothing
            else on the page re-runs.
          </p>
          <div class="flex flex-row flex-wrap gap-2">
            <button
              class="size-10 rounded-full bg-slate-100 text-lg font-bold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              on:tap={() => nudge(-10)}
            >
              −
            </button>
            <button
              class="size-10 rounded-full bg-indigo-500 text-lg font-bold text-white active:bg-indigo-600"
              on:tap={() => nudge(10)}
            >
              +
            </button>
            <button
              class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              on:tap={() => setValue(Math.round(Math.random() * 100))}
            >
              Random
            </button>
          </div>
        </div>
      </section>
    </DemoPage>
  );
}
