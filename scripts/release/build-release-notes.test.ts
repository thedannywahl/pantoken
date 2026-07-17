import { expect, test } from "vite-plus/test";
import { extractVersionSection } from "./build-release-notes.ts";

const CHANGELOG = `# CHANGELOG

## 0.1.2

### Changed

- Updated internal workspace dependency versions.

## v0.1.1

### Added

- Initial release of @pantoken/pantoken.
`;

test("extractVersionSection returns exact section for plain version headings", () => {
  expect(extractVersionSection(CHANGELOG, "0.1.2")).toBe(
    "## 0.1.2\n\n### Changed\n\n- Updated internal workspace dependency versions.",
  );
});

test("extractVersionSection supports v-prefixed headings", () => {
  expect(extractVersionSection(CHANGELOG, "0.1.1")).toBe(
    "## v0.1.1\n\n### Added\n\n- Initial release of @pantoken/pantoken.",
  );
});

test("extractVersionSection returns null for unknown version", () => {
  expect(extractVersionSection(CHANGELOG, "9.9.9")).toBeNull();
});
