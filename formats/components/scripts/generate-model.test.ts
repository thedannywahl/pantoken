import { expect, test } from "vite-plus/test";
import { buildCssDocModel } from "./generate-model.ts";

test("buildCssDocModel includes documented component and utility entries", () => {
  const model = buildCssDocModel();
  expect(model.some((entry) => entry.name === "button")).toBe(true);
  expect(model.some((entry) => entry.className === ".instui-button")).toBe(true);
  expect(model.length).toBeGreaterThan(30);
});
