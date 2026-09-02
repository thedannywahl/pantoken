import { defineCdnProvider } from "../define-provider.ts";
import { fileSpecifier } from "../version.ts";

/**
 * jsDelivr — supports its `/combine/` endpoint to concatenate multiple files in one request.
 * https://www.jsdelivr.com/documentation
 */
export const jsdelivr = defineCdnProvider({
  id: "jsdelivr",
  label: "jsDelivr",
  supportsCombine: true,
  buildUrl(file, options) {
    return `https://cdn.jsdelivr.net/npm/${fileSpecifier(file, options?.version)}`;
  },
  buildCombineUrl(files, options) {
    const entries = files.map((file) => `npm/${fileSpecifier(file, options?.version)}`);
    return `https://cdn.jsdelivr.net/combine/${entries.join(",")}`;
  },
});
