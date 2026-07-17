import { expect, test } from "vite-plus/test";
import {
  buildInitialChangelog,
  hasVersionSection,
  shouldSeedPackage,
} from "./seed-initial-package-changelogs.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

function pkg(name: string, version: string, isPrivate: boolean): WorkspacePackage {
  return {
    name,
    path: `tmp/${name}`,
    version,
    private: isPrivate,
    workspaceDeps: new Set(),
  };
}

test("buildInitialChangelog emits deterministic initial section", () => {
  const out = buildInitialChangelog("@pantoken/pantoken");

  expect(out).toContain("# CHANGELOG");
  expect(out).toContain("## 0.1.0");
  expect(out).toContain("### Added");
  expect(out).toContain("- Initial release of @pantoken/pantoken.");
});

test("hasVersionSection matches both plain and v-prefixed headings", () => {
  const content = `# CHANGELOG\n\n## 0.1.0\n\n### Added\n\n- entry\n\n## v0.2.0\n\n### Added\n\n- entry\n`;

  expect(hasVersionSection(content, "0.1.0")).toBe(true);
  expect(hasVersionSection(content, "0.2.0")).toBe(true);
  expect(hasVersionSection(content, "0.3.0")).toBe(false);
});

test("shouldSeedPackage includes all private @pantoken packages", () => {
  expect(shouldSeedPackage(pkg("@pantoken/aggregate", "0.3.0", true))).toBe(true);
});

test("shouldSeedPackage keeps public package seeding gated to 0.1.0", () => {
  expect(shouldSeedPackage(pkg("@pantoken/components", "0.1.0", false))).toBe(true);
  expect(shouldSeedPackage(pkg("@pantoken/components", "1.0.0", false))).toBe(false);
});
