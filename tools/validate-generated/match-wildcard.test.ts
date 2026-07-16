import { describe, expect, test } from "vite-plus/test";
import { matchWildcardFiles } from "./match-wildcard.ts";

describe("matchWildcardFiles", () => {
  const files = ["base.css", "components.css", "billboard.css", "index.mjs", "nested/icon.css"];

  test("matches broad css wildcard patterns", () => {
    const matches = matchWildcardFiles(files, "*.css");
    expect(matches).toEqual(["base.css", "components.css", "billboard.css", "nested/icon.css"]);
  });

  test("matches prefix/suffix constrained wildcard patterns", () => {
    const matches = matchWildcardFiles(files, "b*.css");
    expect(matches).toEqual(["base.css", "billboard.css"]);
  });

  test("returns empty when no paths satisfy pattern", () => {
    const matches = matchWildcardFiles(files, "theme-*.css");
    expect(matches).toEqual([]);
  });
});
