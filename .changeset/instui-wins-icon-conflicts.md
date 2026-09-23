---
"@pantoken/plugin-simple-icons": patch
"@pantoken/plugin-lucide-lab": patch
"@pantoken/icons": patch
---

Fix InstUI/Lucide icons losing to same-named simple-icons or Lucide Lab glyphs (e.g. the `x` close
icon vs. the X/Twitter brand logo). `@pantoken/plugin-simple-icons` and `@pantoken/plugin-lucide-lab`
now skip (and warn on) a slug/name that already exists in the token IR instead of overwriting it, and
`buildIconResolverChain` now tries the built-in icon set before plugin `rehype` resolvers so a
colliding `:code:` resolves to the built-in icon.
