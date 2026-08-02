import { expect, test } from "vite-plus/test";
import postcss from "postcss";
import { mangleCustomProps } from "../src/index.ts";

const run = (css: string, opts?: Parameters<typeof mangleCustomProps>[0]) =>
  postcss([mangleCustomProps(opts)]).process(css, { from: undefined });

const css = (css: string, opts?: Parameters<typeof mangleCustomProps>[0]): string =>
  run(css, opts).css;

test("mangles --instui-* in declaration props", () => {
  const out = css(`:root { --instui-color-brand: red; }`);
  expect(out).not.toContain("--instui-color-brand");
  expect(out).toMatch(/--[a-z]+:\s*red/u);
});

test("mangles --instui-* in var() values", () => {
  const out = css(`.box { color: var(--instui-color-brand); }`);
  expect(out).not.toContain("--instui-color-brand");
  expect(out).toMatch(/var\(--[a-z]+\)/u);
});

test("mangles --instui-* in @property params", () => {
  const out = css(
    `@property --instui-color-brand { syntax: "<color>"; inherits: true; initial-value: red; }`,
  );
  expect(out).not.toContain("--instui-color-brand");
  expect(out).toMatch(/@property --[a-z]+/u);
});

test("leaves non-prefixed custom properties untouched", () => {
  const out = css(`:root { --instui-color: red; --pendo-bg: blue; --custom: green; }`);
  expect(out).not.toContain("--instui-color:");
  expect(out).toContain("--pendo-bg: blue");
  expect(out).toContain("--custom: green");
});

test("is deterministic — same input always produces same output", () => {
  const input = `:root { --instui-z: 1; --instui-a: 2; --instui-m: 3; }`;
  expect(css(input)).toBe(css(input));
});

test("uses alphabetical sort for assignment order", () => {
  const out = css(`:root { --instui-z: last; --instui-a: first; }`);
  // --instui-a sorts first → maps to --a; --instui-z sorts second → maps to --b
  expect(out).toContain("--a: first");
  expect(out).toContain("--b: last");
});

test("propertyMap: true appends mangle-map to result.messages", () => {
  const result = run(`:root { --instui-color: red; }`, { propertyMap: true });
  const msg = result.messages.find((m) => m.type === "mangle-map");
  expect(msg).toBeDefined();
  expect(msg?.map).toBeInstanceOf(Map);
  expect(msg?.map.size).toBeGreaterThan(0);
});

test("custom prefix mangles only matching names", () => {
  const out = css(`:root { --pendo-color: red; --instui-color: blue; }`, { prefix: "--pendo-" });
  expect(out).not.toContain("--pendo-color:");
  expect(out).toContain("--instui-color: blue");
});

test("method: base36 produces alphanumeric short names", () => {
  const out = css(`:root { --instui-color: red; }`, { method: "base36" });
  expect(out).toMatch(/--[0-9a-z]+:\s*red/u);
});

test("method: numeric produces decimal short names", () => {
  const out = css(`:root { --instui-color: red; }`, { method: "numeric" });
  expect(out).toMatch(/--\d+:\s*red/u);
});

test("sharedManifest reuses mappings across two independent passes", () => {
  const manifest = new Map<string, string>();
  const first = css(`:root { --instui-color-brand: red; }`, { sharedManifest: manifest });
  const second = css(`:root { --instui-color-brand: blue; }`, { sharedManifest: manifest });
  // Both passes must use the same short name for --instui-color-brand.
  const nameFirst = first.match(/(--.+?):\s*red/u)?.[1];
  const nameSecond = second.match(/(--.+?):\s*blue/u)?.[1];
  expect(nameFirst).toBe(nameSecond);
});

test("sharedManifest continues counter for names only seen in the second pass", () => {
  const manifest = new Map<string, string>();
  css(`:root { --instui-a: 1; }`, { sharedManifest: manifest });
  const second = css(`:root { --instui-b: 2; }`, { sharedManifest: manifest });
  // --instui-a → --a (index 0); --instui-b → --b (index 1).
  expect(second).toContain("--b: 2");
  expect(manifest.size).toBe(2);
});
