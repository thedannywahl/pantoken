/**
 * The spacing utilities — margin/padding classes on the pantoken spacing scale, with logical sides,
 * each in a short spelling (`-mb-sm`) and a fully long, word-spelled one (`-margin-bottom-small`).
 *
 * @module
 */
import { defineUtility, type Definition } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { COMPONENTS } from "../components/index.ts";
import {
  SPACING_AUTO_STEP,
  SPACING_PROPERTIES,
  SPACING_SIDES,
  SPACING_STEPS,
  type SpacingProperty,
  type SpacingStep,
} from "../lib/helpers.ts";
import { view } from "./view.ts";

/** Every component base class, plus `view` — the chainable bases a spacing modifier can attach to. */
export const SPACING_ALIAS_TARGETS: readonly string[] = [
  ...COMPONENTS.filter((entry) => entry.kind === "component").map((entry) => entry.name),
  view.name,
];

/** The steps a boxed property takes — margin also gets `auto`. */
const stepsFor = (property: SpacingProperty): readonly SpacingStep[] =>
  property.css === "margin" ? [...SPACING_STEPS, SPACING_AUTO_STEP] : SPACING_STEPS;

/**
 * `[key, value]` pairs for the short/legacy loop below: one per step's short key, plus a `none` twin
 * for the zero step (both `-m-0` and `-m-none` have shipped since before the long spelling existed).
 */
const legacyStepEntries = (steps: readonly SpacingStep[]): Array<readonly [string, string]> =>
  steps.flatMap((step) =>
    step.short === "0"
      ? ([
          [step.short, step.value],
          [step.long, step.value],
        ] as const)
      : ([[step.short, step.value]] as const),
  );

/** The spacing utility — margin and padding classes on the spacing scale, with logical sides. */
export const spacing: Definition = defineUtility({
  name: "spacing",
  css: (p) => {
    const rules: string[] = [];
    const componentAliases = (modifier: string): string[] =>
      SPACING_ALIAS_TARGETS.map((name) => `.${p}${name}.${modifier}`);

    // Short spellings (`-m-sm`) and the legacy long-property-word twin (`-margin-sm`) — concatenated
    // side, short step. Unchanged shape from before the long spelling existed.
    for (const property of SPACING_PROPERTIES) {
      const stepEntries = legacyStepEntries(stepsFor(property));
      for (const letter of [property.short, property.long]) {
        for (const side of SPACING_SIDES) {
          for (const [step, value] of stepEntries) {
            const modifier = `-${letter}${side.short}-${step}`;
            const selectors = [
              `.${p}${letter}${side.short}-${step}`,
              ...componentAliases(modifier),
            ];
            rules.push(`${selectors.join(", ")} { ${property.css}${side.suffix}: ${value}; }`);
          }
        }
      }
    }

    // Fully long, dash-separated spellings — property word, side word, and step word all spelled out
    // (`-margin-bottom-small`). A handful of these collide with a "no side" legacy long selector above
    // (e.g. `-margin-none`, `-margin-auto`) — harmless duplicate rules, not worth special-casing.
    for (const property of SPACING_PROPERTIES) {
      for (const side of SPACING_SIDES) {
        for (const step of stepsFor(property)) {
          const sidePart = side.long ? `${side.long}-` : "";
          const name = `${property.long}-${sidePart}${step.long}`;
          const modifier = `-${name}`;
          const selectors = [`.${p}${name}`, ...componentAliases(modifier)];
          rules.push(`${selectors.join(", ")} { ${property.css}${side.suffix}: ${step.value}; }`);
        }
      }
    }

    // prettier-ignore
    return css`/**
 * @utility spacing
 * @class .instui-p-md
 * @summary Margin and padding utilities — \`.instui-m<side>-<step>\` / \`.instui-margin-<side>-<step>\` and \`.instui-p<side>-<step>\` / \`.instui-padding-<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none, spelled short or fully long — for example \`-mb-sm\` and \`-margin-bottom-small\` are the same rule; margin also takes \`auto\`). Every utility also has a component-attached alias modifier (for example \`-mb-sm\` on any \`.instui-<component>\` or \`.instui-view\`).
 * @demo self:spacing
 * @example
 * <div class="instui-p-md instui-mt-lg">Padded box with a large top margin.</div>
 */
${rules.join("\n")}`;
  },
});

/** The spacing utilities as a standalone, header-wrapped stylesheet. */
export const spacingUtilitiesCss: Definition["css"] = spacing.css;
