import { defineUtility } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { mask as maskRaw } from "../generated/component-styles.ts";

export const mask = defineUtility({ name: "mask", css: (p) => maskRaw.replaceAll(SENTINEL, p) });
export const maskCss = mask.css;
