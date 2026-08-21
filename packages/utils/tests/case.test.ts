import { expect, test } from "vite-plus/test";
import { camelCase } from "../src/case.ts";

test("camelCase converts kebab", () => {
  expect(camelCase("color-background-brand")).toBe("colorBackgroundBrand");
});
