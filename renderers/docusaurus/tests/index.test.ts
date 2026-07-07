import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { INFIMA_TO_INSTUI, docusaurusCss, toDocusaurusCss } from "../src/index.ts";

test("every mapped Instructure token exists in the IR (no drift)", () => {
  expect(unknownReferences(docusaurusCss, tokens)).toEqual([]);
});

test("maps Infima variables to var(--instui-*)", () => {
  expect(docusaurusCss).toContain("--ifm-color-primary: var(--instui-color-background-brand);");
  expect(docusaurusCss).toContain("--ifm-font-color-base: var(--instui-color-text-base);");
  expect(docusaurusCss).toContain(":root {");
});

test("every mapping targets an --instui-* token", () => {
  for (const instui of Object.values(INFIMA_TO_INSTUI)) {
    expect(instui.startsWith("--instui-")).toBe(true);
  }
});

test("selector is configurable", () => {
  expect(toDocusaurusCss({ selector: "[data-theme]" })).toContain("[data-theme] {");
});
