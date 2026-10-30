import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
import { Window, type HTMLElement } from "happy-dom";
import { pillCss } from "../../src/index.ts";
import { pill } from "../../src/components/pill/index.ts";
import { validate } from "../_validate.ts";
import { exampleHtml } from "../../scripts/audit-accessibility.ts";

test("pill: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(pill);
});

test("pill uses the 1.9.0 size and spacing tokens", () => {
  const css = pillCss({ prefix: "instui" });
  expect(css).toContain("var(--instui-component-pill-neutral-background-color)");
  expect(css).toContain("var(--instui-component-pill-padding-vertical)");
  expect(css).toContain("var(--instui-component-pill-gap-content)");
  expect(css).toContain("var(--instui-component-pill-gap-icon-label)");
  expect(css).toContain(".-size-x-small");
  expect(css).toContain("var(--instui-component-pill-height-x-small)");
  expect(css).toContain(".-size-medium");
  expect(css).toContain("var(--instui-component-pill-height-medium)");
  expect(css).toContain(".-size-large");
  expect(css).toContain("var(--instui-component-pill-height-large)");
});

test("pill supports status and accent backgrounds", () => {
  const css = pillCss({ prefix: "instui" });
  for (const color of [
    "neutral",
    "info",
    "success",
    "warning",
    "danger",
    "error",
    "plum",
    "aurora",
    "sky",
    "orange",
    "violet",
    "sea",
    "stone",
  ]) {
    expect(css).toContain(`.-color-${color}`);
  }
  expect(css).toContain("var(--instui-component-pill-error-background-color)");
  expect(css).toContain("var(--instui-component-pill-plum-background-color)");
  expect(css).toContain("var(--instui-component-pill-stone-border-color)");
});

test("pill documentation wraps and audit examples stack without changing compact pill sizing", () => {
  const css = pillCss({ prefix: "instui" });
  const [record] = parseCssDocs(css);
  const targets = resolveExampleTargets(record.examples);
  expect(targets.docs).toHaveLength(1);
  expect(targets.automatica11y).toHaveLength(1);
  for (const index of [...targets.docs, ...targets.automatica11y]) {
    const window = new Window();
    try {
      const { document } = window;
      document.body.innerHTML = exampleHtml(record.examples[index]!);
      const pills = document.querySelectorAll(".instui-pill");
      expect(pills.length).toBeGreaterThan(0);
      if (targets.docs.includes(index)) {
        const group = document.querySelector<HTMLElement>(".instui-view.--display-flex.--gap-md")!;
        expect(group).not.toBeNull();
        expect(group.style.flexWrap).toBe("wrap");
        expect(group.querySelectorAll(".instui-pill")).toHaveLength(6);
      }
      if (targets.automatica11y.includes(index)) {
        for (const pill of pills) {
          const group = pill.parentElement!;
          if (!(group instanceof window.HTMLElement)) {
            throw new Error("Pill audit wrapper must be an HTML element");
          }
          expect(group.tagName).toBe("DIV");
          expect(group.parentElement).toBe(document.body);
          expect(group.children).toHaveLength(1);
          expect(group.classList.contains("--display-flex")).toBe(false);
          expect(group.style.width).toBe("");
          expect(group.style.minWidth).toBe("");
        }
      }
    } finally {
      void window.happyDOM.abort();
    }
  }
  expect(css).toContain("height: var(--instui-component-pill-height);");
  expect(css).toContain("max-width: var(--instui-component-pill-max-width);");
});
