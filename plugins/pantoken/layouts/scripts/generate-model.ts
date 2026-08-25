/**
 * Build and write `dist/model.json` — the cssdoc `CssDocEntry[]` model for `generated/layouts.css`
 * (unminified, comments intact), published as a stable provider path for downstream `cssdoc` configs
 * (e.g. `@pantoken/plugin-layouts/model.json`). Run after `vp pack` (`dist/` is otherwise cleaned by
 * the build).
 */
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCssDocModel as buildModel, writeCssDocModel } from "@pantoken/cssdoc-model";

/** Build the published provider model in the cssdoc `CssDocEntry[]` shape. */
export function buildCssDocModel(): ReturnType<typeof buildModel> {
  return buildModel([join(import.meta.dirname, "..", "generated", "layouts.css")]);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const model = buildCssDocModel();
  writeCssDocModel(model, join(import.meta.dirname, "..", "dist", "model.json"));
  console.log(`✓ layouts: wrote model.json (${model.length} model entries)`);
}
