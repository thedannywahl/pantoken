/**
 * `@pantoken/icons` — an ergonomic view over the IR's `<image>` tokens.
 *
 * This is not a second source; it filters the canonical IR from `@pantoken/tokens` to the icon
 * tokens and decodes each data-URI back to inline SVG, exposing a shape close to the
 * `SimpleIconTokenData` that markdown/rehype consumers already use.
 *
 * @module
 * @beta
 */
import { tokens } from "@pantoken/tokens";
import type { IconResolver } from "@pantoken/model";

/** A pantoken icon, derived from an `<image>` token. */
export interface PantokenIcon {
  /** The icon name, without the `--instui-icon-` prefix (e.g. `arrow-left`). */
  name: string;
  /** The `url('data:image/svg+xml;utf8,…')` value, as stored in the IR. */
  dataUri: string;
  /** The decoded inline SVG markup. */
  svg: string;
  /** The SVG `viewBox`, when known. */
  viewBox?: string;
  /** Whether the icon flips horizontally in right-to-left contexts. */
  bidirectional: boolean;
  /** The glyph origin. */
  source?: "custom" | "lucide";
}

const ICON_PREFIX = "--instui-icon-";
const DATA_PREFIX = "data:image/svg+xml;utf8,";

function decode(dataUri: string): string {
  const inner = /^url\(\s*'?(.*?)'?\s*\)$/.exec(dataUri.trim())?.[1] ?? dataUri;
  if (!inner.startsWith(DATA_PREFIX)) return "";
  try {
    return decodeURIComponent(inner.slice(DATA_PREFIX.length));
  } catch {
    return "";
  }
}

/**
 * Every pantoken icon, sorted by name.
 *
 * @example
 * ```ts
 * import { icons } from "@pantoken/icons";
 *
 * icons.length; // the full set
 * icons.filter((i) => i.source === "lucide"); // just the Lucide glyphs
 * ```
 */
export const icons: PantokenIcon[] = tokens
  .filter((t) => t.meta?.kind === "icon")
  .map((t) => ({
    name: t.name.slice(ICON_PREFIX.length),
    dataUri: t.value,
    svg: decode(t.value),
    viewBox: t.meta?.viewBox,
    bidirectional: Boolean(t.meta?.bidirectional),
    source: t.meta?.source,
  }));

/**
 * Every pantoken icon, keyed by name.
 *
 * @example
 * ```ts
 * import { iconsByName } from "@pantoken/icons";
 *
 * iconsByName.get("arrow-left")?.svg; // inline SVG markup
 * ```
 */
export const iconsByName: Map<string, PantokenIcon> = new Map(icons.map((i) => [i.name, i]));

/**
 * Look up an icon by name.
 *
 * @example
 * ```ts
 * import { getIcon } from "@pantoken/icons";
 *
 * const icon = getIcon("arrow-left");
 * icon?.viewBox; // "0 0 24 24"
 * ```
 */
export function getIcon(name: string): PantokenIcon | undefined {
  return iconsByName.get(name);
}

/**
 * An {@link IconResolver} backed by the pantoken icon set (for the plugin/rehype stages).
 *
 * @example
 * ```ts
 * import { resolve } from "@pantoken/icons";
 *
 * resolve("arrow-left"); // { name, svg, viewBox, source } | undefined
 * ```
 */
export const resolve: IconResolver = (code) => {
  const icon = iconsByName.get(code);
  return icon
    ? { name: icon.name, svg: icon.svg, viewBox: icon.viewBox, source: icon.source }
    : undefined;
};
