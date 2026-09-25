/**
 * The docs site's `custom` theme color: derives a scale from the reader's hex against the reference
 * curve `scripts/site-themes.ts` precomputes, and writes the derived primitives (plus the hero image,
 * which can't reference custom properties inside its data URI) into one runtime `<style>`. The remap
 * rule itself ships statically in `site-themes.css`.
 */
import {
  deriveScale,
  isHexColor,
  parseHexColor,
  type CustomColorScale,
  type ReferenceCurve,
} from "@pantoken/plugin-custom-theme-colors/scale";
import curve from "./generated/custom-color-curve.json";

/** Navy100, so switching to Custom starts from the default brand color. */
export const DEFAULT_CUSTOM_COLOR = "#4c79aa";

const STYLE_ID = "pantoken-docs-custom-color";
const PRIMITIVE = "--instui-primitive-color-custom-custom";

export { isHexColor, parseHexColor, type CustomColorScale };

/** Derive the custom scale for a validated hex. */
export function deriveDocsCustomScale(hex: string): CustomColorScale {
  return deriveScale(hex, curve as ReferenceCurve);
}

/** The derived hexes, lightest first — the shape posted to demo frames as `customScale`. */
export function customScaleValues(scale: CustomColorScale): string[] {
  return [...scale.steps.values()];
}

function heroImage(scale: CustomColorScale): string {
  const hex = (step: number) => encodeURIComponent(scale.steps.get(step)!);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 160'><rect width='374' height='160' fill='${hex(200)}'/><circle cx='374' cy='160' r='200' fill='${hex(160)}'/><circle cx='374' cy='160' r='140' fill='${hex(120)}'/><circle cx='374' cy='160' r='80' fill='${hex(80)}'/></svg>`;
  return `url("data:image/svg+xml,${svg}")`;
}

/** Write (or, with `null`, remove) the runtime custom-color declarations. */
export function applyCustomColorStyle(scale: CustomColorScale | null): void {
  if (typeof document === "undefined") return;
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!scale) {
    style?.remove();
    return;
  }
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  const decls = [...scale.steps].map(([step, value]) => `  ${PRIMITIVE}${step}: ${value};`);
  style.textContent = `:root[data-pantoken-color="custom"] {\n${decls.join("\n")}\n  --vp-home-bg-image: ${heroImage(scale)};\n}`;
}
