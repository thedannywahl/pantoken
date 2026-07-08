/**
 * The `UTILITIES` registry — every documented `@utility` `Definition`. Unlike `COMPONENTS`, this array
 * drives no concatenation (`generate.ts` calls the view/spacing/layout/responsive builders directly,
 * and icon/mask/screen-reader-content ship inside `components.css`); it exists so the parity test can
 * `validate()` each utility. `iconGlyphsCss` is bespoke and deliberately excluded.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { icon } from "./icon.ts";
import { layout } from "./layout.ts";
import { mask } from "./mask.ts";
import { responsive } from "./responsive.ts";
import { screenReaderContent } from "./screen-reader-content.ts";
import { spacing } from "./spacing.ts";
import { view } from "./view.ts";

/** Every documented utility record. */
export const UTILITIES: readonly Definition[] = [
  view,
  spacing,
  layout,
  responsive,
  icon,
  mask,
  screenReaderContent,
];
