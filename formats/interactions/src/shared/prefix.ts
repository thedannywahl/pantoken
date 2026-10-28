/** The default class prefix, matching `@pantoken/components`. */
export const DEFAULT_PREFIX = "instui";

/**
 * The class-prefix sentinel, identical to the one `@pantoken/components` swaps at build time.
 * Selectors are authored as `.pfx-button` and resolved against the active prefix at runtime.
 */
export const SENTINEL = "pfx-";

/** The class namespace for a prefix: `"instui"` → `"instui-"`, `""` → `""` (unprefixed). */
export function ns(prefix: string): string {
  return prefix ? `${prefix}-` : "";
}

/** Swap every {@link SENTINEL} in `text` for the namespace of `prefix`. */
export function withPrefix(text: string, prefix: string = DEFAULT_PREFIX): string {
  return text.split(SENTINEL).join(ns(prefix));
}

/**
 * Resolve the prefix for the auto-init entry points. Reads, in order, the `data-prefix` attribute of
 * the running `<script>` (an empty value means unprefixed), then `globalThis.PANTOKEN_PREFIX`, then
 * {@link DEFAULT_PREFIX}. Must run during script evaluation, while `document.currentScript` is set.
 */
function resolvePrefix(): string {
  const attr =
    typeof document === "undefined" ? null : document.currentScript?.getAttribute("data-prefix");
  if (typeof attr === "string") return attr;
  const global = (globalThis as { PANTOKEN_PREFIX?: unknown }).PANTOKEN_PREFIX;
  return typeof global === "string" ? global : DEFAULT_PREFIX;
}

/** The active prefix for the document-level entry points, captured once at load. */
export const PREFIX: string = resolvePrefix();

/** Resolve a sentinel-authored selector or class name against the active {@link PREFIX}. */
export function sel(text: string): string {
  return withPrefix(text, PREFIX);
}
