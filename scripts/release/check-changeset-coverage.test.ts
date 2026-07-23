import { expect, test } from "vite-plus/test";
import {
  packageJsonNeedsRelease,
  requiredPublishable,
  uncoveredPackages,
} from "./check-changeset-coverage.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

function pkg(name: string, relPath: string, isPrivate = false): WorkspacePackage {
  return { name, path: relPath, version: "0.1.0", private: isPrivate, workspaceDeps: new Set() };
}

const PACKAGES = [
  pkg("@pantoken/css", "formats/css"),
  pkg("@pantoken/components", "formats/components"),
  pkg("@pantoken/utils", "packages/utils"),
  pkg("@pantoken/logos", "plugins/pantoken/logos"),
  pkg("@pantoken/docs", "docs", true), // private → never requires a changeset
];

test("shipped source changes require the owning publishable package", () => {
  expect(
    requiredPublishable(
      ["formats/css/src/index.ts", "packages/utils/src/declarations.ts"],
      PACKAGES,
    ),
  ).toEqual(["@pantoken/css", "@pantoken/utils"]);
});

test("nested package wins over a root prefix", () => {
  expect(requiredPublishable(["plugins/pantoken/logos/src/index.ts"], PACKAGES)).toEqual([
    "@pantoken/logos",
  ]);
});

test("private packages (docs) never require a changeset", () => {
  expect(requiredPublishable(["docs/guide/cdn.md", "docs/src/x.ts"], PACKAGES)).toEqual([]);
});

test("non-shipped files (tests, config, markdown) don't require a changeset", () => {
  expect(
    requiredPublishable(
      [
        "formats/css/tests/to-css.test.ts",
        "formats/css/vite.config.ts",
        "formats/css/tsconfig.json",
        "formats/components/README.md",
      ],
      PACKAGES,
    ),
  ).toEqual([]);
});

test("a shipped change alongside ignored files still requires the package", () => {
  expect(
    requiredPublishable(["formats/css/src/index.ts", "formats/css/tests/x.test.ts"], PACKAGES),
  ).toEqual(["@pantoken/css"]);
});

test("packageJsonNeedsRelease: dev-only field changes don't warrant a release", () => {
  const before = {
    name: "@pantoken/css",
    version: "0.2.0",
    scripts: { build: "x", prepublishOnly: "vp run build" },
  };
  // Only `scripts` changed (prepublishOnly removed) → no release needed.
  expect(packageJsonNeedsRelease(before, { ...before, scripts: { build: "x" } })).toBe(false);
  // A devDependencies bump → no release.
  expect(
    packageJsonNeedsRelease(
      { ...before, devDependencies: { a: "1" } },
      { ...before, devDependencies: { a: "2" } },
    ),
  ).toBe(false);
  // A consumer-facing change (new export) → release needed.
  expect(packageJsonNeedsRelease(before, { ...before, exports: { "./x": "./x.js" } })).toBe(true);
  // A dependencies bump → release needed.
  expect(
    packageJsonNeedsRelease(
      { ...before, dependencies: { a: "1" } },
      { ...before, dependencies: { a: "2" } },
    ),
  ).toBe(true);
  // A brand-new manifest → release needed.
  expect(packageJsonNeedsRelease(null, before)).toBe(true);
});

test("uncoveredPackages flags required packages the changesets won't bump", () => {
  const willBump = new Set(["@pantoken/css"]);
  expect(uncoveredPackages(["@pantoken/css", "@pantoken/utils"], willBump)).toEqual([
    "@pantoken/utils",
  ]);
  expect(uncoveredPackages(["@pantoken/css"], willBump)).toEqual([]);
});
