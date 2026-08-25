import { expect, test } from "vite-plus/test";
import { presetVue } from "../src/scaffold-preset.ts";

test("presetVue uses the vue platform name", () => {
  expect(presetVue.about?.name).toBe("vue");
  expect(Array.isArray(presetVue.blocks)).toBe(true);
});
