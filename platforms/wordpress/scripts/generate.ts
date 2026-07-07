/**
 * Vendor the `rebrand` theme.json from the pantoken IR at build time.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { byTheme } from "@pantoken/tokens";
import { toThemeJson } from "../src/to-theme-json.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "theme.json"),
  `${JSON.stringify(toThemeJson(byTheme("rebrand")), null, 2)}\n`,
);
console.log("✓ wrote theme.json");
