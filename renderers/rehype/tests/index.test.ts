import { expect, test } from "vite-plus/test";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import { rehypePantokenIcons } from "../src/index.ts";

interface El {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: El[];
  value?: string;
}

function tree(text: string): El {
  return {
    type: "root",
    children: [{ type: "element", tagName: "p", children: [{ type: "text", value: text }] }],
  };
}

test("replaces a known :icon: with an inline SVG span", () => {
  const t = tree("go :arrow-left: back");
  rehypePantokenIcons()(t);
  const p = t.children![0];
  const kinds = p.children!.map((c) => c.type);
  expect(kinds).toContain("element");
  const icon = p.children!.find((c) => c.type === "element");
  expect(icon?.properties?.["data-pantoken-icon"]).toBe("arrow-left");
  const raw = icon?.children?.[0] as { type: string; value: string };
  expect(raw.value.startsWith("<svg")).toBe(true);
});

test("leaves unknown codes untouched", () => {
  const t = tree("hello :definitely-not-an-icon: world");
  rehypePantokenIcons()(t);
  const p = t.children![0];
  expect(p.children).toHaveLength(1);
  expect(p.children![0].value).toBe("hello :definitely-not-an-icon: world");
});

test("plugin resolvers are tried first (simple-icons brand codes)", () => {
  const registry = { siGithub: { title: "GitHub", slug: "github", path: "M12 0z" } };
  const t = tree(":github:");
  rehypePantokenIcons({ plugins: [simpleIcons({ registry })] })(t);
  const icon = t.children![0].children!.find((c) => c.type === "element");
  expect(icon?.properties?.["data-pantoken-icon"]).toBe("github");
});
