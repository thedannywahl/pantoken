import { defineComponent, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";
import { AI_ICON_MASK } from "../../lib/helpers.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { appendGenerated } from "../../lib/aliases.ts";
import { button as buttonRaw } from "../../generated/component-styles.ts";

/**
 * The shared `AI_ICON_MASK` value requires runtime interpolation, so its rule is appended to the
 * `.css`-authored record (`button.css`) via {@link appendGenerated}.
 */
const interpolatedRules = (p: string) =>
  // prettier-ignore
  css`
/* The ai glyph, added automatically to every AI button and painted in its own colour. */
.${p}button.-color-ai::before,
.${p}button.-color-ai-secondary::before {
  content: "";
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  -webkit-mask: ${AI_ICON_MASK};
  mask: ${AI_ICON_MASK};
}
`;

/** The `button` component record: an accessible action control styled from the token palette, primary by default. */
export const button: Definition = defineComponent({
  name: "button",
  css: (p) => appendGenerated(buttonRaw.replaceAll(SENTINEL, p), interpolatedRules(p)),
});

/** Standalone `button` stylesheet — the prefixed CSS for the action button, ready to ship as a `.css` file. */
export const buttonCss: Definition["css"] = button.css;
