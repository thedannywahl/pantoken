/**
 * Plugin-owned components that the page audit covers alongside the core records. Each rendered
 * page also loads the plugin stylesheet, since the core styles don't include these components.
 * @module
 */
import type { Definition } from "../src/lib/define.ts";
import { COMPONENTS } from "../src/components/index.ts";
import { focus } from "../src/declarations/focus/index.ts";
import { prose } from "../src/rules/prose/index.ts";
import { base } from "../src/rules/base/index.ts";
import { aiGradient } from "../src/utilities/ai-gradient/index.ts";
import { UTILITIES } from "../src/utilities/index.ts";
import {
  agentShellRules,
  bannerRules,
  buttonSetRules,
  logoRules,
  segmentedControlRules,
  skeletonLoaderRules,
} from "../../../plugins/pantoken/custom-components/src/components/index.ts";

/** A plugin record, shaped like a core record for the audit's cssdoc parsing. */
export interface PluginAuditRecord {
  name: string;
  rules(prefix: string): string;
}

/** Plugin records audited with the core set; their `@a11y` text and examples live in the plugin. */
export const PLUGIN_AUDIT_RECORDS: readonly PluginAuditRecord[] = [
  { name: "agent-shell", rules: agentShellRules },
  { name: "banner", rules: bannerRules },
  { name: "button-set", rules: buttonSetRules },
  { name: "logo", rules: logoRules },
  { name: "segmented-control", rules: segmentedControlRules },
  { name: "skeleton-loader", rules: skeletonLoaderRules },
];

/** Plugin stylesheet copied next to the core assets for the page audit. */
export const PLUGIN_STYLESHEET = "custom-components/custom-components.css";

/** Core utilities and rules whose markup carries accessibility meaning; `icon` and `screen-reader-content` already ship in `COMPONENTS`. */
export const CORE_AUDIT_EXTRAS: readonly Definition[] = [
  ...UTILITIES.filter((record) => !COMPONENTS.some((component) => component.name === record.name)),
  aiGradient,
  base,
  prose,
];

/** Every record the page audit covers, in a stable order with unique names. */
export function auditRecords(): readonly (Definition | PluginAuditRecord)[] {
  return [...COMPONENTS, focus, ...CORE_AUDIT_EXTRAS, ...PLUGIN_AUDIT_RECORDS];
}
