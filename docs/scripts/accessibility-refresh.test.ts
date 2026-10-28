import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { refreshAccessibility } from "./accessibility-refresh.ts";
import { loadAccessibilitySnapshot } from "./accessibility-evidence.ts";
import snapshotJson from "../public/accessibility/results.json" with { type: "json" };

const directories: string[] = [];
afterEach(() => {
  for (const directory of directories.splice(0))
    rmSync(directory, { recursive: true, force: true });
});

function seed(): { path: string; names: string[] } {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-refresh-"));
  directories.push(directory);
  const path = join(directory, "results.json");
  const snapshot = loadAccessibilitySnapshot(snapshotJson);
  const names = Object.keys(snapshot.records).slice(0, 3);
  writeFileSync(
    path,
    JSON.stringify({
      schema: 1,
      fingerprints: Object.fromEntries(names.map((name) => [name, "same"])),
      records: Object.fromEntries(names.map((name) => [name, snapshot.records[name]])),
    }),
  );
  return { path, names };
}

test("does nothing when every fingerprint matches", () => {
  const { path, names } = seed();
  const audit = vi.fn();
  const fingerprints = Object.fromEntries(names.map((name) => [name, "same"]));
  expect(refreshAccessibility({ snapshotPath: path, fingerprints, audit })).toEqual([]);
  expect(audit).not.toHaveBeenCalled();
});

test("reports stale records without auditing in check mode", () => {
  const { path, names } = seed();
  const audit = vi.fn();
  const fingerprints = Object.fromEntries(names.map((name) => [name, "same"]));
  fingerprints[names[1]!] = "changed";
  expect(refreshAccessibility({ snapshotPath: path, fingerprints, audit, check: true })).toEqual([
    names[1],
  ]);
  expect(audit).not.toHaveBeenCalled();
  expect(JSON.parse(readFileSync(path, "utf8")).fingerprints[names[1]!]).toBe("same");
});

test("adopt stamps current fingerprints on existing evidence", () => {
  const { path, names } = seed();
  const fingerprints = Object.fromEntries(names.map((name) => [name, "fresh"]));
  refreshAccessibility({ snapshotPath: path, fingerprints, adopt: true });
  const stored = JSON.parse(readFileSync(path, "utf8")).fingerprints;
  expect(Object.values(stored)).toEqual(["fresh", "fresh", "fresh"]);
});
