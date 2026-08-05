// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { makeOnCommand, resolveSpace, spacingValue } from "../src/index.ts";

test("resolveSpace maps a keyword to a token, else passes raw CSS values through", () => {
  expect(resolveSpace("small")).toBe("var(--instui-spacing-space-sm)");
  expect(resolveSpace("none")).toBe("0");
  expect(resolveSpace("2rem")).toBe("2rem");
  expect(resolveSpace("auto")).toBe("auto");
});

test("spacingValue resolves 1-4 shorthand values", () => {
  expect(spacingValue("small")).toBe("var(--instui-spacing-space-sm)");
  expect(spacingValue("small none small")).toBe(
    "var(--instui-spacing-space-sm) 0 var(--instui-spacing-space-sm)",
  );
  expect(spacingValue("medium 2rem")).toBe("var(--instui-spacing-space-md) 2rem");
  expect(spacingValue(null)).toBe("");
});

test("makeOnCommand routes command events to the latest handler", () => {
  const target = document.createElement("div");
  const seen: string[] = [];
  const onCommand = makeOnCommand(true);

  onCommand(target, (command) => seen.push(`first:${command}`));
  onCommand(target, (command) => seen.push(`latest:${command}`));

  const event = new Event("command") as Event & { command: string; source: Element | null };
  event.command = "--next";
  event.source = null;
  target.dispatchEvent(event);

  expect(seen).toEqual(["latest:--next"]);
});
