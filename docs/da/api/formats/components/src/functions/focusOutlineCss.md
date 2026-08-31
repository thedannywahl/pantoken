[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# Function: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg focus-outline-blokken: `--instui-focus-outline-*` token defs plus ring-reglerne.
Bagt ind i `base.css` (så focusables får ringen ud af kassen), og genanvendeligt af andre lagrede
outputs (f.eks. Pendo renderer) via `selector`/`tokenSelector` muligheder.

```demo
self:focus-outline
```

## Parameters

### options?

`selector` — den fokuserbar selector; `tokenSelector` — hvor token defs lander
(standard `:where(:root)`).

#### selector?

`string`

#### tokenSelector?

`string`

## Returns

`string`

CSS-strengen.
