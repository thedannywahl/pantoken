import type { CdnFile } from "@pantoken/cdn";
import type { PantokenTheme } from "../theme";
import type { PickerMode } from "./pickerMode";

/** Lean-sheet filename for each resolvable theme/mode variant. */
const LEAN_FILE_BY_VARIANT: Record<string, string> = {
  canvas: "style.canvas.lean.css",
  canvasHighContrast: "style.canvas-high-contrast.lean.css",
  "rebrand:light": "style.rebrand.light.lean.css",
  "rebrand:adaptive": "style.lean.css",
};

function variantKey(theme: PantokenTheme, mode: PickerMode): string {
  return theme === "rebrand" ? `rebrand:${mode}` : theme;
}

/** Resolve the lean token-sheet path for a selected theme/mode pair. */
export function tokenLeanSheet(theme: PantokenTheme, mode: PickerMode): string {
  return `npm/@pantoken/css/dist/${LEAN_FILE_BY_VARIANT[variantKey(theme, mode)]}`;
}

/** Provider-agnostic equivalent of {@link tokenLeanSheet}, for pickers built on `@pantoken/cdn`. */
export function tokenSheetFile(theme: PantokenTheme, mode: PickerMode): CdnFile {
  return {
    package: "@pantoken/css",
    path: `dist/${LEAN_FILE_BY_VARIANT[variantKey(theme, mode)]}`,
  };
}
