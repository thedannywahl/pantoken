import { defineComponent } from "../lib/define.ts";

export const truncate = defineComponent({
  name: "truncate",
  summary: "Single-line ellipsis truncation, or a multi-line clamp via `--lines`.",
  modifiers: [
    {
      name: "-lines",
      description:
        "Multi-line clamp; set the line count via the `--lines` custom property (default 2).",
    },
  ],
  examples: [
    '<div class="instui-truncate">This single line keeps going past the edge of its box, so it ends in an ellipsis.</div>',
  ],
  css: (p) => `
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
