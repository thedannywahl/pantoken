import { expect, test } from "vite-plus/test";
import { targetVersions } from "./target-versions.ts";

test("reads the verified versions from the target registry", () => {
  expect(targetVersions("@pantoken/postcss")).toEqual([
    "8.0.0",
    "8.0.9",
    "8.1.14",
    "8.2.15",
    "8.3.11",
    "8.4.49",
    "8.5.28",
  ]);
});

test("uses explicit candidates without changing the registry claim", () => {
  const candidates = ["8.5.29"];
  expect(targetVersions("@pantoken/postcss", candidates)).toEqual(candidates);
  expect(targetVersions("@pantoken/postcss")).toContain("8.5.28");
});

test("rejects unverified targets", () => {
  expect(() => targetVersions("@pantoken/email")).toThrow(
    "does not have verified release versions",
  );
});
