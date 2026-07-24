/**
 * Publish the bumped workspace packages to npm with the **npm CLI** (OIDC trusted publishing), then
 * ensure a git tag + GitHub release exists for each — all idempotently. Driven by the changesets action
 * as its `publish` command (`.github/workflows/release.yml`).
 *
 * Why the npm CLI and not `changeset publish`? `changeset publish` shells out to `pnpm publish`, and
 * pnpm's OIDC token exchange is broken (E404; pnpm #9812/#11513). The npm CLI (≥ 11.5.1) is the reference
 * OIDC implementation: with `id-token: write` and a per-package trusted publisher on npmjs.com,
 * `npm publish` authenticates token-free and attaches provenance. IMPORTANT: CI must invoke this script
 * with plain `node`, NOT `vp run` — the `vp run` launcher scrubs the `ACTIONS_ID_TOKEN_REQUEST_*` env vars
 * npm needs, so npm silently skips OIDC and fails ENEEDAUTH.
 *
 * Why own tags + releases here instead of letting the changesets action do it? The action's `pushTag`
 * runs `git push origin <tag>` on a tag it assumes already exists locally (created by `changeset
 * publish`) and relies on `persist-credentials` — neither holds for us, so it failed
 * ("src refspec … does not match any"). Instead we use `gh release create <tag> --target <sha>`, which
 * creates the tag AND the release via the GitHub API in one authenticated call. It's idempotent — a
 * package whose release already exists is skipped — so a re-run backfills anything missing (a version
 * already on npm but never tagged/released still gets its tag + release). Set `createGithubReleases:
 * false` on the action; this script is the source of truth.
 *
 * `--dry-run` reports what it would publish and which releases it would create, touching nothing.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
} from "./workspace-packages.ts";

const DEFAULT_REPO = "thedannywahl/pantoken";

/**
 * The publishable packages in dependency order (a package's workspace dependencies come before it), so a
 * dependency is on the registry before a dependent that references its just-bumped version is packed.
 * Deterministic: ties and the traversal seed are name-sorted. Pure — no IO.
 */
export function orderedPublishablePackages(all: readonly WorkspacePackage[]): WorkspacePackage[] {
  const publishable = all.filter(isPublishablePackage);
  const names = new Set(publishable.map((pkg) => pkg.name));
  const byName = new Map(publishable.map((pkg) => [pkg.name, pkg]));

  const ordered: WorkspacePackage[] = [];
  const done = new Set<string>();
  const onStack = new Set<string>(); // cycle guard: a workspace dep cycle shouldn't infinite-loop

  const visit = (pkg: WorkspacePackage): void => {
    if (done.has(pkg.name) || onStack.has(pkg.name)) return;
    onStack.add(pkg.name);
    const deps = [...pkg.workspaceDeps].filter((dep) => names.has(dep)).sort();
    for (const dep of deps) {
      const depPkg = byName.get(dep);
      if (depPkg) visit(depPkg);
    }
    onStack.delete(pkg.name);
    done.add(pkg.name);
    ordered.push(pkg);
  };

  for (const pkg of [...publishable].sort((a, b) => a.name.localeCompare(b.name))) visit(pkg);
  return ordered;
}

/** The git tag / GitHub release name for a package version, e.g. `@pantoken/css@0.2.0`. Pure. */
export function tagFor(pkg: Pick<WorkspacePackage, "name" | "version">): string {
  return `${pkg.name}@${pkg.version}`;
}

export interface PublishPlan {
  toPublish: WorkspacePackage[];
  skipped: WorkspacePackage[];
}

/**
 * Split ordered packages into those to publish and those already on the registry, using an injected
 * "is this exact version published?" predicate. Pure — the predicate owns the IO, so this is unit-testable.
 */
export function planPublish(
  ordered: readonly WorkspacePackage[],
  isPublished: (pkg: WorkspacePackage) => boolean,
): PublishPlan {
  const toPublish: WorkspacePackage[] = [];
  const skipped: WorkspacePackage[] = [];
  for (const pkg of ordered) (isPublished(pkg) ? skipped : toPublish).push(pkg);
  return { toPublish, skipped };
}

/**
 * The release notes for a version, pulled from a changesets-style CHANGELOG.md: the lines under the
 * `## <version>` heading, up to the next `## ` heading. Empty string if the version has no section.
 * Pure — no IO.
 */
export function extractChangelogSection(changelog: string, version: string): string {
  const lines = changelog.split("\n");
  const start = lines.findIndex((line) => line.trim() === `## ${version}`);
  if (start === -1) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      end = i;
      break;
    }
  }
  return lines
    .slice(start + 1, end)
    .join("\n")
    .trim();
}

/**
 * Is `<name>@<version>` already on npm? `npm view <spec> version` prints the version and exits 0 when it
 * exists; a missing version exits 0 with empty stdout, and a missing package exits non-zero (E404) — so
 * "published" requires both a zero exit and non-empty stdout. A read-only query; needs no auth.
 */
function isVersionOnNpm(pkg: WorkspacePackage): boolean {
  const result = spawnSync("npm", ["view", `${pkg.name}@${pkg.version}`, "version"], {
    encoding: "utf8",
    shell: false,
  });
  return result.status === 0 && result.stdout.trim().length > 0;
}

/** Publish one package from its own directory. npm does the OIDC exchange + provenance; no token. */
function publishPackage(pkg: WorkspacePackage, rootDir: string): boolean {
  const result = spawnSync("npm", ["publish", "--provenance", "--access", "public"], {
    cwd: path.join(rootDir, pkg.path),
    encoding: "utf8",
    shell: false,
    stdio: "inherit",
  });
  return result.status === 0;
}

