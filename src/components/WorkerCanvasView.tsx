import { createSignal, onCleanup, Show, type JSX } from 'solid-js';
import type { EventData } from '@nativescript/core';
import type { Canvas } from '@nativescript/canvas';
import { dp } from '../format';
import { runInWorker, type TransferMode } from '../canvas/worker-host';

/**
 * CanvasView, drawn by a Worker: `worker` creates one whose entry file calls
 * `serveDemo` (see src/demos/offscreen). Sizing and children work as in
 * CanvasView. The Worker ends when this component is disposed.
 */
export function WorkerCanvasView(props: {
  worker: () => Worker;
  height?: number;
  class?: string;
  onStarted?: (mode: TransferMode) => void;
  children?: JSX.Element;
}) {
  const [error, setError] = createSignal<string>();
  let stop: (() => void) | undefined;

  onCleanup(() => {
    stop?.();
    stop = undefined;
  });

  function onLoaded(args: EventData) {
    if (stop) {
      return;
    }
    stop = runInWorker(
      args.object as Canvas,
      props.worker(),
      (mode) => props.onStarted?.(mode),
      (reason: any) => setError(String(reason?.message ?? reason)),
    );
  }

  return (
    <div
      class={`relative overflow-hidden ${props.class ?? ''}`}
      style={props.height ? { height: dp(props.height) } : undefined}
    >
      <div class="absolute inset-0">
        <canvas style={{ width: '100%', height: '100%' }} on:loaded={onLoaded} />
      </div>
      {props.children}
      <Show when={error()}>
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950 p-6">
          <span class="text-sm font-semibold text-rose-300">The Worker couldn't draw</span>
          <p class="text-center text-xs text-slate-400">{error()}</p>
        </div>
      </Show>
    </div>
  );
}
