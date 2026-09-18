import { expect, test } from "vite-plus/test";
import { aiGradientCss } from "../../src/index.ts";
import { aiGradient } from "../../src/utilities/ai-gradient/index.ts";
import { validate } from "../_validate.ts";

test("ai-gradient: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(aiGradient);
});

test("ai-gradient utilities: global selector shape and AI gradient helpers", () => {
  const css = aiGradientCss({ prefix: "instui" });
  expect(css).toContain(":where(*).--border-color-ai.--border-color-ai.--border-color-ai");
  expect(css).toContain("background-image: linear-gradient");
  expect(css).toContain("background-clip: padding-box, border-box");
  expect(css).toContain(":where(*).--background-ai.--background-ai.--background-ai");
  expect(css).toContain("background-image: linear-gradient");
  expect(css).toContain("linear-gradient(to right");
  expect(css).toContain("linear-gradient(to left");
});
