import { expect, test } from "vite-plus/test";
import { presetSvelte } from "../src/scaffold-preset.ts";

test("presetSvelte uses the svelte platform name", () => {
  expect(presetSvelte.about?.name).toBe("svelte");
  expect(Array.isArray(presetSvelte.blocks)).toBe(true);
});
