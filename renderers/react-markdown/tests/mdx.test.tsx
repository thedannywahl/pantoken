import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";
import InstuiMdxProvider, { InstuiMdxProvider as Named } from "../src/mdx.tsx";

test("the default and named exports are the same provider component", () => {
  expect(InstuiMdxProvider).toBe(Named);
});

test("InstuiMdxProvider renders its children through the MDX provider", () => {
  const html = renderToStaticMarkup(
    <InstuiMdxProvider>
      <span data-testid="mdx-child">content</span>
    </InstuiMdxProvider>,
  );
  expect(html).toContain("content");
});

test("InstuiMdxProvider accepts render options without throwing", () => {
  expect(() =>
    renderToStaticMarkup(
      <InstuiMdxProvider renderOptions={{ tableCaption: "Data" }}>
        <span>ok</span>
      </InstuiMdxProvider>,
    ),
  ).not.toThrow();
});
