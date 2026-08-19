/**
 * The `RULES` registry — the documented `@rule` records (`base`, `prose`), for the parity test.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { base } from "./base/index.ts";
import { prose } from "./prose/index.ts";

/** Every documented rule record. */
export const RULES: readonly Definition[] = [base, prose];
