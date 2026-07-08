import { defineUtility } from "../lib/define.ts";

export const screenReaderContent = defineUtility({
  name: "screen-reader-content",
  summary:
    "Visually hides content while keeping it available to assistive tech (the standard clip pattern).",
  examples: ['<span class="instui-screen-reader-content">Opens in a new window</span>'],
  css: (p) => `
.${p}screen-reader-content {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}`,
});

export const screenReaderContentCss = screenReaderContent.css;
