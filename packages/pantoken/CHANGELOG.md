# CHANGELOG

## 0.2.6

### Patch Changes

- @pantoken/android@0.1.17
  - @pantoken/compose@0.1.17
  - @pantoken/flutter@0.1.17
  - @pantoken/swift@0.1.17
  - @pantoken/cli@0.1.26

## 0.2.5

### Patch Changes

- 8aa88bb: Fix `@pantoken/pantoken`'s published `model.json` (the cssdoc provider model downstream consumers use)
  to include `@global` utility records (spacing/gap/layout/etc.) — previously `buildCssDocModel()` only
  parsed `generated/components.css`, so consumer projects had no way to resolve `--p-lg`-style global
  modifier classes as documented. Wired `model.json` into `@pantoken/scaffold`'s templated `cssdoc.json`
  as a `providers` entry so scaffolded projects pick this up out of the box.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/icons@0.2.0
  - @pantoken/rehype@0.1.10
  - @pantoken/markdown-it@0.1.10
  - @pantoken/android@0.1.16
  - @pantoken/astro@0.1.17
  - @pantoken/bootstrap@0.1.2
  - @pantoken/compose@0.1.16
  - @pantoken/css@0.3.7
  - @pantoken/css-in-js@0.1.13
  - @pantoken/docusaurus@0.1.2
  - @pantoken/dtcg@0.1.12
  - @pantoken/email@0.1.13
  - @pantoken/figma@0.1.12
  - @pantoken/flutter@0.1.16
  - @pantoken/foundation@0.1.3
  - @pantoken/less@0.1.13
  - @pantoken/mintlify@0.1.13
  - @pantoken/mui@0.1.13
  - @pantoken/next@0.1.2
  - @pantoken/panda@0.1.13
  - @pantoken/plugin-colors@0.1.2
  - @pantoken/plugin-logos@0.3.6
  - @pantoken/plugin-primitives@1.0.1
  - @pantoken/plugin-prune-custom-props@0.1.5
  - @pantoken/plugin-simple-icons@0.3.6
  - @pantoken/plugin-stacking@1.0.3
  - @pantoken/plugin-theme-custom-media@0.2.2
  - @pantoken/plugin-transition@1.0.3
  - @pantoken/plugin-visual-debug@0.1.15
  - @pantoken/postcss@0.1.17
  - @pantoken/react-markdown@0.1.12
  - @pantoken/react-native@0.1.13
  - @pantoken/scss@0.1.13
  - @pantoken/shadcn@0.1.2
  - @pantoken/storybook@0.1.13
  - @pantoken/stylus@0.1.13
  - @pantoken/swatches@0.1.13
  - @pantoken/swift@0.1.16
  - @pantoken/tailwind@0.1.7
  - @pantoken/tokens@0.3.0
  - @pantoken/vanilla@0.1.12
  - @pantoken/vite@0.1.17
  - @pantoken/vitepress@0.2.1
  - @pantoken/webpack@0.1.17
  - @pantoken/wordpress@0.1.12
  - @pantoken/components@1.0.2
  - @pantoken/react@0.1.27
  - @pantoken/vue@0.1.27
  - @pantoken/web-components@0.5.7
  - @pantoken/pendo@0.3.12
  - @pantoken/cli@0.1.25
  - @pantoken/drupal@0.1.23
  - @pantoken/angular@0.1.26
  - @pantoken/svelte@0.1.27

## 0.2.4

### Patch Changes

- efed45f: Update `@pantoken/pantoken` metadata generation to build `dist/model.json` from cssdoc's parser output (`@cssdoc/core` 0.13.6), and keep the published provider-model export stable for downstream `cssdoc` consumers.
- efed45f: Ship a `./cssdoc-base.json` export alongside the generated VS Code custom-data files, so tools that
  integrate with the `cssdoc` ecosystem (e.g. the `cssdoc.cssdoc-vscode` extension) can resolve
  pantoken's base cssdoc schema from the published package.
- efed45f: Emit and publish `model.json` from `@pantoken/pantoken` so downstream `cssdoc` configs can use a stable provider model path (for example `@pantoken/pantoken/model.json`) without depending on source stylesheets.

## 0.2.3

### Patch Changes

- Updated dependencies [343c59d]
- Updated dependencies [343c59d]
  - @pantoken/components@1.0.1
  - @pantoken/astro@0.1.16
  - @pantoken/drupal@0.1.22
  - @pantoken/angular@0.1.25
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.12
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.12
  - @pantoken/pendo@0.3.11
  - @pantoken/react@0.1.26
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.12
  - @pantoken/svelte@0.1.26
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.26
  - @pantoken/web-components@0.5.6
  - @pantoken/cli@0.1.24

