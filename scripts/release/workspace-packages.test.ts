import { expect, test } from "vite-plus/test";
import {
  buildReverseDependencyMap,
  computeReleaseSet,
  isPublishablePackage,
  loadWorkspacePackages,
  normalizePantokenPackageName,
  parsePackageTag,
  parseRequestedPackageSpec,
  type WorkspacePackage,
} from "./workspace-packages.ts";

function pkg(name: string, deps: string[] = [], isPrivate = false): WorkspacePackage {
  return {
    name,
    path: `tmp/${name}`,
    version: "0.1.0",
    private: isPrivate,
    workspaceDeps: new Set(deps),
  };
}

test("normalizePantokenPackageName supports optional scope prefix", () => {
  expect(normalizePantokenPackageName("pantoken")).toBe("@pantoken/pantoken");
  expect(normalizePantokenPackageName("@pantoken/pantoken")).toBe("@pantoken/pantoken");
  expect(normalizePantokenPackageName("@pantokens/pantoken")).toBe("@pantoken/pantoken");
});

test("parseRequestedPackageSpec parses explicit versions and channel tokens", () => {
  expect(parseRequestedPackageSpec("pantoken@1.2.3")).toEqual({
    raw: "pantoken@1.2.3",
    packageName: "@pantoken/pantoken",
    versionOrChannel: "1.2.3",
  });

  expect(parseRequestedPackageSpec("@pantoken/pantoken@beta")).toEqual({
    raw: "@pantoken/pantoken@beta",
    packageName: "@pantoken/pantoken",
    versionOrChannel: "beta",
  });

  expect(parseRequestedPackageSpec("aggregate")).toEqual({
    raw: "aggregate",
    packageName: "@pantoken/aggregate",
  });
});

test("computeReleaseSet auto-includes @pantoken/pantoken only for non-meta targets", () => {
  const components = pkg("@pantoken/components");
  const aggregate = pkg("@pantoken/aggregate", ["@pantoken/components"]);
  const pantoken = pkg("@pantoken/pantoken", ["@pantoken/aggregate"]);

  const byName = new Map([
    [components.name, components],
    [aggregate.name, aggregate],
    [pantoken.name, pantoken],
  ]);

  const reverse = new Map<string, Set<string>>([
    ["@pantoken/components", new Set(["@pantoken/aggregate"])],
    ["@pantoken/aggregate", new Set(["@pantoken/pantoken"])],
    ["@pantoken/pantoken", new Set()],
  ]);

  expect(computeReleaseSet("@pantoken/components", byName, reverse)).toEqual([
    "@pantoken/aggregate",
    "@pantoken/components",
    "@pantoken/pantoken",
  ]);

  expect(computeReleaseSet("@pantoken/pantoken", byName, reverse)).toEqual(["@pantoken/pantoken"]);
});

test("computeReleaseSet does not auto-include @pantoken/pantoken for private targets", () => {
  const internal = pkg("@pantoken/aggregate", ["@pantoken/components"], true);
  const components = pkg("@pantoken/components");
  const pantoken = pkg("@pantoken/pantoken", ["@pantoken/aggregate"]);

  const byName = new Map([
    [internal.name, internal],
    [components.name, components],
    [pantoken.name, pantoken],
  ]);

  const reverse = new Map<string, Set<string>>([
    ["@pantoken/components", new Set(["@pantoken/aggregate"])],
    ["@pantoken/aggregate", new Set()],
    ["@pantoken/pantoken", new Set()],
  ]);

  expect(computeReleaseSet("@pantoken/aggregate", byName, reverse)).toEqual([
    "@pantoken/aggregate",
  ]);
});

test("loadWorkspacePackages includes @pantoken/docs as a private package", async () => {
  const { byName } = await loadWorkspacePackages();
  const docs = byName.get("@pantoken/docs");

  expect(docs).toBeTruthy();
  expect(docs?.path).toBe("docs");
  expect(docs?.private).toBe(true);
});

test("buildReverseDependencyMap maps each package to its dependents", () => {
  const packages = [
    pkg("@pantoken/css", ["@pantoken/core"]),
    pkg("@pantoken/scss", ["@pantoken/core"]),
    pkg("@pantoken/core"),
  ];
  const reverse = buildReverseDependencyMap(packages);

  expect([...(reverse.get("@pantoken/core") ?? [])].sort()).toEqual([
    "@pantoken/css",
    "@pantoken/scss",
  ]);
  // A leaf with no dependents still gets an (empty) entry.
  expect(reverse.get("@pantoken/css")).toEqual(new Set());
});

test("buildReverseDependencyMap seeds an entry for a dep that isn't itself a package", () => {
  // @pantoken/core is referenced as a dep but not present as a package node.
  const reverse = buildReverseDependencyMap([pkg("@pantoken/css", ["@pantoken/core"])]);
  expect(reverse.get("@pantoken/core")).toEqual(new Set(["@pantoken/css"]));
});

test("parsePackageTag parses the @name@v<version> tag scheme, else null", () => {
  expect(parsePackageTag("@pantoken/css@v0.2.0")).toEqual({
    packageName: "@pantoken/css",
    version: "0.2.0",
  });
  // The version can carry a prerelease suffix.
  expect(parsePackageTag("@pantoken/pantoken@v1.0.0-beta.1")?.version).toBe("1.0.0-beta.1");
  // The plain `@name@<version>` (no `v`) scheme doesn't match this parser.
  expect(parsePackageTag("@pantoken/css@0.2.0")).toBeNull();
  expect(parsePackageTag("not-a-tag")).toBeNull();
});

test("normalizePantokenPackageName leaves foreign scopes and empty input alone", () => {
  expect(normalizePantokenPackageName("")).toBe("");
  expect(normalizePantokenPackageName("@acme/thing")).toBe("@acme/thing");
});

test("parseRequestedPackageSpec rejects empty and dangling-@ specs", () => {
  expect(() => parseRequestedPackageSpec("   ")).toThrow(/cannot be empty/);
  expect(() => parseRequestedPackageSpec("pantoken@")).toThrow(/Invalid package spec/);
  // A leading-@ name with no version part keeps the scope and omits the version.
  expect(parseRequestedPackageSpec("@pantoken/css")).toEqual({
    raw: "@pantoken/css",
    packageName: "@pantoken/css",
  });
});

test("isPublishablePackage: nullish, private, and non-@pantoken packages are excluded", () => {
  expect(isPublishablePackage(null)).toBe(false);
  expect(isPublishablePackage(undefined)).toBe(false);
  expect(isPublishablePackage(pkg("@pantoken/css"))).toBe(true);
  expect(isPublishablePackage(pkg("@pantoken/docs", [], true))).toBe(false);
  expect(isPublishablePackage(pkg("some-tool"))).toBe(false);
});
