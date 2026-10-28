import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { maskCss } from "../../src/index.ts";
import { mask } from "../../src/components/mask/index.ts";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";
import { validate } from "../_validate.ts";

test("mask: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(mask);
});

test("mask examples preserve named loading feedback independently of spinner rotation", () => {
  const [record] = parseCssDocs(maskCss({ prefix: "instui" }));
  expect(record.examples).toHaveLength(2);
  for (const example of record.examples) {
    const window = new Window();
    try {
      window.document.body.innerHTML = exampleHtml(example);
      const spinner = window.document.querySelector(".instui-mask .instui-spinner")!;
      expect(spinner.getAttribute("role")).toBe("status");
      expect(spinner.getAttribute("aria-label")).toBe("Loading");
      expect(spinner.closest('[hidden], [aria-hidden="true"]')).toBeNull();
    } finally {
      void window.happyDOM.abort();
    }
  }
});
