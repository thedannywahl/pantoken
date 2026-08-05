/**
 * Generate component-capabilities.json — the authoritative map of which
 * InstUI components need CSS, JS (interactions), or both.
 *
 * Sources:
 *   - CSS components + icon usage:  formats/components (same source as cdn-manifest)
 *   - Web-component element list:   renderers/web-components/elements-meta
 *   - Behavioral classification:    BEHAVIOR_COMPONENTS below (hand-maintained)
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { COMPONENTS as CSS_RECORDS } from "../../../formats/components/src/components/index.ts";
import {
  ELEMENTS,
  ICON_ELEMENTS,
  NESTED_DEPS,
} from "../../../renderers/web-components/src/lib/elements-meta.ts";

// Web component elements that have no CSS counterpart and no interactions JS role —
// the <instui-icon> element renders inline SVGs via its own web component; CSS icon
// usage is handled entirely by the -icon-* modifier system (no JS needed).
const SKIP_WEB_ELEMENTS = new Set(["icon"]);

// Components with genuine interactive JS behavior when used as plain CSS components:
// overlays (open/close/position), navigation, command routing, or mode toggle.
const BEHAVIOR_COMPONENTS = new Set([
  "button",
  "calendar",
  "context-view",
  "in-place-edit",
  "modal",
  "popover",
  "tooltip",
  "tray",
  "tree-browser",
]);

// ── Derive sets ──────────────────────────────────────────────────────────────

const cssNames = new Set(CSS_RECORDS.filter((c) => c.kind === "component").map((c) => c.name));
const cssIconNames = new Set(
  CSS_RECORDS.filter(
    (c) => c.kind === "component" && /var\(--instui-icon-/.test(c.css({ prefix: "instui" })),
  ).map((c) => c.name),
);
const webNames = new Set(ELEMENTS as readonly string[]);
const iconElementNames = new Set(ICON_ELEMENTS as readonly string[]);

// ── Build records ────────────────────────────────────────────────────────────

type ComponentType = "css-only" | "js-only" | "both";

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
      type = BEHAVIOR_COMPONENTS.has(name) ? "both" : "css-only";
    } else if (hasWeb) {
      type = "js-only";
    } else {
      type = "css-only";
    }

    return { name, type, needsIcons, dependencies };
  });

// ── Emit ─────────────────────────────────────────────────────────────────────

const cdn = "https://cdn.jsdelivr.net";

const output = {
  $schema: "https://pantoken.iywahl.com/component-capabilities.schema.json",
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

const out = resolve(import.meta.dirname, "../dist/component-capabilities.json");
mkdirSync(resolve(import.meta.dirname, "../dist"), { recursive: true });
writeFileSync(out, `${JSON.stringify(output, null, 2)}\n`);

const counts = {
  both: components.filter((c) => c.type === "both").length,
  css: components.filter((c) => c.type === "css-only").length,
  js: components.filter((c) => c.type === "js-only").length,
};
console.log(
  `✓ interactions: wrote component-capabilities.json (${counts.both} both, ${counts.css} css-only, ${counts.js} js-only)`,
);
