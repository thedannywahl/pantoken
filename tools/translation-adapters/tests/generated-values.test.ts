import { describe, expect, test } from "vite-plus/test";
import {
  generatedMarkdown,
  migrateGeneratedMarkdown,
  restoreGeneratedMarkdown,
  assertGeneratedTranslation,
  generatedFileMarkdown,
  scopeGeneratedMarkdown,
} from "../src/generated-values.ts";

describe("generated Markdown values", () => {
  test("shares prose templates, never bindings, including equal values that diverge", () => {
    const old = generatedMarkdown("Minimum: `1.0`. Latest: `1.0`.");
    const current = generatedMarkdown("Minimum: `1.0`. Latest: `12.345.6`.");
    expect(current.template).toBe(old.template);
    const translation = "Latest: {{ptk_code_1}}; minimum: {{ptk_code_0}}.";
    expect(restoreGeneratedMarkdown(translation, old)).toBe("Latest: `1.0`; minimum: `1.0`.");
    expect(restoreGeneratedMarkdown(translation, current)).toBe(
      "Latest: `12.345.6`; minimum: `1.0`.",
    );
  });

  test("does not mask prose numbers, changed wording, or fenced examples", () => {
    const source = "2 examples using ``a`b``.\n\n```html\n<p>`example`</p>\n```";
    const generated = generatedMarkdown(source);
    expect(generated.values).toEqual(["``a`b``"]);
    expect(generated.template).toContain("2 examples");
    expect(generated.template).toContain("<p>`example`</p>");
    expect(restoreGeneratedMarkdown(generated.template, generated)).toBe(source);
    expect(generatedMarkdown(source.replace("2 examples", "3 examples")).template).not.toBe(
      generated.template,
    );
  });

  test("ignores padding and code-value widths only in opted-in generated tables", () => {
    const compact = "| Version | Status |\n| --- | --- |\n| `1` | Verified |";
    const padded =
      "| Version     | Status   |\n| ----------- | -------- |\n| `123.45.67` | Verified |";
    expect(generatedMarkdown(compact, { tables: true }).template).toBe(
      generatedMarkdown(padded, { tables: true }).template,
    );
    expect(generatedMarkdown(compact).template).not.toBe(generatedMarkdown(padded).template);
    expect(
      generatedMarkdown(padded.replace("Verified", "Unverified"), { tables: true }).template,
    ).not.toBe(generatedMarkdown(compact, { tables: true }).template);
  });

  test.each([
    "",
    "{{ptk_code_1}}",
    "{{ptk_code_0}} {{ptk_code_0}}",
    "{{ptk_code_00}}",
    "{{ptk_code_0",
    "{{ptk_code_bad}}",
  ])("rejects corrupted placeholders: %s", (translation) => {
    expect(() =>
      restoreGeneratedMarkdown(translation, generatedMarkdown("Use `value`.")),
    ).toThrow();
  });

  test("migrates unique legacy values even when the translator reorders them", () => {
    expect(migrateGeneratedMarkdown("From `1` to `2`.", "`2` a `1` utan.")).toBe(
      "{{ptk_code_1}} a {{ptk_code_0}} utan.",
    );
    expect(() => migrateGeneratedMarkdown("`1` and `1`", "`1` es `1`")).toThrow("Ambiguous");
    expect(() => migrateGeneratedMarkdown("Use `1`", "Use `2`")).toThrow("changed or lost");
  });

  test("link destinations change without retranslating their visible labels", () => {
    const old = generatedMarkdown("See [the reference](../old.md).");
    const current = generatedMarkdown("See [the reference](../new.md).");
    expect(old.template).toBe(current.template);
    expect(restoreGeneratedMarkdown("Lasd [a leirast]({{ptk_code_0}}).", current)).toBe(
      "Lasd [a leirast](../new.md).",
    );
    expect(generatedMarkdown("See [another reference](../new.md).").template).not.toBe(
      current.template,
    );
  });

  test("migrates equal table versions by row identity and column, not global replacement", () => {
    const source = "| Package | Range | Resolved |\n| --- | --- | --- |\n| `pkg` | `1` | `1` |";
    const translated =
      "| Csomag | Tartomany | Feloldott |\n| --- | --- | --- |\n| `pkg` | `1` | `1` |";
    const options = { tables: true, tableValuesOnly: true };
    const migrated = migrateGeneratedMarkdown(source, translated, options);
    const current = generatedMarkdown(source.replace("| `1` | `1` |", "| `1` | `2` |"), options);
    expect(restoreGeneratedMarkdown(migrated, current)).toContain("| `pkg` | `1` | `2` |");
  });

  test("normalizes generated format versions without hiding explanatory words or list shapes", () => {
    const source =
      "<!-- pantoken-generated-values -->\n| Package | Current format |\n| --- | --- |\n| `pkg` | MUI 5 and 6 adapters |\n";
    const old = generatedFileMarkdown(source);
    expect(generatedFileMarkdown(source.replace("5 and 6", "7 and 9")).template).toBe(old.template);
    expect(generatedFileMarkdown(source.replace("adapters", "themes")).template).not.toBe(
      old.template,
    );
    expect(generatedFileMarkdown(source.replace("5 and 6", "5, 6, and 7")).template).not.toBe(
      old.template,
    );
    expect(
      generatedFileMarkdown(source.replace("<!-- pantoken-generated-values -->\n", "")).values,
    ).toEqual([]);
  });

  test("scopes keep pages distinct and must survive translation exactly once", () => {
    const generated = scopeGeneratedMarkdown(generatedMarkdown("Use `pkg`."), "components/a.md");
    const other = scopeGeneratedMarkdown(generatedMarkdown("Use `pkg`."), "components/b.md");
    expect(generated.template).not.toBe(other.template);
    expect(restoreGeneratedMarkdown(generated.template, generated)).toBe("Use `pkg`.");
    expect(() => restoreGeneratedMarkdown(other.template, generated)).toThrow("scope");
    expect(() =>
      restoreGeneratedMarkdown(generated.template.replace(/^.*\n/u, ""), generated),
    ).toThrow("scope");
    expect(() =>
      assertGeneratedTranslation(generated.template, generated.template + "\n{{ptk_code_0}}"),
    ).toThrow();
    expect(() =>
      restoreGeneratedMarkdown(generated.template.replace("Use", generated.template), generated),
    ).toThrow("scope");
  });
});
