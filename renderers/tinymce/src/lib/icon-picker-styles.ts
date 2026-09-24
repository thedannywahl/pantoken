/**
 * Stylesheet setup for the icons picker dialog, which renders in the top-level document rather than
 * the editor's content iframe and so can't rely on anything the host page happens to have loaded.
 *
 * \@module
 */
import { buildFileUrl } from "@pantoken/cdn";
import type { CdnFile } from "@pantoken/cdn";
import { buildIconTokenCss, ICON_BUNDLE_CDN_FILES, type TaggedIcon } from "../icons.js";

/** Marks the elements this module owns so each is injected at most once per document. */
const OWNED_ATTRIBUTE = "data-pantoken-icon-picker";

/** Root class the dialog markup carries; scopes the glyph painter so it can't leak into the host page. */
export const PICKER_ROOT_CLASS = "pantoken-ip";

/** Class on the `::name` autocompleter's row glyph `<img>` (added via its `classes` field). */
export const AUTOCOMPLETE_GLYPH_CLASS = "pantoken-icon-glyph";

/**
 * Pins the autocompleter row glyph to the editor's line-height. Without this, sources whose SVGs
 * carry no explicit `width`/`height` (Simple Icons only declares a `viewBox`) fall back to the
 * browser's default replaced-element size — hugely larger than every other source, and blurry from
 * the browser then downscaling that oversized raster into the row.
 */
const AUTOCOMPLETE_CSS = `
.${AUTOCOMPLETE_GLYPH_CLASS} {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
  flex: none;
  vertical-align: middle;
}`;

/**
 * The glyph painter, scoped to the picker. Mirrors the canonical `icon` utility in
 * `@pantoken/components` (`src/utilities/icon/icon.css`) — keep the two in sync.
 */
const PAINTER_CSS = `
.${PICKER_ROOT_CLASS} .instui-icon {
  display: inline-flex;
}
.${PICKER_ROOT_CLASS} .instui-icon[class*="-icon-"]::before {
  content: "";
  display: inline-block;
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  vertical-align: -0.125em;
  background: currentColor;
  -webkit-mask: var(--pantoken-glyph) center / contain no-repeat;
  mask: var(--pantoken-glyph) center / contain no-repeat;
}`;

/**
 * Layout for the picker chrome. Deliberately self-contained so no Oxide collection styles apply.
 *
 * TinyMCE's skin ships `.tox :not(svg):not(rect) { color: inherit; font-family: inherit; ... }`,
 * which — because this dialog is a descendant of `.tox` — outguns any of these unscoped,
 * single-class rules on specificity ((0,1,2) beats a plain class's (0,1,0)). Search/tab/grid borders
 * use `currentColor`, so a washed-out inherited `color` made them look invisible; forcing a real,
 * scheme-adaptive `color` here fixes all of them at once. `!important` on `overflow`/`height` guards
 * against the same reset capping this at "so tall it pushes the dialog's own Cancel/Insert buttons
 * off-screen" — see the tinymce-codemirror package for the same class of fix.
 */
const LAYOUT_CSS = `
.${PICKER_ROOT_CLASS} {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
  height: min(60vh, 420px) !important;
  overflow: hidden !important;
  color: CanvasText !important;
}
.${PICKER_ROOT_CLASS}__search {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  font: inherit;
  color: inherit !important;
  background: transparent;
  border: 1px solid currentColor !important;
  border-radius: 4px;
  opacity: 0.999;
}
.${PICKER_ROOT_CLASS}__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: none;
}
.${PICKER_ROOT_CLASS}__tab {
  padding: 4px 10px;
  font: inherit;
  font-size: 0.85em;
  color: inherit !important;
  cursor: pointer;
  background: transparent;
  border: 1px solid currentColor !important;
  border-radius: 999px;
  opacity: 0.65;
}
.${PICKER_ROOT_CLASS}__tab[aria-selected="true"] {
  font-weight: 600;
  opacity: 1;
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.${PICKER_ROOT_CLASS}__grid {
  display: grid;
  flex: 1 1 auto;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 4px;
  min-height: 0;
  padding: 4px;
  overflow-y: auto !important;
  border: 1px solid currentColor !important;
  border-radius: 4px;
}
.${PICKER_ROOT_CLASS}__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  aspect-ratio: 1;
  padding: 0;
  font-size: 20px;
  color: inherit !important;
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
}
.${PICKER_ROOT_CLASS}__tile:hover,
.${PICKER_ROOT_CLASS}__tile:focus-visible {
  border-color: currentColor !important;
}
.${PICKER_ROOT_CLASS}__tile.is-selected {
  border-color: currentColor !important;
  background: color-mix(in srgb, currentColor 18%, transparent);
}
/* A hovered tile borrows the same border as a selected one, so the border alone can't tell them
   apart once the mouse moves elsewhere \u2014 this corner dot persists regardless of hover state. */
.${PICKER_ROOT_CLASS}__tile.is-selected::after {
  content: "";
  position: absolute;
  inset-block-end: 3px;
  inset-inline-end: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 0 2px Canvas;
}
.${PICKER_ROOT_CLASS}__sentinel {
  grid-column: 1 / -1;
  height: 1px;
}
.${PICKER_ROOT_CLASS}__status {
  flex: none;
  font-size: 0.8em;
  opacity: 0.7;
}
.${PICKER_ROOT_CLASS}__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}`;

function appendOnce(doc: Document, key: string, build: () => Element): void {
  if (doc.head.querySelector(`[${OWNED_ATTRIBUTE}="${key}"]`)) return;
  const element = build();
  element.setAttribute(OWNED_ATTRIBUTE, key);
  doc.head.append(element);
}

function appendStyle(doc: Document, key: string, css: string): void {
  appendOnce(doc, key, () => {
    const style = doc.createElement("style");
    style.textContent = css;
    return style;
  });
}

/**
 * Install everything the picker needs to paint glyphs: the scoped painter, its layout, the glyph
 * tokens this package carries inline, and a stylesheet per source whose SVGs it does not.
 * Idempotent — safe to call on every dialog open.
 */
export function injectPickerStyles(
  doc: Document,
  icons: readonly TaggedIcon[],
  provider?: string,
  buildAssetUrl?: (file: CdnFile) => string,
): void {
  appendStyle(doc, "chrome", `${PAINTER_CSS}\n${LAYOUT_CSS}`);
  appendStyle(doc, "autocomplete", AUTOCOMPLETE_CSS);
  appendStyle(doc, "tokens", buildIconTokenCss(icons));
  for (const file of ICON_BUNDLE_CDN_FILES) {
    appendOnce(doc, file.package, () => {
      const link = doc.createElement("link");
      link.rel = "stylesheet";
      link.href = (buildAssetUrl ?? ((f: CdnFile) => buildFileUrl(f, provider)))(file);
      return link;
    });
  }
}
