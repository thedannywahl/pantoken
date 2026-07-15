import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const radioInputGroup = defineComponent({
  name: "radio-input-group",
  css: (p) => {
    const root = `.${p}radio-input-group`;
    const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
    // prettier-ignore
    return css`
/**
 * @component radio-input-group
 * @summary A single-select radio \`<fieldset>\`, plain or as a connected segmented toggle.
 * @modifier -layout-columns — Lay the radios out in columns.
 * @modifier -layout-inline — Lay the radios out inline.
 * @modifier -required — Mark the group as required.
 * @modifier -variant-toggle — Lay the child toggles out as a segmented control (only the selected segment fills).
 * @pseudo ::after — Renders the decorative required-field asterisk after the legend text when the group is required.
 * @accessibility Renders a native \`<fieldset>\` with a \`<legend>\` that names the group; the child radios share one \`name\`, so only one can be selected at a time.
 * @example
 * <fieldset class="${p}radio-input-group -variant-toggle">
 *   <legend>T-shirt size</legend>
 *   <label class="${p}radio -variant-toggle"><input type="radio" name="size" checked> Small</label>
 *   <label class="${p}radio -variant-toggle"><input type="radio" name="size"> Medium</label>
 *   <label class="${p}radio -variant-toggle"><input type="radio" name="size"> Large</label>
 * </fieldset>
 * @structure
 * .${p}radio-input-group.-variant-toggle {
 *   legend {}
 *   .${p}radio.-variant-toggle {
 *     input {}
 *   }
 * }
 * @related radio — The individual control this group collects.
 * @related form-field-group — The general wrapper for grouping and laying out fields.
 */
${root} {
  display: flex;
  flex-direction: column;
  gap: ${L("gap-inputs")};
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
${root} > legend {
  padding: 0;
  margin-block-end: ${L("gap-primitives")};
  color: ${L("text-color")};
  font-family: ${L("font-family")};
  font-weight: ${L("font-weight")};
  font-size: ${L("font-size")};
  line-height: ${L("line-height")};
}
${root}.-required > legend::after {
  content: "*";
  margin-inline-start: 0.25rem;
  color: ${L("asterisk-color")};
}
/* simple variant: -layout-columns/-inline flow the standard radios into a wrapping row */
${root}.-layout-columns,
${root}.-layout-inline {
  flex-flow: row wrap;
  align-items: center;
  column-gap: var(--instui-spacing-space-md);
}
${root}.-layout-columns > legend,
${root}.-layout-inline > legend { flex-basis: 100%; }
/* toggle variant: lay the child .instui-radio.-variant-toggle segments out flush in a row — no gap and
   no borders, matching InstUI's colSpacing="none". The visible spacing between labels is each segment's
   own inline padding; only the checked segment paints a pill. Lift the focused segment so its focus ring
   isn't clipped by a neighbour. */
${root}.-variant-toggle {
  flex-flow: row wrap;
  align-items: center;
  gap: 0;
}
${root}.-variant-toggle > legend { flex-basis: 100%; }
${root}.-variant-toggle > .${p}radio:has(input:focus-visible) { z-index: 1; }`;
  },
});

export const radioInputGroupCss = radioInputGroup.css;
