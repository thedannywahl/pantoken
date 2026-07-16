import { defineUtility } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { icon as iconRaw } from "../generated/component-styles.ts";

export const icon = defineUtility({ name: "icon", css: (p) => iconRaw.replaceAll(SENTINEL, p) });
export const iconCss = icon.css;