interface ReleaseContext {
  repo: string;
  sha: string;
  rootDir: string;
}

/** Whether a GitHub release with exactly this tag exists. Read-only. */
function releaseExists(tag: string, repo: string): boolean {
  const result = spawnSync("gh", ["release", "view", tag, "--repo", repo], {
    encoding: "utf8",
    shell: false,
  });
  return result.status === 0;
}

/**
 * Whether this package version is already released under *either* tag scheme: the changesets-native
 * `<name>@<version>` we now use, or the legacy `<name>@v<version>` from the old custom release scripts.
 * Checking both avoids creating a duplicate release for a version that already shipped under the old tags.
 */
function versionReleased(pkg: WorkspacePackage, repo: string): boolean {
  return releaseExists(tagFor(pkg), repo) || releaseExists(`${pkg.name}@v${pkg.version}`, repo);
}

/** Release notes for a package: its CHANGELOG section for this version, or a minimal fallback. */
function releaseNotes(pkg: WorkspacePackage, rootDir: string): string {
  let changelog: string;
  try {
    changelog = readFileSync(path.join(rootDir, pkg.path, "CHANGELOG.md"), "utf8");
  } catch {
    return `Release ${tagFor(pkg)}.`;
  }
  return extractChangelogSection(changelog, pkg.version) || `Release ${tagFor(pkg)}.`;
}

type EnsureResult = "created" | "exists" | "failed";

/** Create the tag + GitHub release for a package if it doesn't already exist. `gh` does both via API. */
function ensureRelease(pkg: WorkspacePackage, ctx: ReleaseContext): EnsureResult {
  const tag = tagFor(pkg);
  if (versionReleased(pkg, ctx.repo)) return "exists";

  const dir = mkdtempSync(path.join(tmpdir(), "release-notes-"));
  const notesFile = path.join(dir, "notes.md");
  try {
    writeFileSync(notesFile, releaseNotes(pkg, ctx.rootDir));
    const result = spawnSync(
      "gh",
      // prettier-ignore
      [
        "release", "create", tag,
        "--repo", ctx.repo,
        "--target", ctx.sha,
        "--title", tag,
        "--notes-file", notesFile,
      ],
      { encoding: "utf8", shell: false, stdio: "inherit" },
    );
    return result.status === 0 ? "created" : "failed";
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/** The commit to tag: the CI-provided SHA, else the current HEAD (local backfill). */
function resolveSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  const result = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", shell: false });
  return result.status === 0 ? result.stdout.trim() : "HEAD";
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  // Ensure tags + releases only; never publish. For a local backfill where npm OIDC isn't available and
  // publishing must stay in CI. Releases are ensured for versions already on npm.
  const releasesOnly = process.argv.includes("--releases-only");
  const { rootDir, packages } = await loadWorkspacePackages();
  const ctx: ReleaseContext = {
    repo: process.env.GITHUB_REPOSITORY ?? DEFAULT_REPO,
    sha: resolveSha(),
    rootDir,
  };

  const ordered = orderedPublishablePackages(packages);
  const { toPublish, skipped } = planPublish(ordered, isVersionOnNpm);

  // Diagnostics on stderr; stdout stays clean.
  for (const pkg of skipped) console.error(`• on npm: ${tagFor(pkg)}`);

  if (dryRun) {
    for (const pkg of toPublish) console.error(`• would publish ${tagFor(pkg)}`);
    // Everything that is (or would be) on npm should have a release; report which are missing.
    for (const pkg of [...skipped, ...toPublish]) {
      const state = versionReleased(pkg, ctx.repo) ? "release exists" : "would create release";
      console.error(`• ${state}: ${tagFor(pkg)}`);
    }
    console.error(`\nplan: publish ${toPublish.length}, already on npm ${skipped.length}.`);
    return;
  }

  // 1. Publish versions not yet on npm (unless releases-only).
  const published: WorkspacePackage[] = [];
  const failedPublish: WorkspacePackage[] = [];
  if (!releasesOnly) {
    for (const pkg of toPublish) {
      console.error(`\n→ publishing ${tagFor(pkg)}`);
      if (publishPackage(pkg, rootDir)) published.push(pkg);
      else {
        failedPublish.push(pkg);
        console.error(`✗ failed to publish ${tagFor(pkg)} (continuing)`);
      }
    }
  }

  // 2. Ensure a tag + GitHub release for every version now on npm (freshly published or already there).
  //    Idempotent: existing releases are skipped, so this also backfills any that were missed before.
  const failedRelease: WorkspacePackage[] = [];
  let created = 0;
  for (const pkg of [...skipped, ...published]) {
    const result = ensureRelease(pkg, ctx);
    if (result === "created") {
      created++;
      console.error(`✓ released ${tagFor(pkg)}`);
    } else if (result === "failed") {
      failedRelease.push(pkg);
      console.error(`✗ failed to create release ${tagFor(pkg)} (continuing)`);
    }
  }

  console.error(
    `\ndone: published ${published.length}, releases created ${created}, ` +
      `already released ${skipped.length + published.length - created - failedRelease.length}.`,
  );

  if (failedPublish.length > 0 || failedRelease.length > 0) {
    for (const pkg of failedPublish) console.error(`  publish failed: ${tagFor(pkg)}`);
    for (const pkg of failedRelease) console.error(`  release failed: ${tagFor(pkg)}`);
    // Non-zero exit surfaces the failures; a re-run retries only what's still missing (idempotent).
    process.exitCode = 1;
  }
}

function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  return Boolean(entry) && pathToFileURL(path.resolve(entry)).href === metaUrl;
}

if (isDirectExecution(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
