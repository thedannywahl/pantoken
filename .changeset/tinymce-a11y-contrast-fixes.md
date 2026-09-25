---
"@pantoken/tinymce-a11y": patch
---

Fix the contrast checker missing real issues: it no longer requires an explicit
`background-color` on the exact element being checked (most content inherits its background from an
ancestor instead), no longer excludes icon-font spans with empty/placeholder text content (e.g. a
zero-width space used for caret placement), and no longer always reports failure for hex colors due
to a hex-channel parsing bug. Also adds an opt-in `colorSchemes`/`setColorScheme`/`getColorScheme`
config hook so a host app can check contrast under both light and dark rendering; `A11yIssue.detail`
now carries per-instance context (e.g. which scheme failed).
