import { expect, test } from "vite-plus/test";
import {
  ELEVATION_NAMES,
  FOCUSABLE_SELECTOR,
  elevationDeclarations,
  focusOutlineDeclarations,
  focusOutlineRules,
} from "../src/declarations.ts";

test("ELEVATION_NAMES lists every level and alias", () => {
  expect(ELEVATION_NAMES).toEqual(
    expect.arrayContaining([
      "resting",
      "above",
      "topmost",
      "depth1",
      "depth2",
      "depth3",
      "card",
      "cardHover",
    ]),
  );
});

test("elevationDeclarations emits one [customProperty, value] pair per name", () => {
  const pairs = elevationDeclarations();
  expect(pairs).toHaveLength(ELEVATION_NAMES.length);
  const byName = new Map(pairs);
  expect(byName.get("--instui-elevation-resting")).toContain(
    "var(--instui-color-drop-shadow-shadow-color2)",
  );
  // An alias resolves to the SAME geometry as its base level.
  expect(byName.get("--instui-elevation-depth1")).toBe(byName.get("--instui-elevation-resting"));
});

test("focusOutlineDeclarations includes the themed and constant focus-ring variables", () => {
  const byName = new Map(focusOutlineDeclarations());
  expect(byName.get("--instui-focus-outline-color-start")).toBe("transparent");
  expect(byName.get("--instui-focus-outline-style")).toBe("solid");
  expect(byName.get("--instui-focus-outline-width")).toContain(
    "var(--instui-component-shared-tokens-focus-outline-width)",
  );
});

test("focusOutlineRules wraps the default (or a custom) selector in zero-specificity :where()", () => {
  const rules = focusOutlineRules();
  expect(rules).toContain(`:where(${FOCUSABLE_SELECTOR}) {`);
  expect(rules).toContain(":where(.-without-focus-animation) { transition: none; }");

  const custom = focusOutlineRules(".my-widget");
  expect(custom).toContain(":where(.my-widget) {");
});

test("forced colors remove the resting outline and restore keyboard and focus-within rings", () => {
  for (const selector of [FOCUSABLE_SELECTOR, ".my-widget"]) {
    const rules = focusOutlineRules(selector);
    const forced = rules.slice(rules.indexOf("@media (forced-colors: active)"));
    expect(forced).toContain(`:where(${selector}) { outline-style: none; }`);
    expect(forced).toContain(`:where(${selector}):where(:focus-visible),`);
    expect(forced).toContain(
      ":where(.-focus-within):where(:focus-within) { outline-style: var(--instui-focus-outline-style); }",
    );
    expect(forced).not.toContain("forced-color-adjust");
  }
});

test("focus transitions stop automatically for default and custom selectors under reduced motion", () => {
  for (const selector of [FOCUSABLE_SELECTOR, ".my-widget"]) {
    expect(focusOutlineRules(selector)).toContain(
      `@media (prefers-reduced-motion: reduce) {\n  :where(${selector}), :where(.-focus-within) { transition: none; }\n}`,
    );
  }
});
