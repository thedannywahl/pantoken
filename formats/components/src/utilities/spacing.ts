/**
 * The spacing utilities — margin/padding classes on the pantoken spacing scale, with logical sides.
 *
 * @module
 */
import { defineUtility, type Definition } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { COMPONENTS } from "../components/index.ts";
import { SPACING_SIDES, SPACING_STEPS } from "../lib/helpers.ts";

const COMPONENT_CLASS_NAMES = COMPONENTS.filter((entry) => entry.kind === "component").map(
  (entry) => entry.name,
);

/** The spacing utility — margin and padding classes on the spacing scale, with logical sides. */
export const spacing: Definition = defineUtility({
  name: "spacing",
  css: (p) => {
    const rules: string[] = [];
    const componentAliases = (modifier: string): string[] =>
      COMPONENT_CLASS_NAMES.map((name) => `.${p}${name}.${modifier}`);
    for (const [prop, letters, steps] of [
      ["margin", ["m", "margin"], { ...SPACING_STEPS, auto: "auto" }],
      ["padding", ["p", "padding"], SPACING_STEPS],
    ] as const) {
      for (const letter of letters) {
        for (const [side, suffix] of Object.entries(SPACING_SIDES)) {
          for (const [step, value] of Object.entries(steps)) {
            const modifier = `-${letter}${side}-${step}`;
            const selectors = [`.${p}${letter}${side}-${step}`, ...componentAliases(modifier)];
            rules.push(`${selectors.join(", ")} { ${prop}${suffix}: ${value}; }`);
          }
        }
      }
    }
    // prettier-ignore
    return css`/**
 * @utility spacing
 * @class .instui-p-md
 * @summary Margin and padding utilities — \`.instui-m<side>-<step>\` and \`.instui-p<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none; margin also takes \`auto\`). Every utility also has a component-attached alias modifier (for example \`-mb-sm\` on any \`.instui-<component>\`).
 * @example
 * <div class="instui-p-md instui-mt-lg">Padded box with a large top margin.</div>
 */
${rules.join("\n")}`;
  },
});

/** The spacing utilities as a standalone, header-wrapped stylesheet. */
export const spacingUtilitiesCss: Definition["css"] = spacing.css;
