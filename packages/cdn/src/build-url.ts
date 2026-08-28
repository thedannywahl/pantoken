import type { CdnBuildOptions, CdnFile, CdnProvider } from "./types.ts";
import { resolveCdnProvider } from "./registry.ts";

/** Build the URL for a single file with the given (or default) provider. */
export function buildFileUrl(
  file: CdnFile,
  providerOrId?: string | CdnProvider,
  options?: CdnBuildOptions,
): string {
  return resolveCdnProvider(providerOrId).buildUrl(file, options);
}

/**
 * Build the URL(s) needed to load a set of files: one combined URL when the provider supports
 * combining and there's more than one file, otherwise one URL per file in the same order.
 */
export function buildFileUrls(
  files: CdnFile[],
  providerOrId?: string | CdnProvider,
  options?: CdnBuildOptions,
): string[] {
  const provider = resolveCdnProvider(providerOrId);
  if (files.length > 1 && provider.supportsCombine && provider.buildCombineUrl)
    return [provider.buildCombineUrl(files, options)];
  return files.map((file) => provider.buildUrl(file, options));
}
