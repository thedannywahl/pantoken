---
"@pantoken/vitepress-sidebar-toggle": minor
---

Add `@pantoken/vitepress-sidebar-toggle`: a standalone VitePress plugin that adds a persistent
show/hide toggle for the whole sidebar (not per-group collapse), expanding page content to full
width when hidden. State persists across navigation and reload via `localStorage`, restored by a
blocking pre-hydration script so there's no flash of the wrong state. The toggle reuses VitePress's
own built-in `vpi-chevron-*` icon classes and follows VitePress's own `themeConfig.*Label`
convention for localization. No dependency on any other `@pantoken/*` package.
