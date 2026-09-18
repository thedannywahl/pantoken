---
"@pantoken/vitepress-sidebar-toggle": patch
---

Fix `SidebarToggle.vue`'s `defineProps<T>()` to use an inline type literal instead of importing
`SidebarToggleOptions` from a sibling module. `@vue/compiler-sfc`'s macro-time type resolver can't
reliably follow a raw SFC's cross-file type imports once it's shipped as source inside a consumer's
`node_modules` (surfaced as `[@vue/compiler-sfc] Failed to resolve import source "./inline-script.ts"`
in a consuming site's dev server, not in this package's own checks/tests).
