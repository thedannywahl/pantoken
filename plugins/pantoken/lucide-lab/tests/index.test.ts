import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { lucideLab, svgOf, type LucideLabNode, type LucideLabRegistry } from "../src/index.ts";

const burger: LucideLabNode[] = [["path", { d: "M4 6h16" }]];
const registry: LucideLabRegistry = {
  burger,
  atSignCircle: [["circle", { cx: 12, cy: 12, r: 10 }]],
};

test("is a factoried plugin with a tokens capability", () => {
  expect(capabilitiesOf(lucideLab())).toEqual(["tokens"]);
});

test("converts icon nodes to currentColor SVG", () => {
  const svg = svgOf(burger);
  expect(svg).toContain('viewBox="0 0 24 24"');
  expect(svg).toContain('stroke="currentColor"');
  expect(svg).toContain('<path d="M4 6h16"/>');
});

test("token hook emits all registry icons as image tokens", () => {
  const out = lucideLab({ registry }).tokens?.({ tokens: [], theme: "rebrand" });
  expect(out?.map((token) => token.name)).toEqual([
    "--instui-icon-at-sign-circle",
    "--instui-icon-burger",
  ]);
  expect(out?.[0]?.syntax).toBe("<image>");
  expect(out?.[0]?.value).toMatch(/^url\('data:image\/svg\+xml;utf8,/);
  expect(out?.[0]?.meta?.kind).toBe("icon");
});

test("token hook honours names and a custom prefix", () => {
  const out = lucideLab({ registry, names: ["burger"], prefix: "--acme-icon-" }).tokens?.({
    tokens: [],
    theme: "rebrand",
  });
  expect(out?.map((token) => token.name)).toEqual(["--acme-icon-burger"]);
});

test("ignores an unknown requested name", () => {
  const out = lucideLab({ registry, names: ["nope"] }).tokens?.({ tokens: [], theme: "rebrand" });
  expect(out).toEqual([]);
});

test("token hook skips an icon whose token name already exists", () => {
  const warn = console.warn;
  const warnings: unknown[] = [];
  console.warn = (...args: unknown[]) => warnings.push(args);
  try {
    const existing = {
      name: "--instui-icon-burger",
      syntax: "<image>" as const,
      inherits: true,
      value: "url('builtin')",
    };
    const out = lucideLab({ registry, names: ["burger"] }).tokens?.({
      tokens: [existing],
      theme: "rebrand",
    });
    expect(out).toEqual([existing]);
    expect(warnings).toHaveLength(1);
  } finally {
    console.warn = warn;
  }
});

test("token hook without a registry throws a helpful error", () => {
  expect(() => lucideLab({ names: ["burger"] }).tokens?.({ tokens: [], theme: "rebrand" })).toThrow(
    /registry/,
  );
});
