import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import {
  auditInvocation,
  authoredTargets,
  behaviorNames,
  collectExamples,
  completedTargets,
  collectCoverage,
  exampleHtml,
  execute,
  executeAsync,
  inspectChecks,
  expandCases,
  renderPage,
  runPageAudits,
  runNpmAudits,
  packAuditPackages,
  renderNpmFixture,
  writeIndex,
} from "../scripts/audit-accessibility.ts";
import type { WorkspacePackages } from "../../../scripts/release/workspace-packages.ts";

const directories: string[] = [];
const temp = (): string => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-a11y-"));
  directories.push(dir);
  return dir;
};
afterEach(() => {
  vi.restoreAllMocks();
  for (const dir of directories.splice(0)) rmSync(dir, { recursive: true, force: true });
});
const entry = (
  example = '-automatica11y\n```html\n<button class="pfx-button">Save</button>\n```',
) =>
  parseCssDocs(
    `/**\n * @component button\n * @example ${example.replaceAll("\n", "\n * ")}\n */\n.pfx-button { color: red; }`,
  );

test("normalizes only prefix class tokens and supports multiple fences and unfenced markup", () => {
  expect(
    exampleHtml(
      '-automatica11y\n```html\n<button class="pfx-button">pfx-text</button>\n```\n```html\n<span>More</span>\n```',
    ),
  ).toBe('<button class="instui-button">pfx-text</button>\n\n<span>More</span>');
  expect(exampleHtml("-automatica11y\n<p>Plain</p>")).toBe("<p>Plain</p>");
  expect(() => exampleHtml("-automatica11y\n")).toThrow("Empty audit markup");
});
test("requires unique records, explicit examples, and valid markup", () => {
  expect(collectExamples(entry(), ["button"])).toEqual([
    { record: "button", index: 0, html: '<button class="instui-button">Save</button>' },
  ]);
  expect(() => collectExamples([], ["button"])).toThrow("found 0");
  expect(() => collectExamples([...entry(), ...entry()], ["button"])).toThrow("found 2");
  expect(() => collectExamples(entry("<button>Save</button>"), ["button"])).toThrow(
    "Missing -automatica11y",
  );
});
test("expands exactly six unique cases per example and loads local production assets", () => {
  const cases = expandCases(collectExamples(entry(), ["button"]));
  expect(cases).toHaveLength(6);
  expect(new Set(cases.map((item) => item.id)).size).toBe(6);
  expect(cases.map((item) => `${item.theme}:${item.scheme}`)).toEqual([
    "rebrand:light",
    "rebrand:dark",
    "canvas:light",
    "canvas:dark",
    "canvasHighContrast:light",
    "canvasHighContrast:dark",
  ]);
  const page = renderPage({ ...cases[0]!, html: '<dialog class="instui-modal">Content</dialog>' });
  expect(page).toContain('data-pantoken-theme="rebrand"');
  expect(page).toContain('data-pantoken-scheme="light"');
  for (const asset of [
    "scope.css",
    "schemes.css",
    "base.css",
    "components.css",
    "utilities.css",
    "icons.css",
    "fonts.css",
    "modal.iife.js",
  ])
    expect(page).toContain(asset);
  expect(page).not.toContain("https://");
  expect(page).not.toContain("../assets");
  expect(page).toContain('href="assets/tokens/scope.css"');
  expect(page).toContain('src="assets/interactions/modal.iife.js"');
  expect(page).toContain("dialog.showModal()");
  expect(page).toContain("popover.showPopover()");
  expect(page).toContain("details.open = true");
  expect(page).toContain('document.querySelector(".instui-tooltip [data-a11y-trigger]")?.focus()');
  expect(page).toContain('[role="treeitem"][aria-expanded="false"]');
  expect(page).toContain('row.querySelector(".item")?.click()');
  expect(page).toContain(
    ".instui-form-field[data-native-validation] input[data-a11y-trigger][required]",
  );
  expect(page).toContain("control.checkValidity()");
  expect(behaviorNames('<div class="instui-tabs"></div>')).toEqual(["tabs"]);
  expect(behaviorNames('<div class="instui-tree-browser" role="tree"></div>')).toEqual([
    "tree-browser",
  ]);
  expect(behaviorNames('<label class="instui-form-field" data-native-validation></label>')).toEqual(
    ["form-field"],
  );
  expect(behaviorNames('<div class="instui-menu" data-menu-navigation></div>')).toEqual(["menu"]);
  expect(behaviorNames("<p>instui-tabs</p>")).toEqual([]);
});
test("checks exact completed coverage without interpreting violations as failures", () => {
  expect(
    completedTargets({ targets: [{ id: "button", status: "ran", violations: 9 }] }, ["button"]),
  ).toEqual(["button"]);
  for (const invalid of [
    null,
    {},
    { targets: [null] },
    { targets: [{ id: "button", status: "failed", reason: "Missing asset" }] },
    { targets: [] },
    { targets: [{ id: "extra", status: "ran" }] },
    {
      targets: [
        { id: "button", status: "ran" },
        { id: "button", status: "ran" },
      ],
    },
  ]) {
    expect(() => completedTargets(invalid, ["button"])).toThrow();
  }
});
test("retains original evidence, uses installed CLI, and doesn't add violation fail flags", async () => {
  const out = temp();
  const run = vi.fn((_command: string, args: string[]) => {
    const dir = args[args.indexOf("--out") + 1]!;
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "report.md"), "Original report");
    writeFileSync(
      join(dir, "results.json"),
      JSON.stringify({ targets: [{ id: "button", status: "ran" }] }),
    );
  });
  expect(
    await auditInvocation(out, "sample", ["button=/case.html"], ["--tiers", "rules"], run),
  ).toEqual({
    directory: "sample",
    expected: ["button"],
    completed: ["button"],
    gaps: 0,
    coverage: { notices: ["button: no executable configurations"], configurations: [] },
  });
  expect(run.mock.calls[0]![0]).toBe(process.execPath);
  expect(run.mock.calls[0]![1]).toContain("audit");
  expect(run.mock.calls[0]![1].join(" ")).not.toContain("--fail");
  expect(readFileSync(join(out, "sample/report.md"), "utf8")).toBe("Original report");
});
test("makes subprocess and missing-report errors visible, including multi-target invocations", async () => {
  const out = temp();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const run = vi.fn(() => {
    throw new Error("Browser unavailable");
  });
  const result = await auditInvocation(out, "broken", ["a=/a.html", "b=/b.html"], [], run);
  expect(result.error).toBe("Browser unavailable");
  expect(result.completed).toEqual([]);
  expect(run.mock.calls[0]).toBeDefined();
  expect((await auditInvocation(out, "missing", ["a=/a.html"], [], () => {})).error).toContain(
    "ENOENT",
  );
  expect(console.error).toHaveBeenCalled();
});
test("executes without a shell and rejects failed or missing subprocesses", () => {
  execute(process.execPath, ["-e", ""], temp());
  expect(() => execute(process.execPath, ["-e", "process.exit(3)"], temp())).toThrow("exited 3");
  expect(() => execute(join(temp(), "does-not-exist"), [])).toThrow();
});
test("writes a coverage index with separate errors and the automated-coverage caveat", async () => {
  const out = temp();
  writeIndex(
    out,
    [{ directory: "sample", expected: ["a"], completed: [], error: "missing | target" }],
    [],
  );
  const markdown = readFileSync(join(out, "index.md"), "utf8");
  expect(markdown).toContain("0 / 1");
  expect(markdown).toContain("missing \\| target");
  expect(markdown).toContain(
    "These automated results do not establish that the page meets WCAG; manual review is still needed.",
  );
  expect(JSON.parse(readFileSync(join(out, "coverage.json"), "utf8")).evidence[0].error).toBe(
    "missing | target",
  );
  await expect(runPageAudits("not-a-component")).rejects.toThrow("Unknown record");
});

