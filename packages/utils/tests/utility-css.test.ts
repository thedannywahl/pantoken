import { expect, test } from "vite-plus/test";
import { colorUtilitiesCss, tokenUtilitiesCss } from "../src/utility-css.ts";

test("colorUtilitiesCss maps bg/text/border to semantic colour tokens only", () => {
  const css = colorUtilitiesCss(
    {
      background: ["brand", "success"],
      text: ["secondary"],
      stroke: ["base"],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(".instui-bg-brand { background: var(--instui-color-background-brand); }");
  expect(css).toContain(".instui-text-secondary { color: var(--instui-color-text-secondary); }");
  expect(css).toContain(".instui-border-base { border-color: var(--instui-color-stroke-base); }");
});

test("colorUtilitiesCss accepts explicit [name, token] pairs alongside plain names", () => {
  const css = colorUtilitiesCss(
    {
      background: [["primary", "--instui-component-view-background-primary"]],
      text: [],
      stroke: [],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(
    ".instui-bg-primary { background: var(--instui-component-view-background-primary); }",
  );
});

test("colorUtilitiesCss chainTargets emits a bare selector plus one per target", () => {
  const css = colorUtilitiesCss(
    { background: ["brand"], text: [], stroke: [] },
    { prefix: "instui", chainTargets: ["button", "view"] },
  );
  expect(css).toContain(
    ".instui-bg-brand, .instui-button.-bg-brand, .instui-view.-bg-brand { background: var(--instui-color-background-brand); }",
  );
});

test("tokenUtilitiesCss maps each token to its property; class name is the token tail", () => {
  const css = tokenUtilitiesCss(
    [
      { property: "font-weight", tokens: ["--instui-font-weight-body-strong"] },
      { property: "border-radius", tokens: ["--instui-border-radius-md"] },
    ],
    { prefix: "instui" },
  );
  expect(css).toContain(
    ".instui-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }",
  );
  expect(css).toContain(
    ".instui-border-radius-md { border-radius: var(--instui-border-radius-md); }",
  );
  // Unprefixed opt-out drops the prefix but keeps the full token tail.
  expect(
    tokenUtilitiesCss([{ property: "font-weight", tokens: ["--instui-font-weight-body-strong"] }], {
      prefix: null,
    }),
  ).toContain(".font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }");
});
