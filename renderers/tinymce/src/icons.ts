/**
 * Merged icon list across the four pantoken icon sources, each tagged with its source package so
 * the correct CdnFile, category label, and glyph data URI can be computed. Feeds the icons picker
 * dialog and autocompleter (see plugins/icons.ts).
 *
 * \@module
 */
import type { CdnFile } from "@pantoken/cdn";
import { rebrandTokens } from "@pantoken/tokens";
import { icons as customIconsList } from "@pantoken/plugin-custom-icons";
import simpleIconsManifest from "@pantoken/plugin-simple-icons/manifest.json" with { type: "json" };
import lucideLabManifest from "@pantoken/plugin-lucide-lab/manifest.json" with { type: "json" };

/** Prefix stripped from `@pantoken/tokens` icon token names to recover the bare icon slug. */
const COMPONENT_ICON_TOKEN_PREFIX = "--instui-icon-";

/**
 * Icon with source attribution for tracking which package it comes from.
 */
export interface TaggedIcon {
  name: string;
  source: "components" | "simple-icons" | "lucide-lab" | "custom-icons";
  description?: string;
}

/** The icon sources, in the order the picker lists them. */
export const ICON_SOURCES: readonly TaggedIcon["source"][] = [
  "components",
  "custom-icons",
  "lucide-lab",
  "simple-icons",
];

/** Human label shown as a picker tab and an autocompleter row caption, per icon source. */
export const SOURCE_LABELS: Record<TaggedIcon["source"], string> = {
  components: "Instructure UI",
  "simple-icons": "Simple Icons",
  "lucide-lab": "Lucide Lab",
  "custom-icons": "Custom Icons",
};

/**
 * The "all icons in one file" glyph sheets the picker dialog needs loaded to paint a preview.
 *
 * Only the two sources whose SVG payloads are *not* already in this package's JS bundle are listed:
 * components and custom-icons glyphs are declared from in-memory token data instead (see
 * `buildIconTokenCss`), so opening the picker costs two stylesheet requests rather than one per icon.
 */
export const ICON_BUNDLE_CDN_FILES: CdnFile[] = [
  { package: "@pantoken/plugin-simple-icons", path: "dist/simple-icons.css" },
  { package: "@pantoken/plugin-lucide-lab", path: "dist/lucide-lab.css" },
];

/**
 * Load and merge all available icons from both sources.
 * Returns a sorted array tagged with the source package.
 */
