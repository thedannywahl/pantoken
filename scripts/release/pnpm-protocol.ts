/**
 * Shared detector for pnpm-only dependency-range protocols (`workspace:`, `catalog:`) that npm can't
 * resolve — must be rewritten to real semver by `pnpm pack`/`pnpm publish` before a package reaches
 * npm. Used by both the publish pipeline's pre-publish guard and the registry audit script.
 */

/** The dependency buckets read back from a package manifest (packed tarball or published version). */
export interface ManifestDeps {
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

const PNPM_ONLY_PROTOCOLS = ["workspace:", "catalog:"];

/** Whether a dependency range is on a pnpm-only protocol that npm can't resolve. Pure. */
function isPnpmOnlyProtocol(range: string): boolean {
  return PNPM_ONLY_PROTOCOLS.some((protocol) => range.startsWith(protocol));
}

/** Every `<name>@<range>` left on a pnpm-only protocol across a manifest's dependency buckets. Pure. */
export function unresolvedPnpmProtocolDeps(manifest: ManifestDeps): string[] {
  const buckets = [
    manifest.dependencies ?? {},
    manifest.optionalDependencies ?? {},
    manifest.peerDependencies ?? {},
  ];
  return buckets
    .flatMap((bucket) => Object.entries(bucket))
    .filter(([, range]) => isPnpmOnlyProtocol(range))
    .map(([name, range]) => `${name}@${range}`);
}
