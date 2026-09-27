import { expect, test } from "vite-plus/test";
import { inlineHtml } from "../src/inline-html.ts";

test("inlines matching rules and keeps pseudo-class fallbacks", () => {
  const html = '<button class="action">Save</button>';
  const css = ".action { color: red; } .action:hover { color: blue; }";

  const result = inlineHtml(html, css);

  expect(result).toContain('style="color: red;"');
  expect(result).toContain(".action:hover");
});

test("preserves CSS variables for runtime theme overrides", () => {
  const result = inlineHtml('<div class="surface"></div>', ".surface { color: var(--brand); }");

  expect(result).toContain("var(--brand)");
});

test("does not let CSS close the temporary style element", () => {
  const result = inlineHtml("<div></div>", "/* </style><script>attack()</script> */");

  expect(result).not.toContain("<script>");
});

test("flattens scoped component rules before inlining", () => {
  const css = "@scope (.action) { & { color: red; } &:hover { color: blue; } }";
  const result = inlineHtml('<button class="action">Save</button>', css);

  expect(result).toContain('style="color: red;"');
  expect(result).toContain(".action:hover");
});
