import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";
import { InstuiMarkdown } from "../src/instui-markdown.tsx";

test("renders a Markdown document through the InstUI pipeline", () => {
  const html = renderToStaticMarkup(
    <InstuiMarkdown>{"# Hello\n\nGo :arrow-left: back. Brand is #03893D."}</InstuiMarkdown>,
  );
  // Heading text and paragraph content survive the InstUI mapping.
  expect(html).toContain("Hello");
  expect(html).toContain("back");
  // The inline :arrow-left: token rendered as an SVG, and the color code became a swatch.
  expect(html).toContain("<svg");
  expect(html).toContain("#03893D");
});

test("respects renderOptions (icons disabled leaves the token as text)", () => {
  const html = renderToStaticMarkup(
    <InstuiMarkdown renderOptions={{ icons: { enabled: false }, color: { enabled: false } }}>
      {"Go :arrow-left: back"}
    </InstuiMarkdown>,
  );
  expect(html).not.toContain("<svg");
  expect(html).toContain(":arrow-left:");
});
