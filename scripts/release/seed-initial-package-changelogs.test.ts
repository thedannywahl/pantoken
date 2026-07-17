import { expect, test } from "vite-plus/test";
import { buildInitialChangelog, hasVersionSection } from "./seed-initial-package-changelogs.ts";

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
