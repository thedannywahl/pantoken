import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formFieldMessages as formFieldMessagesRaw } from "../generated/component-styles.ts";

export const formFieldMessages = defineComponent({
  name: "form-field-messages",
  css: (p) => formFieldMessagesRaw.replaceAll(SENTINEL, p),
});
export const formFieldMessagesCss = formFieldMessages.css;
