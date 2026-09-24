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
  `aria-pressed` implied row — first click was a no-op. Row is now the genuine default, and the
  toggle's default markup matches it.
- The layout toggle's `aria-label` had no matching i18n key and rendered the literal
  `{{layoutDirectionLabel}}` placeholder.
- The installed webapp's dock/shortcut icon had no dark-appearance variant, so a dark macOS dock
  could render it dark-on-dark. Added a `prefers-color-scheme: dark`-matched icon/apple-touch-icon
  pair built from the existing reversed brand mark.
