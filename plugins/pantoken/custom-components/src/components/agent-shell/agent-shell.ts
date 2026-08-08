import { SENTINEL } from "../../lib/sentinel.ts";
import { agentShell as agentShellRaw } from "../../generated/component-styles.ts";

/**
 * Build the card layout CSS (doc comment + rules), substituting `prefix` for the `pfx-` sentinel.
 * Defaults to `"instui-"` for the shipped stylesheet; pass `""` for an unprefixed build.
 */
export function agentShellRules(prefix = "instui-"): string {
  return agentShellRaw.replaceAll(SENTINEL, prefix);
}