## 0.2.2

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/components@1.0.0
  - @pantoken/plugin-primitives@1.0.0
  - @pantoken/drupal@0.1.21
  - @pantoken/angular@0.1.24
  - @pantoken/astro@0.1.16
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.12
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.12
  - @pantoken/pendo@0.3.10
  - @pantoken/react@0.1.25
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.12
  - @pantoken/svelte@0.1.25
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.25
  - @pantoken/web-components@0.5.5
  - @pantoken/panda@0.1.12
  - @pantoken/figma@0.1.11
  - @pantoken/swatches@0.1.12
  - @pantoken/css@0.3.6
  - @pantoken/dtcg@0.1.11
  - @pantoken/icons@0.1.9
  - @pantoken/less@0.1.12
  - @pantoken/scss@0.1.12
  - @pantoken/stylus@0.1.12
  - @pantoken/tokens@0.2.4
  - @pantoken/email@0.1.12
  - @pantoken/vanilla@0.1.11
  - @pantoken/wordpress@0.1.11
  - @pantoken/mintlify@0.1.12
  - @pantoken/react-native@0.1.12
  - @pantoken/cli@0.1.23
  - @pantoken/postcss@0.1.16
  - @pantoken/vite@0.1.16
  - @pantoken/webpack@0.1.16
  - @pantoken/markdown-it@0.1.9
  - @pantoken/react-markdown@0.1.11
  - @pantoken/rehype@0.1.9
  - @pantoken/android@0.1.15
  - @pantoken/compose@0.1.15
  - @pantoken/flutter@0.1.15
  - @pantoken/swift@0.1.15
  - @pantoken/plugin-logos@0.3.5
  - @pantoken/plugin-simple-icons@0.3.5
  - @pantoken/plugin-stacking@1.0.2
  - @pantoken/plugin-transition@1.0.2
  - @pantoken/plugin-visual-debug@0.1.14

## 0.2.1

### Patch Changes

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/components@0.7.1
  - @pantoken/web-components@0.5.4
  - @pantoken/tokens@0.2.4
  - @pantoken/drupal@0.1.20
  - @pantoken/angular@0.1.23
  - @pantoken/astro@0.1.15
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.11
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.11
  - @pantoken/pendo@0.3.9
  - @pantoken/react@0.1.24
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.11
  - @pantoken/svelte@0.1.24
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.24
  - @pantoken/panda@0.1.11
  - @pantoken/tailwind@0.1.6
  - @pantoken/vite@0.1.15
  - @pantoken/swatches@0.1.11
  - @pantoken/css@0.3.5
  - @pantoken/dtcg@0.1.10
  - @pantoken/icons@0.1.8
  - @pantoken/less@0.1.11
  - @pantoken/scss@0.1.11
  - @pantoken/stylus@0.1.11
  - @pantoken/cli@0.1.22
  - @pantoken/android@0.1.14
  - @pantoken/compose@0.1.14
  - @pantoken/email@0.1.11
  - @pantoken/flutter@0.1.14
  - @pantoken/swift@0.1.14
  - @pantoken/vanilla@0.1.10
  - @pantoken/wordpress@0.1.10
  - @pantoken/plugin-primitives@0.1.11
  - @pantoken/plugin-stacking@1.0.1
  - @pantoken/plugin-theme-custom-media@0.2.1
  - @pantoken/mintlify@0.1.11
  - @pantoken/react-native@0.1.11
  - @pantoken/figma@0.1.10
  - @pantoken/postcss@0.1.15
  - @pantoken/webpack@0.1.15
  - @pantoken/markdown-it@0.1.8
  - @pantoken/react-markdown@0.1.10
  - @pantoken/rehype@0.1.8
  - @pantoken/plugin-logos@0.3.4
  - @pantoken/plugin-simple-icons@0.3.4
  - @pantoken/plugin-transition@1.0.1
  - @pantoken/plugin-visual-debug@0.1.13

## 0.2.0

### Minor Changes

- 90ce910: Ship VS Code custom-data artifacts in `@pantoken/pantoken` so downstream consumers can enable
  HTML/CSS authoring hints without a custom extension.

  - Publish `dist/html-custom-data.json` (class and modifier tokens, including `instui-*` utilities).
  - Publish `dist/css-custom-data.json` (the `--instui-*` custom-property catalog).
  - Expose both via package subpath exports:
    - `@pantoken/pantoken/html-custom-data.json`
    - `@pantoken/pantoken/css-custom-data.json`
  - Document consumer setup in the getting-started guide via `html.customData` and `css.customData`.

### Patch Changes

- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
  - @pantoken/components@0.7.0
  - @pantoken/plugin-theme-custom-media@0.2.0
  - @pantoken/plugin-transition@1.0.0
  - @pantoken/plugin-stacking@1.0.0
  - @pantoken/drupal@0.1.19
  - @pantoken/angular@0.1.22
  - @pantoken/astro@0.1.14
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.10
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.10
  - @pantoken/pendo@0.3.8
  - @pantoken/react@0.1.23
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.10
  - @pantoken/svelte@0.1.23
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.23
  - @pantoken/web-components@0.5.3
  - @pantoken/panda@0.1.10
  - @pantoken/figma@0.1.9
  - @pantoken/swatches@0.1.10
  - @pantoken/css@0.3.4
  - @pantoken/dtcg@0.1.9
  - @pantoken/icons@0.1.7
  - @pantoken/less@0.1.10
  - @pantoken/scss@0.1.10
  - @pantoken/stylus@0.1.10
  - @pantoken/email@0.1.10
  - @pantoken/vanilla@0.1.9
  - @pantoken/wordpress@0.1.9
  - @pantoken/plugin-primitives@0.1.10
  - @pantoken/mintlify@0.1.10
  - @pantoken/react-native@0.1.10
  - @pantoken/cli@0.1.21
  - @pantoken/postcss@0.1.14
  - @pantoken/vite@0.1.14
  - @pantoken/webpack@0.1.14
  - @pantoken/markdown-it@0.1.7
  - @pantoken/react-markdown@0.1.9
  - @pantoken/rehype@0.1.7
  - @pantoken/tokens@0.2.3
  - @pantoken/android@0.1.13
  - @pantoken/compose@0.1.13
  - @pantoken/flutter@0.1.13
  - @pantoken/swift@0.1.13
  - @pantoken/plugin-logos@0.3.3
  - @pantoken/plugin-simple-icons@0.3.3
  - @pantoken/plugin-visual-debug@0.1.12

## 0.1.26

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/components@0.6.0
  - @pantoken/panda@0.1.9
  - @pantoken/figma@0.1.8
  - @pantoken/swatches@0.1.9
  - @pantoken/css@0.3.3
  - @pantoken/dtcg@0.1.8
  - @pantoken/icons@0.1.6
  - @pantoken/less@0.1.9
  - @pantoken/scss@0.1.9
  - @pantoken/stylus@0.1.9
  - @pantoken/email@0.1.9
  - @pantoken/vanilla@0.1.8
  - @pantoken/wordpress@0.1.8
  - @pantoken/plugin-primitives@0.1.9
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.9
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mintlify@0.1.9
  - @pantoken/mui@0.1.9
  - @pantoken/pendo@0.3.7
  - @pantoken/react-native@0.1.9
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.9
  - @pantoken/vitepress@0.2.0
  - @pantoken/drupal@0.1.18
  - @pantoken/angular@0.1.21
  - @pantoken/astro@0.1.13
  - @pantoken/react@0.1.22
  - @pantoken/svelte@0.1.22
  - @pantoken/vue@0.1.22
  - @pantoken/web-components@0.5.2
  - @pantoken/cli@0.1.20
  - @pantoken/postcss@0.1.13
  - @pantoken/vite@0.1.13
  - @pantoken/webpack@0.1.13
  - @pantoken/markdown-it@0.1.6
  - @pantoken/react-markdown@0.1.8
  - @pantoken/rehype@0.1.6
  - @pantoken/tokens@0.2.3
  - @pantoken/android@0.1.12
  - @pantoken/compose@0.1.12
  - @pantoken/flutter@0.1.12
  - @pantoken/swift@0.1.12
  - @pantoken/plugin-logos@0.3.2
  - @pantoken/plugin-simple-icons@0.3.2
  - @pantoken/plugin-stacking@0.2.3
  - @pantoken/plugin-transition@0.3.2
  - @pantoken/plugin-visual-debug@0.1.11

## 0.1.25

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/android@0.1.11
  - @pantoken/angular@0.1.20
  - @pantoken/astro@0.1.12
  - @pantoken/cli@0.1.19
  - @pantoken/components@0.5.1
  - @pantoken/compose@0.1.11
  - @pantoken/css@0.3.2
  - @pantoken/css-in-js@0.1.8
  - @pantoken/drupal@0.1.17
  - @pantoken/dtcg@0.1.7
  - @pantoken/email@0.1.8
  - @pantoken/figma@0.1.7
  - @pantoken/flutter@0.1.11
  - @pantoken/icons@0.1.5
  - @pantoken/less@0.1.8
  - @pantoken/markdown-it@0.1.5
  - @pantoken/mintlify@0.1.8
  - @pantoken/mui@0.1.8
  - @pantoken/panda@0.1.8
  - @pantoken/pendo@0.3.6
  - @pantoken/plugin-logos@0.3.1
  - @pantoken/plugin-primitives@0.1.8
  - @pantoken/plugin-simple-icons@0.3.1
  - @pantoken/plugin-stacking@0.2.2
  - @pantoken/plugin-transition@0.3.1
  - @pantoken/plugin-visual-debug@0.1.10
  - @pantoken/postcss@0.1.12
  - @pantoken/react@0.1.21
  - @pantoken/react-markdown@0.1.7
  - @pantoken/react-native@0.1.8
  - @pantoken/rehype@0.1.5
  - @pantoken/scss@0.1.8
  - @pantoken/storybook@0.1.8
  - @pantoken/stylus@0.1.8
  - @pantoken/svelte@0.1.21
  - @pantoken/swatches@0.1.8
  - @pantoken/swift@0.1.11
  - @pantoken/tailwind@0.1.5
  - @pantoken/tokens@0.2.3
  - @pantoken/vanilla@0.1.7
  - @pantoken/vite@0.1.12
  - @pantoken/vue@0.1.21
  - @pantoken/web-components@0.5.1
  - @pantoken/webpack@0.1.12
  - @pantoken/wordpress@0.1.7
  - @pantoken/bootstrap@0.1.1
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/shadcn@0.1.1
  - @pantoken/vitepress@0.2.0

