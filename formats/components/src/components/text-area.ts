import { defineComponent } from "../lib/define.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const textArea = defineComponent({
  name: "text-area",
  summary:
    "A styled, resizable native `<textarea>` with the same states and sizes as the text input.",
  modifiers: [
    { name: "-disabled", description: "Disabled state." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-success", description: "Success (valid) state." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  examples: ['<textarea class="instui-text-area" placeholder="Write a comment…"></textarea>'],
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-area-${s})`;
    return `
${fieldControlBase(p, "text-area", "text-area")}
.${p}text-area {
  padding: ${t("padding")};
  font-size: ${t("font-size-md")};
  line-height: 1.5;
  min-block-size: 4rem;
  resize: vertical;
}
.${p}text-area.-size-sm { font-size: ${t("font-size-sm")}; }
.${p}text-area.-size-lg { font-size: ${t("font-size-lg")}; }`;
  },
});

export const textAreaCss = textArea.css;
