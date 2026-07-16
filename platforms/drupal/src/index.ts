/**
 * `@pantoken/drupal` — emit an Instructure-themed Drupal sub-theme.
 *
 * Produces the token stylesheet (from `@pantoken/css`) and an InstUI-look prose stylesheet (from
 * `@pantoken/components`, styling content in a `.pantoken-prose` region), plus the `*.info.yml`
 * and `*.libraries.yml` a Drupal 10/11 theme needs to load them. Drop the files into
 * `themes/custom/<machine>/`.
 *
 * @module
 * @experimental
 */
import { css as pantokenCss } from "@pantoken/css";
import { proseCss } from "@pantoken/components";

/** A generated file: a theme-relative path and its contents. */
export interface DrupalFile {
  path: string;
  content: string;
}

/**
 * Convert a display name to a Drupal machine name (`lower_snake`).
 *
 * @example
 * ```ts
 * import { machineName } from "@pantoken/drupal";
 *
 * machineName("Instructure"); // "instructure"
 * machineName("My Canvas Theme"); // "my_canvas_theme"
 * ```
 */
export function machineName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "pantoken"
  );
}

/** Options for {@link toDrupalTheme}. */
export interface ToDrupalThemeOptions {
  /** The theme's human-readable name (default `"Instructure"`). */
  name?: string;
  /** The base theme (default `false` — a standalone theme). */
  baseTheme?: string | false;
}

/**
 * Build the files for a Drupal sub-theme that loads the Instructure tokens.
 *
 * @param options - {@link ToDrupalThemeOptions}.
 * @returns The theme files, paths relative to the theme directory.
 *
 * @example Build and write a standalone sub-theme
 * ```ts
 * import { writeFileSync, mkdirSync } from "node:fs";
 * import { dirname, join } from "node:path";
 * import { toDrupalTheme } from "@pantoken/drupal";
 *
 * const files = toDrupalTheme({ name: "Instructure" });
 * // [ instructure.info.yml, instructure.libraries.yml, css/tokens.css, css/pantoken-prose.css ]
 * for (const { path, content } of files) {
 *   const dest = join("./themes/custom/instructure", path);
 *   mkdirSync(dirname(dest), { recursive: true });
 *   writeFileSync(dest, content);
 * }
 * ```
 *
 * @example Build a sub-theme on top of a base theme
 * ```ts
 * import { toDrupalTheme } from "@pantoken/drupal";
 *
 * const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
 * ```
 */
export function toDrupalTheme(options: ToDrupalThemeOptions = {}): DrupalFile[] {
  const name = options.name ?? "Instructure";
  const machine = machineName(name);
  const baseTheme = options.baseTheme ?? false;

  const info = [
    `name: ${name}`,
    "type: theme",
    `base theme: ${baseTheme === false ? "false" : baseTheme}`,
    "core_version_requirement: ^10 || ^11",
    "libraries:",
    `  - ${machine}/tokens`,
    "",
  ].join("\n");

  const libraries = [
    "tokens:",
    "  version: 1.x",
    "  css:",
    "    theme:",
    "      css/tokens.css: {}",
    "      css/pantoken-prose.css: {}",
    "",
  ].join("\n");

  return [
    { path: `${machine}.info.yml`, content: info },
    { path: `${machine}.libraries.yml`, content: libraries },
    { path: "css/tokens.css", content: pantokenCss },
    { path: "css/pantoken-prose.css", content: proseCss({ scope: ".pantoken-prose" }) },
  ];
}
