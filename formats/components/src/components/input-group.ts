import { defineComponent } from "../lib/define.ts";
import { inputFacadeBase } from "../lib/field-controls.ts";

export const inputGroup = defineComponent({
  name: "input-group",
  summary: "A facade around a text input with leading and trailing icon slots.",
  modifiers: [
    { name: "-disabled", description: "Disabled state." },
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-success", description: "Success (valid) state." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
    { name: "-should-not-wrap", description: "Keep the group on one line (no wrapping)." },
  ],
  css: (p) => `
${inputFacadeBase(p, "input-group")}
.${p}input-group.-should-not-wrap { flex-wrap: nowrap; }`,
});

export const inputGroupCss = inputGroup.css;
