import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { billboardByTheme } from "../generated/component-styles.ts";

export const billboard = defineComponent({
  name: "billboard",
  css: (p, options) =>
    (billboardByTheme[options?.theme ?? "rebrand"] ?? billboardByTheme.rebrand).replaceAll(
      SENTINEL,
      p,
    ),
});
export const billboardCss = billboard.css;
