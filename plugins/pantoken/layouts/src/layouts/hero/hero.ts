import { SENTINEL } from "../../lib/sentinel.ts";
import { hero } from "../../generated/component-styles.ts";
import { htmlTemplate } from "../../lib/html-template.ts";

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
