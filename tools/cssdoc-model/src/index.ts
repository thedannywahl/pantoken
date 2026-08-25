/**
 * Build a package's own published cssdoc provider model: parse its unminified generated CSS (the
 * shipped `.css` exports are minified and strip doc comments, so they can't be used as raw-CSS
 * providers) into a `CssDocEntry[]`, then write it to `dist/model.json` — a stable path downstream
 * `cssdoc.json` `providers` entries can point at.
 *
 * @module
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import {
  type CssDocEntry,
  CssDocConfiguration,
  type InlineCommentMode,
  type ModifierConventionInput,
  parseCssDocs,
} from "@cssdoc/core";

/** Options for {@link buildCssDocModel}. */
export interface BuildCssDocModelOptions {
  /** The package's own modifier convention. Defaults to `"rscss"` (pantoken's convention). */
  modifierConvention?: ModifierConventionInput;
  /** How an authored tag and an inline `/* … *\/` comment combine. Defaults to `"ignore"`. */
  inlineComments?: InlineCommentMode;
}

/**
 * Parse one or more unminified, comment-intact generated CSS files into the cssdoc `CssDocEntry[]`
 * model shape.
 *
 * @param sources - Absolute paths to the generated CSS files (e.g. `generated/components.css`,
 *   `generated/utilities.css`) — concatenated in order before parsing.
 */
export function buildCssDocModel(
  sources: readonly string[],
  options: BuildCssDocModelOptions = {},
): CssDocEntry[] {
  const source = sources.map((path) => readFileSync(path, "utf8")).join("\n");
  const configuration = new CssDocConfiguration();
  configuration.setModifierConvention(options.modifierConvention ?? "rscss");
  configuration.setInlineComments(options.inlineComments ?? "ignore");
  return parseCssDocs(source, { configuration });
}

/** Write a model as pretty-printed JSON, creating the destination directory if needed. */
export function writeCssDocModel(model: readonly CssDocEntry[], outPath: string): void {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(model, null, 2)}\n`);
}
