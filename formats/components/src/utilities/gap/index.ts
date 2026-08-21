/**
 * The gap utility — `gap` classes on the pantoken spacing scale, short (`-gap-sm`) and long
 * (`-gap-small`) spellings of the same rule.
 *
 * @module
 */
import { defineUtility, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";
import { SPACING_STEPS, utilityVariantRule } from "../../lib/helpers.ts";

/** `[key, value]` pairs for every step's short and long key, deduped (e.g. `"0"` and `"none"` both present). */
const STEP_ENTRIES: ReadonlyArray<readonly [string, string]> = (() => {
  const map = new Map<string, string>();
  for (const step of SPACING_STEPS) {
    map.set(step.short, step.value);
    map.set(step.long, step.value);
  }
  return [...map];
})();

/** The gap utility — `gap` classes on the spacing scale. No sides: `gap` isn't a logical property. */
export const gap: Definition = defineUtility({
  name: "gap",
  css: (p) => {
    const rules: string[] = [];
    const baseClass = `.${p}gap`;
    for (const [step, value] of STEP_ENTRIES) {
      // Bare modifier for composition (just the step, not repeated "gap")
      const bareModifier = `-${step}`;
      rules.push(
        utilityVariantRule(baseClass, "gap", bareModifier, `gap: ${value}`, `-gap${bareModifier}`),
      );
    }
    // prettier-ignore
    return css`/**
 * @utility gap
 * @selector .instui-gap-md
 * @global
 * @summary Flex/grid \`gap\` utilities on the spacing scale, short (\`-gap-sm\`) or long (\`-gap-small\`) spelling. Every utility also has a component-attached alias modifier (for example \`-gap-sm\` on any \`.instui-<component>\` or \`.instui-view\`) — components that already set their own \`gap\` from a component-specific token may have it overridden by this alias.
 * @demo self:gap
 * @example
 * <div class="instui-display-flex instui-gap-sm">
 *   <span>One</span>
 *   <span>Two</span>
 * </div>
 */
${rules.join("\n")}`;
  },
});

/** The gap utility as a standalone, header-wrapped stylesheet. */
export const gapCss: Definition["css"] = gap.css;
