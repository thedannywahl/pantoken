import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vite-plus/test";
import { collectUnits, segmentMarkdown } from "./segment-markdown.ts";
import {
  accessibilitySection,
  annotateAccessibility,
  importAccessibilityRun,
  loadAccessibilitySnapshot,
} from "./accessibility-evidence.ts";
import snapshotJson from "../public/accessibility/results.json" with { type: "json" };

const directories: string[] = [];
function temp(): string {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-evidence-"));
  directories.push(directory);
  return directory;
}
afterEach(() => {
  for (const directory of directories.splice(0))
    rmSync(directory, { recursive: true, force: true });
});

function fixture(source: "page" | "npm" = "page", scheme = "light", theme = "rebrand") {
  const directory = temp();
  const id = `button-1-${theme}-${scheme}`;
  const targetId = source === "npm" ? `npm-${id}` : id;
  const suite = source === "npm" ? "npm-button" : `pages-${theme}-${scheme}`;
  const engine = {
    status: "ran",
    violations: [{ id: "example-violation" }],
    incomplete: [{ ruleId: "example-review" }],
  };
  const config = {
    libA11y: "n/a",
    tiers: {
      rules: { status: "ran", engines: { axe: engine, ibm: { ...engine, violations: [] } } },
      conditions: {
        status: "ran",
        checks: [
          {
            name: "reflow",
            criteria: ["1.4.10"],
            result: "fail",
            detail: 'Overflow <script>alert("x")</script> | [x](javascript:alert(1))',
          },
          { name: "spacing", result: "undetermined", detail: "No measurable text" },
          { name: "motion", result: "not-applicable", detail: "No motion" },
          { name: "contrast", result: "pass", detail: "Measured" },
        ],
      },
      vsr: { status: "ran", flags: [{ type: "unnamed-control" }] },
    },
  };
  const results = {
    runAt: "2026-10-28T03:00:00.000Z",
    tools: { automatica11y: "0.11.0", chromium: "156" },
    warnings: ["Outdated browser: results may be unreliable"],
    outcome: { coverage: [`${targetId}/page/0/conditions: undetermined`] },
    targets: [{ id: targetId, status: "ran", archetypes: { [source]: { configs: [config] } } }],
  };
  const coverage = {
    cases: [{ id, record: "button", theme, scheme }],
    evidence: [{ directory: suite, expected: [targetId], completed: [targetId] }],
  };
  mkdirSync(join(directory, suite));
  const save = () => {
    writeFileSync(join(directory, "coverage.json"), JSON.stringify(coverage));
    writeFileSync(join(directory, suite, "results.json"), JSON.stringify(results));
    writeFileSync(join(directory, suite, "report.md"), "Original report");
  };
  save();
  return { directory, suite, results, coverage, save };
}

test("imports exact authored targets, preserves separate engine/check results and source digests", () => {
  const input = fixture();
  const snapshot = importAccessibilityRun(input.directory);
  expect(snapshot.records.button).toHaveLength(1);
  const row = snapshot.records.button![0]!;
  expect(row).toMatchObject({
    source: "page",
    configurations: 1,
    flags: 1,
    axe: { violations: 1, reviews: 1, violationRules: { "example-violation": 1 } },
    ibm: { violations: 0, reviews: 1 },
    checks: { conditions: { pass: 1, fail: 1, undetermined: 1, "not-applicable": 1 } },
  });
  expect(row.digest).toMatch(/^[a-f0-9]{64}$/u);
  expect(row.warnings).toContain("Outdated browser: results may be unreliable");
  expect(loadAccessibilitySnapshot(JSON.parse(JSON.stringify(snapshot)))).toEqual(snapshot);
});

test("keeps missing supplemental npm tiers visible instead of turning them into passes", () => {
  const input = fixture("npm");
  const snapshot = importAccessibilityRun(input.directory);
  expect(snapshot.records.button![0]!.tiers.interactions).toEqual({ missing: 1 });
  const md = accessibilitySection("button", snapshot);
  expect(md).not.toContain("| Interactions |");
  expect(md).toContain("Manual review needed");
});

test("excludes historical Canvas dark cases without modifying original evidence", () => {
  for (const theme of ["canvas", "canvasHighContrast"]) {
    const input = fixture("page", "dark", theme);
    const original = readFileSync(join(input.directory, input.suite, "results.json"), "utf8");
    expect(() => importAccessibilityRun(input.directory)).toThrow("No supported");
    expect(readFileSync(join(input.directory, input.suite, "results.json"), "utf8")).toBe(original);
  }
});

