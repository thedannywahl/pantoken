import { SENTINEL } from "../../lib/sentinel.ts";
import { aiGradient as aiGradientRaw } from "../../generated/component-styles.ts";

/**
 * Build the AI gradient utility CSS as a global modifier layer for custom surfaces.
 * The selectors intentionally stay on the bare `--*` modifier form, so they can be reused anywhere
 * without being tied to the shared InstUI component contract.
 */
export function aiGradientRules(prefix = "instui-"): string {
  return aiGradientRaw.replaceAll(SENTINEL, prefix);
}
