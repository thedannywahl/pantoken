/**
 * Generate the `cli.ai` locale message bundles (agent asset content itself is inlined by
 * `@pantoken/scaffold`'s generate script now, and re-exported from there).
 */
import { mkdirSync } from "node:fs";
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
