[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# Funció: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La millora **experimental** de select personalizable per a `.&lt;prefix&gt;-simple-select`. Tot està
controlat per `@supports (appearance: base-select)` (el model CSS Customizable Select — Chrome 135+,
ENCARAS NO Baseline), per tant és una millora progressiva pura: els navegadors sense suport mantenen el control
`simpleSelectCss` pla; els navegadors compatibles obtenen un panell `::picker(select)` estilit i `option`s estilitzats
(hover/selected) dels tokens `--instui-component-options-item-*`. Expedit com el seu propi
`select.css` de participació opcional (com `fonts.css`) en lloc d'estar integrat a `components.css`, precisament perquè la
característica és experimental — deliberadament t'hi adhereixes.

```demo
self:simple-select
```

## Paràmetres

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Retorna

`string`

La cadena CSS.

## Exemple

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```
