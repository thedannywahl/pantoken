---
"@pantoken/utils": minor
"@pantoken/tokens": patch
"@pantoken/components": patch
---

`known-syntax-issues.json` entries can now declare `supplemental` tokens to add to the IR alongside a patched value, for upstream bugs that squash two properties into one bad string (e.g. `--instui-component-text-content-quote-font-weight: "Medium Italic"` now also emits `--instui-component-text-content-quote-font-style: italic`). `@pantoken/utils`' token syntax validator also gains a real `font-style` property mapping. The two component CSS spots that hand-authored a `500`/`italic` literal fallback for the broken token now reference it directly.
