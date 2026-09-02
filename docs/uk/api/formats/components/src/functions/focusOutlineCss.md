[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# Функція: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build the focus-outline block: the `--instui-focus-outline-*` token defs plus the ring rules.
Baked into `base.css` (so focusables get the ring out of the box), and reusable by other layered
outputs (e.g. the Pendo renderer) via the `selector`/`tokenSelector` options.

```demo
self:focus-outline
```

## Параметри

### options?

`selector` — the focusable selector; `tokenSelector` — where the token defs land
  (default `:where(:root)`).

#### selector?

`string`

#### tokenSelector?

`string`

## Повертає

`string`

The CSS string.
