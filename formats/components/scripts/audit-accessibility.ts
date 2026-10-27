/**
 * Audit authored component examples against locally built styles. Findings are advisory;
 * incomplete execution is an error. Run through the uncached accessibility task.
 * @module
 */
import { spawn, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCssDocs, type CssDocEntry } from "@cssdoc/core";
import { resolveExampleTargets, stripExampleMetadata } from "@pantoken/utils/example-targets";
import { Window } from "happy-dom";
import { COMPONENTS } from "../src/components/index.ts";
import { focus } from "../src/declarations/focus/index.ts";
import {
  loadWorkspacePackages,
  type WorkspacePackages,
} from "../../../scripts/release/workspace-packages.ts";

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
  gaps?: number;
  coverage?: AuditCoverage;
}

/** Per-state tier execution and diagnostic notices, separate from engine findings. */
export interface AuditCoverage {
  notices: string[];
  configurations: {
    target: string;
    archetype: string;
    index: number;
    state: string;
    tiers: Record<string, string>;
  }[];
}

/** Semantic archetypes supported by automatica11y, mapped to actual authored records. */
export const ARCHETYPES: Readonly<Record<string, string>> = {
  button: "button",
  link: "link",
  dialog: "modal",
  menu: "menu",
  tabs: "tabs",
  "form-field": "form-field",
  accordion: "toggle-details",
  tooltip: "tooltip",
  "live-region": "alert",
};

/** Normalize only class tokens in trusted authored HTML, never text or script contents. */
export function exampleHtml(example: string): string {
  const fences: string[] = [];
  let cursor = 0;
  while (cursor < example.length) {
    const start = example.indexOf("```html", cursor);
    if (start < 0) break;
    const newline = example.indexOf("\n", start + 7);
    if (newline < 0) break;
    const end = example.indexOf("```", newline + 1);
    if (end < 0) break;
    fences.push(example.slice(newline + 1, end));
    cursor = end + 3;
  }
  const markup = fences.length ? fences.join("\n") : stripExampleMetadata(example);
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
  const candidates = [
    "modal",
    "tabs",
    "tooltip",
    "close-button",
    "in-place-edit",
    "drawer-layout",
    "tree-browser",
    "form-field",
  ];
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
${styles.map((path) => `<link rel="stylesheet" href="assets/${path}">`).join("\n")}
<style>body{padding:1rem}</style></head>
<body><main aria-label="${escapeText(item.record)} example">${item.html}</main>
${behaviorNames(item.html)
  .map((name) => `<script src="assets/interactions/${name}.iife.js"></script>`)
  .join("\n")}
<script>
// The page suite measures expanded surfaces; npm fixtures retain their initial state.
for (const dialog of document.querySelectorAll("dialog")) if (!dialog.open) dialog.showModal();
for (const popover of document.querySelectorAll("[popover]")) popover.showPopover();
for (const details of document.querySelectorAll("details")) details.open = true;
document.querySelector(".instui-tooltip [data-a11y-trigger]")?.focus();
document.addEventListener("DOMContentLoaded", () => {
  for (const row of document.querySelectorAll('.instui-tree-browser [role="treeitem"][aria-expanded="false"]')) {
    row.querySelector(".item")?.click();
  }
  for (const control of document.querySelectorAll('.instui-form-field[data-native-validation] input[data-a11y-trigger][required]')) {
    control.value = "";
    control.checkValidity();
  }
});
</script>
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

/** Keep undetermined/not-testable coverage separate and reject nested execution errors. */
export function inspectChecks(value: unknown): number {
  if (!value || typeof value !== "object") return 0;
  if (
    ("status" in value && value.status === "failed") ||
    ("result" in value && value.result === "error")
  ) {
    throw new Error(
      `Audit check failed: ${"reason" in value ? String(value.reason) : "see original report"}`,
    );
  }
  const gap =
    ("status" in value && ["gap", "not-testable", "skipped"].includes(String(value.status))) ||
    ("result" in value && value.result === "undetermined");
  return (
    Number(gap) +
    Object.values(value).reduce<number>((sum, child: unknown) => sum + inspectChecks(child), 0)
  );
}

function coverageObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid coverage object in results.json");
  return Object.fromEntries(Object.entries(value));
}

