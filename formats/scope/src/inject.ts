/**
 * One-time injection of the document-global half of the token sheet.
 *
 * `@property` registrations are document-scoped, so a second instance injecting its own copy would
 * silently redefine every token's initial-value for the whole page. {@link ensureProperties} makes
 * that a no-op instead.
 *
 * @module
 */

const MARKER = "data-pantoken-properties";

/**
 * Inject `css` into `doc` once. A second call with the same `id` does nothing, whichever instance
 * makes it.
 *
 * @param css - The registrations sheet, e.g. `@pantoken/css/properties.css`.
 * @param options - `id` distinguishes unrelated sheets; `doc` defaults to the current document.
 * @returns `true` when this call performed the injection.
 *
 * @example
 * ```ts
 * import { ensureProperties } from "@pantoken/scope";
 * import properties from "@pantoken/css/properties.css?inline";
 *
 * ensureProperties(properties);
 * ```
 */
export function ensureProperties(
  css: string,
  options: { id?: string; doc?: Document } = {},
): boolean {
  const { id = "default", doc = document } = options;
  if (doc.head.querySelector(`style[${MARKER}="${CSS.escape(id)}"]`)) return false;

  const style = doc.createElement("style");
  style.setAttribute(MARKER, id);
  style.textContent = css;
  // Prepend: registrations only supply initial-values, so they must never outrank a sheet the page
  // loaded before us.
  doc.head.prepend(style);
  return true;
}

/** True when a registrations sheet with `id` is already present in `doc`. */
export function hasProperties(id = "default", doc: Document = document): boolean {
  return doc.head.querySelector(`style[${MARKER}="${CSS.escape(id)}"]`) !== null;
}
