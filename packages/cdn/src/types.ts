/**
 * A single file to load from a CDN, identified by npm package name and path within it.
 */
export interface CdnFile {
  /** The npm package name, e.g. `"@pantoken/components"`. */
  package: string;
  /** The path within the package, e.g. `"dist/components.css"`. Omit to reference the package root. */
  path?: string;
  /** Overrides the provider/build-level version for this file only. */
  version?: string;
  /**
   * For providers that transform JS by default (esm.sh): `false` lets the provider apply its normal
   * ESM transform (needed to `import` a real package entry point). Defaults to `true` — serve the
   * file verbatim, required for prebuilt/non-ESM assets like CSS sheets and IIFE bundles.
   */
  raw?: boolean;
}

/** Options accepted by a provider's URL builders. */
export interface CdnBuildOptions {
  /** Pins the package version (or npm dist-tag/semver range). Omit to resolve to `latest`. */
  version?: string;
}

/**
 * A CDN that can serve npm package files. Providers never hardcode a package name — they only
 * know how to shape a URL from a {@link CdnFile}.
 */
export interface CdnProvider {
  /** Stable identifier, e.g. `"jsdelivr"`. */
  id: string;
  /** Human-readable name, e.g. `"jsDelivr"`. */
  label: string;
  /** Whether {@link CdnProvider.buildCombineUrl} is implemented. */
  supportsCombine: boolean;
  /** Builds the URL for a single file. */
  buildUrl(file: CdnFile, options?: CdnBuildOptions): string;
  /** Builds one URL that serves multiple files concatenated together. Required iff `supportsCombine`. */
  buildCombineUrl?(files: CdnFile[], options?: CdnBuildOptions): string;
}
