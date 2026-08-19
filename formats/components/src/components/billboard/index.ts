import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { billboardByTheme } from "../../generated/component-styles.ts";

/** The `billboard` component record: a large empty-state or call-to-action block with a hero graphic, a heading, and a message. */
export const billboard: Definition = defineComponent({
  name: "billboard",
  css: (p, options) =>
    (billboardByTheme[options?.theme ?? "rebrand"] ?? billboardByTheme.rebrand).replaceAll(
      SENTINEL,
      p,
    ),
});
/** Standalone `billboard` stylesheet — the prefixed CSS for the empty-state block, ready to ship as a `.css` file. */
export const billboardCss: Definition["css"] = billboard.css;
