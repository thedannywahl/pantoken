---
"@pantoken/android": patch
"@pantoken/astro": patch
"@pantoken/bootstrap": patch
"@pantoken/compose": patch
"@pantoken/core": patch
"@pantoken/css": patch
"@pantoken/css-in-js": patch
"@pantoken/docusaurus": patch
"@pantoken/dtcg": patch
"@pantoken/email": patch
"@pantoken/figma": patch
"@pantoken/flutter": patch
"@pantoken/foundation": patch
"@pantoken/icon-font": patch
"@pantoken/icons": patch
"@pantoken/interactions": patch
"@pantoken/less": patch
"@pantoken/markdown-it": patch
"@pantoken/mintlify": patch
"@pantoken/model": patch
"@pantoken/mui": patch
"@pantoken/next": patch
"@pantoken/panda": patch
"@pantoken/plugin-colors": patch
"@pantoken/plugin-custom-icons": patch
"@pantoken/plugin-flatten-property": patch
"@pantoken/plugin-kit": patch
"@pantoken/plugin-logos": patch
"@pantoken/plugin-mangle-custom-props": patch
"@pantoken/plugin-primitives": patch
"@pantoken/plugin-props-minify": patch
"@pantoken/plugin-prune-custom-props": patch
"@pantoken/plugin-simple-icons": patch
"@pantoken/plugin-stacking": patch
"@pantoken/plugin-theme-custom-media": patch
"@pantoken/plugin-transition": patch
"@pantoken/plugin-visual-debug": patch
"@pantoken/postcss": patch
"@pantoken/react-markdown": patch
"@pantoken/react-native": patch
"@pantoken/rehype": patch
"@pantoken/rust": patch
"@pantoken/scss": patch
"@pantoken/shadcn": patch
"@pantoken/storybook": patch
"@pantoken/stylus": patch
"@pantoken/swatches": patch
"@pantoken/swift": patch
"@pantoken/tailwind": patch
"@pantoken/tokens": patch
"@pantoken/typedoc-plugin-demo": patch
"@pantoken/typedoc-plugin-live-example": patch
"@pantoken/utils": patch
"@pantoken/vanilla": patch
"@pantoken/vite": patch
"@pantoken/vitepress": patch
"@pantoken/webpack": patch
"@pantoken/wordpress": patch
---

Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
at a glance without cross-referencing `pnpm-workspace.yaml`.
