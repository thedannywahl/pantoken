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
 * runs `git push origin <tag>` on a tag it assumes already exists locally (created by
 * `changeset publish`) and relies on `persist-credentials` — neither holds for us, so it failed
 * ("src refspec … does not match any"). Instead we use `gh release create <tag> --target <sha>`, which
 * creates the tag AND the release via the GitHub API in one authenticated call. It's idempotent — a
 * package whose release already exists is skipped — so a re-run backfills anything missing (a version
 * already on npm but never tagged/released still gets its tag + release). Set
 * `createGithubReleases: false` on the action; this script is the source of truth.
 *
 * `--dry-run` reports what it would publish and which releases it would create, touching nothing.
 */
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { runAsMain } from "./cli.ts";
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

/** The publish split: packages to publish now, and those already on the registry (skipped). */
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

/** CLI mode flags derived from argv. */
interface RunMode {
  dryRun: boolean;
  releasesOnly: boolean;
}

/** Best-effort filename extraction from either supported npm pack JSON shape. */
function extractPackFilename(parsed: unknown): string | undefined {
  return filenameFromPackArray(parsed) ?? filenameFromPackObject(parsed);
}

/** npm ≤ 11 pack shape: an array with one record. */
function filenameFromPackArray(parsed: unknown): string | undefined {
  if (!Array.isArray(parsed)) return undefined;
  const first = parsed[0] as { filename?: string } | undefined;
  return first?.filename;
}

/** Coerce unknown JSON into the npm 12 object map shape when possible. */
function asPackRecordMap(parsed: unknown): Record<string, { filename?: string }> {
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    return parsed as Record<string, { filename?: string }>;
  }
  return {};
}

/** npm 12 pack shape: object keyed by package name. */
function filenameFromPackObject(parsed: unknown): string | undefined {
  const first = Object.values(asPackRecordMap(parsed))[0];
  return first?.filename;
}

/** Parse `npm pack --json` output and extract the tarball filename. */
function parsePackFilename(stdout: string, pkgDir: string): string | null {
  try {
    const parsed = JSON.parse(stdout) as unknown;
    const filename = extractPackFilename(parsed);
    if (filename) return filename;
    console.error(`  npm pack in ${pkgDir} did not return a tarball filename.`);
    return null;
  } catch {
    const preview = stdout.trim().slice(0, 200);
    console.error(`  npm pack JSON parse failed in ${pkgDir}. stdout=${JSON.stringify(preview)}`);
    return null;
  }
}

