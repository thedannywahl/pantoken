/**
 * The `DECLARATIONS` registry — the documented `@declaration` records: `focus` (the focus-outline ring)
 * and `elevation` (the `--instui-elevation-*` shadow scale).
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { focus } from "./focus.ts";
import { elevation } from "./elevation.ts";

/** Every documented declaration record. */
export const DECLARATIONS: readonly Definition[] = [focus, elevation];
