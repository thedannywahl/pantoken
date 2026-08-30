import { expect, test } from "vite-plus/test";
import {
  extractSlotPlaceholders,
  extractSlotPlaceholdersWithContext,
  makeSlotI18nKey,
  makeSlotI18nPayload,
  parseSlotI18nKey,
} from "../../src/lib/extract-slot-placeholders.ts";

const CSS = `
:slot(title)::before {
  content: "Page title";
}
:slot(subtitle)::after {
  content: "Page description";
}
`;

test("extractSlotPlaceholders finds every :slot() placeholder", () => {
  expect(extractSlotPlaceholders(CSS)).toEqual({
    title: "Page title",
    subtitle: "Page description",
  });
});

test("extractSlotPlaceholders keeps the first occurrence for duplicate slot names", () => {
  const css = `
:slot(title)::before { content: "First"; }
:slot(title)::before { content: "Second"; }
`;
  expect(extractSlotPlaceholders(css)).toEqual({ title: "First" });
});

test("extractSlotPlaceholders returns an empty object when there are no matches", () => {
  expect(extractSlotPlaceholders("div { color: red; }")).toEqual({});
});

test("extractSlotPlaceholdersWithContext includes the full CSS rule per slot", () => {
  const result = extractSlotPlaceholdersWithContext(CSS);
  expect(result).toHaveLength(2);
  expect(result[0]).toMatchObject({ slotName: "title", placeholderText: "Page title" });
  expect(result[0].cssRule).toContain(":slot(title)::before");
  expect(result[1]).toMatchObject({ slotName: "subtitle", placeholderText: "Page description" });
});

test("extractSlotPlaceholdersWithContext de-duplicates repeated slot names", () => {
  const css = `
:slot(title)::before { content: "First"; }
:slot(title)::before { content: "Second"; }
`;
  expect(extractSlotPlaceholdersWithContext(css)).toHaveLength(1);
});

test("makeSlotI18nKey builds a namespaced key", () => {
  expect(makeSlotI18nKey("hero", "title")).toBe("layout::hero::title");
});

test("parseSlotI18nKey round-trips a key built by makeSlotI18nKey", () => {
  const key = makeSlotI18nKey("hero", "title");
  expect(parseSlotI18nKey(key)).toEqual({ layoutName: "hero", slotName: "title" });
});

test("parseSlotI18nKey returns an empty object for a malformed key", () => {
  expect(parseSlotI18nKey("not-a-valid-key")).toEqual({});
});

test("makeSlotI18nPayload bundles the key, English source, and metadata", () => {
  expect(makeSlotI18nPayload("hero", "title", "Page title")).toEqual({
    key: "layout::hero::title",
    english: "Page title",
    metadata: { layoutName: "hero", slotName: "title" },
  });
});
