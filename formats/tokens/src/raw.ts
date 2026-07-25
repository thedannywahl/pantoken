/**
 * `@pantoken/tokens/raw` — the raw Tokens Studio JSON, re-published verbatim.
 *
 * Consumers who want the source (or want to run their own Style Dictionary pipeline) get npm +
 * semver access here, without pinning the GitHub-only upstream package. {@link provenance} records
 * the exact upstream this was vendored from (also available at `@pantoken/tokens/meta`).
 *
 * @module
 */
import rawJson from "../generated/raw.json" with { type: "json" };
import { provenance, type Provenance } from "./meta.ts";

/**
 * The raw Tokens Studio token tree (`$themes`, `$metadata`, `primitives`, `rebrand`, `canvas`).
 *
 * @example
 * ```ts
 * import { raw } from "@pantoken/tokens/raw";
 *
 * Object.keys(raw); // ["$themes", "$metadata", "primitives", "rebrand", "canvas"]
 * ```
 */
export const raw: Record<string, unknown> = rawJson as Record<string, unknown>;

/**
 * The upstream provenance this raw JSON was vendored from (re-exported from `@pantoken/tokens/meta`).
 *
 * @example
 * ```ts
 * import { provenance } from "@pantoken/tokens/raw";
 *
 * provenance.designTokens.ref; // "v1.5.0"
 * ```
 */
export { provenance, type Provenance };

export default raw;
