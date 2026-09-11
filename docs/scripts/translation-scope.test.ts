import { expect, test } from "vite-plus/test";
import { parseRequestedGuideFiles } from "./translation-scope.ts";

const FILES = ["guide/cli.md", "guide/components.md", "guide/getting-started.md"];

test("parseRequestedGuideFiles returns every guide when no scope is requested", () => {
  expect(parseRequestedGuideFiles(undefined, FILES)).toEqual(FILES);
  expect(parseRequestedGuideFiles("  ", FILES)).toEqual(FILES);
});

test("parseRequestedGuideFiles accepts comma and whitespace separated guide paths", () => {
  expect(parseRequestedGuideFiles("guide/components.md, guide/cli.md", FILES)).toEqual([
    "guide/components.md",
    "guide/cli.md",
  ]);
});

test("parseRequestedGuideFiles normalizes docs prefixes and backslashes", () => {
  expect(parseRequestedGuideFiles("docs/guide/components.md .\\guide\\cli.md", FILES)).toEqual([
    "guide/components.md",
    "guide/cli.md",
  ]);
});

test("parseRequestedGuideFiles removes duplicates while preserving request order", () => {
  expect(parseRequestedGuideFiles("guide/components.md guide/components.md", FILES)).toEqual([
    "guide/components.md",
  ]);
});

test("parseRequestedGuideFiles rejects unknown paths", () => {
  expect(() => parseRequestedGuideFiles("components.md", FILES)).toThrow(
    /Unknown DOCS_TRANSLATION_FILE value\(s\): components\.md/,
  );
});
