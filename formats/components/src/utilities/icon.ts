import { defineUtility } from "../lib/define.ts";

export const icon = defineUtility({
  name: "icon",
  summary:
    "The icon system: `.instui-icon` sizing plus the shared `-icon-<name>` painter that masks a glyph (in `currentColor`) before any element.",
  examples: ['<span class="instui-icon -icon-megaphone" aria-hidden="true"></span>'],
  css: (p) => `
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
