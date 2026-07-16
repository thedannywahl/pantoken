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

test("runIconPlugins warns and skips a plugin registered without an icons hook", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const cssOnly = definePlugin({ name: "css-only-at-icons", css: () => ({ append: "" }) });
  expect(runIconPlugins([], [cssOnly])).toEqual([]);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining('has no "icons" hook'));
});
