---
"@pantoken/components": patch
"@pantoken/web-components": patch
---

Keep the drawer's automatic narrow-content width reset in the same CSS scope as its desktop
minimum. This lets container-query overlay mode reflow without JavaScript or a manual override,
including layouts with a closed or absent tray.
