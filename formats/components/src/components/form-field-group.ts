import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formFieldGroup as formFieldGroupRaw } from "../generated/component-styles.ts";

/** The `formFieldGroup` component record: a `<fieldset>` group with a legend, a column or inline layout, and configurable spacing. */
export const formFieldGroup: Definition = defineComponent({
  name: "form-field-group",
  css: (p) => formFieldGroupRaw.replaceAll(SENTINEL, p),
});
/** Standalone `formFieldGroup` stylesheet — the prefixed CSS for the fieldset group, ready to ship as a `.css` file. */
export const formFieldGroupCss: Definition["css"] = formFieldGroup.css;
