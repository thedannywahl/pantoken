import { expect, test } from "vite-plus/test";
import { applyMinify } from "../src/index.ts";

const PROP_CSS = `@property --instui-color-brand { syntax: "<color>"; inherits: true; initial-value: red; }
.box { color: var(--instui-color-brand); }`;

test("passthrough when no options set", () => {
  expect(applyMinify(PROP_CSS)).toBe(PROP_CSS);
});

test("passthrough when all options are false", () => {
  expect(applyMinify(PROP_CSS, { prune: false, flatten: false, mangle: false })).toBe(PROP_CSS);
});

test("prune: true removes unused custom properties", () => {
  // --instui-unused is defined but never referenced by a real declaration.
  const out = applyMinify(
    `:root { --instui-used: red; --instui-unused: blue; } .box { color: var(--instui-used); }`,
    { prune: true },
  );
  expect(out).toContain("--instui-used");
  expect(out).not.toContain("--instui-unused");
});

test("flatten: true removes @property and injects :root declaration", () => {
  const out = applyMinify(PROP_CSS, { flatten: true });
  expect(out).not.toContain("@property");
  expect(out).toContain(":root");
  expect(out).toContain("--instui-color-brand: red");
});

test("flatten with injectSelector option", () => {
  const out = applyMinify(PROP_CSS, { flatten: { injectSelector: ":scope" } });
  expect(out).toContain(":scope");
  expect(out).not.toContain(":root");
});

test("mangle: true renames --instui-* props", () => {
  const out = applyMinify(PROP_CSS, { mangle: true });
  expect(out).not.toContain("--instui-color-brand");
});

test("flatten and mangle together: no @property and no long names", () => {
  const out = applyMinify(PROP_CSS, { flatten: true, mangle: true });
  expect(out).not.toContain("@property");
  expect(out).not.toContain("--instui-");
  expect(out).toContain(":root");
  expect(out).toContain(".box");
});

test("sharedManifest produces consistent names across two applyMinify calls", () => {
  const manifest = new Map<string, string>();
  const first = applyMinify(`:root { --instui-color-brand: red; }`, {
    mangle: { sharedManifest: manifest },
  });
  const second = applyMinify(`.box { color: var(--instui-color-brand); }`, {
    mangle: { sharedManifest: manifest },
  });
  const nameFirst = first.match(/(--.+?):\s*red/u)?.[1];
  const nameSecond = second.match(/var\((.+?)\)/u)?.[1];
  expect(nameFirst).toBeDefined();
  expect(nameFirst).toBe(nameSecond);
});
