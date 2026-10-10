/**
 * `12345` → `"12,345"`. Used instead of `toLocaleString()`, which currently
 * throws on Windows.
 */
export function formatCount(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * `400` → `"400"`: a length in dp, for a `style` object. Solid types style
 * values as CSS strings, and unitless lengths are dp (`px` is physical pixels).
 */
export function dp(value: number): string {
  return String(value);
}
