import { afterEach, expect, test, vi } from "vite-plus/test";
import {
  automationPolicy,
  runAutomationPolicy,
  type AutomationPullRequest,
  type AutomationReview,
} from "./renovate-policy.ts";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

const options = {
  repository: "owner/repo",
  releaseActor: "release-bot",
  renovateActor: "renovate-bot",
};
const pr = (ref = "renovate/weekly-maintenance"): AutomationPullRequest => ({
  head: { ref, sha: "a".repeat(40), repo: { full_name: "owner/repo" } },
  base: { ref: "main" },
  user: { login: "renovate-bot" },
  title: "chore(deps): prepare weekly maintenance",
  draft: false,
  auto_merge: null,
});
const component = () => ({
  ...pr("maintenance/component-reviews"),
  title: "chore(components): scaffold upstream component reviews",
});
const review = (overrides: Partial<AutomationReview> = {}): AutomationReview => ({
  id: 1,
  user: { login: "maintainer", type: "User" },
  state: "APPROVED",
  commit_id: "a".repeat(40),
  maintainer: true,
  ...overrides,
});

test("allows ordinary PRs and authenticated tested bot flows", () => {
  expect(
    automationPolicy(
      { ...pr("feature/work"), title: "feat: work", user: { login: "contributor" } },
      [],
      options,
    ),
  ).toBeNull();
  expect(automationPolicy(pr(), [], options)).toBeNull();
  expect(
    automationPolicy(
      {
        ...pr("changeset-release/main"),
        title: "chore: version packages",
        user: { login: "release-bot" },
      },
      [],
      options,
    ),
  ).toBeNull();
});

test("rejects impostors, fork branches, other bases, and unrecognized reserved branches", () => {
  for (const candidate of [
    { ...pr(), user: { login: "impostor" } },
    { ...pr(), head: { ...pr().head, repo: { full_name: "attacker/fork" } } },
    { ...pr(), base: { ref: "dev" } },
    pr("renovate/unprepared"),
    {
      ...pr("changeset-release/impostor"),
      title: "chore: version packages",
      user: { login: "release-bot" },
    },
  ])
    expect(automationPolicy(candidate, [], options)).not.toBeNull();
  expect(automationPolicy(pr("maintenance/failed-updates"), [], options)).toContain("cannot merge");
});

test("requires a separate human maintainer approval for the current component commit", () => {
  expect(automationPolicy(component(), [review()], options)).toBeNull();
  for (const reviews of [
    [],
    [review({ commit_id: "old" })],
    [review({ maintainer: false })],
    [review({ user: { login: "renovate-bot" } })],
    [review({ user: { login: "other-bot", type: "Bot" } })],
  ])
    expect(automationPolicy(component(), reviews, options)).toContain("human maintainer");
});

test("does not accept stale/dismissed approvals, drafts, auto-merge, or outstanding changes", () => {
  expect(automationPolicy({ ...component(), draft: true }, [review()], options)).toContain("draft");
  expect(automationPolicy({ ...component(), auto_merge: {} }, [review()], options)).toContain(
    "manually",
  );
  expect(
    automationPolicy(component(), [review(), review({ id: 2, state: "DISMISSED" })], options),
  ).toContain("human maintainer");
  expect(
    automationPolicy(
      component(),
      [review(), review({ id: 2, state: "CHANGES_REQUESTED" })],
      options,
    ),
  ).toContain("requested changes");
  expect(
    automationPolicy(component(), [review(), review({ id: 2, state: "COMMENTED" })], options),
  ).toBeNull();
});

function apiFixture(
  candidate: AutomationPullRequest,
  settings: {
    reviews?: Omit<AutomationReview, "maintainer">[];
    permission?: string;
    changed?: boolean;
    denied?: boolean;
  } = {},
) {
  vi.stubEnv("GITHUB_REPOSITORY", options.repository);
  vi.stubEnv("PR_NUMBER", "17");
  vi.stubEnv("GH_TOKEN", "test-status-token");
  vi.stubEnv("GITHUB_RUN_ID", "123");
  vi.stubEnv("RELEASE_ACTOR", options.releaseActor);
  vi.stubEnv("RENOVATE_ACTOR", options.renovateActor);
  let prReads = 0;
  const statuses: Array<{ state: string; context: string; description: string }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      let payload: unknown = {};
      if (url.endsWith("/pulls/17")) {
        prReads += 1;
        if (settings.denied && prReads === 2) return { ok: false, status: 503 };
        payload =
          settings.changed && prReads > 1
            ? { ...candidate, head: { ...candidate.head, sha: "b".repeat(40) } }
            : candidate;
      } else if (url.includes("/reviews?")) payload = settings.reviews ?? [];
      else if (url.endsWith("/permission"))
        payload = { permission: settings.permission ?? "write" };
      else if (url.includes("/statuses/") && typeof init.body === "string")
        statuses.push(JSON.parse(init.body));
      return { ok: true, json: async () => payload };
    }),
  );
  return statuses;
}

test("posts pending then success to the exact PR head with an unchanged required context", async () => {
  const statuses = apiFixture(pr());
  await runAutomationPolicy();
  expect(statuses.map((status) => status.state)).toEqual(["pending", "success"]);
  expect(statuses.every((status) => status.context === "renovate-policy")).toBe(true);
});

test("verifies maintainer permission before accepting current-commit component approval", async () => {
  const statuses = apiFixture(component(), { reviews: [review()] });
  await runAutomationPolicy();
  expect(statuses.at(-1)?.state).toBe("success");
  const denied = apiFixture(component(), { reviews: [review()], permission: "read" });
  await expect(runAutomationPolicy()).rejects.toThrow("human maintainer");
  expect(denied.at(-1)?.state).toBe("failure");
});

test("never publishes success when the head races or GitHub evidence fails", async () => {
  for (const settings of [{ changed: true }, { denied: true }]) {
    const statuses = apiFixture(pr(), settings);
    await expect(runAutomationPolicy()).rejects.toThrow();
    expect(statuses.at(-1)?.state).toBe("failure");
    expect(statuses.some((status) => status.state === "success")).toBe(false);
  }
});

test("reports invalid identities as failures and rejects invalid CLI environment", async () => {
  const statuses = apiFixture({ ...pr(), user: { login: "impostor" } });
  await expect(runAutomationPolicy()).rejects.toThrow("bot identity");
  expect(statuses.at(-1)?.state).toBe("failure");
  vi.stubEnv("PR_NUMBER", "not-a-number");
  await expect(runAutomationPolicy()).rejects.toThrow("required");
});
