/**
 * `@pantoken/css/inject` — a DOM side-effect entry. Importing it injects the pantoken stylesheet
 * into `document.head`. Safe to import in non-DOM environments (it no-ops).
 *
 * @module
 */
import { css } from "./index.ts";

/**
 * Inject the pantoken stylesheet into `document.head` once. Returns the created element, if any.
 *
 * @example Inject on the default document
 * ```ts
 * import { inject } from "@pantoken/css/inject";
 *
 * const style = inject(); // <style data-pantoken> appended to document.head
 * ```
 *
 * @example Inject into a specific document (e.g. an iframe)
 * ```ts
 * import { inject } from "@pantoken/css/inject";
 *
 * const frame = document.querySelector("iframe")!;
 * inject(frame.contentDocument ?? undefined);
 * ```
 */
export function inject(
  doc: Document | undefined = globalThis.document,
): HTMLStyleElement | undefined {
  if (!doc) return undefined;
  const existing = doc.querySelector<HTMLStyleElement>("style[data-pantoken]");
  if (existing) return existing;
  const style = doc.createElement("style");
  style.setAttribute("data-pantoken", "css");
  style.textContent = css;
  doc.head.append(style);
  return style;
}

inject();
