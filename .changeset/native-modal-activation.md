---
"@pantoken/interactions": patch
"@pantoken/components": patch
"@pantoken/web-components": patch
---

Activate CSS modals through native dialog methods so command-driven opening enters the top layer,
moves focus, and supports Escape dismissal and native focus return. Synchronize initial and
external open attributes, close dialogs whose open attribute was removed, and keep queued close
events from clearing a newer open state. Preserve the web-component host protocol.
