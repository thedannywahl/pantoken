# @pantoken/scaffold-base

## 0.2.0

### Minor Changes

- 8aa88bb: Introduce `@pantoken/scaffold-base` — the shared `bingo-stratum` Base every pantoken scaffold
  platform Preset is built from: a common `name` option, the shared `cssdoc.json` Block, and
  `getWrapperContext()` (markup derived from `@pantoken/plugin-layouts`'s `wrapper` layout for
  platform presets to feed into their own Handlebars context). Part of the migration of
  `@pantoken/scaffold` onto [Bingo](https://github.com/bingo-js/bingo); not meant to be used
  standalone.

  Template sources use `.jsonc` for internal authoring (supports comments), while generated output
  remains strict `.json` for scaffolded projects.

### Patch Changes

- 8aa88bb: Add preset ledger infrastructure and platform presets for scaffold migration to Bingo.

  **Scaffold-Base Package (`@pantoken/scaffold-base`):**

  - Switch template source to `.jsonc` for comment support
  - Generate static `cssdoc.ts` at build time, template remains as source

  **Scaffold Presets:**

  - Create platform presets in `@pantoken/components`, `@pantoken/react`, `@pantoken/vue`, `@pantoken/web-components`
  - Each platform exports `./scaffold-preset` entry point with Bingo-compatible preset definition
  - Presets extend shared scaffold-base with common options (name, cssdoc block, wrapper context)

  **Scaffold Package (`@pantoken/scaffold`):**

  - Introduce `scan-presets.ts` script that discovers all packages exporting `./scaffold-preset`
  - Generate static `preset-ledger.ts` registry at pre-build time, used by CLI to validate platforms
  - Wire preset scanning into scaffold build/test/check pipeline
  - Update `scaffoldProject` function to async, validates platform is in PRESET_LEDGER
  - Update CLI to handle async scaffolding with proper error handling
  - Update scaffold/generate.ts to read cssdoc template from scaffold-base with JSONC parsing (strips comments for output)

  **Key Features:**

  - Decentralized preset ownership: each platform package maintains its own preset definition
  - Static ledger generation enables type-safe platform discovery at runtime
  - JSONC source templates with comments for documentation
  - Foundation for future Bingo template rendering integration (presets are now validated and available)

- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/plugin-layouts@0.2.0
