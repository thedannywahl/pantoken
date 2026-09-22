import { expect, test } from "vite-plus/test";
import i18nSource from "../../src/i18n.json" with { type: "json" };
import { pageLayouts, pageLayoutTemplates, renderPageLayout } from "../../src/index.ts";
import type { PageLayout } from "../../src/index.ts";

const TOKEN_PATTERN = /\{\{([\w.]+)\}\}/gu;
const i18nKeys = new Set(Object.keys(i18nSource).filter((key) => key !== "$schema"));

function tokensIn(layout: PageLayout): Set<string> {
  const tokens = new Set<string>();
  const values = [
    layout.title,
    layout.html,
    ...(layout.imagePlaceholders ?? []).map((p) => p.altText ?? ""),
  ];
  for (const value of values) {
    for (const match of value.matchAll(TOKEN_PATTERN)) tokens.add(match[1]);
  }
  return tokens;
}

test("every {{key}} token in a layout template exists in src/i18n.json", () => {
  for (const layout of pageLayoutTemplates) {
    for (const token of tokensIn(layout)) {
      expect(i18nKeys.has(token)).toBe(true);
    }
  }
});

test("every src/i18n.json key is referenced by a layout template", () => {
  const referenced = new Set<string>();
  for (const layout of pageLayoutTemplates) {
    for (const token of tokensIn(layout)) referenced.add(token);
  }
  for (const key of i18nKeys) {
    expect(referenced.has(key)).toBe(true);
  }
});

test("pageLayouts default to fully-resolved English text with no leftover tokens", () => {
  for (const layout of pageLayouts) {
    expect(layout.title).not.toMatch(TOKEN_PATTERN);
    expect(layout.html).not.toMatch(TOKEN_PATTERN);
    for (const placeholder of layout.imagePlaceholders ?? []) {
      expect(placeholder.altText ?? "").not.toMatch(TOKEN_PATTERN);
    }
  }
  expect(pageLayouts.find((l) => l.name === "about-me")?.title).toBe("About me");
  expect(pageLayouts.find((l) => l.name === "hero")?.html).toContain("Welcome to the course");
});

test("renderPageLayout falls back to English for an unrecognized locale", () => {
  const template = pageLayoutTemplates.find((l) => l.name === "hero");
  if (!template) throw new Error("hero template not found");
  const rendered = renderPageLayout(template, "xx-not-a-real-locale");
  expect(rendered.title).toBe("Hero");
  expect(rendered.html).toContain("Welcome to the course");
});

test("renderPageLayout resolves image altText tokens too", () => {
  const template = pageLayoutTemplates.find((l) => l.name === "about-me");
  if (!template) throw new Error("about-me template not found");
  const rendered = renderPageLayout(template, "en");
  expect(rendered.imagePlaceholders?.[0]?.altText).toBe("A photo of the instructor");
});
