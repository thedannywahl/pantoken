import { expect, test } from "vite-plus/test";
import {
  createLocaleLookup,
  detectLocale,
  localeDirection,
  resolveSupportedLocale,
  validateLocaleTag,
} from "../src/locale.ts";

// ---------------------------------------------------------------------------
// detectLocale
// ---------------------------------------------------------------------------

test("detectLocale prefers the --lang flag over everything else", () => {
  expect(detectLocale({ langFlag: "hu", env: { LANG: "en_US.UTF-8" }, intl: () => "fr" })).toBe(
    "hu",
  );
});

test("detectLocale falls back to LC_ALL over LANG", () => {
  expect(detectLocale({ env: { LC_ALL: "hu_HU.UTF-8", LANG: "en_US.UTF-8" } })).toBe("hu");
});

test("detectLocale reads LANG when LC_ALL is unset", () => {
  expect(detectLocale({ env: { LANG: "hu_HU.UTF-8" } })).toBe("hu");
});

test("detectLocale strips encoding and territory from env locale strings", () => {
  expect(detectLocale({ env: { LANG: "en_US.UTF-8" } })).toBe("en");
});

test("detectLocale falls back to the Intl API when no env locale is set", () => {
  expect(detectLocale({ env: {}, intl: () => "hu-HU" })).toBe("hu");
});

test("detectLocale defaults to English when nothing else resolves", () => {
  expect(detectLocale({ env: {}, intl: () => "" })).toBe("en");
});

test("detectLocale defaults to English when the Intl API throws", () => {
  expect(
    detectLocale({
      env: {},
      intl: () => {
        throw new Error("Intl not available");
      },
    }),
  ).toBe("en");
});

test("detectLocale falls back to process.env and the real Intl API when nothing is injected", () => {
  const result = detectLocale({});
  expect(typeof result).toBe("string");
  expect(result.length).toBeGreaterThan(0);
});

test("detectLocale uses the real Intl API when no env locale and no intl override are given", () => {
  const result = detectLocale({ env: {} });
  expect(typeof result).toBe("string");
  expect(result.length).toBeGreaterThan(0);
});

test("detectLocale keeps a region subtag the registry actually supports", () => {
  expect(detectLocale({ env: { LANG: "pt_BR.UTF-8" } })).toBe("pt-BR");
  expect(detectLocale({ env: {}, intl: () => "zh-Hant-TW" })).toBe("zh-Hant");
});

test("detectLocale narrows an unsupported region to its supported base language", () => {
  expect(detectLocale({ env: { LANG: "es_MX.UTF-8" } })).toBe("es");
});

test("detectLocale ignores an unsupported ambient locale rather than emitting it", () => {
  expect(detectLocale({ env: { LANG: "zz_ZZ.UTF-8" }, intl: () => "" })).toBe("en");
});

// ---------------------------------------------------------------------------
// resolveSupportedLocale / validateLocaleTag / localeDirection
// ---------------------------------------------------------------------------

test("resolveSupportedLocale canonicalizes case and separators", () => {
  expect(resolveSupportedLocale("PT_br")).toBe("pt-BR");
  expect(resolveSupportedLocale("hu")).toBe("hu");
});

test("resolveSupportedLocale returns undefined for an unknown tag", () => {
  expect(resolveSupportedLocale("zz")).toBeUndefined();
});

test("validateLocaleTag rejects an unsupported --lang instead of silently using English", () => {
  expect(() => validateLocaleTag("zz")).toThrow(/is not supported/u);
});

test("validateLocaleTag returns the registry's canonical spelling", () => {
  expect(validateLocaleTag("pt_br")).toBe("pt-BR");
});

test("localeDirection reports rtl for right-to-left locales and ltr otherwise", () => {
  expect(localeDirection("ar")).toBe("rtl");
  expect(localeDirection("he")).toBe("rtl");
  expect(localeDirection("fa")).toBe("rtl");
  expect(localeDirection("hu")).toBe("ltr");
  expect(localeDirection("nonsense")).toBe("ltr");
});

// ---------------------------------------------------------------------------
// createLocaleLookup
// ---------------------------------------------------------------------------

test("createLocaleLookup looks up a key in the resolved locale", () => {
  const { t } = createLocaleLookup({ en: { greeting: "Hello" }, hu: { greeting: "Szia" } }, "hu");
  expect(t("greeting")).toBe("Szia");
});

test("createLocaleLookup falls back to English for a key missing in the resolved locale", () => {
  const { t } = createLocaleLookup(
    { en: { greeting: "Hello", farewell: "Bye" }, hu: { greeting: "Szia" } },
    "hu",
  );
  expect(t("farewell")).toBe("Bye");
});

test("createLocaleLookup falls back to the bundle's own locale when it's missing entirely", () => {
  const { locale, t } = createLocaleLookup({ en: { greeting: "Hello" } }, "fr");
  expect(locale).toBe("fr");
  expect(t("greeting")).toBe("Hello");
});

test("createLocaleLookup returns the key itself when it's missing from every bundle", () => {
  const { t } = createLocaleLookup({ en: {} }, "en");
  expect(t("missingKey")).toBe("missingKey");
});

test("createLocaleLookup substitutes {{param}} placeholders", () => {
  const { t } = createLocaleLookup({ en: { wroteFile: "✓ {{path}}" } }, "en");
  expect(t("wroteFile", { path: "src/index.ts" })).toBe("✓ src/index.ts");
});

test("createLocaleLookup substitutes repeated occurrences of the same placeholder", () => {
  const { t } = createLocaleLookup({ en: { echo: "{{value}} and {{value}}" } }, "en");
  expect(t("echo", { value: "x" })).toBe("x and x");
});

test("createLocaleLookup accepts a custom fallback locale", () => {
  const { t } = createLocaleLookup({ hu: { greeting: "Szia" } }, "fr", "hu");
  expect(t("greeting")).toBe("Szia");
});

test("createLocaleLookup tolerates both the resolved and fallback bundles being absent", () => {
  const { t } = createLocaleLookup({}, "fr", "hu");
  expect(t("greeting")).toBe("greeting");
});
