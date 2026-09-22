/**
 * Merged icon list: \@pantoken/components built-in icons + \@pantoken/plugin-simple-icons brand icons.
 * Each icon is tagged with its source package so the correct CdnFile/category can be computed.
 * Feeds a custom TinyMCE emoticons database (see plugins/icons.ts) instead of a bespoke picker UI.
 *
 * \@module
 */
import type { CdnFile } from "@pantoken/cdn";
import { rebrandTokens } from "@pantoken/tokens";
import simpleIconsManifest from "@pantoken/plugin-simple-icons/manifest.json" with { type: "json" };

/** Prefix stripped from `@pantoken/tokens` icon token names to recover the bare icon slug. */
const COMPONENT_ICON_TOKEN_PREFIX = "--instui-icon-";

/**
 * Icon with source attribution for tracking which package it comes from.
 */
export interface TaggedIcon {
  name: string;
  source: "components" | "simple-icons";
  description?: string;
}

/** TinyMCE emoticons custom-database entry shape (`tinymce.Resource.add('tinymce.plugins.emoticons', ...)`). */
export interface EmoticonEntry {
  keywords: string[];
  char: string;
  category: string;
}

/** Stable id this package registers its icon database under; pass to TinyMCE's `emoticons_database_id`. */
export const PANTOKEN_ICONS_DATABASE_ID = "tinymce.plugins.pantoken-icons";

/** Category label shown as a picker tab, per icon source. */
const CATEGORY_BY_SOURCE: Record<TaggedIcon["source"], string> = {
  components: "Instructure UI",
  "simple-icons": "Simple Icons",
};

/** The two "all icons in one file" bundles the picker's own dialog chrome needs loaded to render every glyph. */
export const ICON_BUNDLE_CDN_FILES: CdnFile[] = [
  { package: "@pantoken/components", path: "dist/component-icons.css" },
  { package: "@pantoken/plugin-simple-icons", path: "dist/simple-icons.css" },
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
  }
}

/** Turn a hyphenated icon slug into a readable label, e.g. `circle-question-mark` → `circle question mark`. */
export function humanizeIconName(name: string): string {
  return name.replace(/-/g, " ");
}

/**
 * The markup inserted into editor content for a picked icon — pantoken's real accessible icon
 * component, not a placeholder. `data-pantoken-icon` is a transient marker (removed once the
 * label-edit follow-up dialog closes) used to locate the just-inserted node.
 */
export function buildIconMarkup(icon: TaggedIcon, label: string): string {
  return (
    `<span class="instui-icon -icon-${icon.name}" data-pantoken-icon="${icon.source}:${icon.name}">` +
    `<span class="instui-screen-reader-content">${label}</span></span>`
  );
}

/** Build the custom emoticons database TinyMCE's `emoticons` plugin renders/searches/inserts from. */
export function buildEmoticonsDatabase(icons: TaggedIcon[]): Record<string, EmoticonEntry> {
  const database: Record<string, EmoticonEntry> = {};
  for (const icon of icons) {
    const key = `${icon.source}:${icon.name}`;
    database[key] = {
      keywords: [...icon.name.split("-"), ...(icon.description ? [icon.description] : [])],
      char: buildIconMarkup(icon, humanizeIconName(icon.name)),
      category: CATEGORY_BY_SOURCE[icon.source],
    };
  }
  return database;
}

/** Recover the {@link TaggedIcon} a freshly-inserted HTML snippet came from, via its `data-pantoken-icon` marker. */
export function matchInsertedIcon(html: string, icons: TaggedIcon[]): TaggedIcon | undefined {
  const match = /data-pantoken-icon="([^":]+):([^"]+)"/.exec(html);
  if (!match) return undefined;
  const [, source, name] = match;
  return icons.find((icon) => icon.source === source && icon.name === name);
}
