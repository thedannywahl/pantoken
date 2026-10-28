import { expect, test } from "vite-plus/test";
import { radioInputGroupCss } from "../../src/index.ts";
import { radioInputGroup } from "../../src/components/radio-input-group/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";
import { parseCssDocs } from "@cssdoc/core";
import { Window, type HTMLInputElement } from "happy-dom";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";

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
  const auditExamples = resolveExampleTargets(record!.examples).automatica11y;
  for (const [index, example] of record!.examples.entries()) {
    const window = new Window();
    try {
      window.document.body.innerHTML = exampleHtml(example);
      const groups = [...window.document.querySelectorAll("fieldset")];
      const isAudit = auditExamples.includes(index);
      if (isAudit) {
        expect(groups.length).toBeGreaterThan(2);
        for (const modifier of [
          "-layout-columns",
          "-layout-inline",
          "-required",
          "-variant-toggle",
        ]) {
          expect(groups.some((group) => group.classList.contains(modifier))).toBe(true);
        }
      } else {
        expect(groups).toHaveLength(2);
      }
      const names = new Set<string>();
      const legends = new Set<string>();
      for (const group of groups) {
        const radios = [...group.querySelectorAll("input")];
        if (isAudit) expect(radios.length).toBeGreaterThanOrEqual(2);
        else expect(radios).toHaveLength(3);
        expect(radios.every((radio) => radio.type === "radio")).toBe(true);
        const name = radios[0]!.name;
        const legend = group.querySelector("legend")!.textContent.trim();
        expect(name).toBeTruthy();
        expect(legend).toBeTruthy();
        expect(names.has(name)).toBe(false);
        expect(legends.has(legend)).toBe(false);
        expect(radios.every((radio) => radio.name === name)).toBe(true);
        for (const radio of radios) {
          expect(radio.labels).toHaveLength(1);
          expect(radio.labels![0]!.textContent.trim()).toBeTruthy();
        }
        expect(radios.filter((radio) => radio.checked)).toHaveLength(1);
        names.add(name);
        legends.add(legend);
      }
      for (const group of groups) {
        const otherSelections = groups
          .filter((other) => other !== group)
          .map((other) => [...other.querySelectorAll("input")].find((radio) => radio.checked)!);
        const alternative = group.querySelector<HTMLInputElement>(
          "input:not(:checked):not(:disabled)",
        );
        expect(alternative).not.toBeNull();
        alternative!.click();
        expect(alternative!.checked).toBe(true);
        expect([...group.querySelectorAll("input")].filter((radio) => radio.checked)).toHaveLength(
          1,
        );
        for (const selection of otherSelections) expect(selection.checked).toBe(true);
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
});
