import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { SCAFFOLD_PLATFORMS, isScaffoldPlatform, scaffoldProject } from "../src/index.ts";

test("ships a known scaffold platform set", () => {
  expect(SCAFFOLD_PLATFORMS).toContain("components");
  expect(SCAFFOLD_PLATFORMS).toContain("react");
  expect(SCAFFOLD_PLATFORMS).toContain("vue");
  expect(SCAFFOLD_PLATFORMS).toContain("web-components");
});

test("html is accepted as an alias for components", async () => {
  expect(isScaffoldPlatform("html")).toBe(true);
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-html-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("html", target);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("scaffolds a platform with projectName substituted", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("react", target);
  expect(written.length).toBeGreaterThan(0);
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).not.toContain("{{projectName}}");
});

test("defaults to pantoken-app when dir is '.'", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-dot-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    await scaffoldProject("components", ".");
    expect(existsSync(join(dir, "package.json"))).toBe(true);
    expect(readFileSync(join(dir, "package.json"), "utf8")).toContain('"name": "pantoken-app"');
  } finally {
    process.chdir(cwd);
  }
});

test("rejects unknown platforms with a clear error", async () => {
  try {
    await scaffoldProject("invalid");
    expect(true).toBe(false); // Should have thrown
  } catch (err) {
    expect(err instanceof Error && err.message.includes("Unknown platform")).toBe(true);
  }
});
