import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { scaffoldProject } from "../src/index.ts";

test("canvas theme editor synchronizes browser metadata with its active theme", async () => {
  const target = join(mkdtempSync(join(tmpdir(), "pantoken-scaffold-pwa-")), "app");
  await scaffoldProject("canvas-theme-editor", target);
  const main = readFileSync(join(target, "src/main.ts"), "utf8");

  expect(main).toContain(
    "document.querySelector<HTMLMetaElement>('meta[name=\"application-name\"]')",
  );
  expect(main).toContain("document.querySelector<HTMLMetaElement>('meta[name=\"theme-color\"]')");
  expect(main).toContain("getComputedStyle(document.documentElement).backgroundColor");
  expect(main).toContain('link[rel="icon"][data-pantoken-themed-icon]');
  expect(main).toContain("PANTOKEN_ICON,");
  expect(main).toContain('getPropertyValue("--instui-primitive-color-navy-navy100")');
  expect(main.match(/syncBrowserMetadata\(\);/g)).toHaveLength(2);
});
