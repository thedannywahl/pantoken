import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { customIcons, icons } from "../src/index.ts";

test("is a factoried plugin with a tokens capability", () => {
  expect(capabilitiesOf(customIcons())).toEqual(["tokens"]);
});

test("vendors the highspot icon", () => {
  expect(icons.some((i) => i.name === "highspot")).toBe(true);
});

test("vendors the conveyor logo as a square currentColor mark", () => {
  const conveyor = icons.find((i) => i.name === "conveyor");
  expect(conveyor?.svg).toContain('viewBox="0 0 27 27"');
  expect(conveyor?.svg).toContain('fill="currentColor"');
  expect(conveyor?.svg.match(/<path\b/gu)).toHaveLength(5);
  expect(conveyor?.svg).not.toContain("<mask");
  expect(conveyor?.svg).not.toMatch(/#[\dA-F]{3,8}/iu);
});

test("vendors the responsive icon as a square currentColor mark", () => {
  const responsive = icons.find((i) => i.name === "responsive");
  expect(responsive?.svg).toContain('viewBox="0 0 27 27"');
  expect(responsive?.svg).toContain('fill="currentColor"');
  expect(responsive?.svg).not.toMatch(/#[\dA-F]{3,8}/iu);
});

test("vendors the vanilla-forums V as a square currentColor mark", () => {
  const vanillaForums = icons.find((i) => i.name === "vanilla-forums");
  expect(vanillaForums?.svg).toContain('viewBox="0 0 196 196"');
  expect(vanillaForums?.svg).toContain('fill="currentColor"');
  expect(vanillaForums?.svg.match(/<path\b/gu)).toHaveLength(1);
  expect(vanillaForums?.svg).not.toMatch(/#[\dA-F]{3,8}/iu);
});

test("token hook emits every vendored icon as an <image> token by default", () => {
  const out = customIcons().tokens?.({ tokens: [], theme: "rebrand" });
  const highspot = out?.find((t) => t.name === "--instui-icon-highspot");
  expect(highspot?.syntax).toBe("<image>");
  expect(highspot?.value.startsWith("url('data:image/svg+xml;utf8,")).toBe(true);
  expect(highspot?.meta?.kind).toBe("icon");
});

test("token hook honours an explicit names filter", () => {
  const out = customIcons({ names: [] }).tokens?.({ tokens: [], theme: "rebrand" });
  expect(out?.some((t) => t.name === "--instui-icon-highspot")).toBe(false);
});

test("token hook honours a custom prefix", () => {
  const out = customIcons({ names: ["highspot"], prefix: "--acme-icon-" }).tokens?.({
    tokens: [],
    theme: "rebrand",
  });
  expect(out?.some((t) => t.name === "--acme-icon-highspot")).toBe(true);
});

test("ignores an unknown requested name", () => {
  const out = customIcons({ names: ["nope"] }).tokens?.({ tokens: [], theme: "rebrand" });
  expect(out).toEqual([]);
});
