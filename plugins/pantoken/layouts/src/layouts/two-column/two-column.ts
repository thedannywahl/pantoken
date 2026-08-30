import { SENTINEL } from "../../lib/sentinel.ts";
import { twoColumn } from "../../generated/component-styles.ts";
import { htmlTemplate } from "../../lib/html-template.ts";

/**
 * Build the two-column layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function twoColumnRules(prefix = "instui-"): string {
  return twoColumn.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the two-column layout.
 */
export function twoColumnTemplate(prefix = "instui-"): string {
  return htmlTemplate(twoColumnRules(prefix), { prefix, layoutName: "two-column" });
}
