import { expect, test } from "vite-plus/test";
import { getIconCdnFile, loadAllIcons, type TaggedIcon } from "../src/icons.js";

test("loadAllIcons returns simple-icons sorted by name", async () => {
  const icons = await loadAllIcons();
  expect(icons.length).toBeGreaterThan(0);
  expect(icons.every((icon) => icon.source === "simple-icons")).toBe(true);
  const names = icons.map((icon) => icon.name);
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  expect(icons[0]?.description).toContain("Brand icon:");
});

test("getIconCdnFile resolves the simple-icons package/path", () => {
  const icon: TaggedIcon = { name: "github", source: "simple-icons" };
  expect(getIconCdnFile(icon)).toEqual({
    package: "@pantoken/plugin-simple-icons",
    path: "dist/icons/github.css",
  });
});

test("getIconCdnFile resolves the components package/path", () => {
  const icon: TaggedIcon = { name: "heart", source: "components" };
  expect(getIconCdnFile(icon)).toEqual({
    package: "@pantoken/components",
    path: "dist/icons/heart.css",
  });
});
