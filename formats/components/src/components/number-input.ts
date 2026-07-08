import { defineComponent } from "../lib/define.ts";
import { CHEVRON_UP_ICON, CHEVRON_DOWN_ICON } from "../lib/helpers.ts";
import { inputFacadeBase } from "../lib/field-controls.ts";

export const numberInput = defineComponent({
  name: "number-input",
  summary: "A number-input facade with a +/- spinner column.",
  modifiers: [
    { name: "-disabled", description: "Disabled state." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-success", description: "Success (valid) state." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  examples: [
    `<span class="instui-number-input">
  <input id="qty" type="number" value="1" aria-label="Quantity">
  <span class="arrows">
    <button type="button" id="up" aria-hidden="true"></button>
    <button class="down" type="button" id="down" aria-hidden="true"></button>
  </span>
</span>`,
  ],
  structure: `.instui-number-input
  input
  .arrows
    button
    .down`,
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    const a = (s: string): string => `var(--instui-component-text-input-arrows-${s})`;
    const root = `.${p}number-input`;
    return `
${inputFacadeBase(p, "number-input")}
/* the arrow column sits flush at the inline-end; drop the facade's end padding, and clip the column to
   the facade's radius so it doesn't overhang the rounded corners (Firefox especially). The focus ring
   is an outline, so overflow:hidden doesn't clip it. */
${root} { padding-inline-end: 0; overflow: hidden; }
/* native UA spinners off — we supply our own */
${root} > input::-webkit-outer-spin-button,
${root} > input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
${root} > input[type="number"] { -moz-appearance: textfield; appearance: textfield; }
${root} .arrows {
  display: flex;
  flex-direction: column;
  flex: none;
  align-self: stretch;
  /* the arrows-container-width token is @property-only (value-less upstream), so a literal is used */
  inline-size: 1.5rem;
  border-inline-start: ${t("border-width")} solid ${t("border-color")};
}
${root} .arrows button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: ${a("background-color")};
  color: var(--instui-color-icon-interactive-action-secondary-base);
  cursor: pointer;
}
${root} .arrows button + button { border-block-start: ${t("border-width")} solid ${t("border-color")}; }
${root} .arrows button:hover { background: ${a("background-hover-color")}; }
${root} .arrows button:active { background: ${a("background-active-color")}; }
${root} .arrows button:disabled { background: ${a("background-disabled-color")}; cursor: not-allowed; }
${root} .arrows button::before {
  content: "";
  inline-size: 0.875em;
  block-size: 0.875em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_UP_ICON};
  mask: ${CHEVRON_UP_ICON};
}
${root} .arrows button.down::before { -webkit-mask: ${CHEVRON_DOWN_ICON}; mask: ${CHEVRON_DOWN_ICON}; }`;
  },
});

export const numberInputCss = numberInput.css;
