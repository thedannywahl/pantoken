import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";

test("publishes the plugin manifest for both the docs UI and external agents", async () => {
  await import("./cdn-plugin-manifest.ts");
  const docsManifest = readFileSync(
    resolve(import.meta.dirname, "../.vitepress/theme/generated/cdn-plugin-manifest.json"),
    "utf8",
  );
  const publicManifest = readFileSync(
    resolve(import.meta.dirname, "../public/cdn-plugin-manifest.json"),
    "utf8",
  );
  expect(publicManifest).toBe(docsManifest);
  const manifest = JSON.parse(publicManifest);
  expect(manifest.customComponents).toContainEqual({ name: "card" });
  expect(manifest.layouts).toContainEqual({ name: "hero" });
  expect(manifest.otherPlugins).toContainEqual(expect.objectContaining({ key: "theme-colors" }));
  expect(manifest.simpleIcons.pkg).toBe("@pantoken/plugin-simple-icons");
});
