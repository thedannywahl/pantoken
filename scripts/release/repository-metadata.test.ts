import { expect, test } from "vite-plus/test";
import {
  BUGS_URL,
  ENGINES,
  expectedRepository,
  expectedSideEffects,
  HOMEPAGE_URL,
  REPOSITORY_URL,
  shipsCss,
} from "./repository-metadata.ts";

test("the canonical URL/engine constants are the values the gate enforces", () => {
  expect(REPOSITORY_URL).toBe("git+https://github.com/thedannywahl/pantoken.git");
  expect(HOMEPAGE_URL).toBe("https://pantoken.app");
  expect(BUGS_URL).toBe("https://github.com/thedannywahl/pantoken/issues");
  expect(ENGINES).toEqual({ node: ">=22.18.0" });
});

test("expectedRepository carries the git type, shared URL, and the package directory", () => {
  expect(expectedRepository("formats/css")).toEqual({
    type: "git",
    url: REPOSITORY_URL,
    directory: "formats/css",
  });
});

test("shipsCss detects a .css reference in either exports or files", () => {
  expect(shipsCss({ exports: { "./styles.css": "./styles.css" } })).toBe(true);
  expect(shipsCss({ files: ["dist", "dist/index.css"] })).toBe(true);
  // Pure JS surface — no CSS anywhere.
  expect(shipsCss({ exports: { ".": "./index.mjs" }, files: ["dist"] })).toBe(false);
  // Missing surface fields don't throw and read as pure.
  expect(shipsCss({})).toBe(false);
});

test("expectedSideEffects keeps CSS globs for CSS-shipping packages, false otherwise", () => {
  expect(expectedSideEffects({ exports: { "./x.css": "./x.css" } })).toEqual(["**/*.css"]);
  expect(expectedSideEffects({ files: ["dist"] })).toBe(false);
});
