import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { pendingTargetReleases } from "./check-target-releases.ts";
import { targetSupport } from "./target-versions.ts";

const root = join(import.meta.dirname, "../..");
const registryPath = join(root, "scripts/release/target-compatibility.json");
const ledgerPath = join(root, "scripts/release/downstream-compatibility.json");

interface CompatibilityFailure {
  package: string;
  version: string;
  attempts: number;
  lastFailedAt: string;
  error: string;
}

function adapterPath(packageName: string): string {
  const { consumers } = JSON.parse(readFileSync(join(root, "compatibility.json"), "utf8")) as {
    consumers: Array<{ package: string; path: string }>;
  };
  const consumer = consumers.find((candidate) => candidate.package === packageName);
  if (!consumer) throw new Error(`Could not locate ${packageName} in compatibility.json`);
  return join(root, consumer.path);
}

function compareVersions(left: string, right: string): number {
  const a = left.split(".").map(Number);
  const b = right.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if ((a[index] ?? 0) !== (b[index] ?? 0)) return (a[index] ?? 0) - (b[index] ?? 0);
  }
  return 0;
}

function runCompatibility(packageName: string, version: string): void {
  const support = targetSupport(packageName);
  if (support.status !== "verified") {
    throw new Error(`${packageName} does not have a versioned compatibility check`);
  }
  const command = support.testCommand.match(/^vp run (\S+)$/u);
  if (!command) throw new Error(`Unsupported compatibility command for ${packageName}`);
  const taskPackage = command[1].split("#")[0];
  const directory = adapterPath(taskPackage);
  const packageJson = JSON.parse(readFileSync(join(directory, "package.json"), "utf8")) as {
    scripts?: Record<string, string>;
  };
  if (packageJson.scripts?.["check:compatibility"] !== "node scripts/check-compatibility.ts") {
    throw new Error(
      `${taskPackage} requires a package-level compatibility preflight; run its testCommand directly`,
    );
  }
  const result = spawnSync(process.execPath, ["scripts/check-compatibility.ts", version], {
    cwd: directory,
    stdio: "inherit",
  });
  if (result.error || result.status !== 0) {
    throw new Error(
      result.error?.message ?? `${packageName} ${version} compatibility check failed`,
    );
  }
}

function recordFailure(packageName: string, version: string, error: unknown): void {
  const failures = JSON.parse(readFileSync(ledgerPath, "utf8")) as CompatibilityFailure[];
  const message = error instanceof Error ? error.message : String(error);
  const existing = failures.find(
    (failure) => failure.package === packageName && failure.version === version,
  );
  if (existing) {
    existing.attempts += 1;
    existing.lastFailedAt = new Date().toISOString();
    existing.error = message;
  } else {
    failures.push({
      package: packageName,
      version,
      attempts: 1,
      lastFailedAt: new Date().toISOString(),
      error: message,
    });
  }
  writeFileSync(ledgerPath, `${JSON.stringify(failures, null, 2)}\n`);
}

function testCandidate(packageName: string, version: string): boolean {
  try {
    runCompatibility(packageName, version);
    return true;
  } catch (error) {
    recordFailure(packageName, version, error);
    console.error(`✗ ${packageName} ${version}: compatibility failure recorded`);
    return false;
  }
}

function bless(packageName: string, version: string): void {
  if (!/^\d+(?:\.\d+){1,2}$/u.test(version)) {
    throw new Error(`Invalid release version: ${version}`);
  }
  const support = targetSupport(packageName);
  if (support.status !== "verified") {
    throw new Error(`${packageName} does not have a blessable versioned support record`);
  }
  if (support.testedVersions.includes(version)) {
    console.log(`${packageName} ${version} is already recorded as tested`);
    return;
  }
  try {
    runCompatibility(packageName, version);
  } catch (error) {
    recordFailure(packageName, version, error);
    throw error;
  }
  if (compareVersions(version, support.testedThrough) <= 0) {
    throw new Error(
      `${packageName} ${version} is not newer than testedThrough ${support.testedThrough}`,
    );
  }
  const registry = JSON.parse(readFileSync(registryPath, "utf8")) as Record<
    string,
    { testedThrough?: string; testedVersions?: string[] }
  >;
  const entry = registry[packageName];
  if (!entry) {
    throw new Error(`Could not locate ${packageName} in target-compatibility.json`);
  }
  if (!Array.isArray(entry.testedVersions)) {
    throw new Error(`${packageName} does not define testedVersions in target-compatibility.json`);
  }

  entry.testedThrough = version;
  entry.testedVersions.push(version);

  writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`✓ Blessed ${packageName} ${version} in target-compatibility.json`);
}

async function main(): Promise<void> {
  const [action, ...args] = process.argv.slice(2);
  if (action === "test") {
    const pending = await pendingTargetReleases();
    let failures = 0;
    for (const release of pending) {
      console.log(`Testing ${release.package} ${release.version}`);
      if (!testCandidate(release.package, release.version)) failures += 1;
    }
    if (failures > 0) process.exitCode = 1;
    return;
  }
  if (action === "bless") {
    const packageIndex = args.indexOf("--package");
    const versionIndex = args.indexOf("--version");
    const packageName = packageIndex >= 0 ? args[packageIndex + 1] : undefined;
    const version = versionIndex >= 0 ? args[versionIndex + 1] : undefined;
    if (!packageName || !version) {
      throw new Error("Usage: downstream.ts bless --package @pantoken/name --version x.y.z");
    }
    bless(packageName, version);
    return;
  }
  throw new Error("Usage: downstream.ts <test|bless>");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
