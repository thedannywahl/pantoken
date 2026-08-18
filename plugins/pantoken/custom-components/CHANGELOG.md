# @pantoken/plugin-custom-components

## 0.2.0

### Minor Changes

- 853659c: Expose per-item CSS as individual package exports. `@pantoken/plugin-logos` now ships a `<product>.css` sheet per product (canvas, igniteai, instructure, learnplatform, mastery, parchment) and a `<name>.css` sheet per individual logo variant, alongside the existing combined `logos.css`. `@pantoken/plugin-custom-components` now exposes its existing per-component sheets (`card.css`, `agent-shell.css`) as real package exports via a `./*.css` wildcard, matching `@pantoken/components`' pattern.

## 0.1.1

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.
- d4ba8fe: Add package README files for the custom-components and layouts plugins.
