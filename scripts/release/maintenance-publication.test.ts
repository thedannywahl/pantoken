import { afterEach, expect, test, vi } from "vite-plus/test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { componentReviews } from "./component-reviews.ts";
import {
  publishMaintenance,
  validateMaintenanceManifest,
  validateMaintenanceResult,
} from "./maintenance-publication.ts";

const temporary: string[] = [];
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  for (const directory of temporary.splice(0)) rmSync(directory, { recursive: true, force: true });
});

const base = "a".repeat(40);
const proposal = "b".repeat(40);
const artifact = () => ({
  base,
  proposal,
  upgrades: [],
  accepted: [],
  failures: [],
  files: { "compatibility.json": "{}\n" },
  evidence: { "@pantoken/react": ["19.0.0"] },
});

test("accepts a bounded prepared handoff only for its immutable base and proposal", () => {
  expect(validateMaintenanceResult(artifact(), base, proposal)).toEqual(artifact());
  expect(() => validateMaintenanceResult(artifact(), "c".repeat(40), proposal)).toThrow(
    "Stale maintenance base",
  );
  expect(() => validateMaintenanceResult(artifact(), base, base)).toThrow(
    "Stale Renovate proposal",
  );
});

test("rejects unexpected executable changes, traversal, missing evidence, and file deletion", () => {
  for (const files of [
    { "scripts/release/publish-npm.ts": "bad" },
    { "../package.json": "{}" },
    { "compatibility.json": null },
    { ".github/workflows/release.yml": "bad" },
  ])
    expect(() => validateMaintenanceResult({ ...artifact(), files }, base, proposal)).toThrow();
  expect(() =>
    validateMaintenanceResult({ ...artifact(), evidence: null }, base, proposal),
  ).toThrow();
  expect(() =>
    validateMaintenanceResult(
      {
        ...artifact(),
        accepted: [{ depName: "bad", newValue: "2", manager: "npm", packageFile: "package.json" }],
      },
      base,
      proposal,
    ),
  ).toThrow("Unproposed");
});

test("permits dependency manifest updates but rejects script/version/export tampering", () => {
  const before = JSON.stringify({
    name: "example",
    version: "1.0.0",
    scripts: { build: "safe" },
    dependencies: { react: "^19" },
  });
  expect(() => validateMaintenanceManifest(before, before.replace("^19", "^20"))).not.toThrow();
  expect(() => validateMaintenanceManifest(before, before.replace("safe", "unsafe"))).toThrow(
    "cannot change",
  );
  expect(() => validateMaintenanceManifest(before, before.replace("1.0.0", "9.0.0"))).toThrow(
    "cannot change",
  );
});

function githubFixture(
  result: unknown = artifact(),
  options: {
    issues?: unknown[];
    actor?: string;
    main?: string;
    checks?: string[];
    draft?: boolean;
    proposalHead?: string;
    graphError?: boolean;
    tree?: Array<{ path: string; type: string; sha: string; mode: string }>;
    truncated?: boolean;
  } = {},
) {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-publication-test-"));
  temporary.push(directory);
  const file = join(directory, "result.json");
  writeFileSync(file, JSON.stringify(result));
  vi.stubEnv("GITHUB_REPOSITORY", "example/pantoken");
  vi.stubEnv("GH_TOKEN", "test-token");
  const calls: Array<{
    endpoint: string;
    method: string;
    body: Record<string, unknown>;
    redirect?: RequestRedirect;
  }> = [];
  const fetcher = vi.fn(async (url: string, init: RequestInit) => {
    const endpoint = url.replace("https://api.github.com/", "");
    const method = init.method ?? "GET";
    const body = typeof init.body === "string" ? JSON.parse(init.body) : {};
    calls.push({ endpoint, method, body, redirect: init.redirect });
    let response: unknown = {};
    if (endpoint === "user") response = { login: "maintainer" };
    else if (endpoint === "repos/example/pantoken") response = { default_branch: "main" };
    else if (endpoint.includes("/issues?")) response = options.issues ?? [];
    else if (endpoint.endsWith("/git/ref/heads/main"))
      response = { object: { sha: options.main ?? base } };
    else if (endpoint.includes("/pulls?"))
      response = [
        {
          number: 17,
          node_id: "PR_17",
          user: { login: options.actor ?? "maintainer" },
          head: {
            ref: "renovate/weekly-maintenance",
            sha: options.proposalHead ?? proposal,
            repo: { full_name: "example/pantoken" },
          },
          base: { ref: "main" },
          draft: options.draft ?? true,
        },
      ];
    else if (endpoint.endsWith("/pulls/17")) response = { head: { sha: "c".repeat(40) } };
    else if (endpoint.includes("/git/commits/") && method === "GET")
      response = { tree: { sha: "tree-base" } };
    else if (
      endpoint.endsWith("/git/blobs") ||
      endpoint.endsWith("/git/trees") ||
      endpoint.endsWith("/git/commits")
    )
      response = { sha: "c".repeat(40) };
    else if (endpoint.endsWith("/rules/branches/main"))
      response = [
        {
          type: "required_status_checks",
          parameters: {
            required_status_checks: (options.checks ?? ["ci-gate", "changeset-gate"]).map(
              (context) => ({ context }),
            ),
          },
        },
      ];
    else if (endpoint.endsWith("/issues") && method === "POST")
      response = { number: 42, title: body.title, body: body.body };
    else if (endpoint.includes("/git/trees/") && method === "GET")
      response = {
        truncated: options.truncated ?? false,
        tree: options.tree ?? [
          {
            path: "pnpm-workspace.yaml",
            type: "blob",
            sha: "d".repeat(40),
            mode: "100644",
          },
          { path: "pnpm-lock.yaml", type: "blob", sha: "e".repeat(40), mode: "100644" },
        ],
      };
    else if (endpoint.includes("/git/blobs/"))
      response = {
        encoding: "base64",
        content: Buffer.from('{"dependencies":{"react":"^20.0.0"}}').toString("base64"),
      };
    else if (endpoint === "graphql" && options.graphError)
      response = { errors: [{ message: "denied" }] };
    return { ok: true, status: 200, json: async () => response };
  });
  vi.stubGlobal("fetch", fetcher);
  return { file, calls, fetcher };
}

