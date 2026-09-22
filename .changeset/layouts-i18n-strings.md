---
"@pantoken/plugin-layouts": minor
"@pantoken/tinymce": minor
---

Route starter page layout titles, prose, and image alt text through the i18n pipeline (new `layouts.strings` catalog). `@pantoken/plugin-layouts` gains `renderPageLayout(layout, locale)` and `pageLayoutTemplates` (unresolved `{{key}}` templates); `pageLayouts` stays English-rendered by default for backward compatibility. `@pantoken/tinymce`'s `createLayoutsPlugin` gains a `locale` option that renders the "Insert layout" picker and inserted HTML in the requested locale, falling back to English for untranslated strings.
