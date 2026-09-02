import { defineCdnProvider } from "../define-provider.ts";
import { fileSpecifier } from "../version.ts";

/**
 * esm.sh — an ESM-transforming CDN; `?raw` serves a file verbatim instead of transforming it,
 * which is required for prebuilt (non-ESM) assets like CSS sheets and IIFE bundles. Set
 * `file.raw = false` to let esm.sh apply its normal transform instead — needed to `import` a real
 * package entry point. No multi-file combine endpoint, one URL per file. https://esm.sh/
 */
export const esmsh = defineCdnProvider({
  id: "esmsh",
  label: "esm.sh",
  supportsCombine: false,
  buildUrl(file, options) {
    const url = `https://esm.sh/${fileSpecifier(file, options?.version)}`;
    return file.raw === false ? url : `${url}?raw`;
  },
});
