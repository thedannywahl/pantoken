import { expect, test } from "vite-plus/test";
import {
  computeReleaseSet,
  loadWorkspacePackages,
  normalizePantokenPackageName,
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