/** Run `npm pack --json` and return the tarball filename, or null on failure. */
function npmPackFilename(pkgDir: string): string | null {
  const result = spawnSync("npm", ["pack", "--json"], {
    cwd: pkgDir,
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) {
    const reason = result.stderr.trim() || `exit ${result.status}`;
    console.error(`  npm pack failed in ${pkgDir}: ${reason}`);
    return null;
  }
  return parsePackFilename(result.stdout, pkgDir);
}

/** Move a packed tarball into the shared provenance subject directory. */
function movePackedTarball(srcTgz: string, destTgz: string, tag: string): boolean {
  const moveResult = spawnSync("mv", [srcTgz, destTgz], {
    encoding: "utf8",
    shell: false,
  });
  if (moveResult.status === 0 && existsSync(destTgz)) return true;
  const reason = moveResult.stderr.trim() || `exit ${moveResult.status}`;
  console.error(`  failed to move packed tarball for ${tag}: ${reason}`);
  return false;
}

/** Upload one packed tarball asset to a GitHub release. */
function uploadPackedTarball(tag: string, repo: string, destTgz: string): void {
  const uploadResult = spawnSync(
    "gh",
    ["release", "upload", tag, destTgz, "--repo", repo, "--clobber"],
    { encoding: "utf8", shell: false, stdio: "inherit" },
  );
  if (uploadResult.status !== 0)
    console.error(`  tarball upload failed for ${tag} (provenance will still run).`);
}

/** Pack the package and upload the tarball to its GitHub release; returns the local .tgz path or null. */
function packAndUpload(
  pkg: WorkspacePackage,
  tag: string,
  repo: string,
  rootDir: string,
): string | null {
  const packsDir = path.join(process.env.RUNNER_TEMP ?? tmpdir(), "pantoken-packs");
  mkdirSync(packsDir, { recursive: true });
  const pkgDir = path.join(rootDir, pkg.path);
  const tgzName = npmPackFilename(pkgDir);
  if (!tgzName) {
    console.error(`  pack failed for ${tag}; no tarball recorded for provenance.`);
    return null;
  }
  const srcTgz = path.join(pkgDir, tgzName);
  const destTgz = path.join(packsDir, tgzName);
  // Move the tgz to the shared packs dir so attest-build-provenance can glob it.
  if (!movePackedTarball(srcTgz, destTgz, tag)) return null;
  uploadPackedTarball(tag, repo, destTgz);
  return destTgz;
}

/** Parse `--dry-run` and `--releases-only` flags from process argv. */
function getRunMode(argv: readonly string[]): RunMode {
  return {
    dryRun: argv.includes("--dry-run"),
    releasesOnly: argv.includes("--releases-only"),
  };
}

/** Log versions that are already present on npm and therefore skipped for publish. */
function logSkippedOnNpm(skipped: readonly WorkspacePackage[]): void {
  for (const pkg of skipped) console.error(`• on npm: ${tagFor(pkg)}`);
}

/** Print final run counts in a stable one-line summary for release logs. */
function printCompletionSummary(
  published: readonly WorkspacePackage[],
  skipped: readonly WorkspacePackage[],
  created: number,
  failedRelease: readonly WorkspacePackage[],
): void {
  const alreadyReleased = skipped.length + published.length - created - failedRelease.length;
  console.error(
    `\ndone: published ${published.length}, releases created ${created}, ` +
      `already released ${alreadyReleased}.`,
  );
}

/** Print package-level failures that should be retried by a rerun. */
function logFailures(
  failedPublish: readonly WorkspacePackage[],
  failedRelease: readonly WorkspacePackage[],
): void {
  for (const pkg of failedPublish) console.error(`  publish failed: ${tagFor(pkg)}`);
  for (const pkg of failedRelease) console.error(`  release failed: ${tagFor(pkg)}`);
}

/** Whether this run had either publish failures or release failures. */
function isFailureResult(
  failedPublish: readonly WorkspacePackage[],
  failedRelease: readonly WorkspacePackage[],
): boolean {
  return failedPublish.length > 0 || failedRelease.length > 0;
}

/** Select publish behavior: real publish path or releases-only no-op publish split. */
function publishSelection(
  releasesOnly: boolean,
  toPublish: readonly WorkspacePackage[],
  rootDir: string,
): { published: WorkspacePackage[]; failedPublish: WorkspacePackage[] } {
  if (releasesOnly) return { published: [], failedPublish: [] };
  return publishPending([...toPublish], rootDir);
}

/** Emit completion logs and set non-zero exit code when failures occurred. */
function finishRun(
  published: readonly WorkspacePackage[],
  skipped: readonly WorkspacePackage[],
  created: number,
  failedPublish: readonly WorkspacePackage[],
  failedRelease: readonly WorkspacePackage[],
): void {
  printCompletionSummary(published, skipped, created, failedRelease);
  if (!isFailureResult(failedPublish, failedRelease)) return;
  logFailures(failedPublish, failedRelease);
  // Non-zero exit surfaces the failures; a re-run retries only what's still missing (idempotent).
  process.exitCode = 1;
}

/** Append the release tag to the RUNNER_TEMP tags file for the provenance step. */
function recordRelease(tag: string): void {
  const tagsFile = path.join(process.env.RUNNER_TEMP ?? tmpdir(), "pantoken-release-tags.txt");
  appendFileSync(tagsFile, `${tag}\n`, "utf8");
}

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
    if (result.status !== 0) return "failed";
    // Pack + upload the tarball so the release has a non-source artifact; enables SLSA provenance.
    const packed = packAndUpload(pkg, tag, ctx.repo, ctx.rootDir);
    if (!packed) return "failed";
    recordRelease(tag);
    return "created";
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

/** Print the dry-run plan on stderr: what would publish, and each version's release existence. */
function printDryRunPlan(
  toPublish: WorkspacePackage[],
  skipped: WorkspacePackage[],
  ctx: ReleaseContext,
): void {
  for (const pkg of toPublish) console.error(`• would publish ${tagFor(pkg)}`);
  // Everything that is (or would be) on npm should have a release; report which are missing.
  for (const pkg of [...skipped, ...toPublish]) {
    const state = versionReleased(pkg, ctx.repo) ? "release exists" : "would create release";
    console.error(`• ${state}: ${tagFor(pkg)}`);
  }
  console.error(`\nplan: publish ${toPublish.length}, already on npm ${skipped.length}.`);
}

/** Publish each pending version (best-effort, continuing past failures); returns the split. */
function publishPending(
  toPublish: WorkspacePackage[],
  rootDir: string,
): { published: WorkspacePackage[]; failedPublish: WorkspacePackage[] } {
  const published: WorkspacePackage[] = [];
  const failedPublish: WorkspacePackage[] = [];
  for (const pkg of toPublish) {
    console.error(`\n→ publishing ${tagFor(pkg)}`);
    if (publishPackage(pkg, rootDir)) published.push(pkg);
    else {
      failedPublish.push(pkg);
      console.error(`✗ failed to publish ${tagFor(pkg)} (continuing)`);
    }
  }
  return { published, failedPublish };
}

/**
 * Ensure a tag + GitHub release for every given version (idempotent — existing releases are skipped, so
 * this also backfills any missed before); returns the created count and any failures.
 */
function ensureReleases(
  pkgs: WorkspacePackage[],
  ctx: ReleaseContext,
): { created: number; failedRelease: WorkspacePackage[] } {
  const failedRelease: WorkspacePackage[] = [];
  let created = 0;
  for (const pkg of pkgs) {
    const result = ensureRelease(pkg, ctx);
    if (result === "created") {
      created++;
      console.error(`✓ released ${tagFor(pkg)}`);
    } else if (result === "failed") {
      failedRelease.push(pkg);
      console.error(`✗ failed to create release ${tagFor(pkg)} (continuing)`);
    }
  }
  return { created, failedRelease };
}

async function main(): Promise<void> {
  const { dryRun, releasesOnly } = getRunMode(process.argv);
  const { rootDir, packages } = await loadWorkspacePackages();
  const ctx: ReleaseContext = {
    repo: process.env.GITHUB_REPOSITORY ?? DEFAULT_REPO,
    sha: resolveSha(),
    rootDir,
  };

  const ordered = orderedPublishablePackages(packages);
  const { toPublish, skipped } = planPublish(ordered, isVersionOnNpm);

  // Diagnostics on stderr; stdout stays clean.
  logSkippedOnNpm(skipped);

  if (dryRun) {
    printDryRunPlan(toPublish, skipped, ctx);
    return;
  }

  // 1. Publish versions not yet on npm (unless releases-only).
  const { published, failedPublish } = publishSelection(releasesOnly, toPublish, rootDir);

  // 2. Ensure a tag + GitHub release for every version now on npm (freshly published or already there).
  const { created, failedRelease } = ensureReleases([...skipped, ...published], ctx);
  finishRun(published, skipped, created, failedPublish, failedRelease);
}

runAsMain(import.meta.url, main);
