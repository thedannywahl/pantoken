/**
 * Filesystem scan of `formats/components/src/components/` for the per-record component directories
 * and their icon usage. Split out from `generate-capabilities.ts` (which also imports the
 * `renderers/web-components` element list) so this cross-package-free half can be unit tested without
 * pulling a file outside this package into the same TypeScript program (that trips `rootDir`).
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// select.ts is experimental and explicitly not in the COMPONENTS registry — skip it.
const CSS_FS_SKIP = new Set(["select"]);

/**
 * Every per-record component directory name (`<name>/index.ts`, some with a co-located
 * `<name>.css`) under `formats/components/src/components/`.
 */
export function findCssNames(cssComponentsDir: string): Set<string> {
  return new Set(
    readdirSync(cssComponentsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((n) => !CSS_FS_SKIP.has(n)),
  );
}

/** Read a component's source(s): the co-located `<name>.css` (if any) plus `index.ts`. */
function readComponentSource(cssComponentsDir: string, name: string): string {
  const dir = resolve(cssComponentsDir, name);
  const cssFile = resolve(dir, `${name}.css`);
  const parts = [readFileSync(resolve(dir, "index.ts"), "utf8")];
  if (existsSync(cssFile)) parts.push(readFileSync(cssFile, "utf8"));
  return parts.join("\n");
}

/** Component names whose source reads a `var(--instui-icon-*)` glyph token. */
export function findCssIconNames(cssComponentsDir: string, cssNames: Set<string>): Set<string> {
  return new Set(
    [...cssNames].filter((name) =>
      /var\(--instui-icon-/.test(readComponentSource(cssComponentsDir, name)),
    ),
  );
}
