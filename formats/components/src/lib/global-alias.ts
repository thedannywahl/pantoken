/**
 * Shared "dual selector" helper: every global utility modifier emits a bare, standalone class PLUS a
 * component-attached alias (`.instui-button.-mod`) for every real component, so a modifier like
 * `-bg-danger` or `-mb-sm` works both bare and chained onto anything. First proven by the spacing/gap
 * utilities; extracted here so every other global utility can reuse the same mechanism instead of
 * re-deriving its own component list.
 *
 * Lives in its own module (not `helpers.ts`) on purpose: `helpers.ts` is imported by every component
 * record, and importing `COMPONENTS` from here would create a cycle (`helpers.ts` → `components/index.ts`
 * → `<component>/index.ts` → `helpers.ts`). This module is only ever imported by utility builders and
 * `generate.ts`, which components themselves never import back.
 *
 * @module
 */
import { COMPONENTS } from "../components/index.ts";

/** Every real component's base class name — the chainable bases a global modifier can attach to. */
export const GLOBAL_ALIAS_TARGETS: readonly string[] = COMPONENTS.filter(
  (entry) => entry.kind === "component",
).map((entry) => entry.name);

/** A selector-list builder: bare selector + every `.<prefix><target>.<modifier>` compound. */
export const globalSelectors = (p: string, bareSelector: string, modifier: string): string[] => [
  bareSelector,
  ...GLOBAL_ALIAS_TARGETS.map((name) => `.${p}${name}${modifier}`),
];
