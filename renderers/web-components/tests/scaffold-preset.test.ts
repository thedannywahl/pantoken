import { expect, test } from "vite-plus/test";
import { presetWebComponents } from "../src/scaffold-preset.ts";

test("presetWebComponents uses the web-components platform name", () => {
  expect(presetWebComponents.about?.name).toBe("web-components");
  expect(Array.isArray(presetWebComponents.blocks)).toBe(true);
});
