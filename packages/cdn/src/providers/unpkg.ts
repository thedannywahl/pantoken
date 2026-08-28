import { defineCdnProvider } from "../define-provider.ts";
import { fileSpecifier } from "../version.ts";

/**
 * unpkg — no multi-file combine endpoint, one URL per file.
 * https://unpkg.com/
 */
export const unpkg = defineCdnProvider({
  id: "unpkg",
  label: "unpkg",
  supportsCombine: false,
  buildUrl(file, options) {
    return `https://unpkg.com/${fileSpecifier(file, options?.version)}`;
  },
});
