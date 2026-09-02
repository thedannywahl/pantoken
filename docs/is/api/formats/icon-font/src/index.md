[pantoken](../../../index.md) / icon-font

# icon-font

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/icon-font` — build an installable Instructure icon font (WOFF2 + TTF) with a matching
stylesheet and codepoint map. Unlike the inline-SVG paths, a font installs on a device, so it
works in design apps and offline contexts where the web tooling isn't reachable.

Stroke-based glyphs (Lucide) are outlined to fills so they render as real font glyphs; fill-based
glyphs (Instructure custom) pass through.

## Viðmót

- [IconFontResult](interfaces/IconFontResult.md)
- [BuildIconFontOptions](interfaces/BuildIconFontOptions.md)
- [GlyphPath](interfaces/GlyphPath.md)

## Föll

- [buildIconFont](functions/buildIconFont.md)
- [svgToGlyphPath](functions/svgToGlyphPath.md)
