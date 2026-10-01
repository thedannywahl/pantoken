import { Ajv2020 } from "ajv/dist/2020.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import schema from "../schemas/cdn-plugin-manifest.schema.json" with { type: "json" };

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
  expect(manifest.$schema).toBe("https://pantoken.app/schemas/cdn-plugin-manifest.schema.json");
  const validate = new Ajv2020({ strict: false, validateFormats: false }).compile(schema);
  expect(validate(manifest), JSON.stringify(validate.errors)).toBe(true);
  expect(manifest.customComponents).toContainEqual({ name: "card" });
  expect(manifest.layouts).toContainEqual({ name: "hero" });
  expect(manifest.otherPlugins).toContainEqual(expect.objectContaining({ key: "theme-colors" }));
  expect(manifest.simpleIcons.pkg).toBe("@pantoken/plugin-simple-icons");
});
