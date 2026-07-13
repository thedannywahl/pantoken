import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const radioInputGroup = defineComponent({
  name: "radio-input-group",
  css: (p) => {
    const root = `.${p}radio-input-group`;
    const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
    const r = "var(--instui-component-radio-input-toggle-border-radius)";
    const bw = "var(--instui-component-radio-input-toggle-border-width)";
    // prettier-ignore
    return css`
/**
 * @component radio-input-group
 * @summary A single-select radio \`<fieldset>\`, plain or as a connected segmented toggle.
 * @modifier -layout-columns — Lay the radios out in columns.
 * @modifier -layout-inline — Lay the radios out inline.
 * @modifier -required — Mark the group as required.
 * @modifier -variant-toggle — Connect the child toggles into one segmented control.
 * @accessibility Renders a native \`<fieldset>\` with a \`<legend>\` that names the group; the child radios share one \`name\`, so only one can be selected at a time.
 * @example
 * <fieldset class="instui-radio-input-group -variant-toggle">
 *   <legend>T-shirt size</legend>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size" checked> Small</label>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Medium</label>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Large</label>
 * </fieldset>
 * @structure
 * .instui-radio-input-group.-variant-toggle {
 *   legend {}
 *   .instui-radio.-variant-toggle {
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
/* toggle variant: connect the child .instui-radio.-variant-toggle buttons into one segmented control */
${root}.-variant-toggle {
  flex-flow: row wrap;
  align-items: center;
}
${root}.-variant-toggle > legend { flex-basis: 100%; }
${root}.-variant-toggle > .${p}radio { border-radius: 0; position: relative; }
${root}.-variant-toggle > .${p}radio:first-of-type {
  border-start-start-radius: ${r};
  border-end-start-radius: ${r};
}
${root}.-variant-toggle > .${p}radio:last-of-type {
  border-start-end-radius: ${r};
  border-end-end-radius: ${r};
}
${root}.-variant-toggle > .${p}radio + .${p}radio { margin-inline-start: calc(-1 * ${bw}); }
${root}.-variant-toggle > .${p}radio:has(input:checked) { z-index: 1; }`;
  },
});

export const radioInputGroupCss = radioInputGroup.css;
