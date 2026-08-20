/**
 * The `UTILITIES` registry — every documented `@utility` `Definition`. Unlike `COMPONENTS`, this array
 * drives no concatenation (`generate.ts` calls the spacing/layout/responsive builders directly, and
 * icon/screen-reader-content ship inside `components.css`); it exists so the parity test can
 * `validate()` each utility. `iconGlyphsCss` is bespoke and deliberately excluded. `view`/`mask` moved
 * to `COMPONENTS` (`components/view`, `components/mask`) — they're real components now.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { cursor } from "./cursor/index.ts";
import { gap } from "./gap/index.ts";
import { icon } from "./icon/index.ts";
import { layout } from "./layout/index.ts";
import { maskUtility } from "./mask/index.ts";
import { overflow } from "./overflow/index.ts";
import { position } from "./position/index.ts";
import { responsive } from "./responsive/index.ts";
import { screenReaderContent } from "./screen-reader-content/index.ts";
import { spacing } from "./spacing/index.ts";
import { stacking } from "./stacking/index.ts";
import { transition } from "./transition/index.ts";
import { truncate } from "./truncate/index.ts";

/** Every documented utility record. */
export const UTILITIES: readonly Definition[] = [
  spacing,
  gap,
  layout,
  responsive,
  position,
  overflow,
  cursor,
  stacking,
  maskUtility,
  icon,
  screenReaderContent,
  transition,
  truncate,
];
