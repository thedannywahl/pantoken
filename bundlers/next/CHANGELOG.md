# CHANGELOG

## 0.3.0

### Minor Changes

- 264e15b: @pantoken/next: verified 16.0.0, 16.3.7, 16.3.8, 16.4.0, 16.4.6; support starts at 16.0.0.

  Update @angular/compiler to 22.2.5.

  Update @clack/prompts to ^1.8.1.

  Update @codemirror/autocomplete to ^6.20.3.

  Update @codemirror/view to ^6.43.14.

  Update @codspeed/vitest-plugin to ^6.0.1.

  Update @commitlint/cli to ^21.2.3.

  Update @commitlint/config-conventional to ^21.2.3.

  Update @shikijs/langs to ^4.5.0.

  Update @shikijs/themes to ^4.5.0.

  Update @shikijs/types to ^4.5.0.

  Update @types/node to ^26.6.5.

  Update @vue/server-renderer to ^3.5.44.

  Update commander to ^15.0.0.

  Update core-js to ^3.50.0.

  Update fallow to ^3.33.1.

  Update juice to ^12.2.0.

  Update lucide to ^1.57.0.

  Update markdown-it to ^15.0.2.

  Update oxc-minify to ^0.158.0.

  Update postcss to ^8.5.30.

  Update renovatebot/github-action to v46.3.13.

  Update sass to ^1.105.1.

  Update shiki to ^4.5.0.

  Update simple-icons to ^16.35.0.

  Update snyk to ^1.1308.1.

  Update style-dictionary to ^5.6.1.

  Update tinybench to ^6.2.2.

  Update tinymce to ^8.10.0.

  Update typedoc-plugin-markdown to ^4.14.0.

  Update unist-util-visit to ^5.1.0.

  Update vue to ^3.5.44.

  Update webpack-sources to ^3.6.0.

## 0.2.2

### Patch Changes

- c91395a: Upgrade InstUI to 11.7.10 and bless the unchanged token/icon content with updated ui-icons provenance. Promote Card to `@pantoken/components` with the official `base`/`nested` variants and container-width sizing, while retaining the custom-components CSS and `cardRules` APIs as deprecated aliases. Keep Card's existing localized API pages and translations, migrating their stylesheet imports without retranslation; mark locale-specific identical API prose as verbatim to avoid repeat translation attempts. Update scaffold guidance and the Next compatibility record.
- c91395a: Verify Next.js 16.4.0 production build and Instructure UI rendering compatibility.

## 0.2.1

### Patch Changes

- ba4f28b: Update the recorded InstUI source to 11.7.8 and verify the Next.js adapter against the new release. Refresh the upstream baseline for Lucide 1.52.0, including 12 added icons and updated nut, nut-off, and wifi-cog glyphs. InstUI token and icon content is unchanged.

## 0.2.0

### Minor Changes

- 962c640: Verify Next 16.0.0 and 16.3.7 production builds that transpile and statically render Instructure UI 11.7.7 with React 19.3.0. Monitor Next releases for review.

## 0.1.3

### Patch Changes

- 7d964ee: Update the `homepage` field to `https://pantoken.app` across all package manifests.

## 0.1.2

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/next.