test("rejects incomplete inventories, failed engines/checks, and malformed input", () => {
  const input = fixture();
  input.coverage.evidence[0]!.expected.push("missing");
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("inventory");
  input.coverage.evidence[0]!.expected.pop();
  input.results.targets[0]!.archetypes.page!.configs[0]!.tiers.rules.engines.axe.status = "failed";
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("engine did not run");
  input.results.targets[0]!.archetypes.page!.configs[0]!.tiers.rules.engines.axe.status = "ran";
  input.results.targets[0]!.archetypes.page!.configs[0]!.tiers.conditions.checks[0]!.result =
    "error";
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("Unexpected check result");
  input.coverage.evidence[0]!.directory = "../outside";
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("Invalid evidence directory");
});

test("validates snapshot version, sources, counts, and supported themes at the docs boundary", () => {
  const value = importAccessibilityRun(fixture().directory);
  expect(() => loadAccessibilitySnapshot({ schema: 2, records: {} })).toThrow("schema");
  expect(() => loadAccessibilitySnapshot({ schema: 1, records: null })).toThrow("object");
  const row = value.records.button![0]!;
  for (const patch of [
    { flags: -1 },
    { flags: 1.5 },
    { source: "guessed" },
    { theme: "canvas", scheme: "dark" },
  ])
    expect(() =>
      loadAccessibilitySnapshot({ schema: 1, records: { button: [{ ...row, ...patch }] } }),
    ).toThrow();
});

test("rejects omitted suites, duplicate suites, and targets that didn't run", () => {
  const input = fixture();
  input.coverage.evidence.push(input.coverage.evidence[0]!);
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("Duplicate evidence directory");
  input.coverage.evidence.pop();
  input.coverage.cases.push({ ...input.coverage.cases[0]!, id: "missing-case" });
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("Incomplete case inventory");
  input.coverage.cases.pop();
  input.results.targets[0]!.status = "failed";
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("target did not run");
  input.results.targets[0]!.status = "ran";
  input.results.targets[0]!.archetypes.page!.configs[0]!.tiers.conditions.status = "error";
  input.save();
  expect(() => importAccessibilityRun(input.directory)).toThrow("invalid tier");
});

test("doesn't confuse inherited object keys with record or rule evidence", () => {
  const input = fixture();
  input.coverage.cases[0]!.record = "constructor";
  input.results.targets[0]!.archetypes.page!.configs[0]!.tiers.rules.engines.axe.incomplete[0]!.ruleId =
    "__proto__";
  input.save();
  const snapshot = importAccessibilityRun(input.directory);
  expect(snapshot.records.constructor).toHaveLength(1);
  expect(Object.values(snapshot.records)[0]![0]!.axe.reviewRules.__proto__).toBe(1);
  expect(accessibilitySection("toString", snapshot)).toContain("Not audited");
});

test("renders provenance, separate findings, missing coverage, and escaped data without a score", () => {
  const md = accessibilitySection("button", importAccessibilityRun(fixture().directory));
  expect(md).toContain('<table class="pantoken-a11y-table">');
  expect(md).toContain(
    '<thead><tr><th scope="col">Conditions</th><th scope="col">Rebrand (light)</th><th scope="col">Rebrand (dark)</th><th scope="col">Canvas</th><th scope="col">Canvas High Contrast</th></tr></thead>',
  );
  expect(md).toContain(
    '<tr><th scope="row" rowspan="2"><span class="pantoken-a11y-check">reflow</span><span class="pantoken-a11y-criteria">WCAG 2.2 1.4.10</span></th><td><span class="instui-pill -color-danger -icon-x pantoken-doc-tag">Fail</span></td>',
  );
  expect(md).toContain(
    '<tr><th scope="row" rowspan="2"><span class="pantoken-a11y-check">spacing</span></th><td><span class="instui-pill -color-warning -icon-circle-alert pantoken-doc-tag">Manual review needed</span></td>',
  );
  expect(md).toContain('<td colspan="4" class="pantoken-a11y-details">');
  expect(md).toContain("<strong>Rebrand (light):</strong> Overflow &lt;script&gt;");
  expect(md).toContain("No measurable text");
  expect(md).toContain(
    '<tr><th scope="row" rowspan="2"><span class="pantoken-a11y-check">contrast</span></th><td><span class="instui-pill -color-success -icon-check pantoken-doc-tag">Pass</span></td>',
  );
  expect(md).toContain(
    "<strong>Rebrand (dark), Canvas, Canvas High Contrast:</strong> No result was recorded",
  );
  expect(md).toContain(
    '<span class="instui-pill -icon-minus pantoken-doc-tag">Not applicable</span>',
  );
  expect(md).toContain('<span class="pantoken-a11y-check">Announcements</span>');
  expect(md).toContain('<th scope="col">Rules (axe-core)</th>');
  expect(md).toContain('<span class="pantoken-a11y-check">example-violation</span>');
  expect(md).toContain('<span class="pantoken-a11y-check">example-review</span>');
  expect(md).not.toMatch(/^\|/mu);
  expect(md).not.toMatch(/\n\n(?=<tr|<\/tr|<td|<th)/u);
  expect(md).not.toContain("IBM");
  expect(md).not.toContain("exact source revision");
  expect(md).not.toContain("Historical automated evidence");
  expect(md).not.toContain("Supported schemes");
  expect(md).toContain("These automated results do not establish");
  expect(md).not.toContain("Evidence details");
  expect(md).not.toContain("results.json");
  expect(md).not.toContain("isn't equivalent");
  expect(md.indexOf("Outdated browser")).toBeLessThan(md.indexOf("<table"));
  expect(md).not.toContain("<script>");
  expect(md).not.toContain("score");
  const units = collectUnits(segmentMarkdown(md));
  expect(units.some((unit) => unit.text.includes("These automated results do not establish"))).toBe(
    true,
  );
});

