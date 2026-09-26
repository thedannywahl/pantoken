/**
 * Logos data: direct re-export from \@pantoken/plugin-logos, plus the TinyMCE-specific glyph markup
 * and asset-resolution helpers (mirrors icons.ts's `buildIconMarkup`/`getIconCdnFile`/
 * `getUsedIconCdnFiles`) that let a logo insert as a mask-painted `.-logo-<name>` class instead of a
 * rasterized `<img>`.
 *
 * \@module
 */
import type { CdnFile } from "@pantoken/cdn";
import { type LogoMeta, logos } from "@pantoken/plugin-logos";
import { TINYMCE_STRINGS } from "./strings.js";

export { type LogoMeta, type Product, getLogoMeta, logos, products } from "@pantoken/plugin-logos";

/** Resolve a logo's stylesheet: the `.-logo-<name>` mask painter plus its `--instui-logo-<name>` token. */
export function getLogoCdnFile(meta: LogoMeta): CdnFile {
  return { package: "@pantoken/plugin-logos", path: `dist/${meta.name}.css` };
}

/**
 * The logo markup retained in editor content after a picker selection — same
 * zero-width-space/`contenteditable="false"` noneditable-object technique as `icons.ts`'s
 * `buildIconMarkup`. Unlike a decorative icon, a logo names a real product, so it carries
 * `role="img"` + `aria-label` instead of `aria-hidden`.
 */
export function buildLogoMarkup(meta: LogoMeta, altSuffix = TINYMCE_STRINGS.logoAltSuffix): string {
  const label = `${meta.product} ${altSuffix}`
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<span class="instui-logo -logo-${meta.name}" contenteditable="false" role="img" aria-label="${label}">\u200B</span>`;
}

/** Resolve the logo stylesheets used by `-logo-*` classes below `root`. */
export function getUsedLogoCdnFiles(
  root: ParentNode,
  allLogos: readonly LogoMeta[] = logos,
): CdnFile[] {
  const byName = new Map(allLogos.map((l) => [l.name, l]));
  const usedNames = new Set<string>();
  for (const element of root.querySelectorAll("[class]")) {
    for (const className of element.classList) {
      if (className.startsWith("-logo-") && className.length > "-logo-".length) {
        usedNames.add(className.slice("-logo-".length));
      }
    }
  }
  return [...usedNames].flatMap((name) => {
    const meta = byName.get(name);
    return meta ? [getLogoCdnFile(meta)] : [];
  });
}
