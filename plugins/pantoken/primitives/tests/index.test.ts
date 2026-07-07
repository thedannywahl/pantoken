import { expect, test } from "vite-plus/test";
import { primitivesCss } from "../src/index.ts";

const names = {
  color: ["--instui-primitive-color-white", "--instui-primitive-color-navy-navy170"],
  fontFamily: ["--instui-primitive-font-family-lato"],
  fontWeight: ["--instui-primitive-font-weight-regular"],
};

test("primitive colors emit bg/fg/border utilities keyed on the primitive token", () => {
  const css = primitivesCss(names, { prefix: "instui" });
  expect(css).toContain(
    ".instui-bg-primitive-color-white { background: var(--instui-primitive-color-white); }",
  );
  expect(css).toContain(
    ".instui-fg-primitive-color-white { color: var(--instui-primitive-color-white); }",
  );
  expect(css).toContain(
    ".instui-border-primitive-color-navy-navy170 { border-color: var(--instui-primitive-color-navy-navy170); }",
  );
});

test("primitive fonts map to their one property via the token transformer", () => {
  const css = primitivesCss(names, { prefix: "instui" });
  expect(css).toContain(
    ".instui-primitive-font-family-lato { font-family: var(--instui-primitive-font-family-lato); }",
  );
  expect(css).toContain(
    ".instui-primitive-font-weight-regular { font-weight: var(--instui-primitive-font-weight-regular); }",
  );
});

test("a falsy prefix drops the namespace entirely", () => {
  const css = primitivesCss(names, { prefix: null });
  expect(css).toContain(
    ".bg-primitive-color-white { background: var(--instui-primitive-color-white); }",
  );
  expect(css).not.toContain(".instui-");
});
