import { afterEach, expect, test, vi } from "vite-plus/test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { formatAggregateMessage, runAggregate } from "./aggregate.ts";

afterEach(() => vi.restoreAllMocks());

/** Stand up a throwaway meta package whose deps resolve to fixture packages with `pantoken` fields. */
function scaffoldMetaPackage(): string {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-meta-"));
  const write = (rel: string, data: unknown) => {
    const path = join(dir, rel);
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, typeof data === "string" ? data : JSON.stringify(data));
  };
  const fixture = (name: string, key: string, kind: string) =>
    write(`node_modules/${name}/package.json`, { name, pantoken: { key, kind } });

  fixture("@fixture/one", "one", "namespace");
  fixture("@fixture/two", "two", "sideEffect");
  fixture("@fixture/three", "three", "subpath");
  // A dependency without a `pantoken` field is ignored.
  write("node_modules/@fixture/plain/package.json", { name: "@fixture/plain" });

  write("package.json", {
    name: "pantoken",
    dependencies: {
      "@fixture/one": "*",
      "@fixture/two": "*",
      "@fixture/three": "*",
      "@fixture/plain": "*",
      // A dep that doesn't resolve at all — swallowed by discoverTargets' try/catch.
      "@fixture/missing": "*",
    },
  });
  // A stale generated file so clearGenerated has something to blank out.
  write("src/stale.ts", "export const stale = 1;\n");
  return dir;
}

test("formatAggregateMessage joins keys deterministically", () => {
  expect(formatAggregateMessage(["aggregate", "pantoken"])).toBe(
    "pantoken meta: aggregated aggregate, pantoken",
  );
});

test("formatAggregateMessage handles empty target list", () => {
  expect(formatAggregateMessage([])).toBe("pantoken meta: aggregated ");
});

test("runAggregate aggregates the discovered targets, logs a summary, and returns them", () => {
  const dir = scaffoldMetaPackage();
  const log = vi.spyOn(console, "log").mockImplementation(() => {});
  try {
    const { targets, message } = runAggregate(dir);
    // Sorted by key; the field-less and unresolvable deps are dropped.
    expect(targets.map((t) => t.key)).toEqual(["one", "three", "two"]);
    expect(message).toBe("pantoken meta: aggregated one, three, two");
    expect(log).toHaveBeenCalledWith(message);

    // The barrel namespace-exports non-subpath targets and omits the subpath-only one.
    const barrel = readFileSync(join(dir, "src/index.ts"), "utf8");
    expect(barrel).toContain('export * as one from "@fixture/one";');
    expect(barrel).toContain('export * as two from "@fixture/two";');
    expect(barrel).not.toContain("@fixture/three");

    // The sideEffect subpath pulls in the package's /inject entry.
    expect(readFileSync(join(dir, "src/two.ts"), "utf8")).toContain(
      'import "@fixture/two/inject";',
    );
    // The exports map is rewritten with a subpath per target.
    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    expect(pkg.exports["./three"]).toBe("./dist/three.mjs");
    // Static JSON exports are always present for VS Code custom-data consumers.
    expect(pkg.exports["./html-custom-data.json"]).toBe("./dist/html-custom-data.json");
    expect(pkg.exports["./css-custom-data.json"]).toBe("./dist/css-custom-data.json");
    expect(pkg.exports["./model.json"]).toBe("./dist/model.json");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
