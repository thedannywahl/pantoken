/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import {
  buildIconMarkup,
  buildIconTokenCss,
  filterIcons,
  getIconCdnFile,
  getIconImageSrc,
  getIconTokenValue,
  getUsedIconCdnFiles,
  humanizeIconName,
  loadAllIcons,
  matchesIconQuery,
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

test("buildIconMarkup renders a decorative icon", () => {
  const icon: TaggedIcon = { name: "heart", source: "components" };
  expect(buildIconMarkup(icon)).toBe(
    '<span class="instui-icon -icon-heart" aria-hidden="true"></span>',
  );
});

test("matchesIconQuery matches on name, source label, and description", () => {
  const icon: TaggedIcon = { name: "heart", source: "simple-icons", description: "Brand icon" };
  expect(matchesIconQuery(icon, "")).toBe(true);
  expect(matchesIconQuery(icon, "hear")).toBe(true);
  expect(matchesIconQuery(icon, "simple")).toBe(true);
  expect(matchesIconQuery(icon, "brand")).toBe(true);
  expect(matchesIconQuery(icon, "nope")).toBe(false);
});

test("filterIcons narrows by query and source", () => {
  const icons: TaggedIcon[] = [
    { name: "heart", source: "components" },
    { name: "heart-crack", source: "simple-icons" },
    { name: "star", source: "components" },
  ];
  expect(filterIcons(icons, "heart").map((i) => i.name)).toEqual(["heart", "heart-crack"]);
  expect(filterIcons(icons, "heart", "components").map((i) => i.name)).toEqual(["heart"]);
  expect(filterIcons(icons, "", "components")).toHaveLength(2);
});

test("getIconTokenValue resolves glyphs bundled in this package, not CDN-only ones", async () => {
  const icons = await loadAllIcons();
  const component = icons.find((icon) => icon.source === "components")!;
  const brand = icons.find((icon) => icon.source === "simple-icons")!;
  const custom = icons.find((icon) => icon.source === "custom-icons")!;
  expect(getIconTokenValue(component)).toMatch(/^url\('data:image\/svg\+xml/u);
  expect(getIconTokenValue(custom)).toMatch(/^url\('data:image\/svg\+xml/u);
  expect(getIconTokenValue(brand)).toBeUndefined();
});

test("getIconImageSrc unwraps the url() and normalizes the charset parameter", async () => {
  const icons = await loadAllIcons();
  const component = icons.find((icon) => icon.source === "components")!;
  expect(getIconImageSrc(component)).toMatch(/^data:image\/svg\+xml;charset=utf-8,/u);
  expect(getIconImageSrc(component)).not.toContain(";utf8,");
});

test("getIconImageSrc falls back to the custom property on the given root", () => {
  const brand: TaggedIcon = { name: "github", source: "simple-icons" };
  expect(getIconImageSrc(brand)).toBeUndefined();
  document.documentElement.style.setProperty(
    "--instui-icon-github",
    "url('data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E')",
  );
  expect(getIconImageSrc(brand, document.documentElement)).toBe(
    "data:image/svg+xml;charset=utf-8,%3Csvg%3E%3C/svg%3E",
  );
  document.documentElement.style.removeProperty("--instui-icon-github");
});

test("buildIconTokenCss declares only the glyphs this package carries inline", () => {
  const icons: TaggedIcon[] = [
    { name: "github", source: "simple-icons" },
    { name: "pantoken", source: "custom-icons" },
  ];
  const css = buildIconTokenCss(icons);
  expect(css).toContain("--instui-icon-pantoken:url(");
  expect(css).not.toContain("--instui-icon-github");
});

test("getUsedIconCdnFiles deduplicates icon classes and drops deleted icons", () => {
  const icons: TaggedIcon[] = [
    { name: "heart", source: "components" },
    { name: "github", source: "simple-icons" },
  ];
  const template = document.createElement("template");
  template.innerHTML = '<span class="instui-icon -icon-heart"></span><i class="-icon-heart"></i>';

  expect(getUsedIconCdnFiles(template.content, icons)).toEqual([
    { package: "@pantoken/components", path: "dist/icons/heart.css" },
  ]);

  template.innerHTML = "<p>No icons remain.</p>";
  expect(getUsedIconCdnFiles(template.content, icons)).toEqual([]);
});

test("getUsedIconCdnFiles preserves the selected provider for duplicate icon names", () => {
  const icons: TaggedIcon[] = [
    { name: "heart", source: "components" },
    { name: "heart", source: "simple-icons" },
  ];
  const template = document.createElement("template");
  template.innerHTML = '<span class="-icon-heart"></span>';

  expect(
    getUsedIconCdnFiles(template.content, icons, [
      { package: "@pantoken/plugin-simple-icons", path: "dist/icons/heart.css" },
    ]),
  ).toEqual([{ package: "@pantoken/plugin-simple-icons", path: "dist/icons/heart.css" }]);
});
