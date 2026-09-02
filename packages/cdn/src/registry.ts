import type { CdnProvider } from "./types.ts";
import { jsdelivr } from "./providers/jsdelivr.ts";
import { unpkg } from "./providers/unpkg.ts";
import { esmsh } from "./providers/esmsh.ts";

/** Providers available out of the box, keyed by {@link CdnProvider.id}. */
export const CDN_PROVIDERS: Readonly<Record<string, CdnProvider>> = {
  [jsdelivr.id]: jsdelivr,
  [unpkg.id]: unpkg,
  [esmsh.id]: esmsh,
};

/** The provider used when none is specified. */
export const DEFAULT_CDN_PROVIDER_ID = jsdelivr.id;

/**
 * Resolve a provider argument: `undefined` falls back to jsDelivr, a known id string returns the
 * matching built-in provider, and a {@link CdnProvider} object is passed through as-is (so callers
 * can supply a custom provider via {@link defineCdnProvider} without a change to this package).
 *
 * @throws When given an unknown provider id.
 */
export function resolveCdnProvider(idOrProvider?: string | CdnProvider): CdnProvider {
  if (idOrProvider === undefined) return CDN_PROVIDERS[DEFAULT_CDN_PROVIDER_ID]!;
  if (typeof idOrProvider !== "string") return idOrProvider;
  const provider = CDN_PROVIDERS[idOrProvider];
  if (!provider)
    throw new Error(
      `Unknown CDN provider id "${idOrProvider}". Valid ids: ${Object.keys(CDN_PROVIDERS).join(", ")}.`,
    );
  return provider;
}
