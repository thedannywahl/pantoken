import { expect, test } from "vite-plus/test";
import { inlineHtml } from "../src/inline-html.ts";
import { inlinePantokenHtml } from "../src/pantoken-html.ts";

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

test("inlines resolved component declarations for all theme and mode combinations", () => {
  const themes = ["rebrand", "canvas", "canvasHighContrast"] as const;
  const modes = ["light", "dark"] as const;

  for (const theme of themes) {
    for (const mode of modes) {
      const html = '<html><body><button class="instui-button">Save</button></body></html>';
      const result = inlinePantokenHtml(html, { theme, mode });
      const style = result.match(/<button[^>]*style="([^"]*)"/u)?.[1];

      expect(style).toContain("display: inline-flex");
      expect(style).not.toContain("var(");
      expect(result).not.toContain("<style");
    }
  }
});

test("applies custom theme color remaps when the document selects custom", () => {
  const html = '<html><body><button class="instui-button">Save</button></body></html>';
  const base = inlinePantokenHtml(html);
  const custom = inlinePantokenHtml(html, { customColor: "#e62429" });
  const background = (result: string): string | undefined =>
    result.match(/<button[^>]*style="([^"]*)"/u)?.[1]?.match(/background: ([^;]+);/u)?.[1];

  expect(background(custom)).not.toBe(background(base));
  expect(background(custom)).not.toContain("var(");
});
