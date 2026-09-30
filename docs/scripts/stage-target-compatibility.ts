import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const sourceDir = join(docsRoot, "../scripts/release");
const publicDir = join(docsRoot, "public");

mkdirSync(join(publicDir, "schemas"), { recursive: true });
copyFileSync(
  join(sourceDir, "target-compatibility.json"),
  join(publicDir, "target-compatibility.json"),
);
copyFileSync(
  join(sourceDir, "target-compatibility.schema.json"),
  join(publicDir, "schemas/target-compatibility.schema.json"),
);

console.log("staged target compatibility registry and schema to docs/public/");
