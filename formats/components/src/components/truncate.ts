import { defineComponent } from "../lib/define.ts";

export const truncate = defineComponent({
  name: "truncate",
  css: (p) => `
/**
 * @component truncate
 * @summary Single-line ellipsis truncation, or a multi-line clamp via \`--lines\`.
 * @remarks The \`-lines\` clamp switches to \`display: -webkit-box\` and reads the \`--lines\` custom property, so the text wraps to that many lines before it ends in an ellipsis.
 * @modifier -lines — Multi-line clamp; set the line count via the \`--lines\` custom property (default 2).
 * @compat The \`-lines\` clamp relies on \`-webkit-line-clamp\` with \`display: -webkit-box\`, paired with the standard \`line-clamp\`.
 * @example
 * <div class="instui-truncate">This single line keeps going past the edge of its box, so it ends in an ellipsis.</div>
 * @related text — Body typography that this truncates.
 */
.${p}truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--instui-component-truncate-text-font-family);
  line-height: var(--instui-component-truncate-text-line-height);
}
.${p}truncate.-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--lines, 2);
  line-clamp: var(--lines, 2);
  white-space: normal;
  overflow: hidden;
}`,
});

export const truncateCss = truncate.css;
