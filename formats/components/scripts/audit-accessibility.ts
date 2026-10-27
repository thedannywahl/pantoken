/**
 * Audit authored component examples against locally built styles. Findings are advisory;
 * incomplete execution is an error. Run through the uncached accessibility task.
 * @module
 */
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCssDocs, type CssDocEntry } from "@cssdoc/core";
import { resolveExampleTargets } from "@pantoken/utils/example-targets";
import { Window } from "happy-dom";
import { COMPONENTS } from "../src/components/index.ts";
import { focus } from "../src/declarations/focus/index.ts";

const packageRoot = resolve(import.meta.dirname, "..");
const repositoryRoot = resolve(packageRoot, "../..");
const cli = join(
  dirname(fileURLToPath(import.meta.resolve("automatica11y/package.json"))),
  "bin/automatica11y.js",
);

/** Every explicitly selected, authored example. */
export interface AuditExample {
  record: string;
  index: number;
  html: string;
}

/** One independent theme and color-scheme case. */
export interface AuditCase extends AuditExample {
  id: string;
  theme: string;
  scheme: "light" | "dark";
}

/** Original evidence retained for one CLI invocation. */
export interface AuditEvidence {
  directory: string;
  expected: string[];
  completed: string[];
  error?: string;
}

/** Normalize only class tokens in trusted authored HTML, never text or script contents. */
export function exampleHtml(example: string): string {
  const fences = [...example.matchAll(/```html[^\n]*\n([\s\S]*?)```/gu)];
  const markup = fences.length
    ? fences.map((match) => match[1]).join("\n")
    : example.replace(/^(?:-[a-z][a-z0-9-]*[ \t]*)+\r?\n/u, "");
  const window = new Window();
  window.document.body.innerHTML = markup;
  for (const element of window.document.querySelectorAll("[class]")) {
    for (const name of Array.from(element.classList)) {
      if (name.startsWith("pfx-")) element.classList.replace(name, `instui-${name.slice(4)}`);
    }
  }
  const html = window.document.body.innerHTML.trim();
  if (!html || window.document.body.children.length === 0) throw new Error("Empty audit markup");
  void window.happyDOM.abort();
  return html;
}

/** Require complete explicit coverage without changing audience fallback behavior. */
export function collectExamples(
  entries: readonly CssDocEntry[],
  required: readonly string[],
): AuditExample[] {
  const examples: AuditExample[] = [];
  for (const name of required) {
    const records = entries.filter((entry) => entry.name === name);
    if (records.length !== 1)
      throw new Error(`Expected one model record for ${name}; found ${records.length}`);
    const entry = records[0]!;
    const selected = resolveExampleTargets(entry.examples).automatica11y;
    if (!selected.length) throw new Error(`Missing -automatica11y example: ${name}`);
    for (const index of selected)
      examples.push({ record: name, index, html: exampleHtml(entry.examples[index]!) });
  }
  return examples;
}

/** Expand every example over all shipped themes and both explicitly forced schemes. */
export function expandCases(examples: readonly AuditExample[]): AuditCase[] {
  return ["rebrand", "canvas", "canvasHighContrast"].flatMap((theme) =>
    (["light", "dark"] as const).flatMap((scheme) =>
      examples.map((example) => ({
        ...example,
        id: `${example.record}-${example.index}-${theme}-${scheme}`.toLowerCase(),
        theme,
        scheme,
      })),
    ),
  );
}

/** Use the production IIFE bundles for any interactive classes in a fixture. */
export function behaviorNames(html: string): string[] {
  const candidates = ["modal", "tabs", "tooltip", "close-button", "in-place-edit", "drawer-layout"];
  return candidates.filter((name) =>
    new RegExp(`class="[^"]*\\binstui-${name}\\b`, "u").test(html),
  );
}

const escapeText = (text: string): string =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

/** Render an isolated page using packaged styles and assets, not a documentation-site cascade. */
export function renderPage(item: AuditCase): string {
  const styles = [
    "tokens/scope.css",
    "tokens/schemes.css",
    "components/base.css",
    "components/components.css",
    "components/utilities.css",
    "components/icons.css",
    "components/fonts.css",
  ];
  return `<!doctype html>
<html lang="en" data-pantoken-theme="${item.theme}" data-pantoken-scheme="${item.scheme}" style="color-scheme:${item.scheme}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(item.id)}</title>
${styles.map((path) => `<link rel="stylesheet" href="../assets/${path}">`).join("\n")}
<style>body{padding:1rem}</style></head>
<body><main aria-label="${escapeText(item.record)} example">${item.html}</main>
${behaviorNames(item.html)
  .map((name) => `<script src="../assets/interactions/${name}.iife.js"></script>`)
  .join("\n")}
</body></html>\n`;
}

/** Reject failed or missing targets even though findings themselves don't change the exit code. */
export function completedTargets(value: unknown, expected: readonly string[]): string[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("targets" in value) ||
    !Array.isArray(value.targets)
  ) {
    throw new Error("Invalid results.json: missing targets");
  }
  const completed: string[] = [];
  for (const target of value.targets) {
    if (!target || typeof target !== "object" || typeof target.id !== "string")
      throw new Error("Invalid target result");
    if (target.status !== "ran")
      throw new Error(`Target ${target.id}: ${target.reason ?? target.status}`);
    completed.push(target.id);
  }
  if (
    new Set(completed).size !== completed.length ||
    [...completed].sort().join("\n") !== [...expected].sort().join("\n")
  ) {
    throw new Error("Result coverage doesn't match the expected target inventory");
  }
  return completed;
}

