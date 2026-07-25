/**
 * The fallow CI gate. Policy: dead-code is an error, health must hold a minimum score, and
 * duplication must stay within the `.fallowrc.jsonc` threshold. Fallow has no built-in minimum-grade
 * gate, so this wrapper enforces the score floor; dead-code failure comes from `--fail-on-issues`
 * honouring the `.fallowrc.jsonc` severities. Run via `vp run health:fallow` (after `build:all`, so
 * generated output exists).
 *
 * Grade bands (fallow): A is 85 and up, B is 70-84, C is 55-69. The score is 83.2 (B), up from 67.5. The floor
 * is 80: it locks in that improvement and blocks regression while staying just under the current score.
 * The remaining gap to grade A is diffuse, not a few fixable functions — `hotspots` (~10) is
 * churn-weighted (git history times complexity, unmoved by refactoring), `unit_size` (~5) is
 * distributional across many functions (excluding even the two largest Vue widgets moved it only
 * 0.7), plus a small `coupling` penalty. Closing it means codebase-wide function-shrinking. Raise
 * this to 85 once that work lands. See docs/engineering-log.md.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/** The minimum fallow health score the gate requires (grade B floor; grade A is 85 — see above). */
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

// 3. Regression gate — fail if the dead-code finding count grows beyond the committed baseline, so
//    quality can't slip even for the WARN-level findings the step-1 hard gate lets through (unused
//    catalog/dev-deps, unused exports). Scoped to the `dead-code` subcommand on purpose: the top-level
//    `fallow --fail-on-regression` also runs the default issue gate, so it exits non-zero on the mere
//    presence of advisory duplication/complexity — not just on a regression. The baseline is a
//    dead-code regression baseline (`--save-regression-baseline`); it's refreshed on each release.
const BASELINE = "fallow-baseline.json";
if (existsSync(path.join(ROOT, BASELINE))) {
  const reg = fallow([
    "dead-code",
    "--fail-on-regression",
    "--regression-baseline",
    BASELINE,
    "--quiet",
  ]);
  if (reg.status === 0) {
    console.log("✓ fallow regression: no growth vs baseline");
  } else {
    process.stdout.write(reg.stdout);
    console.error(`✗ fallow regression gate: findings grew beyond ${BASELINE}`);
    failed = true;
  }
} else {
  console.log(`ℹ ${BASELINE} missing — skipping regression gate`);
}

// 4. Duplication gate — fail when the duplicated-line ratio exceeds `duplicates.threshold` in
//    .fallowrc.jsonc. `fallow dupes` reads that threshold and exits non-zero when exceeded, so the
//    current structural duplication is accepted while new duplication is blocked.
const dupes = fallow(["dupes", "--format", "compact"]);
if (dupes.status === 0) {
  console.log("✓ fallow duplication: within the .fallowrc threshold");
} else {
  process.stdout.write(dupes.stdout);
  console.error("✗ fallow duplication gate: ratio exceeds the .fallowrc `duplicates.threshold`");
  failed = true;
}

process.exit(failed ? 1 : 0);
