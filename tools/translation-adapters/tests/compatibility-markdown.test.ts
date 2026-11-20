import { expect, test } from "vite-plus/test";
import {
  compatibilityMarkdown,
  compatibilityUnits,
  equivalentCompatibilityPages,
  migrateCompatibilityTranslation,
  renderCompatibility,
  reuseCompatibilityRows,
} from "../src/compatibility-markdown.ts";
import { generatedFileMarkdown } from "../src/generated-values.ts";

const source = (rows: string): string =>
  `# Compatibility\n\n<!-- pantoken-generated-values -->\n\n| Package | Current format | Status |\n| --- | --- | --- |\n${rows}\n`;
const alpha = "| `alpha` | MUI 5 and 6 | Verified |";
const beta = "| `beta` | MUI 5 and 6 | Verified |";

test("keeps translations attached to row identity across version changes and reordering", () => {
  const old = source(`${alpha}\n${beta}`);
  const translated = generatedFileMarkdown(old)
    .template.replace("| Package | Current format | Status |", "| Csomag | Formátum | Állapot |")
    .replace("Verified", "Alpha verified")
    .replace("Verified", "Beta verified");
  const translations = migrateCompatibilityTranslation(old, translated);
  const current = compatibilityMarkdown(source(`${beta}\n${alpha.replace("5 and 6", "7 and 9")}`));
  const rendered = renderCompatibility(current, (key) => {
    const value = translations.get(key);
    if (value === undefined) throw new Error("Missing row");
    return value;
  });
  expect(rendered).toContain("| `beta` | MUI 5 and 6 | Beta verified |");
  expect(rendered).toContain("| `alpha` | MUI 7 and 9 | Alpha verified |");
});

test("a new row or changed prose affects only its own key", () => {
  const old = compatibilityUnits(compatibilityMarkdown(source(alpha)));
  const added = compatibilityUnits(compatibilityMarkdown(source(`${alpha}\n${beta}`)));
  expect(added.filter((unit) => !old.includes(unit))).toHaveLength(1);
  const changed = compatibilityUnits(
    compatibilityMarkdown(source(alpha.replace("Verified", "Unverified"))),
  );
  expect(changed.filter((unit) => !old.includes(unit))).toHaveLength(1);
  const listChange = compatibilityUnits(
    compatibilityMarkdown(source(alpha.replace("5 and 6", "5, 6, and 7"))),
  );
  expect(listChange.filter((unit) => !old.includes(unit))).toHaveLength(1);
});

test("reuses identical reviewed row wording only when the translations agree", () => {
  const original = source(alpha);
  const translations = migrateCompatibilityTranslation(
    original,
    generatedFileMarkdown(original).template,
  );
  const updated = compatibilityMarkdown(source(`${alpha}\n${beta}`));
  reuseCompatibilityRows(updated, translations);
  expect(compatibilityUnits(updated).every((unit) => translations.has(unit))).toBe(true);
});

test("rejects swapped row bindings and missing table placeholders", () => {
  const original = source(alpha);
  const whole = generatedFileMarkdown(original);
  expect(() =>
    migrateCompatibilityTranslation(
      original,
      whole.template
        .replace("{{ptk_code_0}}", "TEMP")
        .replace("{{ptk_code_1}}", "{{ptk_code_0}}")
        .replace("TEMP", "{{ptk_code_1}}"),
    ),
  ).toThrow("columns");
  const page = compatibilityMarkdown(original);
  const translations = migrateCompatibilityTranslation(original, whole.template);
  translations.set(page.scaffold, page.scaffold.replace("{{ptk_table_0}}", ""));
  expect(() => renderCompatibility(page, (unit) => translations.get(unit) ?? "")).toThrow(
    "table placeholders",
  );
});

test("ignores table padding but not content or alignment when comparing pages", () => {
  const compact = "| Package | Status |\n| --- | :--- |\n| `pkg` | Verified |\n";
  const padded =
    "| Package    | Status   |\n| ---------- | :------- |\n| `pkg`      | Verified |\n";
  expect(equivalentCompatibilityPages(compact, padded)).toBe(true);
  expect(equivalentCompatibilityPages(compact, padded.replace("Verified", "Unverified"))).toBe(
    false,
  );
  expect(equivalentCompatibilityPages(compact, padded.replace(":-------", "--------"))).toBe(false);
});
