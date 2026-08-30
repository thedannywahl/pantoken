/**
 * Extract i18n-candidate strings from :slot() pseudo-elements in layout CSS.
 * Finds placeholder text that should be translated and cached.
 */

/**
 * Extracted slot placeholder information.
 */
export interface SlotPlaceholder {
  slotName: string;
  placeholderText: string;
  cssRule: string; // The full CSS rule for context
}

/**
 * Extract all :slot() pseudo-element content strings from layout CSS.
 *
 * Looks for patterns like:
 * ```css
 * :slot(header)::before \{
 *   content: "Header text";
 * \}
 * ```
 *
 * Returns a map of slot names to their placeholder text.
 */
export function extractSlotPlaceholders(css: string): Record<string, string> {
  const placeholders: Record<string, string> = {};

  // Regex to find :slot(name)::before/after rules with content property
  // Matches patterns like: :slot(name)::before { content: "text"; }
  const slotRuleRegex =
    /:slot\(([a-z-]+)\)::(before|after)\s*\{\s*content:\s*["']([^"']*)["']\s*;\s*\}/gi;

  let match;
  while ((match = slotRuleRegex.exec(css)) !== null) {
    const slotName = match[1];
    const placeholderText = match[3];

    // Store the first occurrence for each slot (in case of duplicates)
    if (!placeholders[slotName]) {
      placeholders[slotName] = placeholderText;
    }
  }

  return placeholders;
}

/**
 * Extract slot placeholders with additional context (the full CSS rule).
 * Useful for docs generation or debugging.
 */
export function extractSlotPlaceholdersWithContext(css: string): SlotPlaceholder[] {
  const result: SlotPlaceholder[] = [];
  const seen = new Set<string>();

  // More comprehensive regex that captures the entire rule
  const slotRuleRegex =
    /(:slot\([a-z-]+\)::(before|after)\s*\{\s*content:\s*["']([^"']*)["']\s*;\s*\})/gi;

  let match;
  while ((match = slotRuleRegex.exec(css)) !== null) {
    const fullRule = match[1];
    const slotMatch = fullRule.match(/:slot\(([a-z-]+)\)/i);
    const contentMatch = fullRule.match(/content:\s*["']([^"']*)["']/i);

    if (slotMatch && contentMatch && !seen.has(slotMatch[1])) {
      seen.add(slotMatch[1]);
      result.push({
        slotName: slotMatch[1],
        placeholderText: contentMatch[1],
        cssRule: fullRule,
      });
    }
  }

  return result;
}

/**
 * Build an i18n cache key for a slot placeholder.
 * Schema: `layout::\{layoutName\}::\{slotName\}`
 */
export function makeSlotI18nKey(layoutName: string, slotName: string): string {
  return `layout::${layoutName}::${slotName}`;
}

/**
 * Parse an i18n cache key back into layout name and slot name.
 */
export function parseSlotI18nKey(key: string): { layoutName?: string; slotName?: string } {
  const match = key.match(/^layout::([a-z-]+)::([a-z-]+)$/i);
  if (!match) return {};
  return { layoutName: match[1], slotName: match[2] };
}

/**
 * Build a payload for translation caching: English source + slot metadata.
 */
export function makeSlotI18nPayload(
  layoutName: string,
  slotName: string,
  placeholderText: string,
): {
  key: string;
  english: string;
  metadata: { layoutName: string; slotName: string };
} {
  return {
    key: makeSlotI18nKey(layoutName, slotName),
    english: placeholderText,
    metadata: { layoutName, slotName },
  };
}
