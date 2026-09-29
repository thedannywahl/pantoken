import { expect, test } from "vite-plus/test";
import { withCompatibility } from "./write-api-compatibility.ts";
import { collectUnits, segmentMarkdown } from "./segment-markdown.ts";
import type { ConsumerEntry } from "../../scripts/release/compatibility.ts";

const consumer: ConsumerEntry = {
  package: "@pantoken/wordpress",
  path: "platforms/wordpress",
  governedBy: "token-ir",
  targetSupport: {
    target: "WordPress block themes",
    format: "theme.json v3",
    status: "unverified",
  },
};

test("shows the current format without asserting an unverified WordPress version", () => {
  const page = withCompatibility(
    "[Home](../../index.md)\n\n# wordpress\n\n## Functions\n",
    consumer,
  );
  expect(page).toContain("## Compatibility\n\nTarget: WordPress block themes.");
  expect(page).toContain("Current format: `theme.json v3`.");
  expect(page).toContain("Host compatibility has not yet been verified.");
  expect(page).toContain("[Full compatibility matrix](../../../../compatibility)");
});

test("verified claims identify the minimum and latest tested host release", () => {
  const page = withCompatibility("# wordpress\n", {
    ...consumer,
    targetSupport: {
      target: "WordPress block themes",
      format: "theme.json v3",
      status: "verified",
      minimum: "6.6",
      testedThrough: "6.8",
      testedVersions: ["6.6", "6.7", "6.8"],
      testCommand: "vp test",
    },
  });
  expect(page).toContain("Minimum host version: `6.6`. Tested through `6.8`.");
  expect(page).toContain("Newer releases require review.");
  const units = collectUnits(segmentMarkdown(page));
  expect(
    units.some((unit) => unit.kind === "glossary" && unit.text.includes("Compatibility")),
  ).toBe(true);
  expect(
    units.some((unit) => unit.kind === "prose" && unit.text.includes("Minimum host version")),
  ).toBe(true);
});
