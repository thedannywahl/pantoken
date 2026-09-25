import { SENTINEL } from "../../lib/sentinel.ts";
import { twoColumn } from "../../generated/component-styles.ts";
import { twoColumnHtml } from "../../generated/layout-html.ts";
import { htmlTemplate } from "../../lib/html-template.ts";
import type { PageLayout } from "../page-layout.ts";

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

/** Two side-by-side content blocks for comparing or pairing related topics. */
export const twoColumnLayout: PageLayout = {
  name: "two-column",
  title: "{{twoColumn.title}}",
  html: twoColumnHtml,
};
