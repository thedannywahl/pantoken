import { expect, test } from "vite-plus/test";
import {
  extractChangelogSection,
  orderedPublishablePackages,
  planPublish,
  tagFor,
} from "./publish-npm.ts";
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
    version: "0.2.0",
    private: isPrivate,
    workspaceDeps: new Set(deps),
  };
}

test("orderedPublishablePackages: dependencies come before dependents", () => {
  const packages = [
    pkg("@pantoken/components", "formats/components", [
      "@pantoken/utils",
      "@pantoken/plugin-colors",
    ]),
    pkg("@pantoken/utils", "packages/utils"),
    pkg("@pantoken/plugin-colors", "plugins/pantoken/colors", ["@pantoken/utils"]),
  ];
  const ordered = orderedPublishablePackages(packages).map((p) => p.name);

  // exact order is deterministic (name-sorted seed + name-sorted deps), but the invariant that matters:
  expect(ordered.indexOf("@pantoken/utils")).toBeLessThan(
    ordered.indexOf("@pantoken/plugin-colors"),
  );
  expect(ordered.indexOf("@pantoken/utils")).toBeLessThan(ordered.indexOf("@pantoken/components"));
  expect(ordered.indexOf("@pantoken/plugin-colors")).toBeLessThan(
    ordered.indexOf("@pantoken/components"),
  );
});

test("orderedPublishablePackages: drops private and non-@pantoken packages", () => {
  const packages = [
    pkg("@pantoken/css", "formats/css"),
    pkg("@pantoken/docs", "docs", [], true), // private
    pkg("some-tool", "tools/thing"), // not @pantoken/*
  ];
  expect(orderedPublishablePackages(packages).map((p) => p.name)).toEqual(["@pantoken/css"]);
});

test("orderedPublishablePackages: ignores dependency edges to non-publishable packages", () => {
  // A dev-only dependency on a private package must not affect (or crash) the ordering.
  const packages = [
    pkg("@pantoken/components", "formats/components", ["@pantoken/plugin-theme-custom-media"]),
    pkg("@pantoken/plugin-theme-custom-media", "plugins/pantoken/theme", [], true),
  ];
  expect(orderedPublishablePackages(packages).map((p) => p.name)).toEqual(["@pantoken/components"]);
});

test("orderedPublishablePackages: a workspace-dep cycle doesn't infinite-loop", () => {
  const packages = [
    pkg("@pantoken/a", "packages/a", ["@pantoken/b"]),
    pkg("@pantoken/b", "packages/b", ["@pantoken/a"]),
  ];
  expect(
    orderedPublishablePackages(packages)
      .map((p) => p.name)
      .sort(),
  ).toEqual(["@pantoken/a", "@pantoken/b"]);
});

test("planPublish: splits on the already-published predicate, preserving order", () => {
  const ordered = [
    pkg("@pantoken/utils", "packages/utils"),
    pkg("@pantoken/css", "formats/css"),
    pkg("@pantoken/components", "formats/components"),
  ];
  const onNpm = new Set(["@pantoken/css"]);
  const { toPublish, skipped } = planPublish(ordered, (p) => onNpm.has(p.name));

  expect(toPublish.map((p) => p.name)).toEqual(["@pantoken/utils", "@pantoken/components"]);
  expect(skipped.map((p) => p.name)).toEqual(["@pantoken/css"]);
});

test("tagFor: builds the <name>@<version> tag", () => {
  expect(tagFor({ name: "@pantoken/css", version: "0.2.0" })).toBe("@pantoken/css@0.2.0");
});

test("extractChangelogSection: returns the notes under the version heading", () => {
  const changelog = [
    "# CHANGELOG",
    "",
    "## 0.2.0",
    "",
    "### Minor Changes",
    "",
    "- abc123: add lean sheet",
    "",
    "## 0.1.0",
    "",
    "- initial release",
  ].join("\n");
  expect(extractChangelogSection(changelog, "0.2.0")).toBe(
    "### Minor Changes\n\n- abc123: add lean sheet",
  );
  expect(extractChangelogSection(changelog, "0.1.0")).toBe("- initial release");
  // A version with no section → empty string (caller falls back to a minimal note).
  expect(extractChangelogSection(changelog, "9.9.9")).toBe("");
});
