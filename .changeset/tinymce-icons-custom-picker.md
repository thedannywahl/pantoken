---
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

Replace the TinyMCE icons picker's emoticons-database backing with a purpose-built dialog. The
previous approach relied on `@pantoken/components`' `icons.css`, which maps `-icon-<name>` classes to
`--instui-icon-*` tokens it never defines, so every Instructure UI glyph painted as a solid square;
TinyMCE's emoticon grid also sized its cells for single characters, which broke the layout for wide
brand glyphs. The picker now owns its markup, tabs by source, filters as you type, and renders in
chunks as you scroll.

Glyph previews for the sources this package already bundles are declared from in-memory token data,
so opening the dialog costs two stylesheet requests rather than one per icon. A new `::name`
autocompleter inserts an icon without leaving the keyboard; the trigger is configurable and defaults
to `::` so the stock `emoticons` plugin can still claim `:`. Consumers no longer need to register the
`emoticons` plugin or set `emoticons_database_id`, and `PANTOKEN_ICONS_DATABASE_ID`,
`buildEmoticonsDatabase`, and `matchInsertedIcon` are gone.

The Oxide content skins now carry the icon painter, so an inserted icon is visible, selectable,
deletable, and recolorable in the editing surface without the host adding `components.css` to
`content_css`.
