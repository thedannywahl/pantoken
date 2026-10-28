/**
 * The layout utilities — `display` and `text-align` as composable, globally-available classes (bare,
 * or chained onto any component).
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalModifierSelector } from "@pantoken/utils";

/** The layout utility — composable, global `display` and `text-align` classes. */
export const layout: Definition = defineUtility({
  name: "layout",
  css: (p) => // prettier-ignore
  css`/**
 * @utility layout
 * @selector .--display-flex
 * @global
 * @summary Display and text-align utilities — \`.--display-<value>\` and \`.--text-align-<value>\` — as composable, global classes, usable bare or chained onto any component.
 * @modifier --display-flex — Sets \`display: flex\`.
 * @modifier --display-* — Display utilities: \`block\`, \`inline-block\`, \`inline\`, \`flex\`, \`inline-flex\`, and \`none\`.
 * @modifier --text-align-* — Text-alignment utilities: \`start\`, \`center\`, \`end\`, and \`justify\`.
 * @a11y \`--display-none\` removes an element from the accessibility tree as well as the screen, so use it only for content nobody needs. Flex and grid layout can't reorder content for assistive tech; keep the DOM order meaningful, and don't center or justify long passages of text.
 * @example -automatica11y
 * \`\`\`html
 * <div class="--display-flex --text-align-center">
 *   <span>Course</span>
 *   <span>Grades</span>
 * </div>
 * \`\`\`
 * @example
 * <div class="--display-flex --text-align-center">
 *   <span>One</span>
 *   <span>Two</span>
 * </div>
 */
${[
      ...["block", "inline-block", "inline", "flex", "inline-flex", "none"].map((v) => {
        const name = `display-${v}`;
        return `${globalModifierSelector(p, name)} { display: ${v}; }`;
      }),
      ...(
        [
          ["start", "start"],
          ["center", "center"],
          ["end", "end"],
          ["justify", "justify"],
        ] as const
      ).map(([label, value]) => {
        const name = `text-align-${label}`;
        return `${globalModifierSelector(p, name)} { text-align: ${value}; }`;
      }),
    ].join("\n")}`,
});

/** The layout utilities as a standalone, header-wrapped stylesheet. */
export const layoutUtilitiesCss: Definition["css"] = layout.css;
