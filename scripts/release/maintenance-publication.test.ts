import { expect, test } from "vite-plus/test";
import {
  validateMaintenanceManifest,
  validateMaintenanceResult,
} from "./maintenance-publication.ts";

const base = "a".repeat(40);
const proposal = "b".repeat(40);
const artifact = () => ({
  base,
  proposal,
  upgrades: [],
  accepted: [],
  failures: [],
  files: { "compatibility.json": "{}\n" },
  evidence: { "@pantoken/react": ["19.0.0"] },
});

test("accepts a bounded prepared handoff only for its immutable base and proposal", () => {
  expect(validateMaintenanceResult(artifact(), base, proposal)).toEqual(artifact());
  expect(() => validateMaintenanceResult(artifact(), "c".repeat(40), proposal)).toThrow(
    "Stale maintenance base",
  );
  expect(() => validateMaintenanceResult(artifact(), base, base)).toThrow(
    "Stale Renovate proposal",
  );
});

test("rejects unexpected executable changes, traversal, missing evidence, and file deletion", () => {
  for (const files of [
    { "scripts/release/publish-npm.ts": "bad" },
    { "../package.json": "{}" },
    { "compatibility.json": null },
    { ".github/workflows/release.yml": "bad" },
  ])
    expect(() => validateMaintenanceResult({ ...artifact(), files }, base, proposal)).toThrow();
  expect(() =>
    validateMaintenanceResult({ ...artifact(), evidence: null }, base, proposal),
  ).toThrow();
  expect(() =>
    validateMaintenanceResult(
      {
        ...artifact(),
        accepted: [{ depName: "bad", newValue: "2", manager: "npm", packageFile: "package.json" }],
      },
      base,
      proposal,
    ),
  ).toThrow("Unproposed");
});

test("permits dependency manifest updates but rejects script/version/export tampering", () => {
  const before = JSON.stringify({
    name: "example",
    version: "1.0.0",
    scripts: { build: "safe" },
    dependencies: { react: "^19" },
  });
  expect(() => validateMaintenanceManifest(before, before.replace("^19", "^20"))).not.toThrow();
  expect(() => validateMaintenanceManifest(before, before.replace("safe", "unsafe"))).toThrow(
    "cannot change",
  );
  expect(() => validateMaintenanceManifest(before, before.replace("1.0.0", "9.0.0"))).toThrow(
    "cannot change",
  );
});
