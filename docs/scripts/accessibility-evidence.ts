import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { AUDIT_MATRIX } from "../../formats/components/scripts/audit-matrix.ts";
import { ACCESSIBILITY_AUDIT_STRINGS as text } from "../.vitepress/i18n.ts";

type Counts = Record<string, number>;
type Engine = { violations: number; reviews: number; reviewRules: Counts; violationRules: Counts };

/** Aggregated result counts for one named check in one tier of one target. */
export interface CheckDetail {
  tier: string;
  name: string;
  criteria: string[];
  counts: Counts;
}

/** One authored target, preserving page/npm evidence and missing per-state tiers separately. */
export interface AccessibilityEvidence {
  target: string;
  theme: string;
  scheme: string;
  source: "page" | "npm";
  run: string;
  date: string;
  tools: Record<string, string>;
  digest: string;
  configurations: number;
  tiers: Record<string, Counts>;
  axe: Engine;
  ibm: Engine;
  checks: Record<string, Counts>;
  /** Per-check results with the WCAG success criteria each check covers. */
  details: CheckDetail[];
  flags: number;
  findings: string[];
  notices: string[];
  warnings: string[];
}

/** Checked-in audit evidence; no docs build needs a browser or local audit directory. */
export interface AccessibilitySnapshot {
  schema: 1;
  records: Record<string, AccessibilityEvidence[]>;
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Accessibility evidence: expected an object");
  return Object.fromEntries(Object.entries(value));
}

function array(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error("Accessibility evidence: expected an array");
  return value;
}

function string(value: unknown): string {
  if (typeof value !== "string") throw new Error("Accessibility evidence: expected a string");
  return value;
}

