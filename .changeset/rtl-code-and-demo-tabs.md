---
"@pantoken/components": patch
"@pantoken/demo": minor
---

Keep code left-to-right in RTL contexts, and let a host localize the demo runner's view tabs.

- `prose.css` isolates `code` and `pre` as LTR runs, so class names made of bidi-neutral characters
  (`.--bg-<name>`) no longer render reordered inside Arabic, Hebrew, or Persian prose.
- The runner's code panes stay left-to-right even when the embedding page is RTL.
- `resolveDemo`/`demoMarkdownIt` accept `labels` (and the per-page `localeLabels`) to translate the
  runner's `Result`/`HTML`/`CSS`/`JS` tabs; without them the runner keeps its English defaults.
