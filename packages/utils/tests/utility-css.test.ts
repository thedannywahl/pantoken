import { describe, expect, test } from "vite-plus/test";
import {
  colorUtilitiesCss,
  globalModifierSelector,
  tokenUtilitiesCss,
} from "../src/utility-css.ts";

test("colorUtilitiesCss maps bg/text/border to semantic colour tokens only", () => {
  const css = colorUtilitiesCss(
    {
      background: ["brand", "success"],
      text: ["secondary"],
      stroke: ["base"],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(
    ":where(*).--bg-brand.--bg-brand.--bg-brand { background: var(--instui-color-background-brand); }",
  );
  expect(css).toContain(
    ":where(*).--text-secondary.--text-secondary.--text-secondary { color: var(--instui-color-text-secondary); }",
  );
  expect(css).toContain(
    ":where(*).--border-base.--border-base.--border-base { border-color: var(--instui-color-stroke-base); }",
  );
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
    ":where(*).--bg-primary.--bg-primary.--bg-primary { background: var(--instui-component-view-background-primary); }",
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
    ":where(*).--font-weight-body-strong.--font-weight-body-strong.--font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }",
  );
  expect(css).toContain(
    ":where(*).--border-radius-md.--border-radius-md.--border-radius-md { border-radius: var(--instui-border-radius-md); }",
  );
  // The prefix option no longer affects the selector: matching is by class name alone now.
  expect(
    tokenUtilitiesCss([{ property: "font-weight", tokens: ["--instui-font-weight-body-strong"] }], {
      prefix: null,
    }),
  ).toContain(
    ":where(*).--font-weight-body-strong.--font-weight-body-strong.--font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }",
  );
});

describe("globalModifierSelector", () => {
  test("wraps the modifier class in :where(*) and repeats it 3x, regardless of prefix", () => {
    expect(globalModifierSelector("instui-", "bg-secondary")).toBe(
      ":where(*).--bg-secondary.--bg-secondary.--bg-secondary",
    );
    expect(globalModifierSelector("", "bg-secondary")).toBe(
      ":where(*).--bg-secondary.--bg-secondary.--bg-secondary",
    );
  });
});
