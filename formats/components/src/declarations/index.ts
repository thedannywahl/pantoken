/**
 * The `DECLARATIONS` registry — the documented `@declaration` records. Only `focus` qualifies;
 * `elevation` is helpers-only (no doc block) and deliberately excluded.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { focus } from "./focus.ts";

/** Every documented declaration record. */
export const DECLARATIONS: readonly Definition[] = [focus];
