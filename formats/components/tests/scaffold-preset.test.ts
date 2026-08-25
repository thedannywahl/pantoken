import { expect, test } from "vite-plus/test";
import { presetComponents } from "../src/scaffold-preset.ts";

test("presetComponents uses the components platform name", () => {
  expect(presetComponents.about?.name).toBe("components");
  expect(Array.isArray(presetComponents.blocks)).toBe(true);
});
