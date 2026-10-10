import { aliasTagName } from 'dominative';

// Stands in for @nativescript-community/solid-js's own `src/dom.js` (see
// keepBrowserGlobals in solid-workarounds.mjs). That module also copies every
// DOMiNATIVE class onto globalThis, replacing the canvas polyfill's `Image`,
// `document` and `SVGElement` and the runtime's `Event` and `EventTarget`.
// Solid doesn't need them: the renderer is given DOMiNATIVE's `document`.

// Lets JSX use lowercase tags for every DOMiNATIVE element (`<page>`, `<frame>`).
aliasTagName((tag) => tag.toLowerCase());
