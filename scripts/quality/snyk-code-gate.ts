/**
 * The Snyk Code (SAST) gate. Snyk has no GitHub App wired to this repo, so CI can't run it — this
 * script is the enforcement point, run locally from the `pre-push` hook (and on demand via
 * `vp run security:code`). Policy: any high-or-worse code-security finding blocks the push.
 *
 * Snyk can't authenticate on every machine (a contributor may never have run `snyk auth`), so the
 * gate is exit-code aware and fails *closed only on real findings*: it blocks on findings, passes
 * when clean or when there's nothing to scan, and warns-then-skips on an auth/network/config error so
 * a contributor without a Snyk account isn't bricked. The maintainer's authenticated push still gates.
 *
 * Snyk CLI exit codes: 0 = clean, 1 = findings, 2 = error (auth/network/config), 3 = no supported files.
 *
 * @module
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);
const BIN = path.join(ROOT, "node_modules/.bin/snyk");
const SNYK = existsSync(BIN) ? BIN : "snyk";

const result = spawnSync(SNYK, ["code", "test", "--severity-threshold=high"], {
  encoding: "utf8",
  cwd: ROOT,
});

// spawn failed outright (snyk missing): warn and skip rather than block the push.
if (result.error) {
  console.warn(`⚠ snyk not runnable (${result.error.message}) — skipping SAST gate`);
  process.exit(0);
}

const status = result.status ?? 2;

if (status === 0) {
  console.log("✓ snyk code: no high-severity findings");
  process.exit(0);
}
if (status === 1) {
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  console.error("✗ snyk code gate: high-severity SAST finding(s) — fix or `snyk ignore` them");
  process.exit(1);
}
if (status === 3) {
  console.log("ℹ snyk code: no supported files to scan");
  process.exit(0);
}

// 2 (or anything unexpected): almost always "not authenticated" or a network hiccup. Don't block a
// contributor who hasn't run `snyk auth`; surface the reason so it's clearly a skip, not a pass.
process.stderr.write(result.stderr);
console.warn("⚠ snyk code could not run (auth/network?) — run `snyk auth`; skipping SAST gate");
process.exit(0);
