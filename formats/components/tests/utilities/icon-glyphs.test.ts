import { expect, test } from "vite-plus/test";
import { iconGlyphsCss } from "../../src/index.ts";

test("iconGlyphsCss emits one glyph class per icon, pointing --pantoken-glyph at its token", () => {
  // Lean by default: just the canonical `-icon-<name>`, no deprecated aliases.
  const lean = iconGlyphsCss(["megaphone", "check"], { prefix: "instui" });
  expect(lean).toContain(".-icon-megaphone { --pantoken-glyph: var(--instui-icon-megaphone); }");
  expect(lean).toContain(".-icon-check { --pantoken-glyph: var(--instui-icon-check); }");
  expect(lean).not.toContain("-render-icon-");
  expect(lean).not.toContain("-render-custom-icon-");
  expect(iconGlyphsCss(["megaphone"], { prefix: "ui" })).toContain(".-icon-megaphone");

  // With deprecatedAliases: the `renderIcon`/`renderCustomIcon` prop names become FUNCTIONAL aliases,
  // grouped onto the same rule so they set the identical glyph var (not a doc-only noop).
  const withAliases = iconGlyphsCss(["megaphone"], { prefix: "instui", deprecatedAliases: true });
  expect(withAliases).toContain(
    ".-icon-megaphone, .-render-icon-megaphone, .-render-custom-icon-megaphone { --pantoken-glyph: var(--instui-icon-megaphone); }",
  );
});
