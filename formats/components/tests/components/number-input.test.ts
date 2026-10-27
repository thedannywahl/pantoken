import { expect, test } from "vite-plus/test";
import { numberInputCss } from "../../src/index.ts";
import { numberInput } from "../../src/components/number-input/index.ts";
import { validate } from "../_validate.ts";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";

test("number-input: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(numberInput);
});

test("number-input has a +/- arrow column from the arrows tokens and hides native spinners", () => {
  const css = numberInputCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-number-input)");
  expect(css).toContain("& .arrows");
  expect(css).toContain("var(--instui-component-text-input-arrows-background-color)");
  expect(css).toContain("var(--instui-color-icon-interactive-action-secondary-base)");
  expect(css).toContain("::-webkit-inner-spin-button");
  expect(css).toContain("appearance: textfield");
});

test("number-input examples keep redundant hidden arrows out of the tab order", () => {
  const [record] = parseCssDocs(numberInputCss({ prefix: "instui" }));
  expect(record!.examples.length).toBeGreaterThan(0);
  for (const example of record!.examples) {
    const window = new Window();
    try {
      window.document.body.innerHTML = exampleHtml(example);
      const input = window.document.querySelector("input")!;
      expect(input.type).toBe("number");
      expect(input.getAttribute("aria-label")).toBeTruthy();
      expect(input.tabIndex).toBe(0);
      const arrows = [...window.document.querySelectorAll(".arrows button")];
      expect(arrows).toHaveLength(2);
      for (const arrow of arrows) {
        expect(arrow.getAttribute("aria-hidden")).toBe("true");
        expect(arrow.getAttribute("tabindex")).toBe("-1");
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
});
