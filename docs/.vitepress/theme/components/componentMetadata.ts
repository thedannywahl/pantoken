/**
 * Unified component metadata for all InstUI components from pantoken.
 * Determines capabilities (CSS, JS, both), dependencies, and icon requirements.
 *
 * Used by CDN pickers to generate appropriate snippets and manage dependencies.
 */

/** Component capability type */
export type ComponentType = "css-only" | "js-only" | "both";

/** Metadata for a single component */
export interface ComponentMetadata {
  name: string;
  type: ComponentType;
  needsIcons: boolean;
  dependencies: readonly string[];
}

/**
 * All InstUI components with their capabilities and dependencies.
 * Generated from:
 * - CSS components: formats/components/src/components/*.ts
 * - JS components: renderers/web-components/src/lib/elements-meta.ts
 * - Icon elements: renderers/web-components/src/lib/elements-meta.ts
 * - Dependencies: renderers/web-components/src/lib/elements-meta.ts
 */
export const COMPONENTS: readonly ComponentMetadata[] = [
  // Both CSS + JS
  { name: "alert", type: "both", needsIcons: false, dependencies: [] },
  { name: "avatar", type: "both", needsIcons: false, dependencies: [] },
  { name: "badge", type: "both", needsIcons: false, dependencies: [] },
  { name: "button", type: "both", needsIcons: false, dependencies: [] },
  { name: "calendar", type: "both", needsIcons: true, dependencies: [] },
  { name: "context-view", type: "both", needsIcons: false, dependencies: [] },
  { name: "img", type: "both", needsIcons: false, dependencies: [] },
  { name: "in-place-edit", type: "both", needsIcons: false, dependencies: [] },
  { name: "metric", type: "both", needsIcons: false, dependencies: [] },
  { name: "modal", type: "both", needsIcons: false, dependencies: [] },
  { name: "pill", type: "both", needsIcons: false, dependencies: [] },
  { name: "popover", type: "both", needsIcons: false, dependencies: [] },
  { name: "progress", type: "both", needsIcons: false, dependencies: [] },
  { name: "progress-circle", type: "both", needsIcons: false, dependencies: [] },
  { name: "rating", type: "both", needsIcons: true, dependencies: [] },
  { name: "side-nav-bar", type: "both", needsIcons: false, dependencies: [] },
  { name: "spinner", type: "both", needsIcons: false, dependencies: [] },
  { name: "tag", type: "both", needsIcons: false, dependencies: [] },
  { name: "tooltip", type: "both", needsIcons: false, dependencies: [] },
  { name: "tray", type: "both", needsIcons: false, dependencies: [] },
  { name: "tree-browser", type: "both", needsIcons: false, dependencies: [] },
  { name: "truncate", type: "both", needsIcons: false, dependencies: [] },

  // CSS only
  { name: "billboard", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "breadcrumb", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "byline", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "checkbox", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "close-button", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "file-drop", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "form-field", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "form-field-group", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "form-field-messages", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "heading", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "input-group", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "link", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "list", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "menu", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "number-input", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "pagination", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "radio", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "radio-input-group", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "range-input", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "select", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "simple-select", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "table", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "tabs", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "text", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "text-area", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "text-input", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "toggle-details", type: "css-only", needsIcons: false, dependencies: [] },
  { name: "toggle-group", type: "css-only", needsIcons: false, dependencies: [] },

  // JS only
  { name: "date-input", type: "js-only", needsIcons: true, dependencies: ["calendar"] },
  { name: "date-time-input", type: "js-only", needsIcons: false, dependencies: ["date-input"] },
  { name: "drawer-layout", type: "js-only", needsIcons: false, dependencies: [] },
  { name: "drilldown", type: "js-only", needsIcons: true, dependencies: [] },
  { name: "icon", type: "js-only", needsIcons: true, dependencies: [] },
  { name: "icon-button", type: "js-only", needsIcons: false, dependencies: [] },
  { name: "pages", type: "js-only", needsIcons: false, dependencies: [] },
  { name: "toggle-button", type: "js-only", needsIcons: false, dependencies: [] },
];

/** Create a map for quick lookup by component name */
export function createComponentMap(): Map<string, ComponentMetadata> {
  return new Map(COMPONENTS.map((c) => [c.name, c]));
}

/** Get all transitive dependencies for a component */
export function getAllDependencies(name: string): Set<string> {
  const comp = COMPONENTS.find((c) => c.name === name);
  if (!comp) return new Set();

  const deps = new Set<string>();
  const queue = [...comp.dependencies];

  while (queue.length > 0) {
    const dep = queue.shift();
    if (!dep || deps.has(dep)) continue;
    deps.add(dep);
    const depComp = COMPONENTS.find((c) => c.name === dep);
    if (depComp) queue.push(...depComp.dependencies);
  }

  return deps;
}

/** Group components by type */
export function groupByType(): Record<ComponentType, ComponentMetadata[]> {
  return {
    "css-only": COMPONENTS.filter((c) => c.type === "css-only"),
    "js-only": COMPONENTS.filter((c) => c.type === "js-only"),
    both: COMPONENTS.filter((c) => c.type === "both"),
  };
}
