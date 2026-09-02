[pantoken](../../../../index.md) / mangle-custom-props

# mangle-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-mangle-custom-props` — rename long custom property names to minimal sequential
identifiers.

Token names like `--instui-component-alert-border-top-style` are human-readable but expensive in
minified bundles: the name itself is 40+ bytes, repeated in the definition, every `var()` call,
and every `@property` registration. This plugin replaces every matching name — across definitions,
`var()` references, and `@property` params — with a minimal identifier (`--a`, `--b`, …, `--aa`,
…), cutting name overhead by ~90%.

Names are collected from the full stylesheet, sorted alphabetically for a deterministic mapping,
then assigned sequentially. A [MangleCustomPropsOptions.sharedManifest](interfaces/MangleCustomPropsOptions.md#sharedmanifest) option lets multiple
separate PostCSS passes share one consistent mapping, so separately processed CSS files that will
be loaded together can safely be mangled with the same names.

## Contoh

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";
const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## Antaramuka

- [MangleCustomPropsOptions](interfaces/MangleCustomPropsOptions.md)

## Alias Jenis

- [MangleMethod](type-aliases/MangleMethod.md)

## Pembolehubah

- [mangleCustomProps](variables/mangleCustomProps.md)
