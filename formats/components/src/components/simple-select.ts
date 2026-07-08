import { defineComponent } from "../lib/define.ts";
import { SELECT_CHEVRON } from "../lib/helpers.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const simpleSelect = defineComponent({
  name: "simple-select",
  summary: "A styled native `<select>` with a caret, matching the text-input states and sizes.",
  modifiers: [
    { name: "-disabled", description: "Disabled state." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-success", description: "Success (valid) state." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  examples: [
    `<select class="instui-simple-select">
  <option>Choose a fruit…</option>
  <option>Apple</option>
  <option>Orange</option>
  <option>Pear</option>
</select>`,
  ],
  structure: `.instui-simple-select
  option`,
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    return `
${fieldControlBase(p, "simple-select", "text-input")}
.${p}simple-select {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  padding-inline-end: calc(${t("padding-horizontal-md")} + 1.5rem);
  font-size: ${t("font-size-md")};
  appearance: none;
  -webkit-appearance: none;
  background-image: ${SELECT_CHEVRON};
  background-repeat: no-repeat;
  background-position: right ${t("padding-horizontal-md")} center;
  background-size: 1em;
}
.${p}simple-select.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; padding-inline-end: calc(${t("padding-horizontal-sm")} + 1.5rem); font-size: ${t("font-size-sm")}; }
.${p}simple-select.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; padding-inline-end: calc(${t("padding-horizontal-lg")} + 1.5rem); font-size: ${t("font-size-lg")}; }`;
  },
});

export const simpleSelectCss = simpleSelect.css;
