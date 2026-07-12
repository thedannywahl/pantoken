import { defineComponent } from "../lib/define.ts";
import { ALERT_CIRCLE_ICON, CHECK_CIRCLE_ICON } from "../lib/helpers.ts";

export const formFieldMessages = defineComponent({
  name: "form-field-messages",
  css: (p) => {
    const m = (s: string): string => `var(--instui-component-form-field-message-${s})`;
    return `
/**
 * @component form-field-messages
 * @summary Field help and validation messages — hint, error, success, and screen-reader-only — with a glyph on error and success.
 * @modifier -type-new-error — @deprecated {@link -type-error}
 */
.${p}form-field-messages {
  display: flex;
  flex-direction: column;
  gap: var(--instui-component-form-field-layout-gap-primitives);
}
.${p}form-field-message {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: ${m("font-family")};
  font-size: ${m("font-size")};
  font-weight: ${m("font-weight")};
  line-height: ${m("line-height")};
  color: ${m("hint-text-color")};
}
.${p}form-field-message.-type-hint { color: ${m("hint-text-color")}; }
.${p}form-field-message.-type-error { color: ${m("error-text-color")}; }
.${p}form-field-message.-type-success { color: ${m("success-text-color")}; }
.${p}form-field-message.-type-error::before,
.${p}form-field-message.-type-success::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
}
.${p}form-field-message.-type-error::before { -webkit-mask: ${ALERT_CIRCLE_ICON}; mask: ${ALERT_CIRCLE_ICON}; }
.${p}form-field-message.-type-success::before { -webkit-mask: ${CHECK_CIRCLE_ICON}; mask: ${CHECK_CIRCLE_ICON}; }
.${p}form-field-message.-type-screenreader-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}`;
  },
});

export const formFieldMessagesCss = formFieldMessages.css;