test("creates the Accessibility section before consumed tokens, is idempotent, and doesn't borrow another record's evidence", () => {
  const input = fixture();
  const snapshot = importAccessibilityRun(input.directory);
  const page = join(input.directory, "page.md");
  writeFileSync(page, "# CSS: agent-shell\n\n## Tokens consumed\n\nTokens\n");
  const entries = [{ name: "agent-shell", kind: "component" }];
  annotateAccessibility(entries, [page], snapshot);
  const first = readFileSync(page, "utf8");
  expect(first).toContain("Not audited");
  expect(first).not.toContain("<table");
  expect(first).not.toContain("## Accessibility audit");
  expect(first.indexOf("## Accessibility\n")).toBeLessThan(first.indexOf("## Tokens consumed"));
  annotateAccessibility(entries, [page], snapshot);
  expect(readFileSync(page, "utf8")).toBe(first);
  expect(accessibilitySection("toString", snapshot)).toContain("Not audited");
});

test("appends the audit to an authored Accessibility section without a second header", () => {
  const input = fixture();
  const snapshot = importAccessibilityRun(input.directory);
  const page = join(input.directory, "page.md");
  writeFileSync(
    page,
    "# CSS: button\n\n## Conditions\n\nC\n\n## Accessibility\n\nAuthored guidance.\n\n## Tokens consumed\n\nTokens\n",
  );
  const entries = [{ name: "button", kind: "component" }];
  annotateAccessibility(entries, [page], snapshot);
  const first = readFileSync(page, "utf8");
  expect(first.match(/^## Accessibility\s*$/gmu)).toHaveLength(1);
  expect(first).not.toContain("## Accessibility audit");
  expect(first.indexOf("Authored guidance.")).toBeLessThan(first.indexOf("<table"));
  expect(first.indexOf("<table")).toBeLessThan(first.indexOf("## Tokens consumed"));
  annotateAccessibility(entries, [page], snapshot);
  expect(readFileSync(page, "utf8")).toBe(first);
  writeFileSync(page, "# CSS: button\n\n## Accessibility\n\nLast section.\n");
  annotateAccessibility(entries, [page], snapshot);
  expect(readFileSync(page, "utf8")).toMatch(
    /Last section\.\n\n<!-- accessibility-audit:start -->/u,
  );
});

test("handles pages without tokens and skips unrelated unaudited utilities", () => {
  const input = fixture();
  const page = join(input.directory, "page.md");
  writeFileSync(page, "# CSS: button\n\n## See also\n");
  const snapshot = importAccessibilityRun(input.directory);
  annotateAccessibility([{ name: "button", kind: "component" }], [page], snapshot);
  expect(readFileSync(page, "utf8").indexOf("## Accessibility\n")).toBeLessThan(
    readFileSync(page, "utf8").indexOf("## See also"),
  );
  writeFileSync(page, "# Rule\n");
  annotateAccessibility([{ name: "base", kind: "rule" }], [page], snapshot);
  expect(readFileSync(page, "utf8")).toBe("# Rule\n");
  annotateAccessibility([{ name: "button", kind: "component" }], [page], snapshot);
  expect(readFileSync(page, "utf8")).toContain("## Accessibility\n");
  expect(() =>
    annotateAccessibility([{ name: "button", kind: "component" }], [], snapshot),
  ).toThrow("Missing CSS API page");
});

test("checked-in evidence has supported coverage and retains real review/failure gaps", () => {
  const snapshot = loadAccessibilitySnapshot(snapshotJson);
  expect(Object.keys(snapshot.records)).toHaveLength(76);
  expect(snapshot.records.badge).toHaveLength(4);
  expect(snapshot.records.alert).toHaveLength(8);
  expect(snapshot.records.badge!.every((row) => (row.checks.conditions?.fail ?? 0) === 0)).toBe(
    true,
  );
  expect(snapshot.records.avatar!.some((row) => (row.checks.conditions?.fail ?? 0) > 0)).toBe(true);
  expect(snapshot.records.alert!.some((row) => (row.checks.conditions?.fail ?? 0) > 0)).toBe(true);
  expect(snapshot.records["agent-shell"]).toBeUndefined();
});
