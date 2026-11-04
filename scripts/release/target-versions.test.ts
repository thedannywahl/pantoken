import { expect, test } from "vite-plus/test";
import { commandTargetArgs, targetSupport, targetVersions } from "./target-versions.ts";

test("strips the vp run separator from explicit candidate arguments", () => {
  expect(commandTargetArgs(["--", "8.5.29"])).toEqual(["8.5.29"]);
  expect(commandTargetArgs(["--version", "22.2.1"])).toEqual(["--version", "22.2.1"]);
});

test("reads the verified versions from the target registry", () => {
  const support = targetSupport("@pantoken/postcss");
  expect(support.status).toBe("verified");
  if (support.status !== "verified") return;
  const versions = targetVersions("@pantoken/postcss");
  expect(versions).toEqual(support.testedVersions);
  expect(versions[0]).toBe(support.minimum);
  expect(versions.at(-1)).toBe(support.testedThrough);
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
