/**
 * Configurable severity policy for translation drift, shared by every drift checker in the repo.
 *
 * Each checker reports its findings to a {@link DriftReporter} instead of deciding for itself whether
 * to `process.exit(1)`. The reporter resolves a severity per finding from the committed
 * `i18n.config.json` — a `(surface, locale-tier)` matrix — so one config file decides what blocks a
 * merge and what only warns. That matters because the cost of a hard gate scales with locale count:
 * blocking on ~90 locales means no English string can land until every translation does.
 *
 * Surfaces are stable ids (`ui.strings`, `docs.guides`, `docs.parity`, …). Tiers are named groups of
 * locale patterns, matched in declaration order — the first tier whose patterns match a locale wins,
 * so a trailing `"*"` tier acts as the catch-all. Patterns use the same syntax as
 * {@link VerbatimPolicy}: an exact tag, a `"prefix*"` glob, or `"*"`.
 *
 * @module
 */
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

/** What a drift finding does to CI. `off` drops the finding entirely. */
export type DriftSeverity = "block" | "warn" | "off";

const SEVERITIES: readonly DriftSeverity[] = ["block", "warn", "off"];

/**
 * A surface's severity: one value for every tier, or a per-tier map. A tier absent from the map
 * falls through to the policy's top-level `fallback`.
 */
export type SurfacePolicy = DriftSeverity | Readonly<Record<string, DriftSeverity>>;

/** The drift-policy shape embedded in `i18n.config.json`. */
export interface DriftPolicy {
  /** Named locale groups, matched in declaration order. Put the catch-all (`["*"]`) last. */
  tiers: Readonly<Record<string, readonly string[]>>;
  /** Per-surface severity. A surface absent here uses `fallback`. */
  surfaces: Readonly<Record<string, SurfacePolicy>>;
  /**
   * Severity for any surface or tier the config doesn't name — same shape as a surface entry, so it
   * can be tier-aware. This is what a checker's brand-new surface id gets before anyone adds it to
   * `surfaces`, so a tier-aware fallback (`{ source: "block", rest: "warn" }`) is the useful default.
   * Anything still unmatched is `"warn"`.
   */
  fallback?: SurfacePolicy;
}

/** One thing a checker found missing: a `(surface, locale)` pair plus enough detail to act on it. */
export interface DriftFinding {
  /** Stable surface id, e.g. `"docs.guides"`. */
  surface: string;
  /** BCP47 locale the translation is missing for; `"en"` for source-integrity findings. */
  locale: string;
  /** Repo-relative path the finding anchors to, for the GitHub annotation. */
  file: string;
  /** Short human-readable description of what's missing. */
  detail: string;
  /** 1-indexed line, when the checker knows one. */
  line?: number;
}

/** True when `locale` matches a tier pattern: an exact tag, a `"prefix*"` glob, or `"*"`. */
function localeMatchesPattern(pattern: string, locale: string): boolean {
  if (pattern === "*") return true;
  return pattern.endsWith("*") ? locale.startsWith(pattern.slice(0, -1)) : pattern === locale;
}

/**
 * Name the first tier in `policy.tiers` whose patterns match `locale`, or `undefined` when none do.
 * Declaration order is the precedence order, so a specific tier must precede a `"*"` catch-all.
 */
export function resolveTier(policy: DriftPolicy, locale: string): string | undefined {
  for (const [tier, patterns] of Object.entries(policy.tiers)) {
    if (patterns.some((pattern) => localeMatchesPattern(pattern, locale))) return tier;
  }
  return undefined;
}

/** Read one surface-or-fallback entry for `tier`: a bare severity applies to every tier. */
function severityFrom(
  entry: SurfacePolicy | undefined,
  tier: string | undefined,
): DriftSeverity | undefined {
  if (entry === undefined) return undefined;
  if (typeof entry === "string") return entry;
  return tier === undefined ? undefined : entry[tier];
}

/**
 * Resolve the severity for one `(surface, locale)` pair: the surface's entry (a bare severity, or the
 * matched tier's value from its per-tier map), else `policy.fallback` read the same way, else
 * `"warn"`. An unknown surface or an unmatched locale never hard-fails a build on its own — a typo'd
 * id degrades to the fallback rather than silently blocking every PR.
 */
