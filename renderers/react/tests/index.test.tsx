import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";
import { Icon, readToken } from "../src/index.tsx";

test("Icon renders the instui-icon custom element with attributes", () => {
  const html = renderToStaticMarkup(<Icon name="arrow-left" size="1.5rem" />);
  expect(html).toContain("<instui-icon");
  expect(html).toContain('name="arrow-left"');
  expect(html).toContain('size="1.5rem"');
});

test("readToken returns the fallback on the server (no document)", () => {
  expect(readToken("--instui-color-background-brand", "#0374B5")).toBe("#0374B5");
});
