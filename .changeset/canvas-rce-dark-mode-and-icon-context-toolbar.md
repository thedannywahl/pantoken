---
"@pantoken/scaffold": patch
"@pantoken/tinymce": patch
"@pantoken/tinymce-a11y": patch
---

Several canvas theme editor and TinyMCE dark-mode/UX fixes:

- The standalone shell's "System" appearance now applies immediately on load instead of only after picking another option and switching back — a dark OS no longer starts the app in light mode.
- The Color menu marks "Navy" as selected by default, matching the app's actual starting color.
- The brand mark is now a link to pantoken.app (opens in a new tab), styled as a primary icon button so its glyph contrasts correctly in both light and dark mode.
- The desktop preview width no longer renders narrower than the tablet preset in side-by-side layout.
- The Theme and Language menus close when you click outside them or press Escape.
- In stacked layout, the editor pane is no longer capped below its resized height — TinyMCE's own resize handle can grow it freely, matching side-by-side layout.
- Fixed a TinyMCE dialog bug where the primary button rendered white text on a white background in dark mode.
- The icons picker's selected tile now shows a persistent indicator that doesn't disappear when you stop hovering it.
- Inserted icon glyphs are now selectable in the editor, with a context toolbar to change their color or size, or delete them.
- Fixed the accessibility checker's statusbar icon staying black in dark mode instead of matching the other icons.
