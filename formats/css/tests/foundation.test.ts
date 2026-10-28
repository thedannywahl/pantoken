import { expect, test } from "vite-plus/test";
import { foundationPlugin } from "../src/foundation.ts";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import type { CssHookContext } from "@pantoken/model";
import { css, leanCss } from "../src/index.ts";
import { multiScopeCss, propertiesCss } from "../src/scoped.ts";

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

test("ready token foundations follow the system without the base reset and remain below scheme pins", () => {
  for (const sheet of [
    css,
    leanCss,
    multiScopeCss({
      themes: ["rebrand", "canvas", "canvasHighContrast"],
      defaultTheme: "rebrand",
      includeIcons: false,
      plugins: [foundationPlugin],
    }),
  ]) {
    expect(sheet).toContain(
      "@layer pantoken.base {\n  :where(:root) { color-scheme: light dark; }\n}",
    );
  }
  expect(propertiesCss("rebrand", { plugins: [foundationPlugin] })).not.toContain("color-scheme:");
});
