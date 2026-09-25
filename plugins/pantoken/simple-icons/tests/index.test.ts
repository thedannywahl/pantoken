import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { simpleIcons, toExportName } from "../src/index.ts";

test("is a factoried plugin with tokens + rehype capabilities", () => {
  expect(capabilitiesOf(simpleIcons())).toEqual(["tokens", "rehype"]);
});

const registry = {
  siGithub: { title: "GitHub", slug: "github", path: "M12 0z" },
  siReact: { title: "React", slug: "react", path: "M14 2z" },
};

test("toExportName converts slugs to Simple Icons export names", () => {
  expect(toExportName("github")).toBe("siGithub");
  expect(toExportName("github-actions")).toBe("siGithubActions");
});

test("token hook emits selected brand glyphs as <image> tokens", () => {
  const plugin = simpleIcons({ registry, slugs: ["github"] });
  const out = plugin.tokens?.({
    tokens: [],
    theme: "rebrand",
  });
  const github = out?.find((t) => t.name === "--instui-icon-github");
  expect(github?.syntax).toBe("<image>");
  expect(github?.value.startsWith("url('data:image/svg+xml")).toBe(true);
  expect(github?.meta?.kind).toBe("icon");
});

test("rehype hook resolves brand codes at render", () => {
  const resolver = simpleIcons({ registry }).rehype?.({ resolve: () => undefined })?.resolve;
  expect(resolver?.("github")?.path).toBe("M12 0z");
  expect(resolver?.("nope")).toBeUndefined();
});

test("token hook skips a slug whose token name already exists", () => {
  const warn = console.warn;
  const warnings: unknown[] = [];
  console.warn = (...args: unknown[]) => warnings.push(args);
  try {
    const plugin = simpleIcons({
      registry: { ...registry, siX: { title: "X", slug: "x", path: "M0 0z" } },
      slugs: ["x"],
    });
    const existing = {
      name: "--instui-icon-x",
      syntax: "<image>" as const,
      inherits: true,
      value: "url('builtin')",
    };
    const out = plugin.tokens?.({ tokens: [existing], theme: "rebrand" });
    expect(out).toEqual([existing]);
    expect(warnings).toHaveLength(1);
  } finally {
    console.warn = warn;
  }
});

test("token hook without a registry throws a helpful error", () => {
  expect(() =>
    simpleIcons({ slugs: ["github"] }).tokens?.({
      tokens: [],
      theme: "rebrand",
    }),
  ).toThrow(/registry/);
});
