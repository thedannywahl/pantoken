import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const formField = defineComponent({
  name: "form-field",
  summary:
    "A form-field wrapper: a label, its controls, and inline, required, or readonly layouts.",
  modifiers: [
    { name: "-inline", description: "Inline layout (shorthand for `-layout-inline`)." },
    { name: "-layout-inline", description: "Inline layout: label beside the controls." },
    { name: "-layout-stacked", description: "Stacked layout: label above the controls." },
    { name: "-label-align-start", description: "Start-align the label text." },
    { name: "-label-align-end", description: "End-align the label text." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-v-align-top", description: "Top-align the label with the controls." },
    { name: "-v-align-bottom", description: "Bottom-align the label with the controls." },
  ],
  parts: [
    { name: ".label", description: "The field label." },
    { name: ".controls", description: "The control area beside or below the label." },
  ],
  examples: [
    `<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" placeholder="you@example.com"></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
    <span class="instui-form-field-message -type-error">Enter a valid email address.</span>
  </div>
</label>`,
  ],
  structure: `.instui-form-field
  .label
  .controls
    .instui-text-input
  .instui-form-field-messages
    .instui-form-field-message.-type-hint
    .instui-form-field-message.-type-error`,
  css: (p) => {
    const root = `.${p}form-field`;
    const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
    return `
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
