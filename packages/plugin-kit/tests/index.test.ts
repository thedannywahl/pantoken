import { afterEach, expect, test, vi } from "vite-plus/test";
import {
  capabilitiesOf,
  checkPlugins,
  definePlugin,
  extendPlugin,
  isFactoried,
  makeResolver,
  mergePlugin,
  validatePlugin,
} from "../src/index.ts";
import type { PantokenPlugin, Token } from "@pantoken/model";

afterEach(() => vi.restoreAllMocks());

// validatePlugin tests
test("validatePlugin passes a well-formed plugin", () => {
  expect(() => validatePlugin({ name: "ok", css: () => ({}) })).not.toThrow();
});

test("validatePlugin rejects a plugin with no name", () => {
  expect(() => validatePlugin({ name: "" } as PantokenPlugin)).toThrow(/no name/);
});

test("validatePlugin rejects a non-function hook", () => {
  expect(() =>
    validatePlugin({ name: "bad", tokens: "not-a-function" as unknown as () => never }),
  ).toThrow(/invalid.*tokens.*hook/i);
});

test("validatePlugin rejects an unrecognised key", () => {
  expect(() => validatePlugin({ name: "x", mystery: true } as unknown as PantokenPlugin)).toThrow(
    /unrecognised key/,
  );
});

test("definePlugin validates before branding", () => {
  expect(() => definePlugin({ name: "" } as PantokenPlugin)).toThrow();
});

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

test("extendPlugin merges css properties, declarations, prepend, and marker", () => {
  const base = definePlugin({
    name: "base",
    css: () => ({
      prepend: "/* a */",
      properties: [{ name: "--x", syntax: "<length>", value: "1px" }],
      declarations: [["--p", "0"]],
      marker: "base-marker",
    }),
  });
  const ext = extendPlugin(base, {
    css: () => ({
      prepend: "/* b */",
      properties: [{ name: "--y", syntax: "<length>", value: "2px" }],
      declarations: [["--q", "1"]],
      marker: "ext-marker",
    }),
  });
  const merged = ext.css?.({ tokens: [], css: "" });
  expect(merged?.prepend).toBe("/* a */\n\n/* b */");
  expect(merged?.properties).toHaveLength(2);
  expect(merged?.declarations).toEqual([
    ["--p", "0"],
    ["--q", "1"],
  ]);
  // The overriding plugin's marker wins.
  expect(merged?.marker).toBe("ext-marker");
});

test("extendPlugin with only base css contributions keeps a bare-object result", () => {
  const base = definePlugin({ name: "b", css: () => ({}) });
  const ext = extendPlugin(base, { css: () => ({}) });
  expect(ext.css?.({ tokens: [], css: "" })).toEqual({});
});

test("extendPlugin tokens falls back to ctx.tokens when a hook returns undefined", () => {
  const base = definePlugin({
    name: "base-undef",
    tokens: () => undefined as unknown as Token[],
  });
  const ext = extendPlugin(base, {
    tokens: () => undefined as unknown as Token[],
  });
  const ctxTokens: Token[] = [{ name: "--seed", syntax: "*", inherits: true, value: "1" }];
  const out = ext.tokens?.({
    tokens: ctxTokens,
    theme: "rebrand",
    define: (i) => ({ ...i, syntax: "*", inherits: true }),
  });
  expect(out).toEqual(ctxTokens);
});

test("extendPlugin runs both icons hooks and both native hooks", () => {
  const calls: string[] = [];
  const base = definePlugin({
    name: "base",
    icons: () => calls.push("base-icons"),
    native: () => calls.push("base-native"),
  });
  const ext = extendPlugin(base, {
    icons: () => calls.push("ext-icons"),
    native: () => calls.push("ext-native"),
  });
  expect(capabilitiesOf(ext)).toEqual(["icons", "native"]);
  ext.icons?.({
    add: () => {},
    resolve: () => undefined,
  });
  ext.native?.({} as never);
  expect(calls).toEqual(["base-icons", "ext-icons", "base-native", "ext-native"]);
});

test("extendPlugin chains rehype resolvers: overrides, then base, then ctx", () => {
  const base = definePlugin({
    name: "base-rehype",
    rehype: () => ({ resolve: (code) => (code === "b" ? { name: "from-base" } : undefined) }),
  });
  const ext = extendPlugin(base, {
    rehype: () => ({ resolve: (code) => (code === "o" ? { name: "from-override" } : undefined) }),
  });
  const ctxResolve = (code: string) => (code === "c" ? { name: "from-ctx" } : undefined);
  const resolve = ext.rehype?.({ resolve: ctxResolve })?.resolve ?? (() => undefined);
  expect(resolve("o")).toEqual({ name: "from-override" }); // override wins
  expect(resolve("b")).toEqual({ name: "from-base" }); // then base
  expect(resolve("c")).toEqual({ name: "from-ctx" }); // finally ctx fallback
});

test("mergePlugin throws when given no plugins", () => {
  expect(() => mergePlugin()).toThrow("mergePlugin requires at least one plugin");
});

test("checkPlugins warns only once per plugin/stage combination", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const raw: PantokenPlugin = { name: "warn-once-plugin", css: () => ({ append: "x" }) };
  checkPlugins([raw], "css");
  checkPlugins([raw], "css");
  expect(warn).toHaveBeenCalledTimes(1);
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