function coverageStrings(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || !value.every((item): item is string => typeof item === "string"))
    throw new Error("Invalid coverage notices in results.json");
  return value;
}

function coverageReason(value: unknown, fallback: string): string {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "string") throw new Error("Invalid coverage reason");
  return value;
}

/** Retain original notices and expose requested tier coverage for every configuration. */
export function collectCoverage(value: unknown, requested: readonly string[]): AuditCoverage {
  const results = coverageObject(value);
  const notices = new Set(
    coverageStrings(
      results.outcome === undefined ? undefined : coverageObject(results.outcome).coverage,
    ),
  );
  const configurations: AuditCoverage["configurations"] = [];
  if (!Array.isArray(results.targets)) throw new Error("Invalid coverage targets");
  for (const rawTarget of results.targets) {
    const target = coverageObject(rawTarget);
    if (typeof target.id !== "string") throw new Error("Invalid coverage target ID");
    const summary = target.summary === undefined ? {} : coverageObject(target.summary);
    for (const reason of [
      ...coverageStrings(summary.gaps),
      ...coverageStrings(summary.notTestable),
    ])
      notices.add(`${target.id}: ${reason}`);
    const start = configurations.length;
    for (const [name, rawArchetype] of Object.entries(
      target.archetypes === undefined ? {} : coverageObject(target.archetypes),
    )) {
      const archetype = coverageObject(rawArchetype);
      if (archetype.status === "gap")
        notices.add(`${target.id}/${name}: ${coverageReason(archetype.reason, "fixture gap")}`);
      if (archetype.configs !== undefined && !Array.isArray(archetype.configs))
        throw new Error("Invalid coverage configurations");
      for (const [index, rawConfig] of (archetype.configs ?? []).entries()) {
        const config = coverageObject(rawConfig);
        const tiers = coverageObject(config.tiers);
        const statuses: Record<string, string> = {};
        for (const tierName of new Set([...requested, ...Object.keys(tiers)])) {
          const location = `${target.id}/${name}/${index}/${tierName}`;
          if (tiers[tierName] === undefined) {
            statuses[tierName] = "missing";
            notices.add(`${location}: missing requested tier`);
            continue;
          }
          const tier = coverageObject(tiers[tierName]);
          const status = typeof tier.status === "string" ? tier.status : "missing status";
          statuses[tierName] = status;
          if (["gap", "not-testable", "skipped", "failed", "missing status"].includes(status))
            notices.add(`${location}: ${coverageReason(tier.reason, status)}`);
          for (const reason of coverageStrings(tier.notTestable))
            notices.add(`${location}: ${reason}`);
        }
        configurations.push({
          target: target.id,
          archetype: name,
          index,
          state: typeof config.state === "string" ? config.state : "Not reported",
          tiers: statuses,
        });
      }
    }
    if (configurations.length === start) notices.add(`${target.id}: no executable configurations`);
  }
  return { notices: [...notices], configurations };
}

/** Require authored npm provenance instead of accepting a native template or generated guess. */
export function authoredTargets(
  value: unknown,
  expected: readonly string[],
  archetype: string,
): string[] {
  const completed = completedTargets(value, expected);
  if (!value || typeof value !== "object" || !("targets" in value) || !Array.isArray(value.targets))
    throw new Error("Missing npm targets");
  for (const target of value.targets) {
    const result = target.archetypes?.[archetype];
    if (result?.status !== "ran" || result?.fixture?.source !== "authored") {
      throw new Error(`Target ${target.id}: ${archetype} didn't run an authored fixture`);
    }
  }
  return completed;
}

