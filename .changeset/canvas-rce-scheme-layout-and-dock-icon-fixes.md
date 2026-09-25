---
"@pantoken/scaffold": patch
---

Fix several issues in the `canvas-theme-editor` scaffold:

- The preview's device-width (monitor/tablet/smartphone) buttons, popup toggle, and other chrome
  controls stayed pinned to the OS `prefers-color-scheme` instead of the explicit interface theme
  toggle — most visible as near-invisible off-white icons in light mode, especially once the
  preview was detached into its own popup window.
- Detaching the preview into a popup left a large blank gap where it used to sit. Its two-pane
  layout container shared the `.container`/`.content` classnames with `@pantoken/plugin-layouts`'
  shared wrapper-layout utility CSS, which silently forced `flex-direction: row` without ever
  setting the `data-layout` attribute the per-pane `flex-grow` rules key off — renamed the
  container to `.panes` to escape the collision.
- The layout (row/column) toggle stayed enabled while the preview was popped out, even though
  layout has no effect on a detached preview.
- With no stored preference, the app started in column layout while the toggle's icon and
  `aria-pressed` implied row — first click was a no-op. The toggle's default markup now matches
  the actual column default so the first click always does something.
- The layout toggle's `aria-label` had no matching i18n key and rendered the literal
  `{{layoutDirectionLabel}}` placeholder.
- The installed webapp's dock/shortcut icon had no dark-appearance variant, so a dark macOS dock
  could render it dark-on-dark. Added a `prefers-color-scheme: dark`-matched icon/apple-touch-icon
  pair built from the existing reversed brand mark.
- The standalone app shell's "System" appearance option added complexity (matching the OS
  preference, keeping it in sync) without matching benefit — removed it, so the appearance picker
  is just Light/Dark and defaults to light.
- Choosing the "None (inline)" CDN provider still fetched the icon picker's Simple Icons/Lucide Lab
  glyph sheets from jsDelivr — the icons plugin was never given the same local-asset resolver the
  logos plugin already used, and that resolver's own glob only covered `plugin-logos` in the first
  place. The docs-only Canvas RCE build now also copies vendored package metadata so package export
  subpaths like `@pantoken/components/icons/copy.css` resolve after local dist refreshes.
- The standalone app shell's language picker only ever listed 6 hardcoded locales, and choosing one
  only set `lang` — it never actually swapped any UI strings. It now lists every locale the scaffold
  has real translations for (from the already-generated `locale-strings.ts`), and persists + reloads
  with the chosen locale's strings merged over the English defaults.
- Icon-only control buttons now use `instui-tooltip` bubbles in addition to screen-reader labels,
  so pointer and keyboard users get visible labels for the download/copy, utility, and preview
  controls. The tool surface also raises those tooltip bubbles above TinyMCE's editor chrome.
- RTL locales now set the scaffolded app's document direction from the generated locale registry,
  flip the standalone shell, utilities, preview controls, and place the tray/close affordance on the
  appropriate side.