## 0.1.24

### Patch Changes

- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/components@0.5.0
  - @pantoken/plugin-transition@0.3.0
  - @pantoken/web-components@0.5.0
  - @pantoken/plugin-logos@0.3.0
  - @pantoken/drupal@0.1.16
  - @pantoken/angular@0.1.19
  - @pantoken/astro@0.1.11
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.7
  - @pantoken/pendo@0.3.5
  - @pantoken/react@0.1.20
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.20
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.20
  - @pantoken/cli@0.1.18

## 0.1.23

### Patch Changes

- Updated dependencies [d4ba8fe]
- Updated dependencies [d4ba8fe]
  - @pantoken/plugin-transition@0.2.2
  - @pantoken/components@0.4.1
  - @pantoken/cli@0.1.17
  - @pantoken/astro@0.1.11
  - @pantoken/drupal@0.1.15
  - @pantoken/angular@0.1.18
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.7
  - @pantoken/pendo@0.3.4
  - @pantoken/react@0.1.19
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.19
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.19
  - @pantoken/web-components@0.4.2

## 0.1.22

### Patch Changes

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/components@0.4.0
  - @pantoken/web-components@0.4.1
  - @pantoken/css@0.3.1
  - @pantoken/drupal@0.1.14
  - @pantoken/angular@0.1.17
  - @pantoken/astro@0.1.11
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.7
  - @pantoken/pendo@0.3.3
  - @pantoken/react@0.1.18
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.18
  - @pantoken/vitepress@0.2.0
  - @pantoken/vue@0.1.18
  - @pantoken/postcss@0.1.11
  - @pantoken/vite@0.1.11
  - @pantoken/webpack@0.1.11
  - @pantoken/cli@0.1.16

## 0.1.21

### Patch Changes

- Updated dependencies [231680f]
  - @pantoken/css@0.3.0
  - @pantoken/postcss@0.1.10
  - @pantoken/vite@0.1.10
  - @pantoken/webpack@0.1.10
  - @pantoken/drupal@0.1.13
  - @pantoken/astro@0.1.10
  - @pantoken/pendo@0.3.2
  - @pantoken/cli@0.1.15

## 0.1.20

### Patch Changes

- Updated dependencies [ebe77e5]
  - @pantoken/web-components@0.4.0
  - @pantoken/angular@0.1.16
  - @pantoken/react@0.1.17
  - @pantoken/svelte@0.1.17
  - @pantoken/vue@0.1.17

## 0.1.19

### Patch Changes

- Updated dependencies [7879f6b]
  - @pantoken/plugin-simple-icons@0.3.0
  - @pantoken/vitepress@0.2.0
  - @pantoken/components@0.3.0
  - @pantoken/markdown-it@0.1.4
  - @pantoken/react-markdown@0.1.6
  - @pantoken/rehype@0.1.4
  - @pantoken/drupal@0.1.12
  - @pantoken/angular@0.1.15
  - @pantoken/astro@0.1.9
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.2
  - @pantoken/mui@0.1.7
  - @pantoken/pendo@0.3.1
  - @pantoken/react@0.1.16
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.16
  - @pantoken/vue@0.1.16
  - @pantoken/web-components@0.3.2
  - @pantoken/cli@0.1.14

## 0.1.18

### Patch Changes

- Updated dependencies [03a9dc1]
  - @pantoken/web-components@0.3.1
  - @pantoken/angular@0.1.14
  - @pantoken/react@0.1.15
  - @pantoken/svelte@0.1.15
  - @pantoken/vue@0.1.15

## 0.1.17

### Patch Changes

- @pantoken/react@0.1.14
- @pantoken/svelte@0.1.14
- @pantoken/vue@0.1.14

## 0.1.16

### Patch Changes

- Updated dependencies [40987c4]
- Updated dependencies [40987c4]
  - @pantoken/web-components@0.3.0
  - @pantoken/react@0.1.13
  - @pantoken/vue@0.1.13
  - @pantoken/svelte@0.1.13
  - @pantoken/angular@0.1.13

## 0.1.15

### Patch Changes

- Updated dependencies [658021f]
- Updated dependencies [658021f]
- Updated dependencies [658021f]
- Updated dependencies [658021f]
  - @pantoken/components@0.2.9
  - @pantoken/css@0.2.8
  - @pantoken/foundation@0.1.2
  - @pantoken/pendo@0.3.0
  - @pantoken/drupal@0.1.11
  - @pantoken/angular@0.1.12
  - @pantoken/astro@0.1.9
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/mui@0.1.7
  - @pantoken/react@0.1.12
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.12
  - @pantoken/vitepress@0.1.1
  - @pantoken/vue@0.1.12
  - @pantoken/web-components@0.2.10
  - @pantoken/postcss@0.1.9
  - @pantoken/vite@0.1.9
  - @pantoken/webpack@0.1.9
  - @pantoken/cli@0.1.13

