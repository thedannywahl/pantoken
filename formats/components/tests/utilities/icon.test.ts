import { Window } from "happy-dom";
import postcss from "postcss";
import { expect, test } from "vite-plus/test";
import { iconCss } from "../../src/index.ts";
import { icon } from "../../src/utilities/icon/index.ts";
import { validate } from "../_validate.ts";

test("icon: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(icon);
});

test("icon: three-selector pattern with glyph painter", () => {
  const css = iconCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-icon)");
  expect(css).toMatch(/@scope\s*\(\.instui-icon\)\s*\{[\s\S]*&\s*\{[\s\S]*display:\s*inline-flex/u);
  expect(css).toContain('[class^="-icon-"]');
  expect(css).toContain('[class*=" -icon-"]');
  expect(css).toContain('[class^="-render-icon-"]');
  expect(css).toContain('[class*=" -render-custom-icon-"]');
  expect(css).not.toContain('[class*="-icon-"]::before');
  expect(css).toContain("inline-size: 1em");
  expect(css).toContain("var(--pantoken-glyph)");
});

test("icon: painter matches glyph tokens but not Canvas icon classes", () => {
  let painterSelector = "";
  postcss.parse(iconCss({ prefix: "instui" })).walkRules((rule) => {
    if (rule.selector.endsWith("::before")) {
      painterSelector = rule.selector.slice(0, -8).replace(/\n\s*/gu, "");
    }
  });
  expect(painterSelector).not.toBe("");

  const icon = new Window().document.createElement("span");
  for (const className of [
    "-icon-search",
    "instui-button -icon-search",
    "other -icon-search trailing",
    "instui-icon -render-icon-search",
    "instui-button -render-custom-icon-search",
  ]) {
    icon.className = className;
    expect(icon.matches(painterSelector), className).toBe(true);
  }
  for (const className of [
    "Button--icon-action",
    "publish-icon-published",
    "menu-item-icon-container",
    "ic-Search-icon-container",
    "instui-button Button--icon-action",
    "other-icon-search",
  ]) {
    icon.className = className;
    expect(icon.matches(painterSelector), className).toBe(false);
  }
});
