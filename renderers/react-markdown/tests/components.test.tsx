import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { expect, test } from "vite-plus/test";
import { createInstuiMarkdownComponents } from "../src/components.tsx";
import type { ComponentType } from "react";

test("createInstuiMarkdownComponents maps the expected elements", () => {
  const c = createInstuiMarkdownComponents() as Record<string, unknown>;
  for (const key of [
    "h1",
    "h2",
    "p",
    "a",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "img",
    "table",
    "th",
    "td",
    "span",
  ]) {
    expect(typeof c[key]).toBe("function");
  }
});

test("the span override renders a pantoken icon as inline SVG", () => {
  const Span = createInstuiMarkdownComponents().span as ComponentType<Record<string, unknown>>;
  const html = renderToStaticMarkup(createElement(Span, { "data-pantoken-icon": "arrow-left" }));
  expect(html).toContain("<svg");
  expect(html).toContain('aria-label="arrow-left"');
});

test("the span override renders a color swatch for a color code", () => {
  const Span = createInstuiMarkdownComponents().span as ComponentType<Record<string, unknown>>;
  const html = renderToStaticMarkup(createElement(Span, { "data-color-code": "#03893D" }));
  expect(html).toContain("#03893D");
  expect(html.toLowerCase()).toContain("background");
});
