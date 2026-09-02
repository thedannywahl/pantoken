import { expect, test } from "vite-plus/test";
import {
  registerSlotLabels,
  slotLabel,
  slotLabels,
  slotLabelsByLocale,
  supportedLocales,
} from "../../src/lib/slot-labels.ts";

test("slotLabels defaults to the English labels", () => {
  const labels = slotLabels();
  expect(labels.hero).toEqual({ title: "Page title", subtitle: "Page description" });
  expect(labels.callout).toEqual({ message: "Alert message" });
});

test("slotLabels falls back to English for an unconfigured locale", () => {
  expect(slotLabels("fr")).toEqual(slotLabels("en"));
});

test("slotLabel looks up a single layout+slot label", () => {
  expect(slotLabel("hero", "title")).toBe("Page title");
  expect(slotLabel("hero", "title", "en")).toBe("Page title");
});

test("slotLabel returns an empty string for an unknown layout or slot", () => {
  expect(slotLabel("unknown-layout", "unknown-slot")).toBe("");
  expect(slotLabel("hero", "unknown-slot")).toBe("");
});

test("supportedLocales includes English by default", () => {
  expect(supportedLocales()).toContain("en");
});

test("registerSlotLabels adds a new locale merged with the English fallback", () => {
  registerSlotLabels("test-locale", { hero: { title: "Titre de la page" } });

  expect(supportedLocales()).toContain("test-locale");
  expect(slotLabel("hero", "title", "test-locale")).toBe("Titre de la page");
  // Untranslated slots still fall back to English.
  expect(slotLabel("hero", "subtitle", "test-locale")).toBe("Page description");
});

test("slotLabelsByLocale reports every locale that has labels for a layout", () => {
  registerSlotLabels("another-locale", { hero: { title: "Another title" } });

  const byLocale = slotLabelsByLocale("hero");
  expect(byLocale["another-locale"]).toEqual({
    title: "Another title",
    subtitle: "Page description",
  });
});

test("slotLabelsByLocale returns an empty object for a layout with no registered locales", () => {
  expect(slotLabelsByLocale("nonexistent-layout")).toEqual({});
});
