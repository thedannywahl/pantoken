# @pantoken/plugin-primitives

Opt-in utility classes for the raw pantoken **primitive** palette (`--instui-primitive-*`).

The semantic utilities in `@pantoken/components` expose only semantic tokens on purpose — a color
override there is always a role (`bg-brand`), never a raw swatch. This package is the escape hatch: one
class per primitive token, for the rare case a developer needs the palette directly. It's large and
opt-in, so load it on its own and let PostCSS treeshake what you don't use.

```ts
import "@pantoken/plugin-primitives/primitives.css";
```

```html
<div class="instui-bg-primitive-color-navy-navy170 instui-fg-primitive-color-white">…</div>
```

## What it emits

- **Colors** — `.instui-bg-<name>`, `.instui-fg-<name>`, `.instui-border-<name>` for every
  `--instui-primitive-color-*` token (same shape as the semantic color utilities, keyed on the
  primitive name).
- **Fonts** — `.instui-primitive-font-family-*` → `font-family`, `.instui-primitive-font-weight-*` →
  `font-weight`.

## API

- **`primitivesCss(names, options?): string`** — build the stylesheet. Pass the primitive token names
  per family (e.g. filtered from `@pantoken/tokens`). `options.prefix` sets the class prefix; any falsy
  value drops it (`.bg-…`). The shipped `primitives.css` uses `instui`.

The font utilities are built on `tokenUtilitiesCss` from `@pantoken/utils` — the same generic
token→class emitter the semantic utilities in `@pantoken/components` use — so this package depends only
on the shared utils tier, not on the component library.
