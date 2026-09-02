import type { CdnFile } from "./types.ts";

/** Characters that would break out of a URL path segment or corrupt the generated markup. */
const UNSAFE_VERSION_CHARS = /["'<>\s/\\]/;

/**
 * Validate a version string (or npm dist-tag/semver range) is safe to interpolate into a URL.
 *
 * @throws When the version contains characters that could corrupt the generated URL/markup.
 */
export function assertSafeVersion(version: string): void {
  if (UNSAFE_VERSION_CHARS.test(version))
    throw new Error(`Unsafe CDN version string: "${version}".`);
}

/** Resolves the version to use for a file: its own override, then the build-level default. */
function resolveVersion(file: CdnFile, fallback?: string): string | undefined {
  const version = file.version ?? fallback;
  if (version !== undefined) assertSafeVersion(version);
  return version;
}

/** `package[@version]` — the package specifier segment shared by every provider's URL shape. */
function packageSpecifier(file: CdnFile, fallback?: string): string {
  const version = resolveVersion(file, fallback);
  return version ? `${file.package}@${version}` : file.package;
}

/** `package[@version][/path]` — the full specifier, omitting the path segment when there isn't one. */
export function fileSpecifier(file: CdnFile, fallback?: string): string {
  const base = packageSpecifier(file, fallback);
  return file.path ? `${base}/${file.path}` : base;
}
