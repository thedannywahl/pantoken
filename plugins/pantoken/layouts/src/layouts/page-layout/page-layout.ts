import { SENTINEL } from "../../lib/sentinel.ts";
import { pageLayout } from "../../generated/component-styles.ts";
import { htmlTemplate } from "../../lib/html-template.ts";

/**
 * Build the page-layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function pageLayoutRules(prefix = "instui-"): string {
  return pageLayout.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the page-layout layout.
 */
export function pageLayoutTemplate(prefix = "instui-"): string {
  return htmlTemplate(pageLayoutRules(prefix), { prefix, layoutName: "page-layout" });
}
