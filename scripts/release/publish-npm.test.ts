import { expect, test } from "vite-plus/test";
import { formatNewTag, orderedPublishablePackages, planPublish } from "./publish-npm.ts";
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

test("formatNewTag: emits the exact line the changesets action greps for", () => {
  const line = formatNewTag({ name: "@pantoken/css", version: "0.2.0" });
  expect(line).toBe("New tag: @pantoken/css@0.2.0");
  // Must satisfy the action's parser: /New tag:\s+(@[^/]+\/[^@]+|[^/]+)@([^\s]+)/
  const match = line.match(/New tag:\s+(@[^/]+\/[^@]+|[^/]+)@([^\s]+)/);
  expect(match?.[1]).toBe("@pantoken/css");
  expect(match?.[2]).toBe("0.2.0");
});
