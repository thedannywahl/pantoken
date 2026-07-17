import { expect, test } from "vite-plus/test";
import { extractVersionSection, stripTopVersionHeading } from "./build-root-changelog.ts";

const SAMPLE_CHANGELOG = `# CHANGELOG

## 0.1.2

### Changed

- Updated internal workspace dependency versions.

## 0.1.1

### Changed

- Updated internal workspace dependency versions.
`;

test("extractVersionSection returns a single version block", () => {
  const section = extractVersionSection(SAMPLE_CHANGELOG, "0.1.2");

  expect(section).toBe(`## 0.1.2

### Changed

- Updated internal workspace dependency versions.`);
});

test("extractVersionSection supports v-prefixed headings", () => {
  const section = extractVersionSection("## v0.2.0\n\n### Added\n\n- item\n", "0.2.0");

  expect(section).toBe("## v0.2.0\n\n### Added\n\n- item");
});

test("stripTopVersionHeading removes only the leading version heading", () => {
  const section = `## 0.1.2\n\n### Changed\n\n- Updated internal workspace dependency versions.`;

  expect(stripTopVersionHeading(section, "0.1.2")).toBe(
    "### Changed\n\n- Updated internal workspace dependency versions.",
  );
});

test("extractVersionSection returns null when version does not exist", () => {
  expect(extractVersionSection(SAMPLE_CHANGELOG, "9.9.9")).toBeNull();
});
