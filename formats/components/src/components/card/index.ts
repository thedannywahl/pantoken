import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { card as cardRaw } from "../../generated/component-styles.ts";

/** The first-class Card component record. */
export const card: Definition = defineComponent({
  name: "card",
  css: (prefix) => cardRaw.replaceAll(SENTINEL, prefix),
});

/** Standalone Card stylesheet with support for a custom class prefix. */
export const cardCss: Definition["css"] = card.css;
