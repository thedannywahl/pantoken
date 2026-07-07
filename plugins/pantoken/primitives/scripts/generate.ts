/**
 * Emit `generated/primitives.css` — the opt-in primitive-palette utility classes, at the default
 * `instui` prefix. Consumers who need a different prefix call `primitivesCss({ prefix })` themselves.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tokens } from "@pantoken/tokens";
import { primitivesCss } from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

// Full token names under a primitive family prefix.
const family = (prefix: string): string[] =>
  tokens
    .filter((t) => t.name.startsWith(prefix))
    .map((t) => t.name)
    .sort();

const css = primitivesCss(
  {
    color: family("--instui-primitive-color-"),
    fontFamily: family("--instui-primitive-font-family-"),
    fontWeight: family("--instui-primitive-font-weight-"),
  },
  { prefix: "instui" },
);

writeFileSync(join(outDir, "primitives.css"), css);
console.log(`✓ primitives: wrote primitives.css (${css.split("\n").length} lines)`);
