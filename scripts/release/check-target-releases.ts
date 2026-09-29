import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Compatibility, ConsumerEntry } from "./compatibility.ts";

const root = join(import.meta.dirname, "../..");
const npmTargets: Record<string, string> = {
  "@pantoken/next": "next",
  "@pantoken/postcss": "postcss",
  "@pantoken/tailwind": "tailwindcss",
  "@pantoken/vite": "vite",
  "@pantoken/webpack": "webpack",
  "@pantoken/angular": "@angular/core",
  "@pantoken/markdown-it": "markdown-it",
  "@pantoken/react": "react",
  "@pantoken/react-markdown": "react-markdown",
  "@pantoken/storybook": "@storybook/theming",
  "@pantoken/svelte": "svelte",
  "@pantoken/tinymce": "tinymce",
  "@pantoken/vue": "vue",
};

/** An upstream stable release not yet included in an adapter's verified support record. */
export interface PendingRelease {
  package: string;
  path: string;
  target: string;
  version: string;
  url: string;
  testCommand?: string;
}

/** Compare numeric release segments without treating future major versions as supported. */
export function isNewer(version: string, testedThrough: string | undefined): boolean {
  if (!/^\d+(?:\.\d+){1,2}$/u.test(version)) return false;
  if (!testedThrough) return true;
  const candidate = version.split(".").map(Number);
  const tested = testedThrough.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if ((candidate[index] ?? 0) !== (tested[index] ?? 0)) {
      return (candidate[index] ?? 0) > (tested[index] ?? 0);
    }
  }
  return false;
}

/** Query a documented release source and produce a pending review only for stable versions. */
export async function pendingRelease(consumer: ConsumerEntry): Promise<PendingRelease | null> {
  const npm = npmTargets[consumer.package];
  if (!npm && consumer.package !== "@pantoken/wordpress") return null;
  const url = npm
    ? `https://registry.npmjs.org/${encodeURIComponent(npm)}/latest`
    : "https://api.wordpress.org/core/version-check/1.7/";
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${consumer.package} release feed: HTTP ${response.status}`);
  const payload = (await response.json()) as {
    version?: string;
    offers?: Array<{ version: string; response?: string }>;
  };
  const version = npm
    ? payload.version
    : payload.offers?.find((offer) => offer.response === "upgrade")?.version;
  if (
    !version ||
    !isNewer(
      version,
      consumer.targetSupport.status === "verified"
        ? consumer.targetSupport.testedThrough
        : undefined,
    )
  ) {
    return null;
  }
  return {
    package: consumer.package,
    path: consumer.path,
    target: consumer.targetSupport.target,
    version,
    url: npm
      ? `https://www.npmjs.com/package/${npm}/v/${version}`
      : `https://wordpress.org/download/releases/`,
    ...(consumer.targetSupport.status === "verified"
      ? { testCommand: consumer.targetSupport.testCommand }
      : {}),
  };
}

/** Open one review issue per uncovered release and skip issues already open on the repository. */
export async function publishIssues(pending: readonly PendingRelease[]): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository) {
    for (const release of pending)
      console.log(`${release.package}: ${release.version} needs review`);
    return;
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const endpoint = `https://api.github.com/repos/${repository}/issues`;
  const titles = new Set<string>();
  for (let page = 1; ; page += 1) {
    const response = await fetch(`${endpoint}?state=open&per_page=100&page=${page}`, { headers });
    if (!response.ok) throw new Error(`GitHub issues: HTTP ${response.status}`);
    const issues = (await response.json()) as Array<{ title: string }>;
    for (const issue of issues) titles.add(issue.title);
    if (issues.length < 100) break;
  }
  for (const release of pending) {
    const title = `Compatibility review: ${release.package} / ${release.version}`;
    if (titles.has(title)) continue;
    const body = [
      `New ${release.target} release: ${release.url}`,
      `Affected package: \`${release.package}\``,
      `Adapter: \`${release.path}/src\``,
      "",
      "- [ ] Read upstream release notes and inspect the adapter mapping.",
      "- [ ] Run the target integration checks and remap the current output if needed.",
      `- [ ] Update tested releases and the support floor in \`scripts/release/target-compatibility.json\`.`,
      "- [ ] Regenerate the compatibility docs, add a changeset, and close this issue.",
      ...(release.testCommand ? [`Check: \`${release.testCommand}\``] : []),
    ].join("\n");
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) throw new Error(`Create GitHub issue: HTTP ${response.status}`);
    console.log(`Opened ${title}`);
    titles.add(title);
  }
}

/** Check all adapters with a known feed and flag unsupported stable releases for review. */
export async function checkTargetReleases(): Promise<void> {
  const { consumers } = JSON.parse(
    readFileSync(join(root, "compatibility.json"), "utf8"),
  ) as Compatibility;
  const pending: PendingRelease[] = [];
  for (const consumer of consumers) {
    if (!(consumer.package in npmTargets) && consumer.package !== "@pantoken/wordpress") continue;
    const npm = npmTargets[consumer.package];
    if (npm) {
      const manifest = JSON.parse(
        readFileSync(join(root, consumer.path, "package.json"), "utf8"),
      ) as {
        peerDependencies?: Record<string, string>;
      };
      if (!manifest.peerDependencies?.[npm])
        throw new Error(`Missing monitored peer: ${consumer.package} / ${npm}`);
    }
    const release = await pendingRelease(consumer);
    if (release) pending.push(release);
  }
  await publishIssues(pending);
}

if (process.argv[1] === import.meta.filename) {
  await checkTargetReleases();
}
