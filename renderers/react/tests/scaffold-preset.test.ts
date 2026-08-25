import { expect, test } from "vite-plus/test";
import { presetReact } from "../src/scaffold-preset.ts";

test("presetReact uses the react platform name", () => {
  expect(presetReact.about?.name).toBe("react");
  expect(Array.isArray(presetReact.blocks)).toBe(true);
});