## 0.1.14

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

- Updated dependencies [f97aeb6]
- Updated dependencies [f97aeb6]
  - @pantoken/cli@0.1.12
  - @pantoken/plugin-prune-custom-props@0.1.4
  - @pantoken/components@0.2.8
  - @pantoken/pendo@0.2.0
  - @pantoken/plugin-logos@0.2.0
  - @pantoken/tokens@0.2.2
  - @pantoken/android@0.1.10
  - @pantoken/compose@0.1.10
  - @pantoken/flutter@0.1.10
  - @pantoken/swift@0.1.10
  - @pantoken/drupal@0.1.10
  - @pantoken/angular@0.1.11
  - @pantoken/astro@0.1.8
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/mui@0.1.7
  - @pantoken/react@0.1.11
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.11
  - @pantoken/vitepress@0.1.1
  - @pantoken/vue@0.1.11
  - @pantoken/web-components@0.2.9

## 0.1.13

### Patch Changes

- Updated dependencies [2f21a66]
  - @pantoken/plugin-prune-custom-props@0.1.3
  - @pantoken/cli@0.1.11
  - @pantoken/pendo@0.1.10

## 0.1.12

### Patch Changes

- Updated dependencies [2b814bd]
- Updated dependencies [2b814bd]
  - @pantoken/react-markdown@0.1.6
  - @pantoken/css@0.2.7
  - @pantoken/components@0.2.7
  - @pantoken/plugin-logos@0.1.8
  - @pantoken/plugin-simple-icons@0.2.1
  - @pantoken/plugin-stacking@0.2.1
  - @pantoken/plugin-transition@0.2.1
  - @pantoken/plugin-visual-debug@0.1.9
  - @pantoken/postcss@0.1.8
  - @pantoken/vite@0.1.8
  - @pantoken/webpack@0.1.8
  - @pantoken/drupal@0.1.9
  - @pantoken/astro@0.1.8
  - @pantoken/pendo@0.1.9
  - @pantoken/angular@0.1.10
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.7
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/mui@0.1.7
  - @pantoken/react@0.1.10
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.7
  - @pantoken/svelte@0.1.10
  - @pantoken/vitepress@0.1.1
  - @pantoken/vue@0.1.10
  - @pantoken/web-components@0.2.8
  - @pantoken/tokens@0.2.2
  - @pantoken/android@0.1.9
  - @pantoken/compose@0.1.9
  - @pantoken/flutter@0.1.9
  - @pantoken/swift@0.1.9
  - @pantoken/markdown-it@0.1.4
  - @pantoken/rehype@0.1.4
  - @pantoken/cli@0.1.10

## 0.1.11

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/cli@0.1.9
  - @pantoken/plugin-simple-icons@0.2.0
  - @pantoken/plugin-stacking@0.2.0
  - @pantoken/plugin-transition@0.2.0
  - @pantoken/plugin-prune-custom-props@0.1.2
  - @pantoken/plugin-theme-custom-media@0.1.5
  - @pantoken/icons@0.1.4
  - @pantoken/panda@0.1.7
  - @pantoken/tailwind@0.1.4
  - @pantoken/figma@0.1.6
  - @pantoken/swatches@0.1.7
  - @pantoken/css@0.2.6
  - @pantoken/dtcg@0.1.6
  - @pantoken/less@0.1.7
  - @pantoken/scss@0.1.7
  - @pantoken/stylus@0.1.7
  - @pantoken/tokens@0.2.2
  - @pantoken/android@0.1.8
  - @pantoken/compose@0.1.8
  - @pantoken/email@0.1.7
  - @pantoken/flutter@0.1.8
  - @pantoken/swift@0.1.8
  - @pantoken/vanilla@0.1.6
  - @pantoken/wordpress@0.1.6
  - @pantoken/plugin-logos@0.1.7
  - @pantoken/plugin-visual-debug@0.1.8
  - @pantoken/astro@0.1.7
  - @pantoken/css-in-js@0.1.7
  - @pantoken/markdown-it@0.1.4
  - @pantoken/mintlify@0.1.7
  - @pantoken/mui@0.1.7
  - @pantoken/pendo@0.1.8
  - @pantoken/react-markdown@0.1.5
  - @pantoken/react-native@0.1.7
  - @pantoken/rehype@0.1.4
  - @pantoken/storybook@0.1.7
  - @pantoken/web-components@0.2.7
  - @pantoken/components@0.2.6
  - @pantoken/plugin-primitives@0.1.7
  - @pantoken/bootstrap@0.1.1
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/shadcn@0.1.1
  - @pantoken/vitepress@0.1.1
  - @pantoken/postcss@0.1.7
  - @pantoken/vite@0.1.7
  - @pantoken/webpack@0.1.7
  - @pantoken/drupal@0.1.8
  - @pantoken/angular@0.1.9
  - @pantoken/react@0.1.9
  - @pantoken/svelte@0.1.9
  - @pantoken/vue@0.1.9

