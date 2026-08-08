# CHANGELOG

## 0.2.3

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.

## 0.2.2

### Patch Changes

- 4674d3d: Partition API sidebars by package route to reduce duplicated prerendered HTML and Pages artifact size.

## 0.2.1

### Patch Changes

- 55a22e3: Fix reactive CDN picker code output across components, icons, and web components.

## 0.2.0

### Minor Changes

- 47f3275: Unify CSS and JS component pickers into a single ComponentsPicker with:

  - Component metadata scan determining CSS-only, JS-only, or both capabilities
  - Dual output tabs: CSS link/import followed by JS ESM/`<script>`/IIFE formats
  - Dependency enforcement for JS components (date-input requires calendar, etc.)
  - Component type indicators (CSS/JS badges) on every component
  - Smart CSS building with automatic component-icons inclusion for icon-using components

- 47f3275: Add IIFE bootstrap format to the Interactions picker for single-tag CDN usage, similar to web-components. The IIFE loads the token stylesheet and exposes PantokenInteractions globally for use in the page.

### Patch Changes

- 47f3275: abstract component interactions into shared package

## 0.1.6

### Patch Changes

- ebe77e5: Align the CDN picker docs page with InstUI patterns: real tabs, an elevated primary card, and a merged icon list with a labeled divider instead of fake tab buttons. Also fixes the Simple Icons dark-mode invert (was keyed off the OS `prefers-color-scheme` instead of the site's own theme toggle) and broken InstUI icon glyphs (most icons rendered as a bare circle/rect/triangle because the manifest generator kept only the first `<path>` in a multi-shape icon).

  Also simplifies the components tab: drops the now-redundant token-sheet toggle (icons live on their own tab), folds base/utilities into the component list as checked-by-default entries, turns "All components" into a tri-state checkbox that selects/clears the list (collapsing the output to `components.css` only when everything is checked), and replaces the output format radios with secondary tabs.

  And simplifies the icons tab to match: merges the InstUI and Simple Icons grids into one continuous list with the section headers as in-list rows, turns "All icons" into a tri-state checkbox over both sources, and replaces the output format radios with secondary tabs (`<link>`/`@import`/ESM snippet). Also fixes the Simple Icons image sizing/spacing to match the InstUI glyphs.

  Adds a few more refinements on top:

  - Base/Utilities are now labeled just "Base"/"Utilities", each with an info button that opens a short popover explaining what it includes, and both moved to the front of their list alongside "All components". "All components" is now a true master over {every component, Base, Utilities} — checked/unchecked together in both directions, indeterminate whenever the three disagree.
  - The tri-state "all" checkbox logic and the format-tabs-plus-output-panel UI are pulled into a shared composable and component (`useIndeterminateCheckbox`, `PickerOutput.vue`) instead of being duplicated across pickers.
  - Adds a third "Web components" tab listing every `<instui-*>` custom element, with the same search/select-all/output pattern. The ES module format supports selecting individual elements (`register(customElements, { only: [...] })`, or a plain `import` when everything is selected); the classic-script-tag format is a self-contained bootstrapper that points at the specific selected elements' own small `dist/<name>.iife.js` files (combined via jsDelivr, falling back to the "everything" bundle only when nothing or everything is selected) — see the `@pantoken/web-components` changeset for the per-element build that enables this. Both formats now use the lean token sheet, combined with `component-icons.css` only when the selection actually needs an icon glyph, instead of always loading the full 1.4 MB sheet.
  - The active tab and every picker's selections, format, and search text now sync to the URL hash, so a specific configuration can be bookmarked or shared and reloads back into the same state.
  - The output snippet now reuses VitePress's own code-fence markup and global copy-button handler instead of a bespoke `<pre>`/copy-button pair, so it gets the same styling and click behavior as any other code block in the docs (no syntax highlighting, since that's a Shiki build-time step that doesn't apply to this runtime-generated content).

  Also, sitewide: the rebrand theme's `--instui-color-institutional-brand-primary` (tab underlines, badges, menu active states, the calendar's "today") shipped as navy by default, a different blue than `--vp-c-brand-1` resolves to through the `@pantoken/vitepress` bridge. Points it at the same navigation-primary blue so InstUI's own brand-colored component chrome and VitePress's brand-driven UI read as one color; canvas and canvas-high-contrast keep their own values.

  Two more picker bugs:

  - The Components tab's combine URL loaded `utilities.css` before the component sheets. Utility classes are override utilities (same specificity as a component class), so they only actually win the cascade when they load _after_ what they're overriding — moved to the end of the URL, and updated the CDN guide's stated load order to match.
  - The Icons tab's "All icons" checkbox correctly collapsed the InstUI side to the bundled `icons.css`, but always enumerated every selected Simple Icon individually, even when every Simple Icon was selected too. Mirrors the InstUI collapse: uses `@pantoken/plugin-simple-icons/simple-icons.css` when the whole Simple Icons set is checked.

## 0.1.5

### Patch Changes

- 7879f6b: support exporting individual icons

## 0.1.4

### Patch Changes

- 40987c4: Refactor translation tooling internals; no user-visible change.

  - Rename `ClaudeCodeTranslationAdapter` → `AiTranslationAdapter`; `DOCS_TRANSLATION_ADAPTER=claude-code` → `DOCS_TRANSLATION_ADAPTER=ai` across scripts and package.json. The `glossary` adapter is unchanged.
  - `TranslationMemory` in `docs/scripts/translation-memory.ts` is now a thin facade over the shared `@pantoken/translation-adapters` core; public API (`load`, `get`, `set`, `save`, `hits`, `misses`) is unchanged.
  - `spawnPrompt` and `extractJsonObject` moved to `@pantoken/translation-adapters`; local duplicates removed.
  - `agy-wrapper.sh` consolidated into `@pantoken/translation-adapters`; local copies in `docs/scripts/` and `packages/i18n/scripts/` removed. `:agy` script variants added to both pipeline `package.json` files referencing the canonical location.

## 0.1.3

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

## 0.1.2

### Patch Changes

- 2b814bd: Restore elevation and focus-outline foundation variables in the docs site's custom multi-theme token sheet.

## 0.1.1

### Patch Changes

- 2e5bb88: Final refactor of syntaxFromChain to eliminate high-complexity threshold by extracting token processing logic into processTokenInChain helper function.
- 2e5bb88: Further refactor build-css-api by extracting micro-functions for syntax inference and token chain traversal to reduce cyclomatic complexity of remaining functions.
- 2e5bb88: Refactor build-css-api functions (inferSyntax, syntaxFromChain, resolveSyntax, resolveToken, makeImportSnippet) to reduce cyclomatic complexity by extracting helper functions and simplifying conditional logic.

## 0.1.0

### Added

- Initial release of @pantoken/docs.
