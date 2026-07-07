import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { focusOutline } from "../src/index.ts";
import type { Token } from "@pantoken/model";

test("is a factoried plugin with tokens + css capabilities", () => {
  expect(capabilitiesOf(focusOutline())).toEqual(["tokens", "css"]);
});

const define = (i: { name: string; value: string }): Token => ({
  name: i.name,
  syntax: "*",
  inherits: true,
  value: i.value,
});

// A minimal IR with the shared focus tokens as a reference chain, to exercise resolution.
const IR: Token[] = [
  { name: "--instui-leaf-blue", syntax: "<color>", inherits: true, value: "#2B7ABC" },
  {
    name: "--instui-component-shared-tokens-focus-outline-info-color",
    syntax: "*",
    inherits: true,
    value: "var(--instui-leaf-blue)",
  },
  {
    name: "--instui-component-shared-tokens-focus-outline-width",
    syntax: "*",
    inherits: true,
    value: "0.125rem",
  },
  {
    name: "--instui-component-shared-tokens-focus-outline-offset",
    syntax: "*",
    inherits: true,
    value: "0.125rem",
  },
  {
    name: "--instui-component-shared-tokens-focus-outline-style",
    syntax: "*",
    inherits: true,
    value: "solid",
  },
];

test("tokens hook contributes the full --instui-focus-outline-* record set", () => {
  const names = (focusOutline().tokens?.({ tokens: [], theme: "rebrand", define }) ?? []).map(
    (t) => t.name,
  );
  for (const n of [
    "--instui-focus-outline-color",
    "--instui-focus-outline-color-start",
    "--instui-focus-outline-width",
    "--instui-focus-outline-offset",
    "--instui-focus-outline-radius",
    "--instui-focus-outline-style",
    "--instui-focus-outline-transition-color",
    "--instui-focus-outline-transition-offset",
    "--instui-focus-outline-transition",
  ]) {
    expect(names).toContain(n);
  }
});

test("the transition shorthand token is concrete (no dangling var)", () => {
  const out = focusOutline().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const shorthand = out.find((t) => t.name === "--instui-focus-outline-transition")?.value ?? "";
  expect(shorthand).toBe("outline-color 0.2s, outline-offset 0.25s");
  expect(shorthand).not.toContain("var(");
});

test("position:prepend routes the rules before the stylesheet", () => {
  const appended = focusOutline().css?.({ tokens: IR, css: "" });
  expect(appended?.append).toContain(":where(:focus-visible)");
  expect(appended?.prepend).toBeUndefined();

  const prepended = focusOutline({ position: "prepend" }).css?.({ tokens: IR, css: "" });
  expect(prepended?.prepend).toContain(":where(:focus-visible)");
  expect(prepended?.append).toBeUndefined();
});

test("resolves references against the IR to concrete leaves (no dangling var())", () => {
  const out = focusOutline().tokens?.({ tokens: IR, theme: "rebrand", define }) ?? [];
  const byName = (n: string) => out.find((t) => t.name === n)?.value;
  // var(--shared-info-color) → var(--instui-leaf-blue) → #2B7ABC
  expect(byName("--instui-focus-outline-color")).toBe("#2B7ABC");
  expect(byName("--instui-focus-outline-width")).toBe("0.125rem");
  for (const t of out.filter((x) => x.name.startsWith("--instui-focus-outline-")))
    expect(t.value).not.toContain("var(");
});

test("resolves against the shipped rebrand base when ctx.tokens lacks the shared tokens", () => {
  // Empty ctx.tokens: resolution still succeeds via the bundled rebrand IR — concrete, no var().
  const out = focusOutline().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const color = out.find((t) => t.name === "--instui-focus-outline-color")?.value ?? "";
  expect(color).not.toContain("var(");
  expect(color).toMatch(/^light-dark\(#|^#/); // a concrete colour (themed or flat)
  for (const t of out.filter((x) => x.name.startsWith("--instui-focus-outline-")))
    expect(t.value).not.toContain("var(");
});

test("css hook emits an animated, zero-specificity ring and self-defines its props", () => {
  const c = focusOutline().css?.({ tokens: IR, css: "" });
  const append = c?.append ?? "";
  expect(append).toContain("transition:");
  expect(append).toContain("var(--instui-focus-outline-color-start)");
  expect(append).toContain(":where(:focus-visible)");
  expect(append).toContain("outline-color: var(--instui-focus-outline-color);");
  // The ring rounds on focus so it isn't square on radius-less elements (e.g. links).
  expect(append).toContain("border-radius: var(--instui-focus-outline-radius);");
  expect(append).not.toContain(":focus-visible()"); // not a functional pseudo-class
  // Self-defines the custom properties (resolved, concrete) so the rules stand alone.
  const decls = Object.fromEntries(c?.declarations ?? []);
  expect(decls["--instui-focus-outline-color"]).toBe("#2B7ABC");
  expect(c?.marker).toBe("pantoken:focus-outline");
});

test("css hook does not re-declare props already baked into the IR", () => {
  const withBaked: Token[] = [
    ...IR,
    define({ name: "--instui-focus-outline-color", value: "#000" }),
  ];
  const c = focusOutline().css?.({ tokens: withBaked, css: "" });
  const names = (c?.declarations ?? []).map(([n]) => n);
  expect(names).not.toContain("--instui-focus-outline-color");
});

test("the theme option selects which shipped IR seeds resolution", () => {
  // No ctx.tokens: each theme resolves the ring colour from its own bundled IR — concrete, no var().
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const out = focusOutline({ theme }).tokens?.({ tokens: [], theme, define }) ?? [];
    const color = out.find((t) => t.name === "--instui-focus-outline-color")?.value ?? "";
    expect(color).not.toContain("var(");
    expect(color).toMatch(/#|light-dark\(/);
  }
});

test("the tokens hook adopts ctx.theme when no theme option is set", () => {
  const rebrand = focusOutline().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const canvas = focusOutline().tokens?.({ tokens: [], theme: "canvas", define }) ?? [];
  const color = (out: typeof rebrand) =>
    out.find((t) => t.name === "--instui-focus-outline-color")?.value;
  // Same plugin instance, different ctx.theme → resolves from that theme's IR.
  expect(color(rebrand)).toBe("light-dark(#2B7ABC, #4798E3)");
  expect(color(canvas)).toBe("#2B7ABC");
});

test("the explicit theme option overrides ctx.theme", () => {
  // ctx.theme is canvas, but the option pins rebrand.
  const out =
    focusOutline({ theme: "rebrand" }).tokens?.({ tokens: [], theme: "canvas", define }) ?? [];
  expect(out.find((t) => t.name === "--instui-focus-outline-color")?.value).toBe(
    "light-dark(#2B7ABC, #4798E3)",
  );
});

test("options customize the ring", () => {
  const c = focusOutline({ color: "#f00", selector: ".x" }).css?.({ tokens: [], css: "" });
  expect(c?.append).toContain(":where(.x) {");
  expect(c?.append).toContain(":where(.x):where(:focus-visible) {");
  const decls = Object.fromEntries(c?.declarations ?? []);
  expect(decls["--instui-focus-outline-color"]).toBe("#f00");
});
