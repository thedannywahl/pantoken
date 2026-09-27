import { expect, test } from "vite-plus/test";
import { filterEmailCss } from "../src/email-css.ts";

test("keeps safe components and removes unsupported components and states", () => {
  const css = `
    .instui-button { color: red; }
    .instui-modal { display: block; }
    .instui-button:hover { color: blue; }
    @media (max-width: 600px) { .instui-button { color: green; } }
  `;

  const result = filterEmailCss(css);

  expect(result).toContain(".instui-button { color: red; }");
  expect(result).not.toContain("modal");
  expect(result).not.toContain(":hover");
  expect(result).not.toContain("@media");
});

test("supports custom component allow and deny policies", () => {
  const css = ".instui-custom-card { color: red; } .instui-button { color: blue; }";

  const result = filterEmailCss(css, {
    allowComponents: ["custom-card"],
    denyComponents: ["button"],
  });

  expect(result).toContain("custom-card");
  expect(result).not.toContain("button");
});

test("filters denied selectors from mixed selector lists", () => {
  const result = filterEmailCss(".instui-button, .instui-modal { color: red; }");

  expect(result).toContain(".instui-button");
  expect(result).not.toContain("modal");
});

test("preserves media queries only for the WebKit profile", () => {
  const css = "@media (prefers-color-scheme: dark) { .instui-button { color: white; } }";

  expect(filterEmailCss(css, { client: "generic" })).not.toContain("@media");
  expect(filterEmailCss(css, { client: "webkit" })).toContain("@media");
});
