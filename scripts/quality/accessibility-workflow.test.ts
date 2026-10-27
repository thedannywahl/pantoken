import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import { parse } from "yaml";

const root = resolve(import.meta.dirname, "../..");
const workflow = parse(readFileSync(resolve(root, ".github/workflows/ci.yml"), "utf8"));
const job = workflow.jobs["component-accessibility"];

test("keeps component audits advisory and outside the required CI aggregate", () => {
  expect(job["continue-on-error"]).toBe(true);
  expect(job["timeout-minutes"]).toBeGreaterThan(0);
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
  expect(summary.run).toContain("GITHUB_STEP_SUMMARY");
  expect(job.steps.some((step: { run?: string }) => step.run === "vp run audit:components")).toBe(
    true,
  );
  expect(
    job.steps.some((step: { run?: string }) => step.run?.includes("doctor --install-browser")),
  ).toBe(true);
});
