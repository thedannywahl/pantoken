# @pantoken/plugin-lucide-lab

## 0.4.0

### Minor Changes

- f475012: Add a plugin that exposes Lucide Lab icons as pantoken image tokens.
- f475012: TinyMCE's icons picker now also offers Lucide Lab glyphs and pantoken's vendored custom icons,
  alongside Instructure UI and Simple Icons — each in its own picker tab. Fixed the picker's icon-CSS
  bundle, which was loading the lean `component-icons.css` (only the handful of icons the component
  sheets reference) instead of the full glyph set, causing most Instructure UI icons to render as
  unmasked, filled squares. `@pantoken/plugin-lucide-lab` now publishes `manifest.json` (the sorted
  list of icon names), matching `@pantoken/plugin-simple-icons`. TinyMCE's own toolbar, menu, dialog,
  and status icons now use an InstUI/Pantoken/Lucide icon pack instead of TinyMCE's stock glyphs.

### Patch Changes

- f475012: Fix InstUI/Lucide icons losing to same-named simple-icons or Lucide Lab glyphs (e.g. the `x` close
  icon vs. the X/Twitter brand logo). `@pantoken/plugin-simple-icons` and `@pantoken/plugin-lucide-lab`
  now skip (and warn on) a slug/name that already exists in the token IR instead of overwriting it, and
  `buildIconResolverChain` now tries the built-in icon set before plugin `rehype` resolvers so a
  colliding `:code:` resolves to the built-in icon.
- @pantoken/plugin-kit@0.3.2