/** Run a subprocess without a shell and preserve errors, including launch failures. */
export function execute(command: string, args: string[], cwd: string = packageRoot): void {
  const result = spawnSync(command, args, { cwd, stdio: "inherit", timeout: 1_800_000 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited ${result.status ?? result.signal}`);
}

/** Run report batches asynchronously with explicit launch and exit failures. */
export function executeAsync(
  command: string,
  args: string[],
  cwd: string = packageRoot,
): Promise<void> {
  return new Promise((resolveCommand, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", timeout: 1_800_000 });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolveCommand();
      else reject(new Error(`${command} exited ${code ?? signal}`));
    });
  });
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
    "| Suite | Completed / expected | Explicit gaps / undetermined | Coverage notices | Evidence | Error |",
    "| --- | --- | --- | --- | --- | --- |",
    ...evidence.map(
      (item) =>
        `| ${item.directory} | ${item.completed.length} / ${item.expected.length} | ${item.gaps ?? "Not measured"} | ${item.coverage?.notices.length ?? "Not measured"} | [Report](${item.directory}/report.md), [results](${item.directory}/results.json) | ${item.error ? escapeText(item.error).replaceAll("|", "\\|") : "None"} |`,
    ),
    "",
    "Page targets run rules, conditions, and simulated screen-reader checks. Authored npm archetypes additionally run interaction and computed checks.",
    "Page fixtures expand dialogs, native popovers, disclosures, and ARIA-tree collections, reveal required form-field errors through native validation, and focus tooltip triggers. Npm fixtures preserve authored initial states and exercise production behavior.",
    `Supported npm archetypes: ${Object.keys(ARCHETYPES).join(", ")}. No documented combobox or chart contract is claimed.`,
    "Hidden/closed surfaces and unsupported checks aren't passes. Read the original reports for gaps, warnings, and engine-specific findings.",
    "Coverage notices are diagnostic entries, not unique defects. They can overlap explicit gaps/undetermined checks; don't add these counts together.",
    "Target completion doesn't imply every requested tier ran in every state. Supplemental npm states in automatica11y 0.11.0 run rules/VSR only; interaction, computed, and condition checks use fresh pages and are attached to the initial configuration.",
    "",
    ...evidence.flatMap((item) => {
      if (!item.coverage) return [];
      const cell = (text: string): string =>
        escapeText(text).replaceAll("|", "\\|").replaceAll("\n", " ");
      return [
        `## ${item.directory}`,
        "",
        "### Coverage notices",
        "",
        ...(item.coverage.notices.length
          ? item.coverage.notices.map((notice) => `- ${cell(notice)}`)
          : ["No coverage notices reported. See per-state tier execution below."]),
        "",
        "### Per-state tier execution",
        "",
        "| Target | Archetype | Configuration | State | Tiers |",
        "| --- | --- | --- | --- | --- |",
        ...item.coverage.configurations.map(
          (config) =>
            `| ${cell(config.target)} | ${cell(config.archetype)} | ${config.index} | ${cell(config.state)} | ${cell(
              Object.entries(config.tiers)
                .map(([name, status]) => `${name}: ${status}`)
                .join(", "),
            )} |`,
        ),
        ...(item.coverage.configurations.length ? [] : ["No configuration coverage reported."]),
        "",
      ];
    }),
    "Meaningful alt text, context, cognitive load, real focus/reading order, and real screen readers still need manual review.",
  ];
  writeFileSync(join(out, "index.md"), `${lines.join("\n")}\n`);
}

