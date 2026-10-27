import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { parseCssDocs } from "@cssdoc/core";
import {
  auditInvocation,
  behaviorNames,
  collectExamples,
  completedTargets,
  exampleHtml,
  execute,
  expandCases,
  renderPage,
  runPageAudits,
  writeIndex,
} from "../scripts/audit-accessibility.ts";

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
  expect(behaviorNames('<div class="instui-tabs"></div>')).toEqual(["tabs"]);
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
test("retains original evidence, uses installed CLI, and doesn't add violation fail flags", () => {
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
  expect(auditInvocation(out, "sample", ["button=/case.html"], ["--tiers", "rules"], run)).toEqual({
    directory: "sample",
    expected: ["button"],
    completed: ["button"],
  });
  expect(run.mock.calls[0]![0]).toBe(process.execPath);
  expect(run.mock.calls[0]![1]).toContain("audit");
  expect(run.mock.calls[0]![1].join(" ")).not.toContain("--fail");
  expect(readFileSync(join(out, "sample/report.md"), "utf8")).toBe("Original report");
});
test("makes subprocess and missing-report errors visible, including multi-target invocations", () => {
  const out = temp();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const run = vi.fn(() => {
    throw new Error("Browser unavailable");
  });
  const result = auditInvocation(out, "broken", ["a=/a.html", "b=/b.html"], [], run);
  expect(result.error).toBe("Browser unavailable");
  expect(result.completed).toEqual([]);
  expect(run.mock.calls[0]).toBeDefined();
  expect(auditInvocation(out, "missing", ["a=/a.html"], [], () => {}).error).toContain("ENOENT");
  expect(console.error).toHaveBeenCalled();
});
test("executes without a shell and rejects failed or missing subprocesses", () => {
  execute(process.execPath, ["-e", ""], temp());
  expect(() => execute(process.execPath, ["-e", "process.exit(3)"], temp())).toThrow("exited 3");
  expect(() => execute(join(temp(), "does-not-exist"), [])).toThrow();
});
test("writes a coverage index with separate errors and the automated-coverage caveat", () => {
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
  expect(() => runPageAudits("not-a-component")).toThrow("Unknown record");
});

test.each(["success", "setup failure", "audit failure"])(
  "orchestrates retained page evidence: %s",
  (outcome) => {
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
    if (outcome === "success") expect(runPageAudits("button", run, root)).toContain("a11y-report");
    else expect(() => runPageAudits("button", run, root)).toThrow("Incomplete accessibility audit");
    const output = join(root, "a11y-report", readdirSync(join(root, "a11y-report"))[0]!);
    const coverage = JSON.parse(readFileSync(join(output, "coverage.json"), "utf8"));
    expect(coverage.cases).toHaveLength(6);
    if (outcome === "success")
      expect(
        coverage.evidence.every((item: { completed: string[] }) => item.completed.length === 1),
      ).toBe(true);
    else expect(readFileSync(join(output, "index.md"), "utf8")).toContain("Not run");
  },
);
