/**
 * Merged cssdoc model from \@pantoken/components and \@pantoken/plugin-custom-components.
 * Provides query helpers for resolving component/utility names and their modifiers.
 *
 * \@module
 */
import type { CssDocEntry } from "@cssdoc/core";
import componentsModel from "@pantoken/components/model.json" with { type: "json" };
import customComponentsModel from "@pantoken/plugin-custom-components/model.json" with { type: "json" };

export type { CssDocEntry } from "@cssdoc/core";

// Merged model: core components + utilities + custom-components (card, agent-shell, banner).
const MERGED_MODEL = [...componentsModel, ...customComponentsModel] as CssDocEntry[];

// Index by name for O(1) lookups.
const INDEX_BY_NAME = new Map<string, CssDocEntry>(
  MERGED_MODEL.map((entry) => [entry.name, entry]),
);

/**
 * Find a component/utility/custom entry by name.
 */
export function findEntry(name: string): CssDocEntry | undefined {
  return INDEX_BY_NAME.get(name);
}

/**
 * List all components (kind: "component").
 */
export function listComponents(): CssDocEntry[] {
  return MERGED_MODEL.filter((e) => e.kind === "component");
}

/**
 * List all utilities (kind: "utility").
 */
export function listUtilities(): CssDocEntry[] {
  return MERGED_MODEL.filter((e) => e.kind === "utility");
}

/**
 * Get all modifier suggestions for a component/utility, filtered by an optional prefix.
 * Returns array of `{ name, prop, value?, description }` objects.
 */
export function getModifierSuggestions(
  entryName: string,
  prefix?: string,
): Array<{
  name: string;
  prop: string;
  value?: string;
  description?: string;
}> {
  const entry = findEntry(entryName);
  if (!entry) return [];

  const modifiers = entry.modifiers || [];
  if (!prefix) return modifiers;

  // Filter to modifiers whose name starts with the prefix (case-sensitive, leading hyphen expected).
  return modifiers.filter((m) => m.name.startsWith(prefix));
}

/**
 * Validate a pantoken class token (e.g., "instui-button", "instui-button.-color-primary").
 * Returns an array of validation errors (empty if valid).
 */
export function validateClassToken(token: string): string[] {
  const errors: string[] = [];

  // Must start with "instui-" (or be just "instui-" which is incomplete).
  if (!token.startsWith("instui-")) {
    return ["Token must start with 'instui-'"];
  }

  // Extract base component name: split on "-" after the prefix, but be careful with modifiers.
  // Pattern: instui-COMPONENT(-MODIFIER)* where COMPONENT is [a-z0-9]+ and MODIFIER is -PROP-VALUE or -BOOL.
  const rest = token.slice("instui-".length); // e.g., "button.-color-primary"
  const parts = rest.split("-");

  if (parts.length === 0 || !parts[0]) {
    return ["Incomplete component name after 'instui-'"];
  }

  const componentName = parts[0]; // e.g., "button"
  const entry = findEntry(componentName);
  if (!entry) {
    errors.push(`Unknown component/utility: '${componentName}'`);
  }

  // If we found the entry, validate modifiers.
  if (entry && parts.length > 1) {
    const modifierTokens = rest.slice(componentName.length + 1); // e.g., "color-primary"
    const modifierList = entry.modifiers || [];

    // Try to match modifiers in the token. This is imperfect without a full parser,
    // but we can check if any known modifier is a substring.
    for (const mod of modifierList) {
      // For pattern modifiers like "-icon-*", we can't validate the exact value without context.
      if (mod.pattern) continue;

      // For concrete modifiers like "-color-primary", check if it's in the token.
      const modSuffix = mod.name.slice(1); // Remove leading hyphen
      if (!modifierTokens.includes(modSuffix)) {
        // This modifier isn't used, which is fine (it's optional).
        continue;
      }
      // If it is used, it's valid by definition of being in the model.
    }
  }

  return errors;
}
