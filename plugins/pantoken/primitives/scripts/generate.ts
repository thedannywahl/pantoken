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

// The cssdoc `@utility` record. cssdoc binds a doc comment to the next rule, skipping the plain banner
// comment `primitivesCss` leads with, so it attaches to the first `.instui-bg-primitive-color-*` class.
const DOC = `/**
 * @utility primitives
 * @class .instui-bg-primitive-color-white
 * @summary Opt-in utility classes for the raw primitive palette: \`.instui-bg-\`/\`fg-\`/\`border-primitive-color-<name>\` paint a colour from the primitive colour tokens, plus \`font-family\`/\`font-weight\` utilities for the primitive font tokens. Kept out of the semantic utilities so overrides there stay semantic-only.
 * @example
 * <div class="instui-bg-primitive-color-white instui-fg-primitive-color-aurora-aurora70">Primitive-painted box.</div>
 */`;

const css = primitivesCss(
  {
    color: family("--instui-primitive-color-"),
    fontFamily: family("--instui-primitive-font-family-"),
    fontWeight: family("--instui-primitive-font-weight-"),
  },
  { prefix: "instui" },
);

writeFileSync(join(outDir, "primitives.css"), `${DOC}\n${css}`);
console.log(`✓ primitives: wrote primitives.css (${css.split("\n").length} lines)`);
