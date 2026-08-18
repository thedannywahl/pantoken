/**
 * Auto-fill `data-initials` from a target's full-name text content, when absent — the CSS
 * (`[data-initials]`/`::before`) does the rest; this never touches the visible text or ARIA.
 * Skipped for a single-token name (treated as already-computed initials, e.g. existing bare "AI").
 */
export function initInitials(el: HTMLElement): void {
  if (el.hasAttribute("data-initials")) return;
  if (el.querySelector(":scope > img")) return;

  const name = el.textContent?.trim();
  if (!name || !/\s/.test(name)) return;

  const words = name.split(/\s+/).filter(Boolean);
  const initials = words[0][0] + words[words.length - 1][0];
  el.setAttribute("data-initials", initials.toUpperCase());
}
