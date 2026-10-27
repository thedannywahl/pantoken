import { expect, test } from "vite-plus/test";
import {
  applySupportPolicy,
  compareReleases,
  supportCandidates,
  retireAgedSupport,
  type VerifiedSupport,
  type VersionEvidence,
} from "./support-policy.ts";

const support: VerifiedSupport = {
  target: "Example",
  status: "verified",
  minimum: "1.0.0",
  testedThrough: "3.0.0",
  testedVersions: ["1.0.0", "2.0.0", "2.1.0", "3.0.0"],
  testCommand: "vp run @pantoken/example#check:compatibility",
};
const releases = ["1.0.0", "2.1.0", "3.1.0"];
const evidence = (failed?: string, outcome: VersionEvidence["outcome"] = "incompatible") =>
  supportCandidates(support, releases).map((version) => ({
    version,
    outcome: version === failed ? outcome : ("pass" as const),
  }));

test("ages out older majors even when they previously passed", () => {
  expect(applySupportPolicy(support, releases, evidence())).toMatchObject({
    minimum: "2.0.0",
    testedThrough: "3.1.0",
    testedVersions: ["2.0.0", "2.1.0", "3.0.0", "3.1.0"],
  });
});

test("retirement preserves only already-tested releases when the new candidate fails", () => {
  expect(retireAgedSupport(support, releases)).toMatchObject({
    minimum: "2.0.0",
    testedThrough: "3.0.0",
    testedVersions: ["2.0.0", "2.1.0", "3.0.0"],
  });
  expect(() => retireAgedSupport(support, ["4.0.0", "5.0.0"])).toThrow("No verified releases");
});

test("drops the whole previous major on a compatibility failure", () => {
  expect(applySupportPolicy(support, releases, evidence("2.1.0"))).toMatchObject({
    minimum: "3.0.0",
    testedVersions: ["3.0.0", "3.1.0"],
  });
});

test("does not drop support on infrastructure failure or missing evidence", () => {
  expect(() => applySupportPolicy(support, releases, evidence("2.1.0", "infrastructure"))).toThrow(
    "Incomplete compatibility evidence",
  );
  expect(() => applySupportPolicy(support, releases, [])).toThrow("Incomplete");
});

test("does not bless a failing current major", () => {
  expect(() => applySupportPolicy(support, releases, evidence("3.1.0"))).toThrow(
    "Current major is incompatible",
  );
});

test("does not replace actual released majors with an invented intermediate major", () => {
  expect(supportCandidates(support, ["1.0.0", "3.1.0"])).toEqual(["1.0.0", "3.0.0", "3.1.0"]);
});

test("rejects prereleases, empty discovery, stale feeds, and ambiguous evidence", () => {
  expect(() => supportCandidates(support, ["4.0.0-beta.1"])).toThrow("Not a stable");
  expect(() => supportCandidates(support, [])).toThrow("no stable");
  expect(() => applySupportPolicy(support, ["1.0.0"], [])).toThrow("backwards");
  expect(() => applySupportPolicy(support, releases, [...evidence(), ...evidence()])).toThrow(
    "Duplicate evidence",
  );
});

test("supports two-part releases and never invents evidence for intervening versions", () => {
  expect(compareReleases("7.2", "7.1.2")).toBeGreaterThan(0);
  expect(compareReleases("7.2", "7.2.0")).toBe(0);
  expect(applySupportPolicy(support, releases, evidence()).testedVersions).not.toContain("2.0.1");
});
