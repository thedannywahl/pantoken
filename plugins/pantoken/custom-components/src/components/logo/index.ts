import { SENTINEL } from "../../lib/sentinel.ts";
import { logo as logoRaw } from "../../generated/component-styles.ts";

/**
 * Build the logo utility CSS as an aspect-ratio-aware mask painter for `@pantoken/plugin-logos`'
 * `-logo-<name>` glyph classes, substituting `prefix` for the `pfx-` sentinel.
 */
export function logoRules(prefix = "instui-"): string {
  return logoRaw.replaceAll(SENTINEL, prefix);
}
