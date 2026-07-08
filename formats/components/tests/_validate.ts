/**
 * Shared test helper: assert a {@link Definition} is well-formed — its emitted CSS parses to exactly
 * one `@cssdoc/core` record of the declared kind/name, and every `var(--instui-*)` it references exists
 * in the token IR. Reuses the real cssdoc parser (not a regex) so the per-record guard matches the
 * emitter's own view of the record.
 *
 * @module
 */
import { parseCssDocs } from "@cssdoc/core";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import type { Definition } from "../src/lib/define.ts";

// Elevation shadows and the focus ring are declared by the sheets themselves, not the base token IR.
const isLocal = (ref: string): boolean =>
  ref.startsWith("--instui-elevation-") || ref.startsWith("--instui-focus-outline-");

/** Assert a definition is well-formed; throws (naming the record) on the first problem. */
export function validate(def: Definition): void {
  const css = def.css({ prefix: "instui" });
  const entries = parseCssDocs(css);
  if (entries.length !== 1)
    throw new Error(`${def.name}: expected exactly one cssdoc record, got ${entries.length}`);
  const [entry] = entries;
  if (entry.kind !== def.meta.kind)
    throw new Error(`${def.name}: parsed kind "${entry.kind}" ≠ declared "${def.meta.kind}"`);
  if (entry.name !== def.meta.name)
    throw new Error(`${def.name}: parsed name "${entry.name}" ≠ declared "${def.meta.name}"`);
  const drift = unknownReferences(css, tokens).filter((r) => !isLocal(r));
  if (drift.length) throw new Error(`${def.name}: unknown token reference(s): ${drift.join(", ")}`);
}
