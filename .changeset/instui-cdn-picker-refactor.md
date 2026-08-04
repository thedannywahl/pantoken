---
"@pantoken/docs": patch
---

Align the CDN picker docs page with InstUI patterns: real tabs, an elevated primary card, and a merged icon list with a labeled divider instead of fake tab buttons. Also fixes the Simple Icons dark-mode invert (was keyed off the OS `prefers-color-scheme` instead of the site's own theme toggle) and broken InstUI icon glyphs (most icons rendered as a bare circle/rect/triangle because the manifest generator kept only the first `<path>` in a multi-shape icon).

Also simplifies the components tab: drops the now-redundant token-sheet toggle (icons live on their own tab), folds base/utilities into the component list as checked-by-default entries, turns "All components" into a tri-state checkbox that selects/clears the list (collapsing the output to `components.css` only when everything is checked), and replaces the output format radios with secondary tabs.

And simplifies the icons tab to match: merges the InstUI and Simple Icons grids into one continuous list with the section headers as in-list rows, turns "All icons" into a tri-state checkbox over both sources, and replaces the output format radios with secondary tabs (`<link>`/`@import`/ESM snippet). Also fixes the Simple Icons image sizing/spacing to match the InstUI glyphs.

Adds a few more refinements on top:

- Base/Utilities are now labeled just "Base"/"Utilities", each with an info button that opens a short popover explaining what it includes, and both moved to the front of their list alongside "All components". "All components" is now a true master over {every component, Base, Utilities} — checked/unchecked together in both directions, indeterminate whenever the three disagree.
- The tri-state "all" checkbox logic and the format-tabs-plus-output-panel UI are pulled into a shared composable and component (`useIndeterminateCheckbox`, `PickerOutput.vue`) instead of being duplicated across pickers.
- Adds a third "Web components" tab listing every `<instui-*>` custom element, with the same search/select-all/output pattern. The ES module format supports selecting individual elements (`register(customElements, { only: [...] })`, or a plain `import` when everything is selected); the classic-script-tag format is a self-contained bootstrapper that points at the specific selected elements' own small `dist/<name>.iife.js` files (combined via jsDelivr, falling back to the "everything" bundle only when nothing or everything is selected) — see the `@pantoken/web-components` changeset for the per-element build that enables this. Both formats now use the lean token sheet, combined with `component-icons.css` only when the selection actually needs an icon glyph, instead of always loading the full 1.4 MB sheet.
- The active tab and every picker's selections, format, and search text now sync to the URL hash, so a specific configuration can be bookmarked or shared and reloads back into the same state.
