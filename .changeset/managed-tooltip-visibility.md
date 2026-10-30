---
"@pantoken/components": patch
"@pantoken/interactions": patch
"@pantoken/web-components": patch
---

Make initialized tooltip visibility follow the shared interaction behavior so Escape dismissal and
delays work for CSS and web components. Preserve the CSS-only hover/focus fallback, keep bubbles
reachable across their visual gap, and retain visibility while either pointer or focus remains.
Dismissed tooltips reopen only after both leave and a new interaction begins. Update the tooltip
guide and localized demo triggers.
