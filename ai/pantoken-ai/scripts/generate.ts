/**
 * Generate the `cli.ai` locale message bundles (agent asset content itself is inlined by
 * `@pantoken/scaffold`'s generate script now, and re-exported from there).
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { generateMessageBundles, loadConfig } from "@pantoken/i18n-engine";
import { LOCALES } from "./lib/locales.ts";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "generated");
mkdirSync(outDir, { recursive: true });

generateMessageBundles(
  loadConfig(resolve(root, "../../i18n.config.json")),
  resolve(root, "../.."),
  "cli.ai",
  Object.keys(LOCALES),
  outDir,
);

const skillNames = [
  "init-pantoken",
  "create-pantoken-app",
  "create-pantoken-mockup",
  "use-pantoken-registry",
  "use-a2ui",
] as const;
for (const name of skillNames) {
  const source = resolve(root, "../../packages/scaffold/skills", name, "SKILL.md");
  const targetDir = join(root, "skills", name);
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(source, join(targetDir, "SKILL.md"));
}
