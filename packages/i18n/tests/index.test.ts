import { expect, test } from "vite-plus/test";
import {
  CANVAS_LOCALES,
  ENGLISH_STRINGS,
  createLocaleSet,
  defineBundle,
  en,
  getDir,
  hu,
  registerLocalized,
} from "../src/index.ts";

test("CANVAS_LOCALES contains the three RTL locales", () => {
  expect(CANVAS_LOCALES["ar"]?.dir).toBe("rtl");
  expect(CANVAS_LOCALES["he"]?.dir).toBe("rtl");
  expect(CANVAS_LOCALES["fa"]?.dir).toBe("rtl");
});

test("CANVAS_LOCALES contains 44 unique BCP47 entries", () => {
  expect(Object.keys(CANVAS_LOCALES).length).toBe(44);
});

test("getDir returns rtl for Arabic and ltr for Hungarian", () => {
  expect(getDir("ar")).toBe("rtl");
  expect(getDir("hu")).toBe("ltr");
});

test("getDir returns ltr for an unknown locale", () => {
  expect(getDir("x-unknown")).toBe("ltr");
});

test("getDir accepts a LocaleBundle", () => {
  expect(getDir(hu)).toBe("ltr");
});

test("hu bundle has correct locale and direction", () => {
  expect(hu.locale).toBe("hu");
  expect(hu.dir).toBe("ltr");
  expect(hu.strings.back).toBe("Vissza");
  expect(hu.strings.prevMonth).toBe("Előző hónap");
});

test("defineBundle validates locale is a non-empty string", () => {
  expect(() =>
    defineBundle({ locale: "", dir: "ltr", label: "x", strings: ENGLISH_STRINGS }),
  ).toThrow("non-empty locale");
});

test("defineBundle validates dir is ltr or rtl", () => {
  expect(() =>
    defineBundle({
      locale: "x",
      dir: "invalid" as "ltr",
      label: "x",
      strings: ENGLISH_STRINGS,
    }),
  ).toThrow("ltr");
});

test("defineBundle returns a copy with the same properties", () => {
  const bundle = defineBundle({
    locale: "x-test",
    dir: "ltr",
    label: "Test",
    strings: ENGLISH_STRINGS,
  });
  expect(bundle.locale).toBe("x-test");
  expect(bundle.strings).toBe(ENGLISH_STRINGS);
});

test("registerLocalized is a no-op outside a DOM environment (no HTMLElement)", () => {
  // Node has no HTMLElement, so register() is a no-op — verify no throw.
  expect(() => registerLocalized("hu")).not.toThrow();
  expect(() => registerLocalized(hu)).not.toThrow();
});

// ── createLocaleSet ───────────────────────────────────────────────────────────

test("createLocaleSet.locales is sorted and contains exactly the provided keys", () => {
  const s = createLocaleSet({ hu, en });
  expect(s.locales).toEqual(["en", "hu"]);
});

test("createLocaleSet.has returns true for included locales", () => {
  const s = createLocaleSet({ hu, en });
  expect(s.has("hu")).toBe(true);
  expect(s.has("en")).toBe(true);
});

test("createLocaleSet.has returns false for excluded locales", () => {
  const s = createLocaleSet({ hu });
  expect(s.has("de")).toBe(false);
});

test("createLocaleSet.get returns the correct bundle", () => {
  const s = createLocaleSet({ hu, en });
  expect(s.get("hu")).toBe(hu);
  expect(s.get("en")).toBe(en);
});

test("createLocaleSet.register is a no-op outside a DOM environment", () => {
  const s = createLocaleSet({ hu, en });
  expect(() => s.register("hu")).not.toThrow();
});
