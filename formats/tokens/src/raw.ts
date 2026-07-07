/**
 * `@pantoken/tokens/raw` — the raw Tokens Studio JSON, re-published verbatim.
 *
 * Consumers who want the source (or want to run their own Style Dictionary pipeline) get npm +
 * semver access here, without pinning the GitHub-only upstream package. {@link provenance} records
 * the exact upstream version this was vendored from.
 *
 * @module
 */
import metaJson from "../generated/meta.json" with { type: "json" };
import rawJson from "../generated/raw.json" with { type: "json" };

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
 * The upstream package and version this raw JSON was vendored from.
 *
 * @example
 * ```ts
 * import { provenance } from "@pantoken/tokens/raw";
 *
 * provenance; // { upstream: "@instructure/instructure-design-tokens", upstreamVersion: "…" }
 * ```
 */
export const provenance: { upstream: string; upstreamVersion: string } = metaJson;

export default raw;
