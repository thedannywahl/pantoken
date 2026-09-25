---
"@pantoken/tinymce-a11y": minor
"@pantoken/tinymce-placehold": minor
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

Upgrade the peer dependency and catalog pin from TinyMCE 5 to TinyMCE 8. Self-hosted consumers must now set a `license_key` option (`"gpl"` for the open-source license, or a commercial key) when calling `tinymce.init()`.
