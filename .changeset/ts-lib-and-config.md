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

TypeScript configuration modernization: update lib to ES2026 and enable future-forward compiler options

- Updated `tsconfig.base.json` lib from ES2023 to ES2026 to enable TypeScript 7.1's support for the latest ECMAScript features
- Added `useDefineForClassFields: true` for explicit class field semantics alignment with ES2022 standards
- Added `noImplicitOverride: true` to enforce explicit override modifiers in class hierarchies for improved safety
- Fixed override modifiers in `renderers/web-components` to comply with new noImplicitOverride setting
