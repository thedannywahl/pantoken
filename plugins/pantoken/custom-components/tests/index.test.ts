import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { customComponents, cardRules } from "../src/index.ts";

const cssOf = (plugin: ReturnType<typeof customComponents>): string => {
  const out = plugin.css?.({ tokens: [], css: "" });
  return (out && "append" in out ? (out.append as string) : "") || "";
};

test("is a css-only plugin", () => {
  expect(capabilitiesOf(customComponents())).toEqual(["css"]);
});

test("appends by default, prepends when asked", () => {
  const appended = customComponents().css?.({ tokens: [], css: "" });
  expect(appended).toHaveProperty("append");
  const prepended = customComponents({ position: "prepend" }).css?.({ tokens: [], css: "" });
  expect(prepended).toHaveProperty("prepend");
});

test("card root uses the container background, sm border-radius as mobile default, and elevation-1", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("var(--instui-color-background-container)");
  expect(css).toContain("var(--instui-component-shared-tokens-border-radius-card-sm)");
  expect(css).toContain("var(--instui-elevation-1)");
});

test("card root has overflow:hidden and flex-shrink:0", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("overflow: hidden");
  expect(css).toContain("flex-shrink: 0");
});

test("responsive breakpoints step padding and border-radius at 320px and 684px", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("@media (min-width: 20rem)");
  expect(css).toContain("@media (min-width: 42.75rem)");
  expect(css).toContain("var(--instui-component-shared-tokens-spacing-padding-card-sm)");
  expect(css).toContain("var(--instui-component-shared-tokens-spacing-padding-card-md)");
  expect(css).toContain("var(--instui-component-shared-tokens-spacing-padding-card-lg)");
  expect(css).toContain("var(--instui-component-shared-tokens-border-radius-card-md)");
  expect(css).toContain("var(--instui-component-shared-tokens-border-radius-card-lg)");
});

test("container variant adds border and responsive gap/border-radius to direct children", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("-variant-container");
  expect(css).toContain("var(--instui-component-shared-tokens-stroke-muted-color)");
  expect(css).toContain("--instui-component-shared-tokens-border-radius-card-nested-container-sm");
  expect(css).toContain("--instui-component-shared-tokens-border-radius-card-nested-container-lg");
  expect(css).toContain(
    "var(--instui-component-shared-tokens-spacing-gap-cards-nested-containers-sm)",
  );
  expect(css).toContain(
    "var(--instui-component-shared-tokens-spacing-gap-cards-nested-containers-lg)",
  );
});

test("@scope block contains container-variant direct-child rules", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("@scope (.instui-card)");
  expect(css).toContain(":scope.-variant-container > *");
});

test("cardRules() defaults to instui- prefix and equals the plugin css output", () => {
  expect(cardRules()).toBe(cssOf(customComponents()));
});

test("cardRules accepts an explicit prefix", () => {
  expect(cardRules("my-")).toContain(".my-card");
  expect(cardRules("")).toContain(".card {");
});
