---
"@pantoken/core": minor
"@pantoken/model": minor
"@pantoken/utils": minor
"@pantoken/tokens": minor
---

Tokens Studio colour modifiers (`alpha` / `lighten` / `darken`) now keep their `var()` origin
instead of being flattened to a hex. `@pantoken/core` emits the modifier as a CSS expression —
`color-mix(in srgb, var(--…) 20%, transparent)`, `hsl(from var(--…) h s calc(…))` — and records the
old flattened literal on the new `Token.flatValue`.

This fixes derived brand colours that could never follow a custom theme colour. A secondary
button's hover and active backgrounds (upstream: `lighten`/`darken` over the brand token) resolved
to literals like `#4d7eb333` that matched no primitive step, so `@pantoken/plugin-custom-theme-colors`
had nothing to re-point and they stayed navy under every `[data-pantoken-color]` scope — in both
schemes, and on `.instui-button.-color-secondary` and `.instui-button.-color-secondary.-toggle`
alike. They now resolve through the primitive the scope already overrides.

Emitters that need a real colour rather than a CSS expression are unaffected: the shared resolver in
`@pantoken/utils` (`makeResolver` / `resolveTokens`) prefers `flatValue`, so the native lineage,
Figma, swatches, and the preprocessor formats keep emitting exactly the same literals as before.
