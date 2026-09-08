import { describe, expect, test } from "vite-plus/test";
import type { LocalesConfig } from "../src/config.ts";
import {
  excludeLocale,
  includeLocale,
  localeMatchesPattern,
  localesForSpace,
  moveLocaleToTier,
  resolveLocaleStatus,
  resolveTier,
} from "../src/locales.ts";

const TIERS: LocalesConfig["tiers"] = {
  source: ["en"],
  primary: ["en-*", "hu", "de"],
  secondary: ["*"],
};

describe("localeMatchesPattern", () => {
  test("exact tag", () => {
    expect(localeMatchesPattern("hu", "hu")).toBe(true);
    expect(localeMatchesPattern("hu", "de")).toBe(false);
  });
  test("prefix glob", () => {
    expect(localeMatchesPattern("en-*", "en-GB")).toBe(true);
    expect(localeMatchesPattern("en-*", "en")).toBe(false);
  });
  test("catch-all", () => {
    expect(localeMatchesPattern("*", "anything")).toBe(true);
  });
});

describe("resolveTier", () => {
  test("first matching tier wins, in declaration order", () => {
    expect(resolveTier(TIERS, "en")).toBe("source");
    expect(resolveTier(TIERS, "en-GB")).toBe("primary");
    expect(resolveTier(TIERS, "hu")).toBe("primary");
    expect(resolveTier(TIERS, "mi")).toBe("secondary");
  });

  test("undefined when no tier matches (no catch-all present)", () => {
    expect(resolveTier({ source: ["en"] }, "hu")).toBeUndefined();
  });
});

describe("resolveLocaleStatus", () => {
  const locales: LocalesConfig = { registry: "x", exclude: ["mi"], tiers: TIERS };

  test("an excluded locale has no tier", () => {
    expect(resolveLocaleStatus(locales, "mi")).toEqual({
      locale: "mi",
      tier: undefined,
      excluded: true,
    });
  });

  test("a non-excluded locale resolves its tier", () => {
    expect(resolveLocaleStatus(locales, "hu")).toEqual({
      locale: "hu",
      tier: "primary",
      excluded: false,
    });
  });
});

describe("moveLocaleToTier", () => {
  test("moves a locale out of every other tier (no redundant entry when the target already matches via a catch-all)", () => {
    const next = moveLocaleToTier(TIERS, "de", "secondary");
    expect(next.primary).toEqual(["en-*", "hu"]);
    expect(next.secondary).toEqual(["*"]); // "*" already matches "de" — nothing to add
    expect(resolveTier(next, "de")).toBe("secondary");
  });

  test("adds an exact entry when the target tier has no pattern that already matches", () => {
    const next = moveLocaleToTier(TIERS, "de", "source");
    expect(next.source).toEqual(["en", "de"]);
  });

  test("is idempotent when the locale is already in the target tier", () => {
    const next = moveLocaleToTier(TIERS, "hu", "primary");
    expect(next.primary.filter((p) => p === "hu")).toEqual(["hu"]);
  });

  test("preserves tier declaration order", () => {
    const next = moveLocaleToTier(TIERS, "de", "source");
    expect(Object.keys(next)).toEqual(["source", "primary", "secondary"]);
  });

  test("throws for an unknown target tier", () => {
    expect(() => moveLocaleToTier(TIERS, "hu", "pilot")).toThrow(/Unknown tier "pilot"/u);
  });

  test("does not mutate the input", () => {
    const before = JSON.stringify(TIERS);
    moveLocaleToTier(TIERS, "de", "secondary");
    expect(JSON.stringify(TIERS)).toBe(before);
  });
});

describe("exclude/includeLocale", () => {
  const locales: LocalesConfig = { registry: "x", exclude: [], tiers: TIERS };

  test("excludeLocale adds once, idempotently", () => {
    const once = excludeLocale(locales, "mi");
    expect(once.exclude).toEqual(["mi"]);
    const twice = excludeLocale(once, "mi");
    expect(twice.exclude).toEqual(["mi"]);
    expect(twice).toBe(once); // idempotent no-op returns the same reference
  });

  test("includeLocale removes, idempotently", () => {
    const excluded: LocalesConfig = { ...locales, exclude: ["mi"] };
    const included = includeLocale(excluded, "mi");
    expect(included.exclude).toEqual([]);
    const again = includeLocale(included, "mi");
    expect(again).toBe(included);
  });
});

describe("localesForSpace", () => {
  const all = ["en", "hu", "de", "mi"];

  test("no scope returns every locale", () => {
    expect(localesForSpace(all, undefined)).toEqual(all);
  });

  test("`only` restricts to the listed locales", () => {
    expect(localesForSpace(all, { only: ["hy"] })).toEqual([]);
    expect(localesForSpace(all, { only: ["hu"] })).toEqual(["hu"]);
  });

  test("`exclude` removes the listed locales", () => {
    expect(localesForSpace(all, { exclude: ["mi"] })).toEqual(["en", "hu", "de"]);
  });
});
