import { expect, test } from "vite-plus/test";
import { baseCss } from "../../src/index.ts";
import { base } from "../../src/rules/base.ts";
import { validate } from "../_validate.ts";

test("base: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(base);
});

test("base is an opt-in global reset painting the page surface from tokens", () => {
  const css = baseCss();
  expect(css).toContain("box-sizing: border-box");
  expect(css).toContain(":where(body)");
  expect(css).toContain("color-scheme: light dark");
  expect(css).toContain("background: var(--instui-color-background-page)");
  expect(css).toContain("color: var(--instui-color-text-base)");
  expect(css).toContain("var(--instui-font-family-base)");
  // Base is a global reset only — it must not carry component classes.
  expect(css).not.toContain(".instui-");
});

test("base carries the focus-outline ring for focusables out of the box", () => {
  const css = baseCss();
  // A zero-specificity ring on the common focusables, revealed on :focus-visible. The ring reads the
  // --instui-focus-outline-* custom properties, which now ship in the token sheet (@pantoken/css), so
  // base.css references them but no longer defines them.
  expect(css).toContain("outline-color: var(--instui-focus-outline-color)");
  expect(css).not.toContain(
    "--instui-focus-outline-color: var(--instui-component-shared-tokens-focus-outline-info-color)",
  );
  expect(css).toContain(":where(a, button, input, select, textarea, summary, [tabindex])");
  expect(css).toContain(":where(:focus-visible)");
  expect(css).toContain(":where(.-focus-color-danger):where(:focus-visible)");
  expect(css).toContain(":where(.-without-focus-animation)");
});