test.each(["success", "setup failure", "audit failure"])(
  "orchestrates retained page evidence: %s",
  async (outcome) => {
    const root = temp();
    for (const path of [
      "formats/components/dist",
      "formats/components/assets",
      "formats/css/dist",
      "formats/interactions/dist",
    ]) {
      mkdirSync(join(root, path), { recursive: true });
    }
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    const run = vi.fn((_command: string, args: string[]) => {
      if (outcome === "setup failure" && args.includes("doctor"))
        throw new Error("Missing browser");
      const index = args.indexOf("--out");
      if (index < 0) return;
      if (outcome === "audit failure") throw new Error("Target failed");
      const directory = args[index + 1]!;
      const targets = args
        .slice(2, args.indexOf("--wcag"))
        .map((target) => ({ id: target.split("=")[0], status: "ran" }));
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, "report.md"), "Original");
      writeFileSync(join(directory, "results.json"), JSON.stringify({ targets }));
    });
    if (outcome === "success")
      expect(await runPageAudits("button", run, root)).toContain("a11y-report");
    else
      await expect(runPageAudits("button", run, root)).rejects.toThrow(
        "Incomplete accessibility audit",
      );
    const output = join(root, "a11y-report", readdirSync(join(root, "a11y-report"))[0]!);
    const coverage = JSON.parse(readFileSync(join(output, "coverage.json"), "utf8"));
    expect(coverage.cases).toHaveLength(6);
    expect(readdirSync(join(output, "pages", "assets"))).toEqual([
      "assets",
      "components",
      "interactions",
      "tokens",
    ]);
    if (outcome === "success")
      expect(
        coverage.evidence.every((item: { completed: string[] }) => item.completed.length === 1),
      ).toBe(true);
    else expect(readFileSync(join(output, "index.md"), "utf8")).toContain("Not run");
  },
);

