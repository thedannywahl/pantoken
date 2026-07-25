/**
 * The fallow CI gate. Policy: dead-code is an error, health must hold a minimum score, and
 * duplication is advisory. Fallow has no built-in minimum-grade gate, so this wrapper enforces the
 * score floor; dead-code failure comes from `--fail-on-issues` honouring the `.fallowrc.jsonc`
 * severities. Run via `vp run health:fallow` (after `build:all`, so generated output exists).
 *
 * Why the floor is 80 (grade B) and not 90 (grade A): fallow's `hotspots` penalty (~10, capped) is
 * churn-weighted — file git-commit history times complexity — so it does not respond to
 * function-extraction refactoring (history and total file complexity are unchanged). With that
 * penalty effectively immovable plus the architectural `coupling` penalty, the maximum achievable
 * score for this repo is ~88.6, so grade A is mathematically unreachable without rewriting git
 * history or splitting the high-churn component-definition files. The floor of 80 locks in the
 * measured improvement (67.5 -\> 81.4) and prevents regression. See docs/engineering-log.md.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/** The minimum fallow health score the gate requires (grade B; grade A is unreachable — see above). */
const MIN_HEALTH_SCORE = 80;

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);
const BIN = path.join(ROOT, "node_modules/.bin/fallow");
const FALLOW = existsSync(BIN) ? BIN : "fallow";

/** Run a fallow subcommand, returning its exit status and captured stdout. */
function fallow(args: string[]): { status: number; stdout: string } {
  const result = spawnSync(FALLOW, args, { encoding: "utf8", cwd: ROOT });
  if (result.error) throw result.error;
  return { status: result.status ?? 1, stdout: result.stdout ?? "" };
}

let failed = false;

// 1. Dead-code gate — error-severity findings fail (warn-level rules don't), per .fallowrc.jsonc.
const dead = fallow(["dead-code", "--fail-on-issues", "--format", "compact"]);
if (dead.status === 0) {
  console.log("✓ fallow dead-code: no error-severity findings");
} else {
  process.stdout.write(dead.stdout);
  console.error("✗ fallow dead-code gate failed");
  failed = true;
}

// 2. Health gate — require grade A (score >= MIN_HEALTH_SCORE).
const health = fallow(["health", "--format", "json"]);
const { score, grade } = (
  JSON.parse(health.stdout) as { health_score: { score: number; grade: string } }
).health_score;
if (score >= MIN_HEALTH_SCORE) {
  console.log(`✓ fallow health: ${score} (${grade})`);
} else {
  console.error(`✗ fallow health gate: ${score} (${grade}) is below ${MIN_HEALTH_SCORE} (grade A)`);
  failed = true;
}

// 3. Duplication — advisory only: reported, never fails the gate.
const dupes = fallow(["dupes", "--format", "compact"]);
const groups = dupes.stdout.split("\n").filter((line) => line.trim().length > 0).length;
if (groups > 0) {
  console.log(
    `ℹ fallow duplicates (advisory): ${groups} finding(s) — run \`vp exec fallow dupes\``,
  );
}

process.exit(failed ? 1 : 0);
