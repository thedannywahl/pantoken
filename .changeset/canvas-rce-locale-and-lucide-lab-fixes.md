---
"@pantoken/scaffold": patch
---

Fix two remaining canvas-theme-editor limitations: the locale switcher now actually swaps UI
strings (title, description, labels, help modal) using real translations from the CLI's PO
catalogs, falling back to English per-key when a locale/key has no translation yet; and it applies
whatever locale the page was scaffolded for on load, not just when the switcher is used. Swapping
happens by patching text/attributes into a live-rendered DOM tree in place (skipping the
TinyMCE/CodeMirror-mounted panes), so wired-up listeners and editor state survive the switch.
