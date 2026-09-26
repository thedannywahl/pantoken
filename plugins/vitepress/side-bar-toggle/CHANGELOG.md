# @pantoken/vitepress-sidebar-toggle

## 0.2.0

### Minor Changes

- f475012: Add `@pantoken/vitepress-sidebar-toggle`: a standalone VitePress plugin that adds a persistent
  show/hide toggle for the whole sidebar (not per-group collapse), expanding page content to full
  width when hidden. State persists across navigation and reload via `localStorage`, restored by a
  blocking pre-hydration script so there's no flash of the wrong state. The toggle reuses VitePress's
  own built-in `vpi-chevron-*` icon classes and follows VitePress's own `themeConfig.*Label`
  convention for localization. No dependency on any other `@pantoken/*` package.
- f475012: Synchronize the persistent sidebar state with VitePress's narrow-viewport menu, and only show the
  standalone toggle once that built-in menu is hidden. Add navbar `placement` and custom show/hide icon
  class options to `sidebarToggleHead()`, with automatic RTL icon mirroring.

### Patch Changes

- f475012: Fix `SidebarToggle.vue`'s `defineProps<T>()` to use an inline type literal instead of importing
  `SidebarToggleOptions` from a sibling module. `@vue/compiler-sfc`'s macro-time type resolver can't
  reliably follow a raw SFC's cross-file type imports once it's shipped as source inside a consumer's
  `node_modules` (surfaced as `[@vue/compiler-sfc] Failed to resolve import source "./inline-script.ts"`
  in a consuming site's dev server, not in this package's own checks/tests).
- f475012: Fix `SidebarToggle.vue`'s build output: ship `inline-script.ts` and `useSidebarVisibility.ts`
  alongside the copied SFC so its relative imports resolve when a consumer's Vue/Vite toolchain
  compiles it from `dist/`.
- f475012: Fix `SidebarToggle.vue` rendering its button even on layouts without a sidebar (e.g. `layout: home`
  or `sidebar: false` frontmatter). It now uses VitePress's own `useLayout().hasSidebar` to render
  and mount only when a sidebar is actually present.
