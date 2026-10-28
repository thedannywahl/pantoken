/**
 * Keep the checked-in accessibility evidence current. Each record is fingerprinted from the inputs
 * that can change its audit result; only records whose fingerprint differs from the snapshot are
 * re-audited, and the results are merged back. When nothing changed this is a fast no-op, so it can
 * run on every docs build.
 *
 * Flags:
 *   --check   Report stale records and exit non-zero without auditing.
 *   --adopt   Stamp the current fingerprints onto the existing evidence without auditing.
 *   --all     Re-audit every record, ignoring the fingerprints.
 *
 * Env:
 *   DOCS_ACCESSIBILITY_AUDIT=skip  Leave the snapshot untouched (for builds without a browser).
 *   DOCS_ACCESSIBILITY_INSTALL_BROWSER=1  Download the audit browser when stale records need
 *                                          auditing. Set automatically on CI.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { runAsMain } from "../../scripts/release/cli.ts";
import {
  importAccessibilityRun,
  loadAccessibilitySnapshot,
  mergeAccessibilityRun,
  staleRecords,
  type AccessibilitySnapshot,
} from "./accessibility-evidence.ts";

const repositoryRoot = resolve(import.meta.dirname, "../..");
const componentsRoot = join(repositoryRoot, "formats/components");
/** The checked-in evidence the docs build reads. */
export const SNAPSHOT_PATH = join(import.meta.dirname, "../public/accessibility/results.json");

/** The current content fingerprint of every audited record. */
export function currentFingerprints(): Record<string, string> {
  const result = spawnSync(
    process.execPath,
    [join(componentsRoot, "scripts/audit-fingerprints.ts")],
    { cwd: componentsRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  );
  if (result.status !== 0) throw new Error(`Couldn't fingerprint records: ${result.stderr}`);
  return JSON.parse(result.stdout) as Record<string, string>;
}

function readSnapshot(path: string): AccessibilitySnapshot | undefined {
  return existsSync(path)
    ? loadAccessibilitySnapshot(JSON.parse(readFileSync(path, "utf8")))
    : undefined;
}

function writeSnapshot(path: string, snapshot: AccessibilitySnapshot): void {
  writeFileSync(path, JSON.stringify(snapshot, null, 2) + "\n");
  spawnSync("vp", ["fmt", "--write", path], { cwd: repositoryRoot, stdio: "ignore" });
}

/** Newest audit run directory under `a11y-report`, which the audit names by timestamp. */
function newestRun(since: string[]): string {
  const root = join(repositoryRoot, "a11y-report");
  const created = readdirSync(root)
    .filter((name) => !since.includes(name))
    .sort();
  const latest = created.at(-1);
  if (!latest) throw new Error("The accessibility audit didn't produce a run directory");
  return join(root, latest);
}

/** Options accepted by {@link refreshAccessibility}. */
export interface RefreshOptions {
  check?: boolean;
  adopt?: boolean;
  all?: boolean;
  snapshotPath?: string;
  fingerprints?: Record<string, string>;
  /** Runs the audit for the given records and returns the run directory. */
  audit?: (records: readonly string[]) => string;
}

/** Audit the stale records and merge them in; returns the names that were (or would be) re-audited. */
export function refreshAccessibility(options: RefreshOptions = {}): string[] {
  const path = options.snapshotPath ?? SNAPSHOT_PATH;
  const fingerprints = options.fingerprints ?? currentFingerprints();
  const existing = readSnapshot(path);
  if (options.adopt) {
    if (!existing) throw new Error("No existing accessibility evidence to adopt");
    const covered = Object.fromEntries(
      Object.entries(fingerprints).filter(([name]) => existing.records[name]),
    );
    writeSnapshot(path, mergeAccessibilityRun(existing, existing, covered));
    return Object.keys(covered);
  }
  const stale = options.all ? Object.keys(fingerprints) : staleRecords(existing, fingerprints);
  if (options.check || !stale.length) {
    const orphaned = Object.keys(existing?.records ?? {}).filter((name) => !fingerprints[name]);
    if (!options.check && orphaned.length) {
      writeSnapshot(
        path,
        mergeAccessibilityRun(existing, { schema: 1, records: {} }, fingerprints),
      );
    }
    return stale;
  }
  const audit = options.audit ?? runAudit;
  const run = audit(stale);
  writeSnapshot(path, mergeAccessibilityRun(existing, importAccessibilityRun(run), fingerprints));
  return stale;
}

/** Provision the audit browser on CI, or locally when asked; a no-op once it's installed. */
function provisionBrowser(): void {
  if (!process.env.CI && process.env.DOCS_ACCESSIBILITY_INSTALL_BROWSER !== "1") return;
  const manifest = createRequire(join(componentsRoot, "package.json")).resolve(
    "automatica11y/package.json",
  );
  const result = spawnSync(
    process.execPath,
    [join(dirname(manifest), "bin/automatica11y.js"), "doctor", "--install-browser"],
    { cwd: componentsRoot, stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error("Couldn't provision the accessibility audit browser");
}

function runAudit(records: readonly string[]): string {
  provisionBrowser();
  const root = join(repositoryRoot, "a11y-report");
  const before = existsSync(root) ? readdirSync(root) : [];
  const result = spawnSync(
    process.execPath,
    [
      join(componentsRoot, "scripts/audit-accessibility.ts"),
      ...records.flatMap((name) => ["--record", name]),
    ],
    { cwd: componentsRoot, stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error("The accessibility audit didn't complete");
  return newestRun(before);
}

async function main(): Promise<void> {
  if (process.env.DOCS_ACCESSIBILITY_AUDIT === "skip") {
    console.log("Accessibility audit skipped (DOCS_ACCESSIBILITY_AUDIT=skip).");
    return;
  }
  const flags = new Set(process.argv.slice(2));
  const options = {
    check: flags.has("--check"),
    adopt: flags.has("--adopt"),
    all: flags.has("--all"),
  };
  const names = refreshAccessibility(options);
  if (options.adopt) console.log(`Adopted current fingerprints for ${names.length} records.`);
  else if (!names.length) console.log("Accessibility evidence is up to date.");
  else if (options.check) {
    console.error(`Accessibility evidence is stale for: ${names.join(", ")}`);
    process.exitCode = 1;
  } else console.log(`Re-audited ${names.length} records: ${names.join(", ")}`);
}

runAsMain(import.meta.url, main);
