import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

vi.mock("node:fs");

const readMock = vi.mocked(readFileSync);
const writeMock = vi.mocked(writeFileSync);
const mkdirMock = vi.mocked(mkdirSync);
const copyMock = vi.mocked(copyFileSync);

/** Configure the three generated-manifest reads the script performs, in call order. */
const mockGeneratedManifests = (): void => {
  readMock
    .mockReturnValueOnce(JSON.stringify([{ name: "alert" }]))
    .mockReturnValueOnce(JSON.stringify([{ slug: "github", title: "GitHub" }]))
    .mockReturnValueOnce(
      JSON.stringify({
        customIcons: [{ name: "highspot" }],
        logos: [{ product: "canvas", items: [{ name: "canvas-horizontal-color" }] }],
      }),
    );
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

afterEach(() => {
  vi.resetModules();
});

test("buildIconManifest tags each source with its exact per-item CDN CSS URL", async () => {
  expect.hasAssertions();
  mockGeneratedManifests();
  const { buildIconManifest } = await import("./icon-manifest.ts");

  const manifest = buildIconManifest([{ name: "alert" }], [{ slug: "github", title: "GitHub" }], {
    customIcons: [{ name: "highspot" }],
    logos: [{ product: "canvas", items: [{ name: "canvas-horizontal-color" }] }],
  });

  expect(manifest.icons).toStrictEqual([
    {
      css: "https://cdn.jsdelivr.net/npm/@pantoken/components/dist/icons/alert.css",
      name: "alert",
      source: "instui",
    },
    {
      css: "https://cdn.jsdelivr.net/npm/@pantoken/plugin-simple-icons/dist/icons/github.css",
      slug: "github",
      source: "simple-icons",
      title: "GitHub",
    },
    {
      css: "https://cdn.jsdelivr.net/npm/@pantoken/plugin-custom-icons/dist/icons/highspot.css",
      name: "highspot",
      source: "custom-icons",
    },
    {
      css: "https://cdn.jsdelivr.net/npm/@pantoken/plugin-logos/dist/canvas-horizontal-color.css",
      name: "canvas-horizontal-color",
      product: "canvas",
      source: "logos",
    },
  ]);
  expect(manifest.description).toContain("never bulk-import");
});

test("importing the script reads the three generated manifests and publishes icon-manifest.json plus a refreshed component-capabilities.json", async () => {
  expect.hasAssertions();
  mockGeneratedManifests();

  await import("./icon-manifest.ts");

  expect(mkdirMock).toHaveBeenCalled();
  expect(writeMock).toHaveBeenCalledWith(
    expect.stringContaining("icon-manifest.json"),
    expect.stringContaining('"source": "instui"'),
  );
  expect(copyMock).toHaveBeenCalledWith(
    expect.stringContaining("component-capabilities.json"),
    expect.stringContaining("component-capabilities.json"),
  );
});
