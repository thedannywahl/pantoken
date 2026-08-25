---
"@pantoken/scaffold": minor
"@pantoken/scaffold-base": patch
"@pantoken/components": patch
"@pantoken/react": patch
"@pantoken/vue": patch
"@pantoken/web-components": patch
---

Add preset ledger infrastructure and platform presets for scaffold migration to Bingo.

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
