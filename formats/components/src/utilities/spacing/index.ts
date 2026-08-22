/**
 * The spacing utilities — margin/padding classes on the pantoken spacing scale, with logical sides,
 * each in a short spelling (`-mb-sm`) and a fully long, word-spelled one (`-margin-bottom-small`).
 *
 * Each rule matches via `globalModifierSelector` (`@pantoken/utils`) — the modifier class repeated 3x
 * for a deterministic specificity win, applying to any registered component (core or plugin-authored)
 * or standalone, with a single fixed-size selector per rule, no per-component fan-out. This replaced an
 * earlier bare-only fallback that avoided a real ~3s/940KB generation-time regression from enumerating
 * ~70 components per rule under the old mechanism.
 *
 * @module
 */
import { defineUtility, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";
import {
  SPACING_AUTO_STEP,
  SPACING_PROPERTIES,
  SPACING_SIDES,
  SPACING_STEPS,
  type SpacingProperty,
  type SpacingStep,
} from "../../lib/helpers.ts";
import { globalModifierSelector } from "@pantoken/utils";

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

/**
 * Short spellings (`-m-sm`) and the legacy long-property-word twin (`-margin-sm`) — concatenated
 * side, short step. Unchanged shape from before the long spelling existed.
 */
function shortAndLegacyRules(p: string): string[] {
  const rules: string[] = [];
  for (const property of SPACING_PROPERTIES) {
    const stepEntries = legacyStepEntries(stepsFor(property));
    for (const letter of [property.short, property.long]) {
      for (const side of SPACING_SIDES) {
        for (const [step, value] of stepEntries) {
          const name = `${letter}${side.short}-${step}`;
          rules.push(
            `${globalModifierSelector(p, name)} { ${property.css}${side.suffix}: ${value}; }`,
          );
        }
      }
    }
  }
  return rules;
}

/**
 * Fully long, dash-separated spellings — property word, side word, and step word all spelled out
 * (`-margin-bottom-small`). A handful of these collide with a "no side" legacy long selector above
 * (e.g. `-margin-none`, `-margin-auto`) — harmless duplicate rules, not worth special-casing.
 */
function fullyLongRules(p: string): string[] {
  const rules: string[] = [];
  for (const property of SPACING_PROPERTIES) {
    for (const side of SPACING_SIDES) {
      for (const step of stepsFor(property)) {
        const sidePart = side.long ? `${side.long}-` : "";
        const name = `${property.long}-${sidePart}${step.long}`;
        rules.push(
          `${globalModifierSelector(p, name)} { ${property.css}${side.suffix}: ${step.value}; }`,
        );
      }
    }
  }
  return rules;
}

/** The spacing utility — margin and padding classes on the spacing scale, with logical sides. */
export const spacing: Definition = defineUtility({
  name: "spacing",
  css: (p) => {
    const rules = [...shortAndLegacyRules(p), ...fullyLongRules(p)];

    // prettier-ignore
    return css`/**
 * @utility spacing
 * @selector .--p-md
 * @global
 * @summary Margin and padding utilities — \`.--m<side>-<step>\` / \`.--margin-<side>-<step>\` and \`.--p<side>-<step>\` / \`.--padding-<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none, spelled short or fully long — for example \`--mb-sm\` and \`--margin-bottom-small\` are the same rule; margin also takes \`auto\`). Usable bare or chained onto any component (for example \`class="instui-view --mb-sm"\`).
 * @modifier --p-md — Applies medium padding on all sides.
 * @modifier --m* — Margin utilities across short, legacy-long, and fully long spellings.
 * @modifier --p* — Padding utilities across short, legacy-long, and fully long spellings.
 * @demo self:spacing
 * @example
 * <div class="--p-md --mt-lg">Padded box with a large top margin.</div>
 */
${rules.join("\n")}`;
  },
});

/** The spacing utilities as a standalone, header-wrapped stylesheet. */
export const spacingUtilitiesCss: Definition["css"] = spacing.css;
