import { SENTINEL } from "../../lib/sentinel.ts";
import { wrapper } from "../../generated/component-styles.ts";

/**
 * Build the wrapper layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function wrapperRules(prefix = "instui-"): string {
  return wrapper.replaceAll(SENTINEL, prefix);
}
