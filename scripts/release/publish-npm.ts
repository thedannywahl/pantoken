/**
 * Publish the bumped workspace packages to npm with the **npm CLI** (not pnpm), driven by the changesets
 * action as its `publish` command. Why not `changeset publish`? It shells out to `pnpm publish`, and
 * pnpm's OIDC ("trusted publishing") token exchange is broken (returns 404, then silently skips OIDC —
 * pnpm #9812/#11513), so every publish 404'd. The npm CLI (≥ 11.5.1) is the reference OIDC implementation:
 * with `id-token: write` and a per-package trusted publisher configured on npmjs.com, `npm publish`
 * authenticates token-free and attaches provenance. No `NPM_TOKEN`.
 *
 * The changesets action doesn't need `changeset publish` — it runs whatever `publish` command you give it
 * and parses its stdout for `New tag: <pkg>@<version>` lines (regex
 * `/New tag:\s+(@[^/]+\/[^@]+|[^/]+)@([^\s]+)/`). With `createGithubReleases: true` it then pushes the git
 * tag and creates the GitHub release per parsed line (notes from each package's CHANGELOG.md) — all
 * *before* it inspects our exit code, and it never throws on a non-zero one (`ignoreReturnCode: true`). So
 * we publish with npm, print one `New tag:` line per success, and exit non-zero if any package failed: the
 * succeeded packages still get tagged/released, and the failures still surface as a red step. A re-run is
 * idempotent — already-published versions are skipped, so it retries only what's left.
 *
 * Wired as the `release:publish` task (root `vite.config.ts`). `--dry-run` reports the plan (which
 * versions would publish vs. are already on npm) without publishing.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
} from "./workspace-packages.ts";

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

/** The exact line the changesets action greps for to tag + release a package. Pure. */
export function formatNewTag(pkg: Pick<WorkspacePackage, "name" | "version">): string {
  return `New tag: ${pkg.name}@${pkg.version}`;
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
    stdio: "inherit", // stream npm's output to the action log; our `New tag:` lines go to stdout below
  });
  return result.status === 0;
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const { rootDir, packages } = await loadWorkspacePackages();

  const ordered = orderedPublishablePackages(packages);
  const { toPublish, skipped } = planPublish(ordered, isVersionOnNpm);

  // Diagnostics go to stderr so they never look like a `New tag:` line on the parsed stdout.
  for (const pkg of skipped) console.error(`• skip ${pkg.name}@${pkg.version} (already on npm)`);

  if (dryRun) {
    for (const pkg of toPublish) {
      console.error(`• would publish ${pkg.name}@${pkg.version}`);
      console.log(formatNewTag(pkg));
    }
    console.error(`\nplan: ${toPublish.length} to publish, ${skipped.length} already published.`);
    return;
  }

  const failed: WorkspacePackage[] = [];
  for (const pkg of toPublish) {
    console.error(`\n→ publishing ${pkg.name}@${pkg.version}`);
    if (publishPackage(pkg, rootDir)) {
      console.log(formatNewTag(pkg)); // the changesets action tags + releases this package
    } else {
      failed.push(pkg);
      console.error(`✗ failed to publish ${pkg.name}@${pkg.version} (continuing)`);
    }
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} package(s) failed to publish:`);
    for (const pkg of failed) console.error(`  - ${pkg.name}@${pkg.version}`);
    // Non-zero exit: the succeeded packages were already tagged/released by the action (it parses
    // stdout before checking our exit code), so this only surfaces the failures. Re-run to retry them.
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
