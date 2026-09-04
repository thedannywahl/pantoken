import { expect, test } from "vite-plus/test";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "./i18n.ts";

test("parseRequestedLocales falls back to every locale when unset or blank", () => {
  expect(parseRequestedLocales(undefined, NON_ROOT_LOCALES)).toBe(NON_ROOT_LOCALES);
  expect(parseRequestedLocales("  ", NON_ROOT_LOCALES)).toBe(NON_ROOT_LOCALES);
});

test("parseRequestedLocales accepts one tag or a comma/space-separated list", () => {
  expect(parseRequestedLocales("hu", NON_ROOT_LOCALES)).toEqual(["hu"]);
  expect(parseRequestedLocales("hu, fr en-AU", NON_ROOT_LOCALES)).toEqual(["hu", "fr", "en-AU"]);
});

test("parseRequestedLocales rejects a tag that isn't a docs locale", () => {
  expect(() => parseRequestedLocales("hu,xx", NON_ROOT_LOCALES)).toThrow(/xx/);
});

test("parseRequestedLocales rejects a tier that holds no docs locale", () => {
  expect(() => parseRequestedLocales("source", NON_ROOT_LOCALES)).toThrow(/matched no docs locale/);
});

test("parseRequestedLocales subtracts a `-` prefixed entry from every locale", () => {
  const resolved = parseRequestedLocales("-ga", NON_ROOT_LOCALES);
  expect(resolved).not.toContain("ga");
  expect(resolved.length).toBe(NON_ROOT_LOCALES.length - 1);
});

test("parseRequestedLocales subtracts a tag or tier from an explicit selection", () => {
  expect(parseRequestedLocales("primary,-hu", NON_ROOT_LOCALES)).toEqual([
    "en-AU",
    "en-CA",
    "en-GB",
  ]);
  expect(parseRequestedLocales("-secondary", NON_ROOT_LOCALES)).toEqual([
    "en-AU",
    "en-CA",
    "en-GB",
    "hu",
  ]);
});

test("parseRequestedLocales rejects a selection that subtracts everything", () => {
  expect(() => parseRequestedLocales("hu,-hu", NON_ROOT_LOCALES)).toThrow(/matched no docs locale/);
});

test("parseRequestedLocales expands a config tier name to its locales", () => {
  // `primary` is `["en-*", "hu"]` in i18n.config.json; `secondary` is the `"*"` catch-all.
  const primary = parseRequestedLocales("primary", NON_ROOT_LOCALES);
  expect(primary).toEqual(["en-AU", "en-CA", "en-GB", "hu"]);

  const secondary = parseRequestedLocales("secondary", NON_ROOT_LOCALES);
  expect(secondary).not.toContain("hu");
  expect(secondary).toContain("fr");
  expect(primary.length + secondary.length).toBe(NON_ROOT_LOCALES.length);
});

test("parseRequestedLocales mixes tiers with tags and dedupes", () => {
  expect(parseRequestedLocales("primary,hu,ga", NON_ROOT_LOCALES)).toEqual([
    "en-AU",
    "en-CA",
    "en-GB",
    "hu",
    "ga",
  ]);
});
