import { SENTINEL } from "../../lib/sentinel.ts";
import { card as cardRaw } from "../../generated/component-styles.ts";

/**
 * Build the card layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function cardRules(prefix = "instui-"): string {
  return cardRaw.replaceAll(SENTINEL, prefix);
}
