---
"@pantoken/ai": patch
"@pantoken/android": patch
"@pantoken/angular": patch
"@pantoken/astro": patch
"@pantoken/bootstrap": patch
"@pantoken/cli": patch
"@pantoken/components": patch
"@pantoken/compose": patch
"@pantoken/core": patch
"@pantoken/css": patch
"@pantoken/css-in-js": patch
"@pantoken/demo": patch
"@pantoken/docusaurus": patch
"@pantoken/drupal": patch
"@pantoken/dtcg": patch
"@pantoken/email": patch
"@pantoken/figma": patch
"@pantoken/flutter": patch
"@pantoken/foundation": patch
"@pantoken/hugo": patch
"@pantoken/icon-font": patch
"@pantoken/icons": patch
"@pantoken/jekyll": patch
"@pantoken/less": patch
"@pantoken/markdown-it": patch
"@pantoken/mintlify": patch
"@pantoken/model": patch
"@pantoken/mui": patch
"@pantoken/next": patch
"@pantoken/panda": patch
"@pantoken/pantoken": patch
"@pantoken/pendo": patch
"@pantoken/plugin-colors": patch
"@pantoken/plugin-kit": patch
"@pantoken/plugin-logos": patch
"@pantoken/plugin-primitives": patch
"@pantoken/plugin-prune-custom-props": patch
"@pantoken/plugin-simple-icons": patch
"@pantoken/plugin-stacking": patch
"@pantoken/plugin-theme-custom-media": patch
"@pantoken/plugin-transition": patch
"@pantoken/plugin-visual-debug": patch
"@pantoken/postcss": patch
"@pantoken/react": patch
"@pantoken/react-markdown": patch
"@pantoken/react-native": patch
"@pantoken/rehype": patch
"@pantoken/rust": patch
"@pantoken/scss": patch
"@pantoken/shadcn": patch
"@pantoken/storybook": patch
"@pantoken/stylus": patch
"@pantoken/svelte": patch
"@pantoken/swatches": patch
"@pantoken/swift": patch
"@pantoken/tailwind": patch
"@pantoken/tokens": patch
"@pantoken/typedoc-plugin-demo": patch
"@pantoken/typedoc-plugin-live-example": patch
"@pantoken/utils": patch
"@pantoken/vanilla": patch
"@pantoken/vite": patch
"@pantoken/vite-workspace-orchestrator": patch
"@pantoken/vitepress": patch
"@pantoken/vue": patch
"@pantoken/web-components": patch
"@pantoken/webpack": patch
"@pantoken/wordpress": patch
---

# Enrich npm package metadata

Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
`engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
while preserving the stylesheets in the CSS-shipping ones.
