import { expect, test } from "vite-plus/test";
import { iconGlyphsCss } from "../../src/index.ts";

test("iconGlyphsCss emits one glyph class per icon, pointing --pantoken-glyph at its token", () => {
  const css = iconGlyphsCss(["megaphone", "check"], { prefix: "instui" });
  expect(css).toContain(".-icon-megaphone { --pantoken-glyph: var(--instui-icon-megaphone); }");
  expect(css).toContain(".-icon-check { --pantoken-glyph: var(--instui-icon-check); }");
  expect(css).not.toContain("-render-icon-");
  expect(css).not.toContain("-render-custom-icon-");
  expect(iconGlyphsCss(["megaphone"], { prefix: "ui" })).toContain(".-icon-megaphone");
});

test("iconGlyphsCss with values emits a self-contained sheet", () => {
  const css = iconGlyphsCss(["megaphone"], {
    prefix: "instui",
    values: { megaphone: "url('data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E')" },
  });
  expect(css).toContain(
    "  --instui-icon-megaphone: url('data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E');",
  );
  expect(css).toContain(".-icon-megaphone { --pantoken-glyph: var(--instui-icon-megaphone); }");
});

test("iconGlyphsCss rejects a values map missing an icon", () => {
  expect(() => iconGlyphsCss(["megaphone", "check"], { values: { megaphone: "url(a)" } })).toThrow(
    /no value supplied for icon "check"/,
  );
});
