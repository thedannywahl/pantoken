import { SENTINEL } from "../../lib/sentinel.ts";
import { testimonial } from "../../generated/component-styles.ts";
import { testimonialHtml } from "../../generated/layout-html.ts";
import { htmlTemplate } from "../../lib/html-template.ts";
import type { PageLayout } from "../page-layout.ts";

/**
 * Build the testimonial layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function testimonialRules(prefix = "instui-"): string {
  return testimonial.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the testimonial layout.
 */
export function testimonialTemplate(prefix = "instui-"): string {
  return htmlTemplate(testimonialRules(prefix), { prefix, layoutName: "testimonial" });
}

/** Centered pull-quote attributed to a student or alum. */
export const testimonialLayout: PageLayout = {
  name: "testimonial",
  title: "{{testimonial.title}}",
  html: testimonialHtml,
};
