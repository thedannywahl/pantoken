/** Read the target document's live motion preference, including for iframe and shadow content. */
export function motionPreference(target: HTMLElement): MediaQueryList | undefined {
  return target.ownerDocument.defaultView?.matchMedia("(prefers-reduced-motion: reduce)");
}