function increment(counts: Counts, key: string, count = 1): void {
  Object.defineProperty(counts, key, {
    value: (Object.hasOwn(counts, key) ? counts[key]! : 0) + count,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

function counts(value: unknown): Counts {
  return Object.fromEntries(
    Object.entries(object(value)).map(([key, count]) => {
      if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0)
        throw new Error("Invalid accessibility count");
      return [key, count];
    }),
  );
}

function storedEngine(value: unknown): Engine {
  const raw = object(value);
  const totals = counts({ violations: raw.violations, reviews: raw.reviews });
  return {
    violations: totals.violations!,
    reviews: totals.reviews!,
    reviewRules: counts(raw.reviewRules),
    violationRules: counts(raw.violationRules),
  };
}

/** Validate checked-in JSON at the build boundary, including nonnegative counts and supported schemes. */
export function loadAccessibilitySnapshot(value: unknown): AccessibilitySnapshot {
  const raw = object(value);
  if (raw.schema !== 1) throw new Error("Unsupported accessibility snapshot schema");
  return {
    schema: 1,
    records: Object.fromEntries(
      Object.entries(object(raw.records)).map(([name, values]) => [
        name,
        array(values).map((value): AccessibilityEvidence => {
          const row = object(value);
          if (row.source !== "page" && row.source !== "npm")
            throw new Error("Invalid evidence source");
          const theme = string(row.theme),
            scheme = string(row.scheme);
          if (!AUDIT_MATRIX.some((item) => item.theme === theme && item.scheme === scheme))
            throw new Error("Unsupported evidence theme/scheme");
          const totals = counts({ configurations: row.configurations, flags: row.flags });
          return {
            target: string(row.target),
            theme,
            scheme,
            source: row.source,
            run: string(row.run),
            date: string(row.date),
            digest: string(row.digest),
            tools: Object.fromEntries(
              Object.entries(object(row.tools)).map(([key, value]) => [key, string(value)]),
            ),
            configurations: totals.configurations!,
            flags: totals.flags!,
            tiers: Object.fromEntries(
              Object.entries(object(row.tiers)).map(([key, value]) => [key, counts(value)]),
            ),
            checks: Object.fromEntries(
              Object.entries(object(row.checks)).map(([key, value]) => [key, counts(value)]),
            ),
            details: array(row.details ?? []).map((value): CheckDetail => {
              const detail = object(value);
              return {
                tier: string(detail.tier),
                name: string(detail.name),
                criteria: array(detail.criteria).map(string),
                counts: counts(detail.counts),
              };
            }),
            axe: storedEngine(row.axe),
            ibm: storedEngine(row.ibm),
            findings: array(row.findings).map(string),
            notices: array(row.notices).map(string),
            warnings: array(row.warnings).map(string),
          };
        }),
      ]),
    ),
  };
}

function engine(value: unknown): Engine {
  const raw = object(value);
  if (raw.status !== "ran") throw new Error("Accessibility evidence: engine did not run");
  const reviewRules: Counts = {};
  const reviews = array(raw.incomplete);
  const violations = array(raw.violations);
  const violationRules: Counts = {};
  for (const violation of violations) {
    const item = object(violation);
    increment(violationRules, string(item.id ?? item.ruleId));
  }
  for (const review of reviews) {
    const item = object(review);
    increment(reviewRules, string(item.id ?? item.ruleId));
  }
  return { violations: violations.length, reviews: reviews.length, reviewRules, violationRules };
}

function addEngine(total: Engine, next: Engine): void {
  total.violations += next.violations;
  total.reviews += next.reviews;
  for (const [rule, count] of Object.entries(next.reviewRules))
    increment(total.reviewRules, rule, count);
  for (const [rule, count] of Object.entries(next.violationRules))
    increment(total.violationRules, rule, count);
}

function readTarget(
  value: unknown,
  metadata: Omit<
    AccessibilityEvidence,
    "configurations" | "tiers" | "axe" | "ibm" | "checks" | "details" | "flags" | "findings"
  >,
): AccessibilityEvidence {
  const target = object(value);
  if (target.status !== "ran")
    throw new Error(`Accessibility target did not run: ${metadata.target}`);
  const row: AccessibilityEvidence = {
    ...metadata,
    configurations: 0,
    tiers: {},
    axe: { violations: 0, reviews: 0, reviewRules: {}, violationRules: {} },
    ibm: { violations: 0, reviews: 0, reviewRules: {}, violationRules: {} },
    checks: {},
    details: [],
    flags: 0,
    findings: [],
  };
  const requested =
    row.source === "page"
      ? ["rules", "conditions", "vsr"]
      : ["rules", "conditions", "interactions", "computed", "vsr"];
  for (const archetype of Object.values(object(target.archetypes))) {
    const configs = array(object(archetype).configs);
    if (!configs.length) throw new Error(`No configurations: ${row.target}`);
    for (const [index, rawConfig] of configs.entries()) {
      row.configurations++;
      const tiers = object(object(rawConfig).tiers);
      for (const name of requested) {
        const tier = tiers[name] === undefined ? undefined : object(tiers[name]);
        const status = tier ? string(tier.status) : "missing";
        if (!["ran", "gap", "not-testable", "skipped", "missing"].includes(status))
          throw new Error(`Failed or invalid tier: ${row.target}/${name}: ${status}`);
        increment((row.tiers[name] ??= {}), status);
        if (status !== "ran") row.notices.push(`${row.target}/${index}/${name}: ${status}`);
        if (name === "rules" && tier) {
          const engines = object(tier.engines);
          addEngine(row.axe, engine(engines.axe));
          addEngine(row.ibm, engine(engines.ibm));
        } else if (name === "vsr" && tier?.status === "ran") {
          row.flags += array(tier.flags).length;
        } else if (tier?.status === "ran") {
          for (const rawCheck of array(tier.checks)) {
            const check = object(rawCheck);
            const result = string(check.result);
            if (!["pass", "fail", "not-applicable", "undetermined"].includes(result))
              throw new Error(`Unexpected check result: ${result}`);
            increment((row.checks[name] ??= {}), result);
            const checkName = string(check.name);
            let detail = row.details.find((item) => item.tier === name && item.name === checkName);
            if (!detail) {
              detail = {
                tier: name,
                name: checkName,
                criteria: array(check.criteria ?? []).map(string),
                counts: {},
              };
              row.details.push(detail);
            }
            increment(detail.counts, result);
            if (result === "fail" || result === "undetermined")
              row.findings.push(`${string(check.name)} (${result}): ${string(check.detail)}`);
          }
        }
      }
    }
  }
  if (!row.configurations) throw new Error(`No archetypes: ${row.target}`);
  return row;
}

/** Import an explicit complete run, omitting unsupported historical Canvas dark cases. */
export function importAccessibilityRun(directory: string): AccessibilitySnapshot {
  const coverage = object(JSON.parse(readFileSync(join(directory, "coverage.json"), "utf8")));
  const cases = new Map(
    array(coverage.cases).map((value) => {
      const item = object(value);
      return [
        string(item.id),
        {
          record: string(item.record),
          theme: string(item.theme),
          scheme: string(item.scheme),
        },
      ] as const;
    }),
  );
  const records: AccessibilitySnapshot["records"] = {};
  const seenSuites = new Set<string>();
  const seenTargets = new Set<string>();
  for (const rawSuite of array(coverage.evidence)) {
    const suite = object(rawSuite);
    const name = string(suite.directory);
    if (!/^(?:pages|npm)-[a-zA-Z0-9-]+$/u.test(name))
      throw new Error(`Invalid evidence directory: ${name}`);
    if (seenSuites.has(name)) throw new Error(`Duplicate evidence directory: ${name}`);
    seenSuites.add(name);
    if (suite.error) throw new Error(`Incomplete audit: ${name}`);
    const raw = readFileSync(join(directory, name, "results.json"), "utf8");
    readFileSync(join(directory, name, "report.md"), "utf8");
    const results = object(JSON.parse(raw));
    const tools = Object.fromEntries(
      Object.entries(object(results.tools)).map(([key, value]) => [key, string(value)]),
    );
    const targets = array(results.targets);
    const expected = array(suite.expected).map(string).sort();
    const actual = targets.map((target) => string(object(target).id)).sort();
    if (
      new Set(actual).size !== actual.length ||
      JSON.stringify(expected) !== JSON.stringify(actual)
    )
      throw new Error(`Incomplete target inventory: ${name}`);
    const notices = array(object(results.outcome).coverage).map(string);
    const warnings = array(results.warnings).map(string);
    for (const target of targets) {
      const id = string(object(target).id);
      if (seenTargets.has(id)) throw new Error(`Duplicate audit target: ${id}`);
      seenTargets.add(id);
      const item = cases.get(id.replace(/^npm-/u, ""));
      if (!item) throw new Error(`Unknown audit target: ${id}`);
      if (
        !AUDIT_MATRIX.some(
          ({ theme, scheme }) =>
            theme.toLowerCase() === item.theme.toLowerCase() && scheme === item.scheme,
        )
      )
        continue;
      const row = readTarget(target, {
        target: id,
        theme: item.theme,
        scheme: item.scheme,
        source: name.startsWith("npm-") ? "npm" : "page",
        run: basename(directory),
        date: string(results.runAt),
        tools,
        digest: createHash("sha256").update(raw).digest("hex"),
        warnings,
        notices: notices.filter(
          (notice) => notice.startsWith(`${id}/`) || notice.startsWith(`${id}:`),
        ),
      });
      Object.defineProperty(records, item.record, {
        value: [...(Object.hasOwn(records, item.record) ? records[item.record]! : []), row],
        enumerable: true,
        writable: true,
        configurable: true,
      });
    }
  }
  for (const id of cases.keys())
    if (!seenTargets.has(id) && !seenTargets.has(`npm-${id}`))
      throw new Error(`Incomplete case inventory: ${id}`);
  if (!Object.keys(records).length) throw new Error("No supported accessibility evidence");
  return {
    schema: 1,
    records: Object.fromEntries(Object.entries(records).sort(([a], [b]) => a.localeCompare(b))),
  };
}

function cell(value: string): string {
  return value
    .replace(/[\\[\]()*_!#~]/gu, "\\$&")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("|", "&#124;")
    .replaceAll("`", "&#96;")
    .replaceAll("\n", " ");
}

const TIERS = ["conditions", "interactions", "computed"] as const;

type Status = "pass" | "fail" | "review" | "na";

const PILL: Record<Status, { color: string; icon: string; label: () => string }> = {
  pass: { color: "-color-success", icon: "-icon-check", label: () => text.pass },
  fail: { color: "-color-danger", icon: "-icon-x", label: () => text.fail },
  review: { color: "-color-warning", icon: "-icon-circle-alert", label: () => text.review },
  na: { color: "", icon: "-icon-minus", label: () => text.notApplicable },
};

function pill(status: Status): string {
  const { color, icon, label } = PILL[status];
  return `<span class="${["instui-pill", color, icon, "pantoken-doc-tag"].filter(Boolean).join(" ")}">${label()}</span>`;
}

function tierLabel(tier: (typeof TIERS)[number]): string {
  return text[tier];
}

/** The matrix column a row belongs to; Canvas variants drop the redundant "light". */
function columnLabel(theme: string, scheme: string): string {
  const key = `${theme}/${scheme}` as keyof typeof text.columns;
  return Object.hasOwn(text.columns, key) ? text.columns[key] : `${cell(theme)} (${cell(scheme)})`;
}

function worst(counts: readonly Counts[]): Status {
  const total = (key: string): number => counts.reduce((sum, item) => sum + (item[key] ?? 0), 0);
  if (total("fail")) return "fail";
  if (total("undetermined")) return "review";
  if (total("pass")) return "pass";
  return total("not-applicable") ? "na" : "review";
}

function tierTable(
  tier: string,
  label: string,
  names: readonly string[],
  rows: readonly AccessibilityEvidence[],
): string[] {
  const out = [
    `| ${label} | ${AUDIT_MATRIX.map((item) => columnLabel(item.theme, item.scheme)).join(" | ")} |`,
    `| --- |${AUDIT_MATRIX.map(() => " --- |").join("")}`,
  ];
  for (const name of names) {
    const criteria = rows
      .flatMap((row) => row.details.filter((d) => d.tier === tier && d.name === name))
      .flatMap((detail) => detail.criteria);
    const heading = `<span class="pantoken-a11y-check">${cell(name)}</span>${
      criteria.length
        ? `<span class="pantoken-a11y-criteria">WCAG 2.2 ${[...new Set(criteria)].map(cell).join(", ")}</span>`
        : ""
    }`;
    const cells = AUDIT_MATRIX.map((item) =>
      pill(
        worst(
          rows
            .filter((row) => row.theme === item.theme && row.scheme === item.scheme)
            .flatMap((row) => row.details.filter((d) => d.tier === tier && d.name === name))
            .map((detail) => detail.counts),
        ),
      ),
    );
    out.push(`| ${heading} | ${cells.join(" | ")} |`);
  }
  return [...out, ""];
}

function screenReaderTable(rows: readonly AccessibilityEvidence[]): string[] {
  const cells = AUDIT_MATRIX.map((item) => {
    const matching = rows.filter((row) => row.theme === item.theme && row.scheme === item.scheme);
    if (!matching.some((row) => (row.tiers.vsr?.ran ?? 0) > 0)) return pill("review");
    return pill(matching.some((row) => row.flags > 0) ? "review" : "pass");
  });
  return [
    `| ${text.screenReader} | ${AUDIT_MATRIX.map((item) => columnLabel(item.theme, item.scheme)).join(" | ")} |`,
    `| --- |${AUDIT_MATRIX.map(() => " --- |").join("")}`,
    `| ${text.announcements} | ${cells.join(" | ")} |`,
    "",
  ];
}

/** Render facts, gaps, and provenance, without a heading, for the Accessibility section. */
export function accessibilitySection(name: string, snapshot: AccessibilitySnapshot): string {
  const rows = Object.hasOwn(snapshot.records, name) ? snapshot.records[name] : undefined;
  const lines: string[] = [];
  if (!rows?.length) return [...lines, text.notAudited, "", text.caveat, ""].join("\n");
  for (const warning of new Set(rows.flatMap((row) => row.warnings)))
    lines.push(`> ${cell(warning)}`, "");
  for (const tier of TIERS) {
    const names = [
      ...new Set(
        rows.flatMap((row) => row.details.filter((d) => d.tier === tier).map((d) => d.name)),
      ),
    ].sort();
    if (!names.length) continue;
    lines.push(...tierTable(tier, tierLabel(tier), names, rows));
  }
  lines.push(...screenReaderTable(rows), text.caveat, "");
  return lines.join("\n");
}

/**
 * Append the audit to the end of the page's `## Accessibility` section, creating that section before
 * consumed tokens (or related links/end) when the record has no `@accessibility` block.
 */
export function annotateAccessibility(
  entries: readonly { name: string; kind: string }[],
  pages: readonly string[],
  snapshot: AccessibilitySnapshot,
): void {
  entries.forEach((entry, index) => {
    if (entry.kind !== "component" && !snapshot.records[entry.name]) return;
    const path = pages[index];
    if (!path) throw new Error(`Missing CSS API page: ${entry.name}`);
    let md = readFileSync(path, "utf8");
    md = md.replace(
      /<!-- accessibility-audit:start -->[\s\S]*?<!-- accessibility-audit:end -->\n*/u,
      "",
    );
    const section = `<!-- accessibility-audit:start -->\n${accessibilitySection(entry.name, snapshot)}\n<!-- accessibility-audit:end -->\n\n`;
    const heading = /^## Accessibility\s*$/mu.exec(md);
    const next = (from: number): number => {
      const match = /^## /mu.exec(md.slice(from));
      return match ? from + match.index : -1;
    };
    if (heading) {
      const end = next(heading.index + heading[0].length);
      const head = end === -1 ? md.trimEnd() : md.slice(0, end).trimEnd();
      md = `${head}\n\n${section}${end === -1 ? "" : md.slice(end)}`;
    } else {
      const position = md.search(/^## (?:Tokens consumed|See also)\s*$/mu);
      const created = `## Accessibility\n\n${section}`;
      md =
        position === -1
          ? `${md.trimEnd()}\n\n${created}`
          : `${md.slice(0, position)}${created}${md.slice(position)}`;
    }
    writeFileSync(path, md);
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3)
    throw new Error("Usage: node docs/scripts/accessibility-evidence.ts <audit-run-directory>");
  const snapshot = importAccessibilityRun(resolve(process.argv[2]!));
  const destination = join(import.meta.dirname, "../public/accessibility/results.json");
  writeFileSync(destination, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(
    `Wrote accessibility evidence for ${Object.keys(snapshot.records).length} records: ${destination}`,
  );
}
