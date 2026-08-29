/**
 * Merged icon list: \@pantoken/components built-in icons + \@pantoken/plugin-simple-icons brand icons.
 * Each icon is tagged with its source package so the correct CdnFile can be computed on insert.
 *
 * \@module
 */
import simpleIconsManifest from "@pantoken/plugin-simple-icons/manifest.json" with { type: "json" };

/**
 * Icon with source attribution for tracking which package it comes from.
 */
export interface TaggedIcon {
  name: string;
  source: "components" | "simple-icons";
  description?: string;
}

/**
 * Load and merge all available icons from both sources.
 * Returns a sorted array tagged with the source package.
 *
 * NOTE: Component icon names are derived from the model's `-icon-*` modifier.
 * This needs to be populated from either `docs/public/icon-manifest.json` (if consumable)
 * or a manifest published alongside formats/components model.json.
 * For now, only simple-icons are included.
 */
export async function loadAllIcons(): Promise<TaggedIcon[]> {
  const icons: TaggedIcon[] = [];

  // Add simple-icons (already loaded from manifest).
  if (Array.isArray(simpleIconsManifest)) {
    for (const iconSlug of simpleIconsManifest) {
      icons.push({
        name: iconSlug,
        source: "simple-icons",
        description: `Brand icon: ${iconSlug}`,
      });
    }
  }

  // TODO: Add component icons once icon-manifest.json source is resolved (Further Considerations #4).
  // For now, component icons are only accessible via the components picker's cssdoc model.

  return icons.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Compute the CdnFile for an icon given its source.
 * Returns `{ package, path }` for use with \@pantoken/cdn's buildFileUrl.
 */
export function getIconCdnFile(icon: TaggedIcon): {
  package: string;
  path: string;
} {
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
