import { defineComponent } from "../lib/define.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const textInput = defineComponent({
  name: "text-input",
  summary:
    "A styled native `<input>` — including `date`, `time`, and `datetime-local`, where the browser supplies the picker — with validation states and sizes.",
  modifiers: [
    { name: "-disabled", description: "Disabled state." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-success", description: "Success (valid) state." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  examples: ['<input class="instui-text-input" placeholder="Default">'],
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    return `
${fieldControlBase(p, "text-input", "text-input")}
.${p}text-input {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  font-size: ${t("font-size-md")};
}
.${p}text-input.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; font-size: ${t("font-size-sm")}; }
.${p}text-input.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; font-size: ${t("font-size-lg")}; }`;
  },
});

export const textInputCss = textInput.css;
