import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tabs as tabsRaw } from "../generated/component-styles.ts";

export const tabs = defineComponent({ name: "tabs", css: (p) => tabsRaw.replaceAll(SENTINEL, p) });
export const tabsCss = tabs.css;
