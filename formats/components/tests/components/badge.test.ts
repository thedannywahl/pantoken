import { expect, test } from "vite-plus/test";
import { badgeCss } from "../../src/index.ts";
import { badge } from "../../src/components/badge.ts";
import { validate } from "../_validate.ts";

test("badge: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(badge);
});

test("badge fills from the badge color tokens", () => {
  const css = badgeCss({ prefix: "instui" });
  expect(css).toContain(".instui-badge");
  expect(css).toContain("var(--instui-component-badge-color-primary)");
  expect(css).toContain(".instui-badge.-color-danger");
  // Inverse swaps fill/text: light chip (badge-color) with dark text (color-inverse).
  expect(css).toContain(".instui-badge.-color-inverse");
  expect(css).toContain("var(--instui-component-badge-color-inverse)");
  expect(css).toContain("--pantoken-badge-accent: var(--instui-component-badge-color)");
});

test("badge supports standalone, notification, pulse, and placement", () => {
  const css = badgeCss({ prefix: "instui" });
  // Notification dot (no count).
  expect(css).toContain(".instui-badge.-type-notification");
  expect(css).toContain("var(--instui-spacing-space-sm)");
  // Pulse ring in the accent colour.
  expect(css).toContain(".instui-badge.-pulse::before");
  // Animation identifiers use a constant internal namespace, decoupled from the class prefix.
  expect(css).toContain("@keyframes pantoken-badge-pulse");
  // Placement over a positioned wrapper.
  expect(css).toContain(".instui-badge-wrapper");
  for (const place of [
    "top-end",
    "top-start",
    "bottom-end",
    "bottom-start",
    "start-center",
    "end-center",
  ]) {
    expect(css).toContain(`.instui-badge.-placement-${place}`);
  }
  expect(css).toContain(".instui-badge.-standalone");
});
