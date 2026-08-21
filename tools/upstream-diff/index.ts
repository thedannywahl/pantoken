/**
 * The upstream-drift runner. Builds a manifest from the live `@pantoken/tokens` build, diffs it
 * against the committed baseline, and either fails (unblessed drift) or blesses a new baseline.
 *
 * Usage (via the vp task DAG):
 * - `vp run upgrade:check`  — diff current vs baseline; write the report; exit non-zero if they differ.
 * - `vp run upgrade:bless`  — rewrite the baseline from the current build (accept a reviewed bump).
 *
 * The gate is a lockfile-style invariant: the committed baseline must match the current build, so a PR
 * that bumps the upstream pin has to bless the baseline in the same change. That surfaces every token
 * and icon delta in the PR diff and in the printed report.
 *
 * `check` auto-heals (writes the baseline itself, no `--bless` needed) when the drift ISN'T from an
 * upstream bump — e.g. a `formats/tokens/known-syntax-issues.json` patch rewriting a token's value.
 * Provenance (design-tokens ref/commit, ui-icons version) unchanged means there's no upstream commit to
 * review, so the change was already reviewed as a normal PR diff; only a real provenance change (or an
 * enforcement failure) still requires a manual `vp run upgrade:bless`.
 *
 * Bless also enforces the deprecation lifecycle: a bump that DROPS an upstream token can't be blessed
 * until that token has a `deprecations.json` entry (so no removal ships silently), and once a
 * deprecation's `removeIn` upstream minor is reached, bless fails until the entry is retired (forcing
 * the shim to be dropped and a consumer minor cut).
 *
 * @module
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { provenance } from "@pantoken/tokens/meta";
import { themes } from "@pantoken/tokens";
import { dueForRemoval, ledgerCovers } from "@pantoken/plugin-deprecations";
import type { DeprecationLedger } from "@pantoken/model";
import {
  buildManifest,
  diffManifests,
  manifestsEqual,
  serializeManifest,
  toJsonReport,
  toMarkdownReport,
  type Manifest,
} from "./lib.ts";

const here = import.meta.dirname;
const baselinePath = resolve(here, "baseline/manifest.json");
const ledgerPath = resolve(here, "../../formats/tokens/deprecations.json");
const reportDir = resolve(here, "generated");

const bless = process.argv.includes("--bless");

const current = buildManifest({ themes, provenance });
const ledger = JSON.parse(readFileSync(ledgerPath, "utf8")) as DeprecationLedger;
const currentUpstream = {
  ui: provenance.uiIcons.resolved,
  designTokens: provenance.designTokens.ref,
};

/** Deprecations whose `removeIn` upstream minor the current build has reached — shims to retire now. */
const due = dueForRemoval(ledger, currentUpstream);

/**
 * Enforces the retirement + coverage rules, then writes the baseline. Returns `false` (without
 * exiting) instead of blessing when a rule blocks it, so a caller can choose to fail loudly (an
 * explicit `--bless`) or fall back to requiring a manual one (an auto-heal attempt during `check`).
 */
