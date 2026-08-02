import { expect, test } from "vite-plus/test";
import postcss from "postcss";
import { flattenProperty } from "../src/index.ts";

const run = (css: string, opts?: Parameters<typeof flattenProperty>[0]): string =>
  postcss([flattenProperty(opts)]).process(css, { from: undefined }).css;

test("removes @property at-rules", () => {
  const out = run(`@property --foo { syntax: "<color>"; inherits: true; initial-value: red; }`);
  expect(out).not.toContain("@property");
});

test("injects initial-value as declaration inside :root by default", () => {
  const out = run(`@property --foo { syntax: "<color>"; inherits: true; initial-value: red; }`);
  expect(out).toContain(":root");
  expect(out).toContain("--foo: red");
});

test("injects into custom injectSelector", () => {
  const out = run(`@property --foo { syntax: "<color>"; inherits: true; initial-value: red; }`, {
    injectSelector: ":scope",
  });
  expect(out).toContain(":scope");
  expect(out).toContain("--foo: red");
  expect(out).not.toContain(":root");
});

test("onMissingInitialValue: remove (default) drops @property with no initial-value", () => {
  const out = run(`@property --foo { syntax: "<color>"; inherits: true; }`);
  expect(out).not.toContain("@property");
  expect(out).not.toContain("--foo");
});

test("onMissingInitialValue: keep preserves @property with no initial-value", () => {
  const out = run(`@property --foo { syntax: "<color>"; inherits: true; }`, {
    onMissingInitialValue: "keep",
  });
  expect(out).toContain("@property --foo");
});

test("collapses multiple @property rules into a single injected rule", () => {
  const out = run(`
    @property --a { syntax: "<color>"; inherits: true; initial-value: red; }
    @property --b { syntax: "<length>"; inherits: true; initial-value: 4px; }
    @property --c { syntax: "<color>"; inherits: true; initial-value: blue; }
  `);
  expect(out).not.toContain("@property");
  const ruleCount = (out.match(/:root/gu) ?? []).length;
  expect(ruleCount).toBe(1);
  expect(out).toContain("--a: red");
  expect(out).toContain("--b: 4px");
  expect(out).toContain("--c: blue");
});

test("drops empty @layer blocks left after removal", () => {
  const out = run(
    `@layer tokens { @property --foo { syntax: "<color>"; inherits: true; initial-value: red; } }`,
  );
  expect(out).not.toContain("@layer");
  expect(out).toContain("--foo: red");
});

test("does not touch non-@property content", () => {
  const out = run(
    `@property --foo { syntax: "<color>"; inherits: true; initial-value: red; }\n.box { color: var(--foo); }`,
  );
  expect(out).toContain(".box");
  expect(out).toContain("color: var(--foo)");
});
