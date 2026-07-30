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
    tokens: ({ tokens }) => [
      ...tokens,
      defineToken({ name: "--instui-a", value: "#222" }),
      defineToken({ name: "--instui-focus-color", value: "#00f" }),
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
    icons: () => [{ name: "acme", path: "M0 0h24v24H0z" }],
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
    icons: () => [
      { name: "custom", svg: "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>" },
      { name: "empty" }, // neither svg nor path → no token produced
    ],
  });
  const out = runIconPlugins([], [plugin]);
  expect(out.find((t) => t.name === "--instui-icon-custom")).toBeDefined();
  expect(out.find((t) => t.name === "--instui-icon-empty")).toBeUndefined();
});

test("runIconPlugins provides existing icons in ctx so a plugin can skip duplicates", () => {
  const existing = defineToken({
    name: "--instui-icon-star",
    value: "url('data:...')",
    syntax: "<image>",
    meta: { kind: "icon" },
  });
  const plugin = definePlugin({
    name: "dedup-aware",
    icons: ({ icons }) => {
      const hasStar = icons.some((i) => i.name === "star");
      return hasStar ? [] : [{ name: "star", path: "M0 0h1v1H0z" }];
    },
  });
  // star already present → plugin skips it (returns empty) → no duplicate
  const out = runIconPlugins([existing], [plugin]);
  expect(out.filter((t) => t.name === "--instui-icon-star")).toHaveLength(1);
});

test("runIconPlugins warns and skips a plugin registered without an icons hook", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const cssOnly = definePlugin({ name: "css-only-at-icons", css: () => ({ append: "" }) });
  expect(runIconPlugins([], [cssOnly])).toEqual([]);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining('has no "icons" hook'));
});

test("runTokenPlugins drops tokens with invalid CSS custom property names and warns (D7)", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const plugin = definePlugin({
    name: "injection-attempt",
    tokens: () => [
      { name: "--valid", syntax: "*", inherits: true, value: "1" },
      // name contains ; which would break CSS serialization
      { name: "--x; } body { background:", syntax: "*", inherits: true, value: "red;" },
    ],
  });
  const out = runTokenPlugins([], "rebrand", [plugin]);
  expect(out.map((t) => t.name)).toEqual(["--valid"]);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("invalid name"));
});

test("runTokenPlugins sanitizes script injection inside an <image> token returned by a plugin (D7)", () => {
  const evilSvg = encodeURIComponent("<svg><script>evil()</script><path d='M0 0'/></svg>");
  const plugin = definePlugin({
    name: "evil-image-plugin",
    tokens: () => [
      {
        name: "--instui-evil-icon",
        syntax: "<image>",
        inherits: false,
        value: `url('data:image/svg+xml;utf8,${evilSvg}')`,
      },
    ],
  });
  const out = runTokenPlugins([], "rebrand", [plugin]);
  const token = out.find((t) => t.name === "--instui-evil-icon");
  expect(token).toBeDefined();
  expect(token?.value).not.toContain("script");
  expect(token?.value).toContain("path");
});

test("sanitizeImageToken passes through a malformed data URI unchanged (catch path)", () => {
  // %ZZ is invalid percent-encoding, so decodeURIComponent throws → the catch returns the raw value.
  const badValue = `url('data:image/svg+xml;utf8,%ZZinvalid')`;
  const plugin = definePlugin({
    name: "bad-uri-plugin",
    tokens: () => [{ name: "--instui-bad", syntax: "<image>", inherits: false, value: badValue }],
  });
  const out = runTokenPlugins([], "rebrand", [plugin]);
  const token = out.find((t) => t.name === "--instui-bad");
  expect(token?.value).toBe(badValue);
});
