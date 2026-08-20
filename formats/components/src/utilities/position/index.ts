/**
 * The position utility — CSS `position` as composable, globally-available classes (bare, or chained
 * onto any component) — copied from `view`'s former `-position-*` modifiers.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

const POSITIONS = ["static", "relative", "absolute", "fixed", "sticky"] as const;

/** The position utility — `position` as composable, global classes. */
export const position: Definition = defineUtility({
  name: "position",
  css: (p) => {
    const rules = POSITIONS.map((value) => {
      const selectors = globalSelectors(p, `.${p}position-${value}`, `.-position-${value}`);
      return `${selectors.join(", ")} { position: ${value}; }`;
    });
    // prettier-ignore
    return css`/**
 * @utility position
 * @selector .instui-position-relative
 * @global
 * @summary \`position\` as a composable, global class — \`.instui-position-<value>\` — usable bare or chained onto any component (\`.instui-button.-position-relative\`).
 * @modifier -position-static — position: static.
 * @modifier -position-relative — position: relative.
 * @modifier -position-absolute — position: absolute.
 * @modifier -position-fixed — position: fixed.
 * @modifier -position-sticky — position: sticky.
 * @example
 * <div class="instui-position-relative">…</div>
 */
${rules.join("\n")}`;
  },
});

/** The position utility as a standalone, header-wrapped stylesheet. */
export const positionUtilitiesCss: Definition["css"] = position.css;
