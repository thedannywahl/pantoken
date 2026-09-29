import { expect, test, vi } from "vite-plus/test";

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
  // lucide-lab's generated CSS feeds no other generator here, so it must not be a bottleneck.
  expect(first).toContain("lucide-lab");
});

test("every task is scheduled exactly once", () => {
  const scheduled = batches(ASSET_TASKS).flat();
  expect(scheduled).toHaveLength(ASSET_TASKS.length);
  expect(new Set(scheduled).size).toBe(ASSET_TASKS.length);
});
