import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
import { Window } from "happy-dom";
import { maskCss } from "../../src/index.ts";
import { mask } from "../../src/components/mask/index.ts";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";
import { validate } from "../_validate.ts";

test("mask: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(mask);
});

test("mask docs preserve loading feedback and the audit isolates every empty mask surface", () => {
  const [record] = parseCssDocs(maskCss({ prefix: "instui" }));
  expect(record.examples).toHaveLength(4);
  const targets = resolveExampleTargets(record.examples);
  for (const [index, example] of record.examples.entries()) {
    const window = new Window();
    try {
      window.document.body.innerHTML = exampleHtml(example);
      if (targets.automatica11y.includes(index)) {
        expect(window.document.querySelector(".instui-spinner")).toBeNull();
        const masks = [...window.document.querySelectorAll(".instui-mask")];
        expect(masks).toHaveLength(1);
        for (const mask of masks) {
          expect(mask.children).toHaveLength(0);
          expect(mask.getAttribute("aria-label")).toBeTruthy();
        }
      } else {
        const spinner = window.document.querySelector(".instui-mask .instui-spinner")!;
        expect(spinner.getAttribute("role")).toBe("status");
        expect(spinner.getAttribute("aria-label")).toBe("Loading");
        expect(spinner.closest('[hidden], [aria-hidden="true"]')).toBeNull();
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
});
