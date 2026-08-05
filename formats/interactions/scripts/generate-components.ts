/**
 * Generate per-component interaction entry points for all components.
 * This script reads from formats/components and creates a corresponding
 * interaction file in src/components/{name}.ts for each component.
 */

import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// List of all components from the web-components and interactions pickers
const ALL_COMPONENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
];

// Components that require command event handling
const COMMAND_COMPONENTS = new Set([
  "button",
  "icon-button",
  "toggle-button",
  "calendar",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
]);

function toCamelCase(name: string): string {
  return name.replace(/-([a-z0-9])/gu, (_, c: string) => c.toUpperCase());
}

function toClassName(name: string): string {
  return `instui-${name}`;
}

const componentsDir = resolve(import.meta.dirname, "../src/components");

for (const component of ALL_COMPONENTS) {
  const className = toClassName(component);
  const isCommandComponent = COMMAND_COMPONENTS.has(component);

  let content = `// Per-component interaction entry point for ${component}\n`;
  content += `// Applies spacing attributes to ${component} elements\n\n`;
  content += `import { applySpacing } from "../shared/index.js";\n`;

  if (isCommandComponent) {
    content += `import { syncInvoker } from "../shared/index.js";\n`;
  }

  content += `\n`;
  content += `// Initialize on page load\n`;
  content += `function init${toCamelCase(component)}() {\n`;
  content += `  for (const el of document.querySelectorAll(".${className}")) {\n`;
  content += `    applySpacing(el as HTMLElement);\n`;

  if (isCommandComponent) {
    content += `    syncInvoker(el as HTMLElement);\n`;
  }

  content += `  }\n`;
  content += `}\n\n`;
  content += `if (document.readyState === "loading") {\n`;
  content += `  document.addEventListener("DOMContentLoaded", init${toCamelCase(component)});\n`;
  content += `} else {\n`;
  content += `  init${toCamelCase(component)}();\n`;
  content += `}\n`;

  const filePath = join(componentsDir, `${component}.ts`);
  writeFileSync(filePath, content);
  console.log(`✓ generated ${component}.ts`);
}

console.log(`\n✓ Generated ${ALL_COMPONENTS.length} per-component interaction files`);
