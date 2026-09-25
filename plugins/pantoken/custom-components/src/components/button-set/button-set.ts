import { SENTINEL } from "../../lib/sentinel.ts";
import { buttonSet as buttonSetRaw } from "../../generated/component-styles.ts";

/**
 * Build the button-set layout CSS (doc comment + rules), substituting `prefix` for the `pfx-`
 * sentinel. Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function buttonSetRules(prefix = "instui-"): string {
  return buttonSetRaw.replaceAll(SENTINEL, prefix);
}
