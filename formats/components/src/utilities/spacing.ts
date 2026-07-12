/**
 * The spacing utilities — margin/padding classes on the pantoken spacing scale, with logical sides.
 *
 * @module
 */
import { defineUtility } from "../lib/define.ts";
import { SPACING_SIDES, SPACING_STEPS } from "../lib/helpers.ts";

export const spacing = defineUtility({
  name: "spacing",
  css: (p) => {
    const rules: string[] = [];
    for (const [prop, letters, steps] of [
      ["margin", ["m", "margin"], { ...SPACING_STEPS, auto: "auto" }],
      ["padding", ["p", "padding"], SPACING_STEPS],
    ] as const) {
      for (const letter of letters) {
        for (const [side, suffix] of Object.entries(SPACING_SIDES)) {
          for (const [step, value] of Object.entries(steps)) {
            rules.push(`.${p}${letter}${side}-${step} { ${prop}${suffix}: ${value}; }`);
          }
        }
      }
    }
    return `/**
 * @utility spacing
 * @class .instui-p-md
 * @summary Margin and padding utilities — \`.instui-m<side>-<step>\` and \`.instui-p<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none; margin also takes \`auto\`).
 * @example
 * <div class="instui-p-md instui-mt-lg">Padded box with a large top margin.</div>
 */
${rules.join("\n")}`;
  },
});

export const spacingUtilitiesCss = spacing.css;