const workspace = (root: string): WorkspacePackages => {
  const packages = ["components", "css", "interactions", "utils"].map((name) => ({
    name: `@pantoken/${name}`,
    path: `formats/${name}`,
    version: "1.0.0",
    private: false,
    workspaceDeps: new Set(name === "utils" ? [] : ["@pantoken/utils"]),
  }));
  return { rootDir: root, packages, byName: new Map(packages.map((pkg) => [pkg.name, pkg])) };
};
test("packs every local runtime dependency once through the workspace-aware package manager", () => {
  const root = temp();
  const run = vi.fn((_command: string, args: string[]) =>
    writeFileSync(args[args.indexOf("--out") + 1]!, "tarball"),
  );
  const options = packAuditPackages(root, workspace(root), run);
  expect(options.filter((option) => option === "--local-package")).toHaveLength(4);
  expect(run.mock.calls).toHaveLength(4);
  expect(run.mock.calls[0]![0]).toBe("vp");
  expect(options.join(" ")).toContain("@pantoken/utils=");
  const missing = workspace(root);
  missing.byName.delete("@pantoken/utils");
  expect(() => packAuditPackages(root, missing, run)).toThrow("Missing local audit dependency");
});

test("rejects asynchronous subprocess launch and exit failures", async () => {
  await executeAsync(process.execPath, ["-e", ""], temp());
  await expect(executeAsync(process.execPath, ["-e", "process.exit(4)"], temp())).rejects.toThrow(
    "exited 4",
  );
  await expect(executeAsync(join(temp(), "missing"), [])).rejects.toThrow();
});

test("reports coverage gaps without merging them with failed checks or violations", () => {
  expect(
    inspectChecks({
      tiers: [
        { status: "not-testable" },
        { result: "undetermined" },
        { status: "gap" },
        { status: "skipped" },
      ],
    }),
  ).toBe(4);
  expect(inspectChecks({ result: "fail", status: "ran", violations: [] })).toBe(0);
  expect(() =>
    inspectChecks({ engines: { axe: { status: "failed", reason: "Engine error" } } }),
  ).toThrow("Engine error");
  expect(() => inspectChecks({ result: "error" })).toThrow("Audit check failed");
});

