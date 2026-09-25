import { expect, test } from "vite-plus/test";
import { collectIcons } from "../src/icons.ts";

test("collects the complete canonical Lucide catalog", () => {
  const { glyphs } = collectIcons({ includeInstui: false });

  expect(glyphs.length).toBeGreaterThan(1800);
  expect(glyphs.every((icon) => icon.meta.source === "lucide")).toBe(true);
  expect(glyphs.some((icon) => icon.name === "--instui-icon-building-complex-plus")).toBe(true);
  expect(glyphs.some((icon) => icon.name === "--instui-icon-building-2")).toBe(false);
});

test("source options isolate Lucide and Instructure custom icons", () => {
  const lucide = collectIcons({ includeInstui: false }).glyphs;
  const custom = collectIcons({ includeLucide: false }).glyphs;
  const none = collectIcons({ includeInstui: false, includeLucide: false });

  expect(lucide.every((icon) => icon.meta.source === "lucide")).toBe(true);
  expect(custom.length).toBeGreaterThan(50);
  expect(custom.every((icon) => icon.meta.source === "custom")).toBe(true);
  expect(none.glyphs).toEqual([]);
  expect(none.colors.length).toBeGreaterThan(0);
});

test("includes the canonical AI spinner star in the Instructure custom icon set", () => {
  const aiSpinner = collectIcons({ includeLucide: false }).glyphs.find(
    (icon) => icon.name === "--instui-icon-ai-spinner",
  );

  expect(aiSpinner?.meta).toMatchObject({
    kind: "icon",
    source: "custom",
    style: "Custom",
    viewBox: "0 0 24 24",
    bidirectional: false,
  });
  expect(aiSpinner?.value).toContain("M11.0621%202.53451");
});

test("the unified set is sorted, unique, and lets custom icons win collisions", () => {
  const all = collectIcons().glyphs;
  const custom = collectIcons({ includeLucide: false }).glyphs;
  const customCollision = custom.find((icon) => icon.name === "--instui-icon-message-square-check");
  const resolvedCollision = all.find((icon) => icon.name === "--instui-icon-message-square-check");

  expect(all.map((icon) => icon.name)).toEqual(
    all.map((icon) => icon.name).toSorted((left, right) => left.localeCompare(right)),
  );
  expect(new Set(all.map((icon) => icon.name)).size).toBe(all.length);
  expect(customCollision).toBeDefined();
  expect(resolvedCollision?.meta.source).toBe("custom");
  expect(resolvedCollision?.value).toBe(customCollision?.value);
});
