---
"@pantoken/vitepress-sidebar-toggle": patch
---

Fix `SidebarToggle.vue`'s build output: ship `inline-script.ts` and `useSidebarVisibility.ts`
alongside the copied SFC so its relative imports resolve when a consumer's Vue/Vite toolchain
compiles it from `dist/`.
