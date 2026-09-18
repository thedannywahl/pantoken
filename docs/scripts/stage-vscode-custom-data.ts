/** Publish VS Code custom-data files at stable root URLs for editor configuration. */
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const sourceDir = join(docsRoot, "../packages/pantoken/dist");
const publicDir = join(docsRoot, "public");
const files = ["html-custom-data.json", "css-custom-data.json"];

mkdirSync(publicDir, { recursive: true });
for (const file of files) {
  copyFileSync(join(sourceDir, file), join(publicDir, file));
}

console.log("staged VS Code custom-data files to public/");
