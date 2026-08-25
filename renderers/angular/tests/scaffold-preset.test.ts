import { expect, test } from "vite-plus/test";
import { presetAngular } from "../src/scaffold-preset.ts";

test("presetAngular uses the angular platform name", () => {
  expect(presetAngular.about?.name).toBe("angular");
  expect(Array.isArray(presetAngular.blocks)).toBe(true);
});
