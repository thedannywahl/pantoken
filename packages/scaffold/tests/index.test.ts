import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { SCAFFOLD_PLATFORMS, scaffoldProject } from "../src/index.ts";

test("ships a known scaffold platform set", () => {
  expect(SCAFFOLD_PLATFORMS).toContain("web");
  expect(SCAFFOLD_PLATFORMS).toContain("react");
  expect(SCAFFOLD_PLATFORMS).toContain("next");
});

test("scaffolds a platform with projectName substituted", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-"));
  const target = join(dir, "my-app");
  const written = scaffoldProject("react", target);
  expect(written.length).toBeGreaterThan(0);
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).not.toContain("{{projectName}}");
});

test("defaults to pantoken-app when dir is '.'", () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-dot-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    scaffoldProject("web", ".");
    expect(existsSync(join(dir, "package.json"))).toBe(true);
    expect(readFileSync(join(dir, "package.json"), "utf8")).toContain('"name": "pantoken-app"');
  } finally {
    process.chdir(cwd);
  }
});

test("rejects unknown platforms with a clear error", () => {
  expect(() => scaffoldProject("invalid")).toThrow(/Unknown platform/);
});
