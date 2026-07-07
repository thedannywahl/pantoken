import { expect, test } from "vite-plus/test";
import postcss from "postcss";
import { pruneCustomProps } from "../src/index.ts";

const run = (css: string): string =>
  postcss([pruneCustomProps()]).process(css, { from: undefined }).css;

test("drops custom properties nothing references", () => {
  const out = run(`:root { --used: red; --unused: blue; }\n.box { color: var(--used); }`);
  expect(out).toContain("--used: red");
  expect(out).not.toContain("--unused");
  expect(out).toContain("color: var(--used)");
});

test("keeps transitively-referenced custom properties", () => {
  const out = run(`:root { --a: var(--b); --b: green; --c: yellow; }\n.box { color: var(--a); }`);
  expect(out).toContain("--a: var(--b)");
  expect(out).toContain("--b: green");
  expect(out).not.toContain("--c");
});

test("removes unused @property registrations", () => {
  const out = run(
    `@property --used { syntax: "<color>"; inherits: true; initial-value: red; }\n` +
      `@property --dead { syntax: "<color>"; inherits: true; initial-value: blue; }\n` +
      `.box { color: var(--used); }`,
  );
  expect(out).toContain("@property --used");
  expect(out).not.toContain("@property --dead");
});
