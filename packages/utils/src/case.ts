/**
 * Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).
 *
 * @module
 */

/**
 * Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).
 *
 * @example
 * ```ts
 * import { camelCase } from "@pantoken/utils";
 *
 * camelCase("color-background-brand"); // → "colorBackgroundBrand"
 * ```
 */
export function camelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}
