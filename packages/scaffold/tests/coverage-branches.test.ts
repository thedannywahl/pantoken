import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

test("writes generated templates with substitutions", async () => {
  vi.doMock("../generated/scaffolds.ts", () => ({
    SCAFFOLDS: {
      react: {
        "package.json": '{"name":"{{projectName}}"}',
      },
    },
  }));

  const { scaffoldProject } = await import("../src/index.ts");
  const root = mkdtempSync(join(tmpdir(), "pantoken-scaffold-fallback-"));
  const target = join(root, "my-fallback-app");

  const written = await scaffoldProject("react", target);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name":"my-fallback-app"');
});

test("filters pnpm workspace config for non-pnpm package managers", async () => {
  vi.doMock("../generated/scaffolds.ts", () => ({
    SCAFFOLDS: {
      react: {
        "package.json": '{"name":"{{projectName}}"}',
        "pnpm-workspace.yaml": "blockExoticSubdeps: false\n",
      },
    },
  }));

  const { scaffoldProject } = await import("../src/index.ts");
  const root = mkdtempSync(join(tmpdir(), "pantoken-scaffold-filter-"));
  const target = join(root, "my-filtered-app");

  const written = await scaffoldProject("react", target, { packageManager: "bun" });
  expect(written.some((file) => file.endsWith("package.json"))).toBe(true);
  expect(written.some((file) => file.endsWith("pnpm-workspace.yaml"))).toBe(false);
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, "pnpm-workspace.yaml"))).toBe(false);
});
