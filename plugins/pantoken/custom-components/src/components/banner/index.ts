import { SENTINEL } from "../../lib/sentinel.ts";
import { banner as bannerRaw } from "../../generated/component-styles.ts";

/**
 * Build the banner layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function bannerRules(prefix = "instui-"): string {
  return bannerRaw.replaceAll(SENTINEL, prefix);
}
