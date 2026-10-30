import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
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

test("uses the serialized workspace build for releases restored from the CI task cache", () => {
  const release = parse(readFileSync(resolve(root, ".github/workflows/release.yml"), "utf8"));
  const build = release.jobs.release.steps.find(
    (step: { name: string }) => step.name === "Build all packages",
  );
  expect(build.run).toBe("vp run build:all");
  expect(build.if).toBe("steps.mode.outputs.will_publish == 'true'");
});

test.each([
  { name: "no changesets", changesets: [], publish: true },
  { name: "empty changesets", changesets: [{ releases: [] }], publish: true },
  {
    name: "package bumps",
    changesets: [{ releases: [{ name: "@pantoken/components", type: "patch" }] }],
    publish: false,
  },
  {
    name: "empty changesets alongside package bumps",
    changesets: [{ releases: [] }, { releases: [{ name: "@pantoken/components", type: "patch" }] }],
    publish: false,
  },
])("selects the release path for $name", ({ changesets, publish }) => {
  const release = parse(readFileSync(resolve(root, ".github/workflows/release.yml"), "utf8"));
  const mode = release.jobs.release.steps.find((step: { id?: string }) => step.id === "mode");
  const directory = mkdtempSync(resolve(tmpdir(), "pantoken-release-mode-"));
  try {
    const fixture = resolve(directory, "fixture.json");
    const output = resolve(directory, "output");
    writeFileSync(fixture, JSON.stringify({ changesets }));
    const result = spawnSync(
      "bash",
      ["-e", "-o", "pipefail", "-c", `vp() { cp "$STATUS_FIXTURE" "$5"; }\n${mode.run}`],
      {
        encoding: "utf8",
        env: {
          ...process.env,
          RUNNER_TEMP: directory,
          GITHUB_OUTPUT: output,
          STATUS_FIXTURE: fixture,
        },
      },
    );
    expect(result.status, result.stderr).toBe(0);
    expect(readFileSync(output, "utf8").trim()).toBe(`will_publish=${publish}`);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test("publishes already-versioned packages directly instead of the empty-changeset action path", () => {
  const release = parse(readFileSync(resolve(root, ".github/workflows/release.yml"), "utf8"));
  const steps = release.jobs.release.steps;
  const version = steps.find((step: { id?: string }) => step.id === "changesets");
  const publish = steps.find(
    (step: { name: string }) => step.name === "Publish versioned packages",
  );
  expect(version.if).toBe("steps.mode.outputs.will_publish == 'false'");
  expect(version.with).not.toHaveProperty("publish-script");
  expect(publish.if).toBe("steps.mode.outputs.will_publish == 'true'");
  expect(publish.run).toBe("node scripts/release/publish-npm.ts");
  expect(publish.env.NPM_CONFIG_PROVENANCE).toBe("true");
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
