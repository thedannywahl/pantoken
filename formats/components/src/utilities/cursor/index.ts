/**
 * The cursor utility — CSS `cursor` as composable, globally-available classes (bare, or chained onto
 * any component) — copied from `view`'s former `-cursor-*` modifiers.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

const CURSORS = [
  "auto",
  "default",
  "pointer",
  "not-allowed",
  "text",
  "move",
  "grab",
  "wait",
] as const;

/** Build CSS rules for a property/value map. Helper for cursor/position utilities. */
const buildPropertyRules = (
  p: string,
  prefix: string,
  property: string,
  values: readonly string[],
): string[] =>
  values.map((value) => {
    const selectors = globalSelectors(p, `.${p}${prefix}-${value}`, `.-${prefix}-${value}`);
    return `${selectors.join(", ")} { ${property}: ${value}; }`;
  });

/** The cursor utility — `cursor` as composable, global classes. */
export const cursor: Definition = defineUtility({
  name: "cursor",
  css: (p) => {
    const rules = buildPropertyRules(p, "cursor", "cursor", Array.from(CURSORS));
    // prettier-ignore
    return css`/**
 * @utility cursor
 * @selector .instui-cursor-pointer
 * @global
 * @summary \`cursor\` as a composable, global class — \`.instui-cursor-<value>\` — usable bare or chained onto any component (\`.instui-button.-cursor-pointer\`).
 * @modifier -cursor-auto — cursor: auto.
 * @modifier -cursor-default — cursor: default.
 * @modifier -cursor-pointer — cursor: pointer.
 * @modifier -cursor-not-allowed — cursor: not-allowed.
 * @modifier -cursor-text — cursor: text.
 * @modifier -cursor-move — cursor: move.
 * @modifier -cursor-grab — cursor: grab.
 * @modifier -cursor-wait — cursor: wait.
 * @example
 * <div class="instui-cursor-pointer">…</div>
 */
${rules.join("\n")}`;
  },
});

/** The cursor utility as a standalone, header-wrapped stylesheet. */
export const cursorUtilitiesCss: Definition["css"] = cursor.css;