export async function loadAllIcons(): Promise<TaggedIcon[]> {
  const icons: TaggedIcon[] = [];

  for (const token of rebrandTokens) {
    if (token.meta?.kind !== "icon" || !token.name.startsWith(COMPONENT_ICON_TOKEN_PREFIX))
      continue;
    const name = token.name.slice(COMPONENT_ICON_TOKEN_PREFIX.length);
    icons.push({ name, source: "components", description: `Instructure UI icon: ${name}` });
  }

  if (Array.isArray(simpleIconsManifest)) {
    for (const iconSlug of simpleIconsManifest) {
      icons.push({
        name: iconSlug,
        source: "simple-icons",
        description: `Brand icon: ${iconSlug}`,
      });
    }
  }

  if (Array.isArray(lucideLabManifest)) {
    for (const iconName of lucideLabManifest) {
      icons.push({
        name: iconName,
        source: "lucide-lab",
        description: `Lucide Lab icon: ${iconName}`,
      });
    }
  }

  for (const icon of customIconsList) {
    icons.push({
      name: icon.name,
      source: "custom-icons",
      description: `Custom icon: ${icon.name}`,
    });
  }

  return icons.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Compute the CdnFile for an icon given its source.
 * Returns `{ package, path }` for use with \@pantoken/cdn's buildFileUrl.
 */
export function getIconCdnFile(icon: TaggedIcon): CdnFile {
  switch (icon.source) {
    case "components":
      return {
        package: "@pantoken/components",
        path: `dist/icons/${icon.name}.css`,
      };
    case "simple-icons":
      return {
        package: "@pantoken/plugin-simple-icons",
        path: `dist/icons/${icon.name}.css`,
      };
    case "lucide-lab":
      return {
        package: "@pantoken/plugin-lucide-lab",
        path: `dist/icons/${icon.name}.css`,
      };
    case "custom-icons":
      return {
        package: "@pantoken/plugin-custom-icons",
        path: `dist/icons/${icon.name}.css`,
      };
  }
}

/**
 * Resolve the icon stylesheets used by `-icon-*` classes below `root`.
 * Existing assets break ties when multiple providers expose the same icon name.
 */
export function getUsedIconCdnFiles(
  root: ParentNode,
  icons: TaggedIcon[],
  currentAssets: readonly CdnFile[] = [],
): CdnFile[] {
  const assetKey = (asset: CdnFile): string => `${asset.package}:${asset.path}`;
  const iconsByName = new Map<string, TaggedIcon[]>();
  for (const icon of icons) {
    const candidates = iconsByName.get(icon.name) ?? [];
    candidates.push(icon);
    iconsByName.set(icon.name, candidates);
  }

  const currentAssetKeys = new Set(currentAssets.map(assetKey));
  const usedNames = new Set<string>();
  for (const element of root.querySelectorAll("[class]")) {
    for (const className of element.classList) {
      if (className.startsWith("-icon-") && className.length > "-icon-".length) {
        usedNames.add(className.slice("-icon-".length));
      }
    }
  }

  return [...usedNames].flatMap((name) => {
    const candidates = iconsByName.get(name);
    if (!candidates?.length) return [];
    const icon = candidates.find((candidate) =>
      currentAssetKeys.has(assetKey(getIconCdnFile(candidate))),
    );
    return [getIconCdnFile(icon ?? candidates[0])];
  });
}

/** Turn a hyphenated icon slug into a readable label, e.g. `circle-question-mark` → `circle question mark`. */
export function humanizeIconName(name: string): string {
  return name.replace(/-/g, " ");
}

/**
 * The decorative icon markup retained in editor content after a picker selection.
 */
export function buildIconMarkup(icon: TaggedIcon): string {
  return `<span class="instui-icon -icon-${icon.name}" aria-hidden="true"></span>`;
}

/**
 * The `--instui-icon-*` glyph values this package carries in its own JS bundle, so the picker can
 * paint components and custom-icons previews without fetching a stylesheet for them.
 */
const inlineIconValues = new Map<string, string>();
for (const token of rebrandTokens) {
  if (token.meta?.kind !== "icon" || !token.name.startsWith(COMPONENT_ICON_TOKEN_PREFIX)) continue;
  inlineIconValues.set(
    `components:${token.name.slice(COMPONENT_ICON_TOKEN_PREFIX.length)}`,
    token.value,
  );
}
for (const icon of customIconsList) {
  inlineIconValues.set(
    `custom-icons:${icon.name}`,
    `url('data:image/svg+xml;utf8,${encodeURIComponent(icon.svg)}')`,
  );
}

/** Strip the `url("…")` wrapper off a CSS image value. */
function unwrapCssUrl(value: string): string | undefined {
  const match = /^\s*url\(\s*(['"]?)(data:image\/svg\+xml[^'")]*)\1\s*\)\s*$/u.exec(value);
  return match?.[2];
}

/**
 * The CSS `url(…)` value for an icon's glyph, or `undefined` when this package doesn't carry it.
 * Only components and custom-icons resolve — the brand and Lucide Lab SVGs live in their CDN sheets.
 */
export function getIconTokenValue(icon: TaggedIcon): string | undefined {
  return inlineIconValues.get(`${icon.source}:${icon.name}`);
}

/**
 * A `data:` URI usable as an `<img src>` for the icon, for sources this package bundles; for the
 * rest it reads the custom property back off `root`, which resolves once the source's glyph sheet
 * has loaded. Returns `undefined` when neither path yields a glyph.
 */
export function getIconImageSrc(icon: TaggedIcon, root?: Element): string | undefined {
  const inline = getIconTokenValue(icon);
  const value =
    inline ??
    (root
      ? root.ownerDocument.defaultView
          ?.getComputedStyle(root)
          .getPropertyValue(`${COMPONENT_ICON_TOKEN_PREFIX}${icon.name}`)
      : undefined);
  const uri = value ? unwrapCssUrl(value) : undefined;
  // `;utf8,` is not a real media-type parameter; browsers tolerate it in CSS but not always in `src`.
  return uri?.replace(";utf8,", ";charset=utf-8,");
}

/**
 * A `:root` rule declaring every glyph token this package carries inline, so picker previews for
 * components and custom icons paint with no network request.
 */
export function buildIconTokenCss(icons: readonly TaggedIcon[]): string {
  const declarations: string[] = [];
  for (const icon of icons) {
    const value = getIconTokenValue(icon);
    if (value) declarations.push(`${COMPONENT_ICON_TOKEN_PREFIX}${icon.name}:${value}`);
  }
  return `:root{${declarations.join(";")}}`;
}

/** Match `query` against an icon's name, source label, and description; blank matches everything. */
export function matchesIconQuery(icon: TaggedIcon, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    icon.name.includes(needle) ||
    SOURCE_LABELS[icon.source].toLowerCase().includes(needle) ||
    (icon.description?.toLowerCase().includes(needle) ?? false)
  );
}

/** Narrow `icons` to those matching `query` and, when given, a single `source`. */
export function filterIcons(
  icons: readonly TaggedIcon[],
  query: string,
  source?: TaggedIcon["source"],
): TaggedIcon[] {
  return icons.filter(
    (icon) => (!source || icon.source === source) && matchesIconQuery(icon, query),
  );
}
