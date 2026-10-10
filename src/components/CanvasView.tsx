import { createSignal, onCleanup, Show, type JSX } from 'solid-js';
import type { EventData } from '@nativescript/core';
import type { Canvas } from '@nativescript/canvas';
import { dp } from '../format';
import { runDemo, type Demo, type DemoInstance } from '../canvas/runner';

/**
 * A <canvas> that runs a demo (see src/demos), filling the width it is
 * given. With `height` (dp) it is that tall; without, it fills the height its
 * box gets from classes (`flex-1`, `h-*`). Children are layered on top of the
 * canvas, so MasonKit content (badges, captions, controls) can sit over the
 * drawing.
 *
 * The canvas sits in an absolutely positioned box, so like any out-of-flow
 * content it adds nothing to its container's size. In flow, its backing store
 * would be its intrinsic size (as on the web), and a flex item's automatic
 * minimum height would grow with every resize the runner makes to match it.
 *
 * The size is set on the canvas as a style, not with classes: the canvas sets
 * its own width/height as local style values, which outrank class rules.
 */
export function CanvasView<T extends DemoInstance>(props: {
  demo: Demo<T>;
  height?: number;
  class?: string;
  onStarted?: (instance: T) => void;
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
    stop = runDemo(
      args.object as Canvas,
      props.demo,
      (instance) => props.onStarted?.(instance),
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
          <span class="text-sm font-semibold text-rose-300">This demo couldn't start</span>
          <p class="text-center text-xs text-slate-400">{error()}</p>
        </div>
      </Show>
    </div>
  );
}
