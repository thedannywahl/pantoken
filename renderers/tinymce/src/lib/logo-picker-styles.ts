/**
 * Stylesheet setup for the logos picker: the shared tile-picker chrome, wider variant tiles, a
 * logo painter scoped to the picker, and the `@pantoken/plugin-logos` bundle that sets each tile's
 * `--pantoken-glyph`. Renders in the top-level document, like the icons picker.
 *
 * \@module
 */
import { buildFileUrl, type CdnFile } from "@pantoken/cdn";
import { LOGOS_BUNDLE_CDN_FILE } from "../logos.js";
import {
  appendPickerStyle,
  injectPickerChrome,
  PICKER_ROOT_CLASS,
  upsertPickerStylesheet,
} from "./icon-picker-styles.js";

/** Modifier class on the logos picker's root, alongside the shared picker root class. */
export const LOGO_PICKER_CLASS = "pantoken-lp";

const ROOT = `.${PICKER_ROOT_CLASS}.${LOGO_PICKER_CLASS}`;

// Mask `contain` keeps each logo undistorted inside a fixed box, whatever its aspect ratio.
const LOGO_PICKER_CSS = `
${ROOT} .${PICKER_ROOT_CLASS}__grid {
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
  align-content: start;
}
${ROOT} .${PICKER_ROOT_CLASS}__tile {
  flex-direction: column;
  gap: 6px;
  aspect-ratio: auto;
  padding: 12px 8px 8px;
  font-size: 12px;
}
${ROOT} .instui-logo {
  display: block;
  inline-size: 100%;
  block-size: 48px;
}
${ROOT} .instui-logo[class*="-logo-"]::before {
  content: "";
  display: block;
  inline-size: 100%;
  block-size: 100%;
  background: currentColor;
  -webkit-mask: var(--pantoken-glyph) center / contain no-repeat;
  mask: var(--pantoken-glyph) center / contain no-repeat;
}
.${LOGO_PICKER_CLASS}__caption {
  line-height: 1.2;
  text-align: center;
  opacity: 0.8;
}`;

/** Install the logos picker's styles; idempotent, and the bundle link follows the current provider. */
export function injectLogoPickerStyles(
  doc: Document,
  buildAssetUrl: (file: CdnFile) => string = buildFileUrl,
): void {
  injectPickerChrome(doc);
  appendPickerStyle(doc, "logos", LOGO_PICKER_CSS);
  upsertPickerStylesheet(doc, LOGOS_BUNDLE_CDN_FILE.package, buildAssetUrl(LOGOS_BUNDLE_CDN_FILE));
}
