[pantoken](../../../../index.md) / [formats/components/src](../index.md) / selectCss

# Function: selectCss()

> **selectCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den **eksperimentelle** customizable-select-forbedring for `.&lt;prefix&gt;-simple-select`. Alt er
gatet bag `@supports (appearance: base-select)` (CSS Customizable Select-modellen — Chrome 135+,
ENDNU IKKE Baseline), så det er ren progressiv udvidelse: browsere uden support beholder den almindelige
`simpleSelectCss` kontrol; supporterende browsere får et stiliseret `::picker(select)` panel og stiliserede
`option`s (hover/selected) fra `--instui-component-options-item-*` tokens. Leveret som sit eget
opt-in `select.css` (som `fonts.css`) snarere end foldet ind i `components.css`, netop fordi funktionen
er eksperimentel — du tilmelder dig bevidst.

```demo
self:simple-select
```

## Parameters

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Returns

`string`

CSS-strengen.

## Example

```ts
import { selectCss } from "@pantoken/components";

// Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
const css = selectCss();
```
