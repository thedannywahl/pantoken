---
"@pantoken/docs": patch
---

Add a sidebar show/hide toggle to the nav bar, powered by the new `@pantoken/vitepress-sidebar-toggle`
plugin. Hiding the sidebar gives page content the full width; the toggle's state persists across
navigation and reload. The label is translated through the existing `docs.chrome` catalog like every
other VitePress chrome string.
