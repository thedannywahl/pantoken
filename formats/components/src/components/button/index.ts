import { defineComponent, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";
import { AI_ICON_MASK } from "../../lib/helpers.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { appendGenerated } from "../../lib/aliases.ts";
import { button as buttonRaw } from "../../generated/component-styles.ts";
import { alpha, darken } from "@pantoken/plugin-colors";

/**
 * The rules requiring runtime interpolation — the shared `AI_ICON_MASK` mask value and the
 * `@pantoken/plugin-colors` without-background hover/active washes — can't live in the `.css`-authored record
 * (`button.css`), so they're appended here, scope-relative (`&`), via {@link appendGenerated}.
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
/*
 * Without-background hover/active derive a subtle wash from the brand token via @pantoken/plugin-colors —
 * a low-opacity, slightly-darkened brand, exactly as InstUI's runtime computes it
 * (alpha(darken(brand), n)). The *-ghost-hover-background *tokens* resolve to the solid brand fill,
 * which would print same-colour-on-same-colour text; deriving the wash keeps the rest text legible
 * and tracks the brand. See the upstream token issue for why the raw tokens can't be used directly.
 */
.${p}button.-without-background:hover {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 10)};
}
.${p}button.-without-background:active {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 20)};
}
`;

/** The `button` component record: an accessible action control styled from the token palette, primary by default. */
export const button: Definition = defineComponent({
  name: "button",
  css: (p) => appendGenerated(buttonRaw.replaceAll(SENTINEL, p), interpolatedRules(p)),
});

/** Standalone `button` stylesheet — the prefixed CSS for the action button, ready to ship as a `.css` file. */
export const buttonCss: Definition["css"] = button.css;
