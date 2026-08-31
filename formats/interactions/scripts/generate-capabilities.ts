/**
 * Generate component-capabilities.json — the authoritative map of which
 * InstUI components need CSS, JS (interactions), or both.
 *
 * Sources:
 *   - CSS components + icon usage:  filesystem scan of formats/components/src/components/
 *     (avoids importing the source registry which depends on generated output)
 *   - Web-component element list:   renderers/web-components/elements-meta
 *   - Behavioral classification:    inferred from src/components/<name>.ts imports
 *     A component is "both" when it has a CSS counterpart AND its init file imports
 *     anything beyond applySpacing (indicating real browser-side behavior).
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  ELEMENTS,
  ICON_ELEMENTS,
  NESTED_DEPS,
} from "../../../renderers/web-components/src/lib/elements-meta.ts";
import { findCssIconNames, findCssNames } from "./css-components.ts";

// Web component elements with no CSS counterpart and no interactions JS role.
const SKIP_WEB_ELEMENTS = new Set(["icon"]);

// ── Detect behavioral imports from each component's init file ────────────────

const componentsDir = resolve(import.meta.dirname, "../src/components");

/** Returns true if the init file imports browser-meaningful behavior beyond applySpacing.
 *  syncInvoker is excluded — it is shadow-DOM only and a no-op on plain HTML elements.
 *  Imports from ../behaviors/ or makeOnCommand both qualify. */
function hasBehavior(name: string): boolean {
  const path = resolve(componentsDir, `${name}.ts`);
  if (!existsSync(path)) return false;
  const src = readFileSync(path, "utf8");
  return /\bimport\s*\{[^}]*\bmakeOnCommand\b/.test(src) || /from ["']\.\.\/behaviors\//.test(src);
}

// ── Derive sets ──────────────────────────────────────────────────────────────

// Read CSS component names from the filesystem — avoids importing formats/components
// source which depends on generated output that may not exist yet in CI.
const cssComponentsDir = resolve(import.meta.dirname, "../../../formats/components/src/components");

// Each component is a per-record directory (<name>/index.ts, some with a co-located <name>.css);
// only "index.ts" and "generate.ts" (color-utility-style scripts) sit alongside them as flat files.
const cssNames = findCssNames(cssComponentsDir);

// Detect icon usage by reading source text — no import needed.
const cssIconNames = findCssIconNames(cssComponentsDir, cssNames);

const webNames = new Set(ELEMENTS as readonly string[]);
const iconElementNames = new Set(ICON_ELEMENTS as readonly string[]);

// ── Build records ────────────────────────────────────────────────────────────

type ComponentType = "css-only" | "js-only" | "both";

/** One entry in the component capability map. */
export interface ComponentCapability {
  name: string;
  type: ComponentType;
  needsIcons: boolean;
  dependencies: readonly string[];
}

const components: ComponentCapability[] = [...new Set([...cssNames, ...webNames])]
  .sort()
  .filter((name) => !SKIP_WEB_ELEMENTS.has(name))
  .map((name) => {
    const hasCss = cssNames.has(name);
    const hasWeb = webNames.has(name);
    const dependencies = (NESTED_DEPS[name] ?? []) as string[];
    const needsIcons = cssIconNames.has(name) || iconElementNames.has(name);

    let type: ComponentType;
    if (hasCss && hasWeb) {
      type = hasBehavior(name) ? "both" : "css-only";
    } else if (hasWeb) {
      type = "js-only";
    } else {
      // CSS-only in the component registry, but may have a behavior IIFE
      type = hasBehavior(name) ? "both" : "css-only";
    }

    return { name, type, needsIcons, dependencies };
  });

// ── Emit ─────────────────────────────────────────────────────────────────────

const cdn = "https://cdn.jsdelivr.net";

const output = {
  $schema: "https://pantoken.app/component-capabilities.schema.json",
  description:
    "InstUI component capability map: which components need CSS, JS (interactions), or both, with CDN URLs and dependency graph.",
  components: components.map((c) => {
    const entry: Record<string, unknown> = { name: c.name, type: c.type };
    if (c.needsIcons) entry.needsIcons = true;
    if (c.dependencies.length) entry.requires = c.dependencies;
    if (c.type !== "js-only") entry.css = `${cdn}/npm/@pantoken/components/dist/${c.name}.css`;
    if (c.type !== "css-only")
      entry.js = `${cdn}/npm/@pantoken/interactions/dist/${c.name}.iife.js`;
    return entry;
  }),
};

// Write to package root so it's not in dist/ (which is gitignored)
// and will be included in pnpm pack tarballs.
const out = resolve(import.meta.dirname, "../component-capabilities.json");
writeFileSync(out, `${JSON.stringify(output, null, 2)}\n`);

const counts = {
  both: components.filter((c) => c.type === "both").length,
  css: components.filter((c) => c.type === "css-only").length,
  js: components.filter((c) => c.type === "js-only").length,
};
console.log(
  `✓ interactions: wrote component-capabilities.json (${counts.both} both, ${counts.css} css-only, ${counts.js} js-only)`,
);
