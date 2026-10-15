import { expect, test } from "vite-plus/test";
import { cardCss } from "../../src/index.ts";
import { card } from "../../src/components/card/index.ts";
import { validate } from "../_validate.ts";

test("card: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(card);
});

test("card supports official base and nested variants with deprecated legacy variants", () => {
  const css = cardCss({ prefix: "instui" });
  expect(css).toContain("var(--instui-component-card-background-color)");
  expect(css).toContain("var(--instui-elevation-card)");
  expect(css).toContain("var(--instui-component-card-nested-border-color)");
  expect(css).toContain("var(--instui-component-card-padding-base-sm)");
  expect(css).toContain("var(--instui-component-card-padding-nested-sm)");
  expect(css).toContain("container-type: inline-size");
  expect(css).toMatch(/@container \(width >=\s*20rem\)/u);
  expect(css).toMatch(/@container \(width >=\s*40rem\)/u);
  expect(css).toMatch(/&\.-variant-container\s*>\s*\.content/u);
  expect(css).toContain(".instui-card.-variant-container:not(:has(> .content))");
  expect(css).toContain(".-variant-base");
  expect(css).toContain(".-variant-nested");
  expect(css).toContain(".-variant-content");
  expect(css).toContain(".-variant-container");
});

test("card supports an explicit class prefix", () => {
  expect(cardCss({ prefix: "my" })).toContain(".my-card");
  expect(cardCss({ prefix: "" })).toContain(".card");
});
