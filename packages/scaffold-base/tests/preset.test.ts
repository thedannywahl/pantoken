import { expect, test } from "vite-plus/test";
import { base } from "../src/base.ts";
import { createPreset } from "../src/preset.ts";

test("createPreset returns a preset-shaped object", () => {
  const preset = createPreset({ name: "demo", base });

  expect(preset.about?.name).toBe("demo");
  expect(preset.base).toBe(base);
  expect(Array.isArray(preset.blocks)).toBe(true);
  expect(preset.blocks.length).toBe(0);
});
