---
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

chore: add commander, @clack/prompts, @bomb.sh/tab, and @pantoken/translation-adapters to catalog

Adds dependencies for the scaffold CLI rebuild (Phase 0):

- commander@^15.0.0 and @commander-js/extra-typings@^15.0.0 for CLI framework
- @clack/prompts@^1.7.0 for interactive terminal UI
- @bomb.sh/tab@^0.0.22 for shell completions
- @pantoken/translation-adapters as devDependency for i18n script helpers

Updates package.json files and vite.config.ts to prepare for CLI exports.
