---
"@pantoken/plugin-logos": minor
"@pantoken/tinymce": minor
---

Rasterize every logo to a PNG at build time (sized from the SVG's `viewBox`, published in the
package's `dist/`) and switch the TinyMCE logos picker to insert a real, CDN-hosted `<img src>`
instead of the previous `data-product`/`src="about:blank"` + CSS-background-image workaround.
Canvas LMS's RCE strips inline `<svg>` and doesn't reliably keep a linked stylesheet's
background-image, so logos need a genuine raster `<img>` with real `width`/`height` — icons already
solved this via a CSS class, but that trick only works for inline, square, decorative content, not
block-level logos with their own aspect ratio and non-decorative alt text.

`@pantoken/plugin-logos` also exports a new `getLogoMeta()` helper and each `LogoMeta` entry now
carries `width`/`height` for the rasterized PNG. The logos picker dialog's layout/color-mode
dropdowns were also narrowed to only the real `LogoLayout`/`LogoColorMode` enum values (they
previously offered `"vertical"`/`"monochrome"`, which don't match any actual logo asset).
