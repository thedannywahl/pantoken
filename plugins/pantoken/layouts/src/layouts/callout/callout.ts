import { SENTINEL } from "../../lib/sentinel.ts";
import { callout } from "../../generated/component-styles.ts";
import { calloutHtml } from "../../generated/layout-html.ts";
import { htmlTemplate } from "../../lib/html-template.ts";
import type { PageLayout } from "../page-layout.ts";

/**
 * Build the callout layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function calloutRules(prefix = "instui-"): string {
  return callout.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the callout layout.
 */
export function calloutTemplate(prefix = "instui-"): string {
  return htmlTemplate(calloutRules(prefix), { prefix, layoutName: "callout" });
}

/** Inline info alert for a short reminder or note. */
export const calloutLayout: PageLayout = {
  name: "callout",
  title: "{{callout.title}}",
  html: calloutHtml,
};
