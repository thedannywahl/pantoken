import { expect, test } from "vite-plus/test";
import { VAR_RE, makeResolver, resolveTokens } from "../src/resolver.ts";
import type { Token } from "@pantoken/model";

const IR: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
  {
    name: "--instui-themed-ref",
    syntax: "*",
    inherits: true,
    value: "light-dark(var(--instui-leaf), #000)",
  },
];

test("typed VAR_RE captures the property name", () => {
  const m = VAR_RE.exec("color: var(--instui-leaf);");
  expect(m?.[1]).toBe("--instui-leaf");
});

test("makeResolver expands reference chains", () => {
  const resolve = makeResolver(IR);
  expect(resolve("var(--instui-brand)")).toBe("#0374B5");
});

test("makeResolver keeps light-dark() without a mode, collapses with one", () => {
  expect(makeResolver(IR)("var(--instui-bg)")).toBe("light-dark(#fff, #000)");
  expect(makeResolver(IR, { mode: "light" })("var(--instui-bg)")).toBe("#fff");
  expect(makeResolver(IR, { mode: "dark" })("var(--instui-bg)")).toBe("#000");
  // light-dark whose branch is itself a reference resolves too.
  expect(makeResolver(IR, { mode: "light" })("var(--instui-themed-ref)")).toBe("#0374B5");
});

test("overrides win over the base set", () => {
  const over: Token[] = [
    { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#000" },
  ];
  expect(makeResolver(IR, { overrides: over })("var(--instui-brand)")).toBe("#000");
});

test("resolveTokens returns a name→resolved map", () => {
  const map = resolveTokens(IR, { mode: "dark" });
  expect(map.get("--instui-brand")).toBe("#0374B5");
  expect(map.get("--instui-bg")).toBe("#000");
});
