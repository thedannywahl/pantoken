import { expect, test } from "vite-plus/test";
import {
  buildIconResolver,
  isColorValue,
  rehypeColorCodes,
  rehypeGithubAlerts,
} from "../src/helpers.ts";
import type { PantokenPlugin } from "@pantoken/model";

test("buildIconResolver picks up resolvers contributed by plugin rehype hooks", () => {
  const plugin: PantokenPlugin = {
    name: "test-plugin",
    rehype: () => ({
      resolve: (code: string) =>
        code === "spark" ? { name: "spark", svg: "<svg id='spark'/>" } : undefined,
    }),
  } as unknown as PantokenPlugin;
  const resolve = buildIconResolver({ icons: { plugins: [plugin] } });
  expect(resolve("spark")?.name).toBe("spark");
  // Still falls through to the built-in set for other names.
  expect(resolve("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
});

test("buildIconResolver ignores a plugin whose rehype hook contributes no resolver", () => {
  const plugin = { name: "empty", rehype: () => ({}) } as unknown as PantokenPlugin;
  const resolve = buildIconResolver({ icons: { plugins: [plugin] } });
  expect(resolve("definitely-not-an-icon")).toBeUndefined();
});

test("isColorValue trims surrounding whitespace before matching", () => {
  expect(isColorValue("  #fff  ")).toBe(true);
  expect(isColorValue("oklch(0.7 0.1 200)")).toBe(true);
  expect(isColorValue("not a color")).toBe(false);
});

test("rehypeColorCodes leaves text without a color value untouched", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "no colors here" }],
      },
    ],
  };
  rehypeColorCodes()(tree);
  const p = tree.children[0] as { children: { type: string }[] };
  expect(p.children).toHaveLength(1);
  expect(p.children[0].type).toBe("text");
});

test("rehypeColorCodes preserves the text before and after an inline color", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "before #03893D after" }],
      },
    ],
  };
  rehypeColorCodes()(tree);
  const p = tree.children[0] as {
    children: { type: string; value?: string; properties?: Record<string, unknown> }[];
  };
  expect(p.children[0]).toMatchObject({ type: "text", value: "before " });
  expect(p.children[1].properties?.["data-color-code"]).toBe("#03893D");
  expect(p.children[2]).toMatchObject({ type: "text", value: " after" });
});

test("rehypeGithubAlerts ignores non-blockquotes and blockquotes without a marker", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "[!NOTE] not a blockquote" }],
      },
      {
        type: "element",
        tagName: "blockquote",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "p",
            properties: {},
            children: [{ type: "text", value: "plain quote, no marker" }],
          },
        ],
      },
    ],
  };
  rehypeGithubAlerts()(tree);
  const [div, bq] = tree.children as { properties: Record<string, unknown> }[];
  expect(div.properties["data-alert"]).toBeUndefined();
  expect(bq.properties["data-alert"]).toBeUndefined();
});

test("rehypeGithubAlerts ignores a blockquote that has no text node", () => {
  const tree = {
    type: "root",
    children: [{ type: "element", tagName: "blockquote", properties: {}, children: [] }],
  };
  expect(() => rehypeGithubAlerts()(tree)).not.toThrow();
  const bq = tree.children[0] as { properties: Record<string, unknown> };
  expect(bq.properties["data-alert"]).toBeUndefined();
});
