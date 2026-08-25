---
"@pantoken/scaffold": minor
"@pantoken/scaffold-base": patch
"@pantoken/components": patch
"@pantoken/react": patch
"@pantoken/vue": patch
"@pantoken/web-components": patch
---

Add scaffold presets for all major platforms.

- Create preset exports in components, react, vue, and web-components
- Update scaffold/generate.ts to read cssdoc template from scaffold-base with JSONC parsing
- Add JSONC comment stripping in generate script for proper JSON output
- Restore comments to scaffold-base cssdoc.jsonc template
- Preset ledger scanner now discovers 4 platforms at build time
- Each package can independently export its preset via `./scaffold-preset` entry point