## 0.1.10

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5
  - @pantoken/mintlify@0.1.6
  - @pantoken/mui@0.1.6
  - @pantoken/panda@0.1.6
  - @pantoken/swatches@0.1.6
  - @pantoken/drupal@0.1.7
  - @pantoken/angular@0.1.8
  - @pantoken/astro@0.1.6
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.6
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/pendo@0.1.7
  - @pantoken/react@0.1.8
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.6
  - @pantoken/svelte@0.1.8
  - @pantoken/vitepress@0.1.1
  - @pantoken/vue@0.1.8
  - @pantoken/web-components@0.2.6
  - @pantoken/cli@0.1.8
  - @pantoken/figma@0.1.5
  - @pantoken/css@0.2.5
  - @pantoken/dtcg@0.1.5
  - @pantoken/less@0.1.6
  - @pantoken/scss@0.1.6
  - @pantoken/stylus@0.1.6
  - @pantoken/email@0.1.6
  - @pantoken/vanilla@0.1.5
  - @pantoken/wordpress@0.1.5
  - @pantoken/plugin-primitives@0.1.6
  - @pantoken/react-native@0.1.6
  - @pantoken/postcss@0.1.6
  - @pantoken/vite@0.1.6
  - @pantoken/webpack@0.1.6
  - @pantoken/tokens@0.2.1
  - @pantoken/android@0.1.7
  - @pantoken/compose@0.1.7
  - @pantoken/flutter@0.1.7
  - @pantoken/swift@0.1.7
  - @pantoken/plugin-logos@0.1.6
  - @pantoken/plugin-simple-icons@0.1.5
  - @pantoken/plugin-stacking@0.1.7
  - @pantoken/plugin-transition@0.1.6
  - @pantoken/plugin-visual-debug@0.1.7
  - @pantoken/markdown-it@0.1.3
  - @pantoken/react-markdown@0.1.4
  - @pantoken/rehype@0.1.3

## 0.1.9

### Patch Changes

- 2e5bb88: Fix CI failures and resolve CodeQL security findings: add missing @eslint/css dependency; fix file-system-race (TOCTOU) in typedoc-plugin-demo (atomic writes, no existsSync guard), typedoc-plugin-live-example (Dirent-based readdir), and upstream-diff (try/catch instead of existsSync); fix polynomial-redos in utils, drupal, dtcg, figma, core, and react-markdown; fix prototype pollution in dtcg; add top-level permissions: read-all to release and copilot-setup-steps workflows; mark test files as fallow entry points.
- Updated dependencies [2e5bb88]
- Updated dependencies [2e5bb88]
- Updated dependencies [2e5bb88]
- Updated dependencies [2e5bb88]
  - @pantoken/drupal@0.1.6
  - @pantoken/dtcg@0.1.4
  - @pantoken/figma@0.1.4
  - @pantoken/react-markdown@0.1.4
  - @pantoken/tokens@0.2.1
  - @pantoken/android@0.1.6
  - @pantoken/compose@0.1.6
  - @pantoken/flutter@0.1.6
  - @pantoken/swift@0.1.6
  - @pantoken/cli@0.1.7
  - @pantoken/panda@0.1.5
  - @pantoken/swatches@0.1.5
  - @pantoken/components@0.2.4
  - @pantoken/css@0.2.4
  - @pantoken/less@0.1.5
  - @pantoken/scss@0.1.5
  - @pantoken/stylus@0.1.5
  - @pantoken/email@0.1.5
  - @pantoken/vanilla@0.1.4
  - @pantoken/wordpress@0.1.4
  - @pantoken/plugin-primitives@0.1.5
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.5
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/mintlify@0.1.5
  - @pantoken/mui@0.1.5
  - @pantoken/pendo@0.1.6
  - @pantoken/react-native@0.1.5
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.5
  - @pantoken/vitepress@0.1.1
  - @pantoken/angular@0.1.7
  - @pantoken/astro@0.1.5
  - @pantoken/react@0.1.7
  - @pantoken/svelte@0.1.7
  - @pantoken/vue@0.1.7
  - @pantoken/web-components@0.2.5
  - @pantoken/postcss@0.1.5
  - @pantoken/vite@0.1.5
  - @pantoken/webpack@0.1.5
  - @pantoken/plugin-logos@0.1.5
  - @pantoken/plugin-simple-icons@0.1.4
  - @pantoken/plugin-stacking@0.1.6
  - @pantoken/plugin-transition@0.1.5
  - @pantoken/plugin-visual-debug@0.1.6
  - @pantoken/markdown-it@0.1.3
  - @pantoken/rehype@0.1.3

