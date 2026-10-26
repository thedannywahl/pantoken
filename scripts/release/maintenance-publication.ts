import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { MaintenanceResult } from "./weekly-maintenance.ts";
import { runAsMain } from "./cli.ts";

const branch = "renovate/weekly-maintenance";
const failureBranch = "maintenance/failed-updates";
const generatedPaths = new Set([
  "pnpm-workspace.yaml",
  "pnpm-lock.yaml",
  "compatibility.json",
  "docs/compatibility.md",
  "formats/tokens/deprecations.json",
  "formats/tokens/known-syntax-issues.json",
  "scripts/release/target-compatibility.json",
  "tools/upstream-diff/baseline/manifest.json",
]);

/** Fail closed before publishing a candidate-produced artifact into a privileged branch. */
export function validateMaintenanceResult(
  value: unknown,
  base: string,
  proposal: string,
): MaintenanceResult {
  assert.ok(value && typeof value === "object", "Missing maintenance artifact");
  const result = value as MaintenanceResult;
  assert.match(base, /^[a-f0-9]{40}$/u);
  assert.match(proposal, /^[a-f0-9]{40}$/u);
  assert.equal(result.base, base, "Stale maintenance base");
  assert.equal(result.proposal, proposal, "Stale Renovate proposal");
  assert.ok(
    Array.isArray(result.upgrades) &&
      Array.isArray(result.accepted) &&
      Array.isArray(result.failures),
  );
  assert.ok(result.files && typeof result.files === "object" && !Array.isArray(result.files));
  assert.ok(
    result.evidence && typeof result.evidence === "object" && !Array.isArray(result.evidence),
  );
  for (const [name, versions] of Object.entries(result.evidence)) {
    assert.match(name, /^@pantoken\/[a-z-]+$/u);
    assert.ok(
      Array.isArray(versions) &&
        versions.every(
          (version) => typeof version === "string" && /^\d+\.\d+(?:\.\d+)?$/u.test(version),
        ),
    );
  }
  for (const upgrade of [...result.upgrades, ...result.accepted]) {
    assert.ok(
      upgrade &&
        typeof upgrade.depName === "string" &&
        typeof upgrade.newValue === "string" &&
        typeof upgrade.manager === "string",
    );
    assert.ok(
      typeof upgrade.packageFile === "string" &&
        /^[\w./@-]+$/u.test(upgrade.packageFile) &&
        !upgrade.packageFile.split("/").some((part) => !part || part === "." || part === ".."),
    );
  }
  for (const upgrade of result.accepted)
    assert.ok(
      result.upgrades.some((original) => JSON.stringify(original) === JSON.stringify(upgrade)),
      "Unproposed accepted update",
    );
  for (const failure of result.failures) {
    assert.match(failure.id, /^[a-f0-9]{20}$/u);
    assert.ok(
      typeof failure.package === "string" &&
        typeof failure.version === "string" &&
        typeof failure.error === "string" &&
        Array.isArray(failure.upgrades),
    );
    for (const upgrade of failure.upgrades)
      assert.ok(
        result.upgrades.some((original) => JSON.stringify(original) === JSON.stringify(upgrade)),
        "Unproposed failed update",
      );
  }
  let bytes = 0;
  for (const [file, content] of Object.entries(result.files)) {
    assert.ok(
      /^[\w./@-]+$/u.test(file) &&
        !file.split("/").some((part) => !part || part === "." || part === ".."),
      `Unsafe artifact path: ${file}`,
    );
    assert.ok(
      generatedPaths.has(file) ||
        /^(?:(?:packages|formats|platforms|renderers|bundlers|design|plugins|tools|ai|apps)\/[\w/-]+\/)?package\.json$/u.test(
          file,
        ) ||
        /^\.changeset\/weekly-[a-f0-9]{20}\.md$/u.test(file) ||
        (file.startsWith(".github/workflows/") &&
          result.accepted.some((upgrade) => upgrade.packageFile === file)),
      `Unexpected generated path: ${file}`,
    );
    assert.ok(content === null || typeof content === "string", "Invalid generated content");
    assert.ok(
      content !== null || !generatedPaths.has(file),
      "Required generated files cannot be deleted",
    );
    bytes += Buffer.byteLength(content ?? "");
    assert.ok(Buffer.byteLength(content ?? "") <= 32 * 1024 * 1024, "Generated file too large");
  }
  assert.ok(bytes <= 100 * 1024 * 1024, "Maintenance artifact too large");
  return result;
}

