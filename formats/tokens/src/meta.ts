/**
 * `@pantoken/tokens/meta` — upstream provenance for the vendored IR.
 *
 * Records the pinned ref + resolved commit of the GitHub-only design-tokens source and the resolved
 * version of `@instructure/ui-icons`. This is the single source the upgrade pipeline (the drift diff
 * and the compatibility manifest) reads to know exactly what upstream this build was vendored from.
 *
 * @module
 */
import metaJson from "../generated/meta.json" with { type: "json" };

/** The upstream source a `@pantoken/tokens` build was vendored from. */
export interface Provenance {
  /** The GitHub-only design-tokens source (feeds the token IR). */
  designTokens: {
    /** The upstream package name. */
    package: string;
    /** The pinned `#ref` (e.g. `v1.5.0`), or `unpinned`. */
    ref: string;
    /** The resolved commit sha (from the lockfile), or `unknown`. */
    commit: string;
  };
  /** The `@instructure/ui-icons` source (feeds the icon layer). */
  uiIcons: {
    /** The upstream package name. */
    package: string;
    /** The resolved semver version. */
    resolved: string;
  };
}

/**
 * The upstream provenance of this vendored build.
 *
 * @example
 * ```ts
 * import { provenance } from "@pantoken/tokens/meta";
 *
 * provenance.designTokens.ref; // "v1.5.0"
 * provenance.uiIcons.resolved;  // "11.7.4"
 * ```
 */
export const provenance: Provenance = metaJson;

export default provenance;
