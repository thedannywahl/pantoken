# @pantoken/plugin-custom-icons

## 0.2.0

### Minor Changes

- 853659c: New `@pantoken/plugin-custom-icons` plugin: vendored custom icon glyphs (starting with `highspot`)
  as `--instui-icon-<name>` image tokens, reusing the InstUI icon set's `.-icon-<name>` painter class
  with no `custom-` prefix — the built-in InstUI icon wins on a name collision. The CDN picker's Icons
  tab gains a "Custom icons" section, listed below Simple Icons.
