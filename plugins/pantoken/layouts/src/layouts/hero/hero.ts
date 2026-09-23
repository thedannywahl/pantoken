import { SENTINEL } from "../../lib/sentinel.ts";
import { hero } from "../../generated/component-styles.ts";
import { heroHtml } from "../../generated/layout-html.ts";
import { htmlTemplate } from "../../lib/html-template.ts";
import type { PageLayout } from "../page-layout.ts";

/**
 * Build the hero layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function heroRules(prefix = "instui-"): string {
  return hero.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the hero layout.
 */
export function heroTemplate(prefix = "instui-"): string {
  return htmlTemplate(heroRules(prefix), { prefix, layoutName: "hero" });
}

/** Full-width intro banner: heading, supporting text, and a primary call-to-action. */
export const heroLayout: PageLayout = {
  name: "hero",
  title: "{{hero.title}}",
  html: heroHtml,
};