test("publishes a validated tree and enables auto-merge only with protected required checks", async () => {
  const fixture = githubFixture();
  await publishMaintenance(["publish", fixture.file, base, proposal]);
  expect(
    fixture.calls.some(
      (call) =>
        call.endpoint.endsWith("/git/refs/heads/renovate/weekly-maintenance") &&
        call.body.force === false,
    ),
  ).toBe(true);
  const mutations = fixture.calls
    .filter((call) => call.endpoint === "graphql")
    .map((call) => String(call.body.query));
  expect(mutations[0]).toContain("markPullRequestReadyForReview");
  expect(mutations[1]).toContain("enablePullRequestAutoMerge");
});

test("rejects base/head races, unexpected PR actors, missing required checks, and GraphQL denial", async () => {
  for (const [options, message] of [
    [{ main: "d".repeat(40) }, "Main advanced"],
    [{ actor: "other" }, "another actor"],
    [{ proposalHead: "e".repeat(40) }, "branch changed"],
    [{ checks: [] }, "Protected CI"],
    [{ graphError: true }, "GraphQL operation failed"],
  ] as const) {
    const fixture = githubFixture(artifact(), options as Parameters<typeof githubFixture>[1]);
    await expect(publishMaintenance(["publish", fixture.file, base, proposal])).rejects.toThrow(
      message,
    );
  }
});

test("reconciles exact merged version evidence without calling user API with GITHUB_TOKEN", async () => {
  const fixture = githubFixture(
    { "@pantoken/react": ["19.0.0"] },
    {
      issues: [
        { number: 1, title: "Compatibility review: @pantoken/react / 19.0.0", body: "" },
        { number: 2, title: "Compatibility review: @pantoken/react / 18.0.0", body: "" },
      ],
    },
  );
  await publishMaintenance(["reconcile", fixture.file]);
  expect(fixture.calls.some((call) => call.endpoint === "user")).toBe(false);
  expect(
    fixture.calls.find((call) => call.endpoint.endsWith("/issues/1") && call.method === "PATCH")
      ?.body.state,
  ).toBe("closed");
  expect(
    fixture.calls.some((call) => call.endpoint.endsWith("/issues/2") && call.method === "PATCH"),
  ).toBe(false);
});

test("records failures in individual issues and a separate draft without auto-merge", async () => {
  const result = {
    ...artifact(),
    files: {},
    failures: [
      {
        id: "f".repeat(20),
        package: "@pantoken/react",
        version: "20.0.0",
        error: "SSR failed",
        upgrades: [],
      },
    ],
  };
  const fixture = githubFixture(result);
  await publishMaintenance(["publish", fixture.file, base, proposal]);
  expect(
    fixture.calls.some((call) => call.endpoint.endsWith("/issues") && call.method === "POST"),
  ).toBe(true);
  const pr = fixture.calls.find(
    (call) => call.endpoint.endsWith("/pulls") && call.method === "POST",
  );
  expect(pr?.body).toMatchObject({ head: "maintenance/failed-updates", draft: true });
  expect(String(pr?.body.body)).toContain("issues/42");
  expect(fixture.calls.some((call) => call.endpoint === "graphql")).toBe(false);
});

test("resolves artifact paths through immutable repository trees and fetches only blob SHAs", async () => {
  const upgrade = {
    depName: "react",
    newValue: "^20.0.0",
    manager: "npm",
    packageFile: "pnpm-workspace.yaml",
  };
  const fixture = githubFixture({
    ...artifact(),
    files: {},
    upgrades: [upgrade],
    failures: [
      {
        id: "f".repeat(20),
        package: "react",
        version: "^20.0.0",
        error: "SSR failed",
        upgrades: [upgrade],
      },
    ],
  });
  await publishMaintenance(["publish", fixture.file, base, proposal]);
  expect(fixture.calls.filter((call) => call.endpoint.includes("/git/trees/"))).toHaveLength(1);
  expect(fixture.calls.filter((call) => call.endpoint.includes("/git/blobs/"))).toEqual([
    expect.objectContaining({ endpoint: `repos/example/pantoken/git/blobs/${"d".repeat(40)}` }),
    expect.objectContaining({ endpoint: `repos/example/pantoken/git/blobs/${"e".repeat(40)}` }),
  ]);
  expect(fixture.calls.every((call) => call.redirect === "error")).toBe(true);
  expect(fixture.calls.some((call) => call.endpoint.includes("pnpm-workspace.yaml"))).toBe(false);
});

