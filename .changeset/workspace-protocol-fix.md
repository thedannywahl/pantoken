---
"@pantoken/android": patch
"@pantoken/angular": patch
"@pantoken/astro": patch
"@pantoken/cli": patch
"@pantoken/components": patch
"@pantoken/compose": patch
"@pantoken/core": patch
"@pantoken/css": patch
"@pantoken/css-in-js": patch
"@pantoken/drupal": patch
"@pantoken/dtcg": patch
"@pantoken/email": patch
"@pantoken/figma": patch
"@pantoken/flutter": patch
"@pantoken/hugo": patch
"@pantoken/i18n": patch
"@pantoken/icon-font": patch
"@pantoken/icons": patch
"@pantoken/jekyll": patch
"@pantoken/less": patch
"@pantoken/markdown-it": patch
"@pantoken/mintlify": patch
"@pantoken/mui": patch
"@pantoken/panda": patch
"@pantoken/pantoken": patch
"@pantoken/pendo": patch
"@pantoken/plugin-custom-components": patch
"@pantoken/plugin-custom-icons": patch
"@pantoken/plugin-kit": patch
"@pantoken/plugin-layouts": patch
"@pantoken/plugin-logos": patch
"@pantoken/plugin-primitives": patch
"@pantoken/plugin-props-minify": patch
"@pantoken/plugin-simple-icons": patch
"@pantoken/plugin-stacking": patch
"@pantoken/plugin-transition": patch
"@pantoken/plugin-visual-debug": patch
"@pantoken/postcss": patch
"@pantoken/react": patch
"@pantoken/react-markdown": patch
"@pantoken/react-native": patch
"@pantoken/rehype": patch
"@pantoken/rust": patch
"@pantoken/scss": patch
"@pantoken/storybook": patch
"@pantoken/stylus": patch
"@pantoken/svelte": patch
"@pantoken/swatches": patch
"@pantoken/swift": patch
"@pantoken/tailwind": patch
"@pantoken/tokens": patch
"@pantoken/utils": patch
"@pantoken/vanilla": patch
"@pantoken/vite": patch
"@pantoken/vue": patch
"@pantoken/web-components": patch
"@pantoken/webpack": patch
"@pantoken/wordpress": patch
---

Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
protocol string. Every previously published version of this package shipped with that bug (found by
`scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
`pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
