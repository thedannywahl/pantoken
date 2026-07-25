import { afterEach, expect, test, vi } from "vite-plus/test";
import { definePlugin } from "@pantoken/plugin-kit";
import { dedupeByName, defineToken, runIconPlugins, runTokenPlugins } from "../src/plugin.ts";
import type { Token } from "../src/model.ts";

afterEach(() => vi.restoreAllMocks());

test("defineToken defaults inherits and sniffs syntax", () => {
  const t = defineToken({ name: "--instui-x", value: "#fff" });
  expect(t.inherits).toBe(true);
  expect(t.syntax).toBe("<color>");
});

test("defineToken marks references and themed values", () => {
  const ref = defineToken({ name: "--instui-x", value: "var(--instui-y)" });
  expect(ref.refersTo).toBe("--instui-y");
  expect(ref.syntax).toBe("*");

  const themed = defineToken({ name: "--instui-z", value: "light-dark(#fff, #000)" });
  expect(themed.themed).toBe(true);
});

test("dedupeByName keeps the last occurrence", () => {
  const tokens: Token[] = [
    defineToken({ name: "--instui-x", value: "#fff" }),
    defineToken({ name: "--instui-x", value: "#000" }),
  ];
  const out = dedupeByName(tokens);
  expect(out).toHaveLength(1);
  expect(out[0].value).toBe("#000");
});

test("runTokenPlugins lets a plugin contribute and override, later wins", () => {
  const base: Token[] = [defineToken({ name: "--instui-a", value: "#111" })];
  const plugin = definePlugin({
    name: "test",
    tokens: ({ tokens, define }) => [
      ...tokens,
      define({ name: "--instui-a", value: "#222" }),
      define({ name: "--instui-focus-color", value: "#00f" }),
    ],
  });
  const out = runTokenPlugins(base, "rebrand", [plugin]);
  const byName = new Map(out.map((t) => [t.name, t.value]));
  expect(byName.get("--instui-a")).toBe("#222");
  expect(byName.get("--instui-focus-color")).toBe("#00f");
});

test("runIconPlugins turns an added IconEntry into an <image> token", () => {
  const brand = definePlugin({
    name: "brand-icons",
    icons: ({ add }) => add({ name: "acme", path: "M0 0h24v24H0z" }),
  });
  const out = runIconPlugins([], [brand]);
  const token = out.find((t) => t.name === "--instui-icon-acme");
  expect(token?.syntax).toBe("<image>");
  expect(token?.value).toContain("data:image/svg+xml");
  expect(token?.meta?.kind).toBe("icon");
});

test("runTokenPlugins ignores a hook that returns a non-array (keeps the accumulator)", () => {
  const base: Token[] = [defineToken({ name: "--instui-a", value: "#111" })];
  const noop = definePlugin({
    name: "no-op-tokens",
    // A hook may bail out by returning nothing; the list must pass through unchanged.
    tokens: () => undefined as unknown as Token[],
  });
  const out = runTokenPlugins(base, "rebrand", [noop]);
  expect(out.map((t) => t.name)).toEqual(["--instui-a"]);
});

test("runIconPlugins accepts an entry that supplies its own svg, and skips artworkless entries", () => {
  const plugin = definePlugin({
    name: "mixed-icons",
    icons: ({ add }) => {
      add({ name: "custom", svg: "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>" });
      add({ name: "empty" }); // neither svg nor path → no token produced
    },
  });
  const out = runIconPlugins([], [plugin]);
  expect(out.find((t) => t.name === "--instui-icon-custom")).toBeDefined();
  expect(out.find((t) => t.name === "--instui-icon-empty")).toBeUndefined();
});

test("runIconPlugins exposes resolve() so a plugin can avoid re-adding an existing glyph", () => {
  const seen: Array<{ name: string } | undefined> = [];
  const existing = defineToken({
    name: "--instui-icon-star",
    value: "url('data:...')",
    syntax: "<image>",
    meta: { kind: "icon" },
  });
  const plugin = definePlugin({
    name: "resolve-aware",
    icons: ({ add, resolve }) => {
      seen.push(resolve("star")); // already present → { name: "star" }
      seen.push(resolve("moon")); // absent → undefined
      if (!resolve("moon")) add({ name: "moon", path: "M0 0h1v1H0z" });
    },
  });
  const out = runIconPlugins([existing], [plugin]);
  expect(seen[0]).toEqual({ name: "star" });
  expect(seen[1]).toBeUndefined();
  expect(out.find((t) => t.name === "--instui-icon-moon")).toBeDefined();
});

test("runIconPlugins warns and skips a plugin registered without an icons hook", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const cssOnly = definePlugin({ name: "css-only-at-icons", css: () => ({ append: "" }) });
  expect(runIconPlugins([], [cssOnly])).toEqual([]);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining('has no "icons" hook'));
});
