/**
 * Shared `cssdoc.json` block — every pantoken scaffold platform includes the same schema file, so
 * it's a single Block instead of being duplicated per-preset.
 *
 * @module
 * @alpha
 */
import { base } from "../base.ts";

// Kept in sync by hand with `@pantoken/pantoken`'s cssdoc-base.json contract; no templating needed —
// this file has no per-project substitutions.
const CSSDOC_JSON = `{
  "$schema": "https://cssdoc.dev/cssdoc.schema.json",
  "extends": ["./node_modules/@pantoken/pantoken/cssdoc-base.json"],
  "modifierConvention": "rscss",
  "inlineComments": "ignore",
  // This provider resolves pantoken's documented components/utilities for lint/hover/completions. It
  // assumes the default "instui-" class prefix pantoken ships with — if you build your OWN pantoken
  // CSS with a different prefix spelling (e.g. componentsCss({ prefix: "acme" })), rewrite it here.
  // \`to\` is used verbatim — no "-" is assumed or added, so match whatever you actually built with:
  //   "prefix": { "from": "instui-", "to": "acme-" }
  // Built unprefixed (componentsCss({ prefix: null })) or with no separator (e.g. "ialert" instead of
  // "instui-alert")? Set \`to\` to match exactly — omit it (or use "") to strip to a bare class:
  //   "prefix": { "from": "instui-", "to": "i" }
  "providers": [{ "path": "./node_modules/@pantoken/pantoken/model.json" }]
}
`;

/** Writes the shared `cssdoc.json` schema file, unmodified by platform or options. */
export const blockCssdoc = base.createBlock({
  about: { name: "cssdoc" },
  produce: () => ({ files: { "cssdoc.json": CSSDOC_JSON } }),
});
