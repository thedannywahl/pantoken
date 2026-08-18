/**
 * One-off audit: scan every already-published `@pantoken/*` package version on npm for a dependency
 * range still on a pnpm-only protocol — `workspace:` or `catalog:` (the bug fixed by packing with
 * `pnpm pack` instead of `npm pack`/`npm publish` in publish-npm.ts). Read-only — makes no changes,
 * publishes nothing.
 *
 * Run with `node scripts/release/audit-workspace-protocol.ts`. Reports affected `package@version`
 * ranges on stderr and exits non-zero when any are found, so the output can drive the changeset +
 * `npm deprecate` follow-up for each affected package.
 */
import { spawnSync } from "node:child_process";
import process from "node:process";
import { runAsMain } from "./cli.ts";
import { unresolvedPnpmProtocolDeps, type ManifestDeps } from "./pnpm-protocol.ts";
import { isPublishablePackage, loadWorkspacePackages } from "./workspace-packages.ts";

export type { ManifestDeps };

/** Every `<name>@<range>` left on a pnpm-only protocol across a manifest's dependency buckets. Pure. */
export const unresolvedWorkspaceDeps = unresolvedPnpmProtocolDeps;

/** Parse `npm view <name> versions --json`, which prints a bare string for a single published version. */
export function parseVersionsJson(stdout: string): string[] {
  try {
    const parsed = JSON.parse(stdout) as unknown;
    if (Array.isArray(parsed)) return parsed.filter((v): v is string => typeof v === "string");
    if (typeof parsed === "string") return [parsed];
    return [];
  } catch {
    return [];
  }
}

/** Every published version of `name`, oldest first; `[]` if unpublished or the query fails. */
function publishedVersions(name: string): string[] {
  const result = spawnSync("npm", ["view", name, "versions", "--json"], {
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0 || result.stdout.trim().length === 0) return [];
  return parseVersionsJson(result.stdout);
}

/** The published manifest for one exact version, or null if it can't be read. */
function publishedManifest(name: string, version: string): ManifestDeps | null {
  const result = spawnSync("npm", ["view", `${name}@${version}`, "--json"], {
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0 || result.stdout.trim().length === 0) return null;
  try {
    return JSON.parse(result.stdout) as ManifestDeps;
  } catch {
    return null;
  }
}

/** One affected published version and the unresolved deps found in it. */
export interface AuditFinding {
  name: string;
  version: string;
  offenders: string[];
}

/** The finding for one published version, or null if its manifest is unreadable or fully resolved. */
function findingForVersion(name: string, version: string): AuditFinding | null {
  const manifest = publishedManifest(name, version);
  if (!manifest) {
    console.error(`  ! ${name}@${version}: could not read manifest, skipping`);
    return null;
  }
  const offenders = unresolvedWorkspaceDeps(manifest);
  return offenders.length > 0 ? { name, version, offenders } : null;
}

/** Audit every published version of one package; logs progress on stderr. */
export function auditPackage(name: string): AuditFinding[] {
  const versions = publishedVersions(name);
  if (versions.length === 0) {
    console.error(`• ${name}: not on npm, skipping`);
    return [];
  }
  const findings = versions
    .map((version) => findingForVersion(name, version))
    .filter((finding): finding is AuditFinding => finding !== null);
  console.error(`✓ audited ${name} (${versions.length} version(s))`);
  return findings;
}

async function main(): Promise<void> {
  const { packages } = await loadWorkspacePackages();
  const names = packages
    .filter(isPublishablePackage)
    .map((pkg) => pkg.name)
    .sort((a, b) => a.localeCompare(b));

  const findings = names.flatMap(auditPackage);

  if (findings.length === 0) {
    console.error("\nNo published version with an unresolved workspace: dependency found.");
    return;
  }

  console.error(`\n${findings.length} affected version(s):`);
  for (const finding of findings) {
    console.error(`  ${finding.name}@${finding.version}: ${finding.offenders.join(", ")}`);
  }
  process.exitCode = 1;
}

runAsMain(import.meta.url, main);
