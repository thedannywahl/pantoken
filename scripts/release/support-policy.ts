import type { TargetSupport } from "./compatibility.ts";

/** Versioned support evidence recorded by an adapter. */
export type VerifiedSupport = Extract<TargetSupport, { status: "verified" }>;

/** An explicit check result; infrastructure errors never justify dropping support. */
export interface VersionEvidence {
  version: string;
  outcome: "pass" | "incompatible" | "infrastructure";
}

/** Numeric stable releases supported by the versioned adapter runners. */
export function releaseSegments(version: string): number[] {
  if (!/^\d+\.\d+(?:\.\d+)?$/u.test(version)) {
    throw new Error(`Not a stable numeric release: ${version}`);
  }
  return version.split(".").map(Number);
}

/** Compare stable releases, accepting two-part versions such as WordPress 7.2. */
export function compareReleases(left: string, right: string): number {
  const leftParts = releaseSegments(left);
  const rightParts = releaseSegments(right);
  for (let index = 0; index < 3; index += 1) {
    const difference = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (difference) return difference;
  }
  return 0;
}

/** Select recorded and candidate checks inside the latest two released major trains. */
export function supportCandidates(support: VerifiedSupport, releases: readonly string[]): string[] {
  if (!releases.length) throw new Error("Release discovery returned no stable versions");
  const stable = [...new Set(releases)].sort(compareReleases);
  const majors = [...new Set(stable.map((version) => releaseSegments(version)[0]))];
  const retained = new Set(majors.slice(-2));
  return [...new Set([...support.testedVersions, ...stable])]
    .filter((version) => retained.has(releaseSegments(version)[0]))
    .sort(compareReleases);
}

/** Apply a two-major support window only after all retained checks have explicit outcomes. */
export function retireAgedSupport(
  support: VerifiedSupport,
  releases: readonly string[],
): VerifiedSupport {
  const allowed = new Set(supportCandidates(support, releases));
  const testedVersions = support.testedVersions
    .filter((version) => allowed.has(version))
    .sort(compareReleases);
  if (!testedVersions.length)
    throw new Error("No verified releases remain inside the current support window");
  return {
    ...support,
    minimum: testedVersions[0],
    testedThrough: testedVersions.at(-1)!,
    testedVersions,
  };
}

/** Apply a two-major support window only after all retained checks have explicit outcomes. */
export function applySupportPolicy(
  support: VerifiedSupport,
  releases: readonly string[],
  evidence: readonly VersionEvidence[],
): VerifiedSupport {
  const candidates = supportCandidates(support, releases);
  const latest = [...releases].sort(compareReleases).at(-1)!;
  if (compareReleases(latest, support.testedThrough) < 0) {
    throw new Error("Release discovery cannot move testedThrough backwards");
  }
  const outcomes = new Map<string, VersionEvidence["outcome"]>();
  for (const result of evidence) {
    if (outcomes.has(result.version)) throw new Error(`Duplicate evidence: ${result.version}`);
    outcomes.set(result.version, result.outcome);
  }
  const failedMajors = new Set<number>();
  for (const version of candidates) {
    const outcome = outcomes.get(version);
    if (!outcome || outcome === "infrastructure") {
      throw new Error(`Incomplete compatibility evidence for ${version}`);
    }
    if (outcome === "incompatible") failedMajors.add(releaseSegments(version)[0]);
  }
  if (failedMajors.has(releaseSegments(latest)[0])) {
    throw new Error(`Current major is incompatible: ${latest}`);
  }
  const testedVersions = candidates.filter(
    (version) => !failedMajors.has(releaseSegments(version)[0]),
  );
  return {
    ...support,
    minimum: testedVersions[0],
    testedThrough: latest,
    testedVersions,
  };
}
