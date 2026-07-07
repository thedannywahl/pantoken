import { afterEach, expect, test, vi } from "vite-plus/test";
import {
  capabilitiesOf,
  checkPlugins,
  definePlugin,
  extendPlugin,
  isFactoried,
  makeResolver,
  mergePlugin,
} from "../src/index.ts";
import type { PantokenPlugin, Token } from "@pantoken/model";

afterEach(() => vi.restoreAllMocks());

test("definePlugin infers capabilities from the hooks provided", () => {
  const p = definePlugin({ name: "brand", tokens: (c) => c.tokens, css: () => ({ append: "" }) });
  expect(isFactoried(p)).toBe(true);
  expect(capabilitiesOf(p)).toEqual(["tokens", "css"]);
});

test("checkPlugins passes plugins that implement the stage", () => {
  const p = definePlugin({ name: "t", tokens: (c) => c.tokens });
  expect(checkPlugins([p], "tokens")).toEqual([p]);
});

test("checkPlugins warns and drops a factoried plugin at an unsupported stage", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const tokenOnly = definePlugin({ name: "token-only-css-check", tokens: (c) => c.tokens });
  const active = checkPlugins([tokenOnly], "css");
  expect(active).toEqual([]);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining('has no "css" hook'));
});

test("checkPlugins warns for a non-factoried plugin but still uses its hook", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const raw: PantokenPlugin = { name: "raw-plugin", css: () => ({ append: "x" }) };
  const active = checkPlugins([raw], "css");
  expect(active).toEqual([raw]);
  expect(warn).toHaveBeenCalledWith(
    expect.stringContaining("not created with @pantoken/plugin-kit"),
  );
});

test("extendPlugin composes tokens (base then overrides) and merges css", () => {
  const base = definePlugin({
    name: "base",
    tokens: (c) => [...c.tokens, { name: "--a", syntax: "*", inherits: true, value: "1" }],
    css: () => ({ append: "a{}" }),
  });
  const ext = extendPlugin(base, {
    tokens: (c) => [...c.tokens, { name: "--b", syntax: "*", inherits: true, value: "2" }],
    css: () => ({ append: "b{}" }),
  });
  expect(capabilitiesOf(ext)).toEqual(["tokens", "css"]);
  const out = ext.tokens?.({
    tokens: [],
    theme: "rebrand",
    define: (i) => ({ ...i, syntax: "*", inherits: true }),
  });
  expect(out?.map((t) => t.name)).toEqual(["--a", "--b"]);
  expect(ext.css?.({ tokens: [], css: "" })).toMatchObject({ append: "a{}\n\nb{}" });
});

test("mergePlugin folds several plugins", () => {
  const a = definePlugin({ name: "a", tokens: (c) => c.tokens });
  const b = definePlugin({ name: "b", css: () => ({ append: "" }) });
  expect(capabilitiesOf(mergePlugin(a, b))).toEqual(["tokens", "css"]);
});

test("makeResolver expands reference chains and keeps light-dark()", () => {
  const ir: Token[] = [
    { name: "--leaf", syntax: "<color>", inherits: true, value: "#2B7ABC" },
    { name: "--mid", syntax: "*", inherits: true, value: "var(--leaf)" },
    { name: "--themed", syntax: "*", inherits: true, value: "light-dark(var(--leaf), #000)" },
  ];
  const resolve = makeResolver(ir);
  expect(resolve("var(--mid)")).toBe("#2B7ABC");
  expect(resolve("var(--themed)")).toBe("light-dark(#2B7ABC, #000)");
});
