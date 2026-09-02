[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / lighten

# Fungsi: lighten()

> **lighten**(`color`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Lighten by `percent` HSL-lightness points — the CSS-only mirror of ui-color-utils `lighten`
(tinycolor raises HSL lightness). Uses relative color syntax so hue and saturation are preserved.

## Parameter

### color

`string`

The base color.

### percent?

`number` = `10`

Lightness points to add (default `10`, matching tinycolor's default).

## Mengembalikan

`string`

An `hsl(from …)` relative-color expression.

## Contoh

```ts
lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
```