## 0.1.8

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
  - @pantoken/cli@0.1.6
  - @pantoken/plugin-theme-custom-media@0.1.4
  - @pantoken/plugin-visual-debug@0.1.5
  - @pantoken/react-markdown@0.1.3
  - @pantoken/css-in-js@0.1.4
  - @pantoken/components@0.2.3
  - @pantoken/storybook@0.1.4
  - @pantoken/angular@0.1.6
  - @pantoken/postcss@0.1.4
  - @pantoken/svelte@0.1.6
  - @pantoken/astro@0.1.4
  - @pantoken/react@0.1.6
  - @pantoken/pendo@0.1.5
  - @pantoken/mui@0.1.4
  - @pantoken/vue@0.1.6
  - @pantoken/web-components@0.2.4
  - @pantoken/tokens@0.2.1
  - @pantoken/drupal@0.1.5
  - @pantoken/bootstrap@0.1.1
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/shadcn@0.1.1
  - @pantoken/vitepress@0.1.1
  - @pantoken/android@0.1.5
  - @pantoken/compose@0.1.5
  - @pantoken/flutter@0.1.5
  - @pantoken/swift@0.1.5
  - @pantoken/panda@0.1.4
  - @pantoken/tailwind@0.1.3
  - @pantoken/vite@0.1.4
  - @pantoken/swatches@0.1.4
  - @pantoken/css@0.2.3
  - @pantoken/dtcg@0.1.3
  - @pantoken/icons@0.1.3
  - @pantoken/less@0.1.4
  - @pantoken/scss@0.1.4
  - @pantoken/stylus@0.1.4
  - @pantoken/email@0.1.4
  - @pantoken/vanilla@0.1.3
  - @pantoken/wordpress@0.1.3
  - @pantoken/plugin-primitives@0.1.4
  - @pantoken/plugin-stacking@0.1.5
  - @pantoken/mintlify@0.1.4
  - @pantoken/react-native@0.1.4
  - @pantoken/webpack@0.1.4
  - @pantoken/markdown-it@0.1.3
  - @pantoken/rehype@0.1.3

## 0.1.7

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/panda@0.1.3
  - @pantoken/tailwind@0.1.2
  - @pantoken/vite@0.1.3
  - @pantoken/swatches@0.1.3
  - @pantoken/components@0.2.2
  - @pantoken/css@0.2.2
  - @pantoken/dtcg@0.1.3
  - @pantoken/icons@0.1.2
  - @pantoken/less@0.1.3
  - @pantoken/scss@0.1.3
  - @pantoken/stylus@0.1.3
  - @pantoken/cli@0.1.5
  - @pantoken/android@0.1.4
  - @pantoken/compose@0.1.4
  - @pantoken/email@0.1.3
  - @pantoken/flutter@0.1.4
  - @pantoken/swift@0.1.4
  - @pantoken/vanilla@0.1.3
  - @pantoken/wordpress@0.1.3
  - @pantoken/plugin-primitives@0.1.4
  - @pantoken/plugin-stacking@0.1.4
  - @pantoken/astro@0.1.3
  - @pantoken/bootstrap@0.1.1
  - @pantoken/css-in-js@0.1.3
  - @pantoken/docusaurus@0.1.1
  - @pantoken/foundation@0.1.1
  - @pantoken/mintlify@0.1.3
  - @pantoken/mui@0.1.3
  - @pantoken/pendo@0.1.4
  - @pantoken/react-native@0.1.3
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.3
  - @pantoken/vitepress@0.1.1
  - @pantoken/figma@0.1.3
  - @pantoken/plugin-logos@0.1.4
  - @pantoken/plugin-simple-icons@0.1.3
  - @pantoken/plugin-transition@0.1.4
  - @pantoken/plugin-visual-debug@0.1.4
  - @pantoken/markdown-it@0.1.2
  - @pantoken/react-markdown@0.1.2
  - @pantoken/rehype@0.1.2
  - @pantoken/web-components@0.2.3
  - @pantoken/postcss@0.1.3
  - @pantoken/webpack@0.1.3
  - @pantoken/drupal@0.1.4
  - @pantoken/angular@0.1.5
  - @pantoken/react@0.1.5
  - @pantoken/svelte@0.1.5
  - @pantoken/vue@0.1.5

## 0.1.6

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/android@0.1.3
  - @pantoken/angular@0.1.4
  - @pantoken/astro@0.1.2
  - @pantoken/bootstrap@0.1.1
  - @pantoken/cli@0.1.4
  - @pantoken/components@0.2.1
  - @pantoken/compose@0.1.3
  - @pantoken/css@0.2.1
  - @pantoken/css-in-js@0.1.2
  - @pantoken/docusaurus@0.1.1
  - @pantoken/drupal@0.1.3
  - @pantoken/dtcg@0.1.2
  - @pantoken/email@0.1.2
  - @pantoken/figma@0.1.2
  - @pantoken/flutter@0.1.3
  - @pantoken/foundation@0.1.1
  - @pantoken/icons@0.1.1
  - @pantoken/less@0.1.2
  - @pantoken/markdown-it@0.1.1
  - @pantoken/mintlify@0.1.2
  - @pantoken/mui@0.1.2
  - @pantoken/next@0.1.1
  - @pantoken/panda@0.1.2
  - @pantoken/pendo@0.1.3
  - @pantoken/plugin-colors@0.1.1
  - @pantoken/plugin-logos@0.1.3
  - @pantoken/plugin-primitives@0.1.3
  - @pantoken/plugin-prune-custom-props@0.1.1
  - @pantoken/plugin-simple-icons@0.1.2
  - @pantoken/plugin-stacking@0.1.3
  - @pantoken/plugin-theme-custom-media@0.1.3
  - @pantoken/plugin-transition@0.1.3
  - @pantoken/plugin-visual-debug@0.1.3
  - @pantoken/postcss@0.1.2
  - @pantoken/react@0.1.4
  - @pantoken/react-markdown@0.1.1
  - @pantoken/react-native@0.1.2
  - @pantoken/rehype@0.1.1
  - @pantoken/scss@0.1.2
  - @pantoken/shadcn@0.1.1
  - @pantoken/storybook@0.1.2
  - @pantoken/stylus@0.1.2
  - @pantoken/svelte@0.1.4
  - @pantoken/swatches@0.1.2
  - @pantoken/swift@0.1.3
  - @pantoken/tailwind@0.1.1
  - @pantoken/tokens@0.1.1
  - @pantoken/vanilla@0.1.2
  - @pantoken/vite@0.1.2
  - @pantoken/vitepress@0.1.1
  - @pantoken/vue@0.1.4
  - @pantoken/web-components@0.2.2
  - @pantoken/webpack@0.1.2
  - @pantoken/wordpress@0.1.2

