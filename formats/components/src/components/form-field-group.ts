import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const formFieldGroup = defineComponent({
  name: "form-field-group",
  css: (p) => {
    const root = `.${p}form-field-group`;
    const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
    // prettier-ignore
    return css`
/**
 * @component form-field-group
 * @summary A \`<fieldset>\` group with a legend, a column or inline layout, and configurable spacing.
 * @modifier -col-spacing-none — No column gap.
 * @modifier -col-spacing-small — Small column gap.
 * @modifier -col-spacing-medium — Medium column gap.
 * @modifier -col-spacing-large — Large column gap.
 * @modifier -row-spacing-none — No row gap.
 * @modifier -row-spacing-small — Small row gap.
 * @modifier -row-spacing-medium — Medium row gap.
 * @modifier -row-spacing-large — Large row gap.
 * @modifier -layout-aligned — Align child fields to a shared grid.
 * @modifier -layout-columns — Lay child fields out in columns.
 * @modifier -layout-inline — Lay child fields inline, in a row.
 * @modifier -required — Mark the group as required.
 * @modifier -v-align-top — Top-align the fields.
 * @modifier -v-align-middle — Middle-align the fields.
 * @modifier -v-align-bottom — Bottom-align the fields.
 * @accessibility Renders a native \`<fieldset>\` with a \`<legend>\`, so the legend text names the whole group for assistive tech.
 * @compat The \`-layout-aligned\` mode uses CSS subgrid behind an \`@supports\` guard; where subgrid is unsupported, the fields fall back to their own stacked layout.
 * @example
 * <fieldset class="instui-form-field-group -layout-columns -col-spacing-medium">
 *   <legend>Shipping address</legend>
 *   <label class="instui-form-field">
 *     <span class="label">First name</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">Last name</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">City</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">State</span>
 *     <span class="controls">
 *       <select class="instui-simple-select">
 *         <option>CA</option>
 *         <option>NY</option>
 *         <option>TX</option>
 *       </select>
 *     </span>
 *   </label>
 *   <div class="instui-form-field-messages">
 *     <span class="instui-form-field-message -type-hint">All fields are used for delivery only.</span>
 *   </div>
 * </fieldset>
 * @structure
 * .instui-form-field-group.-layout-columns.-col-spacing-medium {
 *   legend {}
 *   .instui-form-field {}
 *   .instui-form-field-messages {}
 * }
 * @related form-field — The single field this group repeats.
 * @related radio-input-group — Groups radio inputs under a legend.
 */
${root} {
  display: grid;
  grid-template-columns: 1fr;
  gap: ${L("gap-inputs")};
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
${root} > legend {
  grid-column: 1 / -1;
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
${root}.-layout-columns,
${root}.-layout-inline {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
${root}.-row-spacing-none { row-gap: 0; }
${root}.-row-spacing-small { row-gap: var(--instui-spacing-space-sm); }
${root}.-row-spacing-medium { row-gap: var(--instui-spacing-space-md); }
${root}.-row-spacing-large { row-gap: var(--instui-spacing-space-lg); }
${root}.-col-spacing-none { column-gap: 0; }
${root}.-col-spacing-small { column-gap: var(--instui-spacing-space-sm); }
${root}.-col-spacing-medium { column-gap: var(--instui-spacing-space-md); }
${root}.-col-spacing-large { column-gap: var(--instui-spacing-space-lg); }
${root}.-v-align-top { align-items: start; }
${root}.-v-align-middle { align-items: center; }
${root}.-v-align-bottom { align-items: end; }
/* -layout-aligned: the group's inline fields share one [label | controls] grid via subgrid, so every
   label lines up in a single column (Chromium/Firefox). Inert where subgrid is unsupported — the fields
   just fall back to their own stacked layout. */
@supports (grid-template-columns: subgrid) {
  ${root}.-layout-aligned {
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  ${root}.-layout-aligned > .${p}form-field {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    grid-template-areas: "label controls" ". messages";
    align-items: center;
  }
}`;
  },
});

export const formFieldGroupCss = formFieldGroup.css;