function tryBless(previous: Manifest | undefined): boolean {
  // Enforcement 1 — retirement: once an entry's removeIn minor is adopted, the shim must be dropped
  // (delete the entry) and the consumer cuts a minor. Refuse to bless while any are still present.
  if (due.length) {
    console.error(
      `✗ upstream-diff: cannot bless — ${due.length} deprecation(s) have reached their removeIn upstream minor and must be retired:`,
    );
    for (const entry of due) console.error(`  - ${entry.token} (removeIn ${entry.removeIn})`);
    console.error(
      "\nRemove each retired entry from formats/tokens/deprecations.json (dropping the shim) and cut a consumer minor, then re-run `vp run upgrade:bless`.",
    );
    return false;
  }

  // Enforcement 2 — coverage: a bump that drops a REAL upstream token requires a ledger entry, so no
  // removal ships silently. A dropped token that was itself a deprecation SHIM in the previous baseline
  // is exempt — retiring a shim is a deliberate pantoken action, not an unhandled upstream removal.
  if (previous !== undefined) {
    const wasShim = (name: string): boolean =>
      Object.values(previous.themes).some((theme) => theme[name]?.deprecated);
    const uncovered = diffManifests(previous, current)
      .buckets.removedTokens.map((change) => change.name)
      .filter((name) => !ledgerCovers(ledger, name) && !wasShim(name));
    if (uncovered.length) {
      console.error(
        `✗ upstream-diff: cannot bless — ${uncovered.length} dropped upstream token(s) have no deprecations.json entry:`,
      );
      for (const name of uncovered) console.error(`  - ${name}`);
      console.error(
        "\nAdd each to formats/tokens/deprecations.json with a lifecycle (deprecatedIn / removeIn, plus a replacement or a frozen value), then re-run `vp run upgrade:bless`.",
      );
      return false;
    }
  }

  mkdirSync(resolve(here, "baseline"), { recursive: true });
  writeFileSync(baselinePath, serializeManifest(current));
  console.log(
    `✓ blessed baseline: design-tokens ${provenance.designTokens.ref}@${provenance.designTokens.commit.slice(0, 7)}, ui-icons ${provenance.uiIcons.resolved}`,
  );
  return true;
}

if (bless) {
  let previous: Manifest | undefined;
  try {
    previous = JSON.parse(readFileSync(baselinePath, "utf8")) as Manifest;
  } catch {
    // No baseline yet — fresh bootstrap; treat all removals as covered (nothing to diff against).
  }
  process.exit(tryBless(previous) ? 0 : 1);
}

let baseline: Manifest;
try {
  baseline = JSON.parse(readFileSync(baselinePath, "utf8")) as Manifest;
} catch {
  console.error(
    "✗ upstream-diff: no baseline at baseline/manifest.json. Bootstrap it with `vp run upgrade:bless`.",
  );
  process.exit(1);
}
const diff = diffManifests(baseline, current);

const dueNote = due.length
  ? `\n\n### ⚠️ Deprecations due for removal (${due.length})\n\n${due
      .map(
        (e) =>
          `- \`${e.token}\` — removeIn \`${e.removeIn}\` reached; retire the entry and cut a consumer minor.`,
      )
      .join("\n")}\n`
  : "";

mkdirSync(reportDir, { recursive: true });
writeFileSync(join(reportDir, "report.json"), toJsonReport(diff));
const markdown = `${toMarkdownReport(diff)}${dueNote}`;
writeFileSync(join(reportDir, "report.md"), `${markdown}\n`);
console.log(markdown);

if (!manifestsEqual(baseline, current)) {
  // The drift isn't necessarily an unreviewed upstream bump: our OWN generator can rewrite a token's
  // value (e.g. a `formats/tokens/known-syntax-issues.json` patch) without touching upstream at all.
  // When provenance hasn't moved, there's nothing upstream to review — self-heal the baseline instead
  // of demanding a manual `vp run upgrade:bless` for a change that was already reviewed as a PR diff.
  const sameUpstream = JSON.stringify(baseline.provenance) === JSON.stringify(current.provenance);
  if (!sameUpstream || !tryBless(baseline)) {
    console.error(
      "\n✗ upstream-diff: the committed baseline is stale. Review the drift above, then run `vp run upgrade:bless` and commit tools/upstream-diff/baseline/manifest.json in this change.",
    );
    process.exit(1);
  }
  console.log(
    "\n✓ upstream-diff: auto-healed the baseline (drift wasn't from an upstream bump) — commit tools/upstream-diff/baseline/manifest.json.",
  );
}

if (due.length) {
  console.error(
    `\n✗ upstream-diff: ${due.length} deprecation(s) have reached their removeIn upstream minor — retire them (see above).`,
  );
  process.exit(1);
}

console.log("\n✓ upstream-diff: baseline matches the current build (no unblessed drift).");
