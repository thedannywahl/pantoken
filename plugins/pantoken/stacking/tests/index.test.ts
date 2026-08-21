import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { stacking, STACKING_LEVELS } from "../src/index.ts";

test("is a factoried plugin with a tokens-only capability", () => {
  expect(capabilitiesOf(stacking())).toEqual(["tokens"]);
});

test("tokens hook resolves --instui-stacking-* from the view stacking scale", () => {
  const out = stacking().tokens?.({ tokens: [], theme: "rebrand" }) ?? [];
  const names = out.map((t) => t.name);
  for (const level of STACKING_LEVELS) {
    expect(names).toContain(`--instui-stacking-${level}`);
  }
  // Values resolve to concrete z-index numbers (not a dangling var()).
  const topmost = out.find((t) => t.name === "--instui-stacking-topmost");
  expect(topmost?.value).not.toContain("var(");
});
