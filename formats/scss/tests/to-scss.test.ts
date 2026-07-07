import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { resolveTokens } from "@pantoken/utils";
import { scss } from "../src/index.ts";
import { toScss } from "../src/to-scss.ts";
import type { Token } from "@pantoken/model";

test("emitted values match the resolved IR (value fidelity)", () => {
  const resolved = resolveTokens(tokens, { mode: "light" });
  for (const name of ["--instui-color-background-brand", "--instui-color-text-base"]) {
    expect(scss).toContain(`$${name.replace(/^--/, "")}: ${resolved.get(name)};`);
  }
});

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  {
    name: "--instui-color-bg",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("emits resolved SCSS variables", () => {
  const scss = toScss(fixture, { mode: "light" });
  expect(scss).toContain("$instui-primitive-color-blue: #0374B5;");
  // The reference resolved to the concrete blue.
  expect(scss).toContain("$instui-color-brand: #0374B5;");
  // light-dark collapsed to the light value.
  expect(scss).toContain("$instui-color-bg: #fff;");
});

test("respects the mode and skips icons", () => {
  const dark = toScss(fixture, { mode: "dark" });
  expect(dark).toContain("$instui-color-bg: #000;");
  expect(dark).not.toContain("instui-icon-x");
});
