/**
 * Reference-integrity validation: check that generated output stays faithful to the token IR — no
 * references to tokens that don't exist (drift vs the source), and no `var()` refs left undefined
 * within a stylesheet.
 *
 * @module
 */
import type { Token } from "@pantoken/model";

/**
 * Every `--instui-*` custom-property name that appears anywhere in `text`.
 *
 * @example
 * ```ts
 * import { extractInstuiRefs } from "@pantoken/utils";
 *
 * extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
 * // → Set { "--instui-color-text-base" }
 * ```
 */
export function extractInstuiRefs(text: string): Set<string> {
  return new Set([...text.matchAll(/--instui-[\w-]+/g)].map((m) => m[0]));
}

/**
 * The set of token names an IR defines.
 *
 * @example
 * ```ts
 * import { tokenNames } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 * ];
 * tokenNames(ir); // → Set { "--instui-leaf" }
 * ```
 */
export function tokenNames(ir: readonly Token[]): Set<string> {
  return new Set(ir.map((t) => t.name));
}

/**
 * Drift check: `--instui-*` names in `text` that the IR doesn't define (sorted; empty means no
 * drift). Use for outputs that *reference* tokens defined elsewhere — e.g. the docusaurus/vitepress
 * bridges, whose `var(--instui-*)` targets must all be real tokens.
 *
 * @param text - The generated output.
 * @param ir - The source token IR.
 * @returns The unknown token names.
 *
 * @example
 * ```ts
 * import { unknownReferences } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 * ];
 *
 * unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
 * // → ["--instui-gone"]
 * unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
 * ```
 */
export function unknownReferences(text: string, ir: readonly Token[]): string[] {
  const names = tokenNames(ir);
  return [...extractInstuiRefs(text)].filter((name) => !names.has(name)).sort();
}

/**
 * Self-containment check: `--instui-*` names referenced via `var()` in a stylesheet that it never
 * defines (as an `@property` registration or a `--x:` declaration). Sorted; empty means every
 * reference resolves within the same output. Use for self-contained stylesheets (css, pendo).
 *
 * @param css - The generated stylesheet.
 * @returns The dangling reference names.
 *
 * @example
 * ```ts
 * import { danglingReferences } from "@pantoken/utils";
 *
 * // Self-contained: the referenced property is also defined here.
 * danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []
 *
 * // Dangling: `--instui-b` is referenced but never defined.
 * danglingReferences(
 *   ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
 * ); // → ["--instui-b"]
 * ```
 */
export function danglingReferences(css: string): string[] {
  const referenced = new Set([...css.matchAll(/var\(\s*?(--instui-[\w-]+)/g)].map((m) => m[1]));
  const defined = new Set<string>();
  for (const m of css.matchAll(/@property\s+(--instui-[\w-]+)/g)) defined.add(m[1]);
  for (const m of css.matchAll(/(--instui-[\w]+(?:-[\w]+)*)\s*:/g)) defined.add(m[1]);
  return [...referenced].filter((name) => !defined.has(name)).sort();
}
