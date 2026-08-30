import { SENTINEL } from "../../lib/sentinel.ts";
import { wrapper } from "../../generated/component-styles.ts";
import { htmlTemplate } from "../../lib/html-template.ts";

/**
 * Build the wrapper layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function wrapperRules(prefix = "instui-"): string {
  return wrapper.replaceAll(SENTINEL, prefix);
}

/**
 * Generate an HTML template for the wrapper layout.
 */
export function wrapperTemplate(prefix = "instui-"): string {
  return htmlTemplate(wrapperRules(prefix), { prefix, layoutName: "wrapper" });
}
