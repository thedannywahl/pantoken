import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { stacking, STACKING_LEVELS } from "../src/index.ts";
import type { Token } from "@pantoken/model";

const define = (i: { name: string; value: string }): Token => ({
  name: i.name,
  syntax: "*",
  inherits: true,
  value: i.value,
});

test("is a factoried plugin with tokens + css capabilities", () => {
  expect(capabilitiesOf(stacking())).toEqual(["tokens", "css"]);
});

test("tokens hook resolves --instui-stacking-* from the view stacking scale", () => {
  const out = stacking().tokens?.({ tokens: [], theme: "rebrand", define }) ?? [];
  const names = out.map((t) => t.name);
  for (const level of STACKING_LEVELS) {
    expect(names).toContain(`--instui-stacking-${level}`);
  }
  // Values resolve to concrete z-index numbers (not a dangling var()).
  const topmost = out.find((t) => t.name === "--instui-stacking-topmost");
  expect(topmost?.value).not.toContain("var(");
});

test("css hook emits .instui-stack-* z-index classes", () => {
  const out = stacking().css?.({ tokens: [], css: "" });
  const css = out && "append" in out ? (out.append as string) : "";
  expect(css).toContain(".instui-stack-topmost { z-index: var(--instui-stacking-topmost); }");
  expect(css).toContain(".instui-stack-deepest { z-index: var(--instui-stacking-deepest); }");
});
