/**
 * Build the opt-in `@pantoken/components/fonts.css`: `@font-face` rules for the Instructure brand
 * typeface (Atkinson Hyperlegible Next), `src` pointing at the woff2 files shipped under
 * `assets/fonts/`. base.css already *applies* `--instui-font-family-base`; this sheet *loads* the
 * faces, so consumers opt into the ~350 kB of fonts with one import.
 *
 * Referenced by URL (not inlined as data URIs) to keep the sheet small; the woff2s ship in the
 * package and `fonts.css` points at them relative to its own location (`generated/` → `../assets/`).
 *
 * @module
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";

/** A font family directory, its CSS `font-family` name, its id, and fallback stack. */
const FAMILIES = [
  {
    dir: "AtkinsonHyperlegibleNext",
    id: "atkinson-hyperlegible-next",
    cssName: "Atkinson Hyperlegible Next",
    fallback: "system-ui, sans-serif",
  },
] as const;

/** Weight-name (as it appears in a filename) → CSS numeric font-weight. */
const WEIGHTS: Record<string, number> = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Book: 450,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
  ExtraBlack: 950,
};
// Longest first so "ExtraBold" matches before "Bold".
const WEIGHT_NAMES = Object.keys(WEIGHTS).toSorted((a, b) => b.length - a.length);

interface Face {
  family: string;
  path: string;
  cssWeight: number;
  style: "italic" | "normal";
}

/** Parse `<Prefix>-<Variant>.woff2` into a weight and style. */
function parseVariant(
  filename: string,
): { cssWeight: number; style: "italic" | "normal" } | undefined {
  const variant = filename.replace(/^[A-Za-z]+-/u, "").replace(/\.woff2$/u, "");
  if (variant === "Italic") return { cssWeight: 400, style: "italic" };
  for (const name of WEIGHT_NAMES) {
    if (variant.startsWith(name)) {
      const rest = variant.slice(name.length);
      if (rest === "" || rest === "Italic") {
        return { cssWeight: WEIGHTS[name], style: rest === "Italic" ? "italic" : "normal" };
      }
    }
  }
  return undefined;
}

/**
 * Build the `fonts.css` string by scanning the vendored woff2 files.
 *
 * @param fontsDir - The `assets/fonts` directory (absolute).
 * @returns The stylesheet text (`@font-face` rules + one `--instui-font-family-<id>` per family).
 */
export function fontsCss(fontsDir: string): string {
  const faces: Face[] = [];
  for (const family of FAMILIES) {
    for (const filename of readdirSync(join(fontsDir, family.dir)).toSorted()) {
      if (!filename.endsWith(".woff2")) continue;
      const parsed = parseVariant(filename);
      if (!parsed) continue;
      faces.push({ family: family.id, path: `${family.dir}/${filename}`, ...parsed });
    }
  }
  faces.sort(
    (a, b) =>
      a.family.localeCompare(b.family) ||
      a.cssWeight - b.cssWeight ||
      a.style.localeCompare(b.style),
  );

  const cssNameOf = (id: string): string => FAMILIES.find((f) => f.id === id)?.cssName ?? id;
  const fontFace = faces
    .map((f) =>
      [
        "@font-face {",
        `  font-family: "${cssNameOf(f.family)}";`,
        `  font-style: ${f.style};`,
        `  font-weight: ${String(f.cssWeight)};`,
        "  font-display: swap;",
        `  src: url("../assets/fonts/${f.path}") format("woff2");`,
        "}",
      ].join("\n"),
    )
    .join("\n\n");
  const rootVars = [
    ":root {",
    ...FAMILIES.map((f) => `  --instui-font-family-${f.id}: "${f.cssName}", ${f.fallback};`),
    "}",
  ].join("\n");
  return `/* Instructure brand fonts (@pantoken/components) — generated, do not edit. */\n${fontFace}\n\n${rootVars}\n`;
}
