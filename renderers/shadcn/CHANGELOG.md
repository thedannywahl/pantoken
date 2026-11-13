# CHANGELOG

## 0.4.0

### Minor Changes

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

## 0.3.0

### Minor Changes

- 962c640: Verify Tailwind 4.3.3 compiles a primary utility through the generated shadcn CSS theme aliases, and monitor future Tailwind releases for review.

## 0.2.0

### Minor Changes

- 9ba476b: Cover shadcn's chart and sidebar theme variables with verified InstUI tokens, and add a separate
  Tailwind v4 stylesheet with `@theme inline` color aliases and the derived radius scale. Document the
  bridge, Tailwind version boundary, and optional prose stylesheet.

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

- Initial release of @pantoken/shadcn.
