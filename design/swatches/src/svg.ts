/**
 * Render swatches as a viewable SVG specimen sheet, grouped by token category. Unlike the
 * ASE/GPL/Sketch palettes (opaque files a designer imports), this is a picture: labeled color chips
 * arranged in sections, so the palette can go straight into a README, a docs page, a PR, or Figma.
 *
 * Swatches are grouped by category — the first two name segments (`color-background`, `color-text`,
 * `component-alert`, …), or the first three for primitives so each color family is its own section
 * (`primitive-color-navy`). Within a section a chip is labeled with the rest of its name. Sections
 * appear in the order their tokens first show up in the IR.
 *
 * `toSvg` renders whatever swatches you pass, so to specimen just the core palette, filter the list
 * (e.g. drop `primitive-*`) before calling.
 *
 * @module
 */
import type { Swatch } from "./model.ts";

/** Options for {@link toSvg}. */
export interface ToSvgOptions {
  /** The sheet title (default `"Instructure color tokens"`). */
  title?: string;
  /** Chips per row within a section (default `6`). */
  columns?: number;
}

const MARGIN = 32;
const TITLE_H = 46;
const GROUP_HEAD_H = 26;
const GROUP_GAP = 26;
const CELL_W = 150;
const SWATCH_H = 46;
const LABEL_H = 32;
const CELL_H = SWATCH_H + LABEL_H;
const GAP_X = 14;
const GAP_Y = 16;
const MAX_LABEL = 22;

/** Escape the five XML text characters. */
function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** The category a swatch belongs to: first two name segments, or three for a primitive family. */
function categoryOf(name: string): string {
  const parts = name.split("-");
  const depth = parts[0] === "primitive" ? 3 : 2;
  return parts.slice(0, depth).join("-");
}

/** Group swatches by category, preserving first-appearance order. */
function group(
  swatches: readonly Swatch[],
): { name: string; items: { label: string; swatch: Swatch }[] }[] {
  const groups = new Map<string, { label: string; swatch: Swatch }[]>();
  for (const swatch of swatches) {
    const key = categoryOf(swatch.name);
    const rest = swatch.name.length > key.length ? swatch.name.slice(key.length + 1) : swatch.name;
    const label = rest.length > MAX_LABEL ? `${rest.slice(0, MAX_LABEL - 1)}…` : rest;
    (groups.get(key) ?? groups.set(key, []).get(key)!).push({ label, swatch });
  }
  return [...groups].map(([name, items]) => ({ name, items }));
}

/**
 * Render swatches as a grouped SVG specimen sheet.
 *
 * @param swatches - The palette (e.g. from `toSwatches`).
 * @param options - {@link ToSvgOptions}.
 * @returns The SVG document as a string.
 *
 * @example Render a specimen sheet for a README
 * ```ts
 * import { writeFileSync } from "node:fs";
 * import { swatches, toSvg } from "@pantoken/swatches";
 *
 * writeFileSync("palette.svg", toSvg(swatches));
 * ```
 *
 * @example Specimen only the core palette, with a title and wider grid
 * ```ts
 * import { swatches, toSvg } from "@pantoken/swatches";
 *
 * const core = swatches.filter((s) => !s.name.startsWith("primitive-"));
 * const svg = toSvg(core, { title: "Instructure core colors", columns: 8 });
 * ```
 */
export function toSvg(swatches: readonly Swatch[], options: ToSvgOptions = {}): string {
  const title = options.title ?? "Instructure color tokens";
  const columns = Math.max(1, options.columns ?? 6);
  const width = MARGIN * 2 + columns * CELL_W + (columns - 1) * GAP_X;
  const groups = group(swatches);

  const body: string[] = [];
  let y = MARGIN + TITLE_H;

  for (const g of groups) {
    body.push(`<text x="${MARGIN}" y="${y}" class="group">${esc(g.name)}</text>`);
    const top = y + GROUP_HEAD_H;
    const rows = Math.ceil(g.items.length / columns);
    g.items.forEach(({ label, swatch }, i) => {
      const x = MARGIN + (i % columns) * (CELL_W + GAP_X);
      const cy = top + Math.floor(i / columns) * (CELL_H + GAP_Y);
      body.push(
        `<g transform="translate(${x},${cy})">`,
        `<rect width="${CELL_W}" height="${SWATCH_H}" rx="6" fill="${esc(swatch.hex)}" class="chip"/>`,
        `<text x="0" y="${SWATCH_H + 16}" class="leaf">${esc(label)}</text>`,
        `<text x="0" y="${SWATCH_H + 29}" class="hex">${esc(swatch.hex.toUpperCase())}</text>`,
        `</g>`,
      );
    });
    y = top + rows * CELL_H + (rows - 1) * GAP_Y + GROUP_GAP;
  }

  const height = y + MARGIN - GROUP_GAP;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="system-ui, sans-serif">`,
    `<style>`,
    `.bg { fill: #ffffff; }`,
    `.title { fill: #111827; font-size: 20px; font-weight: 700; }`,
    `.group { fill: #374151; font-size: 14px; font-weight: 600; }`,
    `.chip { stroke: rgba(0,0,0,0.15); stroke-width: 1; }`,
    `.leaf { fill: #374151; font-size: 11px; }`,
    `.hex { fill: #9ca3af; font-size: 10px; font-family: ui-monospace, monospace; }`,
    `</style>`,
    `<rect class="bg" width="${width}" height="${height}"/>`,
    `<text x="${MARGIN}" y="${MARGIN + 20}" class="title">${esc(title)}</text>`,
    ...body,
    `</svg>`,
    ``,
  ].join("\n");
}
