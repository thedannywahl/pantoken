import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { byTheme } from "@pantoken/tokens";
import { toVanillaVariables } from "../src/to-variables.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "variables.json"),
  `${JSON.stringify(toVanillaVariables(byTheme("rebrand")), null, 2)}\n`,
);
console.log("✓ wrote variables.json");