## 0.1.5

### Patch Changes

- Updated dependencies [9ecba6c]
  - @pantoken/web-components@0.2.1
  - @pantoken/angular@0.1.3
  - @pantoken/react@0.1.3
  - @pantoken/svelte@0.1.3
  - @pantoken/vue@0.1.3

## 0.1.4

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/css@0.2.0
  - @pantoken/components@0.2.0
  - @pantoken/web-components@0.2.0
  - @pantoken/panda@0.1.1
  - @pantoken/figma@0.1.1
  - @pantoken/swatches@0.1.1
  - @pantoken/dtcg@0.1.1
  - @pantoken/less@0.1.1
  - @pantoken/scss@0.1.1
  - @pantoken/stylus@0.1.1
  - @pantoken/email@0.1.1
  - @pantoken/vanilla@0.1.1
  - @pantoken/wordpress@0.1.1
  - @pantoken/plugin-primitives@0.1.2
  - @pantoken/bootstrap@0.1.0
  - @pantoken/css-in-js@0.1.1
  - @pantoken/docusaurus@0.1.0
  - @pantoken/foundation@0.1.0
  - @pantoken/mintlify@0.1.1
  - @pantoken/mui@0.1.1
  - @pantoken/pendo@0.1.2
  - @pantoken/react-native@0.1.1
  - @pantoken/shadcn@0.1.0
  - @pantoken/storybook@0.1.1
  - @pantoken/vitepress@0.1.0
  - @pantoken/postcss@0.1.1
  - @pantoken/vite@0.1.1
  - @pantoken/webpack@0.1.1
  - @pantoken/drupal@0.1.2
  - @pantoken/astro@0.1.1
  - @pantoken/angular@0.1.2
  - @pantoken/react@0.1.2
  - @pantoken/svelte@0.1.2
  - @pantoken/vue@0.1.2
  - @pantoken/cli@0.1.3
  - @pantoken/tokens@0.1.0
  - @pantoken/android@0.1.2
  - @pantoken/compose@0.1.2
  - @pantoken/flutter@0.1.2
  - @pantoken/swift@0.1.2
  - @pantoken/plugin-logos@0.1.2
  - @pantoken/plugin-simple-icons@0.1.1
  - @pantoken/plugin-stacking@0.1.2
  - @pantoken/plugin-transition@0.1.2
  - @pantoken/plugin-visual-debug@0.1.2
  - @pantoken/markdown-it@0.1.0
  - @pantoken/react-markdown@0.1.0
  - @pantoken/rehype@0.1.0

## 0.1.3

### Changed

- Updated internal workspace dependencies:
  - @pantoken/angular: 0.1.0 -> 0.1.1
  - @pantoken/cli: 0.1.1 -> 0.1.2
  - @pantoken/components: 0.1.0 -> 0.1.1
  - @pantoken/drupal: 0.1.0 -> 0.1.1
  - @pantoken/pendo: 0.1.0 -> 0.1.1
  - @pantoken/plugin-logos: 0.1.0 -> 0.1.1
  - @pantoken/plugin-primitives: 0.1.0 -> 0.1.1
  - @pantoken/plugin-stacking: 0.1.0 -> 0.1.1
  - @pantoken/plugin-transition: 0.1.0 -> 0.1.1
  - @pantoken/plugin-visual-debug: 0.1.0 -> 0.1.1
  - @pantoken/react: 0.1.0 -> 0.1.1
  - @pantoken/svelte: 0.1.0 -> 0.1.1
  - @pantoken/vue: 0.1.0 -> 0.1.1
  - @pantoken/web-components: 0.1.0 -> 0.1.1

## 0.1.2

### Changed

- Updated internal workspace dependency versions.

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/plugin-theme-custom-media: 0.1.1 -> 0.1.2

## 0.1.0

### Added

- Initial release of @pantoken/pantoken.
