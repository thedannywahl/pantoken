/**
 * The stacking utility — a global, dual copy of `@pantoken/plugin-stacking`'s `.instui-stack-<level>`
 * z-index scale (reusing the same class word), usable bare or chained onto any component.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

/** The stacking depths, deepest → topmost — same order and names as `@pantoken/plugin-stacking`. */
const STACKING_LEVELS = ["deepest", "below", "above", "topmost"] as const;

/** The stacking utility — `.instui-stack-<level>` z-index classes, global and dual. */
export const stacking: Definition = defineUtility({
  name: "stacking",
  css: (p) => {
    const rules = STACKING_LEVELS.map((level) => {
      const selectors = globalSelectors(p, `.${p}stack-${level}`, `.-stack-${level}`);
      return `${selectors.join(", ")} { z-index: var(--instui-component-view-stacking-${level}); }`;
    });
    // prettier-ignore
    return css`/**
 * @utility stacking
 * @selector .instui-stack-topmost
 * @global
 * @summary z-index depth utilities — \`.instui-stack-<level>\` (\`deepest\`, \`below\`, \`above\`, \`topmost\`) — usable bare or chained onto any component, so layers stack predictably instead of by hand-tuned numbers.
 * @modifier -stack-deepest — The lowest stacking depth.
 * @modifier -stack-below — Below the default flow.
 * @modifier -stack-above — Above the default flow.
 * @modifier -stack-topmost — The highest stacking depth (overlays, menus).
 * @example
 * <div class="instui-stack-topmost">Always on top.</div>
 */
${rules.join("\n")}`;
  },
});

/** The stacking utility as a standalone, header-wrapped stylesheet. */
export const stackingUtilityCss: Definition["css"] = stacking.css;
