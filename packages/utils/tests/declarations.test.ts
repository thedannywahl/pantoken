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
