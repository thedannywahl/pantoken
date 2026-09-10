import { expect, test } from "vite-plus/test";
import { referencesForChangedCatalogEntries, resolveChangedDocs } from "./changed-pages.ts";

const LOCALES = ["hu", "fr"];

test("guide markdown changes expand to every locale guide page", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "docs/guide/getting-started.md" }], {
      locales: LOCALES,
    }),
  ).toEqual({
    scope: "subset",
    pages: [
      "fr/guide/getting-started.md",
      "guide/getting-started.md",
      "hu/guide/getting-started.md",
    ],
    surfaces: ["docs.guides"],
  });
});

test("home page changes expand to every locale home page", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "docs/index.md" }], { locales: LOCALES }),
  ).toEqual({
    scope: "subset",
    pages: ["fr/index.md", "hu/index.md", "index.md"],
    surfaces: ["docs.home"],
  });
});

test("api markdown changes expand to every locale api page", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "docs/api/classes/Button.md" }], {
      locales: LOCALES,
    }),
  ).toEqual({
    scope: "subset",
    pages: ["api/classes/Button.md", "fr/api/classes/Button.md", "hu/api/classes/Button.md"],
    surfaces: ["docs.api"],
  });
});

test("changes outside docs and l10n skip docs deploy work", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "packages/core/src/index.ts" }], { locales: LOCALES }),
  ).toEqual({ scope: "none", pages: [], surfaces: [] });
});

test("global docs inputs widen to a full build", () => {
  const result = resolveChangedDocs([{ status: "M", path: "docs/.vitepress/config.ts" }], {
    locales: LOCALES,
  });
  expect(result.scope).toBe("all");
  expect(result.fallbackReason).toContain("shared docs output");
});

test("deletions widen to a full build", () => {
  const result = resolveChangedDocs([{ status: "D", path: "docs/guide/cli.md" }], {
    locales: LOCALES,
  });
  expect(result.scope).toBe("all");
  expect(result.fallbackReason).toContain("deleted");
});

test("catalog changes without a comparison base widen to a full build", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "l10n/docs.api.pot" }], {
      repoRoot: "/missing-repository",
      locales: LOCALES,
    }),
  ).toEqual({
    scope: "all",
    pages: [],
    surfaces: [],
    fallbackReason: "Unable to compare l10n/docs.api.pot; running full docs build.",
  });
});

test("unclassified docs changes widen to a full build", () => {
  expect(
    resolveChangedDocs([{ status: "M", path: "docs/README.md" }], { locales: LOCALES }),
  ).toEqual({
    scope: "all",
    pages: [],
    surfaces: [],
    fallbackReason: "docs/README.md is not page-scoped yet.",
  });
});

test("changed catalog entries return their referenced source pages", () => {
  const before = [
    "#: api/classes/Button.md:4",
    'msgctxt "docs.api:prose"',
    'msgid "Old description"',
    'msgstr ""',
    "",
  ].join("\n");
  const after = [
    "#: api/classes/Button.md:4",
    'msgctxt "docs.api:prose"',
    'msgid "New description"',
    'msgstr ""',
    "",
  ].join("\n");

  expect(referencesForChangedCatalogEntries(before, after)).toEqual(["api/classes/Button.md"]);
});

test("catalog reference movement counts as a changed source page", () => {
  const before = [
    "#: guide/cli.md:3",
    'msgid "Install the package"',
    'msgstr "Telepitsd a csomagot"',
    "",
  ].join("\n");
  const after = [
    "#: guide/getting-started.md:8",
    'msgid "Install the package"',
    'msgstr "Telepitsd a csomagot"',
    "",
  ].join("\n");

  expect(referencesForChangedCatalogEntries(before, after)).toEqual(["guide/getting-started.md"]);
});
