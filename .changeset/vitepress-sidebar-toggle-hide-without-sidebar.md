---
"@pantoken/vitepress-sidebar-toggle": patch
---

Fix `SidebarToggle.vue` rendering its button even on layouts without a sidebar (e.g. `layout: home`
or `sidebar: false` frontmatter). It now uses VitePress's own `useLayout().hasSidebar` to render
and mount only when a sidebar is actually present.
