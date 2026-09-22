/**
 * Merged icon list: \@pantoken/components built-in icons + \@pantoken/plugin-simple-icons brand icons.
 * Each icon is tagged with its source package so the correct CdnFile/category can be computed.
 * Feeds a custom TinyMCE emoticons database (see plugins/icons.ts) instead of a bespoke picker UI.
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
  "lucide-lab": "Lucide Lab",
  "custom-icons": "Custom Icons",
};

/**
 * The "all icons in one file" bundles the picker's own dialog chrome needs loaded to render every
 * glyph. Must be the full glyph sheets, not `component-icons.css` — that lean file only carries the
 * handful of `--instui-icon-*` tokens the component CSS itself references, so most icons would have
 * no glyph token defined and render as unmasked, filled squares in the picker.
 */
export const ICON_BUNDLE_CDN_FILES: CdnFile[] = [
  { package: "@pantoken/components", path: "dist/icons.css" },
  { package: "@pantoken/plugin-simple-icons", path: "dist/simple-icons.css" },
  { package: "@pantoken/plugin-lucide-lab", path: "dist/lucide-lab.css" },
  { package: "@pantoken/plugin-custom-icons", path: "dist/custom-icons.css" },
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

/** Add a transient source marker so the picker plugin can track the selected icon's CSS asset. */
function buildTrackedIconMarkup(icon: TaggedIcon): string {
  return `<span class="instui-icon -icon-${icon.name}" data-pantoken-icon="${icon.source}:${icon.name}" aria-hidden="true"></span>`;
}

/** Build the custom emoticons database TinyMCE's `emoticons` plugin renders/searches/inserts from. */
export function buildEmoticonsDatabase(icons: TaggedIcon[]): Record<string, EmoticonEntry> {
  const database: Record<string, EmoticonEntry> = {};
  for (const icon of icons) {
    const key = `${icon.source}:${icon.name}`;
    database[key] = {
      keywords: [...icon.name.split("-"), ...(icon.description ? [icon.description] : [])],
      char: buildTrackedIconMarkup(icon),
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
