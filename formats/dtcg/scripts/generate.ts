/**
 * Vendor a DTCG document per theme from the pantoken IR. Runs at build so the published package
 * ships static JSON with no dependency on `@pantoken/core` or the upstream tokens.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { byTheme } from "@pantoken/tokens";
import { toDtcg } from "../src/transform.ts";
import type { Theme } from "@pantoken/model";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

const THEMES: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];
for (const theme of THEMES) {
  const doc = toDtcg(byTheme(theme), "light");
  writeFileSync(join(outDir, `${theme}.json`), `${JSON.stringify(doc, null, 2)}\n`);
  console.log(`✓ dtcg ${theme}`);
}