/** Compare immutable manifest fields independently of dependency changes. */
export function validateMaintenanceManifest(before: string, after: string): void {
  const strip = (source: string): string => {
    const data = JSON.parse(source) as Record<string, unknown>;
    for (const field of [
      "dependencies",
      "optionalDependencies",
      "peerDependencies",
      "devDependencies",
      "overrides",
      "resolutions",
    ])
      delete data[field];
    return JSON.stringify(data);
  };
  assert.equal(
    strip(after),
    strip(before),
    "Maintenance cannot change scripts, versions, exports, or other non-dependency fields",
  );
}

/** Publish a validated maintenance artifact or reconcile evidence already merged to main. */
export async function publishMaintenance(
  args: readonly string[] = process.argv.slice(2),
): Promise<void> {
  const [action, file, base, proposal] = args;
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GH_TOKEN;
  assert.ok(repository && /^[\w.-]+\/[\w.-]+$/u.test(repository), "Repository identity required");
  assert.ok(token, "Publication requires a scoped repository token");
  const api = async <T>(endpoint: string, method = "GET", body?: unknown): Promise<T> => {
    const response = await fetch(`https://api.github.com/${endpoint}`, {
      method,
      signal: AbortSignal.timeout(30_000),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    if (!response.ok) throw new Error(`GitHub ${method} ${endpoint}: HTTP ${response.status}`);
    if (response.status === 204) return undefined as T;
    const payload = (await response.json()) as { errors?: unknown[] };
    assert.ok(!payload.errors?.length, `GitHub ${method} ${endpoint}: GraphQL operation failed`);
    return payload as T;
  };
  const prefix = `repos/${repository}`;
  const defaultBranch = (await api<{ default_branch: string }>(prefix)).default_branch;
  assert.equal(defaultBranch, "main", "Maintenance only supports the protected main release flow");
  const issues: Array<{
    number: number;
    title: string;
    body: string | null;
    pull_request?: unknown;
  }> = [];
  for (let page = 1; ; page += 1) {
    const batch = await api<typeof issues>(`${prefix}/issues?state=open&per_page=100&page=${page}`);
    issues.push(...batch.filter((issue) => !issue.pull_request));
    if (batch.length < 100) break;
  }
  if (action === "reconcile") {
    const evidence = JSON.parse(readFileSync(file, "utf8")) as Record<string, string[]>;
    for (const issue of issues) {
      const match = /^Compatibility (?:review|failure): (.+) \/ (.+)$/u.exec(issue.title);
      if (match && evidence[match[1]]?.includes(match[2])) {
        await api(`${prefix}/issues/${issue.number}/comments`, "POST", {
          body: `Verified ${match[2]} in the merged maintenance evidence on main: https://github.com/${repository}/blob/main/.renovate/verified-targets.json`,
        });
        await api(`${prefix}/issues/${issue.number}`, "PATCH", {
          state: "closed",
          state_reason: "completed",
        });
      }
    }
    return;
  }
  const actor = (await api<{ login: string }>("user")).login;
  assert.equal(
    action,
    "publish",
    "Usage: maintenance-publication.ts <publish|reconcile> FILE BASE PROPOSAL",
  );
  const result = validateMaintenanceResult(JSON.parse(readFileSync(file, "utf8")), base, proposal);
  const mainRef = await api<{ object: { sha: string } }>(`${prefix}/git/ref/heads/main`);
  assert.equal(
    mainRef.object.sha,
    base,
    "Main advanced during preparation; rerun against the new base",
  );
  const content = async (path: string, ref: string): Promise<string> => {
    const file = await api<{ content: string; encoding: string }>(
      `${prefix}/contents/${path}?ref=${ref}`,
    );
    assert.equal(file.encoding, "base64");
    return Buffer.from(file.content, "base64").toString("utf8");
  };
  for (const [path, data] of Object.entries(result.files)) {
    if (path.endsWith("package.json")) {
      assert.ok(data);
      validateMaintenanceManifest(await content(path, base), data);
    }
    if (path.startsWith(".github/workflows/"))
      assert.equal(
        data,
        await content(path, proposal),
        "Workflow edits must exactly match Renovate's proposal",
      );
  }
  const writeTree = async (
    treeBase: string,
    files: Record<string, string | null>,
  ): Promise<string> => {
    const commit = await api<{ tree: { sha: string } }>(`${prefix}/git/commits/${treeBase}`);
    const tree = [];
    for (const [path, data] of Object.entries(files)) {
      const sha =
        data === null
          ? null
          : (
              await api<{ sha: string }>(`${prefix}/git/blobs`, "POST", {
                content: data,
                encoding: "utf-8",
              })
            ).sha;
      tree.push({ path, mode: "100644", type: "blob", sha });
    }
    return (
      await api<{ sha: string }>(`${prefix}/git/trees`, "POST", {
        base_tree: commit.tree.sha,
        tree,
      })
    ).sha;
  };
  const pullRequests = await api<
    Array<{
      number: number;
      node_id: string;
      user: { login: string };
      head: { ref: string; sha: string; repo: { full_name: string } };
      base: { ref: string };
      draft: boolean;
    }>
  >(`${prefix}/pulls?state=open&per_page=100`);
  const publish = async (
    head: string,
    tree: string,
    title: string,
    body: string,
    draft: boolean,
    expected: string,
  ) => {
    let pr = pullRequests.find((candidate) => candidate.head.ref === head);
    if (pr) {
      assert.equal(pr.user.login, actor, "Refusing to overwrite a PR from another actor");
      assert.equal(pr.head.repo.full_name, repository);
      assert.equal(pr.base.ref, "main");
      assert.equal(pr.head.sha, expected, "Maintenance branch changed during validation");
      if (draft && !pr.draft)
        throw new Error(
          "Failure tracking PR was manually marked ready; automation will not overwrite it",
        );
    }
    const parent = pr ? expected : base;
    const commit = await api<{ sha: string }>(`${prefix}/git/commits`, "POST", {
      message: title,
      tree,
      parents: [parent],
      author: { name: "Pantoken Renovate", email: "pantoken-renovate@users.noreply.github.com" },
    });
    if (pr)
      await api(`${prefix}/git/refs/heads/${head}`, "PATCH", { sha: commit.sha, force: false });
    else {
      await api(`${prefix}/git/refs`, "POST", { ref: `refs/heads/${head}`, sha: commit.sha });
      pr = await api<(typeof pullRequests)[number]>(`${prefix}/pulls`, "POST", {
        head,
        base: "main",
        title,
        body,
        draft: true,
      });
    }
    await api(`${prefix}/pulls/${pr.number}`, "PATCH", { title, body });
    return pr;
  };
  const passingFiles = { ...result.files };
  const hasChanges = Object.keys(passingFiles).length > 0;
  let passingCommit = base;
  if (hasChanges) {
    const mergedEvidence = structuredClone(result.evidence);
    for (const upgrade of result.accepted) {
      mergedEvidence[upgrade.depName] = [
        ...new Set([...(mergedEvidence[upgrade.depName] ?? []), upgrade.newValue]),
      ];
    }
    passingFiles[".renovate/verified-targets.json"] =
      `${JSON.stringify(mergedEvidence, null, 2)}\n`;
    passingFiles[".renovate/weekly-upgrades.json"] =
      `${JSON.stringify(result.accepted, null, 2)}\n`;
    const tree = await writeTree(base, passingFiles);
    const pr = await publish(
      branch,
      tree,
      "chore(deps): prepare weekly maintenance",
      `Tested weekly maintenance.\n\n${result.accepted.map((upgrade) => `- ${upgrade.depName}: ${upgrade.newValue}`).join("\n")}\n\nExcluded failures: ${result.failures.length}. Final-head CI remains required.`,
      false,
      proposal,
    );
    passingCommit = (await api<{ head: { sha: string } }>(`${prefix}/pulls/${pr.number}`)).head.sha;
    const rules = await api<
      Array<{ type: string; parameters?: { required_status_checks?: Array<{ context: string }> } }>
    >(`${prefix}/rules/branches/main`);
    const required = rules.flatMap(
      (rule) => rule.parameters?.required_status_checks?.map((check) => check.context) ?? [],
    );
    assert.ok(
      required.includes("ci-gate") && required.includes("changeset-gate"),
      "Protected CI and Changeset checks are required before auto-merge",
    );
    if (pr.draft)
      await api("graphql", "POST", {
        query:
          "mutation($id:ID!){markPullRequestReadyForReview(input:{pullRequestId:$id}){pullRequest{id}}}",
        variables: { id: pr.node_id },
      });
    const enabled = await api<{ errors?: unknown[] }>("graphql", "POST", {
      query:
        "mutation($id:ID!){enablePullRequestAutoMerge(input:{pullRequestId:$id,mergeMethod:SQUASH}){pullRequest{id}}}",
      variables: { id: pr.node_id },
    });
    assert.ok(!enabled.errors?.length, "Could not enable gated auto-merge");
  }
  const issueLinks: string[] = [];
  for (const failure of result.failures) {
    const marker = `<!-- pantoken-maintenance:${failure.id} -->`;
    const title = `Compatibility failure: ${failure.package} / ${failure.version}`;
    const body = `${marker}\n\nCandidate: ${failure.package} ${failure.version}\n\n\`\`\`text\n${failure.error.slice(-12_000)}\n\`\`\`\n\nTracked in the failed-updates draft; excluded from automatic merging.`;
    let issue = issues.find(
      (issue) =>
        issue.body?.includes(marker) ||
        issue.title === title ||
        issue.title === `Compatibility review: ${failure.package} / ${failure.version}`,
    );
    if (issue) await api(`${prefix}/issues/${issue.number}`, "PATCH", { title, body });
    else {
      issue = await api<(typeof issues)[number]>(`${prefix}/issues`, "POST", { title, body });
      issues.push(issue);
    }
    issueLinks.push(`- https://github.com/${repository}/issues/${issue.number}`);
  }
  if (result.failures.length) {
    const failedFiles: Record<string, string | null> = {
      ".renovate/failed-targets.json": `${JSON.stringify(result.failures, null, 2)}\n`,
    };
    for (const failure of result.failures)
      for (const upgrade of failure.upgrades)
        failedFiles[upgrade.packageFile] = await content(upgrade.packageFile, proposal);
    if (result.failures.some((failure) => failure.upgrades.length))
      failedFiles["pnpm-lock.yaml"] = await content("pnpm-lock.yaml", proposal);
    const existing = pullRequests.find((pr) => pr.head.ref === failureBranch);
    await publish(
      failureBranch,
      await writeTree(passingCommit, failedFiles),
      "chore(deps): track failed maintenance updates",
      `Failed candidate updates, never auto-merged.\n\n${issueLinks.join("\n")}`,
      true,
      existing?.head.sha ?? base,
    );
  }
}

runAsMain(import.meta.url, publishMaintenance);
