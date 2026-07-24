/**
 * Canonical npm metadata for every publishable `@pantoken/*` package, shared by the writer
 * (`sync-repository-metadata.ts`) and the gate (`check-repository-metadata.ts`) so the two can never
 * drift. The gate runs on every PR, so whatever the writer emits is exactly what the gate enforces.
 */

/** `repository.url` — required verbatim for npm OIDC provenance; a missing value silently breaks it. */
export const REPOSITORY_URL = "git+https://github.com/thedannywahl/pantoken.git";

/** `homepage` — the docs site root, identical for every package. */
export const HOMEPAGE_URL = "https://pantoken.iywahl.com";

/** `bugs` — the shared issue tracker. */
export const BUGS_URL = "https://github.com/thedannywahl/pantoken/issues";

/** `engines` — mirrors the repo-root Node constraint. */
export const ENGINES: Readonly<Record<string, string>> = { node: ">=22.18.0" };

export interface ExpectedRepository {
  type: "git";
  url: string;
  directory: string;
}

/** The `repository` object for a package, keyed by its repo-relative POSIX path (e.g. `formats/css`). */
export function expectedRepository(directory: string): ExpectedRepository {
  return { type: "git", url: REPOSITORY_URL, directory };
}

interface SurfaceManifest {
  exports?: unknown;
  files?: unknown;
}

/**
 * A package "ships CSS" when its published surface (`exports` or `files`) references a `.css` file —
 * those styles are a side effect a bundler must not tree-shake away.
 */
export function shipsCss(manifest: SurfaceManifest): boolean {
  const surface = JSON.stringify(manifest.exports ?? null) + JSON.stringify(manifest.files ?? null);
  return surface.includes(".css");
}

export type SideEffects = false | string[];

// A CSS-glob array for CSS-shipping packages (keep the styles), `false` otherwise (pure, tree-shakeable).
export function expectedSideEffects(manifest: SurfaceManifest): SideEffects {
  return shipsCss(manifest) ? ["**/*.css"] : false;
}
