---
"@pantoken/pendo": patch
---

Fix the igniteai banner glyph resolving to an empty computed value in production. `scripts/embed.ts`'s `productIcons` list was missing `"igniteai"`, so `--instui-logo-igniteai-icon-reversed` was referenced by `container.css` but never embedded into the shipped `global.css`/bundle.
