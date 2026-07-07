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
    define: (i) => ({
      name: i.name,
      syntax: i.syntax ?? "*",
      inherits: true,
      value: i.value,
      meta: i.meta,
    }),
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

test("token hook without a registry throws a helpful error", () => {
  expect(() =>
    simpleIcons({ slugs: ["github"] }).tokens?.({
      tokens: [],
      theme: "rebrand",
      define: (i) => ({ name: i.name, syntax: "*", inherits: true, value: i.value }),
    }),
  ).toThrow(/registry/);
});
