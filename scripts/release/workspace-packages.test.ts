import { expect, test } from "vite-plus/test";
import {
  computeReleaseSet,
  normalizePantokenPackageName,
  parseRequestedPackageSpec,
  type WorkspacePackage,
} from "./workspace-packages.ts";

function pkg(name: string, deps: string[] = []): WorkspacePackage {
  return {
    name,
    path: `tmp/${name}`,
    version: "0.1.0",
    private: false,
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
