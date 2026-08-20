import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { transition } from "../src/index.ts";

test("is a factoried plugin with a tokens-only capability", () => {
  expect(capabilitiesOf(transition())).toEqual(["tokens"]);
});

test("tokens hook defines the duration + timing custom properties", () => {
  const out = transition().tokens?.({ tokens: [], theme: "rebrand" }) ?? [];
  const names = out.map((t) => t.name);
  expect(names).toContain("--instui-transition-duration");
  expect(names).toContain("--instui-transition-timing");
  expect(out.find((t) => t.name === "--instui-transition-duration")?.value).toBe("300ms");
  expect(out.find((t) => t.name === "--instui-transition-timing")?.value).toBe("ease-in-out");
});

test("options override duration and timing", () => {
  const out = transition({ duration: "200ms", timing: "linear" }).tokens?.({
    tokens: [],
    theme: "rebrand",
  });
  expect(out?.find((t) => t.name === "--instui-transition-duration")?.value).toBe("200ms");
  expect(out?.find((t) => t.name === "--instui-transition-timing")?.value).toBe("linear");
});
