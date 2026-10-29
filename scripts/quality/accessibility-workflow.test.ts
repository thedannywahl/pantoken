import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import { parse } from "yaml";
import componentsConfig from "../../formats/components/vite.config.ts";
import rootConfig from "../../vite.config.ts";

const root = resolve(import.meta.dirname, "../..");
const workflow = parse(readFileSync(resolve(root, ".github/workflows/ci.yml"), "utf8"));
const job = workflow.jobs["component-accessibility"];

test("restores the complete workspace build graph before running an uncached audit", () => {
  const audit = componentsConfig.run?.tasks?.["audit:accessibility"];
  expect(audit).toMatchObject({
    command: "node scripts/audit-accessibility.ts",
    cache: false,
    dependsOn: ["pantoken-root#build:all"],
  });
  expect(rootConfig.run?.tasks?.["build:all"]).toMatchObject({
    command: "vp run -r --concurrency-limit 1 build",
  });
});

test("keeps retained tool reports outside contributor Markdown linting", () => {
  const config = parse(readFileSync(resolve(root, ".markdownlint-cli2.yaml"), "utf8"));
  expect(config.ignores).toContain("a11y-report");
  expect(config.ignores).toContain("a11y-report/**");
});

test("keeps component audits advisory and outside the required CI aggregate", () => {
  expect(job["continue-on-error"]).toBe(true);
  expect(job["timeout-minutes"]).toBe(120);
  expect(job.needs).toBe("build");
  expect(workflow.jobs["ci-gate"].needs).not.toContain("component-accessibility");
  expect(job.permissions).toEqual({ contents: "read" });
  expect(JSON.stringify(job)).not.toContain("secrets.");
  expect(
    job.steps.find((step: { uses?: string }) => step.uses?.startsWith("actions/checkout@")).with[
      "persist-credentials"
    ],
  ).toBe(false);
});
test("retains evidence and summaries even after an audit failure", () => {
  const upload = job.steps.find((step: { uses?: string }) =>
    step.uses?.startsWith("actions/upload-artifact@"),
  );
  const summary = job.steps.find(
    (step: { name: string }) => step.name === "Summarize advisory results",
  );
  expect(upload.if).toBe("always()");
  expect(upload.with.path).toBe("a11y-report/");
  expect(summary.if).toBe("always()");
  expect(summary.run).toContain("not a clean audit");
  expect(summary.run).toContain("steps.audit.outcome");
  expect(summary.run).toContain("steps.evidence.outcome");
  expect(summary.run).toContain("GITHUB_STEP_SUMMARY");
  expect(
    job.steps.some(
      (step: { run?: string }) => step.run === "vp run @pantoken/docs#docs:accessibility",
    ),
  ).toBe(true);
});
