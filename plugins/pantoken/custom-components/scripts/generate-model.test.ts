import { expect, test } from "vite-plus/test";
import { buildCssDocModel } from "./generate-model.ts";

test("buildCssDocModel includes the documented card, agent-shell, and banner records", () => {
  const model = buildCssDocModel();
  expect(model.some((entry) => entry.name === "card")).toBe(true);
  expect(model.some((entry) => entry.name === "agent-shell")).toBe(true);
  expect(model.some((entry) => entry.name === "banner")).toBe(true);
  expect(model.some((entry) => entry.className === ".instui-card")).toBe(true);
  const aiGradient = model.find((entry) => entry.name === "ai-gradient");
  expect(aiGradient?.global).toBe(true);
  expect(
    aiGradient?.modifiers.some((modifier) => modifier.name === "--background-ai-horizontal"),
  ).toBe(true);
});
