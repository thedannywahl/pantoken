---
"@pantoken/components": patch
"@pantoken/interactions": patch
"@pantoken/web-components": patch
---

Add a new `drawer-layout` CSS component with `tray`, `handle`, and `content` members in `@pantoken/components`.

Extract DrawerLayout command and responsive-overlay wiring into a shared `initResponsiveOverlay()` behavior in `@pantoken/interactions` (named for the interaction it provides, not the component), and wire both the interactions entry point and the web component to import it.

Update interactions capability metadata so `drawer-layout` is marked as `both` (CSS + JS).
