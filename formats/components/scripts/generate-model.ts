/**
 * Build and write `dist/model.json` — the cssdoc `CssDocEntry[]` model for `generated/components.css`
 * + `generated/utilities.css` (unminified, comments intact), published as a stable provider path for
 * downstream `cssdoc` configs and runtime consumers (e.g. `@pantoken/tinymce`'s components/icons
 * pickers). Run after `vp pack` (`dist/` is otherwise cleaned by the build).
 */
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCssDocModel as buildModel, writeCssDocModel } from "@pantoken/cssdoc-model";

/** Build the published provider model in the cssdoc `CssDocEntry[]` shape. */
export function buildCssDocModel(): ReturnType<typeof buildModel> {
  return buildModel([
    join(import.meta.dirname, "..", "generated", "components.css"),
    join(import.meta.dirname, "..", "generated", "utilities.css"),
  ]);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const model = buildCssDocModel();
  writeCssDocModel(model, join(import.meta.dirname, "..", "dist", "model.json"));
  console.log(`✓ components: wrote model.json (${model.length} model entries)`);
}
