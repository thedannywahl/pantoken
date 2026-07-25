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

interface SarifResult {
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
const ACCEPTED: { rule: string; path: string; reason: string }[] = [
  {
    rule: "javascript/NoRateLimitingForExpensiveWebOperation",
    path: "plugins/vite/workspace-orchestrator/src/file-server.ts",
    reason:
      "Dev-server Vite middleware (localhost, no untrusted traffic); rate limiting a dev static-file server is inappropriate. Path traversal is contained.",
  },
];

/** A finding's location as `path:line`, or `?` when absent. */
function locationOf(result: SarifResult): string {
  const loc = (result.locations ?? []).find((l) => l.physicalLocation?.artifactLocation?.uri);
  const phys = loc?.physicalLocation;
  return phys ? `${phys.artifactLocation?.uri}:${phys.region?.startLine ?? "?"}` : "?";
}

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
const result = spawnSync(
  process.execPath,
  [snykCli, "code", "test", "--sarif", "--severity-threshold=low"],
  { encoding: "utf8", cwd: ROOT, maxBuffer: 64 * 1024 * 1024 },
);

// spawn failed outright (node couldn't launch the CLI): warn and skip rather than block the push.
if (result.error) {
  console.warn(`⚠ snyk not runnable (${result.error.message}) — skipping SAST gate`);
  process.exit(0);
}

const status = result.status ?? 2;
if (status === 0) {
  console.log("✓ snyk code: no findings at or above low severity");
  process.exit(0);
}
if (status === 3) {
  console.log("ℹ snyk code: no supported files to scan");
  process.exit(0);
}

// status 1 means findings were reported; anything else (typically 2) is an error. Parse the SARIF —
// if it doesn't parse, snyk couldn't run (auth/network), so skip rather than block.
let results: SarifResult[];
try {
  const sarif = JSON.parse(result.stdout) as { runs?: { results?: SarifResult[] }[] };
  results = (sarif.runs ?? []).flatMap((run) => run.results ?? []);
} catch {
  process.stderr.write(result.stderr);
  console.warn("⚠ snyk code could not run (auth/network?) — run `snyk auth`; skipping SAST gate");
  process.exit(0);
}

/** Whether a finding is on the accepted-false-positive allowlist. */
function isAccepted(result: SarifResult): boolean {
  const filePath = locationOf(result).split(":")[0];
  return ACCEPTED.some((a) => a.rule === result.ruleId && a.path === filePath);
}

// error = high, warning = medium (both block, unless accepted); note/none = low/informational (warn).
const mediumPlus = (r: SarifResult): boolean => r.level === "error" || r.level === "warning";
const blocking = results.filter((r) => mediumPlus(r) && !isAccepted(r));
const advisory = results.filter((r) => !mediumPlus(r) || isAccepted(r));

for (const r of advisory) {
  const tag = mediumPlus(r) ? `${r.level}, accepted` : "low/informational";
  console.warn(`⚠ snyk code (${tag}): ${locationOf(r)} — ${r.message?.text ?? ""}`);
}

if (blocking.length > 0) {
  for (const r of blocking) {
    console.error(`✗ snyk code [${r.level}]: ${locationOf(r)} — ${r.message?.text ?? ""}`);
  }
  console.error(
    `✗ snyk code gate: ${blocking.length} medium-or-worse SAST finding(s) — fix or \`snyk ignore\` them`,
  );
  process.exit(1);
}

console.log(
  advisory.length > 0
    ? `✓ snyk code: no medium-or-worse findings (${advisory.length} low/informational warned above)`
    : "✓ snyk code: no findings at or above low severity",
);
process.exit(0);