const requestedTiers = ["rules", "interactions", "computed", "conditions", "vsr"];
const dialogResults = () => {
  const targets = Array.from({ length: 6 }, (_, index) => ({
    id: `dialog-${index}`,
    status: "ran",
    archetypes: {
      dialog: {
        status: "ran",
        fixture: { source: "authored" },
        configs: [
          {
            state: "closed",
            tiers: Object.fromEntries(requestedTiers.map((tier) => [tier, { status: "ran" }])),
          },
          { state: "open", tiers: { rules: { status: "ran" }, vsr: { status: "ran" } } },
        ],
      },
    },
    summary: { gaps: [], notTestable: [] },
  }));
  const coverage = targets.flatMap(({ id }) =>
    ["interactions", "computed", "conditions"].map(
      (tier) => `${id}/dialog/1/${tier}: missing requested tier`,
    ),
  );
  return { targets, outcome: { status: "passed", coverage } };
};

test("retains 18 original supplemental-state notices without double counting derived gaps", () => {
  const results = dialogResults();
  const coverage = collectCoverage(results, requestedTiers);
  expect(coverage.notices).toEqual(results.outcome.coverage);
  expect(coverage.configurations).toHaveLength(12);
  expect(coverage.configurations[1]).toEqual({
    target: "dialog-0",
    archetype: "dialog",
    index: 1,
    state: "open",
    tiers: {
      rules: "ran",
      interactions: "missing",
      computed: "missing",
      conditions: "missing",
      vsr: "ran",
    },
  });
  expect(collectCoverage({ targets: results.targets }, requestedTiers)).toEqual(coverage);
});

test("preserves summary limitations, original notices, and not-testable tier notes separately", () => {
  const coverage = collectCoverage(
    {
      outcome: { coverage: ["example: original notice"] },
      targets: [
        {
          id: "example",
          summary: { gaps: ["fixture gap"], notTestable: ["closed shadow root"] },
          archetypes: {
            page: {
              configs: [
                {
                  state: "expanded",
                  tiers: {
                    rules: { status: "not-testable", reason: "no DOM" },
                    vsr: { status: "ran", notTestable: ["open shadow root"] },
                    computed: { status: "not-applicable" },
                  },
                },
              ],
            },
          },
        },
      ],
    },
    ["rules", "vsr", "computed"],
  );
  expect(coverage.notices).toEqual([
    "example: original notice",
    "example: fixture gap",
    "example: closed shadow root",
    "example/page/0/rules: no DOM",
    "example/page/0/vsr: open shadow root",
  ]);
  expect(coverage.configurations[0]!.tiers.computed).toBe("not-applicable");
});

test("reports missing configurations and rejects malformed coverage data", () => {
  expect(
    collectCoverage({ targets: [{ id: "empty", archetypes: {} }] }, requestedTiers).notices,
  ).toEqual(["empty: no executable configurations"]);
  for (const value of [
    null,
    {},
    { outcome: { coverage: "invalid" } },
    { outcome: { coverage: [42] } },
    { targets: [{ id: 1 }] },
    { targets: [{ id: "x", summary: { gaps: {} } }] },
    { targets: [{ id: "x", archetypes: { dialog: { configs: {} } } }] },
    { targets: [{ id: "x", archetypes: { dialog: { status: "gap", reason: {} } } }] },
    { targets: [{ id: "x", archetypes: { dialog: { configs: [null] } } }] },
    { targets: [{ id: "x", archetypes: { dialog: { configs: [{}] } } }] },
  ])
    expect(() => collectCoverage(value, requestedTiers)).toThrow("Invalid");
});

