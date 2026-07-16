import { expect, test } from "vite-plus/test";
import { definePlugin } from "@pantoken/plugin-kit";
import { buildTokens } from "../src/build.ts";

const tokens = buildTokens({ theme: "rebrand" });
const byName = new Map(tokens.map((t) => [t.name, t]));

test("builds a large IR with the expected token layers", () => {
  expect(tokens.length).toBeGreaterThan(1000);
  expect(tokens.some((t) => t.name.startsWith("--instui-primitive-"))).toBe(true);
  expect(tokens.some((t) => t.name.startsWith("--instui-color-"))).toBe(true);
  expect(tokens.some((t) => t.name.startsWith("--instui-component-"))).toBe(true);
});

test("a semantic colour token is typed <color> and themes via light-dark only when needed", () => {
  const bg = byName.get("--instui-color-background-base");
  expect(bg).toBeDefined();
  // background-base resolves to a reference (var) or a light-dark of references — either way
  // its logical type is colour; contextual values carry syntax "*".
  expect(["<color>", "*"]).toContain(bg?.syntax);
  for (const t of tokens) {
    if (t.value.startsWith("light-dark(")) expect(t.themed).toBe(true);
  }
});

test("icons are rolled in as <image> tokens with metadata", () => {
  const icons = tokens.filter((t) => t.meta?.kind === "icon");
  expect(icons.length).toBeGreaterThan(500);

  const arrowLeft = byName.get("--instui-icon-arrow-left");
  expect(arrowLeft?.syntax).toBe("<image>");
  expect(arrowLeft?.value.startsWith("url('data:image/svg+xml")).toBe(true);
  expect(arrowLeft?.meta?.bidirectional).toBe(true);

  // A Custom (Instructure-authored) glyph is present.
  expect(byName.has("--instui-icon-canvas-logo")).toBe(true);
});

test("plugin token hooks inject at the token layer", () => {
  const focus = definePlugin({
    name: "focus",
    tokens: ({ tokens, define }) => [
      ...tokens,
      define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
    ],
  });
  const withFocus = buildTokens({ theme: "rebrand", plugins: [focus] });
  expect(withFocus.some((t) => t.name === "--instui-focus-color")).toBe(true);
  // Without the plugin, the token is absent — proving injection is opt-in.
  expect(tokens.some((t) => t.name === "--instui-focus-color")).toBe(false);
});
