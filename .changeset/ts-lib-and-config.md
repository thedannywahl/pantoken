---
"@pantoken/ai": patch
"@pantoken/android": patch
"@pantoken/angular": patch
"@pantoken/astro": patch
"@pantoken/bootstrap": patch
"@pantoken/canvas-theme-editor": patch
"@pantoken/cli": patch
"@pantoken/components": patch
"@pantoken/compose": patch
"@pantoken/core": patch
"@pantoken/docs": patch
"@pantoken/icon-font": patch
"@pantoken/icons": patch
"@pantoken/interactions": patch
"@pantoken/model": patch
"@pantoken/next": patch
"@pantoken/panda": patch
"@pantoken/scaffold": patch
"@pantoken/svelte": patch
"@pantoken/tailwind": patch
"@pantoken/tailwind-with-postcss": patch
"@pantoken/tailwind-with-rework": patch
"@pantoken/tokens": patch
"@pantoken/typescript-plugin": patch
"@pantoken/utils": patch
"@pantoken/vite": patch
"@pantoken/vitepress-sidebar-toggle": patch
"@pantoken/vue": patch
"@pantoken/web-components": patch
"create-pantoken-app": patch
"pantoken": patch
---

TypeScript configuration modernization: update lib to ES2026 and enable future-forward compiler options

- Updated `tsconfig.base.json` lib from ES2023 to ES2026 to enable TypeScript 7.1's support for the latest ECMAScript features
- Added `useDefineForClassFields: true` for explicit class field semantics alignment with ES2022 standards
- Added `noImplicitOverride: true` to enforce explicit override modifiers in class hierarchies for improved safety
- Fixed override modifiers in `renderers/web-components` to comply with new noImplicitOverride setting
