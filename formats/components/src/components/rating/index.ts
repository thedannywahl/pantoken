import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { rating as ratingRaw } from "../../generated/component-styles.ts";

/** The `rating` component record: a star rating with filled and empty glyphs and an optional numeric label. */
export const rating: Definition = defineComponent({
  name: "rating",
  css: (p) => ratingRaw.replaceAll(SENTINEL, p),
});
/** Standalone `rating` stylesheet — the prefixed CSS for the star rating, ready to ship as a `.css` file. */
export const ratingCss: Definition["css"] = rating.css;
