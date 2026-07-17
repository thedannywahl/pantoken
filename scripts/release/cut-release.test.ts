import { mkdirSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import {
  DEFAULT_CHANGELOG_LINE,
  buildDependencyChangelogLine,
  bumpPatch,
  collectWorkspaceDependencyVersionChanges,
  ensureNoNestedVpRun,
  parseCliArgs,
  resolveRequestedVersions,
  withPreRelease,
  writePackageChangelog,
} from "./cut-release.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

function pkg(name: string, version = "0.1.0"): WorkspacePackage {
  return {
    name,
    path: `tmp/${name.replace("@", "").replace("/", "-")}`,
    version,
    private: false,
    workspaceDeps: new Set(),
  };
}

test("parseCliArgs accepts package-flag mode and force/channel flags", () => {
  expect(parseCliArgs(["-p", "pantoken@1.0.0", "-p", "aggregate@0.1.1", "--beta", "-f"])).toEqual({
    help: false,
    force: true,
    channel: "beta",
    packageSpecs: ["pantoken@1.0.0", "aggregate@0.1.1"],
  });
});

test("parseCliArgs rejects mixed package modes", () => {
  expect(() => parseCliArgs(["-p", "pantoken@1.0.0", "aggregate@0.1.1"])).toThrow(
    "Do not mix -p/--package with positional package specs.",
  );
});

test("ensureNoNestedVpRun allows top-level shell execution", () => {
  expect(() => ensureNoNestedVpRun({})).not.toThrow();
});

test("ensureNoNestedVpRun rejects nested vp-run context", () => {
  expect(() => ensureNoNestedVpRun({ VP_CLI_BIN: "/Users/me/.vite-plus/bin/vp" })).toThrow(
    "Refusing to run release inside a vp-managed process.",
  );
});

test("bump helpers apply patch and prerelease .1 numbering", () => {
  expect(bumpPatch("0.1.0")).toBe("0.1.1");
  expect(withPreRelease("1.0.0", "beta")).toBe("1.0.0-beta.1");
});

test("resolveRequestedVersions supports explicit version with prerelease flag", async () => {
  const pantoken = pkg("@pantoken/pantoken", "0.1.0");
  const byName = new Map([[pantoken.name, pantoken]]);

  const resolved = await resolveRequestedVersions(["pantoken@1.0.0"], byName, "beta");
  expect(resolved).toEqual([
    {
      packageName: "@pantoken/pantoken",
      version: "1.0.0-beta.1",
      source: "explicit",
    },
  ]);
});

test("resolveRequestedVersions increments channel token from dist-tags", async () => {
  const pantoken = pkg("@pantoken/pantoken", "0.1.0");
  const byName = new Map([[pantoken.name, pantoken]]);

  const resolved = await resolveRequestedVersions(
    ["pantoken@beta"],
    byName,
    undefined,
    async () => ({ beta: "0.1.1-beta.1" }),
  );

  expect(resolved).toEqual([
    {
      packageName: "@pantoken/pantoken",
      version: "0.1.1-beta.2",
      source: "channel",
    },
  ]);
});

test("resolveRequestedVersions starts channel at patch+channel.1 when dist-tag is absent", async () => {
  const pantoken = pkg("@pantoken/pantoken", "0.1.0");
  const byName = new Map([[pantoken.name, pantoken]]);

  const resolved = await resolveRequestedVersions(
    ["pantoken@beta"],
    byName,
    undefined,
    async () => ({}),
  );

  expect(resolved).toEqual([
    {
      packageName: "@pantoken/pantoken",
      version: "0.1.1-beta.1",
      source: "channel",
    },
  ]);
});

test("writePackageChangelog prepends deterministic Changed section once", async () => {
  const rootDir = mkdtempSync(join(tmpdir(), "pantoken-release-"));
  const packagePath = "pkg/pantoken";
  mkdirSync(join(rootDir, packagePath), { recursive: true });

  const pantoken: WorkspacePackage = {
    name: "@pantoken/pantoken",
    path: packagePath,
    version: "0.1.1",
    private: false,
    workspaceDeps: new Set(),
  };

  await writePackageChangelog(rootDir, pantoken, "0.1.1");
  await writePackageChangelog(rootDir, pantoken, "0.1.1");

  const out = readFileSync(join(rootDir, packagePath, "CHANGELOG.md"), "utf8");
  expect(out).toContain("## 0.1.1");
  expect(out).toContain(`- ${DEFAULT_CHANGELOG_LINE}`);
  expect(out.split("## 0.1.1").length - 1).toBe(1);
});

test("collectWorkspaceDependencyVersionChanges detects bumped workspace deps", () => {
  const android: WorkspacePackage = {
    name: "@pantoken/android",
    path: "platforms/android",
    version: "0.1.1",
    private: false,
    workspaceDeps: new Set(["@pantoken/core", "@pantoken/sd-config", "@pantoken/tokens"]),
  };

  const previous = new Map<string, WorkspacePackage>([
    [android.name, { ...android, version: "0.1.0" }],
    ["@pantoken/core", pkg("@pantoken/core", "0.1.0")],
    ["@pantoken/sd-config", { ...pkg("@pantoken/sd-config", "0.1.0"), private: true }],
    ["@pantoken/tokens", pkg("@pantoken/tokens", "0.1.0")],
  ]);

  const next = new Map<string, WorkspacePackage>([
    [android.name, android],
    ["@pantoken/core", pkg("@pantoken/core", "0.1.0")],
    ["@pantoken/sd-config", { ...pkg("@pantoken/sd-config", "0.1.1"), private: true }],
    ["@pantoken/tokens", pkg("@pantoken/tokens", "0.1.0")],
  ]);

  expect(collectWorkspaceDependencyVersionChanges(android, previous, next)).toEqual([
    {
      name: "@pantoken/sd-config",
      from: "0.1.0",
      to: "0.1.1",
    },
  ]);
});

test("buildDependencyChangelogLine formats detailed dependency versions", () => {
  expect(
    buildDependencyChangelogLine([
      {
        name: "@pantoken/sd-config",
        from: "0.1.0",
        to: "0.1.1",
      },
      {
        name: "@pantoken/tokens",
        from: "0.1.0",
        to: "0.1.1",
      },
    ]),
  ).toBe(
    "Updated internal workspace dependencies:\n  - @pantoken/sd-config: 0.1.0 -> 0.1.1\n  - @pantoken/tokens: 0.1.0 -> 0.1.1",
  );

  expect(buildDependencyChangelogLine([])).toBe(DEFAULT_CHANGELOG_LINE);
});
