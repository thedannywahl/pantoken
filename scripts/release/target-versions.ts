import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

type TargetRegistry = Record<string, unknown>;

function readRegistry(): TargetRegistry {
  const registryPath = fileURLToPath(new URL("./target-compatibility.json", import.meta.url));
  return JSON.parse(readFileSync(registryPath, "utf8")) as TargetRegistry;
}

/** Return registry claims by default, or explicit candidate versions for one invocation. */
export function targetVersions(packageName: string, candidates: readonly string[] = []): string[] {
  if (candidates.length > 0) return [...candidates];
  const versions = readRegistry()[packageName] as
    | { status?: unknown; testedVersions?: unknown }
    | undefined;
  if (
    !versions ||
    versions.status !== "verified" ||
    !Array.isArray(versions.testedVersions) ||
    !versions.testedVersions.every((version): version is string => typeof version === "string")
  ) {
    throw new Error(`Target ${packageName} does not have verified release versions`);
  }
  if (versions.testedVersions.length === 0) {
    throw new Error(`Target ${packageName} has no tested release versions`);
  }
  return [...versions.testedVersions];
}

/** Read explicit command-line candidates, falling back to the registry's tested versions. */
export function commandTargetVersions(packageName: string): string[] {
  return targetVersions(packageName, process.argv.slice(2));
}

/** Return the recorded environment evidence for an environment-verified adapter. */
export function targetEnvironments(packageName: string): string[] {
  const target = readRegistry()[packageName] as
    | { status?: unknown; testedEnvironments?: unknown }
    | undefined;
  if (
    !target ||
    target.status !== "environment-verified" ||
    !Array.isArray(target.testedEnvironments) ||
    !target.testedEnvironments.every(
      (environment): environment is string => typeof environment === "string",
    )
  ) {
    throw new Error(`Target ${packageName} does not have verified environment evidence`);
  }
  return [...target.testedEnvironments];
}
