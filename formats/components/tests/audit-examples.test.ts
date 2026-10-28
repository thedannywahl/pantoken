import { expect, test } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
import { Window } from "happy-dom";
import { COMPONENTS } from "../src/components/index.ts";
import { focus } from "../src/declarations/focus/index.ts";
import { CORE_AUDIT_EXTRAS, PLUGIN_AUDIT_RECORDS } from "../scripts/audit-plugin-components.ts";
import { exampleHtml } from "../scripts/audit-accessibility.ts";

const records = [...COMPONENTS, focus, ...CORE_AUDIT_EXTRAS];

test.each(PLUGIN_AUDIT_RECORDS)("documents and audits the plugin component $name", (record) => {
  const entry = parseCssDocs(record.rules("instui-")).find(
    (candidate) => candidate.name === record.name,
  );
  expect(entry?.accessibility?.trim(), record.name).toBeTruthy();
  expect(resolveExampleTargets(entry!.examples).automatica11y.length, record.name).toBeGreaterThan(
    0,
  );
});

test.each(records)("documents accessibility guidance for $name", (record) => {
  const entry = parseCssDocs(record.rules("instui-")).find(
    (candidate) => candidate.name === record.name,
  );
  expect(entry?.accessibility?.trim(), record.name).toBeTruthy();
});

test.each([...records, ...PLUGIN_AUDIT_RECORDS])(
  "authors an explicit audit example for $name",
  (record) => {
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
      window.document.body.innerHTML = exampleHtml(example);
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
  },
);

test.each(
  PLUGIN_AUDIT_RECORDS.filter((record) =>
    ["banner", "button-set", "segmented-control", "skeleton-loader"].includes(record.name),
  ),
)("covers every canonical visual modifier for the plugin $name", (record) => {
  const entry = parseCssDocs(record.rules("instui-")).find((item) => item.name === record.name)!;
  const markup = resolveExampleTargets(entry.examples)
    .automatica11y.map((index) => exampleHtml(entry.examples[index]!))
    .join("\n");
  const window = new Window();
  window.document.body.innerHTML = markup;
  const classes = new Set(
    [...window.document.querySelectorAll("[class]")].flatMap((element) => [...element.classList]),
  );
  for (const modifier of entry.modifiers) {
    if (modifier.pattern || modifier.alias) continue;
    expect(classes.has(modifier.name), `${record.name}: ${modifier.name}`).toBe(true);
  }
  void window.happyDOM.abort();
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
