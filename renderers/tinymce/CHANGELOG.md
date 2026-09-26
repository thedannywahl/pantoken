# @pantoken/tinymce

## 0.3.0

### Minor Changes

- f475012: Add a pantoken TinyMCE meta plugin that groups components, icons, logos, layouts, and templates under one pantoken-icon toolbar menu, and use it in the Canvas theme editor scaffold while keeping source view separate.
- f475012: Add TinyMCE 8 UI and content skins for Next Gen, Canvas, and Canvas High Contrast. Next Gen's UI skin supports light and dark modes while all content skins remain light-only.
- f475012: Route starter page layout titles, prose, and image alt text through the i18n pipeline (new `layouts.strings` catalog). `@pantoken/plugin-layouts` gains `renderPageLayout(layout, locale)` and `pageLayoutTemplates` (unresolved `{{key}}` templates); `pageLayouts` stays English-rendered by default for backward compatibility. `@pantoken/tinymce`'s `createLayoutsPlugin` gains a `locale` option that renders the "Insert layout" picker and inserted HTML in the requested locale, falling back to English for untranslated strings.
- f475012: Replace logo PNG rasterization with an aspect-ratio-aware `-logo-<name>` mask glyph, mirroring the
  `icon` painter but without squashing non-square logos into a 1:1 box.

  - `@pantoken/plugin-custom-components` adds a new `logo` utility (`.instui-logo` + the shared
    `[class*="-logo-"]::before` painter) that reads a per-logo `--pantoken-logo-aspect` custom property
    instead of assuming a 1em square.
  - `@pantoken/plugin-logos` no longer rasterizes PNGs or ships a `./*.png` export (dropping the
    `@resvg/resvg-js` build dependency). Its generated `.-icon-<name>` glyph classes are renamed to
    `.-logo-<name>` and now carry `--pantoken-logo-aspect` derived from each logo's own SVG `viewBox`.
    `LogoMeta.width`/`height` now describe that natural `viewBox` size, not a rasterized display size.
  - `@pantoken/tinymce`'s logos picker inserts a mask-painted `<span class="instui-logo -logo-<name>"
