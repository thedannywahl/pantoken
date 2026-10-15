---
"@pantoken/scope": patch
"@pantoken/tinymce-save": patch
---

Constrain iframe theme-message targets to concrete origins, except explicitly sandboxed opaque srcdoc previews. Skip malformed and unsupported opaque frame URLs, and keep preset-export download links out of the live document.
