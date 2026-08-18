import { expect, test } from "vite-plus/test";
import {
  parseVersionsJson,
  unresolvedWorkspaceDeps,
  type ManifestDeps,
} from "./audit-workspace-protocol.ts";

test("unresolvedWorkspaceDeps: flags a workspace: range in any dependency bucket", () => {
  const manifest: ManifestDeps = {
    dependencies: { "@pantoken/utils": "workspace:*" },
    optionalDependencies: { "@pantoken/icons": "^0.2.0" },
    peerDependencies: { "@pantoken/core": "workspace:^" },
  };
  expect(unresolvedWorkspaceDeps(manifest)).toEqual([
    "@pantoken/utils@workspace:*",
    "@pantoken/core@workspace:^",
  ]);
});

test("unresolvedWorkspaceDeps: empty when every range is resolved", () => {
  const manifest: ManifestDeps = { dependencies: { "@pantoken/utils": "^0.2.5" } };
  expect(unresolvedWorkspaceDeps(manifest)).toEqual([]);
});

test("unresolvedWorkspaceDeps: also flags a catalog: range", () => {
  const manifest: ManifestDeps = { dependencies: { postcss: "catalog:", unicorn: "^1.0.0" } };
  expect(unresolvedWorkspaceDeps(manifest)).toEqual(["postcss@catalog:"]);
});

test("unresolvedWorkspaceDeps: tolerates missing dependency buckets", () => {
  expect(unresolvedWorkspaceDeps({})).toEqual([]);
});

test("parseVersionsJson: parses the array shape npm view prints for multiple versions", () => {
  expect(parseVersionsJson('["0.1.0","0.2.0"]')).toEqual(["0.1.0", "0.2.0"]);
});

test("parseVersionsJson: parses the bare string shape npm view prints for a single version", () => {
  expect(parseVersionsJson('"0.1.0"')).toEqual(["0.1.0"]);
});

test("parseVersionsJson: returns empty on invalid JSON", () => {
  expect(parseVersionsJson("not-json")).toEqual([]);
});
