import { expect, test } from "vite-plus/test";
import { radioInputGroupCss } from "../../src/index.ts";
import { radioInputGroup } from "../../src/components/radio-input-group/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";
import { parseCssDocs } from "@cssdoc/core";
import { Window } from "happy-dom";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";

test("radio-input-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(radioInputGroup);
});

test("radio-input-group lays toggle radios out flush as a segmented control", () => {
  const css = norm(radioInputGroupCss({ prefix: "instui" }));
  expect(css).toContain("@scope (.instui-radio-input-group)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&\s*>\s*legend/u);
  // simple variant flows into a row for -layout-columns/-inline
  expect(css).toMatch(/&\.-layout-columns/u);
  // toggle variant: segments sit flush (gap: 0), no connecting borders or overlap (InstUI colSpacing="none")
  expect(css).toMatch(/&\.-variant-toggle\s*\{/u);
  expect(css).toMatch(/\.-variant-toggle \{[^}]*gap: 0/);
  expect(css).not.toContain("border-radius: 0");
  expect(css).not.toContain("margin-inline-start: calc(-1");
  // the focused segment is lifted so its focus ring isn't clipped by a neighbour
  expect(css).toMatch(
    /&\.-variant-toggle\s*>\s*\.instui-radio:has\(input:focus-visible\)\s*\{\s*z-index:\s*1;/u,
  );
});

test("independent radio-group examples have distinct names, legends, and selections", () => {
  const [record] = parseCssDocs(radioInputGroupCss({ prefix: "instui" }));
  expect(record!.examples.length).toBeGreaterThan(0);
  for (const example of record!.examples) {
    const window = new Window();
    try {
      window.document.body.innerHTML = exampleHtml(example);
      const groups = [...window.document.querySelectorAll("fieldset")];
      expect(groups).toHaveLength(2);
      const names = new Set<string>();
      const legends = new Set<string>();
      for (const group of groups) {
        const radios = [...group.querySelectorAll("input")];
        expect(radios).toHaveLength(3);
        expect(radios.every((radio) => radio.type === "radio")).toBe(true);
        const name = radios[0]!.name;
        const legend = group.querySelector("legend")!.textContent.trim();
        expect(name).toBeTruthy();
        expect(legend).toBeTruthy();
        expect(names.has(name)).toBe(false);
        expect(legends.has(legend)).toBe(false);
        expect(radios.every((radio) => radio.name === name)).toBe(true);
        expect(radios.filter((radio) => radio.checked)).toHaveLength(1);
        names.add(name);
        legends.add(legend);
      }
      groups[1]!.querySelectorAll("input")[2]!.click();
      expect(groups[0]!.querySelectorAll("input:checked")).toHaveLength(1);
      expect(groups[0]!.querySelector("input")!.checked).toBe(true);
      expect(groups[1]!.querySelectorAll("input:checked")).toHaveLength(1);
    } finally {
      void window.happyDOM.abort();
    }
  }
});
