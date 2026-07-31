/**
 * The Snyk Code (SAST) gate. Snyk has no GitHub App wired to this repo, so CI can't run it — this
 * script is the enforcement point, run locally from the `pre-push` hook (and on demand via
 * `vp run security:code`).
 *
 * Policy: **block on a medium-or-worse finding; warn (don't block) on low or informational.** Snyk
 * Code emits SARIF whose result `level` maps from its severity — `error` = high, `warning` = medium,
 * `note`/`none` = low/informational — so we scan down to `low`, parse the levels, and decide.
 *
 * Snyk can't authenticate on every machine (a contributor may never have run `snyk auth`), so the
 * gate fails *closed only on real findings*: it blocks on medium+, warns on low, passes when clean or
 * when there's nothing to scan, and warns-then-skips on an auth/network/config error so a contributor
 * without a Snyk account isn't bricked. The maintainer's authenticated push still gates.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);
const require = createRequire(import.meta.url);

/** A single result entry from Snyk's SARIF output. */
export interface SarifResult {
  ruleId?: string;
  level?: string;
  message?: { text?: string };
  locations?: {
    physicalLocation?: { artifactLocation?: { uri?: string }; region?: { startLine?: number } };
  }[];
}

/**
 * Findings accepted as false positives, matched by rule id + file path. A match is downgraded to a
 * warning instead of blocking. Snyk's own ignore flow (inline `deepcode ignore`, `.snyk`) needs a
 * git remote it can detect, which isn't available in a git worktree where the pre-push gate runs — so
 * acceptances live here, in-repo and reviewable, and work in every environment.
 */
const ACCEPTED: { rule: string; path: string; reason: string }[] = [];

/** A finding's location as `path:line`, or `?` when absent. */
export function locationOf(result: SarifResult): string {
  const loc = (result.locations ?? []).find((l) => l.physicalLocation?.artifactLocation?.uri);
  const phys = loc?.physicalLocation;
  return phys ? `${phys.artifactLocation?.uri}:${phys.region?.startLine ?? "?"}` : "?";
}

/**
 * Resolve and run the Snyk CLI, returning the raw result.
 * @internal Exported for testing only.
 */
export function runSnykScan(): ReturnType<typeof spawnSync> {
  // snyk ships a CLI only — the package has no programmatic API (no `main`/`exports`) — but its bin is a
  // plain node script. Resolve it through the package graph and run it with the current node, so we
  // don't depend on the node_modules/.bin symlink or snyk being on PATH. If the package isn't installed
  // at all, skip the gate rather than block the push.
  let snykCli: string;
  try {
    snykCli = require.resolve("snyk/bin/snyk");
  } catch {
    console.warn("⚠ snyk package not installed — skipping SAST gate");
    process.exit(0);
  }

  // Scan down to low so low/informational findings are visible; severity is decided from the SARIF.
  return spawnSync(
    process.execPath,
    [snykCli, "code", "test", "--sarif", "--severity-threshold=low"],
    { encoding: "utf8", cwd: ROOT, maxBuffer: 64 * 1024 * 1024 },
  );
}

/**
 * Parse SARIF output from Snyk CLI.
 * @internal Exported for testing only.
 */
export function parseSarifOutput(stdout: string): SarifResult[] {
  try {
    const sarif = JSON.parse(stdout) as { runs?: { results?: SarifResult[] }[] };
    return (sarif.runs ?? []).flatMap((run) => run.results ?? []);
  } catch {
    throw new Error("Failed to parse SARIF output");
  }
}

/** Whether a finding is on the accepted-false-positive allowlist. */
export function isAccepted(result: SarifResult): boolean {
  const filePath = locationOf(result).split(":")[0];
  return ACCEPTED.some((a) => a.rule === result.ruleId && a.path === filePath);
}

/** Whether a finding is medium severity or worse (blocking). */
export function isMediumPlus(result: SarifResult): boolean {
  return result.level === "error" || result.level === "warning";
}

/** Process and categorize SARIF results into blocking and advisory findings. */
export function processResults(results: SarifResult[]): {
  blocking: SarifResult[];
  advisory: SarifResult[];
} {
  const blocking = results.filter((r) => isMediumPlus(r) && !isAccepted(r));
  const advisory = results.filter((r) => !isMediumPlus(r) || isAccepted(r));
  return { blocking, advisory };
}

/** Result of checking early-exit conditions. `undefined` = continue to SARIF parsing. */
export function checkEarlyExit(result: ReturnType<typeof spawnSync>):
  | {
      message: string;
      code: number;
    }
  | undefined {
  // spawn failed outright: warn and skip.
  if (result.error) {
    return {
      message: `⚠ snyk not runnable (${result.error.message}) — skipping SAST gate`,
      code: 0,
    };
  }

  const status = result.status ?? 2;
  if (status === 0) {
    return { message: "✓ snyk code: no findings at or above low severity", code: 0 };
  }
  if (status === 3) {
    return { message: "ℹ snyk code: no supported files to scan", code: 0 };
  }

  return undefined;
}

/** Process results and return exit info if no medium-plus blocking findings. */
export function checkResults(
  results: SarifResult[],
): { message: string; code: number } | undefined {
  const { blocking, advisory } = processResults(results);

  for (const r of advisory) {
    const tag = isMediumPlus(r) ? `${r.level}, accepted` : "low/informational";
    console.warn(`⚠ snyk code (${tag}): ${locationOf(r)} — ${r.message?.text ?? ""}`);
  }

  if (blocking.length > 0) {
    for (const r of blocking) {
      console.error(`✗ snyk code [${r.level}]: ${locationOf(r)} — ${r.message?.text ?? ""}`);
    }
    return {
      message: `✗ snyk code gate: ${blocking.length} medium-or-worse SAST finding(s) — fix or \`snyk ignore\` them`,
      code: 1,
    };
  }

  const message =
    advisory.length > 0
      ? `✓ snyk code: no medium-or-worse findings (${advisory.length} low/informational warned above)`
      : "✓ snyk code: no findings at or above low severity";
  return { message, code: 0 };
}

/**
 * Main gate logic: run Snyk, parse results, and exit with appropriate status.
 * @internal Exported for testing only.
 */
export function runGate(): void {
  const result = runSnykScan();
  const earlyExit = checkEarlyExit(result);

  if (earlyExit) {
    console.log(earlyExit.message);
    process.exit(earlyExit.code);
  }

  // Parse SARIF — if it doesn't parse, snyk couldn't run (auth/network), so skip rather than block.
  let results: SarifResult[];
  try {
    results = parseSarifOutput(typeof result.stdout === "string" ? result.stdout : "");
  } catch {
    process.stderr.write(result.stderr as string);
    console.warn("⚠ snyk code could not run (auth/network?) — run `snyk auth`; skipping SAST gate");
    process.exit(0);
  }

  const finalExit = checkResults(results);
  if (finalExit) {
    console.log(finalExit.message);
    process.exit(finalExit.code);
  }
}

// Only run the gate if this module is executed directly (not imported for testing).
if (import.meta.url === `file://${process.argv[1]}` && process.env.VITEST !== "true") {
  runGate();
}
