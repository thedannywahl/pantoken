import { expect, test } from "vite-plus/test";
import { foundationPlugin } from "../src/foundation.ts";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import type { CssHookContext } from "@pantoken/model";

test("foundationPlugin has the correct name", () => {
  expect(foundationPlugin.name).toBe("pantoken-foundation");
});

test("foundationPlugin has css capability", () => {
  const capabilities = capabilitiesOf(foundationPlugin);
  expect(capabilities).toContain("css");
});

test("foundationPlugin.css() returns elevation and focus-outline custom properties", () => {
  const ctx: CssHookContext = { tokens: [], css: "" };
  const result = foundationPlugin.css!(ctx);
  expect(result).toBeDefined();
  expect(result?.marker).toContain("pantoken foundation");
  expect(result?.marker).toContain("elevation");
  expect(result?.marker).toContain("focus-outline");

  const declarations = result?.declarations;
  expect(Array.isArray(declarations)).toBe(true);
  expect(declarations && declarations.length > 0).toBe(true);

  // Verify that elevation and focus-outline variables are included
  const declarationNames = declarations?.map(([name]) => name);
  expect(declarationNames?.some((name) => name.includes("elevation"))).toBe(true);
  expect(declarationNames?.some((name) => name.includes("focus-outline"))).toBe(true);
});
