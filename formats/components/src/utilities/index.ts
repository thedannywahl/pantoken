/**
 * The `UTILITIES` registry — every documented `@utility` `Definition`. Unlike `COMPONENTS`, this array
 * drives no concatenation (`generate.ts` calls the view/spacing/layout/responsive builders directly,
 * and icon/mask/screen-reader-content ship inside `components.css`); it exists so the parity test can
 * `validate()` each utility. `iconGlyphsCss` is bespoke and deliberately excluded.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { gap } from "./gap/index.ts";
import { icon } from "./icon/index.ts";
import { layout } from "./layout/index.ts";
import { mask } from "./mask/index.ts";
import { responsive } from "./responsive/index.ts";
import { screenReaderContent } from "./screen-reader-content/index.ts";
import { spacing } from "./spacing/index.ts";
import { view } from "./view/index.ts";

/** Every documented utility record. */
export const UTILITIES: readonly Definition[] = [
  view,
  spacing,
  gap,
  layout,
  responsive,
  icon,
  mask,
  screenReaderContent,
];
