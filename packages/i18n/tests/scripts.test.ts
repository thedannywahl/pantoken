import { expect, test } from "vite-plus/test";

// ── build-bundles: toIdentifier + buildLocaleFile ─────────────────────────────
// buildLocaleFile reads from the real `renderers/web-components/i18n-cache/*.json` (migrated,
// committed translation memory) — same as it always has, just without the old wc-hash keying.
// The drift check itself now lives in `renderers/web-components/scripts/check-drift.ts`, the
// package that owns the source-of-truth English strings and their translations.

const { toIdentifier, buildLocaleFile } = await import("../scripts/build-bundles.ts");

test("toIdentifier converts subtag locales to camelCase identifiers", () => {
  expect(toIdentifier("hu")).toBe("hu");
  expect(toIdentifier("en-AU")).toBe("enAU");
  expect(toIdentifier("pt-BR")).toBe("ptBR");
  expect(toIdentifier("zh-Hans")).toBe("zhHans");
});

test("buildLocaleFile produces valid TS for a translated locale (hu)", () => {
  const ts = buildLocaleFile("hu");
  expect(ts).toContain("export const hu: LocaleBundle");
  expect(ts).toContain('locale: "hu"');
  expect(ts).toContain('dir: "ltr"');
  // Hungarian translations should be non-empty overrides
  expect(ts).toContain("Vissza");
});

test("buildLocaleFile produces bare makeStrings() for English variants without overrides (en-CA)", () => {
  const ts = buildLocaleFile("en-CA");
  expect(ts).toContain("export const enCA: LocaleBundle");
  // en-CA has same values as English so no overrides argument
  expect(ts).toContain('makeStrings("en-CA")');
  expect(ts).not.toContain("prevMonth");
});

test("buildLocaleFile keeps locale-specific English variant overrides (en-AU)", () => {
  const ts = buildLocaleFile("en-AU");
  expect(ts).toContain("export const enAU: LocaleBundle");
  expect(ts).toContain('datePlaceholder: "dd/mm/yyyy"');
});
