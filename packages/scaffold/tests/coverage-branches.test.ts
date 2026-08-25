import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";

afterEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

test("falls back to legacy templates when preset rendering throws", async () => {
  vi.doMock("bingo-stratum", () => ({
    producePreset() {
      throw new Error("boom");
    },
  }));
  vi.doMock("../generated/preset-ledger.ts", () => ({
    PRESET_LEDGER: { react: {} },
  }));
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

test("writes ArrayBuffer preset files as Buffers", async () => {
  vi.doMock("bingo-stratum", () => ({
    producePreset() {
      return {
        files: {
          "notes.txt": new TextEncoder().encode("hello").buffer,
        },
      };
    },
  }));
  vi.doMock("../generated/preset-ledger.ts", () => ({
    PRESET_LEDGER: { react: {} },
  }));
  vi.doMock("../generated/scaffolds.ts", () => ({
    SCAFFOLDS: {},
  }));

  const { scaffoldProject } = await import("../src/index.ts");
  const root = mkdtempSync(join(tmpdir(), "pantoken-scaffold-arraybuffer-"));
  const target = join(root, "my-arraybuffer-app");

  const written = await scaffoldProject("react", target);
  expect(written.some((file) => file.endsWith("notes.txt"))).toBe(true);
  expect(readFileSync(join(target, "notes.txt"), "utf8")).toBe("hello");
});
