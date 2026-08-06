import { describe, expect, test } from "vite-plus/test";

import { partitionApiSidebar } from "./api-sidebar.js";

type TestItem = {
  text: string;
  link?: string;
  items?: TestItem[];
};

const sidebar: TestItem[] = [
  {
    text: "packages",
    items: [
      {
        text: "core",
        link: "/api/packages/core/src/",
        items: [
          {
            text: "Functions",
            items: [{ text: "resolve", link: "/api/packages/core/src/functions/resolve" }],
          },
        ],
      },
      {
        text: "model",
        link: "/api/packages/model/src/",
        items: [
          {
            text: "Interfaces",
            items: [{ text: "Token", link: "/api/packages/model/src/interfaces/Token" }],
          },
        ],
      },
    ],
  },
  {
    text: "CSS",
    items: [
      { text: "Overview", link: "/api/css/" },
      { text: "Components", items: [{ text: "button", link: "/api/css/button.md" }] },
    ],
  },
];

const flattenItems = (items: TestItem[]): TestItem[] =>
  items.flatMap((item) => [item, ...flattenItems(item.items ?? [])]);

const findItem = (items: TestItem[], text: string): TestItem | undefined =>
  flattenItems(items).find((item) => item.text === text);

describe("partitionApiSidebar", () => {
  test("keeps only package entry links in the root API sidebar", () => {
    const routes = partitionApiSidebar(sidebar, "API reference", "/api/", "Overview");

    expect(Object.keys(routes)).toEqual([
      "/api/",
      "/api/packages/core/src/",
      "/api/packages/model/src/",
      "/api/css/",
    ]);
    expect(findItem(routes["/api/"] as TestItem[], "core")?.items).toBeUndefined();
    expect(findItem(routes["/api/"] as TestItem[], "model")?.items).toBeUndefined();
    expect(findItem(routes["/api/"] as TestItem[], "CSS")).toMatchObject({
      link: "/api/css/",
    });
  });

  test("expands only the package selected by the route prefix", () => {
    const routes = partitionApiSidebar(sidebar, "API reference", "/api/", "Overview");
    const coreRoute = routes["/api/packages/core/src/"] as TestItem[];

    expect(findItem(coreRoute, "core")?.items).toHaveLength(1);
    expect(findItem(coreRoute, "resolve")?.link).toBe("/api/packages/core/src/functions/resolve");
    expect(findItem(coreRoute, "model")?.items).toBeUndefined();
    expect(findItem(coreRoute, "Token")).toBeUndefined();
  });

  test("uses the complete CSS tree only on CSS routes", () => {
    const routes = partitionApiSidebar(sidebar, "API reference", "/api/", "Overview");
    const cssRoute = routes["/api/css/"] as TestItem[];

    expect(findItem(cssRoute, "button")?.link).toBe("/api/css/button.md");
    expect(findItem(cssRoute, "core")?.items).toBeUndefined();
  });

  test("derives localized route prefixes from localized generated links", () => {
    const localize = (entry: TestItem): TestItem => ({
      ...entry,
      link: entry.link?.replace("/api/", "/hu/api/"),
      items: entry.items?.map(localize),
    });
    const localized = sidebar.map(localize);
    const routes = partitionApiSidebar(localized, "API referencia", "/hu/api/", "Áttekintés");

    expect(routes).toHaveProperty("/hu/api/packages/core/src/");
    expect(routes).toHaveProperty("/hu/api/css/");
  });

  test("does not mutate the generated sidebar", () => {
    const before = structuredClone(sidebar);
    partitionApiSidebar(sidebar, "API reference", "/api/", "Overview");
    expect(sidebar).toEqual(before);
  });
});
