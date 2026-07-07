import { expect, test } from "vite-plus/test";
import {
  alertVariant,
  buildIconResolver,
  isColorValue,
  parseAlertMarker,
  rehypeColorCodes,
  rehypeGithubAlerts,
} from "../src/helpers.ts";

test("buildIconResolver resolves built-in pantoken icons and honors custom resolvers first", () => {
  const resolve = buildIconResolver();
  expect(resolve("arrow-left")?.svg?.startsWith("<svg")).toBe(true);
  expect(resolve("definitely-not-an-icon")).toBeUndefined();

  const custom = buildIconResolver({
    icons: {
      resolvers: [
        (code) => (code === "arrow-left" ? { name: "custom", svg: "<svg id='x'/>" } : undefined),
      ],
    },
  });
  expect(custom("arrow-left")?.name).toBe("custom");
});

test("parseAlertMarker extracts GitHub alert markers", () => {
  expect(parseAlertMarker("[!NOTE] hello")).toEqual({ marker: "NOTE", rest: "hello" });
  expect(parseAlertMarker("[!WARNING]\ncareful")).toEqual({ marker: "WARNING", rest: "careful" });
  expect(parseAlertMarker("not an alert")).toBeUndefined();
});

test("alertVariant maps markers to InstUI variants", () => {
  expect(alertVariant("NOTE")).toBe("info");
  expect(alertVariant("TIP")).toBe("success");
  expect(alertVariant("WARNING")).toBe("warning");
  expect(alertVariant("CAUTION")).toBe("error");
});

test("isColorValue recognizes hex and color functions", () => {
  expect(isColorValue("#03893D")).toBe(true);
  expect(isColorValue("rgb(1, 2, 3)")).toBe(true);
  expect(isColorValue("hello")).toBe(false);
});

test("rehypeColorCodes wraps color values in a swatch span", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "brand is #03893D today" }],
      },
    ],
  };
  rehypeColorCodes()(tree);
  const p = tree.children[0] as {
    children: { type: string; tagName?: string; properties?: Record<string, unknown> }[];
  };
  const swatch = p.children.find((c) => c.type === "element");
  expect(swatch?.properties?.["data-color-code"]).toBe("#03893D");
});

test("rehypeGithubAlerts tags a blockquote and strips the marker", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "blockquote",
        properties: {},
        children: [
          {
            type: "element",
            tagName: "p",
            properties: {},
            children: [{ type: "text", value: "[!NOTE] pay attention" }],
          },
        ],
      },
    ],
  };
  rehypeGithubAlerts()(tree);
  const bq = tree.children[0] as unknown as {
    properties: Record<string, unknown>;
    children: [{ children: [{ value: string }] }];
  };
  expect(bq.properties["data-alert"]).toBe("note");
  expect(bq.children[0].children[0].value).toBe("pay attention");
});
