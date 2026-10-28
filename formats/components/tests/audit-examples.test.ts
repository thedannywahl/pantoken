import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
import { Window } from "happy-dom";
import { COMPONENTS } from "../src/components/index.ts";
import { focus } from "../src/declarations/focus/index.ts";

const records = [...COMPONENTS, focus];

test.each(records)("documents accessibility guidance for $name", (record) => {
  const entry = parseCssDocs(record.rules("instui-")).find(
    (candidate) => candidate.name === record.name,
  );
  expect(entry?.accessibility?.trim(), record.name).toBeTruthy();
});

test.each(records)("authors an explicit audit example for $name", (record) => {
  const entries = parseCssDocs(record.rules("instui-"));
  const entry = entries.find((candidate) => candidate.name === record.name);
  expect(entry, record.name).toBeDefined();
  const examples = entry!.examples;
  const selected = resolveExampleTargets(examples).automatica11y;
  expect(selected.length, record.name).toBeGreaterThan(0);
  for (const index of selected) {
    const example = examples[index]!;
    const fences = [...example.matchAll(/```html[^\n]*\n([\s\S]*?)```/gu)];
    expect(fences.length, record.name).toBeGreaterThan(0);
    const window = new Window();
    window.document.body.innerHTML = fences.map((match) => match[1]).join("\n");
    expect(window.document.body.children.length, record.name).toBeGreaterThan(0);
    expect(window.document.querySelector('[class*="pfx-"]'), record.name).toBeNull();
    const ids = [...window.document.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size, record.name).toBe(ids.length);
    for (const element of window.document.querySelectorAll(
      "[aria-labelledby], [aria-controls], [aria-describedby]",
    )) {
      for (const attribute of ["aria-labelledby", "aria-controls", "aria-describedby"]) {
        for (const id of element.getAttribute(attribute)?.split(/\s+/u) ?? []) {
          expect(
            window.document.getElementById(id),
            `${record.name}: ${attribute}=${id}`,
          ).not.toBeNull();
        }
      }
    }
    if (record.name.startsWith("table.")) {
      expect(window.document.querySelector("table.instui-table"), record.name).not.toBeNull();
    }
    void window.happyDOM.abort();
  }
});

test.each(COMPONENTS.filter((record) => record.kind === "component" && !record.name.includes(".")))(
  "keeps documentation and Canvas examples available for $name",
  (record) => {
    const entry = parseCssDocs(record.rules("instui-")).find((item) => item.name === record.name)!;
    const targets = resolveExampleTargets(entry.examples);
    expect(targets.docs.length, record.name).toBeGreaterThan(0);
    expect(
      targets.docs.some((index) => !targets.automatica11y.includes(index)),
      record.name,
    ).toBe(true);
  },
);