export function resolveDriftSeverity(
  policy: DriftPolicy,
  surface: string,
  locale: string,
): DriftSeverity {
  const tier = resolveTier(policy, locale);
  return (
    severityFrom(policy.surfaces[surface], tier) ?? severityFrom(policy.fallback, tier) ?? "warn"
  );
}

/** Walk up from `fromPath` to the nearest `pnpm-workspace.yaml` (the workspace root). */
function findWorkspaceRoot(fromPath: string): string | undefined {
  let dir = resolve(fromPath);
  for (;;) {
    if (existsSync(join(dir, "pnpm-workspace.yaml"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

function assertSeverity(value: unknown, where: string): DriftSeverity {
  if (typeof value !== "string" || !SEVERITIES.includes(value as DriftSeverity)) {
    throw new Error(
      `i18n-policy: ${where} must be one of ${SEVERITIES.join(" | ")} (got ${JSON.stringify(value)})`,
    );
  }
  return value as DriftSeverity;
}

/**
 * Validate a parsed drift-policy object. Throws with the offending path on any malformed field —
 * a policy file is a merge gate, so a silent default here would quietly disable CI.
 */
export function parseDriftPolicy(raw: unknown): DriftPolicy {
  if (typeof raw !== "object" || raw === null) throw new Error("i18n-policy: expected an object");
  const { tiers, surfaces, fallback } = raw as Record<string, unknown>;

  if (typeof tiers !== "object" || tiers === null) {
    throw new Error("i18n-policy: `tiers` must be an object of tier → locale patterns");
  }
  for (const [tier, patterns] of Object.entries(tiers)) {
    if (!Array.isArray(patterns) || patterns.some((p) => typeof p !== "string")) {
      throw new Error(`i18n-policy: tiers.${tier} must be an array of locale-pattern strings`);
    }
  }

  if (typeof surfaces !== "object" || surfaces === null) {
    throw new Error("i18n-policy: `surfaces` must be an object of surface id → severity");
  }
  for (const [surface, entry] of Object.entries(surfaces)) {
    if (typeof entry === "string") {
      assertSeverity(entry, `surfaces.${surface}`);
      continue;
    }
    if (typeof entry !== "object" || entry === null) {
      throw new Error(
        `i18n-policy: surfaces.${surface} must be a severity or a tier → severity map`,
      );
    }
    for (const [tier, severity] of Object.entries(entry)) {
      assertSeverity(severity, `surfaces.${surface}.${tier}`);
      if (!(tier in tiers)) {
        throw new Error(`i18n-policy: surfaces.${surface} names unknown tier "${tier}"`);
      }
    }
  }

  if (typeof fallback === "string") {
    assertSeverity(fallback, "fallback");
  } else if (fallback !== undefined) {
    if (typeof fallback !== "object" || fallback === null) {
      throw new Error("i18n-policy: `fallback` must be a severity or a tier → severity map");
    }
    for (const [tier, severity] of Object.entries(fallback)) {
      assertSeverity(severity, `fallback.${tier}`);
      if (!(tier in tiers)) {
        throw new Error(`i18n-policy: fallback names unknown tier "${tier}"`);
      }
    }
  }
  return raw as DriftPolicy;
}

/**
 * The policy used when no `i18n.config.json` is found: English source drift blocks, every actual
 * translation only warns. A checkout without the config still enforces the thing that breaks the
 * English build, and still can't be parked by ~90 pending translations.
 */
export const DEFAULT_DRIFT_POLICY: DriftPolicy = {
  tiers: { source: ["en"], rest: ["*"] },
  surfaces: {},
  fallback: { source: "block", rest: "warn" },
};

let cached: DriftPolicy | undefined;

/**
 * Load the repo's embedded drift policy from `i18n.config.json`, cached per process.
 *
 * `I18N_CONFIG` overrides the config path (useful for tests and for a stricter scheduled run).
 * Falls back to {@link DEFAULT_DRIFT_POLICY} when no file exists, so a checker still runs — and still
 * blocks on English source drift — in a checkout without the config.
 */
export function loadDriftPolicy(fromPath: string = process.cwd()): DriftPolicy {
  if (cached) return cached;
  const override = process.env.I18N_CONFIG;
  const path = override ?? join(findWorkspaceRoot(fromPath) ?? fromPath, "i18n.config.json");
  if (!existsSync(path)) {
    if (override) throw new Error(`i18n.config: I18N_CONFIG points at a missing file: ${path}`);
    cached = DEFAULT_DRIFT_POLICY;
    return cached;
  }
  const config = JSON.parse(readFileSync(path, "utf8")) as {
    locales?: { tiers?: DriftPolicy["tiers"] };
    drift?: { surfaces?: DriftPolicy["surfaces"]; fallback?: DriftPolicy["fallback"] };
  };
  if (!config.locales?.tiers || !config.drift?.surfaces || config.drift.fallback === undefined) {
    throw new Error(`i18n.config: missing locales.tiers or drift policy in ${path}`);
  }
  cached = parseDriftPolicy({
    tiers: config.locales.tiers,
    surfaces: config.drift.surfaces,
    fallback: config.drift.fallback,
  });
  return cached;
}

/** Drop the cached policy — for tests that swap `I18N_CONFIG` between cases. */
export function resetDriftPolicyCache(): void {
  cached = undefined;
}

/** How many GitHub annotations to emit before collapsing the rest into the job summary only. */
const ANNOTATION_LIMIT = 10;

/**
 * How many grouped files to print per severity. A full-locale API sweep groups into ~800 files —
 * printing all of them buries the blocking findings and can trip Actions' log truncation.
 */
const CONSOLE_GROUP_LIMIT = 20;

/** Options for {@link DriftReporter}. */
export interface DriftReporterOptions {
  /** Label for console and summary headings, e.g. `"@pantoken/docs"`. */
  label: string;
  /** The command that fills the drift, printed in every failure and warning message. */
  fixCommand: string;
  /** Override the loaded policy (tests). */
  policy?: DriftPolicy;
}

interface Grouped {
  severity: Exclude<DriftSeverity, "off">;
  surface: string;
  file: string;
  locales: Set<string>;
  count: number;
  samples: string[];
}

/**
 * Collects drift findings, resolves each one's severity from the policy, then reports them once:
 * grouped console output, GitHub annotations (capped so they stay visible — Actions only renders the
 * first handful per step), a job-summary table, and an exit code.
 *
 * Warnings are deliberately loud but non-fatal. Set `I18N_DRIFT_STRICT=1` to escalate every `warn` to
 * `block` — that's how a scheduled full-locale run can enforce what a PR only reports.
 */
export class DriftReporter {
  private readonly policy: DriftPolicy;
  private readonly options: DriftReporterOptions;
  private readonly strict = process.env.I18N_DRIFT_STRICT === "1";
  private readonly findings: Array<DriftFinding & { severity: Exclude<DriftSeverity, "off"> }> = [];
  private suppressed = 0;

  constructor(options: DriftReporterOptions) {
    this.options = options;
    this.policy = options.policy ?? loadDriftPolicy();
  }

  /** Record one finding. `off` findings are counted and discarded. */
  add(finding: DriftFinding): void {
    const resolved = resolveDriftSeverity(this.policy, finding.surface, finding.locale);
    if (resolved === "off") {
      this.suppressed += 1;
      return;
    }
    const severity = this.strict ? "block" : resolved;
    this.findings.push({ ...finding, severity });
  }

  /** Record many findings at once. */
  addAll(findings: readonly DriftFinding[]): void {
    for (const finding of findings) this.add(finding);
  }

  /** True when at least one recorded finding blocks the merge. */
  get blocking(): boolean {
    return this.findings.some((f) => f.severity === "block");
  }

  /** Collapse findings to one row per `(severity, surface, file)`, biggest first. */
  private group(): Grouped[] {
    const rows = new Map<string, Grouped>();
    for (const finding of this.findings) {
      const key = `${finding.severity}\0${finding.surface}\0${finding.file}`;
      let row = rows.get(key);
      if (!row) {
        row = {
          severity: finding.severity,
          surface: finding.surface,
          file: finding.file,
          locales: new Set(),
          count: 0,
          samples: [],
        };
        rows.set(key, row);
      }
      row.locales.add(finding.locale);
      row.count += 1;
      if (row.samples.length < 3) row.samples.push(finding.detail);
    }
    return [...rows.values()].sort(
      (a, b) =>
        Number(b.severity === "block") - Number(a.severity === "block") ||
        b.count - a.count ||
        a.file.localeCompare(b.file),
    );
  }

  /**
   * Print everything and return the process exit code (`1` when anything blocks, else `0`). Callers
   * assign it to `process.exitCode` so a warn-only run still exits clean.
   */
  report(): number {
    const groups = this.group();
    const blocked = groups.filter((g) => g.severity === "block");
    const warned = groups.filter((g) => g.severity === "warn");

    if (groups.length === 0) {
      const note = this.suppressed > 0 ? ` (${this.suppressed} finding(s) policy-disabled)` : "";
      console.log(`✓ ${this.options.label}: no translation drift${note}`);
      return 0;
    }

    // Lead with the per-surface rollup: the file list below is capped, so this is the only place a
    // small surface is guaranteed to appear.
    const totals = this.surfaceTotals();
    const rollup = totals.some((row) => row.severity === "block") ? console.error : console.warn;
    rollup(`\n${this.options.label} — translation drift by surface:`);
    for (const row of totals) {
      const mark = row.severity === "block" ? "blocks" : "advisory";
      rollup(
        `  ${row.surface}: ${row.count} unit(s) in ${row.files} file(s), ` +
          `${row.locales} locale(s) — ${mark}`,
      );
    }

    for (const [heading, rows, stream] of [
      ["blocking", blocked, console.error],
      ["advisory", warned, console.warn],
    ] as const) {
      if (rows.length === 0) continue;
      const total = rows.reduce((sum, row) => sum + row.count, 0);
      const mark = heading === "blocking" ? "✗" : "!";
      stream(
        `\n${mark} ${this.options.label}: ${total} ${heading} drift finding(s) ` +
          `across ${rows.length} file(s):`,
      );
      for (const row of rows.slice(0, CONSOLE_GROUP_LIMIT)) {
        const locales = [...row.locales].sort();
        const shown = locales.slice(0, 6).join(", ");
        const more = locales.length > 6 ? `, +${locales.length - 6} more` : "";
        stream(`  [${row.surface}] ${row.file} — ${row.count} in ${locales.length} locale(s)`);
        stream(`    locales: ${shown}${more}`);
        for (const sample of row.samples) stream(`    - ${sample}`);
      }
      if (rows.length > CONSOLE_GROUP_LIMIT) {
        stream(`  …and ${rows.length - CONSOLE_GROUP_LIMIT} more file(s).`);
      }
    }

    this.emitAnnotations(groups);
    this.writeSummary(blocked, warned);

    if (blocked.length > 0) {
      console.error(
        `\nBlocking translation drift. Run \`${this.options.fixCommand}\` locally, then commit the ` +
          `updated translation cache. Loosen or tighten what blocks in \`i18n.config.json\`.`,
      );
      return 1;
    }
    console.warn(
      `\nAdvisory only — not blocking this merge. Run \`${this.options.fixCommand}\` when convenient.`,
    );
    return 0;
  }

  /**
   * Emit `::error` / `::warning` workflow commands so drift shows inline on the PR diff. Grouped rows
   * are already collapsed per file; we still cap the count because Actions renders only the first
   * ~10 annotations of each level per step and the rest would be invisible anyway.
   */
  private emitAnnotations(groups: readonly Grouped[]): void {
    if (!process.env.GITHUB_ACTIONS) return;
    let emitted = 0;
    for (const row of groups) {
      if (emitted >= ANNOTATION_LIMIT) break;
      const level = row.severity === "block" ? "error" : "warning";
      const locales = [...row.locales].sort();
      const message =
        `${row.surface}: ${row.count} untranslated/drifted unit(s) across ${locales.length} ` +
        `locale(s) (${locales.slice(0, 8).join(", ")}${locales.length > 8 ? ", …" : ""}). ` +
        `Fix with \`${this.options.fixCommand}\`.`;
      const line = row.file.includes("#") ? "" : ",line=1";
      console.log(`::${level} file=${row.file}${line},title=Translation drift::${message}`);
      emitted += 1;
    }
    if (groups.length > emitted) {
      console.log(
        `::notice title=Translation drift::${groups.length - emitted} more drifted file(s) — see the job summary.`,
      );
    }
  }

  /**
   * Totals per `(surface, severity)`, biggest first. A surface with 86 findings would otherwise be
   * invisible behind ~800 API-file rows, so both the console output and the job summary lead with
   * this — the reader's first question is which surfaces drifted and whether they block, not which
   * file.
   */
  private surfaceTotals(): Array<{
    surface: string;
    severity: Exclude<DriftSeverity, "off">;
    count: number;
    files: number;
    locales: number;
  }> {
    const totals = new Map<string, { locales: Set<string>; files: Set<string>; count: number }>();
    for (const finding of this.findings) {
      const key = `${finding.severity}\0${finding.surface}`;
      let row = totals.get(key);
      if (!row) {
        row = { locales: new Set(), files: new Set(), count: 0 };
        totals.set(key, row);
      }
      row.locales.add(finding.locale);
      row.files.add(finding.file);
      row.count += 1;
    }
    return [...totals.entries()]
      .map(([key, row]) => {
        const [severity, surface] = key.split("\0");
        return {
          surface,
          severity: severity as Exclude<DriftSeverity, "off">,
          count: row.count,
          files: row.files.size,
          locales: row.locales.size,
        };
      })
      .sort(
        (a, b) =>
          Number(b.severity === "block") - Number(a.severity === "block") ||
          b.count - a.count ||
          a.surface.localeCompare(b.surface),
      );
  }

  /** Append a markdown drift table to `$GITHUB_STEP_SUMMARY`, so warnings survive log truncation. */
  private writeSummary(blocked: readonly Grouped[], warned: readonly Grouped[]): void {
    const path = process.env.GITHUB_STEP_SUMMARY;
    if (!path) return;
    const lines: string[] = [`### Translation drift — ${this.options.label}`, ""];
    const countOf = (rows: readonly Grouped[]) => rows.reduce((sum, row) => sum + row.count, 0);
    lines.push(
      `**${countOf(blocked)}** blocking · **${countOf(warned)}** advisory` +
        (this.suppressed > 0 ? ` · ${this.suppressed} policy-disabled` : "") +
        (this.strict ? " · `I18N_DRIFT_STRICT=1`" : ""),
      "",
      "| | Surface | Units | Files | Locales |",
      "| --- | --- | --- | --- | --- |",
    );
    for (const row of this.surfaceTotals()) {
      const icon = row.severity === "block" ? "🚫 blocks" : "⚠️ advisory";
      lines.push(`| ${icon} | \`${row.surface}\` | ${row.count} | ${row.files} | ${row.locales} |`);
    }
    lines.push(
      "",
      "<details><summary>Drifted files</summary>",
      "",
      "| | Surface | File | Units | Locales |",
      "| --- | --- | --- | --- | --- |",
    );
    for (const row of [...blocked, ...warned].slice(0, 50)) {
      const icon = row.severity === "block" ? "🚫" : "⚠️";
      const locales = [...row.locales].sort();
      const shown = locales.slice(0, 8).join(", ") + (locales.length > 8 ? ", …" : "");
      lines.push(
        `| ${icon} | \`${row.surface}\` | \`${row.file}\` | ${row.count} | ${locales.length} — ${shown} |`,
      );
    }
    const total = blocked.length + warned.length;
    if (total > 50) lines.push(`| | | _…and ${total - 50} more file(s)_ | | |`);
    lines.push(
      "",
      "</details>",
      "",
      `Fill drift with \`${this.options.fixCommand}\`. Severity per surface and locale tier lives in \`i18n.config.json\`.`,
      "",
    );
    appendFileSync(path, `${lines.join("\n")}\n`);
  }
}

/** Make `file` repo-relative, so annotations anchor to a path GitHub can resolve. */
export function repoRelative(file: string, fromPath: string = process.cwd()): string {
  const root = findWorkspaceRoot(fromPath);
  return root ? relative(root, resolve(file)) : file;
}
