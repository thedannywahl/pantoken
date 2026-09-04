import { describe, expect, test } from "vite-plus/test";
import { missingPluralCategories, validateMf2 } from "../src/mf2.ts";

describe("validateMf2", () => {
  test("a plain pattern message is valid", () => {
    const result = validateMf2("Hello world.");
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("a message with a variable and a function is valid, and reports both", () => {
    const result = validateMf2(".input {$count :number}\n{{You have {$count} item(s).}}");
    expect(result.valid).toBe(true);
    expect(result.variables).toEqual(new Set(["count"]));
    expect(result.functions).toEqual(new Set(["number"]));
  });

  test("a real plural select message is valid", () => {
    const source = [
      ".input {$count :number}",
      ".match $count",
      "one {{{$count} file selected}}",
      "* {{{$count} files selected}}",
    ].join("\n");
    expect(validateMf2(source).valid).toBe(true);
  });

  test("a syntax error is invalid with a non-empty errors array", () => {
    const result = validateMf2("{{unterminated");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test("a select message missing its catch-all fallback is invalid", () => {
    const source = [".input {$count :number}", ".match $count", "one {{one}}"].join("\n");
    const result = validateMf2(source);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("missing-fallback");
  });

  test("a duplicate declaration is invalid", () => {
    const source = [".input {$x :number}", ".input {$x :string}", "{{{$x}}}"].join("\n");
    expect(validateMf2(source).errors).toContain("duplicate-declaration");
  });
});

describe("missingPluralCategories", () => {
  test("returns [] for a plain (non-select) message", () => {
    expect(missingPluralCategories("Hello world.", "ar")).toEqual([]);
  });

  test("a catch-all variant only satisfies the 'other' category, not the rest", () => {
    // Arabic needs zero/one/two/few/many/other; only "one" and the catch-all ("other") are given.
    const source = [".input {$count :number}", ".match $count", "one {{one}}", "* {{other}}"].join(
      "\n",
    );
    const missing = missingPluralCategories(source, "ar");
    expect(missing.sort()).toEqual(["few", "many", "two", "zero"]);
  });

  test("returns [] when every category is given an explicit literal variant", () => {
    const source = [
      ".input {$count :number}",
      ".match $count",
      "zero {{zero}}",
      "one {{one}}",
      "two {{two}}",
      "few {{few}}",
      "many {{many}}",
      "other {{other}}",
    ].join("\n");
    expect(missingPluralCategories(source, "ar")).toEqual([]);
  });

  test("reports every CLDR category missing for a target with no catch-all", () => {
    // Arabic has 6 plural categories (zero/one/two/few/many/other); this only ever covers "one".
    const source = [".input {$count :number}", ".match $count", "one {{one}}"].join("\n");
    const missing = missingPluralCategories(source, "ar");
    expect(missing).toContain("other");
    expect(missing).not.toContain("one");
  });

  test("Japanese needs only the 'other' category, already covered", () => {
    const source = [
      ".input {$count :number}",
      ".match $count",
      "one {{one}}",
      "other {{other}}",
    ].join("\n");
    expect(missingPluralCategories(source, "ja")).toEqual([]);
  });

  test("returns [] for an unparseable message rather than throwing", () => {
    expect(missingPluralCategories("{{unterminated", "ar")).toEqual([]);
  });
});
