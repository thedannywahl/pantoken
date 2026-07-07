import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { fontFamilies, fontFiles, fontsCss, fontFamiliesPlugin } from "../src/index.ts";

test("ships Atkinson Hyperlegible Next with faces", () => {
  const ids = fontFamilies.map((f) => f.id).toSorted();
  expect(ids).toEqual(["atkinson-hyperlegible-next"]);
  for (const family of fontFamilies) expect(family.faces.length).toBeGreaterThan(0);
});

test("every face has a positive numeric weight and a style", () => {
  expect(fontFiles.length).toBeGreaterThan(0);
  for (const face of fontFiles) {
    expect(face.cssWeight).toBeGreaterThan(0);
    expect(["normal", "italic"]).toContain(face.style);
  }
});

test("fonts.css defines @font-face and the family tokens", () => {
  expect(fontsCss).toContain("@font-face");
  expect(fontsCss).toContain("--instui-font-family-atkinson-hyperlegible-next");
  expect(fontsCss).toContain('font-family: "Atkinson Hyperlegible Next"');
  // CircularXX belongs to the brand-guidelines package, not here.
  expect(fontsCss).not.toContain("CircularXX");
  // src points at the shipped woff2 files, not inlined data URIs.
  expect(fontsCss).toContain(".woff2");
  expect(fontsCss).not.toContain("data:");
});

test("the plugin's css hook contributes the faces and family declarations", () => {
  const plugin = fontFamiliesPlugin();
  expect(capabilitiesOf(plugin)).toContain("css");
  const contribution = plugin.css?.({ tokens: [], css: "" });
  expect(contribution?.prepend).toContain("@font-face");
  expect(contribution?.declarations).toContainEqual([
    "--instui-font-family-atkinson-hyperlegible-next",
    '"Atkinson Hyperlegible Next"',
  ]);
});
