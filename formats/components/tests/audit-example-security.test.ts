import { expect, test } from "vite-plus/test";
import { exampleHtml } from "../scripts/audit-accessibility.ts";

test.each(["-automatica11y\n", "-a-a \t-b\r\n"])(
  "strips valid audit metadata without changing text or scripts: %j",
  (prefix) => {
    expect(
      exampleHtml(
        `${prefix}<p class="pfx-button">pfx-text</p><script>const text = "pfx-text";</script>`,
      ),
    ).toBe('<p class="instui-button">pfx-text</p><script>const text = "pfx-text";</script>');
  },
);

test("retains multiple HTML fences and rejects empty markup", () => {
  expect(exampleHtml("```html\n<p>First</p>\n```\n```html\n<p>Second</p>\n```")).toBe(
    "<p>First</p>\n\n<p>Second</p>",
  );
  expect(() => exampleHtml("-automatica11y\n")).toThrow("Empty audit markup");
});

test("handles malformed and unterminated flag headers without backtracking", () => {
  for (const prefix of ["-a".repeat(50_000), "-a ".repeat(50_000), "-a".repeat(50_000) + "!"]) {
    const html = exampleHtml(`${prefix}<p>Content</p>`);
    expect(html).toBe(`${prefix}<p>Content</p>`);
  }
}, 2_000);

test("handles many incomplete fence headers in a single pass", () => {
  const prefix = "```html ".repeat(50_000);
  expect(exampleHtml(`${prefix}<p>Content</p>`)).toBe(`${prefix}<p>Content</p>`);
}, 2_000);
