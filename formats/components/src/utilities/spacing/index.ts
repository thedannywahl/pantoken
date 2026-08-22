/**
 * The spacing utilities — margin/padding classes on the pantoken spacing scale, with logical sides,
 * each in a short spelling (`-mb-sm`) and a fully long, word-spelled one (`-margin-bottom-small`).
 *
 * Not dual-chained onto every real component (unlike gap/layout/overflow): the combined side x step x
 * property x short/long surface is large enough that fanning each rule out across ~70 components pushes
 * the alias post-processors' unanchored regex scans (`lib/aliases.ts`) into multi-second/near-hang
 * territory (confirmed while authoring) — the same tradeoff `responsive` already documents. Each rule
 * still carries a bare `.-mt-xl`-style dash modifier alongside the prefixed `.instui-mt-xl` class (a
 * flat, constant-factor addition), so the class works standalone or alongside any other class on the
 * same element.
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
          // Bare modifier for composition
          const bareModifier = `-${letter}${side.short}-${step}`;
          rules.push(
            `.${p}${bareModifier.slice(1)}, .${bareModifier} { ${property.css}${side.suffix}: ${value}; }`,
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
        // Bare modifier for composition
        const bareModifier = `-${name}`;
        rules.push(
          `.${p}${name}, .${bareModifier} { ${property.css}${side.suffix}: ${step.value}; }`,
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
 * @selector .instui-p-md
 * @global
 * @summary Margin and padding utilities — \`.instui-m<side>-<step>\` / \`.instui-margin-<side>-<step>\` and \`.instui-p<side>-<step>\` / \`.instui-padding-<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none, spelled short or fully long — for example \`-mb-sm\` and \`-margin-bottom-small\` are the same rule; margin also takes \`auto\`). Each class also ships as a bare, unprefixed dash modifier (\`-mb-sm\`) usable alongside any other class on the same element (for example \`class="instui-view -mb-sm"\`).
 * @demo self:spacing
 * @example
 * <div class="instui-p-md instui-mt-lg">Padded box with a large top margin.</div>
 */
${rules.join("\n")}`;
  },
});

/** The spacing utilities as a standalone, header-wrapped stylesheet. */
export const spacingUtilitiesCss: Definition["css"] = spacing.css;