test("fails closed for missing files, symlinks, invalid blob SHAs, and truncated trees", async () => {
  for (const options of [
    { tree: [] },
    {
      tree: [{ path: "package.json", type: "blob", sha: "d".repeat(40), mode: "120000" }],
    },
    { tree: [{ path: "package.json", type: "blob", sha: "../other", mode: "100644" }] },
    { truncated: true },
  ]) {
    const fixture = githubFixture(
      { ...artifact(), files: { "package.json": '{"dependencies":{"react":"^20.0.0"}}' } },
      options,
    );
    await expect(publishMaintenance(["publish", fixture.file, base, proposal])).rejects.toThrow();
    expect(fixture.calls.some((call) => call.endpoint.includes("/git/blobs/"))).toBe(false);
    expect(fixture.calls.some((call) => call.method !== "GET")).toBe(false);
  }
});

test("compares dependency manifests with the base blob before writing a tree", async () => {
  const fixture = githubFixture(
    { ...artifact(), files: { "package.json": '{"dependencies":{"react":"^21.0.0"}}' } },
    { tree: [{ path: "package.json", type: "blob", sha: "d".repeat(40), mode: "100644" }] },
  );
  await publishMaintenance(["publish", fixture.file, base, proposal]);
  expect(fixture.calls).toContainEqual(
    expect.objectContaining({ endpoint: `repos/example/pantoken/git/trees/${base}?recursive=1` }),
  );
  expect(
    fixture.calls.some((call) => call.endpoint.endsWith("/git/trees") && call.method === "POST"),
  ).toBe(true);
});

test("rejects workflow content that differs from the proposal blob", async () => {
  const upgrade = {
    depName: "actions/checkout",
    newValue: "v7",
    manager: "github-actions",
    packageFile: ".github/workflows/ci.yml",
  };
  const fixture = githubFixture(
    {
      ...artifact(),
      upgrades: [upgrade],
      accepted: [upgrade],
      files: { [upgrade.packageFile]: "unexpected workflow content" },
    },
    { tree: [{ path: upgrade.packageFile, type: "blob", sha: "d".repeat(40), mode: "100644" }] },
  );
  await expect(publishMaintenance(["publish", fixture.file, base, proposal])).rejects.toThrow(
    "Workflow edits must exactly match",
  );
  expect(fixture.calls).toContainEqual(
    expect.objectContaining({
      endpoint: `repos/example/pantoken/git/trees/${proposal}?recursive=1`,
    }),
  );
  expect(fixture.calls.some((call) => call.method !== "GET")).toBe(false);
});

test("closes exact dependency failure versions after merge, including range-prefixed proposals", async () => {
  const fixture = githubFixture(
    { react: ["^20.0.0"] },
    {
      issues: [
        { number: 31, title: "Compatibility failure: react / ^20.0.0", body: "" },
        { number: 32, title: "Compatibility failure: react / ^20.0.1", body: "" },
      ],
    },
  );
  await publishMaintenance(["reconcile", fixture.file]);
  expect(
    fixture.calls.find((call) => call.endpoint.endsWith("/issues/31") && call.method === "PATCH")
      ?.body.state,
  ).toBe("closed");
  expect(
    fixture.calls.some((call) => call.endpoint.endsWith("/issues/32") && call.method === "PATCH"),
  ).toBe(false);
});

test("publishes component promotion issues and an independent scaffold draft without auto-merge", async () => {
  const empty = { rebrand: [], canvas: [], canvasHighContrast: [] };
  const reviews = componentReviews(empty, empty, {
    core: [],
    custom: ["card"],
    upstream: ["card"],
  });
  const fixture = githubFixture({ ...artifact(), files: {}, componentReviews: reviews });
  await publishMaintenance(["publish", fixture.file, base, proposal]);
  expect(
    fixture.calls.some(
      (call) =>
        call.endpoint.endsWith("/issues") &&
        String(call.body.title).includes("promote-component / card"),
    ),
  ).toBe(true);
  const pr = fixture.calls.find(
    (call) => call.endpoint.endsWith("/pulls") && call.method === "POST",
  );
  expect(pr?.body).toMatchObject({ head: "maintenance/component-reviews", draft: true });
  expect(String(pr?.body.body)).toContain("issues/42");
  expect(fixture.calls.some((call) => call.endpoint === "graphql")).toBe(false);
  expect(
    fixture.calls.some((call) =>
      String(call.body.content).includes("functional deprecated forwarder"),
    ),
  ).toBe(true);
});
