import type { EventData } from '@nativescript/core';
import 'solid-js';

// Solid's DOM typings already cover the HTML-shaped MasonKit elements (<div>,
// <section>, <span>, <button>, ...). These add what NativeScript brings on top.
declare module 'solid-js' {
  namespace JSX {
    // NativeScript events, for Solid's `on:` namespace: `on:tap={...}` listens
    // for the event of that name with addEventListener. Names are case
    // sensitive, and events don't bubble.
    interface CustomEvents {
      /** A tap on the element. */
      tap: NativeScriptEvent;
      /** The element joined the visual tree; `args.object` is its view. */
      loaded: NativeScriptEvent;
      /** The element left the visual tree. */
      unloaded: NativeScriptEvent;
      /** The element's laid-out size or position changed. */
      layoutChanged: NativeScriptEvent;
    }

    interface SvgSVGAttributes<T> {
      /** SVG markup (or a path to a file) for @nativescript/canvas-svg to draw. */
      src?: string;
    }

    interface IntrinsicElements {
      /** MasonKit's scroll container. */
      scroll: HTMLAttributes<HTMLElement>;
    }
  }
}

/**
 * Solid's `on:` typings expect DOM events; NativeScript's carry EventData
 * (`eventName`, `object`) instead.
 */
type NativeScriptEvent = Event & EventData;
