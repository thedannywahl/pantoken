import { runAsMain } from "./cli.ts";

/** GitHub PR identity fields used by the trusted merge-policy workflow. */
export interface AutomationPullRequest {
  head: { ref: string; sha: string; repo: { full_name: string } | null };
  base: { ref: string };
  user: { login: string };
  title: string;
  draft: boolean;
  auto_merge: unknown;
}

/** An approval carries the exact reviewed commit and separately verified repository permission. */
export interface AutomationReview {
  id: number;
  user: { login: string; type?: string };
  state: string;
  commit_id: string;
  maintainer: boolean;
}

/** Repository-controlled expected identities; neither comes from the PR branch. */
export interface AutomationPolicyOptions {
  repository: string;
  releaseActor: string;
  renovateActor: string;
}

/** Reject impersonation and unresolved maintenance while preserving checked bot auto-merges. */
export function automationPolicy(
  pr: AutomationPullRequest,
  reviews: readonly AutomationReview[],
  options: AutomationPolicyOptions,
): string | null {
  const head = pr.head.ref;
  const failed =
    head === "maintenance/failed-updates" || head.startsWith("maintenance/failed-updates/");
  if (failed)
    return "Failed maintenance candidates cannot merge; fix or split the failing updates first.";
  const component =
    head === "maintenance/component-reviews" ||
    pr.title === "chore(components): scaffold upstream component reviews";
  const version =
    head.startsWith("changeset-release/") || pr.title.startsWith("chore: version packages");
  const renovate =
    head.startsWith("renovate/") || pr.title === "chore(deps): prepare weekly maintenance";
  if (!component && !version && !renovate) return null;
  if (pr.base.ref !== "main" || pr.head.repo?.full_name !== options.repository)
    return "Automation PRs must originate in this repository and target main.";
  const actor = version ? options.releaseActor : options.renovateActor;
  if (pr.user.login.toLowerCase() !== actor.toLowerCase())
    return "Automation PR author does not match the configured bot identity.";
  if (version && (head !== "changeset-release/main" || pr.title !== "chore: version packages"))
    return "Version PR branch/title does not match the authenticated Changesets flow.";
  if (renovate && head !== "renovate/weekly-maintenance")
    return "Only the consolidated weekly Renovate branch may use automated maintenance merging.";
  if (!component) return null;
  if (head !== "maintenance/component-reviews")
    return "Component follow-up must use its dedicated review branch.";
  if (pr.draft)
    return "Component follow-up is still a draft and requires implementation and human review.";
  if (pr.auto_merge != null)
    return "Component follow-up must be merged manually, not through auto-merge.";
  const latest = new Map<string, AutomationReview>();
  for (const review of [...reviews].sort((left, right) => left.id - right.id)) {
    if (
      review.state === "COMMENTED" ||
      !review.maintainer ||
      review.user.type === "Bot" ||
      review.user.login.toLowerCase() === pr.user.login.toLowerCase()
    )
      continue;
    latest.set(review.user.login.toLowerCase(), review);
  }
  if ([...latest.values()].some((review) => review.state === "CHANGES_REQUESTED"))
    return "A maintainer has requested changes on this component follow-up.";
  if (
    ![...latest.values()].some(
      (review) => review.state === "APPROVED" && review.commit_id === pr.head.sha,
    )
  )
    return "A human maintainer other than the PR author must approve the current head commit.";
  return null;
}

/** Evaluate current GitHub evidence and publish the policy status on that exact head commit. */
export async function runAutomationPolicy(): Promise<void> {
  const repository = process.env.GITHUB_REPOSITORY ?? "";
  const number = process.env.PR_NUMBER ?? "";
  const token = process.env.GH_TOKEN;
  if (!/^[\w.-]+\/[\w.-]+$/u.test(repository) || !/^\d+$/u.test(number) || !token)
    throw new Error("Repository, PR number, and status token are required");
  const api = async <T>(path: string, method = "GET", body?: unknown): Promise<T> => {
    const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, {
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
    if (!response.ok) throw new Error(`GitHub policy API: HTTP ${response.status}`);
    return (await response.json()) as T;
  };
  const pr = await api<AutomationPullRequest>(`pulls/${number}`);
  if (!/^[a-f0-9]{40}$/u.test(pr.head.sha)) throw new Error("Invalid PR head SHA");
  const status = (state: "pending" | "success" | "failure", description: string) =>
    api(`statuses/${pr.head.sha}`, "POST", {
      state,
      context: "renovate-policy",
      description: description.slice(0, 140),
      target_url: `https://github.com/${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`,
    });
  await status("pending", "Checking trusted automation merge policy");
  try {
    const reviews: AutomationReview[] = [];
    if (pr.head.ref === "maintenance/component-reviews") {
      for (let page = 1; ; page += 1) {
        const batch = await api<Omit<AutomationReview, "maintainer">[]>(
          `pulls/${number}/reviews?per_page=100&page=${page}`,
        );
        for (const review of batch) {
          let maintainer = false;
          if (
            review.user.type !== "Bot" &&
            review.user.login.toLowerCase() !== pr.user.login.toLowerCase()
          ) {
            const permission = await api<{ permission: string }>(
              `collaborators/${encodeURIComponent(review.user.login)}/permission`,
            );
            maintainer = ["admin", "maintain", "write"].includes(permission.permission);
          }
          reviews.push({ ...review, maintainer });
        }
        if (batch.length < 100) break;
      }
    }
    const failure = automationPolicy(pr, reviews, {
      repository,
      releaseActor: process.env.RELEASE_ACTOR || repository.split("/")[0],
      renovateActor:
        process.env.RENOVATE_ACTOR || process.env.RELEASE_ACTOR || repository.split("/")[0],
    });
    const current = await api<AutomationPullRequest>(`pulls/${number}`);
    if (current.head.sha !== pr.head.sha)
      throw new Error("PR head changed during policy evaluation; waiting for the new run");
    if (failure) {
      await status("failure", failure);
      throw new Error(failure);
    }
    await status("success", "Automation identity and review policy satisfied");
  } catch (error) {
    await status(
      "failure",
      error instanceof Error ? error.message : "Automation policy evaluation failed",
    );
    throw error;
  }
}

runAsMain(import.meta.url, runAutomationPolicy);
