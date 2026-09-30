import { expect, test, vi } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

vi.mock("../../scripts/release/cli.ts", () => ({ runAsMain: () => {} }));

const { ASSET_TASKS, assertRunnable, batches } = await import("./run-assets.ts");

test("every declared dependency resolves and the graph is acyclic", () => {
  expect(() => assertRunnable(ASSET_TASKS)).not.toThrow();
});

test("assertRunnable rejects an unknown dependency", () => {
  expect(() => assertRunnable([{ name: "a", script: "a.ts", dependsOn: ["ghost"] }])).toThrow(
    /unknown task "ghost"/u,
  );
});

test("assertRunnable rejects a cycle", () => {
  expect(() =>
    assertRunnable([
      { name: "a", script: "a.ts", dependsOn: ["b"] },
      { name: "b", script: "b.ts", dependsOn: ["a"] },
    ]),
  ).toThrow(/dependency cycle among: a, b/u);
});

test("the dependent generators land after the ones they read", () => {
  const order = batches(ASSET_TASKS);
  const batchOf = (name: string): number => order.findIndex((batch) => batch.includes(name));
  expect(batchOf("demos")).toBeGreaterThan(batchOf("site-themes"));
  expect(batchOf("icon-manifest")).toBeGreaterThan(batchOf("cdn-icon-manifest"));
  expect(batchOf("icon-manifest")).toBeGreaterThan(batchOf("cdn-plugin-manifest"));
});

test("the independent generators all release in the first batch", () => {
  const [first] = batches(ASSET_TASKS);
  expect(first).toHaveLength(ASSET_TASKS.length - 2);
  expect(first).toContain("og");
  expect(first).toContain("canvas-rce");
  expect(first).toContain("published-schemas");
  expect(first).toContain("api-catalog");
  expect(first).toContain("target-compatibility");
  // lucide-lab's generated CSS feeds no other generator here, so it must not be a bottleneck.
  expect(first).toContain("lucide-lab");
});

test("stages the source compatibility registry and schema without changing them", () => {
  const result = spawnSync(process.execPath, [
    join(import.meta.dirname, "stage-target-compatibility.ts"),
  ]);
  expect(result.status).toBe(0);
  const repoRoot = join(import.meta.dirname, "../..");
  const docsRoot = join(import.meta.dirname, "..");
  for (const [source, staged] of [
    ["target-compatibility.json", "target-compatibility.json"],
    ["target-compatibility.schema.json", "schemas/target-compatibility.schema.json"],
  ]) {
    expect(readFileSync(join(docsRoot, "public", staged))).toEqual(
      readFileSync(join(repoRoot, "scripts/release", source)),
    );
  }
});

test("stages published manifest schemas at their referenced public paths", () => {
  const result = spawnSync(process.execPath, [
    join(import.meta.dirname, "stage-published-schemas.ts"),
  ]);
  expect(result.status).toBe(0);
  const repoRoot = join(import.meta.dirname, "../..");
  const docsRoot = join(import.meta.dirname, "..");
  for (const [source, staged] of [
    [
      "formats/interactions/component-capabilities.schema.json",
      "component-capabilities.schema.json",
    ],
    ["docs/schemas/cdn-plugin-manifest.schema.json", "schemas/cdn-plugin-manifest.schema.json"],
    ["docs/schemas/icon-manifest.schema.json", "schemas/icon-manifest.schema.json"],
  ]) {
    expect(readFileSync(join(repoRoot, source))).toEqual(
      readFileSync(join(docsRoot, "public", staged)),
    );
  }
});

test("every task is scheduled exactly once", () => {
  const scheduled = batches(ASSET_TASKS).flat();
  expect(scheduled).toHaveLength(ASSET_TASKS.length);
  expect(new Set(scheduled).size).toBe(ASSET_TASKS.length);
});
