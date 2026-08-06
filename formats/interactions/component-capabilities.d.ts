/** Type definitions for component-capabilities.json.
 *  Users typically import as: `import type { ComponentCapabilities } from '@pantoken/interactions/component-capabilities.js'`
 *  Or with assert for raw JSON: `import json from '@pantoken/interactions/component-capabilities.json' assert { type: 'json' }`
 */

export interface ComponentEntry {
  name: string;
  type: "css-only" | "js-only" | "both";
  needsIcons?: boolean;
  requires?: string[];
  css?: string;
  js?: string;
}

export interface ComponentCapabilities {
  $schema: string;
  description: string;
  components: ComponentEntry[];
}
