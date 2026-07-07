/**
 * `@pantoken/icon-font` — build an installable Instructure icon font (WOFF2 + TTF) with a matching
 * stylesheet and codepoint map. Unlike the inline-SVG paths, a font installs on a device, so it
 * works in design apps and offline contexts where the web tooling isn't reachable.
 *
 * Stroke-based glyphs (Lucide) are outlined to fills so they render as real font glyphs; fill-based
 * glyphs (Instructure custom) pass through.
 *
 * @module
 */
export { buildIconFont } from "./build.ts";
export type { BuildIconFontOptions, IconFontResult } from "./build.ts";
export { svgToGlyphPath } from "./outline.ts";
export type { GlyphPath } from "./outline.ts";
