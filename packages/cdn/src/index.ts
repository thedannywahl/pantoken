/**
 * `@pantoken/cdn` — model CDN providers and build correct asset URLs for any npm package.
 *
 * `CdnFile` never bakes in any pantoken (or other) package name — callers say which
 * package/path they want, and a provider only knows how to shape a URL from that. jsDelivr
 * (the default) combines multiple files into one request; unpkg and esm.sh don't, so
 * {@link buildFileUrls} falls back to one URL per file for those.
 *
 * @example
 * ```ts
 * import { buildFileUrls } from "@pantoken/cdn";
 *
 * buildFileUrls([{ package: "@pantoken/components", path: "dist/components.css" }]);
 * // → ["https://cdn.jsdelivr.net/npm/@pantoken/components/dist/components.css"]
 *
 * buildFileUrls(
 *   [{ package: "@pantoken/components", path: "dist/components.css" }],
 *   "unpkg",
 *   { version: "1.2.3" },
 * );
 * // → ["https://unpkg.com/@pantoken/components@1.2.3/dist/components.css"]
 * ```
 *
 * @module
 * @beta
 */
export type { CdnBuildOptions, CdnFile, CdnProvider } from "./types.ts";
export { defineCdnProvider, validateCdnProvider } from "./define-provider.ts";
export { CDN_PROVIDERS, DEFAULT_CDN_PROVIDER_ID, resolveCdnProvider } from "./registry.ts";
export { buildFileUrl, buildFileUrls } from "./build-url.ts";
export { assertSafeVersion } from "./version.ts";
export {
  toEsmImportStatements,
  toImportStatements,
  toLinkTags,
  toScriptTagLines,
} from "./format.ts";
export { jsdelivr } from "./providers/jsdelivr.ts";
export { unpkg } from "./providers/unpkg.ts";
export { esmsh } from "./providers/esmsh.ts";
