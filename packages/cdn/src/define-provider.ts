import type { CdnProvider } from "./types.ts";

/**
 * Validate a provider's structure: non-empty `id`/`label`, `buildUrl` is a function, and
 * `buildCombineUrl` is present iff `supportsCombine` is true.
 *
 * @throws When the provider fails structural validation.
 */
export function validateCdnProvider(provider: CdnProvider): void {
  if (!provider.id || typeof provider.id !== "string")
    throw new Error("CDN provider has no id or id is not a string.");
  if (!provider.label || typeof provider.label !== "string")
    throw new Error(`CDN provider "${provider.id}" has no label or label is not a string.`);
  if (typeof provider.buildUrl !== "function")
    throw new Error(`CDN provider "${provider.id}" has no buildUrl function.`);
  if (provider.supportsCombine && typeof provider.buildCombineUrl !== "function")
    throw new Error(
      `CDN provider "${provider.id}" declares supportsCombine: true but has no buildCombineUrl function.`,
    );
  if (!provider.supportsCombine && provider.buildCombineUrl !== undefined)
    throw new Error(
      `CDN provider "${provider.id}" declares supportsCombine: false but has a buildCombineUrl function.`,
    );
}

/**
 * Create a CDN provider from its config. The result is validated before it's returned.
 */
export function defineCdnProvider(config: CdnProvider): CdnProvider {
  validateCdnProvider(config);
  return { ...config };
}
