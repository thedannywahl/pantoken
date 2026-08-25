import { expect, test } from "vite-plus/test";
import { buildCssDocModel } from "./generate-model.ts";

test("buildCssDocModel includes the documented card and agent-shell records", () => {
  const model = buildCssDocModel();
  expect(model.some((entry) => entry.name === "card")).toBe(true);
  expect(model.some((entry) => entry.name === "agent-shell")).toBe(true);
  expect(model.some((entry) => entry.className === ".instui-card")).toBe(true);
});