/** Execute one report-producing invocation and validate its exact result inventory. */
export async function auditInvocation(
  out: string,
  directory: string,
  targets: string[],
  options: string[],
  run: (command: string, args: string[], cwd?: string) => void | Promise<void> = executeAsync,
  archetype?: string,
): Promise<AuditEvidence> {
  const expected = targets.map((target) => target.slice(0, target.indexOf("=")));
  const evidence: AuditEvidence = { directory, expected, completed: [] };
  const destination = join(out, directory);
  try {
    await run(process.execPath, [
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
    const results: unknown = JSON.parse(readFileSync(join(destination, "results.json"), "utf8"));
    if (
      results &&
      typeof results === "object" &&
      "targets" in results &&
      Array.isArray(results.targets)
    ) {
      evidence.gaps = results.targets.reduce(
        (sum: number, target) => sum + inspectChecks(target.archetypes),
        0,
      );
    }
    evidence.completed = archetype
      ? authoredTargets(results, expected, archetype)
      : completedTargets(results, expected);
    const tiersIndex = options.indexOf("--tiers");
    evidence.coverage = collectCoverage(
      results,
      tiersIndex < 0 ? [] : options[tiersIndex + 1]!.split(","),
    );
  } catch (error) {
    evidence.error = error instanceof Error ? error.message : String(error);
    console.error(`Audit ${directory} incomplete: ${evidence.error}`);
  }
  return evidence;
}

/** Pack the local runtime dependency closure with workspace/catalog protocols resolved. */
export function packAuditPackages(
  out: string,
  workspace: WorkspacePackages,
  run: typeof execute = execute,
): string[] {
  const required = new Set<string>();
  const visit = (name: string): void => {
    if (required.has(name)) return;
    const pkg = workspace.byName.get(name);
    if (!pkg) throw new Error(`Missing local audit dependency: ${name}`);
    required.add(name);
    for (const dependency of pkg.workspaceDeps) visit(dependency);
  };
  for (const name of ["@pantoken/components", "@pantoken/css", "@pantoken/interactions"])
    visit(name);
  const packs = join(out, "packs");
  mkdirSync(packs, { recursive: true });
  const options: string[] = [];
  for (const name of required) {
    const pkg = workspace.byName.get(name)!;
    const destination = join(packs, `${name.replaceAll("/", "-").replaceAll("@", "")}.tgz`);
    run("vp", ["pm", "pack", "--out", destination], join(workspace.rootDir, pkg.path));
    readFileSync(destination);
    options.push("--local-package", `${name}=${destination}`);
  }
  return options;
}

/** Inline supplementary built assets so the npm fixture uses the same cascade and local fonts. */
export function renderNpmFixture(item: AuditCase, assets: string): string {
  const styles = [
    "tokens/schemes.css",
    "components/base.css",
    "components/utilities.css",
    "components/icons.css",
    "components/fonts.css",
  ]
    .map((path) => {
      const file = join(assets, path);
      return readFileSync(file, "utf8").replace(
        /url\((["']?)([^)"']+\.woff2)\1\)/gu,
        (_all, _quote: string, url: string) =>
          `url("data:font/woff2;base64,${readFileSync(resolve(dirname(file), url)).toString("base64")}")`,
      );
    })
    .join("\n");
  const scripts = behaviorNames(item.html)
    .map(
      (name) =>
        `<script>${readFileSync(join(assets, "interactions", `${name}.iife.js`), "utf8").replaceAll("</script", "<\\/script")}</script>`,
    )
    .join("\n");
  return `<style>${styles}</style>
  <script>
  document.documentElement.lang = "en";
  document.documentElement.dataset.pantokenTheme = ${JSON.stringify(item.theme)};
  document.documentElement.dataset.pantokenScheme = ${JSON.stringify(item.scheme)};
  document.documentElement.style.colorScheme = ${JSON.stringify(item.scheme)};
  </script>
  ${item.html}
  ${scripts}\n`;
}

/** Append authored npm archetype evidence to an existing page suite without modifying tool reports. */
export async function runNpmAudits(
  out: string,
  record?: string,
  run: typeof execute = execute,
  workspace?: WorkspacePackages,
): Promise<void> {
  const definitions = [...COMPONENTS, focus];
  const entries = definitions.flatMap((definition) => parseCssDocs(definition.rules("instui-")));
  const examples = collectExamples(
    entries,
    Object.values(ARCHETYPES).filter((name) => !record || name === record),
  );
  const cases = expandCases(examples);
  const coverage: { cases: AuditCase[]; evidence: AuditEvidence[] } = JSON.parse(
    readFileSync(join(out, "coverage.json"), "utf8"),
  );
  const archetypes = Object.entries(ARCHETYPES).filter(([, name]) => !record || name === record);
  const planned = archetypes.map(([archetype, name]) => ({
    directory: `npm-${archetype}`,
    expected: cases.filter((item) => item.record === name).map((item) => `npm-${item.id}`),
    completed: [] as string[],
    error: "Not run",
  }));
  const start = coverage.evidence.length;
  coverage.evidence.push(...planned);
  try {
    writeIndex(out, coverage.evidence, coverage.cases);
    if (!cases.length) return;
    const packages = packAuditPackages(out, workspace ?? (await loadWorkspacePackages()), run);
    const companions = packages
      .filter((option) => option !== "--local-package")
      .map((option) => option.slice(0, option.indexOf("=")))
      .filter((name) => name !== "@pantoken/components" && name !== "@pantoken/css");
    const mapping: Record<string, Record<string, { fixture: string }>> = {};
    for (const item of cases) {
      const archetype = Object.keys(ARCHETYPES).find((key) => ARCHETYPES[key] === item.record)!;
      const id = `npm-${item.id}`;
      const directory = join(out, "fixtures", id);
      mkdirSync(directory, { recursive: true });
      const fixture = join(directory, `${archetype}.html`);
      writeFileSync(fixture, renderNpmFixture(item, join(out, "pages", "assets")));
      mapping[id] = { [archetype]: { fixture } };
    }
    for (let offset = 0; offset < archetypes.length; offset += 2) {
      await Promise.all(
        archetypes.slice(offset, offset + 2).map(async ([archetype, name], localIndex) => {
          const index = offset + localIndex;
          const targets = cases
            .filter((item) => item.record === name)
            .map(
              (item) =>
                `npm-${item.id}=npm:@pantoken/components/components.css,@pantoken/css/scope.css,${companions.join(",")}`,
            );
          const mappingFile = join(out, `mapping-${archetype}.json`);
          writeFileSync(
            mappingFile,
            `${JSON.stringify(
              Object.fromEntries(
                targets.map((target) => {
                  const id = target.slice(0, target.indexOf("="));
                  return [id, mapping[id]];
                }),
              ),
              null,
              2,
            )}\n`,
          );
          coverage.evidence[start + index] = await auditInvocation(
            out,
            `npm-${archetype}`,
            targets,
            [
              "--tiers",
              "rules,interactions,computed,conditions,vsr",
              "--archetypes",
              archetype,
              "--no-generate",
              "--mapping",
              mappingFile,
              ...packages,
            ],
            run === execute ? executeAsync : run,
            archetype,
          );
          writeIndex(out, coverage.evidence, coverage.cases);
        }),
      );
      if (coverage.evidence.slice(start, start + offset + 2).some((item) => item.error)) break;
    }
  } catch (error) {
    coverage.evidence.push({
      directory: "npm-setup",
      expected: [],
      completed: [],
      error: String(error),
    });
  } finally {
    writeIndex(out, coverage.evidence, coverage.cases);
  }
  if (coverage.evidence.some((item) => item.error))
    throw new Error(`Incomplete npm accessibility audit; see ${out}`);
}
/** Build the complete page suite and retain its original reports in a unique local directory. */
export async function runPageAudits(
  record?: string,
  run: typeof execute = execute,
  root: string = repositoryRoot,
): Promise<string> {
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
  const assets = join(out, "pages", "assets");
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
    for (let offset = 0; offset < groups.length; offset += 2) {
      await Promise.all(
        groups.slice(offset, offset + 2).map(async (group, localIndex) => {
          const index = offset + localIndex;
          const targets = cases
            .filter((item) => `${item.theme}-${item.scheme}` === group)
            .map((item) => `${item.id}=${join(out, "pages", `${item.id}.html`)}`);
          evidence[index] = await auditInvocation(
            out,
            `pages-${group}`,
            targets,
            ["--tiers", "rules,conditions,vsr"],
            run === execute ? executeAsync : run,
          );
          writeIndex(out, evidence, cases);
        }),
      );
      if (evidence.slice(0, offset + 2).some((item) => item.error)) break;
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
    const out = await runPageAudits(args[1]);
    await runNpmAudits(out, args[1]);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