role="img" aria-label="…">` instead of a CDN-hosted `<img>`, using the same CSS asset-tracking
    (`trackAndInjectAsset`) the icons picker already relies on for Canvas RCE compatibility.
  - The Canvas theme editor scaffold template resolves the logo's `.css` export (not `.png`) for its
    local/offline preview mode, and re-syncs `-logo-*` classes found in loaded editor content the same
    way it already does for `-icon-*` classes.

- f475012: Add context-aware component and global utility modifier suggestions to the CodeMirror HTML editor, and add a floating Modifiers menu for editing the nearest selected component in TinyMCE.
- f475012: Add opt-in pantoken-aware TinyMCE commands and automatic component classes for authored content.
  Apply the image component class to placeholder and product-logo images, and enable the integration
  in the Canvas theme editor scaffold.
- f475012: Replace the TinyMCE icons picker's emoticons-database backing with a purpose-built dialog. The
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

- f475012: TinyMCE's icons picker now also offers Lucide Lab glyphs and pantoken's vendored custom icons,
  alongside Instructure UI and Simple Icons — each in its own picker tab. Fixed the picker's icon-CSS
  bundle, which was loading the lean `component-icons.css` (only the handful of icons the component
  sheets reference) instead of the full glyph set, causing most Instructure UI icons to render as
  unmasked, filled squares. `@pantoken/plugin-lucide-lab` now publishes `manifest.json` (the sorted
  list of icon names), matching `@pantoken/plugin-simple-icons`. TinyMCE's own toolbar, menu, dialog,
  and status icons now use an InstUI/Pantoken/Lucide icon pack instead of TinyMCE's stock glyphs.
- f475012: `@pantoken/tinymce` gains three new plugins: `createSupSubPlugin` (a combined
  superscript/subscript toolbar dropdown), `createFullscreenFooterPlugin`, and
  `createSearchReplaceFooterPlugin` (footer/statusbar buttons for TinyMCE's native
  fullscreen and search & replace, which otherwise ship as toolbar-only controls).

  `@pantoken/tinymce-codemirror`'s `createSourceTogglePlugin` accepts a new `display`
  option (`"toolbar" | "footer" | "both"`, defaulting to `"toolbar"`) so the source-view
  toggle can be registered in TinyMCE's footer/statusbar instead of (or alongside) the
  toolbar.

  `@pantoken/tinymce-a11y`'s footer checker button is now prepended, not appended, to
  the statusbar so it consistently leads (before word count) instead of landing wherever
  DOM order happened to put it.

  `canvas-theme-editor` scaffold: reordered the local authoring editor's toolbar into
  undo/redo, the pantoken menu, font size/heading pickers, inline formatting (including
  color and superscript/subscript), link/image/placeholder-image, text align, lists, and
  clear formatting/table/embed groups. The accessibility checker, word count, source-view
  toggle, fullscreen, and find & replace all moved out of the toolbar into the footer/
  status bar (in that order), and the element-path breadcrumb is now hidden.

- f475012: Upgrade the peer dependency and catalog pin from TinyMCE 5 to TinyMCE 8. Self-hosted consumers must now set a `license_key` option (`"gpl"` for the open-source license, or a commercial key) when calling `tinymce.init()`.
- f475012: `@pantoken/tinymce` gains `createVisualBlocksFooterPlugin` (`pantoken_visualblocks_footer`), a
  footer/statusbar button for TinyMCE's native `visualblocks` plugin, which otherwise ships as a
  toolbar-only toggle. Also injects the dashed-outline CSS the plugin needs into the editor's
  content document, since that CSS normally ships with the default Oxide skin's content.css and is
  missing when a custom skin (like this scaffold's) is used instead.

  `canvas-theme-editor` scaffold: registers TinyMCE's `visualblocks` plugin and surfaces its toggle
  in the footer/status bar alongside the accessibility checker, word count, source-view toggle,
  fullscreen, and find & replace controls.

### Patch Changes

- f475012: Add a `button-set` component: a seamed (flush, zero-gap, outer-corners-only) row of buttons whose
  own chained modifiers (color, size, shape, toggle, condensed, without-background/border,
  display-block) default onto every child `.pfx-button` that doesn't carry its own modifier in the
  same category — a button's own modifier class always wins.

  Make Canvas Theme Editor's download actions a primary seamed icon-button set, synchronize its
  preview scheme with the app appearance, and improve TinyMCE icon picker glyph sizing and selected
  tile contrast.

- f475012: Add Canvas starter layouts for course headers, footers, instructor profiles, syllabi, and course home pages.

  Add provider-neutral image placeholders that TinyMCE consumers can resolve before inserting content.

- f475012: Several canvas theme editor and TinyMCE dark-mode/UX fixes:

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

- f475012: Fix the `::name` icon-picker autocompleter rendering Simple Icons results far larger and blurrier
  than every other icon source — those SVGs carry no explicit `width`/`height` (only a `viewBox`), so
  the browser fell back to its default replaced-element size and then downscaled it awkwardly. Rows
  now pin the glyph to a consistent size regardless of source, and no longer show a redundant source
  label — just the glyph and the icon's name, matching the dialog's own rows.

  Also fix the component modifier helper/menu so modifier suggestions are semantically sorted,
  long-form aliases like `-size-small` are suppressed in favour of their canonical short forms, and
  single-property utility groups do not produce empty nested menu paths. Finally, fix Next Gen
  TinyMCE dark-mode tooltip contrast and make pseudo-focus rings prefer the live Pantoken focus token
  so they adapt to the active light/dark scheme and theme colour.

- f475012: Fix several issues in the `canvas-theme-editor` scaffold's live preview tool:

  - Navy and blue color schemes rendered fully transparent — `customThemeColorsCss()` emitted a
    self-referencing (circular, guaranteed-invalid) custom property when a color remapped to its own
    primitive scale.
  - The tray's Config/CSS/JS tabs didn't work in the built docs site — `@pantoken/interactions`'s
    IIFE was loaded via a fire-and-forget dynamic `import()`, which a production bundler can
    tree-shake away from a `"sideEffects": false` package. It's now loaded via a real `<script>` tag.
  - The scaffold's source-view (code) toggle was a second, drifted reimplementation of
    `@pantoken/tinymce`'s `createSourceTogglePlugin` — now newly exported from `@pantoken/tinymce`
    and reused directly instead of being duplicated.
  - The editor and preview panes had fixed heights, so TinyMCE's resize handle could only shrink the
    editor, and preview content overflowed into an internally-scrolling iframe. The editor pane now
    uses `min-height`, and the preview iframe grows to match its content's measured height with no
    scrollbar.
  - Added a large/medium/small preview-width toggle (100% / `--instui-breakpoints-lg` /
    `--instui-breakpoints-md`) above the preview pane.
  - Added missing standard toolbar buttons/plugins: bold, italic, underline, undo, redo, bullet/
    numbered lists, and link.

- f475012: Enable the TinyMCE logos Insert button when products are available and source TinyMCE UI text from
  `src/i18n.json`.
- f475012: Strip markdown fences and example options before inserting component examples into TinyMCE.
- f475012: Hide components that should not be inserted as standalone HTML snippets from the TinyMCE component picker while keeping new components visible by default.
- f475012: Add a dark-mode variant for TinyMCE's editable content in the Next Gen skin — the editor body previously stayed light even when the surrounding chrome went dark. The canvas theme editor scaffold now propagates its scheme onto the editor's own iframe document so the new dark content rules take effect.
- f475012: Fix toolbar-button "active" (toggled-on formatting like bold/italic) and menu-item "active" (current block format) states rendering effectively white-on-white in the Next Gen dark skin.
- f475012: Fix inserted icon glyphs (`<span class="instui-icon -icon-*">`) getting silently deleted when toggling from the source-code view back to WYSIWYG — TinyMCE's schema strips genuinely empty inline elements on `setContent()`, so the icon markup now carries a zero-width space instead of being empty.
- f475012: Fix blank icon glyphs for Instructure UI and custom icons in the icons picker and inserted content — `buildIconTokenCss()` declared the raw `--instui-icon-<name>` token but never the `.-icon-<name> { --pantoken-glyph: ... }` mapping the shared painter actually reads, so only icons whose real per-icon stylesheet happened to already be loaded elsewhere rendered.

  Also let every content picker (components, icons, logos) resolve its CSS/asset URLs with a custom `buildAssetUrl` resolver instead of always defaulting to a hardcoded CDN — the icons picker's stylesheet injection ignored the chosen CDN provider entirely.

- f475012: Fix pantoken icon glyphs rendering a blank square when inserted inside TinyMCE dialogs whose own classes happen to contain the substring "-icon-" (e.g. the media/embed plugin's icon input) — the glyph painter now requires the `.instui-icon` class pantoken always pairs with its `-icon-<name>` modifier.
- f475012: Fix the icons picker dialog: single-click now selects a tile (enabling a new primary Insert button), double-click or Enter inserts it immediately, and the search box/tabs/results grid now render with visible borders and text instead of a washed-out, unstyled appearance caused by TinyMCE's own dialog color reset. Export `PANTOKEN_ICON` for reuse outside the toolbar menu button.
- f475012: Insert decorative icons from the TinyMCE emoji selector with `aria-hidden` instead of nested screen-reader text.
- f475012: Give the layouts picker separate Insert and Replace actions. Insert adds the layout at the cursor, while Replace keeps the confirmation step before replacing the full editor contents.
- f475012: Track icon stylesheets from Canvas theme editor HTML, deduplicate repeated icons, and remove unused icon imports from generated theme CSS.
- f475012: Show an active footer state for the TinyMCE visual blocks toggle.
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
- Updated dependencies [f475012]
  - @pantoken/plugin-custom-components@0.5.0
  - @pantoken/plugin-layouts@0.5.0
  - @pantoken/tinymce-codemirror@0.2.0
  - @pantoken/tokens@0.6.0
  - @pantoken/components@1.3.0
  - @pantoken/plugin-simple-icons@0.3.10
  - @pantoken/plugin-lucide-lab@0.4.0
  - @pantoken/plugin-logos@0.5.0
  - @pantoken/plugin-custom-icons@0.3.12

## 0.2.10

### Patch Changes

- Updated dependencies [091942b]
- Updated dependencies [091942b]
  - @pantoken/plugin-custom-components@0.4.1
  - @pantoken/components@1.2.3

## 0.2.9

### Patch Changes

- Updated dependencies [9ba476b]
- Updated dependencies [9ba476b]
- Updated dependencies [9ba476b]
  - @pantoken/plugin-custom-components@0.4.0
  - @pantoken/components@1.2.2
  - @pantoken/plugin-layouts@0.4.0

## 0.2.8

### Patch Changes

- Updated dependencies [c9dbc5c]
  - @pantoken/plugin-custom-components@0.3.3

## 0.2.7

### Patch Changes

- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
- Updated dependencies [23c9ffb]
  - @pantoken/components@1.2.1
  - @pantoken/plugin-custom-components@0.3.2
  - @pantoken/plugin-layouts@0.3.1
  - @pantoken/plugin-logos@0.4.1
  - @pantoken/plugin-simple-icons@0.3.9

## 0.2.6

### Patch Changes

- Updated dependencies [1bbe6c6]
- Updated dependencies [1bbe6c6]
  - @pantoken/components@1.2.0
  - @pantoken/plugin-custom-components@0.3.1

## 0.2.5

### Patch Changes

- a1c0d58: add exports to the un-prefixed pantoken package.

## 0.2.4

### Patch Changes

- Updated dependencies [c22ba83]
  - @pantoken/components@1.1.4

## 0.2.3

### Patch Changes

- Updated dependencies [0bde734]
  - @pantoken/components@1.1.3

## 0.2.2

### Patch Changes

- @pantoken/components@1.1.2

## 0.2.1

### Patch Changes

- Updated dependencies [db34dec]
  - @pantoken/plugin-simple-icons@0.3.8
  - @pantoken/components@1.1.1
  - @pantoken/plugin-custom-components@0.3.1

## 0.2.0

### Minor Changes

- 7d964ee: `@pantoken/plugin-layouts` now ships `pageLayouts`: starter page layouts (hero, callout,
  testimonial, two-column, rubric note) that were previously scaffold-only static HTML files under
  `packages/scaffold/templates/canvas-theme-editor/templates/pages/`.

  `@pantoken/tinymce` adds a `createLayoutsPlugin` — a "Layouts" toolbar/menu picker alongside the
  existing Components/Icons/Logos pickers, defaulting to `@pantoken/plugin-layouts`'s bundled
  `pageLayouts`.

  The `canvas-theme-editor` scaffold now imports `createLayoutsPlugin` from `@pantoken/tinymce`
  instead of glob-importing its own local template HTML files with the generic
  `createTemplatesPlugin`.

- 7d964ee: New package `@pantoken/tinymce` provides TinyMCE + CodeMirror integration for pantoken design
  system. Exports five capabilities:

  - **Phase 1:** Content-CSS wiring (pantokenContentCssUrls, injectContentStylesheet)
  - **Phase 2:** TinyMCE plugins (templates, source-toggle)
  - **Phase 3:** Three browse+insert pickers (components/icons/logos) with dynamic CSS injection
  - **Phase 4:** CodeMirror HTML linter validating .instui-* tokens
  - **Phase 5:** CodeMirror autocomplete for component/modifier IntelliSense

  Merged model combines @pantoken/components, @pantoken/plugin-custom-components, and
  @pantoken/plugin-simple-icons metadata for unified token validation and discovery.

  Also exports model.json and manifest.json from @pantoken/components and
  @pantoken/plugin-simple-icons respectively for programmatic access to component and icon
  definitions.

### Patch Changes

- 7d964ee: Fix test failures:

  - **web-components**: Resolve i18n.json path relative to check-drift.ts script directory using `import.meta.url`, fixing module import errors in tests.
  - **tinymce**: Defend onChange handlers against missing properties with optional chaining to prevent TypeError in test scenarios.

- 7d964ee: Fix the components/icons/logos picker plugins throwing `TypeError: Plugin is not a constructor` on
  init. TinyMCE always instantiates registered plugins with `new Plugin(editor, url)`; the plugin
  factories returned arrow functions, which aren't constructible. They now return named `function`
  expressions.
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
  - @pantoken/plugin-custom-components@0.3.1
  - @pantoken/components@1.1.0
  - @pantoken/plugin-layouts@0.3.0
  - @pantoken/cdn@0.2.0
  - @pantoken/plugin-logos@0.4.0
  - @pantoken/plugin-simple-icons@0.3.7
