import { expect, test } from "vite-plus/test";
import { resolvePlanInputs, resolveReleaseCollections } from "./plan-package-release.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

function pkg(name: string, isPrivate = false): WorkspacePackage {
  return {
    name,
    path: `tmp/${name}`,
    version: "0.1.0",
    private: isPrivate,
    workspaceDeps: new Set(),
  };
}

test("resolvePlanInputs keeps explicit target/version when provided", () => {
  const resolved = resolvePlanInputs({
    target: "@pantoken/pantoken",
    version: "0.1.1",
    tag: "@pantoken/pantoken@v0.1.1",
  });

  expect(resolved).toEqual({
    target: "@pantoken/pantoken",
    version: "0.1.1",
    tag: "@pantoken/pantoken@v0.1.1",
  });
});

test("resolvePlanInputs derives target/version from tag", () => {
  const resolved = resolvePlanInputs({
    target: "",
    tag: "@pantoken/pantoken@v0.1.2-beta.1",
  });

  expect(resolved).toEqual({
    target: "@pantoken/pantoken",
    version: "0.1.2-beta.1",
    tag: "@pantoken/pantoken@v0.1.2-beta.1",
  });
});

test("resolvePlanInputs rejects invalid tag format", () => {
  expect(() =>
    resolvePlanInputs({
      target: "",
      tag: "pantoken@0.1.1",
    }),
  ).toThrow('Invalid package tag "pantoken@0.1.1". Expected @pantoken/pkg@vX.Y.Z');
});

test("resolveReleaseCollections keeps private targets in release set and out of publish set", () => {
  const aggregate = pkg("@pantoken/aggregate", true);
  const pantoken = pkg("@pantoken/pantoken", false);

  const byName = new Map([
    [aggregate.name, aggregate],
    [pantoken.name, pantoken],
  ]);

  const collections = resolveReleaseCollections("@pantoken/aggregate", byName, [
    aggregate,
    pantoken,
  ]);

  expect(collections.releaseSet.map((entry) => entry.name)).toEqual(["@pantoken/aggregate"]);
  expect(collections.publishSet.map((entry) => entry.name)).toEqual([]);
});
