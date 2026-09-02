import { expect, test } from "vite-plus/test";
import { buildManifest } from "./generate-manifest.ts";

test("buildManifest returns a sorted, non-empty list of icon slugs", async () => {
  const manifest = await buildManifest();
  expect(manifest.length).toBeGreaterThan(100);
  expect(manifest).toEqual([...manifest].sort());
  expect(manifest.every((slug) => typeof slug === "string" && slug.length > 0)).toBe(true);
});