test("keeps skipped, gap, and unreported statuses explicit without treating inapplicable tiers as gaps", () => {
  const coverage = collectCoverage(
    {
      targets: [
        {
          id: "sample",
          archetypes: {
            dialog: {
              status: "gap",
              configs: [
                {
                  tiers: {
                    rules: { status: "skipped" },
                    computed: {},
                    vsr: { status: "not-applicable" },
                  },
                },
              ],
            },
            menu: { status: "gap", reason: "missing fixture" },
          },
        },
      ],
    },
    [],
  );
  expect(coverage.notices).toEqual([
    "sample/dialog: fixture gap",
    "sample/dialog/0/rules: skipped",
    "sample/dialog/0/computed: missing status",
    "sample/menu: missing fixture",
  ]);
  expect(coverage.configurations[0]!.state).toBe("Not reported");
});

test("indexes supplemental-state coverage without changing originals or failing advisory findings", async () => {
  const out = temp();
  const original = JSON.stringify(dialogResults());
  const result = await auditInvocation(
    out,
    "npm-dialog",
    dialogResults().targets.map(({ id }) => `${id}=npm:example`),
    ["--tiers", requestedTiers.join(",")],
    (_command, args) => {
      const directory = args[args.indexOf("--out") + 1]!;
      mkdirSync(directory);
      writeFileSync(join(directory, "report.md"), "Original report");
      writeFileSync(join(directory, "results.json"), original);
    },
    "dialog",
  );
  expect(result.error).toBeUndefined();
  expect(result.completed).toHaveLength(6);
  expect(result.gaps).toBe(0);
  expect(result.coverage?.notices).toHaveLength(18);
  writeIndex(out, [result], []);
  const markdown = readFileSync(join(out, "index.md"), "utf8");
  expect(markdown).toContain("Coverage notices");
  expect(markdown).toContain("| npm-dialog | 6 / 6 | 0 | 18 |");
  expect(markdown).toContain("dialog-0/dialog/1/interactions: missing requested tier");
  expect(markdown).toContain("open");
  expect(markdown).toContain("interactions: missing");
  expect(markdown).toContain("not unique defects");
  expect(JSON.parse(readFileSync(join(out, "coverage.json"), "utf8")).evidence[0].coverage).toEqual(
    result.coverage,
  );
  expect(readFileSync(join(out, "npm-dialog/results.json"), "utf8")).toBe(original);
  expect(readFileSync(join(out, "npm-dialog/report.md"), "utf8")).toBe("Original report");
});
test("rejects native templates, generated guesses, and npm archetype gaps", () => {
  const target = {
    id: "sample",
    status: "ran",
    archetypes: { button: { status: "ran", fixture: { source: "authored" } } },
  };
  expect(authoredTargets({ targets: [target] }, ["sample"], "button")).toEqual(["sample"]);
  for (const source of ["template", "generated", "none"]) {
    expect(() =>
      authoredTargets(
        {
          targets: [{ ...target, archetypes: { button: { status: "ran", fixture: { source } } } }],
        },
        ["sample"],
        "button",
      ),
    ).toThrow("authored fixture");
  }
  expect(() => authoredTargets({ targets: [target] }, ["sample"], "dialog")).toThrow(
    "authored fixture",
  );
  expect(() => authoredTargets(null, [], "button")).toThrow();
});
test("inlines only built supplementary styles, local fonts, and production behavior", () => {
  const root = temp();
  for (const folder of ["tokens", "components", "assets", "interactions"])
    mkdirSync(join(root, folder));
  for (const file of [
    "tokens/schemes.css",
    "components/base.css",
    "components/utilities.css",
    "components/icons.css",
  ])
    writeFileSync(join(root, file), "/* built */");
  writeFileSync(join(root, "assets/font.woff2"), "local-font");
  writeFileSync(join(root, "components/fonts.css"), '@font-face{src:url("../assets/font.woff2")}');
  writeFileSync(join(root, "interactions/modal.iife.js"), "window.production = true;");
  const html = renderNpmFixture(
    {
      ...expandCases([
        { record: "modal", index: 0, html: '<dialog class="instui-modal">Details</dialog>' },
      ])[0]!,
      scheme: "dark",
    },
    root,
  );
  expect(html).toContain("data:font/woff2;base64,");
  expect(html).toContain("window.production = true");
  expect(html).toContain('style.colorScheme = "dark"');
  expect(html).toContain('dataset.pantokenTheme = "rebrand"');
  expect(html).not.toContain("https://");
  expect(html).not.toContain("dialog.showModal()");
  expect(html).not.toContain("popover.showPopover()");
  expect(html).not.toContain("details.open = true");
});
test.each(["success", "pack failure", "fixture gap", "no archetype", "full inventory"])(
  "appends npm evidence: %s",
  async (outcome) => {
    const root = temp();
    for (const folder of [
      "pages/assets/tokens",
      "pages/assets/components",
      "pages/assets/interactions",
    ])
      mkdirSync(join(root, folder), { recursive: true });
    for (const file of [
      "tokens/schemes.css",
      "components/base.css",
      "components/utilities.css",
      "components/icons.css",
      "components/fonts.css",
    ])
      writeFileSync(join(root, "pages", "assets", file), "/* built */");
    for (const name of ["modal", "tabs", "tooltip", "close-button", "form-field", "menu"])
      writeFileSync(join(root, "pages", "assets", "interactions", `${name}.iife.js`), "");
    writeIndex(root, [], []);
    vi.spyOn(console, "error").mockImplementation(() => {});
    const run = vi.fn((_command: string, args: string[]) => {
      if (args.includes("pack")) {
        if (outcome === "pack failure") throw new Error("Pack failed");
        writeFileSync(args[args.indexOf("--out") + 1]!, "tarball");
        return;
      }
      const destination = args[args.indexOf("--out") + 1]!;
      const archetype = args[args.indexOf("--archetypes") + 1]!;
      const targets = args.slice(2, args.indexOf("--wcag")).map((spec) => ({
        id: spec.split("=")[0],
        status: "ran",
        archetypes: {
          [archetype]: {
            status: outcome === "fixture gap" ? "gap" : "ran",
            fixture: { source: "authored" },
          },
        },
      }));
      const mapping = JSON.parse(readFileSync(args[args.indexOf("--mapping") + 1]!, "utf8"));
      expect(Object.keys(mapping).sort()).toEqual(targets.map((target) => target.id).sort());
      mkdirSync(destination, { recursive: true });
      writeFileSync(join(destination, "report.md"), "Original npm report");
      writeFileSync(join(destination, "results.json"), JSON.stringify({ targets }));
    });
    const action = runNpmAudits(
      root,
      outcome === "full inventory" ? undefined : outcome === "no archetype" ? "text" : "button",
      run,
      workspace(root),
    );
    if (outcome === "success" || outcome === "no archetype" || outcome === "full inventory")
      await action;
    else await expect(action).rejects.toThrow("Incomplete npm accessibility audit");
    const coverage = JSON.parse(readFileSync(join(root, "coverage.json"), "utf8"));
    if (outcome === "success") {
      expect(coverage.evidence[0].completed).toHaveLength(6);
      const mapping = JSON.parse(readFileSync(join(root, "mapping-button.json"), "utf8"));
      expect(Object.keys(mapping)).toHaveLength(6);
      expect(run.mock.calls.at(-1)![1]).toContain("--no-generate");
    } else if (outcome === "full inventory") {
      expect(coverage.evidence).toHaveLength(9);
      expect(
        coverage.evidence.flatMap((item: { completed: string[] }) => item.completed),
      ).toHaveLength(54);
    } else if (outcome === "no archetype") expect(run).not.toHaveBeenCalled();
    else expect(coverage.evidence.some((item: { error?: string }) => item.error)).toBe(true);
  },
);
