import { expect, test } from "vite-plus/test";
import { htmlTemplate, layoutMetadata } from "../../src/lib/html-template.ts";
import { calloutRules } from "../../src/layouts/callout/callout.ts";
import { heroRules } from "../../src/layouts/hero/hero.ts";

test("htmlTemplate renders the root element, parts, and slots for callout", () => {
  const html = htmlTemplate(calloutRules(), { layoutName: "callout" });

  expect(html).toContain("<!-- Layout: callout -->");
  expect(html).toContain('<div class="callout">');
  expect(html).toContain('<span class="instui-icon">');
  expect(html).toContain('<span class="instui-content">');
  expect(html).toContain('<slot name="message" /><!-- Alert message content -->');
  expect(html).toContain("</div>\n");
});

test("htmlTemplate renders multiple parts and slots for hero", () => {
  const html = htmlTemplate(heroRules(), { layoutName: "hero" });

  expect(html).toContain("<!-- Layout: hero -->");
  expect(html).toContain('<div class="hero">');
  expect(html).toContain('<slot name="title" /><!-- Hero title content -->');
  expect(html).toContain('<slot name="subtitle" /><!-- Hero subtitle content -->');
});

test("htmlTemplate falls back to a bare div for CSS with no cssdoc comment", () => {
  const html = htmlTemplate("div { color: red; }");
  expect(html).toBe("<!-- Layout:  -->\n<div></div>\n");
});

test("layoutMetadata extracts name, summary, parts, and slots for callout", () => {
  const metadata = layoutMetadata(calloutRules());

  expect(metadata.name).toBe("callout");
  expect(metadata.summary).toBe("Inline information alert for a short reminder or note.");
  expect(metadata.parts).toEqual([
    {
      name: "instui-icon",
      selector: ".instui-icon",
      element: "span",
      description: "Optional icon to the left of the content.",
    },
    {
      name: "instui-content",
      selector: ".instui-content",
      element: "span",
      description: "Container for the text content.",
    },
  ]);
  expect(metadata.slots).toEqual([{ name: "message", description: "Alert message content" }]);
});

test("layoutMetadata returns empty name/summary/parts/slots for CSS with no cssdoc comment", () => {
  expect(layoutMetadata("div { color: red; }")).toEqual({
    name: "",
    summary: "",
    parts: [],
    slots: [],
  });
});
