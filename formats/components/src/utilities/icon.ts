import { defineUtility } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const icon = defineUtility({
  name: "icon",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @utility icon
 * @summary The icon system: \`.instui-icon\` sizing plus the shared \`-icon-<name>\` painter that masks a glyph (in \`currentColor\`) before any element.
 * @pseudo ::before — The glyph itself: a 1em box masked from \`--pantoken-glyph\` and filled with \`currentColor\`.
 * @accessibility The glyph is decorative, so mark it \`aria-hidden="true"\`; give it a \`role\` or label only when the icon conveys meaning on its own.
 * @example
 * <span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
 */
.${p}icon { display: inline-flex; }
[class*="-icon-"]::before {
  content: "";
  display: inline-block;
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  vertical-align: -0.125em;
  background: currentColor;
  -webkit-mask: var(--pantoken-glyph) center / contain no-repeat;
  mask: var(--pantoken-glyph) center / contain no-repeat;
}`,
});

export const iconCss = icon.css;
