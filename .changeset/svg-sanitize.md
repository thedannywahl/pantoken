---
"@pantoken/utils": patch
"@pantoken/icons": patch
---

Add `sanitizeSvg` to `@pantoken/utils`: a zero-dependency regex-based helper
that strips `<script>` elements and `on*` event-handler attributes from SVG
markup. Applied at decode time in `@pantoken/icons` so every icon in the
`icons` array and `iconsByName` map has script injection removed before
exposure to consumers. Defense-in-depth for the vendored IR; does not change
clean SVG content.
