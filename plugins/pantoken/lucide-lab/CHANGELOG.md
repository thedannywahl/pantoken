# @pantoken/plugin-lucide-lab

## 0.4.7

### Patch Changes

- 2784dba: @pantoken/drupal: verified 10.6.18, 10.6.21, 11.3.2, 11.4.12; support starts at 10.6.18.

  @pantoken/markdown-it: verified 14.0.0, 14.1.1, 14.2.0, 14.3.2, 14.3.3, 15.0.2, 15.0.3; support starts at 14.0.0.

  @pantoken/mui: verified 7.0.0, 7.3.11, 9.0.0, 9.4.0, 9.5.0; support starts at 7.0.0.

  @pantoken/panda: verified 1.12.1, 1.12.2, 2.0.0, 2.1.1, 2.2.0, 2.5.0; support starts at 1.12.1.

  @pantoken/postcss: verified 8.0.0, 8.0.9, 8.1.14, 8.2.15, 8.3.11, 8.4.49, 8.5.28, 8.5.29, 8.5.32; support starts at 8.0.0.

  @pantoken/react-markdown: verified 9.1.0, 10.1.0; support starts at 9.1.0.

  @pantoken/react: verified 19.3.0, 19.3.1; support starts at 19.3.0.

  @pantoken/shadcn: verified 4.3.3, 4.3.5; support starts at 4.3.3.

  @pantoken/storybook: verified 8.6.14, 8.6.19; support starts at 8.6.14.

  @pantoken/svelte: verified 4.2.20, 5.57.1, 5.57.2, 5.57.3; support starts at 4.2.20.

  @pantoken/tailwind: verified 4.0.17, 4.1.18, 4.2.4, 4.3.3, 4.3.5; support starts at 4.0.17.

  @pantoken/vue: verified 3.0.0, 3.5.43, 3.5.45; support starts at 3.0.0.

  @pantoken/webpack: verified 5.61.0, 5.76.0, 5.90.0, 5.111.1, 5.112.2; support starts at 5.61.0.

  @pantoken/wordpress: verified 6.6, 6.7, 6.8, 6.9, 6.9.11, 7.0, 7.1.2, 7.1.3, 7.1.4; support starts at 6.6.

  Update @codemirror/autocomplete to ^6.20.3.

  Update @codemirror/view to ^6.43.14.

  Update @codspeed/vitest-plugin to ^6.0.1.

  Update @commitlint/cli to ^21.2.3.

  Update @commitlint/config-conventional to ^21.2.3.

  Update @lucide/lab to ^0.12.0.

  Update @shikijs/langs to ^4.5.0.

  Update @shikijs/themes to ^4.5.0.

  Update @shikijs/types to ^4.5.0.

  Update @types/node to ^26.6.5.

  Update @vscode/vsce to ^4.0.0.

  Update @vue/server-renderer to ^3.5.44.

  Update CodSpeedHQ/action to v5.6.3.

  Update actions/setup-node to v7.

  Update actions/upload-artifact to v7.

  Update arkregex to ^0.0.14.

  Update commander to ^15.0.0.

  Update core-js to ^3.50.0.

  Update fallow to ^3.33.1.

  Update github/codeql-action to v4.39.3.

  Update happy-dom to ^21.0.0.

  Update juice to ^12.2.0.

  Update lucide to ^1.57.0.

  Update markdown-it to >=14.0.0 <=15.0.3.

  Update markdown-it to ^15.0.2.

  Update markdownlint-cli2 to ^0.24.0.

  Update mermaid to ^12.0.0.

  Update node to 26.

  Update ossf/scorecard-action to v2.5.0.

  Update oxc-minify to ^0.157.0.

  Update pnpm/setup to v3.1.2.

  Update postcss to >=8.0.0 <=8.5.32.

  Update postcss to ^8.5.30.

  Update renovatebot/github-action to v46.3.12.

  Update sass to ^1.105.1.

  Update shiki to ^4.5.0.

  Update simple-icons to ^16.35.0.

  Update snyk to ^1.1308.1.

  Update style-dictionary to ^5.6.1.

  Update stylelint to ^18.0.0.

  Update tailwindcss to >=4.0.17 <=4.3.5.

  Update tinybench to ^6.2.2.

  Update tinymce to ^8.10.0.

  Update tinymce-i18n to 26.11.2.

  Update typedoc-plugin-markdown to ^4.14.0.

  Update unist-util-visit to ^5.1.0.

  Update voidzero-dev/setup-vp to v1.22.0.

  Update vscode-languageclient to ^11.0.0.

  Update vscode-languageserver to ^11.0.0.

  Update vue to ^3.5.44.

  Update webpack-sources to ^3.6.0.

- @pantoken/plugin-kit@0.3.9

## 0.4.6

### Patch Changes

- @pantoken/plugin-kit@0.3.8

## 0.4.5

### Patch Changes

- Updated dependencies [82a255a]
  - @pantoken/model@0.6.0
  - @pantoken/plugin-kit@0.3.7

## 0.4.4

### Patch Changes

- @pantoken/plugin-kit@0.3.6

## 0.4.3

### Patch Changes

- @pantoken/plugin-kit@0.3.5

## 0.4.2

### Patch Changes

- @pantoken/plugin-kit@0.3.4

## 0.4.1

### Patch Changes

- Updated dependencies [626ffc1]
  - @pantoken/model@0.5.0
  - @pantoken/plugin-kit@0.3.3

## 0.4.0

### Minor Changes

- f475012: Add a plugin that exposes Lucide Lab icons as pantoken image tokens.
- f475012: TinyMCE's icons picker now also offers Lucide Lab glyphs and pantoken's vendored custom icons,
  alongside Instructure UI and Simple Icons — each in its own picker tab. Fixed the picker's icon-CSS
  bundle, which was loading the lean `component-icons.css` (only the handful of icons the component
  sheets reference) instead of the full glyph set, causing most Instructure UI icons to render as
  unmasked, filled squares. `@pantoken/plugin-lucide-lab` now publishes `manifest.json` (the sorted
  list of icon names), matching `@pantoken/plugin-simple-icons`. TinyMCE's own toolbar, menu, dialog,
  and status icons now use an InstUI/Pantoken/Lucide icon pack instead of TinyMCE's stock glyphs.

### Patch Changes

- f475012: Fix InstUI/Lucide icons losing to same-named simple-icons or Lucide Lab glyphs (e.g. the `x` close
  icon vs. the X/Twitter brand logo). `@pantoken/plugin-simple-icons` and `@pantoken/plugin-lucide-lab`
  now skip (and warn on) a slug/name that already exists in the token IR instead of overwriting it, and
  `buildIconResolverChain` now tries the built-in icon set before plugin `rehype` resolvers so a
  colliding `:code:` resolves to the built-in icon.
- @pantoken/plugin-kit@0.3.2
