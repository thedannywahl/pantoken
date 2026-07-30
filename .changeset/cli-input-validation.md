---
"@pantoken/cli": patch
---

Validate all restricted CLI inputs at parse time. `--theme` is checked against
the `rebrand | canvas | canvasHighContrast` allowlist; `--class` must be a valid
identifier; `--format` for the `rust` target must be `egui` or `iced`; unknown
flags are rejected immediately. Passing an invalid value now throws a descriptive
error instead of silently falling back to a default. Warns when the output path
escapes the current working directory.
