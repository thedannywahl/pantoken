import { expect, test } from "vite-plus/test";
import {
  buildEmoticonsDatabase,
  buildIconMarkup,
  getIconCdnFile,
  humanizeIconName,
  loadAllIcons,
  matchInsertedIcon,
  type TaggedIcon,
} from "../src/icons.js";

test("loadAllIcons returns icons from all four providers, sorted by name", async () => {
  const icons = await loadAllIcons();
  expect(icons.length).toBeGreaterThan(0);
  expect(icons.some((icon) => icon.source === "simple-icons")).toBe(true);
  expect(icons.some((icon) => icon.source === "components")).toBe(true);
  expect(icons.some((icon) => icon.source === "lucide-lab")).toBe(true);
  expect(icons.some((icon) => icon.source === "custom-icons")).toBe(true);
  const names = icons.map((icon) => icon.name);
  expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
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

test("getIconCdnFile resolves the lucide-lab package/path", () => {
  const icon: TaggedIcon = { name: "burger", source: "lucide-lab" };
  expect(getIconCdnFile(icon)).toEqual({
    package: "@pantoken/plugin-lucide-lab",
    path: "dist/icons/burger.css",
  });
});

test("getIconCdnFile resolves the custom-icons package/path", () => {
  const icon: TaggedIcon = { name: "highspot", source: "custom-icons" };
  expect(getIconCdnFile(icon)).toEqual({
    package: "@pantoken/plugin-custom-icons",
    path: "dist/icons/highspot.css",
  });
});

test("humanizeIconName turns hyphens into spaces", () => {
  expect(humanizeIconName("circle-question-mark")).toBe("circle question mark");
});

test("buildIconMarkup renders the accessible icon component", () => {
  const icon: TaggedIcon = { name: "heart", source: "components" };
  expect(buildIconMarkup(icon, "heart")).toBe(
    '<span class="instui-icon -icon-heart" data-pantoken-icon="components:heart">' +
      '<span class="instui-screen-reader-content">heart</span></span>',
  );
});

test("buildEmoticonsDatabase categorizes icons by provider", () => {
  const icons: TaggedIcon[] = [
    { name: "heart", source: "simple-icons", description: "Brand icon: heart" },
    { name: "close", source: "components", description: "Instructure UI icon: close" },
  ];
  const database = buildEmoticonsDatabase(icons);
  expect(database["simple-icons:heart"]?.category).toBe("Simple Icons");
  expect(database["components:close"]?.category).toBe("Instructure UI");
  expect(database["components:close"]?.char).toContain("-icon-close");
  expect(database["components:close"]?.keywords).toContain("close");
});

test("matchInsertedIcon recovers the TaggedIcon from a data-pantoken-icon marker", () => {
  const icons: TaggedIcon[] = [{ name: "heart", source: "simple-icons" }];
  const html = '<span data-pantoken-icon="simple-icons:heart"></span>';
  expect(matchInsertedIcon(html, icons)).toEqual(icons[0]);
});

test("matchInsertedIcon returns undefined when there's no marker", () => {
  expect(matchInsertedIcon("<p>no icon here</p>", [])).toBeUndefined();
});
