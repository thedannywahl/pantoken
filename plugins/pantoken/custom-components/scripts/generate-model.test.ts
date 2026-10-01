import { expect, test } from "vite-plus/test";
import { buildCssDocModel } from "./generate-model.ts";

test("buildCssDocModel includes documented component records and described skeleton-loader parts", () => {
  const model = buildCssDocModel();
  expect(model.some((entry) => entry.name === "card")).toBe(true);
  expect(model.some((entry) => entry.name === "agent-shell")).toBe(true);
  expect(model.some((entry) => entry.name === "banner")).toBe(true);
  expect(model.some((entry) => entry.className === ".instui-card")).toBe(true);
  const skeletonLoader = model.find((entry) => entry.name === "skeleton-loader");
  expect(skeletonLoader?.modifiers.map((modifier) => modifier.name)).toContain("-type-text");
  expect(skeletonLoader?.modifiers.map((modifier) => modifier.name)).toContain("-size-md");
  expect(skeletonLoader?.parts.every((part) => Boolean(part.description))).toBe(true);
  const aiGradient = model.find((entry) => entry.name === "ai-gradient");
  expect(aiGradient?.global).toBe(true);
  expect(
    aiGradient?.modifiers.some((modifier) => modifier.name === "--background-ai-horizontal"),
  ).toBe(true);
});
