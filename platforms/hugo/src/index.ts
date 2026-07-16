/**
 * `@pantoken/hugo` — emit the Instructure token stylesheet for a Hugo site.
 *
 * Hugo has no standard theming-variable contract, so this delivers the tokens as drop-in assets
 * under `assets/` (where Hugo Pipes / Dart Sass pick them up): a Sass partial and a plain CSS file
 * (from `@pantoken/scss` and `@pantoken/css`), plus an InstUI-look prose stylesheet (from
 * `@pantoken/components`) that styles content in a `.pantoken-prose` region.
 *
 * @module
 * @experimental
 */
import { css as pantokenCss } from "@pantoken/css";
import { proseCss } from "@pantoken/components";
import { scss as pantokenScss } from "@pantoken/scss";

/** A generated file: a site-relative path and its contents. */
export interface HugoFile {
  path: string;
  content: string;
}

/**
 * Build the token asset files for a Hugo site (paths relative to the site root).
 *
 * @returns The Sass partial (`assets/scss/_pantoken.scss`), the plain stylesheet
 * (`assets/css/pantoken.css`), and the prose stylesheet (`assets/css/pantoken-prose.css`).
 *
 * @example Write the assets under a site root
 * ```ts
 * import { writeFileSync, mkdirSync } from "node:fs";
 * import { dirname, join } from "node:path";
 * import { toHugoAssets } from "@pantoken/hugo";
 *
 * for (const { path, content } of toHugoAssets()) {
 *   const dest = join("./my-site", path);
 *   mkdirSync(dirname(dest), { recursive: true });
 *   writeFileSync(dest, content);
 * }
 * ```
 */
export function toHugoAssets(): HugoFile[] {
  return [
    { path: "assets/scss/_pantoken.scss", content: pantokenScss },
    { path: "assets/css/pantoken.css", content: pantokenCss },
    { path: "assets/css/pantoken-prose.css", content: proseCss({ scope: ".pantoken-prose" }) },
  ];
}
