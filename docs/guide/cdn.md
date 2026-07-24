# CDN & distribution

pantoken publishes every package to npm, so you can pull tokens, components, and web components straight
from a CDN — no build step, no bundler. This page covers the CSS combine URL (with an interactive
builder), plus the web-component drop-ins.

## The token foundation

Every pantoken component reads `--instui-*` custom properties from a token sheet on the page. Two
variants ship:

- `@pantoken/css/dist/style.lean.css` — the recommended CDN foundation. It carries every token except the
  full icon set, so it's about 23 KB gzipped.
- `@pantoken/css/dist/style.css` — the full sheet, including all ~1,777 icon glyph tokens
  (`--instui-icon-*`). About 140 KB gzipped. Load this if you reference icons broadly via
  `var(--instui-icon-*)`.

The elevation scale and focus-ring variables ride in both sheets, so shadows and the focus ring work with
just the foundation loaded.

## Pick your components

jsDelivr's combine endpoint pulls the token foundation plus only the component stylesheets you need, in a
single request. Check the components you want, and the builder writes the URL:

<CdnPicker />

Each component file is small — most are around 2 KB. A component that renders icons (`alert`, `checkbox`,
and a few others) needs those glyphs, so the builder adds `@pantoken/components/dist/component-icons.css` (about
0.5 KB gzipped — the 11 icons the component set uses) whenever you pick the lean sheet. The full sheet
already carries them.

### Load order and fonts

Load the token foundation first, then the optional base reset, then the component files. The combine URL
above already orders them for you. Fonts are the one exception: `@pantoken/components/dist/fonts.css` points at
font files by relative path, so combine can't rewrite them — load it as its own `<link>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### Everything at once

Check **All components** in the picker to switch it to the barrel, or point at it yourself (about 141 KB
gzipped) alongside the token sheet:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## Web components

`@pantoken/web-components` registers framework-agnostic `<instui-*>` custom elements. They inline their
own CSS, but still read tokens from a sheet on the page, so load a token foundation too.

### ES modules (recommended)

An ESM CDN resolves the package's dependencies for you. This registers every element:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

Use the full token sheet (or the lean sheet plus `component-icons.css`) so icon-rendering elements like
`<instui-alert>` resolve their glyphs.

To register just some elements — and their nested dependencies — import `register` and pass `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### A classic script tag

For a no-modules drop-in, load the IIFE build. It bundles its dependencies and auto-registers every
element on load, exposing a `PantokenWebComponents` global:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

It's larger than the ESM path — it inlines `@pantoken/components` and `@pantoken/icons` — so reach for it
only when you can't use modules.

## Pinning versions

The URLs above — and the ones the picker writes — track the latest release. Pin a major (or exact)
version for production — for example `@pantoken/css@0` — so an upgrade never surprises you.

## What's not here

There's no `?components=button,badge` query parameter: no public CDN assembles a bundle from query params.
The combine URL is the closest equivalent, and the picker writes it for you.