/** Run a subprocess without a shell and preserve errors, including launch failures. */
export function execute(command: string, args: string[], cwd: string = packageRoot): void {
  const result = spawnSync(command, args, { cwd, stdio: "inherit", timeout: 1_800_000 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited ${result.status ?? result.signal}`);
}

/** Keep a human-readable index alongside the tool's unmodified reports. */
export function writeIndex(
  out: string,
  evidence: readonly AuditEvidence[],
  cases: readonly AuditCase[],
): void {
  writeFileSync(join(out, "coverage.json"), `${JSON.stringify({ cases, evidence }, null, 2)}\n`);
  const lines = [
    "# Component accessibility audit",
    "",
    "WCAG 2.2 AA; axe-core and IBM Equal Access. Results are a snapshot, not certification.",
    "These automated results do not establish that the page meets WCAG; manual review is still needed.",
    "",
    `Expected page cases: ${cases.length}. Completed targets: ${evidence.reduce((sum, item) => sum + item.completed.length, 0)}.`,
    "",
    "| Suite | Completed / expected | Evidence | Error |",
    "| --- | --- | --- | --- |",
    ...evidence.map(
      (item) =>
        `| ${item.directory} | ${item.completed.length} / ${item.expected.length} | [Report](${item.directory}/report.md), [results](${item.directory}/results.json) | ${item.error ? escapeText(item.error).replaceAll("|", "\\|") : "None"} |`,
    ),
    "",
    "Page targets run rules, conditions, and simulated screen-reader checks. They don't run archetype interaction or computed checks.",
    "Hidden/closed surfaces and unsupported checks aren't passes. Read the original reports for gaps, warnings, and engine-specific findings.",
    "Meaningful alt text, context, cognitive load, real focus/reading order, and real screen readers still need manual review.",
  ];
  writeFileSync(join(out, "index.md"), `${lines.join("\n")}\n`);
}

/** Execute one report-producing invocation and validate its exact result inventory. */
export function auditInvocation(
  out: string,
  directory: string,
  targets: string[],
  options: string[],
  run: typeof execute = execute,
): AuditEvidence {
  const expected = targets.map((target) => target.slice(0, target.indexOf("=")));
  const evidence: AuditEvidence = { directory, expected, completed: [] };
  const destination = join(out, directory);
  try {
    run(process.execPath, [
      cli,
      targets.length === 1 ? "audit" : "compare",
      ...targets,
      "--wcag",
      "2.2",
      "--level",
      "AA",
      "--engine",
      "axe,ibm",
      "--out",
      destination,
      ...options,
    ]);
    readFileSync(join(destination, "report.md"), "utf8");
    evidence.completed = completedTargets(
      JSON.parse(readFileSync(join(destination, "results.json"), "utf8")),
      expected,
    );
  } catch (error) {
    evidence.error = error instanceof Error ? error.message : String(error);
    console.error(`Audit ${directory} incomplete: ${evidence.error}`);
  }
  return evidence;
}

/** Build the complete page suite and retain its original reports in a unique local directory. */
export function runPageAudits(
  record?: string,
  run: typeof execute = execute,
  root: string = repositoryRoot,
): string {
  const definitions = [...COMPONENTS, focus];
  if (record && !definitions.some((entry) => entry.name === record))
    throw new Error(`Unknown record: ${record}`);
  const entries = definitions.flatMap((definition) => parseCssDocs(definition.rules("instui-")));
  const examples = collectExamples(
    entries,
    definitions.filter((entry) => !record || entry.name === record).map((entry) => entry.name),
  );
  const cases = expandCases(examples);
  const out = join(root, "a11y-report", new Date().toISOString().replaceAll(":", "-"));
  mkdirSync(join(out, "pages"), { recursive: true });
  const assets = join(out, "assets");
  for (const [source, destination] of [
    ["formats/components/dist", "components"],
    ["formats/components/assets", "assets"],
    ["formats/css/dist", "tokens"],
    ["formats/interactions/dist", "interactions"],
  ])
    cpSync(join(root, source), join(assets, destination), { recursive: true });
  for (const item of cases) writeFileSync(join(out, "pages", `${item.id}.html`), renderPage(item));
  const groups = Array.from(new Set(cases.map((item) => `${item.theme}-${item.scheme}`)));
  const evidence: AuditEvidence[] = groups.map((group) => ({
    directory: `pages-${group}`,
    expected: cases
      .filter((item) => `${item.theme}-${item.scheme}` === group)
      .map((item) => item.id),
    completed: [],
    error: "Not run",
  }));
  try {
    writeIndex(out, evidence, cases);
    run(process.execPath, [cli, "--version"]);
    run(process.execPath, [cli, "doctor"]);
    for (const [index, group] of groups.entries()) {
      const targets = cases
        .filter((item) => `${item.theme}-${item.scheme}` === group)
        .map((item) => `${item.id}=${join(out, "pages", `${item.id}.html`)}`);
      evidence[index] = auditInvocation(
        out,
        `pages-${group}`,
        targets,
        ["--tiers", "rules,conditions,vsr"],
        run,
      );
      writeIndex(out, evidence, cases);
      if (evidence[index]!.error) break;
    }
  } catch (error) {
    evidence.push({ directory: "setup", expected: [], completed: [], error: String(error) });
  } finally {
    writeIndex(out, evidence, cases);
  }
  console.log(`Accessibility evidence: ${join(out, "index.md")}`);
  if (evidence.some((item) => item.error))
    throw new Error(`Incomplete accessibility audit; see ${out}`);
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== "--record"))
      throw new Error("Usage: audit-accessibility.ts [--record <name>]");
    runPageAudits(args[1]);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
