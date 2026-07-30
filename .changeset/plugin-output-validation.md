---
"@pantoken/core": patch
---

Validate plugin hook output at the IR boundary in `runTokenPlugins` and
`runIconPlugins`. Token names are checked against the CSS custom property
pattern; invalid names are dropped with a warning. `<image>` tokens from
plugins have their SVG data-URI sanitized through `sanitizeSvg`. Plugin-
contributed `IconEntry.svg` values are sanitized before being encoded into
the IR. Both layers are needed: `@pantoken/icons` sanitizes at decode time
(vendored IR), this sanitizes at encode time (plugin output).
