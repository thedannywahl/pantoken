---
"@pantoken/plugin-custom-theme-colors": minor
"@pantoken/scaffold": minor
"@pantoken/demo": minor
---

Add a `custom` color scale derived from any brand hex. `deriveCustomColorScale()` puts the input on
the step with the nearest perceptual lightness, using the mean OKLCH curve of the 13 shipped families
from white (0) to black (210). It snaps the input to that step's lightness, then fills in every
other step with the input's hue. `customColorCss()` and the new `custom` option emit a
`[data-pantoken-color="custom"]` rule. The Canvas theme editor adds a Custom swatch with a hex field
and includes the rule in the preview, presets, and the
downloaded `theme.css`.

The editor's header color menu also offers Custom. A new dependency-free
`@pantoken/plugin-custom-theme-colors/scale` entry, plus `customColorReferenceCurve()` and
`customColorRemapCss()`, lets a browser derive the scale without the token set. Demo frames from
`@pantoken/demo` apply a posted `customScale` (20 `#rrggbb` values) to the `custom` color.
