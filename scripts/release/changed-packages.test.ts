import { expect, test } from "vite-plus/test";
import { resolveChangedPackages } from "./changed-packages.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

function pkg(
  name: string,
  relPath: string,
  deps: string[] = [],
  isPrivate = false,
): WorkspacePackage {
  return {
    name,
    path: relPath,
    version: "0.1.0",
    private: isPrivate,
    workspaceDeps: new Set(deps),
  };
}

const PACKAGES = [
  pkg("@pantoken/css", "formats/css", ["@pantoken/core"]),
  pkg("@pantoken/core", "packages/core"),
  pkg("@pantoken/docs", "docs", ["@pantoken/css"], true),
  pkg("@pantoken/plugin-logos", "plugins/pantoken/logos"),
];

test("a global config change widens the scope to the whole publishable set", () => {
  expect(resolveChangedPackages(["package.json"], PACKAGES)).toEqual({
    scope: "all",
    packages: [],
  });
  expect(resolveChangedPackages(["pnpm-lock.yaml"], PACKAGES).scope).toBe("all");
});

test("changes touching no publishable package skip the gate", () => {
  // docs is private; tooling/CI files own no package.
  expect(resolveChangedPackages(["docs/guide/x.md", ".github/workflows/ci.yml"], PACKAGES)).toEqual(
    {
      scope: "none",
      packages: [],
    },
  );
});

test("a changed package expands to its publishable dependents", () => {
  // core changed → core + its dependent css; both publishable.
  const result = resolveChangedPackages(["packages/core/src/index.ts"], PACKAGES);
  expect(result.scope).toBe("subset");
  expect(result.packages).toEqual(["@pantoken/core", "@pantoken/css"]);
});

test("nested package paths win over a shorter prefix", () => {
  const result = resolveChangedPackages(["plugins/pantoken/logos/src/index.ts"], PACKAGES);
  expect(result).toEqual({ scope: "subset", packages: ["@pantoken/plugin-logos"] });
});
