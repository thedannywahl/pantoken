/** Publish first-party manifest schemas at their stable pantoken.app URLs. */
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const repoRoot = join(docsRoot, "..");
const publicDir = join(docsRoot, "public");
const files = [
  [
    join(repoRoot, "formats/interactions/component-capabilities.schema.json"),
    join(publicDir, "component-capabilities.schema.json"),
  ],
  [
    join(docsRoot, "schemas/cdn-plugin-manifest.schema.json"),
    join(publicDir, "schemas/cdn-plugin-manifest.schema.json"),
  ],
  [
    join(docsRoot, "schemas/icon-manifest.schema.json"),
    join(publicDir, "schemas/icon-manifest.schema.json"),
  ],
];

for (const [source, destination] of files) {
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(source, destination);
}

console.log("staged published manifest schemas to public/");
