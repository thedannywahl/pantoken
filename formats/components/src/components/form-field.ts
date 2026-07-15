import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const formField = defineComponent({
  name: "form-field",
  css: (p) => {
    const root = `.${p}form-field`;
    const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
    // prettier-ignore
    return css`
/**
 * @component form-field
 * @summary A form-field wrapper: a label, its controls, and inline, required, or readonly layouts.
 * @remarks An error message stays hidden until the field's control is \`:user-invalid\` (after the user interacts) or you add the \`-invalid\` class. Use \`-layout-inline\` to put the label beside the controls and \`-layout-stacked\` to put it above.
 * @modifier -inline — Inline layout (shorthand for \`-layout-inline\`).
 * @modifier -layout-inline — Inline layout: label beside the controls.
 * @modifier -layout-stacked — Stacked layout: label above the controls.
 * @modifier -label-align-start — Start-align the label text.
 * @modifier -label-align-end — End-align the label text.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -v-align-top — Top-align the label with the controls.
 * @modifier -v-align-bottom — Bottom-align the label with the controls.
 * @part .label — The field label.
 * @part .controls — The control area beside or below the label.
 * @pseudo ::after — Renders the decorative required-field asterisk after the label text when the field is required.
 * @accessibility The \`<label>\` element wraps the control, so the label text names it natively; the required asterisk is decorative and should be hidden from assistive tech (aria-hidden), and the error message surfaces once the control is \`:user-invalid\` or you add the \`-invalid\` class.
 * @compat Contains its element styles with the CSS \`@scope\` at-rule; needs a recent Chromium, Firefox, or Safari.
 * @example
 * <label class="${p}form-field">
 *   <span class="label">Email address</span>
 *   <span class="controls"><input class="${p}text-input" type="email" placeholder="you@example.com"></span>
 *   <div class="${p}form-field-messages">
 *     <span class="${p}form-field-message -type-hint">We'll never share it.</span>
 *     <span class="${p}form-field-message -type-error">Enter a valid email address.</span>
 *   </div>
 * </label>
 * @structure
 * .${p}form-field {
 *   .label {}
 *   .controls {
 *     .${p}text-input {}
 *   }
 *   .${p}form-field-messages {}
 * }
 * @related form-field-messages — Renders the field's hint, error, and success messages.
 * @related form-field-group — Groups related fields under a shared legend.
 */
${root} {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "label" "controls" "messages";
  gap: ${L("gap-inputs")};
  color: ${L("text-color")};
  font-family: ${L("font-family")};
}
${scope(
  root,
  `
${root} .label {
  grid-area: label;
  color: ${L("text-color")};
  font-family: ${L("font-family")};
  font-weight: ${L("font-weight")};
  font-size: ${L("font-size")};
  line-height: ${L("line-height")};
}
${root} .controls { grid-area: controls; }
`,
  ["label", "controls"],
)}
/* Messages region — kept OUTSIDE @scope: the messages class shares the form-field prefix. */
${root} > .${p}form-field-messages { grid-area: messages; }
/* Client-side validation: an error message stays hidden until the field's control is :user-invalid
   (after the user has interacted), per MDN guidance; then it shows. The explicit -invalid class on the
   control (and a standalone .instui-form-field-messages outside a field) are unaffected. */
${root} .${p}form-field-message.-type-error,
${root} .${p}form-field-message.-type-new-error { display: none; }
${root}:has(:user-invalid) .${p}form-field-message.-type-error,
${root}:has(:user-invalid) .${p}form-field-message.-type-new-error,
${root}.-invalid .${p}form-field-message.-type-error,
${root}.-invalid .${p}form-field-message.-type-new-error { display: inline-flex; }
/* Required indicator: native [required] control OR the -required class; decorative (aria-hidden). */
${root}:is(.-required, :has(:required)) .label::after {
  content: "*";
  margin-inline-start: 0.25rem;
  color: ${L("asterisk-color")};
}
${root}.-readonly .label { color: ${L("readonly-text-color")}; }
${root}.-layout-stacked { grid-template-columns: 1fr; grid-template-areas: "label" "controls" "messages"; }
${root}.-layout-inline {
  grid-template-columns: auto 1fr;
  grid-template-areas: "label controls" ". messages";
  align-items: center;
  column-gap: ${L("gap-primitives")};
}
${root}.-layout-inline.-v-align-top { align-items: start; }
${root}.-layout-inline.-v-align-bottom { align-items: end; }
${root}.-layout-inline.-label-align-start .label { text-align: start; }
${root}.-layout-inline.-label-align-end .label { text-align: end; }
${root}.-inline { display: inline-grid; inline-size: auto; }`;
  },
});

export const formFieldCss = formField.css;
