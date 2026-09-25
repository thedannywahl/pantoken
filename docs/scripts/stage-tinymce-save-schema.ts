/** Publish the TinyMCE save export schema at the stable `$id` URL used by portable JSON files. */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const sourceDir = join(docsRoot, "../plugins/tinymce/save");
const publicDir = join(docsRoot, "public/schemas");
const file = "tinymce-save.export.schema.json";

mkdirSync(publicDir, { recursive: true });
copyFileSync(join(sourceDir, file), join(publicDir, file));

console.log("staged tinymce-save export schema to public/schemas/");
