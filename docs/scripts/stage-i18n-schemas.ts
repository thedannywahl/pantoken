/** Publish i18n JSON schemas at the stable `$id` URLs referenced from i18n.json files. */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const sourceDir = join(docsRoot, "../tools/i18n-engine");
const publicDir = join(docsRoot, "public/schemas");
const files = ["i18n.source.schema.json", "i18n.config.schema.json"];

mkdirSync(publicDir, { recursive: true });
for (const file of files) {
  copyFileSync(join(sourceDir, file), join(publicDir, file));
}

console.log("staged i18n schemas to public/schemas/");
