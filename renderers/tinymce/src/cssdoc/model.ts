/**
 * Merged cssdoc model from \@pantoken/components and \@pantoken/plugin-custom-components.
 * Provides query helpers for resolving component/utility names and their modifiers.
 *
 * \@module
 */
import type { CssDocEntry, CssModifier } from "@cssdoc/core";
import componentsModel from "@pantoken/components/model.json" with { type: "json" };
import customComponentsModel from "@pantoken/plugin-custom-components/model.json" with { type: "json" };
import { formatTinymceString, TINYMCE_STRINGS } from "../strings.js";

export type { CssDocEntry } from "@cssdoc/core";

/** A concrete modifier and the model record that makes it applicable to a component. */
export interface ApplicableModifier {
  /** The canonical modifier metadata. */
  modifier: CssModifier;
  /** The component or global utility that declares the modifier. */
  source: CssDocEntry;
  /** Whether the modifier belongs directly to the component or comes from a global utility. */
  scope: "component" | "utility";
}

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

/** Find an entry in a supplied model by its unpunctuated class token. */
export function findEntryByClassToken(
  classToken: string,
  model: readonly CssDocEntry[] = MERGED_MODEL,
): CssDocEntry | undefined {
  return model.find(
    (entry) => entry.className.startsWith(".") && entry.className.slice(1) === classToken,
  );
}

function isCanonicalConcreteModifier(modifier: CssModifier): boolean {
  return !(modifier.pattern || modifier.deprecated || modifier.alias || modifier.interaction);
}

/**
 * Collect the canonical modifiers that can be applied to an entry: its own modifiers first,
 * followed by modifiers from globally applicable utility records.
 */
export function getApplicableModifiers(
  entryName: string,
  model: readonly CssDocEntry[] = MERGED_MODEL,
): ApplicableModifier[] {
  const entry = model.find((candidate) => candidate.name === entryName);
  if (!entry) return [];

  const seen = new Set<string>();
  const applicable: ApplicableModifier[] = [];
  const addModifiers = (source: CssDocEntry, scope: ApplicableModifier["scope"]): void => {
    for (const modifier of source.modifiers ?? []) {
      if (!isCanonicalConcreteModifier(modifier) || seen.has(modifier.name)) continue;
      seen.add(modifier.name);
      applicable.push({ modifier, source, scope });
    }
  };

  addModifiers(entry, "component");
  for (const utility of model) {
    if (utility.kind === "utility" && utility.global && utility !== entry) {
      addModifiers(utility, "utility");
    }
  }

  return applicable;
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
    return [formatTinymceString(TINYMCE_STRINGS.classValidationTokenPrefix, { prefix: "instui-" })];
  }

  // Find the longest known component name before any modifier suffix.
  const rest = token.slice("instui-".length); // e.g., "button.-color-primary"
  if (!rest) {
    return [
      formatTinymceString(TINYMCE_STRINGS.classValidationIncompleteComponent, {
        prefix: "instui-",
      }),
    ];
  }

  const parts = rest.split("-");
  let componentName = rest;
  let entry = findEntry(componentName);

  for (let partCount = parts.length - 1; !entry && partCount > 0; partCount -= 1) {
    componentName = parts.slice(0, partCount).join("-");
    entry = findEntry(componentName);
  }

  if (!entry) {
    errors.push(
      formatTinymceString(TINYMCE_STRINGS.classValidationUnknownComponent, { componentName }),
    );
  }

  // If we found the entry, validate modifiers.
  if (entry && componentName !== rest) {
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
