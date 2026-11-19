---
"@pantoken/cli": patch
"@pantoken/components": patch
"@pantoken/i18n-engine": patch
"@pantoken/inline-styles": patch
"@pantoken/interactions": patch
"@pantoken/plugin-kit": patch
"@pantoken/scaffold": patch
"@pantoken/translation-adapters": patch
"@pantoken/web-components": patch
---

refactor(tsconfig): align all packages to es2026 with dom support

Remove redundant target/lib overrides that were constraining packages to older ES versions (es2023, es2022, es2020). All browser-facing packages now explicitly declare es2026 + dom + dom.iterable, ensuring consistent modern JavaScript support across the workspace and enabling future adoption of ES2026 features.

Packages with package-level tsconfig.json files now cleanly inherit target from base while explicitly setting lib to include both es2026 and DOM types as needed.
