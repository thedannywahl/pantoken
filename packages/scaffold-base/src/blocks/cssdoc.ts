/**
 * Shared `cssdoc.json` block — every pantoken scaffold platform includes the same schema file, so
 * it's a single Block instead of being duplicated per-preset.
 *
 * @module
 * @alpha
 */
import type { BlockWithoutAddons } from "bingo-stratum";
import { base } from "../base.ts";
import { CSSDOC_JSON } from "../../generated/cssdoc.ts";

/** Writes the shared `cssdoc.json` schema file, unmodified by platform or options. */
export const blockCssdoc: BlockWithoutAddons<{ name: string }> = base.createBlock({
  about: { name: "cssdoc" },
  produce: () => ({ files: { "cssdoc.json": CSSDOC_JSON } }),
});
