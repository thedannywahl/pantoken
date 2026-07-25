import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { expect, test } from "vite-plus/test";
import { createInstuiMarkdownComponents } from "../src/components.tsx";
import type { InstuiMarkdownRenderOptions } from "../src/types.ts";
import type { ComponentType, ReactNode } from "react";

type MdComp = ComponentType<Record<string, unknown>>;

function html(
  key: string,
  props: Record<string, unknown> = {},
  children?: ReactNode,
  options?: InstuiMarkdownRenderOptions,
): string {
  const map = createInstuiMarkdownComponents(options) as unknown as Record<string, MdComp>;
  return renderToStaticMarkup(createElement(map[key], props, children));
}

test("headings h1–h6 all render Heading content", () => {
  for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
    expect(html(level, {}, `Title ${level}`)).toContain(`Title ${level}`);
  }
});

test("p, strong, and em render their text", () => {
  expect(html("p", {}, "para")).toContain("para");
  expect(html("strong", {}, "bold")).toContain("bold");
  expect(html("em", {}, "italic")).toContain("italic");
});

test("an external link gets target=_blank; an internal link does not", () => {
  const external = html("a", { href: "https://example.com" }, "out");
  expect(external).toContain('target="_blank"');
  const internal = html("a", { href: "/local" }, "in");
  expect(internal).not.toContain('target="_blank"');
});

test("link.external=false suppresses the external target", () => {
  const out = html("a", { href: "https://example.com" }, "out", { link: { external: false } });
  expect(out).not.toContain('target="_blank"');
});

test("ul, ol, and li render list content", () => {
  const map = createInstuiMarkdownComponents() as unknown as Record<string, MdComp>;
  // List.Item must render inside a List, so nest the li override inside the ul override.
  const ul = renderToStaticMarkup(
    createElement(map.ul, {}, createElement(map.li, { key: "a" }, "item")),
  );
  expect(ul).toContain("item");
  const ol = renderToStaticMarkup(
    createElement(map.ol, {}, createElement(map.li, { key: "b" }, "ordered")),
  );
  expect(ol).toContain("ordered");
});

test("a blockquote with a data-alert marker renders an InstUI Alert", () => {
  // A warning alert renders the InstUI warning icon; a plain blockquote View does not.
  const out = html("blockquote", { "data-alert": "warning" }, "careful");
  expect(out).toContain("careful");
  expect(out).toContain("IconWarning");
});

test("a plain blockquote renders a bordered View, not an alert", () => {
  const out = html("blockquote", {}, "quote");
  expect(out).toContain("quote");
  expect(out).toContain("<blockquote");
  expect(out).not.toContain("IconWarning");
});

test("alerts.enabled=false renders the blockquote as a View even with a marker", () => {
  const out = html("blockquote", { "data-alert": "note" }, "quiet", {
    alerts: { enabled: false },
  });
  expect(out).toContain("<blockquote");
  expect(out).toContain("quiet");
});

test("inline code renders as a Text code element", () => {
  const out = html("code", {}, "inline");
  expect(out).toContain("inline");
  expect(out).toContain("<code");
});

test("a fenced code block preserves the language as data-language by default", () => {
  const out = html("code", { className: "language-ts" }, "const x = 1\n");
  expect(out).toContain('data-language="ts"');
});

test("code.language=false drops the data-language attribute", () => {
  const out = html("code", { className: "language-ts" }, "const x = 1\n", {
    code: { language: false },
  });
  expect(out).not.toContain("data-language");
});

test("pre renders a block container", () => {
  expect(html("pre", {}, "block")).toContain("block");
});

test("img renders with src and alt, and tolerates missing ones", () => {
  const withAttrs = html("img", { src: "/a.png", alt: "pic" });
  expect(withAttrs).toContain('src="/a.png"');
  expect(withAttrs).toContain('alt="pic"');
  expect(() => html("img", {})).not.toThrow();
});

test("hr renders", () => {
  expect(() => html("hr")).not.toThrow();
});

test("a table uses the default caption, and tableCaption overrides it", () => {
  expect(html("table", {}, "rows")).toContain("Table");
  expect(html("table", {}, "rows", { tableCaption: "Grades" })).toContain("Grades");
});

test("thead, tbody, tr, and td render their children", () => {
  expect(html("thead", {}, "h")).toContain("h");
  expect(html("tbody", {}, "b")).toContain("b");
  expect(html("tr", {}, "r")).toContain("r");
  expect(html("td", {}, "cell")).toContain("cell");
});

test("th renders header text (exercising the slug id derivation)", () => {
  // InstUI's ColHeader consumes the id internally, so assert on rendered content; the slug()
  // path still runs for both a normal string and the punctuation-only fallback.
  expect(html("th", {}, "First Name")).toContain("First Name");
  expect(html("th", {}, "!!!")).toContain("!!!");
});

test("the span override builds an SVG from an icon path when no raw svg exists", () => {
  const out = html("span", { "data-pantoken-icon": "brand" }, undefined, {
    icons: {
      resolvers: [
        (code) => (code === "brand" ? { name: "brand", path: "M0 0h24v24H0z" } : undefined),
      ],
    },
  });
  expect(out).toContain("<svg");
  expect(out).toContain("M0 0h24v24H0z");
});

test("the span override applies the configured icon color", () => {
  const out = html("span", { "data-pantoken-icon": "arrow-left" }, undefined, {
    icons: { color: "rebeccapurple" },
  });
  expect(out.toLowerCase()).toContain("rebeccapurple");
});

test("the span override renders plain children when nothing matches", () => {
  const out = html("span", {}, "just text");
  expect(out).toContain("just text");
  expect(out).not.toContain("<svg");
});

test("an unresolved icon name falls back to plain children", () => {
  const out = html("span", { "data-pantoken-icon": "definitely-not-an-icon" }, "fallback");
  expect(out).toContain("fallback");
  expect(out).not.toContain("<svg");
});
