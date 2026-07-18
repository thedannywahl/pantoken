import { defineRule } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { base as baseRaw } from "../generated/component-styles.ts";

export const base = defineRule({ name: "base", css: (p) => baseRaw.replaceAll(SENTINEL, p) });
export const baseRuleCss = base.css;
