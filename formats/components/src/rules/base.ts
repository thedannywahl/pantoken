import { defineRule } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const base = defineRule({
  name: "base",
  css: () =>
    // prettier-ignore
    css`
/**
 * @rule base
 * @class *
 * @summary The opt-in global reset: \`box-sizing\`, the page surface, base text colour and font, \`color-scheme\`, and link defaults.
 * @example
 * <html>
 *   <body>
 *     <a href="/">A styled link on the base surface.</a>
 *   </body>
 * </html>
 */
*,
*::before,
*::after {
  box-sizing: border-box;
}
:where(html) {
  color-scheme: light dark;
  background: var(--instui-color-background-page);
  color: var(--instui-color-text-base);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-component-text-content-font-size);
  line-height: var(--instui-component-text-content-line-height);
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}
:where(body) {
  margin: 0;
}
:where(a) {
  color: var(--instui-color-text-interactive-navigation-primary-base);
  text-decoration: underline;
}
:where(a:hover) {
  color: var(--instui-color-text-interactive-navigation-primary-hover);
}
::selection {
  background: color-mix(in srgb, var(--instui-color-text-interactive-navigation-primary-base) 25%, transparent);
}
`,
});

export const baseRuleCss = base.css;
