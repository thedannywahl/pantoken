/**
 * `@pantoken/jekyll` — emit the Instructure token stylesheet for a Jekyll site.
 *
 * Jekyll has no standard theming-variable contract, so this delivers the tokens as drop-in assets:
 * a Sass partial for `_sass/` (import it from your main stylesheet) and a plain CSS file for
 * `assets/css/` (from `@pantoken/scss` and `@pantoken/css`), plus an InstUI-look prose stylesheet
 * (from `@pantoken/components`) that styles content in a `.pantoken-prose` region.
 *
 * @module
 */
import { css as pantokenCss } from "@pantoken/css";
import { proseCss } from "@pantoken/components";
import { scss as pantokenScss } from "@pantoken/scss";

/** A generated file: a site-relative path and its contents. */
export interface JekyllFile {
  path: string;
  content: string;
}

/**
 * Build the token asset files for a Jekyll site (paths relative to the site root).
 *
 * @returns The Sass partial (`_sass/pantoken.scss`), the plain stylesheet
 * (`assets/css/pantoken.css`), and the prose stylesheet (`assets/css/pantoken-prose.css`).
 *
 * @example Write the assets under a site root
 * ```ts
 * import { writeFileSync, mkdirSync } from "node:fs";
 * import { dirname, join } from "node:path";
 * import { toJekyllAssets } from "@pantoken/jekyll";
 *
 * for (const { path, content } of toJekyllAssets()) {
 *   const dest = join("./my-site", path);
 *   mkdirSync(dirname(dest), { recursive: true });
 *   writeFileSync(dest, content);
 * }
 * ```
 */
export function toJekyllAssets(): JekyllFile[] {
  return [
    { path: "_sass/pantoken.scss", content: pantokenScss },
    { path: "assets/css/pantoken.css", content: pantokenCss },
    { path: "assets/css/pantoken-prose.css", content: proseCss({ scope: ".pantoken-prose" }) },
  ];
}
