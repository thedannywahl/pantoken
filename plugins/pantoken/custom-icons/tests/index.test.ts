import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { customIcons, icons } from "../src/index.ts";

test("is a factoried plugin with a tokens capability", () => {
  expect(capabilitiesOf(customIcons())).toEqual(["tokens"]);
});

test("vendors the highspot icon", () => {
  expect(icons.some((i) => i.name === "highspot")).toBe(true);
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
